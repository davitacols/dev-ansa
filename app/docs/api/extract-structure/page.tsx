export default function ExtractStructurePage() {
  return (
    <div className="space-y-6">
      <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">extractStructure</h1>
      <p className="text-xl text-muted-foreground">Extract the file structure of a directory.</p>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">Syntax</h2>
        <div className="rounded-lg border bg-zinc-950 p-4">
          <pre className="text-sm text-zinc-100">
            <code>{`extractStructure(dirPath, options)`}</code>
          </pre>
        </div>

        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">Parameters</h2>
        <table className="w-full my-6 border-collapse">
          <thead>
            <tr className="m-0 border-t p-0 even:bg-muted">
              <th className="border px-4 py-2 text-left font-bold">Parameter</th>
              <th className="border px-4 py-2 text-left font-bold">Type</th>
              <th className="border px-4 py-2 text-left font-bold">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="m-0 border-t p-0 even:bg-muted">
              <td className="border px-4 py-2 text-left">
                <code>dirPath</code>
              </td>
              <td className="border px-4 py-2 text-left">string</td>
              <td className="border px-4 py-2 text-left">The directory path to scan</td>
            </tr>
            <tr className="m-0 border-t p-0 even:bg-muted">
              <td className="border px-4 py-2 text-left">
                <code>options</code>
              </td>
              <td className="border px-4 py-2 text-left">object (optional)</td>
              <td className="border px-4 py-2 text-left">Configuration options</td>
            </tr>
          </tbody>
        </table>

        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">Options Object</h3>
        <table className="w-full my-6 border-collapse">
          <thead>
            <tr className="m-0 border-t p-0 even:bg-muted">
              <th className="border px-4 py-2 text-left font-bold">Property</th>
              <th className="border px-4 py-2 text-left font-bold">Type</th>
              <th className="border px-4 py-2 text-left font-bold">Description</th>
              <th className="border px-4 py-2 text-left font-bold">Default</th>
            </tr>
          </thead>
          <tbody>
            <tr className="m-0 border-t p-0 even:bg-muted">
              <td className="border px-4 py-2 text-left">
                <code>ignoreDirs</code>
              </td>
              <td className="border px-4 py-2 text-left">string[]</td>
              <td className="border px-4 py-2 text-left">Directories to ignore</td>
              <td className="border px-4 py-2 text-left">
                <code>['node_modules', '.git', ...]</code>
              </td>
            </tr>
            <tr className="m-0 border-t p-0 even:bg-muted">
              <td className="border px-4 py-2 text-left">
                <code>ignoreFiles</code>
              </td>
              <td className="border px-4 py-2 text-left">string[]</td>
              <td className="border px-4 py-2 text-left">Files to ignore</td>
              <td className="border px-4 py-2 text-left">
                <code>['.DS_Store', 'yarn.lock', ...]</code>
              </td>
            </tr>
            <tr className="m-0 border-t p-0 even:bg-muted">
              <td className="border px-4 py-2 text-left">
                <code>ignoreExtensions</code>
              </td>
              <td className="border px-4 py-2 text-left">string[]</td>
              <td className="border px-4 py-2 text-left">File extensions to ignore</td>
              <td className="border px-4 py-2 text-left">
                <code>[]</code>
              </td>
            </tr>
            <tr className="m-0 border-t p-0 even:bg-muted">
              <td className="border px-4 py-2 text-left">
                <code>maxDepth</code>
              </td>
              <td className="border px-4 py-2 text-left">number</td>
              <td className="border px-4 py-2 text-left">Maximum depth to traverse</td>
              <td className="border px-4 py-2 text-left">
                <code>Infinity</code>
              </td>
            </tr>
            <tr className="m-0 border-t p-0 even:bg-muted">
              <td className="border px-4 py-2 text-left">
                <code>showFiles</code>
              </td>
              <td className="border px-4 py-2 text-left">boolean</td>
              <td className="border px-4 py-2 text-left">Whether to include files or just directories</td>
              <td className="border px-4 py-2 text-left">
                <code>true</code>
              </td>
            </tr>
          </tbody>
        </table>

        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">Return Value</h2>
        <p>Returns a Promise that resolves to the structure object.</p>
        <div className="rounded-lg border bg-zinc-950 p-4">
          <pre className="text-sm text-zinc-100">
            <code>{`{
  name: "project-name",
  path: "/absolute/path/to/project-name",
  type: "directory",
  children: [
    {
      name: "src",
      path: "/absolute/path/to/project-name/src",
      type: "directory",
      children: [
        {
          name: "index.js",
          path: "/absolute/path/to/project-name/src/index.js",
          type: "file",
          extension: "js"
        }
      ]
    }
  ]
}`}</code>
          </pre>
        </div>

        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">Examples</h2>

        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">Basic Usage</h3>
        <div className="rounded-lg border bg-zinc-950 p-4">
          <pre className="text-sm text-zinc-100">
            <code>{`import { extractStructure } from 'ansa-fs';

async function example() {
  const structure = await extractStructure('./my-project');
  console.log(structure);
}

example();`}</code>
          </pre>
        </div>

        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">With Custom Options</h3>
        <div className="rounded-lg border bg-zinc-950 p-4">
          <pre className="text-sm text-zinc-100">
            <code>{`import { extractStructure } from 'ansa-fs';

async function example() {
  const structure = await extractStructure('./my-project', {
    maxDepth: 2,
    ignoreDirs: ['node_modules', '.git', 'dist'],
    ignoreFiles: ['.DS_Store'],
    ignoreExtensions: ['log'],
    showFiles: true
  });
  
  console.log(structure);
}

example();`}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}
