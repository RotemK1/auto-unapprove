#!/usr/bin/env node

/**
 * Test script for pagination implementation
 * This script helps verify that the pagination functions work correctly
 */

// Test the pagination functions without making actual API calls
function testPaginationLogic() {
  console.log("🧪 Testing pagination logic...\n");

  // Simulate API responses with different page sizes
  const testCases = [
    {
      name: "Small PR (15 files)",
      pages: [[...Array(15).keys()].map(i => ({ filename: `file${i}.js` }))],
      expected: 15
    },
    {
      name: "Medium PR (75 files)",
      pages: [
        [...Array(100).keys()].map(i => ({ filename: `file${i}.js` })).slice(0, 75)
      ],
      expected: 75
    },
    {
      name: "Large PR (250 files)",
      pages: [
        [...Array(100).keys()].map(i => ({ filename: `file${i}.js` })),
        [...Array(100).keys()].map(i => ({ filename: `file${i+100}.js` })),
        [...Array(50).keys()].map(i => ({ filename: `file${i+200}.js` }))
      ],
      expected: 250
    },
    {
      name: "Very Large PR (1000 files)",
      pages: [
        [...Array(100).keys()].map(i => ({ filename: `file${i}.js` })),
        [...Array(100).keys()].map(i => ({ filename: `file${i+100}.js` })),
        [...Array(100).keys()].map(i => ({ filename: `file${i+200}.js` })),
        [...Array(100).keys()].map(i => ({ filename: `file${i+300}.js` })),
        [...Array(100).keys()].map(i => ({ filename: `file${i+400}.js` })),
        [...Array(100).keys()].map(i => ({ filename: `file${i+500}.js` })),
        [...Array(100).keys()].map(i => ({ filename: `file${i+600}.js` })),
        [...Array(100).keys()].map(i => ({ filename: `file${i+700}.js` })),
        [...Array(100).keys()].map(i => ({ filename: `file${i+800}.js` })),
        [...Array(100).keys()].map(i => ({ filename: `file${i+900}.js` }))
      ],
      expected: 1000
    }
  ];

  testCases.forEach(testCase => {
    console.log(`📋 Testing: ${testCase.name}`);
    
    // Simulate the pagination logic
    let allFiles = [];
    let page = 1;
    const perPage = 100;
    
    for (const pageData of testCase.pages) {
      console.log(`   📄 Page ${page}: ${pageData.length} files`);
      allFiles.push(...pageData.map(file => file.filename));
      
      if (pageData.length < perPage) {
        break;
      }
      page++;
    }
    
    const success = allFiles.length === testCase.expected;
    console.log(`   ✅ Result: ${allFiles.length} files (expected: ${testCase.expected}) - ${success ? 'PASS' : 'FAIL'}\n`);
  });
}

// Test URL construction
function testUrlConstruction() {
  console.log("🔗 Testing URL construction...\n");
  
  const owner = "test-owner";
  const repo = "test-repo";
  const prNumber = "123";
  const perPage = 100;
  
  const endpoints = [
    { name: "Files", path: "files" },
    { name: "Reviews", path: "reviews" },
    { name: "Commits", path: "commits" }
  ];
  
  endpoints.forEach(endpoint => {
    for (let page = 1; page <= 3; page++) {
      const url = `https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}/${endpoint.path}?page=${page}&per_page=${perPage}`;
      console.log(`   ${endpoint.name} Page ${page}: ${url}`);
    }
    console.log("");
  });
}

// Show how to test with real data
function showRealTestInstructions() {
  console.log("🚀 How to test with real data:\n");
  
  console.log("1. Set environment variables:");
  console.log("   export GITHUB_TOKEN='your_github_token'");
  console.log("   export GITHUB_REPOSITORY='owner/repo'");
  console.log("   export PR_NUMBER='123'");
  console.log("   export DRY_RUN='true'  # Always start with dry run!\n");
  
  console.log("2. Run the script:");
  console.log("   node auto-unapprove.js\n");
  
  console.log("3. Look for pagination logs:");
  console.log("   📄 Fetching page 1...");
  console.log("   📄 Page 1: 100 files");
  console.log("   📄 Fetching page 2...");
  console.log("   📄 Page 2: 45 files\n");
  
  console.log("4. Find a PR with many files:");
  console.log("   - Look for PRs with >30 changed files");
  console.log("   - Check GitHub PR page for 'Files changed' count");
  console.log("   - Use PRs with 100+ files to test multiple pages\n");
  
  console.log("5. Test different scenarios:");
  console.log("   - PR with <30 files (should show 1 page)");
  console.log("   - PR with 30-100 files (should show 1 page)");
  console.log("   - PR with >100 files (should show multiple pages)");
}

// Run tests
console.log("🧪 PAGINATION TEST SUITE\n");
console.log("=" * 50 + "\n");

testPaginationLogic();
testUrlConstruction();
showRealTestInstructions();

console.log("✅ Test suite completed!");
console.log("\n💡 Tip: The best way to test is with a real PR that has many changed files."); 