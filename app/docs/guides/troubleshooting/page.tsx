export default function TroubleshootingPage() {
  return (
    <div className="space-y-6">
      <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Troubleshooting</h1>
      <p className="text-xl text-muted-foreground">Common issues and their solutions when using ansa-fs.</p>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">Command Not Found</h2>
        <p>If you get a "command not found" error after global installation:</p>
        <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">
          <li>Make sure the npm global bin directory is in your PATH</li>
          <li>
            Try installing with <code>npm install -g ansa-fs --force</code>
          </li>
          <li>On Windows, you might need to run the command prompt as administrator</li>
        </ol>
        <p>To find your npm global bin directory, run:</p>
        <div className="rounded-lg border bg-zinc-950 p-4">
          <pre className="text-sm text-zinc-100">
            <code>npm config get prefix</code>
          </pre>
        </div>
        <p>Then add the bin directory to your PATH:</p>
        <div className="rounded-lg border bg-zinc-950 p-4">
          <pre className="text-sm text-zinc-100">
            <code>
              # On Windows, it's usually: %USERPROFILE%\AppData\Roaming\npm # On macOS/Linux, it's usually:
              /usr/local/bin
            </code>
          </pre>
        </div>

        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">Permission Issues</h2>
        <p>If you encounter permission issues when scanning directories:</p>
        <div className="rounded-lg border bg-zinc-950 p-4">
          <pre className="text-sm text-zinc-100">
            <code>{`try {
  const structure = await extractStructure('./restricted-dir');
  console.log(formatAsTree(structure));
} catch (error) {
  console.error('Error scanning directory:', error.message);
  // Continue with partial results if available
  if (structure) {
    console.log('Partial results:');
    console.log(formatAsTree(structure));
  }
}`}</code>
          </pre>
        </div>
        <p>
          You can also run the CLI or your Node.js script with elevated permissions, but this is generally not
          recommended for security reasons.
        </p>

        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">Large Directories</h2>
        <p>
          For very large directories, you might want to limit the depth or use filtering to avoid performance issues:
        </p>
        <div className="rounded-lg border bg-zinc-950 p-4">
          <pre className="text-sm text-zinc-100">
            <code>{`# Limit depth to avoid processing too many files
ansa-fs --depth 3 /large-directory

# Ignore large subdirectories
ansa-fs --ignore node_modules --ignore .git --ignore dist /large-directory`}</code>
          </pre>
        </div>
        <p>When using the programmatic API, you can also set a timeout:</p>
        <div className="rounded-lg border bg-zinc-950 p-4">
          <pre className="text-sm text-zinc-100">
            <code>{`// Set a timeout of 30 seconds
const timeoutPromise = new Promise((_, reject) => {
  setTimeout(() => reject(new Error('Scan timed out')), 30000);
});

try {
  const structure = await Promise.race([
    extractStructure('./large-directory', { maxDepth: 3 }),
    timeoutPromise
  ]);
  console.log(formatAsTree(structure));
} catch (error) {
  console.error('Error:', error.message);
}`}</code>
          </pre>
        </div>

        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">Memory Issues</h2>
        <p>If you're experiencing memory issues with very large directories, try these approaches:</p>
        <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">
          <li>Limit the depth of traversal</li>
          <li>Ignore large directories like node_modules</li>
          <li>Process the structure in chunks</li>
          <li>
            Increase Node.js memory limit: <code>node --max-old-space-size=4096 your-script.js</code>
          </li>
        </ol>
      </div>
    </div>
  )
}
