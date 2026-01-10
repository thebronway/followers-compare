import React from 'react';
import LegalPage from './LegalPage';

const Privacy = () => (
  <LegalPage title="Privacy Policy" lastUpdated="January 2026">
    <h3>1. Data Processing</h3>
    <p>We prioritize your privacy. This tool operates entirely on the client-side. When you upload your Instagram JSON or HTML files, they are processed locally within your browser. <strong>No personal data is ever sent to our servers.</strong></p>
    
    <h3>2. Cookies & Local Storage</h3>
    <p>We use local storage only to save your preferences (such as Dark Mode settings). We may use third-party cookies (Google AdSense) to serve personalized ads.</p>
    
    <h3>3. Information Collection</h3>
    <p>Since we do not host a backend database for user data, we do not collect, store, or share your Instagram information. Once you close this tab, your uploaded data is cleared from your browser's memory.</p>
  </LegalPage>
);
export default Privacy;