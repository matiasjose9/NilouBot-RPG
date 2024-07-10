import fetch from 'node-fetch';

let handler = async (m, { conn }) => {
    const phoneNumberRegex = /\+[1-9]\d{1,14}/;

    let phoneMatch = m.text.match(phoneNumberRegex);
    if (!phoneMatch) {
        conn.reply(m.chat, "No se detectó un número de teléfono válido en el mensaje.", m);
        return;
    }

    let phoneNumber = phoneMatch[0];

    try {
        const response = await fetch(`https://delirios-api-delta.vercel.app/tools/country?text=${phoneNumber}`);
        const data = await response.json();

        if (response.ok) {
            const { status, result } = data;
            if (status && result) {
                const { code, name, emoji, number } = result;
                conn.reply(m.chat, `ℹ️ Información del número ${phoneNumber}:\n\nPaís: ${name}\nCódigo: ${code}\nEmoji: ${emoji}\nNúmero: ${number}`, m);
            } else {
                conn.reply(m.chat, "No se encontró información para el número de teléfono proporcionado.", m);
            }
        } else {
            conn.reply(m.chat, "No se pudo obtener información del número de teléfono en este momento.", m);
        }
    } catch (error) {
        console.error("Error al llamar a la API:", error);
        conn.reply(m.chat, "Ocurrió un error al intentar obtener información del número de teléfono.", m);
    }
}

handler.customPrefix = /\/numero/i;
handler.command = new RegExp;

export default handler;