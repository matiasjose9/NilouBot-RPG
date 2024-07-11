
const getRandomImageBoys = require('module-gatadios')

let handler = async (m, { conn, usedPrefix, command }) => {

const randomImage = getRandomImageBoys()
conn.sendFile(m.chat, randomimage, '', '', m)
m.react('🥺')

}
handler.help = ['boysxd']
handler.tags = ['']
handler.command = ['meme', 'memes']

handler.register = true

export default handler



