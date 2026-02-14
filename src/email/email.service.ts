



import { Injectable, InternalServerErrorException } from '@nestjs/common';
import sgMail from '@sendgrid/mail';


export interface SendMailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  from?: string;
}

@Injectable()
export class EmailService {
  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
  }

  async sendMail(options: SendMailOptions): Promise<void> {
    const msg: sgMail.MailDataRequired = {
      to: options.to,
      from: options.from || process.env.SENDGRID_FROM!,
      subject: options.subject,
      // At least one of text or html is required
      ...(options.html
        ? { html: options.html, text: options.text || '' }
        : { text: options.text || '' }),
    };
    try {
      await sgMail.send(msg);
    } catch (error) {
      throw new InternalServerErrorException({
        code: 'EMAIL_SEND_ERROR',
        message: 'Failed to send email',
        details: { error: error?.toString?.() }
      });
    }
  }
}
