import * as React from 'react';

interface InviteEmailProps {
  name: string;
  inviteLink: string;
  companyName: string;
}

export const InviteEmail: React.FC<InviteEmailProps> = ({
  name,
  inviteLink,
  companyName,
}) => (
  <div style={{
    fontFamily: 'sans-serif',
    backgroundColor: '#f9f9f9',
    padding: '40px',
    color: '#333',
  }}>
    <div style={{
      maxWidth: '600px',
      margin: '0 auto',
      backgroundColor: '#ffffff',
      padding: '30px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    }}>
      <h1 style={{ color: '#EAB308', marginBottom: '20px' }}>Join the {companyName} Team!</h1>
      <p>Hello {name},</p>
      <p>You have been invited to join the administrative team at <strong>{companyName}</strong>. As a member, you'll be able to manage blog posts, portfolio projects, and more.</p>
      <div style={{ textAlign: 'center', margin: '30px 0' }}>
        <a href={inviteLink} style={{
          backgroundColor: '#EAB308',
          color: '#000',
          padding: '12px 24px',
          borderRadius: '5px',
          textDecoration: 'none',
          fontWeight: 'bold',
          display: 'inline-block',
        }}>
          Accept Invitation & Set Password
        </a>
      </div>
      <p style={{ fontSize: '14px', color: '#666' }}>
        If you didn't expect this invitation, you can safely ignore this email.
      </p>
      <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '30px 0' }} />
      <p style={{ fontSize: '12px', color: '#999', textAlign: 'center' }}>
        &copy; 2026 {companyName} Solutions. All rights reserved.
      </p>
    </div>
  </div>
);
