import español from './idiomas/español.js';
import ingles from './idiomas/ingles.js';

let currentLanguage = español;

export const getLanguage = () => currentLanguage;
export const setLanguage = (language) => {
  currentLanguage = language;
};

export const languageHandler = async (m, { conn, args }) => {
  const lang = getLanguage();

  if (!args || !args[0]) {
    return conn.reply(m.chat, lang.language.specifyLanguage, m);
  }

  if (args[0].toLowerCase() === 'español') {
    setLanguage(español);
    return conn.reply(m.chat, lang.language.changedToSpanish, m);
  } else if (args[0].toLowerCase() === 'ingles' || args[0].toLowerCase() === 'inglés' || args[0].toLowerCase() === 'english') {
    setLanguage(ingles);
    return conn.reply(m.chat, lang.language.changedToEnglish, m);
  } else {
    return conn.reply(m.chat, lang.language.unrecognizedLanguage, m);
  }
};

languageHandler.help = ['lenguaje <español|ingles>'];
languageHandler.tags = ['config'];
languageHandler.command = /^(lenguaje|language)$/i;
