import { createHash } from 'crypto'
let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { conn, text, usedPrefix, command }) {
  let user = global.db.data.users[m.sender]
  let name2 = conn.getName(m.sender)
  if (user.registered === true) throw `🚫 𝐄𝐑𝐑𝐎𝐑 🚫 *Ya ᥱs𝗍ᥲ́s registrado*\n\n¿Quiere registrarse de vuela?\n\n💬 Use el siguiente comando*\n*${usedPrefix}unreg* <Numero de serie>`
  if (!Reg.test(text)) throw `🚫 𝐄𝐑𝐑𝐎𝐑 🚫 *Forma incorrecta*\n\n📝 Uso correcto Del Comando: *${usedPrefix + command} nombre.edad*\n [ 💡 ] Ejemplo : *${usedPrefix + command}* ${name2}.18`
  let [_, name, splitter, age] = text.match(Reg)
  if (!name) throw '🚫 𝐄𝐑𝐑𝐎𝐑 🚫 El nombre no puede estar vacío*'
  if (!age) throw '🚫 𝐄𝐑𝐑𝐎𝐑 🚫 *La edad no puede quedarse vacia*'
  if (name.length >= 30) throw '*🚫 𝐄𝐑𝐑𝐎𝐑 🚫 El nombre es muy largo*' 
  age = parseInt(age)
  if (age > 100) throw '*Un dinosaurio quiere jugar con el bot?*'
  if (age < 5) throw '*Eres menor, no  puedes registrarte en este Bot*'
  user.name = name.trim()
  user.age = age
  user.regTime = + new Date
  user.registered = true
  let sn = createHash('md5').update(m.sender).digest('hex')
  m.reply(`
┏━━━━━━━━━━━━━━━━┓
>  *𝑹𝑬𝑮𝑰𝑺𝑻𝑹𝑶 * 
┃━━━━━━⊱✿⊰━━━━━━┛
> *𝑵𝑶𝑴𝑩𝑹𝑬:* ${name}
> *𝑬𝑫𝑨𝑫* : ${age} años
> *𝑵𝑼𝑴𝑬𝑹𝑶 𝑫𝑬 𝑺𝑬𝑹𝑰𝑬*:
> ${sn}
┃━━━━━━━━━━━━━━━  
> Use *${usedPrefix}menu* para ver el menu de comandos
┗--------------------------
`.trim())
}
handler.help = ['reg'].map(v => v + ' <nombre.edad>')
handler.tags = ['registro']

handler.command = ['verify', 'verificar', 'reg', 'register', 'registrar'] 

export default handler