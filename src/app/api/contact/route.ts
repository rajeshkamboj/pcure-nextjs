import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Option 1: Using Resend (recommended for Next.js)
    if (process.env.RESEND_API_KEY) {
      return await sendViaResend({ name, email, subject, message });
    }

    // Option 2: Using SendGrid
    if (process.env.SENDGRID_API_KEY) {
      return await sendViaSendGrid({ name, email, subject, message });
    }

    // Option 3: Using NodeMailer (if you have SMTP credentials)
    if (process.env.SMTP_HOST) {
      return await sendViaSMTP({ name, email, subject, message });
    }

    // Option 4: Fallback - save to database or log
    console.log('Contact form submission:', { name, email, subject, message });
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}

// Option 1: Resend Email Service
async function sendViaResend({ name, email, subject, message }: any) {
  try {
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'noreply@patientscure.com',
      to: 'hello@patientscure.com',
      replyTo: email,
      subject: `New Contact Form: ${subject} from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Resend error:', error);
    throw error;
  }
}

// Option 2: SendGrid Email Service
async function sendViaSendGrid({ name, email, subject, message }: any) {
  try {
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    await sgMail.send({
      to: 'hello@patientscure.com',
      from: 'noreply@patientscure.com',
      replyTo: email,
      subject: `New Contact Form: ${subject} from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('SendGrid error:', error);
    throw error;
  }
}

// Option 3: Nodemailer (SMTP)
async function sendViaSMTP({ name, email, subject, message }: any) {
  try {
    const nodemailer = require('nodemailer');

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'noreply@patientscure.com',
      to: 'hello@patientscure.com',
      replyTo: email,
      subject: `New Contact Form: ${subject} from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('SMTP error:', error);
    throw error;
  }
}
