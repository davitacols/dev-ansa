import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"

export const metadata: Metadata = {
  title: "Directory Comparison - ansa-fs",
  description: "Compare two directory structures to identify added, removed, and modified files",
}

export default function DirectoryComparisonPage() {
  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-4xl font-bold mb-6">Directory Comparison</h1>

      <p className="text-lg mb-6">
        ansa-fs provides powerful directory comparison capabilities that allow you to compare two directory structures
        and identify differences between them.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Overview</h2>
      <p className="mb-4">Directory comparison in ansa-fs enables you to:</p>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>Compare two directory structures to find differences</li>
        <li>Identify added, removed, and modified files and directories</li>
        <li>Generate detailed reports of changes between versions</li>
        <li>Visualize differences in various formats</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Using Directory Comparison</h2>
      <p className="mb-4">
        To compare two directories, use the <code>diffStructures</code> function:
      </p>

      <CodeBlock
        code={`import { extractStructure, diffStructures } from '@davitacols/ansa-fs';

async function compareDirectories() {
  // Extract structures for both directories
  const oldStructure = await extractStructure('./project-v1');
  const newStructure = await extractStructure('./project-v2');
  
  // Compare the structures
  const diff = diffStructures(oldStructure, newStructure);
  
  console.log('Added files:', diff.added.length);
  console.log('Removed files:', diff.removed.length);
  console.log('Modified files:', diff.modified.length);
  
  // Print detailed results
  console.log('\\nAdded files:');
  diff.added.forEach(file => console.log(\`+ \${file.path}\`));
  
  console.log('\\nRemoved files:');
  diff.removed.forEach(file => console.log(\`- \${file.path}\`));
  
  console.log('\\nModified files:');
  diff.modified.forEach(file => console.log(\`~ \${file.path}\`));
}

compareDirectories();`}
        filename="directory-comparison-example.js"
      />

      <h2 className="text-2xl font-semibold mt-10 mb-4">Comparison Options</h2>
      <p className="mb-4">You can customize the comparison with the following options:</p>

      <div className="overflow-x-auto mb-6">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-700">
              <th className="py-3 px-4 text-left font-semibold">Option</th>
              <th className="py-3 px-4 text-left font-semibold">Type</th>
              <th className="py-3 px-4 text-left font-semibold">Default</th>
              <th className="py-3 px-4 text-left font-semibold">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-3 px-4">
                <code>compareContent</code>
              </td>
              <td className="py-3 px-4">boolean</td>
              <td className="py-3 px-4">false</td>
              <td className="py-3 px-4">Compare file contents to detect modifications</td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-3 px-4">
                <code>compareSize</code>
              </td>
              <td className="py-3 px-4">boolean</td>
              <td className="py-3 px-4">true</td>
              <td className="py-3 px-4">Use file size to detect modifications</td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-3 px-4">
                <code>compareModifiedTime</code>
              </td>
              <td className="py-3 px-4">boolean</td>
              <td className="py-3 px-4">true</td>
              <td className="py-3 px-4">Use modification time to detect changes</td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-3 px-4">
                <code>ignoreEmptyDirectories</code>
              </td>
              <td className="py-3 px-4">boolean</td>
              <td className="py-3 px-4">true</td>
              <td className="py-3 px-4">Ignore empty directories in comparison</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Comparison Results</h2>
      <p className="mb-4">
        The <code>diffStructures</code> function returns an object with the following properties:
      </p>

      <CodeBlock
        code={`{
  "added": [
    {
      "name": "new-file.js",
      "type": "file",
      "path": "/project/src/new-file.js",
      "size": 1240
    }
  ],
  "removed": [
    {
      "name": "old-file.js",
      "type": "file",
      "path": "/project/src/old-file.js",
      "size": 850
    }
  ],
  "modified": [
    {
      "name": "updated-file.js",
      "type": "file",
      "path": "/project/src/updated-file.js",
      "oldSize": 1200,
      "newSize": 1350,
      "changes": {
        "size": true,
        "modifiedTime": true,
        "content": true
      }
    }
  ],
  "unchanged": [
    {
      "name": "unchanged-file.js",
      "type": "file",
      "path": "/project/src/unchanged-file.js",
      "size": 950
    }
  ],
  "summary": {
    "addedCount": 1,
    "removedCount": 1,
    "modifiedCount": 1,
    "unchangedCount": 1,
    "totalChanges": 3
  }
}`}
        filename="comparison-result.json"
      />

      <h2 className="text-2xl font-semibold mt-10 mb-4">Visualizing Differences</h2>
      <p className="mb-4">You can visualize the differences in various formats:</p>

      <CodeBlock
        code={`import { extractStructure, diffStructures, formatDiffAsTree } from '@davitacols/ansa-fs';

async function visualizeDifferences() {
  const oldStructure = await extractStructure('./project-v1');
  const newStructure = await extractStructure('./project-v2');
  
  const diff = diffStructures(oldStructure, newStructure);
  
  // Format as a tree with + (added), - (removed), and ~ (modified) indicators
  const treeOutput = formatDiffAsTree(diff);
  console.log(treeOutput);
}

visualizeDifferences();`}
        filename="visualize-diff-example.js"
      />

      <p className="mb-4">Example output:</p>

      <CodeBlock
        code={`project/
├── src/
│   ├── + new-file.js
│   ├── - old-file.js
│   └── ~ updated-file.js
├── public/
│   └── assets/
│       └── + new-image.png
└── package.json`}
        filename="diff-tree-output.txt"
      />

      <h2 className="text-2xl font-semibold mt-10 mb-4">CLI Usage</h2>
      <p className="mb-4">Directory comparison is also available through the CLI:</p>

      <CodeBlock
        code={`# Basic comparison
ansa-fs --diff ./project-v1 ./project-v2

# With additional options
ansa-fs --diff --compare-content --ignore-empty-dirs ./project-v1 ./project-v2`}
        filename="terminal"
      />

      <h2 className="text-2xl font-semibold mt-10 mb-4">Advanced Usage: Generating Change Reports</h2>
      <p className="mb-4">You can generate detailed change reports for documentation or CI/CD pipelines:</p>

      <CodeBlock
        code={`import { extractStructure, diffStructures, exportDiffToMarkdown } from '@davitacols/ansa-fs';
import fs from 'fs/promises';

async function generateChangeReport() {
  const oldStructure = await extractStructure('./project-v1');
  const newStructure = await extractStructure('./project-v2');
  
  const diff = diffStructures(oldStructure, newStructure, {
    compareContent: true,
    compareSize: true,
    compareModifiedTime: true
  });
  
  // Generate a Markdown report
  const markdownReport = exportDiffToMarkdown(diff, {
    title: 'Project Changes: v1 to v2',
    includeStats: true,
    groupByDirectory: true
  });
  
  // Save the report
  await fs.writeFile('change-report.md', markdownReport);
  console.log('Change report generated: change-report.md');
}

generateChangeReport();`}
        filename="generate-report-example.js"
      />
    </div>
  )
}
