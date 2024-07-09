import axios from 'axios';
import { generateWAMessageContent, generateWAMessageFromContent, proto } from '@whiskeysockets/baileys';

let handler = async (message, { conn, text, usedPrefix, command }) => {
    if (!text) {
        await message.reply('*`Ingresa el texto de lo que quieres buscar en Pinterest`*');
        return;
    }

    const generateImageMessage = async (imageUrl) => {
        try {
            const { imageMessage } = await generateWAMessageContent({ 'image': { 'url': imageUrl } }, { 'upload': conn.waUploadToServer });
            return imageMessage;
        } catch (error) {
            console.error('Error generando el mensaje de imagen:', error);
            return null;
        }
    };

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };

    let cards = [];
    let pinResults = [];

    try {
        const response = await axios.get(`https://www.pinterest.com/resource/BaseSearchResource/get/?source_url=/search/pins/?rs=typed&q=${encodeURIComponent(text)}&data=%7B%22options%22%3A%7B%22isPrefetch%22%3Afalse%2C%22query%22%3A%22${encodeURIComponent(text)}%22%2C%22scope%22%3A%22pins%22%2C%22no_fetch_context_on_resource%22%3Afalse%7D%2C%22context%22%3A%7B%7D%7D&_=1596199803015`);
        pinResults = response.data.resource_response.data.results.map(result => result.images.orig.url);
    } catch (error) {
        console.error('Error obteniendo resultados de Pinterest:', error);
        await message.reply('Hubo un error al buscar en Pinterest.');
        return;
    }

    shuffleArray(pinResults);

    let topPins = pinResults.slice(0, 5);
    let index = 1;

    for (let pin of topPins) {
        let imageMessage = await generateImageMessage(pin);
        if (imageMessage) {
            cards.push({
                'body': proto.Message.ImageMessage.encode({ 'text': `Pinterest 🔍\n${index++}` }),
                'footer': proto.Message.Footer.encode({ 'text': '@whiskeysockets 2024 | All rights reserved' }),
                'header': proto.Message.Header.encode({ 'title': '', 'hasMediaAttachment': true, 'imageMessage': imageMessage }),
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

    try {
        await conn.relayMessage(message.key.remoteJid, messageContent.message, { messageId: messageContent.key.id });
    } catch (error) {
        console.error('Error enviando el mensaje:', error);
    }
};

handler.help = ['pinterest'];
handler.tags = ['search'];
handler.command = /^(pinterest)$/i;

export default handler;