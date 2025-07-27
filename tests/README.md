# Tests Directory

This directory contains all test files for the pagination implementation in `auto-unapprove.js`.

## 📁 Test Files

### `test-pagination.js`
- **Purpose**: Tests pagination logic with simulated data
- **No API calls**: Safe to run without GitHub tokens
- **Usage**: `node test-pagination.js`

### `test-mock-pagination.js`
- **Purpose**: Tests actual pagination functions with mock API responses
- **No real API calls**: Uses simulated GitHub API responses
- **Usage**: `node test-mock-pagination.js`

### `test-real-pagination.sh`
- **Purpose**: Tests with real GitHub API data
- **Requires**: GitHub token and repository access
- **Usage**: `./test-real-pagination.sh`

### `run-tests.sh`
- **Purpose**: Runs all logic and mock tests
- **Usage**: `./run-tests.sh`

### `TESTING.md`
- **Purpose**: Comprehensive testing guide
- **Contains**: Detailed instructions, troubleshooting, and success criteria

## 🚀 Quick Start

### Run All Logic Tests (No API calls):
```bash
./tests/run-tests.sh
```

### Test with Real Data:
```bash
export GITHUB_TOKEN='your_token'
export GITHUB_REPOSITORY='owner/repo'
export PR_NUMBER='123'
export DRY_RUN='true'
./tests/test-real-pagination.sh
```

## 📊 What Each Test Validates

1. **Logic Tests**: Verify pagination algorithm works correctly
2. **Mock Tests**: Verify actual functions handle pagination properly
3. **Real Tests**: Verify integration with GitHub API

## 🔍 Expected Output

Successful pagination will show:
```
📄 Fetching page 1...
📄 Page 1: 100 files
📄 Fetching page 2...
📄 Page 2: 45 files
📁 All changed files in PR (145):
```

## 🛡️ Safety

- All tests start with `DRY_RUN='true'` by default
- Mock tests don't require GitHub tokens
- Logic tests are completely safe to run 