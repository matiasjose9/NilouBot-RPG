import fetch from 'node-fetch'

let regex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i
let handler = async (m, { args, usedPrefix, command }) => {
  //let img = 'https://telegra.ph/file/78d5468b09fa913567731.png'
  let textbot = '𝚂𝚞𝚙𝚎𝚛 𝚋𝚘𝚝'
  if (!args[0]) {
    return conn.reply(m.chat, `𝙸𝚗𝚐𝚛𝚎𝚜𝚎 𝚞𝚗 𝚛𝚎𝚙𝚘𝚜𝚒𝚝𝚘𝚛𝚒𝚘 𝚍𝚎 𝚐𝚒𝚝𝚑𝚞𝚋.`, m, rcanal)
  }
  if (!regex.test(args[0])) {
    return conn.reply(m.chat, `𝚁𝚎𝚟𝚒𝚜𝚊 𝚚𝚞𝚎 𝚎𝚕 𝚕𝚒𝚗𝚔 𝚜𝚎𝚊 𝚍𝚎 𝚐𝚒𝚝𝚑𝚞𝚋`, m, rcanal).then(_ => m.react('✖️'))
  }
  let [_, user, repo] = args[0].match(regex) || []
  let sanitizedRepo = repo.replace(/.git$/, '')
  let repoUrl = `https://api.github.com/repos/${user}/${sanitizedRepo}`
  let zipUrl = `https://api.github.com/repos/${user}/${sanitizedRepo}/zipball`
  await m.react('🕓')
  try {
    let [repoResponse, zipResponse] = await Promise.all([
      fetch(repoUrl),
      fetch(zipUrl),
    ])
    let repoData = await repoResponse.json()
    let filename = zipResponse.headers.get('content-disposition').match(/attachment; filename=(.*)/)[1]
    let type = zipResponse.headers.get('content-type')
    let img = 'https://i.ibb.co/tLKyhgM/file.png'
    let txt = `*𝗗𝗘𝗦𝗖𝗔𝗥𝗚𝗔-𝗚𝗜𝗧𝗛𝗨𝗕*\n\n`
       txt += `❥︎ *𝙽𝚘𝚖𝚋𝚛𝚎* : ${sanitizedRepo}\n`
       txt += `❥︎ *𝚁𝚎𝚙𝚘𝚜𝚒𝚝𝚘𝚛𝚒𝚘* : ${user}/${sanitizedRepo}\n`
       txt += `❥︎ *𝙲𝚛𝚎𝚊𝚍𝚘𝚛* : ${repoData.owner.login}\n`
       txt += `❥︎ *𝙳𝚎𝚜𝚌𝚛𝚒𝚙𝚌𝚒𝚘𝚗* : ${repoData.description || '𝚂𝚒𝚗 𝚍𝚎𝚜𝚌𝚛𝚒𝚙𝚌𝚒𝚘𝚗'}\n`
       txt += `❥︎ *𝚄𝚁𝙻* : ${args[0]}\n\n`
       txt += `🚩 *${textbot}*`

await conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, m, null, rcanal)
await conn.sendFile(m.chat, await zipResponse.buffer(), filename, null, m)
await m.react('✅')
  } catch {
await m.react('✖️')
  }
}
handler.help = ['gitclone *<url git>*']
handler.tags = ['dl']
handler.command = /^(gitclone)$/i
handler.register = true 
//handler.star = 1
export default handler