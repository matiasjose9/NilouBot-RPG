import fs from 'fs'

const handler = async (m) => {
    try {
        const data = global
        const idioma = data.db.data.users[m.sender].language
        const _translate = JSON.parse(fs.readFileSync(`./idiomas/${idioma}.json`))
        const tradutor = _translate.plugins._general

        m.reply(tradutor.texto1)
    } catch (error) {
        m.reply(`*[ERROR]* - _Error al cargar el idioma._`)
    }
}

handler.command = /^(sal)$/i

export default handler