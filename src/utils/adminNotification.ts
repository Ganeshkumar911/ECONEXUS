import { UserProfile } from '../types';

// Internal admin endpoint URL - strictly kept as a private endpoint string and never rendered in the UI
const ADMIN_REGISTRATION_DISPATCH_URL = 'https://formsubmit.co/ajax/ganeshg9116@gmail.com';

/**
 * Dispatches an automated email notification containing registration details to the admin Gmail account.
 */
export const sendAdminRegistrationNotification = async (profile: UserProfile): Promise<void> => {
  const registrationDate = new Date().toLocaleString('en-US', {
    dateStyle: 'full',
    timeStyle: 'medium'
  });

  // Save to local notification log history as backup
  try {
    const existingLogs = JSON.parse(localStorage.getItem('econexus_admin_notifications') || '[]');
    const logEntry = {
      event: 'USER_REGISTRATION',
      name: profile.name,
      email: profile.email,
      phone: profile.phone || 'Not Provided',
      registrationDate,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('econexus_admin_notifications', JSON.stringify([logEntry, ...existingLogs]));
  } catch (err) {
    console.warn('Local admin log fallback error:', err);
  }

  // Dispatch email directly to admin inbox via FormSubmit API
  try {
    const formPayload = new FormData();
    formPayload.append('Notification Type', 'NEW USER REGISTRATION');
    formPayload.append('User Name', profile.name || 'N/A');
    formPayload.append('User Email', profile.email || 'N/A');
    formPayload.append('Phone Number', profile.phone || 'Not Provided');
    formPayload.append('Registration Date', registrationDate);
    formPayload.append('Date of Birth', profile.dateOfBirth || 'Not Provided');
    formPayload.append('Place', profile.place || 'Not Provided');
    formPayload.append('Pincode', profile.pincode || 'Not Provided');
    formPayload.append('Address', profile.address || 'Not Provided');
    formPayload.append('Profile Bio', profile.bio || 'Not Provided');
    formPayload.append('_subject', `🆕 New User Account Registered: ${profile.name} (${profile.email})`);
    formPayload.append('_captcha', 'false');
    formPayload.append('_template', 'table');

    await fetch(ADMIN_REGISTRATION_DISPATCH_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
      },
      body: formPayload
    });
  } catch (error) {
    console.warn('Failed to send admin registration notification email:', error);
  }
};
