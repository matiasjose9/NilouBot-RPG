import { performance } from 'perf_hooks'
import osu from 'node-os-utils'

const handler = async (m, { conn, command }) => {
  try {
    const NotDetect = 'No Detectado'
    const startTime = performance.now()

    const cpu = osu.cpu
    const drive = osu.drive
    const mem = osu.mem
    const netstat = osu.netstat
    const osPlatform = osu.os.platform()

    const cpuInfo = {
      model: await cpu.model().catch(() => NotDetect),
      cores: await cpu.count().catch(() => NotDetect),
      usage: await cpu.usage().catch(() => NotDetect)
    }

    const driveInfo = await drive.info().catch(() => ({
      totalGb: NotDetect,
      usedGb: NotDetect,
      usedPercentage: NotDetect
    }))

    const memInfo = await mem.info().catch(() => ({
      totalMemMb: NotDetect,
      usedMemMb: NotDetect
    }))

    const netstatInfo = await netstat.inOut().catch(() => ({
      total: { inputMb: NotDetect, outputMb: NotDetect }
    }))

    await conn.reply(m.chat, `_Probando ${command}..._`, m)

    const ramTotal = `${memInfo.totalMemMb} MB`
    const ramUsed = `${memInfo.usedMemMb} MB`
    const ramUsage = (/[0-9.+/]/g.test(memInfo.usedMemMb) && /[0-9.+/]/g.test(memInfo.totalMemMb))
      ? `${Math.round((memInfo.usedMemMb / memInfo.totalMemMb) * 100)}%`
      : NotDetect

    const endTime = performance.now()
    const ping = `${Math.round(endTime - startTime)} ms`

    const message = `
🚩 *Estado*

*OS*: ${osPlatform}
*CPU Model*: ${cpuInfo.model}
*CPU Cores*: ${cpuInfo.cores}
*CPU Usage*: ${cpuInfo.usage}%
*RAM Usage*: ${ramUsed} / ${ramTotal} (${ramUsage})
*Drive Usage*: ${driveInfo.usedGb} / ${driveInfo.totalGb} (${driveInfo.usedPercentage}%)
*Ping*: ${ping}
*Internet IN*: ${netstatInfo.total.inputMb} MB
*Internet OUT*: ${netstatInfo.total.outputMb} MB
    `

    conn.relayMessage(m.chat, {
      extendedTextMessage: {
        text: message.trim(),
        contextInfo: {
          externalAdReply: {
            title: '',
            mediaType: 1,
            previewType: 0,
            renderLargerThumbnail: true,
            thumbnailUrl: 'https://telegra.ph/file/56d6e15d7ebf5fc5d0d26.jpg',
            sourceUrl: ''
          }
        },
        mentions: [m.sender]
      }
    }, {})

    console.log(osPlatform)
  } catch (e) {
    console.log(e)
    conn.reply(m.chat, '🚩 *Ocurrió un fallo*', m)
  }
}

handler.help = ['estado', 'status']
handler.tags = ['tools']
handler.command = /^status|statusbot|botstatus|estado$/i
handler.register = true

export default handler