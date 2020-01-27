const dgram = require('dgram');
const { Buffer } = require('buffer');

const message = Buffer.from('Some bytes');
const client = dgram.createSocket('udp4');

client.on('close', () => {
	console.log("Close");
});
client.setTTL(10);

client.send(message, 1234, 'localhost', (err) => {
	client.close();
});