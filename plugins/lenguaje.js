import { promises as fs } from 'fs';

const handler = async (m, { args, usedPrefix, command, isAdmin }) => {
  try {
    const data = global;
    let idioma = data.db.data.users[m.sender].language || 'es';

    if (!fs.existsSync(`./idiomas/${idioma}.json`)) {
      throw new Error(`Archivo de idioma no encontrado: ./idiomas/${idioma}.json`);
    }

    const _translate = JSON.parse(await fs.readFile(`./idiomas/${idioma}.json`));
    const tradutor = _translate.plugins._language;

    let sigla = args[0] ? args[0].toLowerCase() : '';

    if (command === 'lang') {
      if (sigla === 'es' || sigla === 'en' || sigla === 'ar') {
        global.db.data.users[m.sender].language = sigla;
        let languageName = sigla === 'es' ? 'Español 🇪🇸' :
                           sigla === 'en' ? 'English 🇺🇸' :
                           sigla === 'ar' ? 'العربية 🇸🇦' : '';
        m.reply(`*Nilou - Bot*\n\n*—◉* *_Idioma definido a ${languageName}_*`);
      } else {
        throw new Error(`${tradutor.texto1[2]}\n${tradutor.texto1[3]} (${data.db.data.users[m.sender].language})\n${tradutor.texto1[0]}\n*${usedPrefix}lang* es\n\n${tradutor.texto1[1]}`);
      }
    }

  } catch (error) {
    console.error(error);
    global.db.data.users[m.sender].language = 'es';
    m.reply(`*[ERROR]* - _Por defecto el idioma estaba configurado en español._
\`\`\`Contacta a los creadores del bot\`\`\` `);
  }
};

handler.command = /^(lang)$/i;

export default handler;