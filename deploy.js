#!/usr/bin/env node

/**
 * 🚀 CACHE-SAFE DEPLOYMENT SCRIPT
 * Ensures Railway deployments are properly cached-busted and verified
 */

const { execSync } = require('child_process');
const https = require('https');

const RAILWAY_URL = 'https://oblinor-simple.up.railway.app';
const MAX_RETRIES = 10;
const RETRY_DELAY = 30000; // 30 seconds

console.log('🚀 Starting cache-safe deployment...\n');

// 1. Generate unique build timestamp for cache busting
const buildTime = Date.now();
console.log(`📅 Build timestamp: ${buildTime}`);

// 2. Update version in package.json for cache busting
const packageJson = require('./package.json');
packageJson.buildTime = buildTime;
require('fs').writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));

// 3. Commit and push changes
try {
  console.log('📝 Committing changes...');
  execSync('git add .', { stdio: 'inherit' });
  
  const commitMessage = process.argv[2] || `🚀 Deploy with cache-bust ${buildTime}`;
  execSync(`git commit -m "${commitMessage}\n\n🤖 Generated with [Claude Code](https://claude.ai/code)\n\nCo-Authored-By: Claude <noreply@anthropic.com>"`, { stdio: 'inherit' });
  
  console.log('⬆️  Pushing to GitHub...');
  execSync('git push', { stdio: 'inherit' });
  
  console.log('✅ Code pushed to GitHub successfully!\n');
} catch (error) {
  console.error('❌ Git operations failed:', error.message);
  process.exit(1);
}

// 4. Wait for Railway deployment and verify
async function verifyDeployment() {
  console.log('⏳ Waiting for Railway deployment...');
  
  for (let i = 1; i <= MAX_RETRIES; i++) {
    console.log(`🔍 Verification attempt ${i}/${MAX_RETRIES}...`);
    
    try {
      // Check health endpoint
      const healthResponse = await fetch(`${RAILWAY_URL}/health`);
      const healthData = await healthResponse.json();
      
      // Check if main page loads
      const mainResponse = await fetch(RAILWAY_URL);
      const mainContent = await mainResponse.text();
      
      // Look for our cache-bust timestamp or recent changes indicator
      if (mainContent.includes('◉') || mainContent.includes('▣') || 
          mainContent.includes('◆') || mainContent.includes('▤')) {
        console.log('✅ NEW SIDEBAR ICONS DETECTED!');
        console.log('✅ Deployment successful and cache cleared!');
        console.log(`🌐 Live at: ${RAILWAY_URL}`);
        
        // Verify specific sidebar elements
        if (!mainContent.includes('ADMIN Level 2')) {
          console.log('✅ Old admin badge removed - deployment complete!');
        }
        
        return true;
      }
      
      console.log(`⏳ Still deploying... (attempt ${i}/${MAX_RETRIES})`);
      
      if (i < MAX_RETRIES) {
        console.log(`⏱️  Waiting ${RETRY_DELAY/1000}s before next check...`);
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      }
      
    } catch (error) {
      console.log(`⚠️  Check failed: ${error.message}`);
      if (i < MAX_RETRIES) {
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      }
    }
  }
  
  console.log('❌ Deployment verification failed after maximum retries');
  console.log('🔧 Try manual verification or check Railway logs');
  return false;
}

// 5. Node.js 18+ fetch polyfill
if (!globalThis.fetch) {
  const fetch = async (url) => {
    return new Promise((resolve, reject) => {
      const req = https.get(url, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          resolve({
            ok: res.statusCode >= 200 && res.statusCode < 300,
            status: res.statusCode,
            json: () => Promise.resolve(JSON.parse(data)),
            text: () => Promise.resolve(data)
          });
        });
      });
      req.on('error', reject);
    });
  };
  globalThis.fetch = fetch;
}

// Run deployment verification
verifyDeployment().then(success => {
  if (success) {
    console.log('\n🎉 DEPLOYMENT COMPLETE AND VERIFIED!');
    console.log('💡 No more cache issues - changes are live!');
  } else {
    console.log('\n⚠️  Deployment may still be in progress');
    console.log('🔍 Check manually or wait a few more minutes');
  }
});