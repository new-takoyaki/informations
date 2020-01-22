const fs = require('fs');

fs.unlink("test2", (err) => {
	if (err) throw err;
});