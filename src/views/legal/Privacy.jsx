import React from 'react';
import LegalPage from './LegalPage';

const Privacy = () => (
  <LegalPage title="Privacy Policy" lastUpdated="January 2026">
    <h3>1. Introduction and Overview</h3>
    <p>Welcome to FollowersCompare. We respect your privacy and are committed to protecting your personal data. This Privacy Policy will inform you as to how we look after your data when you visit our website and tell you about your privacy rights and how the law protects you. By using our service, you agree to the collection and use of information in accordance with this policy.</p>

    <h3>2. How We Process Your Data (Client-Side Processing)</h3>
    <p>FollowersCompare is uniquely designed as a client-side application. When you use our tool, the data files you provide (such as your Instagram JSON or HTML exports) are processed entirely locally within your web browser. <strong>Your personal data, including follower lists, messages, and profile information, is never uploaded to, transmitted to, or stored on our servers.</strong> Once you close your browser tab or refresh the page, the processed data is cleared from your device's active memory.</p>
    
    <h3>3. Information We Collect and Log (Analytics)</h3>
    <p>Because our core functionality operates completely client-side, we do not require user registration and we do not collect, harvest, or store your social media data. However, to understand how our tool is being used and to improve the user experience, we use <strong>Umami Analytics</strong>.</p>
    <p>Umami is a privacy-focused, GDPR-compliant analytics solution. It helps us track broad, anonymous usage trends (such as page views, button clicks, and which features are most popular). Umami does <strong>not</strong> collect any Personally Identifiable Information (PII), it anonymizes IP addresses, and it does not track you across other websites.</p>

    <h3>4. Cookies and Third-Party Advertising</h3>
    <p>We use local storage mechanisms within your browser exclusively to save non-identifiable user preferences, such as your dark mode toggle and deactivated account hidden lists. <strong>Our analytics provider (Umami) is entirely cookie-less.</strong></p>
    <p>We may use third-party advertising companies, such as Google AdSense, to serve ads when you visit our Website. These companies may use cookies to serve ads based on your prior visits to our website or other websites on the Internet. Users may opt out of personalized advertising by visiting Google's Ads Settings.</p>

    <h3>5. Your Data Protection Rights (GDPR & CCPA)</h3>
    <p>Even though we do not store your personal data on our servers, we fully support your rights under the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA). Since you retain full possession of your data files on your own device, you possess total control over your right to access, rectify, or erase your personal information. We cannot delete or modify your data because we do not have access to it.</p>

    <h3>6. Children's Privacy</h3>
    <p>Our website and services are not directed to individuals under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and you are aware that your child has provided us with Personal Data (which is impossible via our standard client-side tool, but pertains to email communications), please contact us so that we will be able to take necessary actions.</p>

    <h3>7. Changes to This Privacy Policy</h3>
    <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top. You are advised to review this Privacy Policy periodically for any changes.</p>

    <h3>8. Contact Us</h3>
    <p>If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us by visiting our Contact page or emailing us directly at support@followercompare.conway.im.</p>
  </LegalPage>
);

export default Privacy;