let handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender]
  let stars = user.stars || 0
  conn.reply(m.chat, `🌟 Tienes ${stars} estrellas.`, m, rcanal)
}

handler.help = ['verstars']
handler.tags = ['rpg']
handler.command = ['verstars']

export default handler