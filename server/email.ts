import { ENV } from './_core/env';

export async function sendNewsletterNotification(email: string): Promise<void> {
  const apiKey = process.env.SENDGRID_API_KEY;
  
  if (!apiKey) {
    console.warn('[Email] SendGrid API key not configured');
    return;
  }

  try {
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: 'sorayaperrymusic@gmail.com' }],
            subject: 'New Newsletter Subscriber',
          },
        ],
        from: {
          email: 'sorayaperrymusic@gmail.com',
          name: 'Soraya Perry Music',
        },
        content: [
          {
            type: 'text/html',
            value: `
              <h2>New Newsletter Subscriber</h2>
              <p>A new fan has subscribed to your newsletter!</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
              <p>Check your subscriber list in the Management Dashboard to view all subscribers.</p>
            `,
          },
        ],
        reply_to: {
          email: email,
        },
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('[Email] SendGrid error:', response.status, error);
      throw new Error(`SendGrid error: ${response.status}`);
    }

    console.log('[Email] Newsletter notification sent for:', email);
  } catch (error) {
    console.error('[Email] Failed to send newsletter notification:', error);
    // Don't throw - we don't want to fail the subscription if email fails
  }
}
