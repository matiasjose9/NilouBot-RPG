import { createHash } from 'crypto'

let handler = async function (m, { conn, usedPrefix, command }) {
  let user = global.db.data.users[m.sender]
  if (user.registered === true) throw `🚫 𝐄𝐑𝐑𝐎𝐑 🚫 *Ya estás registrado*\n\n¿Quieres volver a registrarte?\n\nUsa este comando para *eliminar tu registro*\n*${usedPrefix}unreg*`

  user.registered = true
  user.regTime = +new Date

  let sn = createHash('md5').update(m.sender).digest('hex')
  let description = await conn.getName(m.sender) || 'Sin descripción'

  await m.reply(`✅ 𝑹𝑬𝑮𝑰𝑺𝑻𝑹𝑶\n\nTu número:\n\n${m.sender}\n\nDescripción: ${description}`)
}

handler.help = ['reg']
handler.tags = ['registro']
handler.command = ['reg', 'register', 'registrar']

export default handler