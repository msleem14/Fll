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
    const formData = await request.formData();
    
    const fullName = formData.get('fullName') as string;
    const phone = formData.get('phone') as string;
    const city = formData.get('city') as string;
    const position = formData.get('position') as string;
    const experience = formData.get('experience') as string;
    const notes = formData.get('notes') as string;
    const file = formData.get('file') as File | null;

    // Validate required fields
    if (!fullName || !phone || !city || !position) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const settings = getSettings();

    // Create email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Prepare attachments
    const attachments: Array<{ filename: string; content: Buffer }> = [];
    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      attachments.push({
        filename: file.name,
        content: buffer,
      });
    }

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: settings.email,
      subject: `طلب توظيف جديد - ${position} - ${fullName}`,
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 10px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #dc2626; margin-bottom: 20px; border-bottom: 2px solid #dc2626; padding-bottom: 10px;">
              طلب توظيف جديد - FLL Express
            </h2>
            
            <div style="background-color: #dc2626; color: white; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
              <strong>الوظيفة المطلوبة:</strong> ${position}
            </div>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #eee; font-weight: bold; width: 130px; background-color: #fafafa;">الاسم الكامل:</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">${fullName}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #eee; font-weight: bold; background-color: #fafafa;">رقم الجوال:</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee;" dir="ltr">${phone}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #eee; font-weight: bold; background-color: #fafafa;">المدينة:</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">${city}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #eee; font-weight: bold; background-color: #fafafa; vertical-align: top;">الخبرة السابقة:</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">${experience || 'غير متوفر'}</td>
              </tr>
              <tr>
                <td style="padding: 12px; font-weight: bold; background-color: #fafafa; vertical-align: top;">ملاحظات:</td>
                <td style="padding: 12px;">${notes || 'لا توجد ملاحظات'}</td>
              </tr>
            </table>
            
            ${file ? `
              <div style="margin-top: 20px; padding: 15px; background-color: #f0f9ff; border-radius: 8px; border: 1px solid #bae6fd;">
                <strong>📎 ملف مرفق:</strong> ${file.name}
              </div>
            ` : ''}
            
            <p style="color: #888; margin-top: 20px; font-size: 12px; text-align: center;">
              تم الإرسال من موقع FLL Express Logistics
            </p>
          </div>
        </div>
      `,
      attachments,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Career form error:', error);
    return NextResponse.json(
      { error: 'Failed to submit application' },
      { status: 500 }
    );
  }
}

