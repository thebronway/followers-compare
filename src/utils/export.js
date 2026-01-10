import * as XLSX from 'xlsx';

export const downloadExcel = (dataSets) => {
  const wb = XLSX.utils.book_new();
  
  // dataSets is object: { "Mutuals": [...], "Non-Followers": [...] }
  Object.entries(dataSets).forEach(([sheetName, data]) => {
    if (!data || data.length === 0) return;
    
    const formatted = data.map(u => ({
      Username: u.username,
      "Profile Link": u.url,
      "Date Followed": u.dateStr
    }));

    const ws = XLSX.utils.json_to_sheet(formatted);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
  });

  const date = new Date().toISOString().split('T')[0];
  XLSX.writeFile(wb, `Instagram_Analysis_${date}.xlsx`);
};