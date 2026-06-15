import express from 'express';
import { sendContactEmail } from '../services/emailService.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Name, email, and message are required.' });
    }

    const ownerEmail = process.env.OWNER_EMAIL || process.env.SMTP_USER;
    const ownerSubject = subject?.trim() || `New contact request from ${name}`;
    const userSubject = `We received your query at Jass Food`;

    try {
        await sendContactEmail({
            to: ownerEmail,
            subject: ownerSubject,
            name,
            email,
            phone,
            message,
            replyTo: email,
            isConfirmation: false,
        });

        await sendContactEmail({
            to: email,
            subject: userSubject,
            name,
            email,
            phone,
            message,
            isConfirmation: true,
        });

        return res.json({ status: 'success' });
    } catch (error) {
        console.error('Contact email send failed:', error);
        return res.status(500).json({ message: 'Unable to submit your query at the moment.' });
    }
});

export default router;
