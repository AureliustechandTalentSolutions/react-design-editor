#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Directories to clean
const cleanDirs = [
	'dist',
	'coverage',
	'.turbo',
	'node_modules/.cache',
	'.eslintcache',
];

// File patterns to remove (simple patterns only)
const cleanPatterns = [
	'**/*.log',
	'**/*.tmp',
	'**/._*',
	'**/.DS_Store',
];

function cleanDirectory(dir) {
	const fullPath = path.join(process.cwd(), dir);
	if (fs.existsSync(fullPath)) {
		fs.rmSync(fullPath, { recursive: true, force: true });
		console.log(`✅ Cleaned: ${dir}`);
	} else {
		console.log(`ℹ️  Directory not found: ${dir}`);
	}
}

console.log('🧹 Starting cleanup...\n');

// Clean directories
cleanDirs.forEach(cleanDirectory);

console.log('\n✅ Cleanup complete!');
