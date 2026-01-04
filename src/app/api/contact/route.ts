import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

// Get settings from content.json
function getSettings() {
  const contentPath = path.join(process.cwd(), 'src/data/content.json');
  const content = JSON.parse(fs.readFileSync(contentPath, 'utf-8'));
  return content.settings;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, message } = body;

    // Validate required fields
    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const settings = getSettings();

    // Create email transporter
    // Note: Configure these environment variables in production
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: settings.email,
      subject: `رسالة جديدة من موقع FLL Express - ${name}`,
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 10px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #dc2626; margin-bottom: 20px; border-bottom: 2px solid #dc2626; padding-bottom: 10px;">
              رسالة جديدة من موقع FLL Express
            </h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 120px;">الاسم:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">الجوال:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;" dir="ltr">${phone}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">البريد:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${email || 'غير متوفر'}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; vertical-align: top;">الرسالة:</td>
                <td style="padding: 10px;">${message}</td>
              </tr>
            </table>
            
            <p style="color: #888; margin-top: 20px; font-size: 12px; text-align: center;">
              تم الإرسال من موقع FLL Express Logistics
            </p>
          </div>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}

