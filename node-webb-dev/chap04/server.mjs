// sidan 144

import { sniffOn } from '../events/httpsniffer.mjs';
import * as http from 'http';
import * as util from 'util';
import * as os from 'os';
const listenOn = 'http://localhost:8124';
const server = http.createServer();
server.on('request', (req, res) => {
    var requrl = new URL(req.url, listenOn);
    if (requrl.pathname === '/')
        homePage(req, res);
    else if (requrl.pathname === "/osinfo") osInfo(req, res);
    else if (requrl.pathname === "/apa")
        apa(req, res);
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end("bad URL " + req.url);
    }
});
server.listen(new URL(listenOn).port);
sniffOn(server);
console.log(`listening to ${listenOn}`);
function homePage(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(
        `<html><head><title>Hello, world!</title></head>
<body><h1>Hello, world!</h1>
<p><a href='/osinfo'>OS Info</a></p>
<p><a href='/apa'>APA</a></p>
</body></html>`);
}
function osInfo(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(
        `<html><head><title>Operating System Info</title></head>
<body><h1>Operating System Info</h1>
<table>
<tr><th>TMP Dir</th><td>${os.tmpdir()}</td></tr>
<tr><th>Host Name</th><td>${os.hostname()}</td></tr>
<tr><th>OS Type</th><td>${os.type()} ${os.platform()}
${os.arch()} ${os.release()}</td></tr>
<tr><th>Uptime</th><td>${os.uptime()}
${util.inspect(os.loadavg())}</td></tr>
<tr><th>Memory</th><td>total: ${os.totalmem()} free:
${os.freemem()}</td></tr>
<tr><th>CPU's</th><td><pre>${util.inspect(os.cpus())}</pre></td></tr>
<tr><th>Network</th><td><pre>${util.inspect(os.networkInterfaces())}</
pre></td></tr>
</table>
</body></html>`);
}

function apa(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(
        `<html><head><title>APA</title></head>
<body><h1>APA</h1>
<p>APA stands for "All People Are" and is often used in the context of promoting inclusivity and diversity. It emphasizes the idea that all individuals, regardless of their background, identity, or characteristics, should be treated with respect and equality.</p>
<p>The APA acronym can be used in various contexts, such as social justice movements, educational initiatives, and workplace diversity efforts. It serves as a reminder to recognize and celebrate the unique qualities and contributions of every person while fostering an environment of acceptance and understanding.</p>
</body></html>`);
}