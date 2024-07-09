import { TempMail } from 'tempmail.lol';
import axios from 'axios';

const tempmail = new TempMail();

const handler = async (m, { text, usedPrefix, command }) => {
  if (command === 'tempmail') {
    try {
      const inbox = await tempmail.createInbox();
      const emailAddress = inbox.address;
      const verificationToken = inbox.token;
      
      const mensajeCorreo = '*Dirección de correo temporal creada:*\n' + ` ${emailAddress}\n\nUsa el siguiente token para verificar la bandeja de entrada con el comando .verificarcorreo.\n\nToken: ${verificationToken}`;
      const url = "https://i.imgur.com/wLYsnXG.jpeg";
      const responseImg = await axios.get(url, { responseType: 'arraybuffer' });
      const imageData = responseImg.data;
      
      await conn.sendFile(m.chat, imageData, "thumbnail.png", mensajeCorreo, m, null, rcanal);
      await m.reply(`Tu token es: ${verificationToken}`);
      await m.react("📧");
    } catch (error) {
      console.error('Error al generar el correo temporal:', error);
      const errorMessage = 'No se pudo generar una dirección de correo temporal. Intenta nuevamente.';
      await m.reply(errorMessage);
    }
  } else if (command === 'verificarcorreo') {
    if (!text) {
      const tokenRequestMessage = 'Por favor, proporciona el token del correo temporal que deseas verificar.';
      await m.reply(tokenRequestMessage);
      return;
    }
    try {
      const emails = await tempmail.checkInbox(text);
      if (!emails || emails.length === 0) {
        const noEmailsMessage = 'No se encontraron mensajes en la bandeja de entrada o el token ha expirado.';
        await m.reply(noEmailsMessage);
        return;
      }
      const formattedEmails = emails.map(email => {
        const sender = email.from;
        const subject = email.subject;
        const dateReceived = new Date(email.date).toLocaleString();
        const emailBody = email.body;
        return `
De: ${sender}
Asunto: ${subject}
Fecha: ${dateReceived}
Mensaje:
${emailBody}
        `;
      }).join('\n\n---\n\n');
      const mensajeRespuesta = '*Mensajes en tu bandeja de entrada:*\n\n' + formattedEmails;
      await m.reply(mensajeRespuesta);
    } catch (error) {
      console.error('Error al verificar la bandeja de entrada:', error);
      const verificationErrorMessage = 'Hubo un problema al verificar la bandeja de entrada. Por favor, intenta de nuevo.';
      await m.reply(verificationErrorMessage);
    }
  }
};

handler.help = ['tempmail', 'verificarcorreo <token>'];
handler.tags = ['herramientas'];
handler.command = ['tempmail', 'verificarcorreo'];
handler.register = false;

export default handler;