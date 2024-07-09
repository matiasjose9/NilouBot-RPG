let handler = async (m, { conn }) => {
    
    const linkRegex = /https?:\/\/[^\s]+/gi;

    
    const groupLink = "https://chat.whatsapp.com/IICmKudSbuGBFKMPZitp0h";
    const channelLink = "https://whatsapp.com/channel/0029VajIId22phHQLslZah1n";

    
    let links = m.text.match(linkRegex);
    if (links) {
        for (let link of links) {
            
            if (link.includes(groupLink) || link.includes(channelLink)) {
                conn.reply(m.chat, "Detecte un link de mis enlaces oficiales\n\nEspero estés en el grupo oficial del bot y que me este siguiendo en mi canal de WhatsApp ", m);
            } else {
                conn.reply(m.chat, "`Hey bro, no envíes links de mierda`", m);
            }
        }
    }
}

handler.customPrefix = /https?:\/\/[^\s]+/i;
handler.command = new RegExp;

export default handler;