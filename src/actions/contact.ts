'use server';

import connectDB from '@/lib/database';
import User from '@/models/User';
import { handleCustomerEmail, generatePassword } from '@/lib/email';
import { ApiResponse } from '@/types';

interface ContactInput {
    name: string;
    email: string;
    subject: string;
    message: string;
}

/**
 * Handles contact form submissions using Server Actions.
 * Faster than API routes as it reduces client-side fetch overhead.
 */
export async function submitContactForm(data: ContactInput): Promise<ApiResponse<any>> {
    try {
        await connectDB();

        const { name, email, subject, message } = data;

        // Server-side validation
        if (!name || !email || !subject || !message) {
            return { success: false, error: 'All fields are required' };
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return { success: false, error: 'Please provide a valid email address' };
        }

        // Process user data
        let user = await User.findOne({ email });
        const isNewCustomer = !user;
        let password = '';

        if (user) {
            user.emailCount += 1;
            user.emailUnreadCount += 1;
            user.lastEmailSubject = subject;
            user.lastEmailMessage = message.substring(0, 100) + (message.length > 100 ? '...' : '');
            user.lastEmailDate = new Date();
        } else {
            password = generatePassword();
            user = new User({
                name,
                email,
                password,
                emailCount: 1,
                emailUnreadCount: 1,
                lastEmailSubject: subject,
                lastEmailMessage: message.substring(0, 100) + (message.length > 100 ? '...' : ''),
                lastEmailDate: new Date(),
                chatCount: 0,
                chatUnreadCount: 0
            });
        }

        await user.save();

        // Send emails asynchronously (don't block the response)
        // In Server Actions, we can just call this
        try {
            await handleCustomerEmail({
                name,
                email,
                subject,
                message,
                isNewCustomer,
                existingPassword: isNewCustomer ? password : undefined,
                source: 'contact'
            });
        } catch (emailError) {
            console.error('Email sending failed in action:', emailError);
        }

        return {
            success: true,
            message: isNewCustomer
                ? 'Message sent successfully! Check your email for account details.'
                : 'Message sent successfully! We\'ll get back to you soon.',
            data: {
                userId: user._id.toString(),
                isNewCustomer,
                hasAccount: true
            }
        };
    } catch (error) {
        console.error('Contact form action error:', error);
        return { success: false, error: 'Internal server error. Please try again later.' };
    }
}
