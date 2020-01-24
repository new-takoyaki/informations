const process = require('process');

const unhandledRejections = new Map();
process.on('unhandledRejection', (reason, promise) => {
	unhandledRejections.set(promise, reason);
	console.log(unhandledRejections);
});

process.on('rejectionHandled', (promise) => {
	unhandledRejections.delete(promise);
	console.log(unhandledRejections);
});

async function main() {
	try {
		return await new Promise((resolve, reject) => {
			resolve('First call');
		});
	} catch {
		throw new Error('Failed');
	}
}

main().then(console.log);