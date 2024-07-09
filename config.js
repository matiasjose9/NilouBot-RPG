import { watchFile, unwatchFile } from 'fs' 
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone' 



global.owner = [
  ['5491168758497', 'Enzo', true],
  ['5492215034412', 'matias-crypto', true],
  ['']

]



global.mods = []
global.prems = []
   


global.packname = ``
global.author = '@ 2024 JTxs | All rigths reserved'

global.botname = '🌹 𝗡𝗶𝗹𝗼𝘂 - 𝗕𝗼𝘁 - 𝗟𝗶𝘁𝗲 🪷'

global.name_canal = '@ 2024 Enzo | All rigths reserved'
global.id_canal = '120363314585338428@newsletter'



global.catalogo = fs.readFileSync('./storage/img/catalogo.png')
//global.miniurl = fs.readFileSync('./storage/img/miniurl.jpg')



global.estilo = { key: {  fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {}) }, message: { orderMessage: { itemCount : -999999, status: 1, surface : 1, message: botname, orderTitle: 'Bang', thumbnail: catalogo, sellerJid: '0@s.whatsapp.net'}}}


global.canal = 'https://whatsapp.com/channel/0029VajIId22phHQLslZah1n'



global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.moment = moment	


global.multiplier = 69 
global.maxwarn = '2' // máxima advertencias



let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})
