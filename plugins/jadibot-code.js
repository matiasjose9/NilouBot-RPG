import { useMultiFileAuthState, fetchLatestBaileysVersion, makeCacheableSignalKeyStore, jidNormalizedUser, PHONENUMBER_MCC } from '@whiskeysockets/baileys';
import moment from 'moment-timezone';
import NodeCache from 'node-cache';
import readline from 'readline';
import qrcode from "qrcode";
import crypto from 'crypto';
import fs from "fs";
import pino from 'pino';
import * as ws from 'ws';
const { CONNECTING } = ws;
import { Boom } from '@hapi/boom';
import { makeWASocket } from '../lib/simple.js';

if (!(global.conns instanceof Array)) global.conns = [];

let handler = async (m, { conn: _conn, args, usedPrefix, command, isOwner, isROwner }) => {
  if (!global.db.data.settings[_conn.user.jid].jadibotmd && !isROwner) {
    conn.reply(m.chat, '🚩 Este Comando está deshabilitado por mi creador.', m);
    return;
  }
  
  let parent = args[0] && args[0] == 'plz' ? _conn : await global.conn;
  
  if (!((args[0] && args[0] == 'plz') || (await global.conn).user.jid == _conn.user.jid)) {
    return conn.reply(m.chat, `「💭」Solo puedes usar este comando en el bot principal.\n\n• Wa.me/${global.conn.user.jid.split`@`[0]}?text=${usedPrefix + command}`, m);
  }

  async function serbot() {
    let authFolderB = crypto.randomBytes(10).toString('hex').slice(0, 8);
    if (!fs.existsSync("./NilouJadiBot/" + authFolderB)) {
      fs.mkdirSync("./NilouJadiBot/" + authFolderB, { recursive: true });
    }

    const { state, saveState, saveCreds } = await useMultiFileAuthState(`./LuffyJadiBot/${authFolderB}`);
    const msgRetryCounterMap = new NodeCache();
    const { version } = await fetchLatestBaileysVersion();
    let phoneNumber = m.sender.split('@')[0];

    const connectionOptions = {
      logger: pino({ level: 'silent' }),
      printQRInTerminal: false,
      mobile: process.argv.includes("mobile"),
      browser: ['Ubuntu', 'Edge', '110.0.1587.56'],
      auth: {
        creds: state.creds,
        keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })),
      },
      markOnlineOnConnect: true,
      generateHighQualityLinkPreview: true,
      getMessage: async (clave) => {
        let jid = jidNormalizedUser(clave.remoteJid);
        let msg = await store.loadMessage(jid, clave.id);
        return msg?.message || "";
      },
      msgRetryCounterCache,
      msgRetryCounterMap,
      defaultQueryTimeoutMs: undefined,
      version
    };

    let conn = makeWASocket(connectionOptions);

    conn.ev.on('connection.update', (update) => {
      const { connection, lastDisconnect, isNewLogin, qr } = update;
      if (connection === 'open') {
        conn.isInit = true;
        global.conns.push(conn);
        parent.reply(m.chat, '> NilouBot-RPG | Serbot', m);
      }
    });

    conn.ev.on('creds.update', saveCreds);

    setInterval(async () => {
      if (!conn.user) {
        try { conn.ws.close(); } catch { }
        conn.ev.removeAllListeners();
        let i = global.conns.indexOf(conn);
        if (i >= 0) {
          delete global.conns[i];
          global.conns.splice(i, 1);
        }
      }
    }, 60000);
  }

  serbot();
};

handler.help = ['code'];
handler.tags = ['JADIBOT'];
handler.command = ['code'];
handler.register = true;
handler.private = true;

export default handler;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}