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

// Create email transporter for Hostinger
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.hostinger.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER || 'info@gocloudex.com',
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Send email to admin (with reply-to set to customer email)
export async function sendEmailToAdmin(userData: {
  name: string;
  email: string;
  subject: string;
  message: string;
  password?: string;
  isNewCustomer: boolean;
}) {
  try {
    const mailOptions = {
      from: `"GoCloudEx Website: ${userData.email}" <${process.env.EMAIL_USER || 'info@gocloudex.com'}>`,
      to: 'info@gocloudex.com',
      replyTo: userData.email,
      subject: `${userData.isNewCustomer ? 'New Customer:' : 'Existing Customer:'} ${userData.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3b82f6;">
            ${userData.isNewCustomer ? 'New Customer Contact Form' : 'Existing Customer Message'}
          </h2>
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${userData.name}</p>
            <p><strong>Email:</strong> ${userData.email}</p>
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
            This message was sent from your website contact form.
            ${userData.isNewCustomer ? 'This is a new customer.' : 'This customer already exists in the system.'}
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent to admin successfully - ${userData.isNewCustomer ? 'New' : 'Existing'} customer`);
  } catch (error) {
    console.error('Failed to send email to admin:', error);
    throw error;
  }
}

// Send welcome email to customer (only for new customers)
export async function sendWelcomeEmail(userData: {
  name: string;
  email: string;
  password: string;
}) {
  try {
    const mailOptions = {
      from: `"GoCloudEx" <${process.env.EMAIL_USER || 'info@gocloudex.com'}>`,
      to: userData.email,
      replyTo: 'info@gocloudex.com',
      subject: 'Welcome to GoCloudEx - Your Account Details',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3b82f6;">Welcome to GoCloudEx!</h2>
          <p>Dear ${userData.name},</p>
          
          <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #0369a1; margin-top: 0;">Your Account Details</h3>
            <p><strong>Email:</strong> ${userData.email}</p>
            <p><strong>Password:</strong> ${userData.password}</p>
          </div>

          <p>You can use these credentials to access your client portal in the future.</p>
          
          <div style="background: #f1f5f9; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <p style="margin: 0; color: #475569;">
              <strong>Note:</strong> We've received your message and will get back to you within 24 hours.
              <br><br>
              <strong>To reply:</strong> Simply respond to the email you receive from us, or email <strong>info@gocloudex.com</strong> directly.
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
    console.log('Welcome email sent to new customer successfully');
  } catch (error) {
    console.error('Failed to send welcome email:', error);
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
    const mailOptions = {
      from: `"GoCloudEx" <${process.env.EMAIL_USER || 'info@gocloudex.com'}>`,
      to: userData.email,
      replyTo: 'info@gocloudex.com',
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
export async function handleCustomerEmail(userData: {
  name: string;
  email: string;
  subject: string;
  message: string;
  isNewCustomer: boolean;
  existingPassword?: string;
}) {
  try {
    console.log(`Handling email for ${userData.isNewCustomer ? 'NEW' : 'EXISTING'} customer: ${userData.email}`);

    // Send email to admin with customer's email as reply-to
    await sendEmailToAdmin({
      name: userData.name,
      email: userData.email,
      subject: userData.subject,
      message: userData.message,
      password: userData.isNewCustomer ? userData.existingPassword : undefined,
      isNewCustomer: userData.isNewCustomer
    });

    // Send appropriate email to customer based on whether they're new or existing
    if (userData.isNewCustomer && userData.existingPassword) {
      await sendWelcomeEmail({
        name: userData.name,
        email: userData.email,
        password: userData.existingPassword
      });
      
      return {
        success: true,
        message: 'Welcome email sent with credentials',
        customerType: 'new'
      };
    } else {
      await sendFollowUpEmail({
        name: userData.name,
        email: userData.email,
        subject: userData.subject
      });
      
      return {
        success: true,
        message: 'Follow-up email sent to existing customer',
        customerType: 'existing'
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
  } catch (error) {
    console.error('Email server connection failed:', error);
    return false;
  }
}