import React from 'react';
import LegalPage from './LegalPage';

const Contact = () => (
  <LegalPage title="Contact Us" lastUpdated="January 2026">
    <p>We are always happy to hear from our users. Whether you have a question about how the tool works, a technical issue, or a suggestion for a new feature, please feel free to reach out.</p>
    
    <h3>1. General Inquiries & Support</h3>
    <p>For all general inquiries, bug reports, and technical support, please email us directly at:</p>
    <p className="font-bold text-indigo-600 dark:text-indigo-400 text-lg my-4">support@followercompare.conway.im</p>
    
    <h3>2. Response Time</h3>
    <p>FollowersCompare is an independently managed utility. We make every effort to read all emails and typically respond within 2 to 3 business days. Please be as detailed as possible in your initial email if you are reporting a bug (e.g., mention your browser, device, and the specific error message).</p>

    <h3>3. Privacy Notice</h3>
    <p>Any information you send to us via email (including your name and email address) will only be used to respond to your specific inquiry. We will never sell your contact information or add you to a marketing newsletter without your explicit consent.</p>
  </LegalPage>
);

export default Contact;