import { describe, it, expect } from 'vitest';
import { ENV } from './_core/env';

describe('SendGrid API Key Validation', () => {
  it('should have SENDGRID_API_KEY configured', () => {
    const apiKey = process.env.SENDGRID_API_KEY;
    expect(apiKey).toBeDefined();
    expect(apiKey).toBeTruthy();
    expect(apiKey).toMatch(/^SG\./);
  });

  it('should be able to test SendGrid connection', async () => {
    const apiKey = process.env.SENDGRID_API_KEY;
    if (!apiKey) {
      throw new Error('SENDGRID_API_KEY not configured');
    }

    try {
      const response = await fetch('https://api.sendgrid.com/v3/mail/validate', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [
            {
              to: [{ email: 'test@example.com' }],
            },
          ],
          from: { email: 'test@example.com' },
          subject: 'Test',
          content: [{ type: 'text/plain', value: 'Test' }],
        }),
      });

      // SendGrid returns 400 for validation endpoint, but 401 means auth failed
      expect(response.status).not.toBe(401);
      expect(response.status).not.toBe(403);
    } catch (error) {
      console.error('SendGrid connection test error:', error);
      throw error;
    }
  });
});
