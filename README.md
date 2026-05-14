# Jass Food and Kokani Delicacies

A home-based sweets storefront for `Jass Food and Kokani Delicacies`.

## Overview

This repository contains a production-ready frontend and backend for an authentic Kokani sweets business.

- Frontend: React + Vite + TailwindCSS
- Backend: Node.js + Express
- State management: React Context API
- Transient order processing with WhatsApp and email receipts

## Folder structure

- `/client` — React app
- `/server` — Express API
- `.env.example` — template for environment variables

## Setup

1. Clone or copy the project into a workspace.
2. Install dependencies:
   - `npm run install:all`
3. Create a `.env` file in the project root based on `.env.example`.
4. Run the app:
   - `npm run dev`

## Environment variables

Copy `.env.example` to `.env` and fill in values.

Required variables:

- `PORT` — backend port (default `4000`)
- `OWNER_WHATSAPP_NUMBER` — `919833987609`
- `SMTP_HOST` — e.g. `smtp.gmail.com`
- `SMTP_PORT` — e.g. `465`
- `SMTP_USER` — email address for sending receipts
- `SMTP_PASS` — app password for Gmail or provider password

Optional SMS variables:

- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `TWILIO_FROM_NUMBER`

## Running locally

- Frontend: `npm run dev:client`
- Backend: `npm run dev:server`
- Full stack: `npm run dev`

## Notes

- Orders are transient; no database is used.
- WhatsApp link opens on the customer side to send the message.
- Email receipt is sent via configured SMTP.
- SMS is optional and only sent when Twilio credentials are set.
