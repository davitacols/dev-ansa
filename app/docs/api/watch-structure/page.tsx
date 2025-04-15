import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"

export const metadata: Metadata = {
  title: "watchStructure API - ansa-fs",
  description: "API reference for the watchStructure function in ansa-fs",
}

export default function WatchStructurePage() {
  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-4xl font-bold mb-6">watchStructure</h1>

      <p className="text-lg mb-6">
        The <code>watchStructure</code> function monitors a directory for changes and provides real-time updates to the
        file system structure.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Syntax</h2>
      <CodeBlock code={`watchStructure(directory, options?)`} filename="syntax.js" />

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
                <code>directory</code>
              </td>
              <td className="py-3 px-4">string</td>
              <td className="py-3 px-4">The directory path to watch</td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-3 px-4">
                <code>options</code>
              </td>
              <td className="py-3 px-4">WatchOptions</td>
              <td className="py-3 px-4">Optional configuration options</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-semibold mt-6 mb-3">WatchOptions</h3>
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
                <code>extractOptions</code>
              </td>
              <td className="py-3 px-4">ExtractOptions</td>
              <td className="py-3 px-4">{}</td>
              <td className="py-3 px-4">Options for the initial structure extraction</td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-3 px-4">
                <code>watchOptions</code>
              </td>
              <td className="py-3 px-4">object</td>
              <td className="py-3 px-4">{}</td>
              <td className="py-3 px-4">Options for the file watcher</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-semibold mt-6 mb-3">watchOptions Object</h3>
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
                <code>ignoreInitial</code>
              </td>
              <td className="py-3 px-4">boolean</td>
              <td className="py-3 px-4">true</td>
              <td className="py-3 px-4">Ignore initial scan events</td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-3 px-4">
                <code>ignorePermissionErrors</code>
              </td>
              <td className="py-3 px-4">boolean</td>
              <td className="py-3 px-4">true</td>
              <td className="py-3 px-4">Ignore permission errors</td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-3 px-4">
                <code>updateInterval</code>
              </td>
              <td className="py-3 px-4">number</td>
              <td className="py-3 px-4">100</td>
              <td className="py-3 px-4">Minimum time in ms between structure updates</td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-3 px-4">
                <code>events</code>
              </td>
              <td className="py-3 px-4">string[]</td>
              <td className="py-3 px-4">all events</td>
              <td className="py-3 px-4">List of events to watch for</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Return Value</h2>
      <p className="mb-4">
        Returns a <code>Watcher</code> object that emits events when files change.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">Watcher Methods</h3>
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-700">
              <th className="py-3 px-4 text-left font-semibold">Method</th>
              <th className="py-3 px-4 text-left font-semibold">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-3 px-4">
                <code>on(event, callback)</code>
              </td>
              <td className="py-3 px-4">Register an event listener</td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-3 px-4">
                <code>off(event, callback)</code>
              </td>
              <td className="py-3 px-4">Remove an event listener</td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-3 px-4">
                <code>getStructure()</code>
              </td>
              <td className="py-3 px-4">Get the current structure</td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-3 px-4">
                <code>close()</code>
              </td>
              <td className="py-3 px-4">Stop watching</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-semibold mt-6 mb-3">Watcher Events</h3>
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-700">
              <th className="py-3 px-4 text-left font-semibold">Event</th>
              <th className="py-3 px-4 text-left font-semibold">Callback Parameters</th>
              <th className="py-3 px-4 text-left font-semibold">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-3 px-4">
                <code>add</code>
              </td>
              <td className="py-3 px-4">(path, structure)</td>
              <td className="py-3 px-4">File added</td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-3 px-4">
                <code>change</code>
              </td>
              <td className="py-3 px-4">(path, structure)</td>
              <td className="py-3 px-4">File changed</td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-3 px-4">
                <code>unlink</code>
              </td>
              <td className="py-3 px-4">(path, structure)</td>
              <td className="py-3 px-4">File removed</td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-3 px-4">
                <code>addDir</code>
              </td>
              <td className="py-3 px-4">(path, structure)</td>
              <td className="py-3 px-4">Directory added</td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-3 px-4">
                <code>unlinkDir</code>
              </td>
              <td className="py-3 px-4">(path, structure)</td>
              <td className="py-3 px-4">Directory removed</td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-3 px-4">
                <code>all</code>
              </td>
              <td className="py-3 px-4">(event, path, structure)</td>
              <td className="py-3 px-4">All events</td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-3 px-4">
                <code>error</code>
              </td>
              <td className="py-3 px-4">(error)</td>
              <td className="py-3 px-4">Error event</td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-3 px-4">
                <code>ready</code>
              </td>
              <td className="py-3 px-4">()</td>
              <td className="py-3 px-4">Watcher is ready</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Example</h2>
      <CodeBlock
        code={`import { watchStructure } from '@davitacols/ansa-fs';

async function watchDirectory() {
  // Start watching a directory
  const watcher = await watchStructure('./my-project', {
    // Options for the initial structure extraction
    extractOptions: {
      depth: 3,
      includeDotFiles: false,
      excludePatterns: ['node_modules', 'dist']
    },
    
    // Watch options
    watchOptions: {
      ignoreInitial: true,
      ignorePermissionErrors: true
    }
  });
  
  // Handle changes
  watcher.on('add', (path, structure) => {
    console.log(\`File added: \${path}\`);
    // The updated structure is passed as the second argument
  });
  
  watcher.on('change', (path, structure) => {
    console.log(\`File changed: \${path}\`);
  });
  
  watcher.on('unlink', (path, structure) => {
    console.log(\`File removed: \${path}\`);
  });
  
  watcher.on('addDir', (path, structure) => {
    console.log(\`Directory added: \${path}\`);
  });
  
  watcher.on('unlinkDir', (path, structure) => {
    console.log(\`Directory removed: \${path}\`);
  });
  
  // You can also listen for all events
  watcher.on('all', (event, path, structure) => {
    console.log(\`Event: \${event}, Path: \${path}\`);
  });
  
  // Get the current structure at any time
  const currentStructure = watcher.getStructure();
  console.log('Current structure:', currentStructure);
  
  // Stop watching when done (uncomment when needed)
  // watcher.close();
  
  return watcher;
}

watchDirectory().then(watcher => {
  console.log('Watching for changes...');
  
  // Example: Stop watching after 1 hour
  setTimeout(() => {
    watcher.close();
    console.log('Stopped watching');
  }, 60 * 60 * 1000);
});`}
        filename="watch-structure-example.js"
      />

      <h2 className="text-2xl font-semibold mt-10 mb-4">Advanced Example: Real-time Documentation</h2>
      <CodeBlock
        code={`import { watchStructure, exportToMarkdown } from '@davitacols/ansa-fs';
import fs from 'fs/promises';

async function watchAndGenerateDocs() {
  const watcher = await watchStructure('./my-project', {
    extractOptions: {
      depth: Infinity,
      excludePatterns: ['node_modules', 'dist', '.git']
    }
  });
  
  // Generate initial documentation
  let structure = watcher.getStructure();
  await generateDocs(structure);
  
  // Update documentation when files change
  watcher.on('all', async (event, path, updatedStructure) => {
    console.log(\`File system changed (\${event}): \${path}\`);
    structure = updatedStructure;
    await generateDocs(structure);
  });
  
  console.log('Watching for changes and updating documentation...');
  
  return watcher;
}

async function generateDocs(structure) {
  const markdown = exportToMarkdown(structure, {
    title: 'Project Documentation',
    includeTree: true,
    includeFiles: true,
    includeStats: true
  });
  
  await fs.writeFile('documentation.md', markdown);
  console.log('Documentation updated: documentation.md');
}

watchAndGenerateDocs();`}
        filename="real-time-docs-example.js"
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
          <code>exportToMarkdown()</code> - Export structure as Markdown
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Notes</h2>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>The watcher uses the chokidar library internally for file system watching</li>
        <li>Performance may degrade when watching large directories with many files</li>
        <li>Some file systems may not support all watch events</li>
        <li>
          Always call <code>watcher.close()</code> when done to release resources
        </li>
      </ul>
    </div>
  )
}
