const { spawn } = require('child_process');

const subprocess = spawn(process.argv[0], ['child_program.js'], {
	detached: true,
	stdio: 'ignore'
});

subprocess.unref();