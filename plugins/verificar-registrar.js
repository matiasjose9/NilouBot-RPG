import { createHash } from 'crypto'
let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { conn, text, usedPrefix, command }) {
  let user = global.db.data.users[m.sender]
  let name2 = conn.getName(m.sender)
  if (user.registered === true) throw `🚫 𝐄𝐑𝐑𝐎𝐑 🚫 *Ya ᥱs𝗍ᥲ́s registrado*\n\n¿𝗊ᥙіᥱrᥱ ᥎᥆ᥣ᥎ᥱr ᥲ rᥱgіs𝗍rᥲrsᥱ?\n\n💬 ᥙsᥱ ᥱs𝗍ᥱ ᥴ᥆mᥲᥒძ᥆ para *eliminar su registro*\n*${usedPrefix}unreg* <ᥒᥙ́mᥱr᥆ ძᥱ serie>`
  if (!Reg.test(text)) throw `🚫 𝐄𝐑𝐑𝐎𝐑 🚫 *𝖿᥆rmᥲ𝗍᥆ іᥒᥴ᥆rrᥱᥴ𝗍᥆*\n\n📝 ᥙs᥆ ძᥱᥣ ᥴ᥆mᥲᥒძ᥆: *${usedPrefix + command} nombre.edad*\n [ 💡 ] ᥱȷᥱm⍴ᥣ᥆ : *${usedPrefix + command}* ${name2}.18`
  let [_, name, splitter, age] = text.match(Reg)
  if (!name) throw '🚫 𝐄𝐑𝐑𝐎𝐑 🚫 ᥱᥣ ᥒ᥆mᑲrᥱ ᥒ᥆ ⍴ᥙᥱძᥱ ᥱs𝗍ᥲr ᥎ᥲᥴі́᥆*'
  if (!age) throw '🚫 𝐄𝐑𝐑𝐎𝐑 🚫 *ᥣᥲ ᥱძᥲძ ᥒ᥆ ⍴ᥙᥱძᥱᥱ ᥱs𝗍ᥲr ᥎ᥲᥴі́ᥲ*'
  if (name.length >= 30) throw '*🚫 𝐄𝐑𝐑𝐎𝐑 🚫 ᥱᥣ ᥒ᥆mᑲrᥱ es ძᥱmᥲsіᥲძ᥆ largo*' 
  age = parseInt(age)
  if (age > 100) throw '*Pellé quiere jugar con el bot?*'
  if (age < 5) throw '*Eres menor, no  puedes registrarte en BaileyBot-MD*'
  user.name = name.trim()
  user.age = age
  user.regTime = + new Date
  user.registered = true
  let sn = createHash('md5').update(m.sender).digest('hex')
  m.reply(`
°°°·.¯°·._.··._.·°°°
> *✅ 𝑹𝑬𝑮𝑰𝑺𝑻𝑹𝑶* 
╭───── • ◆ • ─────╮
> *✍🏻 𝑵𝑶𝑴𝑩𝑹𝑬:* ${name}
> *✨ 𝑬𝑫𝑨𝑫* : ${age} años
> *📌 𝑵𝑼𝑴𝑬𝑹𝑶 𝑫𝑬 𝑺𝑬𝑹𝑰𝑬*:
> ${sn}
> Use *${usedPrefix}menu* para ver el menu de comandos
┗───── • ◆ • ─────╯
`.trim())
}
handler.help = ['reg'].map(v => v + ' <nombre.edad>')
handler.tags = ['REGISTRO']

handler.command = ['verify', 'verificar', 'reg', 'register', 'registrar'] 

export default handler



  