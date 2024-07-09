let handler = async (m, { conn, usedPrefix, isOwner }) => {
let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:;Enzo;;\nFN:Enzo\nORG:JTxꜱ\nTITLE:\nitem1.TEL;waid=5491126788746:5491126788746\nitem1.X-ABLabelEnzo\nX-WA-BIZ-DESCRIPTION:\nX-WA-BIZ-NAME:Enzo\nEND:VCARD`
await conn.sendMessage(m.chat, { contacts: { displayName: 'Enzo', contacts: [{ vcard }] }}, {quoted: m})
}
handler.help = ['owner']
handler.tags = ['main']
handler.command = ['owner', 'creator', 'creador', 'dueño'] 

export default handler
