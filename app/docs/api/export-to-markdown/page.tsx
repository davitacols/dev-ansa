import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"

export const metadata: Metadata = {
  title: "exportToMarkdown API - ansa-fs",
  description: "API reference for the exportToMarkdown function in ansa-fs",
}

export default function ExportToMarkdownPage() {
  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-4xl font-bold mb-6">exportToMarkdown</h1>

      <p className="text-lg mb-6">
        The <code>exportToMarkdown</code> function generates comprehensive Markdown documentation from a file system
        structure.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Syntax</h2>
      <CodeBlock code={`exportToMarkdown(structure, options?)`} filename="syntax.js" />

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
                <code>structure</code>
              </td>
              <td className="py-3 px-4">FileSystemNode</td>
              <td className="py-3 px-4">The file system structure to document</td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-3 px-4">
                <code>options</code>
              </td>
              <td className="py-3 px-4">MarkdownOptions</td>
              <td className="py-3 px-4">Optional configuration options</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-semibold mt-6 mb-3">MarkdownOptions</h3>
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
                <code>title</code>
              </td>
              <td className="py-3 px-4">string</td>
              <td className="py-3 px-4">&quot;File Structure Documentation&quot;</td>
              <td className="py-3 px-4">Title for the documentation</td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-3 px-4">
                <code>description</code>
              </td>
              <td className="py-3 px-4">string</td>
              <td className="py-3 px-4">&quot;&quot;</td>
              <td className="py-3 px-4">Description text for the documentation</td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-3 px-4">
                <code>includeTree</code>
              </td>
              <td className="py-3 px-4">boolean</td>
              <td className="py-3 px-4">true</td>
              <td className="py-3 px-4">Include a tree view of the structure</td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-3 px-4">
                <code>includeFiles</code>
              </td>
              <td className="py-3 px-4">boolean</td>
              <td className="py-3 px-4">true</td>
              <td className="py-3 px-4">Include detailed file listings</td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-3 px-4">
                <code>includeStats</code>
              </td>
              <td className="py-3 px-4">boolean</td>
              <td className="py-3 px-4">true</td>
              <td className="py-3 px-4">Include statistics about the structure</td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-3 px-4">
                <code>groupByDirectory</code>
              </td>
              <td className="py-3 px-4">boolean</td>
              <td className="py-3 px-4">true</td>
              <td className="py-3 px-4">Group files by directory in the listing</td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-3 px-4">
                <code>maxDepth</code>
              </td>
              <td className="py-3 px-4">number</td>
              <td className="py-3 px-4">Infinity</td>
              <td className="py-3 px-4">Maximum depth to include in the documentation</td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-3 px-4">
                <code>includeContent</code>
              </td>
              <td className="py-3 px-4">boolean</td>
              <td className="py-3 px-4">false</td>
              <td className="py-3 px-4">Include file content in the documentation</td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-3 px-4">
                <code>fileDetailsCallback</code>
              </td>
              <td className="py-3 px-4">function</td>
              <td className="py-3 px-4">null</td>
              <td className="py-3 px-4">Custom function to generate file details</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Return Value</h2>
      <p className="mb-4">Returns a string containing the Markdown documentation.</p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Example</h2>
      <CodeBlock
        code={`import { extractStructure, exportToMarkdown } from '@davitacols/ansa-fs';
import fs from 'fs/promises';

async function generateDocumentation() {
  // Extract the structure
  const structure = await extractStructure('./my-project', {
    analyzeContent: true,
    depth: Infinity,
    excludePatterns: ['node_modules', 'dist', '.git']
  });
  
  // Generate Markdown documentation
  const markdown = exportToMarkdown(structure, {
    title: 'My Project Documentation',
    description: 'Comprehensive documentation of the project structure and files.',
    includeTree: true,
    includeFiles: true,
    includeStats: true,
    groupByDirectory: true,
    maxDepth: Infinity,
    includeContent: false,
    fileDetailsCallback: (file) => {
      // Custom file details
      let details = '';
      
      if (file.size) {
        details += \`**Size:** \${formatFileSize(file.size)}\\n\\n\`;
      }
      
      if (file.modifiedTime) {
        details += \`**Last Modified:** \${new Date(file.modifiedTime).toLocaleString()}\\n\\n\`;
      }
      
      if (file.content && file.content.language) {
        details += \`**Language:** \${file.content.language}\\n\\n\`;
        
        if (file.content.stats) {
          details += \`**Lines:** \${file.content.stats.lines} (\${file.content.stats.codeLines} code, \${file.content.stats.commentLines} comments, \${file.content.stats.blankLines} blank)\\n\\n\`;
        }
      }
      
      return details;
    }
  });
  
  // Save the documentation
  await fs.writeFile('project-docs.md', markdown);
  console.log('Documentation generated: project-docs.md');
}

function formatFileSize(bytes) {
  if (bytes < 1024) return \`\${bytes} B\`;
  if (bytes < 1024 * 1024) return \`\${(bytes / 1024).toFixed(2)} KB\`;
  return \`\${(bytes / (1024 * 1024)).toFixed(2)} MB\`;
}

generateDocumentation();`}
        filename="export-to-markdown-example.js"
      />

      <h2 className="text-2xl font-semibold mt-10 mb-4">Generated Markdown Structure</h2>
      <p className="mb-4">The generated Markdown includes the following sections:</p>

      <div className="overflow-x-auto mb-6">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-700">
              <th className="py-3 px-4 text-left font-semibold">Section</th>
              <th className="py-3 px-4 text-left font-semibold">Description</th>
              <th className="py-3 px-4 text-left font-semibold">Option</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-3 px-4">Title</td>
              <td className="py-3 px-4">Main heading for the documentation</td>
              <td className="py-3 px-4">
                <code>title</code>
              </td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-3 px-4">Description</td>
              <td className="py-3 px-4">Optional description text</td>
              <td className="py-3 px-4">
                <code>description</code>
              </td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-3 px-4">Table of Contents</td>
              <td className="py-3 px-4">Links to all sections</td>
              <td className="py-3 px-4">Always included</td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-3 px-4">Project Structure</td>
              <td className="py-3 px-4">Tree view of the file structure</td>
              <td className="py-3 px-4">
                <code>includeTree</code>
              </td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-3 px-4">Statistics</td>
              <td className="py-3 px-4">File and directory counts, extensions, etc.</td>
              <td className="py-3 px-4">
                <code>includeStats</code>
              </td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-3 px-4">Files</td>
              <td className="py-3 px-4">Detailed file listings</td>
              <td className="py-3 px-4">
                <code>includeFiles</code>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Example Output</h2>
      <CodeBlock
        code={`# My Project Documentation

Comprehensive documentation of the project structure and files.

## Table of Contents

- [Project Structure](#project-structure)
- [Statistics](#statistics)
- [Files](#files)
  - [/my-project](#my-project)
  - [/my-project/src](#my-projectsrc)
  - [/my-project/src/components](#my-projectsrccomponents)

## Project Structure

\`\`\`
my-project
├── src
│   ├── components
│   │   ├── Button.jsx
│   │   └── Card.jsx
│   └── index.js
├── package.json
└── README.md
\`\`\`

## Statistics

- **Total Files:** 5
- **Total Directories:** 2
- **Total Size:** 24.5 KB

**File Extensions:**
- js: 1 file(s)
- jsx: 2 file(s)
- json: 1 file(s)
- md: 1 file(s)

## Files

### /my-project

#### package.json

**Size:** 1.2 KB

**Last Modified:** 1/15/2023, 3:45:20 PM

**Language:** JSON

#### README.md

**Size:** 2.3 KB

**Last Modified:** 1/10/2023, 10:22:15 AM

### /my-project/src

#### index.js

**Size:** 3.5 KB

**Last Modified:** 1/20/2023, 9:15:42 AM

**Language:** JavaScript

**Lines:** 120 (95 code, 20 comments, 5 blank)

### /my-project/src/components

#### Button.jsx

**Size:** 2.1 KB

**Last Modified:** 1/18/2023, 2:30:18 PM

**Language:** JSX

**Lines:** 75 (60 code, 10 comments, 5 blank)

#### Card.jsx

**Size:** 1.8 KB

**Last Modified:** 1/19/2023, 11:05:33 AM

**Language:** JSX

**Lines:** 65 (52 code, 8 comments, 5 blank)
`}
        filename="example-output.md"
      />

      <h2 className="text-2xl font-semibold mt-10 mb-4">Related Functions</h2>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>
          <code>extractStructure()</code> - Extract file system structure
        </li>
        <li>
          <code>formatAsTree()</code> - Format structure as a tree view
        </li>
        <li>
          <code>exportDiffToMarkdown()</code> - Export diff results as Markdown
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Notes</h2>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>For best results, enable content analysis when extracting the structure</li>
        <li>Large files may be skipped during content analysis to avoid performance issues</li>
        <li>
          The <code>fileDetailsCallback</code> function can be used to customize the details shown for each file
        </li>
        <li>The generated Markdown is compatible with GitHub and most Markdown viewers</li>
      </ul>
    </div>
  )
}
