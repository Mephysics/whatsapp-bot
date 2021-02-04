const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');

const SESSION_FILE_PATH = './whatsapplogin.json';
let sessionCfg;
if (fs.existsSync(SESSION_FILE_PATH)) {
    sessionCfg = require(SESSION_FILE_PATH);
}

const client = new Client({ puppeteer: { headless: false }, session: sessionCfg });

client.on('qr', (qr) => {
    console.log('QR RECEIVED', qr);
});

client.on('authenticated', (session) => {
    console.log('AUTHENTICATED', session);
    sessionCfg=session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
        if (err) {
            console.error(err);
        }
    });
});

client.on('ready', () => {
    console.log('Client sudah terhubung');
});

client.on('message', msg => {
    if (msg.body == '/keyword') {
        msg.reply('/hello\n\n/github\n\n/aboutbot');
    }

    if(msg.body == '/hello') {
        msg.reply('*[AutoReply]* Hello, World!');
    }

    if(msg.body == '/github') {
        msg.reply('*[AutoReply]* https://Github.com/Mephysics')
    }

    if(msg.body == '/aboutbot') {
        msg.reply('Dev : *Mephysics a.k.a _Ichigoez_*\n\nVersion : *1.0.0*\n\nKeyword : */*\n\nTools : *Node js, Javascript, JSON*')
    }

});

client.initialize();