let handler = async (m, { conn }) => {
    const linkRegex = /https?:\/\/[^\s]+/gi;

const global = global.canal
    const groupLink = "https://chat.whatsapp.com/IICmKudSbuGBFKMPZitp0h";
    const channelLink = global;

    const insults = [
        "`Hey bro, no envíes links de mierda.`",
        "`No me vengas con tus enlaces basura.`",
        "`¿Qué crees que haces enviando esos links?`",
        "`Deja de enviar esos enlaces inútiles.`",
        "`Tus links no son bienvenidos aquí.`"
    ];

    let links = m.text.match(linkRegex);
    if (links) {
        let isOfficialLink = false;
        for (let link of links) {
            if (link.includes(groupLink) || link.includes(channelLink)) {
                isOfficialLink = true;
                conn.reply(m.chat, "`Detecté un enlace de mis links oficiales.`\n\n> Espero estés en el grupo oficial del bot y que me estés siguiendo en mi canal de WhatsApp.", m, rcanal);
                break;
            }
        }
        if (!isOfficialLink) {
            let randomInsult = insults[Math.floor(Math.random() * insults.length)];
            conn.reply(m.chat, randomInsult, m, rcanal);
        }
    }
}

handler.customPrefix = /https?:\/\/[^\s]+/i;
handler.command = new RegExp;

export default handler;