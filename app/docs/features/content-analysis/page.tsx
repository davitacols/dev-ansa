import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"

export const metadata: Metadata = {
  title: "Content Analysis - ansa-fs",
  description: "Analyze file contents, detect languages, and extract metadata from your files",
}

export default function ContentAnalysisPage() {
  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-4xl font-bold mb-6">Content Analysis</h1>

      <p className="text-lg mb-6">
        ansa-fs provides powerful content analysis capabilities that allow you to extract information from file
        contents, detect programming languages, and analyze code complexity.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Overview</h2>
      <p className="mb-4">Content analysis in ansa-fs enables you to:</p>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>Extract and analyze file contents</li>
        <li>Detect programming languages based on file extensions and content</li>
        <li>Calculate code metrics like line count, comment count, and complexity</li>
        <li>Identify dependencies and imports in code files</li>
        <li>Generate content summaries for documentation</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Using Content Analysis</h2>
      <p className="mb-4">
        Content analysis is enabled by default when using the <code>extractStructure</code> function with the{" "}
        <code>analyzeContent</code> option set to <code>true</code>.
      </p>

      <CodeBlock
        code={`import { extractStructure } from '@davitacols/ansa-fs';

async function analyzeProjectContent() {
  const structure = await extractStructure('./my-project', {
    analyzeContent: true,
    contentAnalysisOptions: {
      calculateStats: true,
      detectLanguage: true,
      extractImports: true,
      maxFileSizeKb: 500 // Skip files larger than 500KB
    }
  });

  console.log(JSON.stringify(structure, null, 2));
}

analyzeProjectContent();`}
        filename="content-analysis-example.js"
      />

      <h2 className="text-2xl font-semibold mt-10 mb-4">Content Analysis Options</h2>
      <p className="mb-4">You can customize content analysis with the following options:</p>

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
                <code>calculateStats</code>
              </td>
              <td className="py-3 px-4">boolean</td>
              <td className="py-3 px-4">true</td>
              <td className="py-3 px-4">Calculate line counts, comment counts, and code complexity</td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-3 px-4">
                <code>detectLanguage</code>
              </td>
              <td className="py-3 px-4">boolean</td>
              <td className="py-3 px-4">true</td>
              <td className="py-3 px-4">Detect programming language based on extension and content</td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-3 px-4">
                <code>extractImports</code>
              </td>
              <td className="py-3 px-4">boolean</td>
              <td className="py-3 px-4">false</td>
              <td className="py-3 px-4">Extract import/require statements from code files</td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-3 px-4">
                <code>maxFileSizeKb</code>
              </td>
              <td className="py-3 px-4">number</td>
              <td className="py-3 px-4">1000</td>
              <td className="py-3 px-4">Skip files larger than this size (in KB)</td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-3 px-4">
                <code>fileExtensions</code>
              </td>
              <td className="py-3 px-4">string[]</td>
              <td className="py-3 px-4">[]</td>
              <td className="py-3 px-4">Only analyze files with these extensions (empty = all files)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Content Analysis Results</h2>
      <p className="mb-4">
        When content analysis is enabled, each file node in the structure will include additional metadata:
      </p>

      <CodeBlock
        code={`{
  "name": "index.js",
  "type": "file",
  "path": "/project/src/index.js",
  "size": 1240,
  "content": {
    "language": "JavaScript",
    "stats": {
      "lines": 42,
      "codeLines": 32,
      "commentLines": 8,
      "blankLines": 2,
      "complexity": 5
    },
    "imports": [
      { "name": "express", "type": "require" },
      { "name": "./utils", "type": "require" }
    ]
  }
}`}
        filename="content-analysis-result.json"
      />

      <h2 className="text-2xl font-semibold mt-10 mb-4">Using the Content Analyzer Directly</h2>
      <p className="mb-4">You can also use the content analyzer directly for more fine-grained control:</p>

      <CodeBlock
        code={`import { ContentAnalyzer } from '@davitacols/ansa-fs';

async function analyzeFile() {
  const analyzer = new ContentAnalyzer({
    calculateStats: true,
    detectLanguage: true,
    extractImports: true
  });
  
  const fileContent = '// This is a comment\\nconst express = require("express");\\nconst app = express();';
  const result = await analyzer.analyze(fileContent, 'server.js');
  
  console.log(result);
}

analyzeFile();`}
        filename="direct-analyzer-example.js"
      />

      <h2 className="text-2xl font-semibold mt-10 mb-4">CLI Usage</h2>
      <p className="mb-4">
        Content analysis is also available through the CLI with the <code>--analyze-content</code> flag:
      </p>

      <CodeBlock
        code={`# Basic content analysis
ansa-fs --analyze-content ./my-project

# With additional options
ansa-fs --analyze-content --extract-imports --max-file-size 500 ./my-project`}
        filename="terminal"
      />

      <h2 className="text-2xl font-semibold mt-10 mb-4">Limitations</h2>
      <p className="mb-4">Content analysis has some limitations to be aware of:</p>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>
          Large files may be skipped to avoid performance issues (configurable with <code>maxFileSizeKb</code>)
        </li>
        <li>Binary files are automatically skipped</li>
        <li>Language detection is based on file extensions and simple heuristics</li>
        <li>Import extraction works best with JavaScript, TypeScript, Python, and Ruby</li>
      </ul>
    </div>
  )
}
