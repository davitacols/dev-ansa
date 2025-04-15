import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"

export const metadata: Metadata = {
  title: "Watch Mode - ansa-fs",
  description: "Watch directories for changes and get real-time updates to your file structure",
}

export default function WatchModePage() {
  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-4xl font-bold mb-6">Watch Mode</h1>

      <p className="text-lg mb-6">
        ansa-fs provides a powerful watch mode that allows you to monitor directories for changes and get real-time
        updates to your file structure.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Overview</h2>
      <p className="mb-4">Watch mode in ansa-fs enables you to:</p>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>Monitor directories for file and directory changes</li>
        <li>Get real-time updates when files are added, removed, or modified</li>
        <li>Trigger custom actions when changes are detected</li>
        <li>Filter which types of changes to watch for</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Using Watch Mode</h2>
      <p className="mb-4">
        To watch a directory for changes, use the <code>watchStructure</code> function:
      </p>

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
  
  // Stop watching when done
  // watcher.close();
}

watchDirectory();`}
        filename="watch-mode-example.js"
      />

      <h2 className="text-2xl font-semibold mt-10 mb-4">Watch Options</h2>
      <p className="mb-4">You can customize watch mode with the following options:</p>

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

      <h2 className="text-2xl font-semibold mt-10 mb-4">Available Events</h2>
      <p className="mb-4">The watcher emits the following events:</p>

      <div className="overflow-x-auto mb-6">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-700">
              <th className="py-3 px-4 text-left font-semibold">Event</th>
              <th className="py-3 px-4 text-left font-semibold">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-3 px-4">
                <code>add</code>
              </td>
              <td className="py-3 px-4">File added</td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-3 px-4">
                <code>change</code>
              </td>
              <td className="py-3 px-4">File changed</td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-3 px-4">
                <code>unlink</code>
              </td>
              <td className="py-3 px-4">File removed</td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-3 px-4">
                <code>addDir</code>
              </td>
              <td className="py-3 px-4">Directory added</td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-3 px-4">
                <code>unlinkDir</code>
              </td>
              <td className="py-3 px-4">Directory removed</td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-3 px-4">
                <code>all</code>
              </td>
              <td className="py-3 px-4">All events (with event type as first argument)</td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-3 px-4">
                <code>error</code>
              </td>
              <td className="py-3 px-4">Error event</td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <td className="py-3 px-4">
                <code>ready</code>
              </td>
              <td className="py-3 px-4">Watcher is ready</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Watcher Methods</h2>
      <p className="mb-4">The watcher object provides the following methods:</p>

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
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Advanced Usage: Real-time Documentation</h2>
      <p className="mb-4">
        You can use watch mode to create real-time documentation that updates as your project changes:
      </p>

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

      <h2 className="text-2xl font-semibold mt-10 mb-4">CLI Usage</h2>
      <p className="mb-4">Watch mode is also available through the CLI:</p>

      <CodeBlock
        code={`# Basic watch mode
ansa-fs --watch ./my-project

# With additional options
ansa-fs --watch --depth 3 --exclude node_modules,dist ./my-project`}
        filename="terminal"
      />

      <h2 className="text-2xl font-semibold mt-10 mb-4">Limitations</h2>
      <p className="mb-4">Watch mode has some limitations to be aware of:</p>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>Performance may degrade when watching large directories with many files</li>
        <li>Some file systems may not support all watch events</li>
        <li>Very rapid changes may be batched together</li>
        <li>Symbolic links are not followed by default</li>
      </ul>
    </div>
  )
}
