import nodemailer from 'nodemailer';

// Generate random password (8 characters: letters and numbers)
export function generatePassword(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let password = '';
  for (let i = 0; i < 8; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

// Create email transporter dynamically based on service type
const serviceType = (process.env.EMAIL_SERVICE_TYPE || 'hostinger').toLowerCase();

console.log(`Email Service Initializing: ${serviceType} (User: ${process.env.EMAIL_USER})`);

const createTransporter = () => {
  if (serviceType === 'gmail') {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER?.trim(),
        pass: process.env.EMAIL_PASSWORD?.trim(),
      },
    });
  }

  // Default to Hostinger/Custom SMTP
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.hostinger.com',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: process.env.EMAIL_PORT === '465',
    auth: {
      user: process.env.EMAIL_USER?.trim(),
      pass: process.env.EMAIL_PASSWORD?.trim(),
    },
    // Add some common defaults for reliability
    tls: {
      rejectUnauthorized: false // Helps with some shared hosting certificates
    }
  });
};

const transporter = createTransporter();

// Send email to admin (with reply-to set to customer email)
export async function sendEmailToAdmin(userData: {
  name: string;
  email: string;
  subject: string;
  message: string;
  password?: string;
  isNewCustomer: boolean;
  source?: 'contact' | 'chat';
}) {
  try {
    const sourceText = userData.source === 'chat' ? 'Chat System' : 'Contact Form';
    const adminEmail = process.env.EMAIL_USER;

    const mailOptions = {
      from: `"GoCloudEx ${sourceText}: ${userData.email}" <${adminEmail}>`,
      to: adminEmail,
      replyTo: userData.email,
      subject: `${userData.isNewCustomer ? 'New Customer' : 'Existing Customer'}: ${userData.subject}`,
      html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3b82f6;">
            ${userData.isNewCustomer ? 'New Customer' : 'Existing Customer'} - ${userData.subject}
          </h2>
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${userData.name}</p>
            <p><strong>Email:</strong> ${userData.email}</p>
            <p><strong>Source:</strong> ${sourceText}</p>
            ${userData.isNewCustomer && userData.password ? `<p><strong>Generated Password:</strong> ${userData.password}</p>` : ''}
            <p><strong>Subject:</strong> ${userData.subject}</p>
            <p><strong>Message:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
              ${userData.message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <div style="background: #f0fdf4; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <p style="margin: 0; color: #166534;">
              <strong>💡 Quick Reply:</strong> Simply hit "Reply" in your email client to respond directly to ${userData.name}.
            </p>
          </div>
          <p style="color: #64748b; font-size: 14px;">
            This message was sent from your website ${sourceText.toLowerCase()}.
            ${userData.isNewCustomer ? 'This is a new customer.' : 'This customer already exists in the system.'}
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent to admin successfully - ${userData.isNewCustomer ? 'New' : 'Existing'} customer from ${sourceText}`);
  } catch (error: any) {
    console.error('Failed to send email to admin:', error.message);
    if (error.code) console.error('Error Code:', error.code);
    throw error;
  }
}

// Send welcome email to customer (only for new customers)
export async function sendWelcomeEmail(userData: {
  name: string;
  email: string;
  password: string;
  source?: 'contact' | 'chat' | 'admin';
  isReminder?: boolean;
}) {
  try {
    const sourceText = userData.source === 'chat' ? 'chat system' :
      userData.source === 'admin' ? 'admin system' : 'contact form';
    const adminEmail = process.env.EMAIL_USER;

    const mailOptions = {
      from: `"GoCloudEx" <${adminEmail}>`,
      to: userData.email,
      replyTo: adminEmail,
      subject: userData.isReminder
        ? 'Your GoCloudEx Account Password'
        : 'Welcome to GoCloudEx - Your Account Details',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3b82f6;">
            ${userData.isReminder ? 'Your Account Password' : 'Welcome to GoCloudEx!'}
          </h2>
          <p>Dear ${userData.name},</p>
          
          <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #0369a1; margin-top: 0;">
              ${userData.isReminder ? 'Your Account Credentials' : 'Your Account Details'}
            </h3>
            <p><strong>Name:</strong> ${userData.name}</p>
            <p><strong>Email:</strong> ${userData.email}</p>
            <p><strong>Password:</strong> ${userData.password}</p>
            ${!userData.isReminder && userData.source ? `<p><strong>Source:</strong> Created via ${sourceText}</p>` : ''}
          </div>

          ${userData.isReminder ? `
            <p>We noticed you tried to create a new account, but you're already our valued customer!</p>
            <div style="background: #fffbeb; padding: 15px; border-radius: 6px; margin: 20px 0;">
              <p style="margin: 0; color: #92400e;">
                <strong>💡 You're our existing customer!</strong> Use the password above to access your chat history and account.
              </p>
            </div>
          ` : `
            <p>You can use these credentials to:</p>
            <ul>
              <li>Access your chat history in our floating chat system</li>
              <li>Track your email communications with us</li>
              <li>Access your client portal in the future</li>
            </ul>
          `}
          
          <div style="background: #f1f5f9; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <p style="margin: 0; color: #475569;">
              <strong>To access chat:</strong> Use the chat widget on our website and select "Returning User" to login with these credentials.
            </p>
          </div>

          <p>Best regards,<br>The GoCloudEx Team</p>
          
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
          <p style="color: #64748b; font-size: 12px;">
            This is an automated message. Please do not reply to this email.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`${userData.isReminder ? 'Password reminder' : 'Welcome'} email sent to ${userData.source} user successfully`);
  } catch (error: any) {
    console.error(`Failed to send ${userData.isReminder ? 'password reminder' : 'welcome'} email:`, error.message);
    if (error.code) console.error('Error Code:', error.code);
    throw error;
  }
}

// Send update notification email when user credentials are modified
export async function sendUpdateEmail(userData: {
  name: string;
  email: string;
  password: string;
  previousEmail?: string;
}) {
  try {
    const adminEmail = process.env.EMAIL_USER;

    const mailOptions = {
      from: `"GoCloudEx" <${adminEmail}>`,
      to: userData.email,
      replyTo: adminEmail,
      subject: 'Your GoCloudEx Account Has Been Updated',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3b82f6;">Account Updated</h2>
          <p>Dear ${userData.name},</p>
          
          <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #0369a1; margin-top: 0;">Your Updated Account Details</h3>
            <p><strong>Name:</strong> ${userData.name}</p>
            <p><strong>Email:</strong> ${userData.email}</p>
            <p><strong>Password:</strong> ${userData.password}</p>
            ${userData.previousEmail ? `
              <div style="background: #fffbeb; padding: 10px; border-radius: 4px; margin-top: 10px;">
                <p style="margin: 0; color: #92400e;">
                  <strong>Note:</strong> Your email has been updated from ${userData.previousEmail}
                </p>
              </div>
            ` : ''}
          </div>

          <p>Your account credentials have been updated by our admin team. You can now use these new credentials to:</p>
          <ul>
            <li>Access your chat history in our floating chat system</li>
            <li>Track your email communications with us</li>
            <li>Access your client portal</li>
          </ul>
          
          <div style="background: #f1f5f9; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <p style="margin: 0; color: #475569;">
              <strong>To access your account:</strong> Use the credentials above with our chat system or contact forms.
              If you didn't request this change, please contact us immediately.
            </p>
          </div>

          <p>Best regards,<br>The GoCloudEx Team</p>
          
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
          <p style="color: #64748b; font-size: 12px;">
            This is an automated message. Please do not reply to this email.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Update notification email sent successfully to:', userData.email);
  } catch (error) {
    console.error('Failed to send update notification email:', error);
    throw error;
  }
}

// Send follow-up email to existing customers (without password)
export async function sendFollowUpEmail(userData: {
  name: string;
  email: string;
  subject: string;
}) {
  try {
    const adminEmail = process.env.EMAIL_USER;

    const mailOptions = {
      from: `"GoCloudEx" <${adminEmail}>`,
      to: userData.email,
      replyTo: adminEmail,
      subject: 'We\'ve received your message',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3b82f6;">Message Received</h2>
          <p>Dear ${userData.name},</p>
          
          <p>Thank you for contacting us again. We've received your message regarding:</p>
          
          <div style="background: #f0f9ff; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <p style="margin: 0; font-style: italic;">"${userData.subject}"</p>
          </div>

          <p>We'll review your message and get back to you as soon as possible.</p>
          
          <div style="background: #f1f5f9; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <p style="margin: 0; color: #475569;">
              <strong>Your existing credentials are still active.</strong> You can use them to access your client portal.
            </p>
          </div>

          <p>Best regards,<br>The GoCloudEx Team</p>
          
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
          <p style="color: #64748b; font-size: 12px;">
            This is an automated message. Please do not reply to this email.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Follow-up email sent to existing customer successfully');
  } catch (error) {
    console.error('Failed to send follow-up email:', error);
    throw error;
  }
}

// Main function to handle customer emails
// Update the handleCustomerEmail function to properly handle contact form emails
export async function handleCustomerEmail(userData: {
  name: string;
  email: string;
  subject: string;
  message: string;
  isNewCustomer: boolean;
  existingPassword?: string;
  source?: 'contact' | 'chat';
}) {
  try {
    console.log(`Handling email for ${userData.isNewCustomer ? 'NEW' : 'EXISTING'} customer from ${userData.source}: ${userData.email}`);

    // Send email to admin with customer's email as reply-to
    await sendEmailToAdmin({
      name: userData.name,
      email: userData.email,
      subject: userData.subject,
      message: userData.message,
      password: userData.isNewCustomer ? userData.existingPassword : undefined,
      isNewCustomer: userData.isNewCustomer,
      source: userData.source
    });

    // Send welcome email to new customers (both contact form and chat)
    if (userData.isNewCustomer && userData.existingPassword) {
      await sendWelcomeEmail({
        name: userData.name,
        email: userData.email,
        password: userData.existingPassword,
        source: userData.source || 'contact'
      });

      return {
        success: true,
        message: 'Welcome email sent with credentials',
        customerType: 'new',
        source: userData.source
      };
    } else {
      // For existing customers from contact form, send follow-up email
      if (userData.source === 'contact') {
        await sendFollowUpEmail({
          name: userData.name,
          email: userData.email,
          subject: userData.subject
        });
      }
      // For existing chat users, no separate email needed as they see messages in chat

      return {
        success: true,
        message: userData.source === 'contact' ? 'Follow-up email sent' : 'Message processed',
        customerType: 'existing',
        source: userData.source
      };
    }

  } catch (error) {
    console.error('Failed to handle customer email:', error);
    throw error;
  }
}

// Test email connection
export async function testEmailConnection() {
  try {
    await transporter.verify();
    console.log('Email server connection verified');
    return true;
  } catch (error: any) {
    console.error('Email server connection failed:', error.message);
    if (error.code) console.error('Error Code:', error.code);
    return false;
  }
}

