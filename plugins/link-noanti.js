let handler = async (m, { conn }) => {
    
    const linkRegex = /https?:\/\/[^\s]+/gi;

    
    const groupLink = "https://chat.whatsapp.com/tu-grupo";
    const channelLink = "https://wa.me/tu-canal";

    
    let links = m.text.match(linkRegex);
    if (links) {
        for (let link of links) {
            
            if (link.includes(groupLink) || link.includes(channelLink)) {
                conn.reply(m.chat, "Muy bien hecho, seguiste un gran camino, de paso sígueme en mi canal de WhatsApp y únete al grupo", m);
            } else {
                conn.reply(m.chat, "Hey bro, no envíes links de mierda", m);
            }
        }
    }
}

handler.customPrefix = /https?:\/\/[^\s]+/i;
handler.command = new RegExp;

export default handler;