import { NextRequest, NextResponse } from 'next/server';
import React from 'react';
import { Resend } from 'resend';
import { render } from '@react-email/components';
import { EmailTemplate } from '@/app/components/EmailTemplate';

const resend = new Resend(process.env.RESEND_API_KEY);

const RECIPIENT = 'amir@suntagandtitle.com';
const FROM = 'Sun Tag & Title Contact Form <noreply@suntagandtitle.com>';

// Allowed service request values — prevents arbitrary content injection
const ALLOWED_REQUESTS = [
  'Title Transfer',
  'Vehicle Registration Renewal',
  'Temporary Tag',
  'Duplicate Title',
  'Notary Service',
  'Other',
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const name: string = (body.name ?? '').trim().slice(0, 100);
    const company: string = (body.company ?? '').trim().slice(0, 100);
    const email: string = (body.email ?? '').trim().slice(0, 254);
    const phone: string = (body.phone ?? '').trim().slice(0, 30);
    const request: string = (body.request ?? '').trim();
    const message: string = (body.message ?? '').trim().slice(0, 2000);

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'name, email, and message are required.' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }

    // Validate request type against allowlist
    if (request && !ALLOWED_REQUESTS.includes(request)) {
      return NextResponse.json({ error: 'Invalid request type.' }, { status: 400 });
    }

    const html = await render(
      React.createElement(EmailTemplate, { name, company, email, phone, request: request || 'General Inquiry', message })
    );

    const { error } = await resend.emails.send({
      from: FROM,
      to: RECIPIENT,
      replyTo: email,
      subject: `New Contact: ${request || 'General Inquiry'} — ${name}`,
      html,
    });

    if (error) {
      console.error('[contact] Resend error:', error);
      return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact] Unexpected error:', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
