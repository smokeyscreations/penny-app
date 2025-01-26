import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'layla84@ethereal.email',
                pass: 'xDq48Rkb7qz1NqUWJp'
            }
        })
    }

    async sendPasswordResetEmail(to: string, token: string){
        const resetLink = `http://localhost:4200/reset-password?token=${token}`;
        const mailOptions = {
            from: 'Malafaty - Port Your Folios',
            to: to,
            subject: 'Password Reset Request',
            html: `<p>Click the link below to reset your password: </p><p><a href="${resetLink}">Reset Password</></p></a>
            <p>If this is not you, please change your password by following the instructions below: `
        };

        await this.transporter.sendMail(mailOptions);
    }
}