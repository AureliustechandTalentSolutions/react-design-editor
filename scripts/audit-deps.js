#!/usr/bin/env node

const { execSync } = require('child_process');

console.log('🔍 Auditing dependencies...\n');

// Check for security vulnerabilities
console.log('📦 Running npm audit...');
try {
	execSync('npm audit', { stdio: 'inherit' });
} catch (error) {
	console.error('⚠️  Security vulnerabilities found');
}

// Check for outdated packages
console.log('\n📦 Checking for outdated packages...');
try {
	execSync('npm outdated', { stdio: 'inherit' });
} catch (error) {
	// npm outdated returns exit code 1 when outdated packages exist
	console.log('ℹ️  Some packages are outdated');
}

console.log('\n✅ Audit complete!');
