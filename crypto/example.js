const crypto = require('crypto');
const Buffer = require('buffer').Buffer;

function aes_cipher_object() {
	const algorithm = 'aes-192-cbc';
	const password = "Password used to generate key";
	
	const key = crypto.scryptSync(password, 'salt', 24);
	const iv = Buffer.alloc(16, 0);
	
	const cipher = crypto.createCipheriv(algorithm, key, iv);
	
	let encrypted = '';
	cipher.on('readable', () => {
		let chunk;
		while (null !== (chunk = cipher.read())) {
			encrypted += chunk.toString('hex');
		}
	});
	cipher.on('end', () => {
		console.log(encrypted);
	});
	
	cipher.write("Some clear text data");
	cipher.end();
}

function aes_update_final() {
	const algorithm = 'aes-192-cbc';
	const password = 'Password used to generate key';
	const key = crypto.scryptSync(password, 'salt', 24);
	const iv = Buffer.alloc(16, 0);
	const cipher = crypto.createCipheriv(algorithm, key, iv);
	
	let encrypted = cipher.update("some clear text dataaaaa", 'utf8', 'hex');
	console.log(encrypted);
	encrypted += cipher.final('hex');
	console.log(encrypted);
}

aes_update_final();