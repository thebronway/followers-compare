/**
 * src/utils/parser.js
 */
import * as XLSX from 'xlsx';

export const createRecord = (username, rawUrl, timestamp) => {
  let finalUrl = rawUrl || `https://www.instagram.com/${username}`;
  if (finalUrl.includes('/_u/')) finalUrl = finalUrl.replace('/_u/', '/');
  const finalUsername = username ? username.trim() : "Unknown";

  return {
    username: finalUsername,
    url: finalUrl,
    timestamp: Number(timestamp) || 0,
    dateStr: timestamp ? new Date(timestamp * 1000).toLocaleDateString() : 'N/A'
  };
};

export const parseFile = async (file) => {
  return new Promise((resolve, reject) => {
    const fileName = file.name.toLowerCase();
    
    // Excel Handling
    if (fileName.endsWith('.xlsx') || fileName.endsWith('.csv')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          let allUsers = [];
          workbook.SheetNames.forEach(sheetName => {
            const json = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
            const users = json.map(row => {
              const user = row['Username'] || row['username'];
              const link = row['Profile Link'] || row['url'];
              return user ? createRecord(user, link, 0) : null;
            }).filter(Boolean);
            allUsers = [...allUsers, ...users];
          });
          resolve(deduplicate(allUsers));
        } catch (err) { reject(new Error("Failed to parse Excel file.")); }
      };
      reader.readAsArrayBuffer(file);
      return;
    }

    // Text Handling
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      try {
        let results = [];
        if (fileName.endsWith('.json')) results = parseJSON(content);
        else if (fileName.endsWith('.html') || fileName.endsWith('.htm')) results = parseHTML(content);
        resolve(deduplicate(results));
      } catch (err) {
        console.error(err);
        reject(new Error("Failed to parse file."));
      }
    };
    reader.readAsText(file);
  });
};

const deduplicate = (list) => Array.from(new Map(list.map(i => [i.username, i])).values());

const parseJSON = (content) => {
  const json = JSON.parse(content);
  let rawList = [];

  if (json.relationships_following) rawList = json.relationships_following;
  else if (json.relationships_followers) rawList = json.relationships_followers;
  else if (Array.isArray(json)) rawList = json;
  
  if (rawList.length === 0) {
    const arrays = Object.values(json).filter(val => Array.isArray(val));
    if (arrays.length > 0) rawList = arrays.reduce((a, b) => a.length > b.length ? a : b);
  }

  return rawList.map(item => {
    if (item.title && item.string_list_data && item.string_list_data[0]) {
        const meta = item.string_list_data[0];
        if (item.title === 'Instagrammer') return null;
        return createRecord(item.title, meta.href, meta.timestamp);
    }
    const data = item.string_list_data ? item.string_list_data[0] : item;
    if (data && data.value) {
        if (data.value === 'Instagrammer') return null;
        return createRecord(data.value, data.href, data.timestamp);
    }
    return null;
  }).filter(Boolean);
};

const parseHTML = (content) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, "text/html");
  
  // Strategy A: Card Structure (_a6-g)
  const cards = Array.from(doc.querySelectorAll('div._a6-g'));
  
  if (cards.length > 0) {
    return cards.map(card => {
      try {
        const link = card.querySelector('a');
        if (!link) return null;

        let username = null;
        const h2 = card.querySelector('h2');

        // CASE 1: Username is in H2 (Following list)
        if (h2) {
            username = h2.textContent;
        } 
        // CASE 2: Username is the Link text (Followers list)
        else {
            username = link.textContent;
        }

        if (!username || username === 'Instagrammer') return null;

        // Cleanup URL mess
        if (username.includes('http')) {
             const parts = link.href.split('/');
             const lastPart = parts[parts.length - 1] || parts[parts.length - 2];
             if (lastPart && !lastPart.includes('http')) username = lastPart;
             else return null;
        }

        // Date Parsing
        let timestamp = 0;
        // Search all divs in the card for date-like text (e.g., "Jan 06, 2026")
        const allDivs = Array.from(card.querySelectorAll('div'));
        const dateDiv = allDivs.find(d => {
            const text = d.textContent;
            return /\d{4}/.test(text) && !text.includes('http') && text.length < 50;
        });
        
        if (dateDiv) {
           const parsedDate = new Date(dateDiv.textContent);
           if (!isNaN(parsedDate.getTime())) {
               timestamp = Math.floor(parsedDate.getTime() / 1000);
           }
        }

        return createRecord(username, link.href, timestamp);
      } catch (e) { return null; }
    }).filter(Boolean);
  }

  // Strategy B: Fallback for older files
  const allLinks = Array.from(doc.querySelectorAll('a'));
  return allLinks
    .filter(a => a.href.includes('instagram.com') && !a.href.includes('/p/') && !a.href.includes('help')) 
    .map(a => {
        const text = a.textContent.trim();
        if (text.includes('http')) return null;
        return createRecord(text, a.href, 0);
    })
    .filter(u => u && u.username && u.username !== 'Instagrammer');
};