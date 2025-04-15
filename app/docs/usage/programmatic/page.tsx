import { CodeBlock } from "@/components/code-block"

export default function ProgrammaticUsagePage() {
  return (
    <div className="space-y-6">
      <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Programmatic Usage</h1>
      <p className="text-xl text-muted-foreground">How to use ansa-fs programmatically in your Node.js projects.</p>

      <div className="space-y-4">
        <p>
          After installing ansa-fs locally in your project, you can import and use its functions in your JavaScript or
          TypeScript code.
        </p>

        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">Basic Usage</h2>

        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Extracting and Displaying a Directory Structure
        </h3>
        <p>To extract and display the structure of a directory:</p>
        <CodeBlock
          code={`import { extractStructure, formatAsTree } from 'ansa-fs';

async function example() {
  // Extract the structure of a directory
  const structure = await extractStructure('./my-project');
  
  // Format and print as a tree
  console.log(formatAsTree(structure));
}

example();`}
          language="javascript"
        />

        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">With Custom Options</h3>
        <p>To extract a structure with custom options:</p>
        <CodeBlock
          code={`import { extractStructure } from 'ansa-fs';

async function example() {
  const structure = await extractStructure('./my-project', {
    maxDepth: 3,                                // Only go 3 levels deep
    ignoreDirs: ['node_modules', '.git', 'dist'], // Directories to ignore
    ignoreFiles: ['.DS_Store'],                 // Files to ignore
    ignoreExtensions: ['log', 'tmp'],           // Extensions to ignore
    showFiles: true,                            // Include files (not just directories)
    includeSize: true,                          // Include file and directory sizes
    includeHash: true,                          // Include file hashes
    includeModTime: true,                       // Include modification times
    includeContent: true,                       // Include file contents
    detectLanguage: true,                       // Detect programming languages
  });
  
  console.log(JSON.stringify(structure, null, 2));
}

example();`}
          language="javascript"
        />

        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">New Features in v2.0</h2>

        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">Directory Comparison</h3>
        <p>To compare two directory structures and find differences:</p>
        <CodeBlock
          code={`import { extractStructure, diffStructures } from '@davitacols/ansa-fs';

async function example() {
  const structureA = await extractStructure('./project-v1');
  const structureB = await extractStructure('./project-v2');
  
  const diff = diffStructures(structureA, structureB, {
    compareContent: true,
    compareSize: true,
    compareModTime: true
  });
  
  console.log(\`Added files: \${diff.added.length}\`);
  console.log(\`Removed files: \${diff.removed.length}\`);
  console.log(\`Modified files: \${diff.modified.length}\`);
  console.log(\`Unchanged files: \${diff.unchanged.length}\`);
  
  // Print modified files
  diff.modified.forEach(item => {
    console.log(\`Modified: \${item.path}\`);
    if (item.modifications) {
      Object.entries(item.modifications).forEach(([key, value]) => {
        console.log(\`  - \${key}: \${JSON.stringify(value)}\`);
      });
    }
  });
}

example();`}
          language="javascript"
        />

        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">Watch Mode</h3>
        <p>To watch a directory for changes and get real-time updates:</p>
        <CodeBlock
          code={`import { watchStructure, formatAsTree } from 'ansa-fs';

function example() {
  console.log('Watching directory for changes...');
  
  const watcher = watchStructure('./my-project', (error, structure, meta) => {
    if (error) {
      console.error('Error:', error.message);
      return;
    }
    
    if (meta.initialScan) {
      console.log('Initial scan complete');
    } else {
      console.log('Changes detected!');
    }
    
    console.log(formatAsTree(structure));
  }, {
    includeSize: true,
    debounceTime: 300 // Wait 300ms after changes before updating
  });
  
  // Stop watching after 5 minutes
  setTimeout(() => {
    watcher.stop();
    console.log('Stopped watching');
  }, 5 * 60 * 1000);
}

example();`}
          language="javascript"
        />

        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">Export to Markdown</h3>
        <p>To export the structure as Markdown documentation:</p>
        <CodeBlock
          code={`import { extractStructure, exportToMarkdown } from 'ansa-fs';
import fs from 'fs/promises';

async function example() {
  const structure = await extractStructure('./my-project', {
    includeSize: true
  });
  
  const markdown = exportToMarkdown(structure, {
    title: 'My Project Structure',
    includeStats: true,
    includeSize: true
  });
  
  await fs.writeFile('project-structure.md', markdown);
  console.log('Markdown documentation generated!');
}

example();`}
          language="javascript"
        />

        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">Content Analysis</h3>
        <p>To analyze file contents and detect programming languages:</p>
        <CodeBlock
          code={`import { extractStructure } from 'ansa-fs';

async function example() {
  const structure = await extractStructure('./src', {
    includeContent: true,
    detectLanguage: true
  });
  
  // Find all JavaScript files
  function findJsFiles(node, results = []) {
    if (node.type === 'file' && node.language === 'JavaScript') {
      results.push(node);
    } else if (node.type === 'directory' && node.children) {
      node.children.forEach(child => findJsFiles(child, results));
    }
    return results;
  }
  
  const jsFiles = findJsFiles(structure);
  console.log(\`Found \${jsFiles.length} JavaScript files\`);
  
  // Print file details
  jsFiles.forEach(file => {
    console.log(\`File: \${file.relativePath}\`);
    console.log(\`Language: \${file.language}\`);
    console.log(\`Size: \${file.sizeFormatted}\`);
    
    // Count lines of code
    if (file.content) {
      const lines = file.content.split('\\n').length;
      console.log(\`Lines: \${lines}\`);
    }
    
    console.log('---');
  });
}

example();`}
          language="javascript"
        />

        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">Working with the Structure</h2>

        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">Getting Statistics</h3>
        <p>To get statistics about the structure:</p>
        <CodeBlock
          code={`import { extractStructure, getStats } from 'ansa-fs';

async function example() {
  const structure = await extractStructure('./my-project');
  const stats = getStats(structure);
  
  console.log(\`Total directories: \${stats.directories}\`);
  console.log(\`Total files: \${stats.files}\`);
  
  // Show file extensions and counts
  Object.entries(stats.extensions)
    .sort((a, b) => b[1] - a[1])
    .forEach(([ext, count]) => {
      console.log(\`\${ext}: \${count} files\`);
    });
    
  // Show largest files (if includeSize was true)
  if (stats.largestFiles) {
    console.log('Largest files:');
    stats.largestFiles.forEach((file, i) => {
      console.log(\`\${i+1}. \${file.path} (\${file.sizeFormatted})\`);
    });
  }
}

example();`}
          language="javascript"
        />

        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">Filtering the Structure</h3>
        <p>To filter the structure based on a predicate function:</p>
        <CodeBlock
          code={`import { extractStructure, filter, formatAsTree } from 'ansa-fs';

async function example() {
  const structure = await extractStructure('./my-project');
  
  // Only include JavaScript and TypeScript files
  const jsAndTsFiles = filter(structure, (node) => {
    if (node.type === 'directory') return true; // Keep all directories
    return ['js', 'ts'].includes(node.extension); // Only keep .js and .ts files
  });
  
  console.log(formatAsTree(jsAndTsFiles));
}

example();`}
          language="javascript"
        />

        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">Error Handling</h2>
        <p>It's important to handle errors when working with the file system:</p>
        <CodeBlock
          code={`import { extractStructure, formatAsTree } from '@davitacols/ansa-fs';

async function example() {
  try {
    const structure = await extractStructure('./my-project');
    console.log(formatAsTree(structure));
  } catch (error) {
    console.error('Error scanning directory:', error.message);
  }
}

example();`}
          language="javascript"
        />
      </div>
    </div>
  )
}
