import { promises } from 'fs'
import { join } from 'path'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'

let tags = {
  'main': 'GENERAL',
  'search': 'SEARCH',
  'dl': 'DOWNLOADS',
  'tools': 'TOOLS',
  'sticker': 'STICKERS',
  'owner': 'OWNERS',
}

    const doc = ['pdf', 'zip', 'vnd.openxmlformats-officedocument.presentationml.presentation', 'vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const document = doc[Math.floor(Math.random() * doc.length)];

const defaultMenu = {
  before: `
╭─────────────┈⊷
│  「 𝗜𝗡𝗙𝗢 - 𝗕𝗢𝗧 」
╰┬────────────┈⊷
┌┤ *✨ 𝑴𝒐𝒅𝒐* : Público
│ *🌹 𝑩𝒂𝒊𝒍𝒆𝒚𝒔* : Multi Device
│ *⏰ 𝑻𝒊𝒆𝒎𝒑𝒐 𝑨𝒄𝒕𝒊𝒗𝒐* : %muptime
│ *👤 𝑼𝒔𝒖𝒂𝒓𝒊𝒐𝒔* : %totalreg
╰────────────┈⊷
%readmore
╭─────────────┈⊷
│   「 𝗜𝗡𝗙𝗢 𝗨𝗦𝗘𝗥𝗦 」
╰┬────────────┈⊷
┌┤ *📌 𝑵𝒐𝒎𝒃𝒓𝒆* : %name
│ *🪙 𝑵𝒊𝒍𝒐𝑪𝒐𝒊𝒏𝒔* : %limit
│ *🪷 𝑵𝒊𝒗𝒆𝒍* : %level
│ *🌸 𝑿𝑷* : %totalexp
╰────────────┈⊷
%readmore

\t\t\t*𝗖 𝗢 𝗠 𝗠 𝗔 𝗡 𝗗 𝗦*
`.trimStart(),
  header: '╭────── ✾ ────── \n│   *`「 %category 」`*\n╰┬─━━━━━━⊱✿⊰━━━━━━─\n┌┤', 
  body: '│ %cmd %islimit %isPremium\n',
  footer: '╰━━━━━━ • ✿ • ━━━━━━\n',
  after: ``,
}

const loadTranslations = async (language) => {
  const translations = await promises.readFile(join(__dirname, `../idiomas/${language}.json`), 'utf-8')
  return JSON.parse(translations)
}

let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
  try {
    const { exp, limit, level } = global.db.data.users[m.sender]
    const { min, xp, max } = xpRange(level, global.multiplier)
    const name = await conn.getName(m.sender)
    const d = new Date(new Date() + 3600000)
    const language = global.db.data.users[m.sender].language || 'es'
    const translations = await loadTranslations(language)
    const locale = language

    const weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    const week = d.toLocaleDateString(locale, { weekday: 'long' })
    const date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    const dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    const time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    const _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    const muptime = clockString(_muptime)
    const uptime = clockString(_uptime)
    const totalreg = Object.keys(global.db.data.users).length
    const rtotalreg = Object.values(global.db.data.users).filter(user => user.registered).length

    const help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })

    for (const plugin of help) {
      if (plugin && 'tags' in plugin) {
        for (const tag of plugin.tags) {
          if (!(tag in tags) && tag) tags[tag] = tag
        }
      }
    }

    conn.menu = conn.menu || {}
    const before = translations.menu.before || defaultMenu.before
    const header = translations.menu.header || defaultMenu.header
    const body = translations.menu.body || defaultMenu.body
    const footer = translations.menu.footer || defaultMenu.footer
    const after = translations.menu.after || defaultMenu.after

    const _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%islimit/g, menu.limit ? '◜⭐◞' : '')
                .replace(/%isPremium/g, menu.premium ? '◜🪪◞' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')

    const text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    const replace = {
      '%': '%',
      p: _p,
      uptime,
      muptime,
      taguser: '@' + m.sender.split("@s.whatsapp.net")[0],
      wasp: '@0',
      me: conn.getName(conn.user.jid),
      npmname: translations.package.name,
      version: translations.package.version,
      npmdesc: translations.package.description,
      npmmain: translations.package.main,
      author: translations.package.author.name,
      license: translations.package.license,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp,
      github: translations.package.homepage ? translations.package.homepage.url || translations.package.homepage : '[unknown github url]',
      greeting,
      level,
      limit,
      name,
      weton,
      week,
      date,
      dateIslamic,
      time,
      totalreg,
      rtotalreg,
      readmore: readMore
    }

    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])

    const img = 'https://telegra.ph/file/c20bb077a71d364dfb118.jpg'
    await conn.sendFile(m.chat, img, 'thumbnail.jpg', text.trim(), m, null, rcanal)

  } catch (e) {
    conn.reply(m.chat, '❎ ' + translations.errors.menu, m)
    throw e
  }
}

handler.command = ['menu', 'help', 'menú']
export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  const h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  const m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  const s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

const greeting = (hour => {
  switch (hour) {
    case 0: case 1: case 2: return 'una linda noche 🌙'
    case 3: case 4: case 5: case 6: case 7: case 8: case 9: return 'una linda mañana'case 10: case 11: case 12: return 'un lindo día 🌞'
    case 13: case 14: return 'una linda tarde 🌇'
    case 15: case 16: case 17: return 'una linda tarde 🥀'
    case 18: case 19: case 20: return 'una linda noche 🌃'
    case 21: case 22: case 23: return 'una linda noche 🌙'
    default: return 'un buen día'
  }
})(new Date().getHours())