import { promises as fs } from 'fs';
import { createHash } from 'crypto';

let handler = async function (m, { conn, text, usedPrefix, command }) {
  const data = global;
  const idioma = data.db.data.users[m.sender].language;
  const _translate = JSON.parse(await fs.readFile(`./idiomas/${idioma}.json`));
  const tradutor = _translate.plugins._language;

  let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i;
  
  let user = global.db.data.users[m.sender];
  let name2 = conn.getName(m.sender);

  if (user.registered === true) throw `${tradutor.errorAlreadyRegistered}\n\n${tradutor.useUnregCommand.replace('${usedPrefix}', usedPrefix)}`;
  if (!Reg.test(text)) throw `${tradutor.errorWrongFormat}\n\n${tradutor.correctUsage}: *${usedPrefix + command} nombre.edad*\n [ 💡 ] ${tradutor.example} : *${usedPrefix + command}* ${name2}.18`;

  let [_, name, splitter, age] = text.match(Reg);
  if (!name) throw tradutor.errorEmptyName;
  if (!age) throw tradutor.errorEmptyAge;
  if (name.length >= 30) throw tradutor.errorNameTooLong;

  age = parseInt(age);
  if (age > 100) throw tradutor.errorAgeTooHigh;
  if (age < 5) throw tradutor.errorAgeTooLow;

  user.name = name.trim();
  user.age = age;
  user.regTime = + new Date;
  user.registered = true;

  let sn = createHash('md5').update(m.sender).digest('hex');
  m.reply(tradutor.saludo.replace('${name}', name).replace('${age}', age).replace('${sn}', sn).replace('${usedPrefix}', usedPrefix));
}

handler.help = ['reg'].map(v => v + ' <nombre.edad>');
handler.tags = ['REGISTRO'];
handler.command = ['verify', 'verificar', 'reg', 'register', 'registrar'];

export default handler;