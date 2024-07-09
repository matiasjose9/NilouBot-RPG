let isInsultlinkEnabled = true;

let handler = async (m, { conn, text }) => {
    

    if (command === 'off insultlink') {
        isInsultlinkEnabled = false;
        return conn.reply(m.chat, 'insultlink desactivado', m);
    } else if (command === 'on insultlink') {
        isInsultlinkEnabled = true;
        return conn.reply(m.chat, 'insultlink activado', m);
    }

    if (!isInsultlinkEnabled) {
        return;
    }

    const linkRegex = /https?:\/\/[^\s]+/gi;
    const groupLink = "https://chat.whatsapp.com/IICmKudSbuGBFKMPZitp0h";
    const channelLink = "https://whatsapp.com/channel/0029VajIId22phHQLslZah1n";
    const insults = [
        "`Hey bro, no envíes links de mierda.`",
        "`No me vengas con tus enlaces basura.`",
        "`¿Qué crees que haces enviando esos links?`",
        "`Deja de enviar esos enlaces inútiles.`",
        "`Tus links no son bienvenidos aquí.`"
    ];

    let links = m.text.match(linkRegex);
    if (links) {
        for (let link of links) {
            if (link.includes(groupLink) || link.includes(channelLink)) {
                conn.reply(m.chat, "Detecte un link de mis enlaces oficiales\n\nEspero estés en el grupo oficial del bot y que me esté siguiendo en mi canal de WhatsApp.", m);
            } else {
                let randomInsult = insults[Math.floor(Math.random() * insults.length)];
                conn.reply(m.chat, randomInsult, m);
            }
        }
    }
}

handler.customPrefix = /https?:\/\/[^\s]+/i;
handler.command = new RegExp;

export default handler;