"use client"

import { useState } from "react"

export default function CliUsagePage() {
  const [activeTab, setActiveTab] = useState("basic")

  // Define tab data
  const tabs = [
    { id: "basic", label: "Basic Usage" },
    { id: "output", label: "Output Options" },
    { id: "filtering", label: "Filtering" },
    { id: "features", label: "v2.0 Features" },
    { id: "reference", label: "Reference" }
  ]

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">CLI Usage</h1>
        <p className="mt-2 text-xl text-zinc-600 dark:text-zinc-400">
          How to use ansa-fs as a command-line tool.
        </p>
      </div>

      {/* Introduction */}
      <div className="mb-8 p-6 bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700">
        <p className="text-zinc-700 dark:text-zinc-300">
          After installing ansa-fs globally, you can use the <code className="px-1.5 py-1 bg-zinc-100 dark:bg-zinc-700 rounded text-zinc-800 dark:text-zinc-200 text-sm">ansa-fs</code> command
          in your terminal to extract and visualize file system structures.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-8 border-b border-zinc-200 dark:border-zinc-700">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
          {tabs.map(tab => (
            <li key={tab.id} className="mr-2">
              <button
                onClick={() => setActiveTab(tab.id)}
                className={`inline-block p-4 border-b-2 rounded-t-lg ${
                  activeTab === tab.id
                    ? "text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500"
                    : "border-transparent hover:text-zinc-600 hover:border-zinc-300 dark:hover:text-zinc-300"
                }`}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Basic Usage Content */}
      {activeTab === "basic" && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-3">Scanning the Current Directory</h2>
            <p className="mb-4 text-zinc-600 dark:text-zinc-400">To scan and display the structure of the current directory:</p>
            <div className="bg-zinc-950 text-zinc-200 p-4 rounded-md font-mono text-sm overflow-x-auto">
              ansa-fs
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-3">Scanning a Specific Directory</h2>
            <p className="mb-4 text-zinc-600 dark:text-zinc-400">To scan a specific directory:</p>
            <div className="bg-zinc-950 text-zinc-200 p-4 rounded-md font-mono text-sm overflow-x-auto">
              ansa-fs ./src
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-3">Limiting Depth</h2>
            <p className="mb-4 text-zinc-600 dark:text-zinc-400">To limit the depth of the scan:</p>
            <div className="bg-zinc-950 text-zinc-200 p-4 rounded-md font-mono text-sm overflow-x-auto">
              ansa-fs --depth 2 ./my-project
            </div>
          </div>
        </div>
      )}

      {/* Output Options Content */}
      {activeTab === "output" && (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-3">JSON Output</h2>
            <p className="mb-4 text-zinc-600 dark:text-zinc-400">Output the structure as JSON:</p>
            <div className="bg-zinc-950 text-zinc-200 p-4 rounded-md font-mono text-sm overflow-x-auto">
              ansa-fs --json
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-3">Paths Output</h2>
            <p className="mb-4 text-zinc-600 dark:text-zinc-400">Output the structure as a list of paths:</p>
            <div className="bg-zinc-950 text-zinc-200 p-4 rounded-md font-mono text-sm overflow-x-auto">
              ansa-fs --paths
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-3">Statistics Output</h2>
            <p className="mb-4 text-zinc-600 dark:text-zinc-400">Show statistics about the structure:</p>
            <div className="bg-zinc-950 text-zinc-200 p-4 rounded-md font-mono text-sm overflow-x-auto">
              ansa-fs --stats
            </div>
          </div>
        </div>
      )}

      {/* Filtering Options Content */}
      {activeTab === "filtering" && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-3">Ignoring Directories</h2>
            <p className="mb-4 text-zinc-600 dark:text-zinc-400">To ignore specific directories:</p>
            <div className="bg-zinc-950 text-zinc-200 p-4 rounded-md font-mono text-sm overflow-x-auto">
              ansa-fs --ignore node_modules --ignore .git
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-3">Ignoring File Extensions</h2>
            <p className="mb-4 text-zinc-600 dark:text-zinc-400">To ignore specific file extensions:</p>
            <div className="bg-zinc-950 text-zinc-200 p-4 rounded-md font-mono text-sm overflow-x-auto">
              ansa-fs --ignore-ext log --ignore-ext tmp
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-3">Showing Only Directories</h2>
              <p className="mb-4 text-zinc-600 dark:text-zinc-400">To show only directories (no files):</p>
              <div className="bg-zinc-950 text-zinc-200 p-4 rounded-md font-mono text-sm overflow-x-auto">
                ansa-fs --dirs-only
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-3">Showing Only Files</h2>
              <p className="mb-4 text-zinc-600 dark:text-zinc-400">To show only files (no directories):</p>
              <div className="bg-zinc-950 text-zinc-200 p-4 rounded-md font-mono text-sm overflow-x-auto">
                ansa-fs --files-only
              </div>
            </div>
          </div>
        </div>
      )}

      {/* v2.0 Features Content */}
      {activeTab === "features" && (
        <div className="space-y-8">
          <h2 className="text-2xl font-semibold">New Features in v2.0</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-3">Including File Metadata</h2>
              <p className="mb-4 text-zinc-600 dark:text-zinc-400">To include file sizes, modification times, and hashes:</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded-full">--size</span>
                <span className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded-full">--mod-time</span>
                <span className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded-full">--hash</span>
              </div>
              <div className="bg-zinc-950 text-zinc-200 p-4 rounded-md font-mono text-sm overflow-x-auto">
                ansa-fs --size --mod-time --hash
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-3">Content Analysis</h2>
              <p className="mb-4 text-zinc-600 dark:text-zinc-400">To include file contents and detect programming languages:</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-flex px-2 py-1 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 rounded-full">--content</span>
                <span className="inline-flex px-2 py-1 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 rounded-full">--detect-language</span>
              </div>
              <div className="bg-zinc-950 text-zinc-200 p-4 rounded-md font-mono text-sm overflow-x-auto">
                ansa-fs --content --detect-language
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-3">Directory Comparison</h2>
              <p className="mb-4 text-zinc-600 dark:text-zinc-400">To compare two directories and find differences:</p>
              <div className="bg-zinc-950 text-zinc-200 p-4 rounded-md font-mono text-sm overflow-x-auto">
                ansa-fs --diff ./other-project
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-3">Exporting to Markdown</h2>
              <p className="mb-4 text-zinc-600 dark:text-zinc-400">To export the structure as Markdown documentation:</p>
              <div className="bg-zinc-950 text-zinc-200 p-4 rounded-md font-mono text-sm overflow-x-auto">
                ansa-fs --markdown --output structure.md
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-3">Watch Mode</h2>
              <p className="mb-4 text-zinc-600 dark:text-zinc-400">To watch a directory for changes and update in real-time:</p>
              <div className="bg-zinc-950 text-zinc-200 p-4 rounded-md font-mono text-sm overflow-x-auto">
                ansa-fs --watch
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reference Content */}
      {activeTab === "reference" && (
        <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-6">CLI Options Reference</h2>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-700">
              <thead className="bg-zinc-50 dark:bg-zinc-800">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Option</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Alias</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Description</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-zinc-800 divide-y divide-zinc-200 dark:divide-zinc-700">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">--help</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">-h</td>
                  <td className="px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">Show help message</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">--depth &lt;n&gt;</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">-d</td>
                  <td className="px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">Maximum depth to traverse (default: unlimited)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">--files-only</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">-f</td>
                  <td className="px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">Show only files (no directories)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">--dirs-only</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">-D</td>
                  <td className="px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">Show only directories (no files)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">--ignore &lt;path&gt;</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">-i</td>
                  <td className="px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">Ignore specific paths (can be used multiple times)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">--ignore-ext &lt;ext&gt;</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">-e</td>
                  <td className="px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">Ignore specific file extensions (can be used multiple times)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">--json</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">-j</td>
                  <td className="px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">Output as JSON instead of tree</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">--paths</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">-p</td>
                  <td className="px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">Output as a list of paths</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">--stats</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">-s</td>
                  <td className="px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">Show statistics about the structure</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">--size</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono"></td>
                  <td className="px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">Include file and directory sizes</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">--mod-time</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono"></td>
                  <td className="px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">Include file modification times</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">--hash</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono"></td>
                  <td className="px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">Include file hashes (MD5)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">--content</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono"></td>
                  <td className="px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">Include file contents (for small text files)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">--detect-language</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono"></td>
                  <td className="px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">Detect programming language of files</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">--markdown</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono"></td>
                  <td className="px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">Export as Markdown</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">--diff &lt;directory&gt;</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono"></td>
                  <td className="px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">Compare with another directory</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">--watch</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono"></td>
                  <td className="px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">Watch for changes</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">--output &lt;file&gt;</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono"></td>
                  <td className="px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">Write output to a file</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}