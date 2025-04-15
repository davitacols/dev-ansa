import { CodeBlock } from "@/components/code-block"

export default function CliUsagePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-4">CLI Usage</h1>
      <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8">How to use ansa-fs as a command-line tool.</p>

      <div className="space-y-8">
        <p>
          After installing ansa-fs globally, you can use the <code>ansa-fs</code> command in your terminal to extract
          and visualize file system structures.
        </p>

        <div>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">Basic Usage</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold tracking-tight mb-2">Scanning the Current Directory</h3>
              <p className="mb-3">To scan and display the structure of the current directory:</p>
              <CodeBlock code="ansa-fs" filename="terminal" />
            </div>

            <div>
              <h3 className="text-xl font-semibold tracking-tight mb-2">Scanning a Specific Directory</h3>
              <p className="mb-3">To scan a specific directory:</p>
              <CodeBlock code="ansa-fs ./src" filename="terminal" />
            </div>

            <div>
              <h3 className="text-xl font-semibold tracking-tight mb-2">Limiting Depth</h3>
              <p className="mb-3">To limit the depth of the scan:</p>
              <CodeBlock code="ansa-fs --depth 2 ./my-project" filename="terminal" />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">Output Options</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold tracking-tight mb-2">JSON Output</h3>
              <p className="mb-3">To output the structure as JSON:</p>
              <CodeBlock code="ansa-fs --json" filename="terminal" />
            </div>

            <div>
              <h3 className="text-xl font-semibold tracking-tight mb-2">Paths Output</h3>
              <p className="mb-3">To output the structure as a list of paths:</p>
              <CodeBlock code="ansa-fs --paths" filename="terminal" />
            </div>

            <div>
              <h3 className="text-xl font-semibold tracking-tight mb-2">Statistics Output</h3>
              <p className="mb-3">To show statistics about the structure:</p>
              <CodeBlock code="ansa-fs --stats" filename="terminal" />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">Filtering Options</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold tracking-tight mb-2">Ignoring Directories</h3>
              <p className="mb-3">To ignore specific directories:</p>
              <CodeBlock code="ansa-fs --ignore node_modules --ignore .git" filename="terminal" />
            </div>

            <div>
              <h3 className="text-xl font-semibold tracking-tight mb-2">Ignoring File Extensions</h3>
              <p className="mb-3">To ignore specific file extensions:</p>
              <CodeBlock code="ansa-fs --ignore-ext log --ignore-ext tmp" filename="terminal" />
            </div>

            <div>
              <h3 className="text-xl font-semibold tracking-tight mb-2">Showing Only Directories</h3>
              <p className="mb-3">To show only directories (no files):</p>
              <CodeBlock code="ansa-fs --dirs-only" filename="terminal" />
            </div>

            <div>
              <h3 className="text-xl font-semibold tracking-tight mb-2">Showing Only Files</h3>
              <p className="mb-3">To show only files (no directories):</p>
              <CodeBlock code="ansa-fs --files-only" filename="terminal" />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">New Features in v2.0</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold tracking-tight mb-2">Including File Metadata</h3>
              <p className="mb-3">To include file sizes, modification times, and hashes:</p>
              <CodeBlock code="ansa-fs --size --mod-time --hash" filename="terminal" />
            </div>

            <div>
              <h3 className="text-xl font-semibold tracking-tight mb-2">Content Analysis</h3>
              <p className="mb-3">To include file contents and detect programming languages:</p>
              <CodeBlock code="ansa-fs --content --detect-language" filename="terminal" />
            </div>

            <div>
              <h3 className="text-xl font-semibold tracking-tight mb-2">Directory Comparison</h3>
              <p className="mb-3">To compare two directories and find differences:</p>
              <CodeBlock code="ansa-fs --diff ./other-project" filename="terminal" />
            </div>

            <div>
              <h3 className="text-xl font-semibold tracking-tight mb-2">Exporting to Markdown</h3>
              <p className="mb-3">To export the structure as Markdown documentation:</p>
              <CodeBlock code="ansa-fs --markdown --output structure.md" filename="terminal" />
            </div>

            <div>
              <h3 className="text-xl font-semibold tracking-tight mb-2">Watch Mode</h3>
              <p className="mb-3">To watch a directory for changes and update the structure in real-time:</p>
              <CodeBlock code="ansa-fs --watch" filename="terminal" />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">CLI Options Reference</h2>

          <table className="w-full my-6 border-collapse">
            <thead>
              <tr className="m-0 border-t p-0 even:bg-muted">
                <th className="border px-4 py-2 text-left font-bold">Option</th>
                <th className="border px-4 py-2 text-left font-bold">Alias</th>
                <th className="border px-4 py-2 text-left font-bold">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="m-0 border-t p-0 even:bg-muted">
                <td className="border px-4 py-2 text-left">
                  <code>--help</code>
                </td>
                <td className="border px-4 py-2 text-left">
                  <code>-h</code>
                </td>
                <td className="border px-4 py-2 text-left">Show help message</td>
              </tr>
              <tr className="m-0 border-t p-0 even:bg-muted">
                <td className="border px-4 py-2 text-left">
                  <code>--depth &lt;n&gt;</code>
                </td>
                <td className="border px-4 py-2 text-left">
                  <code>-d</code>
                </td>
                <td className="border px-4 py-2 text-left">Maximum depth to traverse (default: unlimited)</td>
              </tr>
              <tr className="m-0 border-t p-0 even:bg-muted">
                <td className="border px-4 py-2 text-left">
                  <code>--files-only</code>
                </td>
                <td className="border px-4 py-2 text-left">
                  <code>-f</code>
                </td>
                <td className="border px-4 py-2 text-left">Show only files (no directories)</td>
              </tr>
              <tr className="m-0 border-t p-0 even:bg-muted">
                <td className="border px-4 py-2 text-left">
                  <code>--dirs-only</code>
                </td>
                <td className="border px-4 py-2 text-left">
                  <code>-D</code>
                </td>
                <td className="border px-4 py-2 text-left">Show only directories (no files)</td>
              </tr>
              <tr className="m-0 border-t p-0 even:bg-muted">
                <td className="border px-4 py-2 text-left">
                  <code>--ignore &lt;path&gt;</code>
                </td>
                <td className="border px-4 py-2 text-left">
                  <code>-i</code>
                </td>
                <td className="border px-4 py-2 text-left">Ignore specific paths (can be used multiple times)</td>
              </tr>
              <tr className="m-0 border-t p-0 even:bg-muted">
                <td className="border px-4 py-2 text-left">
                  <code>--ignore-ext &lt;ext&gt;</code>
                </td>
                <td className="border px-4 py-2 text-left">
                  <code>-e</code>
                </td>
                <td className="border px-4 py-2 text-left">
                  Ignore specific file extensions (can be used multiple times)
                </td>
              </tr>
              <tr className="m-0 border-t p-0 even:bg-muted">
                <td className="border px-4 py-2 text-left">
                  <code>--json</code>
                </td>
                <td className="border px-4 py-2 text-left">
                  <code>-j</code>
                </td>
                <td className="border px-4 py-2 text-left">Output as JSON instead of tree</td>
              </tr>
              <tr className="m-0 border-t p-0 even:bg-muted">
                <td className="border px-4 py-2 text-left">
                  <code>--paths</code>
                </td>
                <td className="border px-4 py-2 text-left">
                  <code>-p</code>
                </td>
                <td className="border px-4 py-2 text-left">Output as a list of paths</td>
              </tr>
              <tr className="m-0 border-t p-0 even:bg-muted">
                <td className="border px-4 py-2 text-left">
                  <code>--stats</code>
                </td>
                <td className="border px-4 py-2 text-left">
                  <code>-s</code>
                </td>
                <td className="border px-4 py-2 text-left">Show statistics about the structure</td>
              </tr>
              <tr className="m-0 border-t p-0 even:bg-muted">
                <td className="border px-4 py-2 text-left">
                  <code>--size</code>
                </td>
                <td className="border px-4 py-2 text-left"></td>
                <td className="border px-4 py-2 text-left">Include file and directory sizes</td>
              </tr>
              <tr className="m-0 border-t p-0 even:bg-muted">
                <td className="border px-4 py-2 text-left">
                  <code>--mod-time</code>
                </td>
                <td className="border px-4 py-2 text-left"></td>
                <td className="border px-4 py-2 text-left">Include file modification times</td>
              </tr>
              <tr className="m-0 border-t p-0 even:bg-muted">
                <td className="border px-4 py-2 text-left">
                  <code>--hash</code>
                </td>
                <td className="border px-4 py-2 text-left"></td>
                <td className="border px-4 py-2 text-left">Include file hashes (MD5)</td>
              </tr>
              <tr className="m-0 border-t p-0 even:bg-muted">
                <td className="border px-4 py-2 text-left">
                  <code>--content</code>
                </td>
                <td className="border px-4 py-2 text-left"></td>
                <td className="border px-4 py-2 text-left">Include file contents (for small text files)</td>
              </tr>
              <tr className="m-0 border-t p-0 even:bg-muted">
                <td className="border px-4 py-2 text-left">
                  <code>--detect-language</code>
                </td>
                <td className="border px-4 py-2 text-left"></td>
                <td className="border px-4 py-2 text-left">Detect programming language of files</td>
              </tr>
              <tr className="m-0 border-t p-0 even:bg-muted">
                <td className="border px-4 py-2 text-left">
                  <code>--markdown</code>
                </td>
                <td className="border px-4 py-2 text-left"></td>
                <td className="border px-4 py-2 text-left">Export as Markdown</td>
              </tr>
              <tr className="m-0 border-t p-0 even:bg-muted">
                <td className="border px-4 py-2 text-left">
                  <code>--diff &lt;directory&gt;</code>
                </td>
                <td className="border px-4 py-2 text-left"></td>
                <td className="border px-4 py-2 text-left">Compare with another directory</td>
              </tr>
              <tr className="m-0 border-t p-0 even:bg-muted">
                <td className="border px-4 py-2 text-left">
                  <code>--watch</code>
                </td>
                <td className="border px-4 py-2 text-left"></td>
                <td className="border px-4 py-2 text-left">Watch for changes</td>
              </tr>
              <tr className="m-0 border-t p-0 even:bg-muted">
                <td className="border px-4 py-2 text-left">
                  <code>--output &lt;file&gt;</code>
                </td>
                <td className="border px-4 py-2 text-left"></td>
                <td className="border px-4 py-2 text-left">Write output to a file</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
