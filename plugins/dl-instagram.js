import Starlights from '@StarlightsTeam/Scraper'

let handler = async (m, { conn, args, usedPrefix, command }) => {

        const data = global;
        const idioma = data.db.data.users[m.sender].language;
        const _translate = JSON.parse(fs.readFileSync(`./idiomas/${idioma}.json`, 'utf8'));
        const traductor = _translate.plugins._descargas;

if (!args[0]) return conn.reply(m.chat, `${traductor.texto1}`, m)
try {
let { dl_url } = await Starlights.igdl(args[0])
await conn.sendFile(m.chat, dl_url, 'igdl.mp4', null, m, null, rcanal)
} catch {
}}
handler.help = ['instagram *<link>*']
handler.tags = ['dl']
handler.command = /^(instagramdl|instagram|igdl|ig|instagramdl2|instagram2|igdl2|ig2|instagramdl3|instagram3|igdl3|ig3)$/i

export default handler
