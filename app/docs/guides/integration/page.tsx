export default function IntegrationPage() {
  return (
    <div className="space-y-6">
      <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Integration</h1>
      <p className="text-xl text-muted-foreground">How to integrate ansa-fs with other tools and workflows.</p>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">Integration with Git Hooks</h2>
        <p>
          You can use ansa-fs in Git hooks to automate tasks like generating documentation or checking for large files
          before commits.
        </p>
        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">Pre-commit Hook for Documentation</h3>
        <div className="rounded-lg border bg-zinc-950 p-4">
          <pre className="text-sm text-zinc-100">
            <code>{`#!/bin/sh
# .git/hooks/pre-commit
node -e "
const { extractStructure, toPaths } = require('ansa-fs');
const fs = require('fs').promises;

async function updateDocs() {
  const structure = await extractStructure('./src');
  const paths = toPaths(structure);
  
  let markdown = '# Source Files\\n\\n';
  paths.forEach(p => {
    markdown += '- \`' + p + '\`\\n';
  });
  
  await fs.writeFile('docs/file-list.md', markdown);
  console.log('File list updated!');
}

updateDocs();
"
git add docs/file-list.md`}</code>
          </pre>
        </div>

        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Integration with CI/CD Pipelines
        </h2>
        <p>You can use ansa-fs in CI/CD pipelines to analyze project structure or generate reports.</p>
        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">GitHub Actions Example</h3>
        <div className="rounded-lg border bg-zinc-950 p-4">
          <pre className="text-sm text-zinc-100">
            <code>{`# .github/workflows/analyze.yml
name: Analyze Project Structure

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  analyze:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
        
    - name: Install dependencies
      run: npm install
      
    - name: Install ansa-fs
      run: npm install -g ansa-fs
      
    - name: Analyze project structure
      run: |
        ansa-fs --stats > structure-stats.txt
        ansa-fs --json > structure.json
        
    - name: Upload analysis results
      uses: actions/upload-artifact@v2
      with:
        name: structure-analysis
        path: |
          structure-stats.txt
          structure.json`}</code>
          </pre>
        </div>

        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Integration with Build Tools
        </h2>
        <p>
          You can integrate ansa-fs with build tools like webpack or gulp to analyze your project during the build
          process.
        </p>
        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">Gulp Example</h3>
        <div className="rounded-lg border bg-zinc-950 p-4">
          <pre className="text-sm text-zinc-100">
            <code>{`// gulpfile.js
const { src, dest, series } = require('gulp');
const { extractStructure, getStats } = require('ansa-fs');
const fs = require('fs');

async function analyzeStructure() {
  const structure = await extractStructure('./src');
  const stats = getStats(structure);
  
  // Write stats to a JSON file
  fs.writeFileSync('./build/structure-stats.json', JSON.stringify(stats, null, 2));
  
  console.log('Project structure analysis complete');
  console.log(\`Total files: \${stats.files}\`);
  console.log(\`Total directories: \${stats.directories}\`);
  
  return Promise.resolve();
}

exports.analyze = analyzeStructure;
exports.build = series(analyzeStructure, /* other build tasks */);`}</code>
          </pre>
        </div>

        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Integration with Documentation Tools
        </h2>
        <p>You can use ansa-fs to generate documentation about your project structure.</p>
        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">Integration with JSDoc</h3>
        <div className="rounded-lg border bg-zinc-950 p-4">
          <pre className="text-sm text-zinc-100">
            <code>{`// generate-docs.js
const { extractStructure, toPaths } = require('ansa-fs');
const fs = require('fs');
const path = require('path');

async function generateDocs() {
  const structure = await extractStructure('./src');
  const paths = toPaths(structure);
  
  // Filter for JavaScript files
  const jsFiles = paths.filter(p => p.endsWith('.js'));
  
  // Create a JSDoc configuration file
  const jsdocConfig = {
    source: {
      include: jsFiles
    },
    opts: {
      destination: './docs',
      recurse: true
    }
  };
  
  fs.writeFileSync('./jsdoc.json', JSON.stringify(jsdocConfig, null, 2));
  console.log('JSDoc configuration generated');
}

generateDocs();`}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}
