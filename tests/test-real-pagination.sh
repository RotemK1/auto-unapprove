#!/bin/bash

# Test script for real pagination testing
# Usage: ./test-real-pagination.sh

echo "🧪 REAL PAGINATION TEST"
echo "========================"
echo ""

# Check if required environment variables are set
if [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ GITHUB_TOKEN is not set"
    echo "   Please set it with: export GITHUB_TOKEN='your_token'"
    exit 1
fi

if [ -z "$GITHUB_REPOSITORY" ]; then
    echo "❌ GITHUB_REPOSITORY is not set"
    echo "   Please set it with: export GITHUB_REPOSITORY='owner/repo'"
    exit 1
fi

if [ -z "$PR_NUMBER" ]; then
    echo "❌ PR_NUMBER is not set"
    echo "   Please set it with: export PR_NUMBER='123'"
    exit 1
fi

echo "✅ Environment variables are set:"
echo "   Repository: $GITHUB_REPOSITORY"
echo "   PR Number: $PR_NUMBER"
echo "   Token: ${GITHUB_TOKEN:0:10}..."
echo ""

# Set dry run mode for safety
export DRY_RUN="true"

echo "🚀 Running pagination test..."
echo "   Mode: DRY RUN (safe)"
echo ""

# Run the script
node ../auto-unapprove.js

echo ""
echo "📊 Test Results:"
echo "   Look for these indicators of successful pagination:"
echo "   ✅ '📄 Fetching page X...' messages"
echo "   ✅ Multiple pages if PR has >100 files"
echo "   ✅ Correct total file count"
echo "   ✅ No errors about missing files"
echo ""
echo "💡 To test with actual dismissals, set:"
echo "   export DRY_RUN='false'"
echo ""
echo "🔍 To find PRs with many files:"
echo "   1. Go to your repository on GitHub"
echo "   2. Look for PRs with high 'Files changed' counts"
echo "   3. Use PRs with >30 files to test pagination" 