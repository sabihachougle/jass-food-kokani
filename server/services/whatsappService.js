export const buildWhatsAppLink = (phoneNumber, message) => {
  if (!phoneNumber || typeof phoneNumber !== 'string') {
    return null;
  }

  const normalized = phoneNumber.replace(/[^0-9]/g, '');
  if (!normalized) {
    return null;
  }

  const encoded = encodeURIComponent(message);
  return `https://wa.me/${normalized}?text=${encoded}`;
};
