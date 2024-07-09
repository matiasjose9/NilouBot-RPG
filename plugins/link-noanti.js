let isInsultlinkEnabled = true;

let handleInsultlinkCommand = async (m, { command }) => {
    if (command === 'off insultlink') {
        isInsultlinkEnabled = false;
        m.reply('insultlink desactivado');
    } else if (command === 'on insultlink') {
        isInsultlinkEnabled = true;
        m.reply('insultlink activado');
    }
}

let handler = async (m, { conn }) => {
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

handler.command = /^(on|off) insultlink$/i;
handler.customPrefix = /https?:\/\/[^\s]+/i;
handler.group = true;

export default { handler, handleInsultlinkCommand };