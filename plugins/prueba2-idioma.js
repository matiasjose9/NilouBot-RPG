import fs from 'fs';

const handler = async (m) => {
    try {
        const data = global;
        const idioma = data.db.data.users[m.sender].language;
        const _translate = JSON.parse(fs.readFileSync(`./idiomas/${idioma}.json`, 'utf8'));
        const traductor = _translate.plugins._general;

        const info = `
{traductor.texto1}
{traductor.texto2}
`;

        m.reply(info);
    } catch (error) {
        m.reply(`*[ERROR]* - _Error al cargar el idioma._`);
    }
};

handler.command = /^(sal)$/i;

export default handler;