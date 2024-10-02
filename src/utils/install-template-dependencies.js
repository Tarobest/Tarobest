const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const templatePath = path.join(__dirname, "../template");
const templates = fs.readdirSync(templatePath);
const templateList = templates.map(template => {
	return path.resolve(templatePath, template);
});

function inatsllDependencies(Path) {
	console.log(`install dependencies in ${Path}`);
	return new Promise((resolve, reject) => {
		exec(`cd ${Path} && pnpm install`, (err, _stdout, stderr) => {
			if (err) {
				console.error(`exec error: ${err}`);
				reject(err);
				return;
			}
			if (stderr) {
				console.error(`stderr: ${stderr}`);
				reject(new Error(stderr));
				return;
			}
			resolve(1);
			console.log(`install dependencies in ${Path} success`);
		});
	});
}

templateList.reduce((pre, item) => {
	return pre.then(() => {
		return inatsllDependencies(item);
	});
}, Promise.resolve());
