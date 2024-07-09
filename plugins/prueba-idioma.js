import fs from 'fs'

const saludoHandler = async (m) => {
    try {
        const data = global
        const idioma = data.db.data.users[m.sender].language
        const _translate = JSON.parse(fs.readFileSync(`./idiomas/${idioma}.json`))
        const tradutor = _translate.plugins._language

        m.reply(tradutor.saludo)
    } catch (error) {
        m.reply(`*[ERROR]* - _Error al cargar el idioma._`)
    }
}

saludoHandler.command = /^(saludo)$/i

export default saludoHandler