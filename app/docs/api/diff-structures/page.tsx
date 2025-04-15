import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"

export const metadata: Metadata = {
  title: "diffStructures API - ansa-fs",
  description: "API reference for the diffStructures function in ansa-fs",
}

export default function DiffStructuresPage() {
  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-4xl font-bold mb-6">diffStructures</h1>

      <p className="text-lg mb-6">
        The <code>diffStructures</code> function compares two file system structures and identifies the differences
        between them.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Syntax</h2>
      <CodeBlock code={`diffStructures(oldStructure, newStructure, options?)`} filename="syntax.js" />

      <h2 className="text-2xl font-semibold mt-10 mb-4">Parameters</h2>
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-700">
              <th className="py-3 px-4 text-left font-semibold">Parameter</th>
              <th className="py-3 px-4 text-left font-semibold">Type</th>
              <th className="py-3 px-4 text-left font-semibold">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-3 px-4">
                <code>oldStructure</code>
              </td>
              <td className="py-3 px-4">FileSystemNode</td>
              <td className="py-3 px-4">The original file system structure</td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-3 px-4">
                <code>newStructure</code>
              </td>
              <td className="py-3 px-4">FileSystemNode</td>
              <td className="py-3 px-4">The new file system structure to compare against</td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-3 px-4">
                <code>options</code>
              </td>
              <td className="py-3 px-4">DiffOptions</td>
              <td className="py-3 px-4">Optional configuration options</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-semibold mt-6 mb-3">DiffOptions</h3>
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

      <h2 className="text-2xl font-semibold mt-10 mb-4">Return Value</h2>
      <p className="mb-4">
        Returns a <code>DiffResult</code> object containing the differences between the two structures.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">DiffResult</h3>
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-700">
              <th className="py-3 px-4 text-left font-semibold">Property</th>
              <th className="py-3 px-4 text-left font-semibold">Type</th>
              <th className="py-3 px-4 text-left font-semibold">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-3 px-4">
                <code>added</code>
              </td>
              <td className="py-3 px-4">FileSystemNode[]</td>
              <td className="py-3 px-4">Files and directories that were added</td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-3 px-4">
                <code>removed</code>
              </td>
              <td className="py-3 px-4">FileSystemNode[]</td>
              <td className="py-3 px-4">Files and directories that were removed</td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-3 px-4">
                <code>modified</code>
              </td>
              <td className="py-3 px-4">ModifiedNode[]</td>
              <td className="py-3 px-4">Files that were modified</td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-3 px-4">
                <code>unchanged</code>
              </td>
              <td className="py-3 px-4">FileSystemNode[]</td>
              <td className="py-3 px-4">Files and directories that were unchanged</td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-3 px-4">
                <code>summary</code>
              </td>
              <td className="py-3 px-4">DiffSummary</td>
              <td className="py-3 px-4">Summary statistics of the differences</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-semibold mt-6 mb-3">ModifiedNode</h3>
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-700">
              <th className="py-3 px-4 text-left font-semibold">Property</th>
              <th className="py-3 px-4 text-left font-semibold">Type</th>
              <th className="py-3 px-4 text-left font-semibold">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-3 px-4">
                <code>name</code>
              </td>
              <td className="py-3 px-4">string</td>
              <td className="py-3 px-4">File name</td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-3 px-4">
                <code>path</code>
              </td>
              <td className="py-3 px-4">string</td>
              <td className="py-3 px-4">File path</td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-3 px-4">
                <code>type</code>
              </td>
              <td className="py-3 px-4">string</td>
              <td className="py-3 px-4">Node type (file or directory)</td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-3 px-4">
                <code>oldSize</code>
              </td>
              <td className="py-3 px-4">number</td>
              <td className="py-3 px-4">Original file size</td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-3 px-4">
                <code>newSize</code>
              </td>
              <td className="py-3 px-4">number</td>
              <td className="py-3 px-4">New file size</td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-3 px-4">
                <code>changes</code>
              </td>
              <td className="py-3 px-4">object</td>
              <td className="py-3 px-4">What aspects of the file changed</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-semibold mt-6 mb-3">DiffSummary</h3>
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-700">
              <th className="py-3 px-4 text-left font-semibold">Property</th>
              <th className="py-3 px-4 text-left font-semibold">Type</th>
              <th className="py-3 px-4 text-left font-semibold">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-3 px-4">
                <code>addedCount</code>
              </td>
              <td className="py-3 px-4">number</td>
              <td className="py-3 px-4">Number of added files and directories</td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-3 px-4">
                <code>removedCount</code>
              </td>
              <td className="py-3 px-4">number</td>
              <td className="py-3 px-4">Number of removed files and directories</td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-3 px-4">
                <code>modifiedCount</code>
              </td>
              <td className="py-3 px-4">number</td>
              <td className="py-3 px-4">Number of modified files</td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-3 px-4">
                <code>unchangedCount</code>
              </td>
              <td className="py-3 px-4">number</td>
              <td className="py-3 px-4">Number of unchanged files and directories</td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-3 px-4">
                <code>totalChanges</code>
              </td>
              <td className="py-3 px-4">number</td>
              <td className="py-3 px-4">Total number of changes (added + removed + modified)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Example</h2>
      <CodeBlock
        code={`import { extractStructure, diffStructures } from '@davitacols/ansa-fs';

async function compareDirectories() {
  // Extract structures for both directories
  const oldStructure = await extractStructure('./project-v1');
  const newStructure = await extractStructure('./project-v2');
  
  // Compare the structures
  const diff = diffStructures(oldStructure, newStructure, {
    compareContent: true,
    compareSize: true,
    compareModifiedTime: true,
    ignoreEmptyDirectories: true
  });
  
  // Print summary
  console.log('Diff Summary:');
  console.log(\`Added: \${diff.summary.addedCount}\`);
  console.log(\`Removed: \${diff.summary.removedCount}\`);
  console.log(\`Modified: \${diff.summary.modifiedCount}\`);
  console.log(\`Unchanged: \${diff.summary.unchangedCount}\`);
  console.log(\`Total Changes: \${diff.summary.totalChanges}\`);
  
  // Print detailed results
  console.log('\\nAdded files:');
  diff.added.forEach(file => console.log(\`+ \${file.path}\`));
  
  console.log('\\nRemoved files:');
  diff.removed.forEach(file => console.log(\`- \${file.path}\`));
  
  console.log('\\nModified files:');
  diff.modified.forEach(file => {
    console.log(\`~ \${file.path}\`);
    console.log(\`  Old size: \${file.oldSize} bytes\`);
    console.log(\`  New size: \${file.newSize} bytes\`);
    console.log(\`  Changes: \${Object.keys(file.changes).join(', ')}\`);
  });
}

compareDirectories();`}
        filename="diff-structures-example.js"
      />

      <h2 className="text-2xl font-semibold mt-10 mb-4">Related Functions</h2>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>
          <code>formatDiffAsTree()</code> - Format diff results as a tree view
        </li>
        <li>
          <code>exportDiffToMarkdown()</code> - Export diff results as Markdown
        </li>
        <li>
          <code>extractStructure()</code> - Extract file system structure
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Notes</h2>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>The comparison is based on file paths, so renamed files will appear as removed and added</li>
        <li>Content comparison can be slow for large files or directories with many files</li>
        <li>For best results, use the same extraction options for both structures</li>
      </ul>
    </div>
  )
}
