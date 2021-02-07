const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const { NovelCovid } = require('novelcovid');
 
const track = new NovelCovid();

track.all()
.then((response) => console.log(response))

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

client.on('message', async msg => {

    if (msg.body == '/keyword') {
        msg.reply('*[AutoReply]* Berikut keyword yang disediakan oleh BOT\n\n/hello\n\n/github\n\n/aboutbot\n\n/corona\n\n/corona indonesia');
    }

    if(msg.body == '/hello') {
        msg.reply('*[AutoReply]* Hello, World!');
    }

    if(msg.body == '/github') {
        msg.reply('*[AutoReply]* Mephysics GitHub\n\nGitHub : https://Github.com/Mephysics\nSource Code : https://github.com/Mephysics/whatsapp-bot')
    }

    if(msg.body == '/aboutbot') {
        msg.reply('Dev : *Mephysics*\n\nVersion : *2.0.0*\n\nKeyword : */*\n\nTools : *Node js, Javascript, JSON*')
    }

    if(msg.body == '/corona') {
        const data = await track.all()
        msg.reply(`Total Kasus Corona\n\nKasus : ${data.cases}\n\nMeninggal : ${data.deaths}\n\nSembuh : ${data.recovered}`)
    }

    if(msg.body == '/corona indonesia') {
        const data = await track.countries('indonesia')
        msg.reply(`Total Kasus Corona\n\nKasus : ${data.cases}\n\nMeninggal : ${data.deaths}\n\nSembuh : ${data.recovered}`)
    }

});

client.initialize();