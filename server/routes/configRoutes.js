import express from 'express';

const router = express.Router();

// Public config endpoint for client runtime values (non-sensitive)
router.get('/', (req, res) => {
    const contactRecipient = process.env.CONTACT_RECIPIENT || null;
    const contactCc = process.env.CONTACT_CC || null;

    return res.json({
        contactRecipient,
        contactCc,
    });
});

export default router;
