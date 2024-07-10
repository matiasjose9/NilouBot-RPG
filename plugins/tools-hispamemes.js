
import hispamemes from 'hispamemes'

let handler = async (m, { conn, usedPrefix, command }) => {

const meme = hispamemes.meme()
conn.sendFile(m.chat, meme, '', '', m)
m.react('🤣')

}
handler.help = ['meme']
handler.tags = ['imagen']
handler.command = ['meme', 'memes']

handler.register = true

export default handler