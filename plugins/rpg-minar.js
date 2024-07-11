let handlerMine = async (m, { conn }) => {
  let user = global.db.data.users[m.sender]
  let lastMine = user.lastMine || 0
  let cooldown = 30 * 60 * 1000
  let now = Date.now()

  if (now - lastMine < cooldown) {
    let remainingTime = (cooldown - (now - lastMine)) / 1000
    let minutes = Math.floor(remainingTime / 60)
    let seconds = Math.floor(remainingTime % 60)
    return conn.reply(m.chat, `⏳ Debes esperar ${minutes} minuto(s) y ${seconds} segundo(s) para usar este comando nuevamente.`, m)
  }

  let stars = Math.floor(Math.random() * 50) + 1
  user.stars = (user.stars || 0) + stars
  user.lastMine = now

  conn.reply(m.chat, `🌟 Has ganado ${stars} estrellas!`, m)
}

let handlerVerStars = async (m, { conn }) => {
  let user = global.db.data.users[m.sender]
  let stars = user.stars || 0
  conn.reply(m.chat, `🌟 Tienes ${stars} estrellas.`, m)
}

handlerMine.help = ['minar']
handlerMine.tags = ['economia']
handlerMine.command = ['minar']

handlerVerStars.help = ['verstars']
handlerVerStars.tags = ['economia']
handlerVerStars.command = ['verstars']

export { handlerMine as minarHandler, handlerVerStars as verstarsHandler }