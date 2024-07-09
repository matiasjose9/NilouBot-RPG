import fs from 'fs';

const handler = async (m) => {
    try {
        const data = global;
        const idioma = data.db.data.users[m.sender].language;
        const _translate = JSON.parse(fs.readFileSync(`./idiomas/${idioma}.json`, 'utf8'));
        const traductor = _translate.plugins._general;

        const info = `
${traductor.texto1}\n
${traductor.texto2.map(item => item)}
`;

        m.reply(info);
    } catch (error) {
        m.reply(`*[ERROR]* - _Error al cargar el idioma._`);
    }
};

handler.tags = ['NILOU-INFO'];
handler.command = /^(nilou)$/i;

export default handler;