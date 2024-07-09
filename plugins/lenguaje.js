import { promises as fs } from 'fs';

const handler = async (m, { args, usedPrefix, command, isAdmin }) => {
  try {
    const data = global;
    let idioma = data.db.data.users[m.sender].language || 'es'; // Idioma predeterminado

    if (!fs.existsSync(`./idiomas/${idioma}.json`)) {
      throw new Error(`Archivo de idioma no encontrado: ./idiomas/${idioma}.json`);
    }

    const _translate = JSON.parse(await fs.readFile(`./idiomas/${idioma}.json`));
    const tradutor = _translate.plugins._language;

    let sigla = args[0] ? args[0].toLowerCase() : '';

    if (command === 'lang') {
      if (sigla === 'es' || sigla === 'en') {
        global.db.data.users[m.sender].language = sigla;
        m.reply(`*Nilou - Bot*\n\n*—◉* *_Idioma definido a ${sigla === 'es' ? 'Español 🇪🇸' : 'Inglés 🇬🇧'}_*`);
      } else {
        m.reply(`
${tradutor.texto1[2]}
${tradutor.texto1[3]} (${data.db.data.users[m.sender].language})
${tradutor.texto1[0]}
*${usedPrefix}lang* es

${tradutor.texto1[1]}
`);
      }
    }

    if (command === 'langgroup') {
      if (!m.isGroup) {
        return m.reply(tradutor.texto3);
      }
      if (m.isGroup && !isAdmin) {
        return m.reply(tradutor.texto4);
      }

      if (sigla === 'es' || sigla === 'en') {
        global.db.data.chats[m.chat].language = sigla;
        m.reply(`*[ ✅ ] Configuración del grupo*\n\n*—◉* *_Idioma definido a ${sigla === 'es' ? 'Español 🇪🇸' : 'Inglés 🇬🇧'}_*`);
      } else {
        m.reply(`
${tradutor.texto2[sigla === 'es' ? 0 : 1]}
*${usedPrefix}langgroup* es

${tradutor.texto2[sigla === 'es' ? 0 : 1]}
`);
      }
    }
  } catch (error) {
    console.error(error); // Mensaje de depuración
    global.db.data.users[m.sender].language = 'es';
    if (m.isGroup) {
      global.db.data.chats[m.chat].language = 'es';
    }
    m.reply(`*[ERROR]* - _Por defecto el idioma estaba configurado en español._
\`\`\`contacta a los creadores del bot\`\`\` `);
  }
};

handler.command = /^(lang|langgroup)$/i;

export default handler;