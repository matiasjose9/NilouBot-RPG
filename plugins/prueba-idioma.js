import { getLanguage } from './global.js';

let handler = async (m, { conn }) => {
  const lang = getLanguage();

  
  await conn.reply(m.chat, lang.ejemplo.mensajeInicial, m);
};

handler.help = ['ejemplo'];
handler.tags = ['example'];
handler.command = /^(ejemplo)$/i;

export default handler;
