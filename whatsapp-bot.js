const makeWASocket = require('@whiskeysockets/baileys').default;
const { Boom } = require('@hapi/boom');

async function connectToWhatsApp() {
    const sock = makeWASocket({ printQRInTerminal: true });

    sock.ev.on('messages.upsert', async (m) => {
        const msg = m.messages[0];
        if (!msg.message || !msg.key.remoteJid) return;

        const text = msg.message.conversation || msg.message.extendedTextMessage?.text;
        console.log(`Messaggio ricevuto: ${text}`);

        if (text.toLowerCase() === 'ciao') {
            await sock.sendMessage(msg.key.remoteJid, { text: 'Ciao! Come posso aiutarti?' });
        }
    });
}

connectToWhatsApp();
