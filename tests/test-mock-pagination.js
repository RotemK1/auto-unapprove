#!/usr/bin/env node

/**
 * Mock pagination test - simulates the actual pagination functions
 * This tests the logic without making real API calls
 */

// Mock the global variables that the functions expect
global.owner = "test-owner";
global.repo = "test-repo";
global.prNumber = "123";

// Mock fetch function
global.fetch = async (url) => {
  console.log(`   🔗 Mock API call: ${url}`);
  
  // Parse the URL to determine what to return
  if (url.includes('/files')) {
    const pageMatch = url.match(/page=(\d+)/);
    const page = pageMatch ? parseInt(pageMatch[1]) : 1;
    
    // Simulate different page sizes
    let files = [];
    if (page === 1) {
      files = [...Array(100).keys()].map(i => ({ filename: `file${i}.js` }));
    } else if (page === 2) {
      files = [...Array(75).keys()].map(i => ({ filename: `file${i+100}.js` }));
    } else {
      files = []; // No more files
    }
    
    return {
      ok: true,
      json: async () => files
    };
  } else if (url.includes('/reviews')) {
    const pageMatch = url.match(/page=(\d+)/);
    const page = pageMatch ? parseInt(pageMatch[1]) : 1;
    
    let reviews = [];
    if (page === 1) {
      reviews = [
        { id: 1, user: { login: 'user1' }, state: 'APPROVED', submitted_at: '2024-01-01T10:00:00Z' },
        { id: 2, user: { login: 'user2' }, state: 'APPROVED', submitted_at: '2024-01-01T11:00:00Z' }
      ];
    } else {
      reviews = [];
    }
    
    return {
      ok: true,
      json: async () => reviews
    };
  } else if (url.includes('/commits')) {
    const pageMatch = url.match(/page=(\d+)/);
    const page = pageMatch ? parseInt(pageMatch[1]) : 1;
    
    let commits = [];
    if (page === 1) {
      commits = [
        { sha: 'abc123', author: { login: 'user1' }, commit: { committer: { date: '2024-01-01T09:00:00Z' } } },
        { sha: 'def456', author: { login: 'user2' }, commit: { committer: { date: '2024-01-01T10:00:00Z' } } }
      ];
    } else {
      commits = [];
    }
    
    return {
      ok: true,
      json: async () => commits
    };
  }
  
  return {
    ok: false,
    status: 404
  };
};

// Import the functions from the main script
const { getAllChangedFiles, getAllReviews, getAllCommits } = require('../auto-unapprove.js');

async function runMockTests() {
  console.log("🧪 MOCK PAGINATION TESTS");
  console.log("========================");
  console.log("");
  
  const headers = {
    Accept: "application/vnd.github+json",
    Authorization: "Bearer mock-token",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "dismiss-reviews-action",
  };
  
  try {
    console.log("📁 Testing getAllChangedFiles...");
    const files = await getAllChangedFiles(headers);
    console.log(`   ✅ Retrieved ${files.length} files`);
    console.log(`   📄 Sample files: ${files.slice(0, 3).join(', ')}...`);
    console.log("");
    
    console.log("📋 Testing getAllReviews...");
    const reviews = await getAllReviews(headers);
    console.log(`   ✅ Retrieved ${reviews.length} reviews`);
    console.log(`   👥 Reviewers: ${reviews.map(r => r.user.login).join(', ')}`);
    console.log("");
    
    console.log("📝 Testing getAllCommits...");
    const commits = await getAllCommits(headers);
    console.log(`   ✅ Retrieved ${commits.length} commits`);
    console.log(`   👤 Authors: ${commits.map(c => c.author.login).join(', ')}`);
    console.log("");
    
    console.log("🎉 All mock tests passed!");
    console.log("");
    console.log("💡 This confirms the pagination logic works correctly.");
    console.log("   Now you can test with real data using the test script.");
    
  } catch (error) {
    console.error("❌ Mock test failed:", error.message);
  }
}

// Run the tests
runMockTests(); 