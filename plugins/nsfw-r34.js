//Creditos: https://github.com/DanixlJs

import fetch from 'node-fetch';
const handler = async (m, { conn, args, usedPrefix }) => {
if (!args[0]) {
if (!db.data.chats[m.chat].modohorny && m.isGroup) return conn.reply(m.chat, `💌 El grupo no admite contenido *Nsfw.*\n\nPara activarlo, un *Administrador* debe usar el comando ${usedPrefix}on modohorny`, m, rcanal)
await conn.reply(m.chat, '🤍 Ingresa el nombre de la imágen que estas buscando', m, rcanal);
return;
}
const use = args[0];
const url = `https://rule34.xxx/index.php?page=dapi&s=post&q=index&json=1&tags=${use}`;
try {
conn.reply(m.chat, wait, m, {
contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, showAdAttribution: true,
title: packname,
body: wm,
previewType: 0, thumbnail: icons,
sourceUrl: channel }}})
const response = await fetch(url);
const data = await response.json();
if (!data || data.length === 0) {
await conn.reply(m.chat, `💌 No hubo resultados para *${use}*`, m, rcanal);
return;
}
const randomIndex = Math.floor(Math.random() * data.length);
const randomImage = data[randomIndex];
const urlimg = randomImage.file_url;
await conn.sendFile(m.chat, urlimg, 'thumbnail.jpg', `*Resultados De:* ${use}`, m, null, rcanal)
} catch (error) {
console.error(error);
await m.reply('💥 Ocurrió un error inesperado.');
}};
handler.help = ['r34 <texto>'];
handler.command = ['r34', 'rule34'];
handler.tags = ['NSFW'];
handler.register = true;
handler.estrellas = 2;
export default handler;