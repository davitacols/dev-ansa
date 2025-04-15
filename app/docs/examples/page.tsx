export default function ExamplesPage() {
  return (
    <div className="space-y-6">
      <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Examples</h1>
      <p className="text-xl text-muted-foreground">Practical examples of using ansa-fs in different scenarios.</p>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">Generate Documentation</h2>
        <p>This example shows how to generate a Markdown file listing all files in a directory:</p>
        <div className="rounded-lg border bg-zinc-950 p-4">
          <pre className="text-sm text-zinc-100">
            <code>{`import { extractStructure, toPaths } from 'ansa-fs';
import fs from 'fs/promises';

async function generateFileList() {
  const structure = await extractStructure('./src');
  const paths = toPaths(structure);
  
  let markdown = '# Project Files\\n\\n';
  paths.forEach(p => {
    markdown += \`- \\\`\${p}\\\`\\n\`;
  });
  
  await fs.writeFile('file-list.md', markdown);
  console.log('File list generated!');
}

generateFileList();`}</code>
          </pre>
        </div>

        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">Analyze Project Structure</h2>
        <p>This example analyzes a project structure and calculates code to configuration ratio:</p>
        <div className="rounded-lg border bg-zinc-950 p-4">
          <pre className="text-sm text-zinc-100">
            <code>{`import { extractStructure, getStats } from 'ansa-fs';

async function analyzeProject() {
  const structure = await extractStructure('./my-project');
  const stats = getStats(structure);
  
  console.log('Project Analysis:');
  console.log(\`- Total directories: \${stats.directories}\`);
  console.log(\`- Total files: \${stats.files}\`);
  
  // Calculate code to configuration ratio
  const codeFiles = ['js', 'ts', 'jsx', 'tsx', 'py', 'java', 'c', 'cpp'].reduce((count, ext) => 
    count + (stats.extensions[ext] || 0), 0);
  const configFiles = ['json', 'yml', 'yaml', 'xml', 'config'].reduce((count, ext) => 
    count + (stats.extensions[ext] || 0), 0);
  
  console.log(\`- Code files: \${codeFiles}\`);
  console.log(\`- Config files: \${configFiles}\`);
  console.log(\`- Code to config ratio: \${(codeFiles / configFiles).toFixed(2)}\`);
}

analyzeProject();`}</code>
          </pre>
        </div>

        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">Find Large Files</h2>
        <p>This example finds and lists the largest files in a directory:</p>
        <div className="rounded-lg border bg-zinc-950 p-4">
          <pre className="text-sm text-zinc-100">
            <code>{`import { extractStructure } from 'ansa-fs';
import fs from 'fs/promises';
import path from 'path';

async function findLargeFiles() {
  const structure = await extractStructure('./my-project');
  const files = [];
  
  // Helper function to recursively collect files
  async function collectFiles(node) {
    if (node.type === 'file') {
      try {
        const stats = await fs.stat(node.path);
        files.push({
          path: node.path,
          size: stats.size,
          extension: node.extension
        });
      } catch (error) {
        console.error(\`Error getting stats for \${node.path}: \${error.message}\`);
      }
    } else if (node.children) {
      for (const child of node.children) {
        await collectFiles(child);
      }
    }
  }
  
  await collectFiles(structure);
  
  // Sort by size (largest first) and get top 10
  const largestFiles = files
    .sort((a, b) => b.size - a.size)
    .slice(0, 10);
  
  console.log('Largest files:');
  largestFiles.forEach((file, index) => {
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
    console.log(\`\${index + 1}. \${path.basename(file.path)} (\${sizeInMB} MB)\`);
  });
}

findLargeFiles();`}</code>
          </pre>
        </div>

        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">Integration with Git Hooks</h2>
        <p>This example shows how to use ansa-fs in a pre-commit Git hook to generate documentation:</p>
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
      </div>
    </div>
  )
}
