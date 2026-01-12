#!/usr/bin/env node

const { execSync } = require('child_process');

console.log('🔍 Scanning for TODOs and FIXMEs...\n');

try {
	const result = execSync(
		'grep -rn "TODO\\|FIXME\\|HACK\\|XXX" src/ --include="*.ts" --include="*.tsx" || true',
		{ encoding: 'utf-8' }
	);

	if (result.trim()) {
		console.log('Found the following items:\n');
		console.log(result);
		console.log('\n⚠️  Please create issues for these items or resolve them.');
		process.exit(1);
	} else {
		console.log('✅ No TODOs or FIXMEs found!');
	}
} catch (error) {
	console.error('❌ Error scanning for TODOs:', error.message);
	process.exit(1);
}
