import axios from 'axios';
const { generateWAMessageContent, generateWAMessageFromContent, proto } = (await import('@whiskeysockets/baileys')).default;

let handler = async (message, { conn, text, usedPrefix, command }) => {
    if (!text) return message.reply('*`Ingresa el texto de lo que quieres buscar en pinterest`*');

    async function generateImageMessage(imageUrl) {
        const { imageMessage } = await generateWAMessageContent({ 'image': { 'url': imageUrl } }, { 'upload': conn.waUploadToServer });
        return imageMessage;
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    let cards = [];
    const response = await axios.get(`https://www.pinterest.com/resource/BaseSearchResource/get/?source_url=/search/pins/?rs=typed&q=${text}&data=%7B%22options%22%3A%7B%22isPrefetch%22%3Afalse%2C%22query%22%3A%22${text}%22%2C%22scope%22%3A%22pins%22%2C%22no_fetch_context_on_resource%22%3Afalse%7D%2C%22context%22%3A%7B%7D%7D&_=1596199803015`);
    const pinResults = response.data.resource_response.data.results.map(result => result.images.orig.url);

    shuffleArray(pinResults);

    let topPins = pinResults.slice(0, 5);
    let index = 1;

    for (let pin of topPins) {
        cards.push({
            'body': proto.Message.ImageMessage.encode({ 'text': `Pinterest 🔍\n${index++}` }),
            'footer': proto.Message.Footer.encode({ 'text': '@Enzo 2024 | All rights reserved' }),
            'header': proto.Message.Header.encode({ 'title': '', 'hasMediaAttachment': true, 'imageMessage': await generateImageMessage(pin) }),
            'nativeFlowMessage': proto.Message.NativeFlow.encode({
                'buttons': [
                    {
                        'name': 'Pinterest',
                        'buttonParamsJson': `{"display_text":"url 🔍","url":"${pin}"}`
                    }
                ]
            })
        });
    }

    const messageContent = generateWAMessageFromContent(message.key.remoteJid, {
        'viewOnceMessage': {
            'message': {
                'messageContextInfo': { 'deviceListMetadata': {}, 'deviceListMetadataVersion': 2 },
                'interactiveMessage': proto.Message.InteractiveMessage.encode({
                    'body': proto.Message.Body.encode({ 'text': `Imagen 🔍\n${text}` }),
                    'footer': proto.Message.Footer.encode({ 'text': '@whiskeysockets 2024 | All rights reserved' }),
                    'header': proto.Message.Header.encode({ 'hasMediaAttachment': false }),
                    'carouselMessage': proto.Message.Carousel.encode({ 'cards': [...cards] })
                })
            }
        }
    }, { quoted: message });

    await conn.relayMessage(message.key.remoteJid, messageContent.message, { messageId: messageContent.key.id });
};

handler.help = ['pinterest'];
handler.tags = ['search'];
handler.command = /^(pinterest)$/i;

export default handler;