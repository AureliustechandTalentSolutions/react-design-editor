#!/usr/bin/env node

const { execSync } = require('child_process');

const checks = [
	{ name: 'TypeScript', cmd: 'npm run tsc' },
	{ name: 'ESLint', cmd: 'npm run lint:check' },
	{ name: 'Prettier', cmd: 'npm run format:check' },
];

let failed = false;

console.log('🚀 Running quality gates...\n');

for (const check of checks) {
	console.log(`🔍 Running ${check.name}...`);
	try {
		execSync(check.cmd, { stdio: 'inherit' });
		console.log(`✅ ${check.name} passed\n`);
	} catch (error) {
		console.error(`❌ ${check.name} failed\n`);
		failed = true;
	}
}

if (failed) {
	console.error('❌ Quality gate failed!');
	process.exit(1);
} else {
	console.log('✅ All quality gates passed!');
}
