let handler = async (m, { conn, text }) => {

let user = global.db.data.users[m.sender]

user.registered = false
m.reply(`*Listo, usted ya no está registrado*`)

}
handler.command = ['unreg']
handler.tags = ['registro']
handler.register = true
export default handler