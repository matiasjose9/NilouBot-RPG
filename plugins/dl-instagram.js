import Starlights from '@StarlightsTeam/Scraper';
import fs from 'fs';

let handler = async (m, { conn, args, usedPrefix, command }) => {
    const data = global;
    if (!data || !data.db || !data.db.data || !data.db.data.users) {
        return conn.reply(m.chat, 'Error: No se pudo acceder a los datos globales.', m);
    }

    const user = data.db.data.users[m.sender];
    if (!user || !user.language) {
        return conn.reply(m.chat, 'Error: No se pudo determinar el idioma del usuario.', m);
    }

    const idioma = user.language;
    const _translate = JSON.parse(fs.readFileSync(`./idiomas/${idioma}.json`, 'utf8'));
    const traductor = _translate.plugins._descargas;

    if (!args || !args[0]) {
        return conn.reply(m.chat, `${traductor.texto1}`, m);
    }

    try {
        let { dl_url } = await Starlights.igdl(args[0]);
        await conn.sendFile(m.chat, dl_url, 'igdl.mp4', null, m, null, rcanal);
    } catch (error) {
        conn.reply(m.chat, 'Error: No se pudo descargar el video de Instagram.', m);
    }
};

handler.help = ['instagram *<link>*'];
handler.tags = ['dl'];
handler.command = /^(instagramdl|instagram|igdl|ig|instagramdl2|instagram2|igdl2|ig2|instagramdl3|instagram3|igdl3|ig3)$/i;

export default handler;