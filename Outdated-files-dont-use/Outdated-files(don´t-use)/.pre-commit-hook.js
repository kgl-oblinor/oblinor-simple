#!/usr/bin/env node

/**
 * 🛡️ CACHE-PREVENTION PRE-COMMIT HOOK
 * Prevents cache issues by ensuring proper deployment process
 */

const fs = require('fs');
const path = require('path');

console.log('🛡️ Checking for cache-safe deployment...');

// Check if this commit was made by our deploy script
const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

if (!packageJson.buildTime || (Date.now() - packageJson.buildTime) > 60000) {
  console.log('\n❌ CACHE PREVENTION SYSTEM ACTIVATED!');
  console.log('\n🚨 WARNING: Direct git commits can cause cache issues!');
  console.log('\n✅ SOLUTION: Use cache-safe deployment instead:');
  console.log('   npm run deploy "Your commit message"');
  console.log('   npm run deploy:quick');
  console.log('\n📋 This prevents the cache issues we experienced before!');
  console.log('\n💡 See CACHE-PREVENTION.md for details');
  
  // Allow the commit but warn user
  console.log('\n⚠️  Allowing commit but STRONGLY recommend using npm run deploy');
  process.exit(0);
}

console.log('✅ Cache-safe deployment detected - proceeding!');
process.exit(0);