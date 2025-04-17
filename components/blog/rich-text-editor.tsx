"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  LinkIcon,
  ImageIcon,
  Code,
  CodeSquare,
  Heading1,
  Heading2,
  Heading3,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Highlighter,
  Quote,
  MessageSquareQuote,
  Undo,
  Redo,
  EyeIcon,
  Pencil,
  Type,
  Minus,
  Plus,
  RotateCcw,
  Settings,
} from "lucide-react"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
  Slider
} from "@/components/ui/slider"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  minHeight?: string
  maxHeight?: string
  className?: string
  fontFamily?: string
  fontSize?: number
  previewFontFamily?: string
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Write your content here...",
  minHeight = "300px",
  maxHeight = "600px",
  className,
  fontFamily = "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  fontSize = 14,
  previewFontFamily = "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
}: RichTextEditorProps) {
  const [content, setContent] = useState(value)
  const [mode, setMode] = useState<"edit" | "preview" | "split">("edit")
  const [history, setHistory] = useState<string[]>([value])
  const [historyIndex, setHistoryIndex] = useState(0)
  const [editorFontSize, setEditorFontSize] = useState(fontSize)
  const [editorFontFamily, setEditorFontFamily] = useState(fontFamily)
  const [previewFontFam, setPreviewFontFam] = useState(previewFontFamily)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  
  // Sync with external value changes
  useEffect(() => {
    if (value !== content) {
      setContent(value)
    }
  }, [value])
  
  // History management
  const addToHistory = (newContent: string) => {
    if (history[historyIndex] === newContent) return
    
    const newHistory = [...history.slice(0, historyIndex + 1), newContent]
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value
    setContent(newContent)
    onChange(newContent)
  }
  
  const handleBlur = () => {
    addToHistory(content)
  }
  
  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1
      setHistoryIndex(newIndex)
      setContent(history[newIndex])
      onChange(history[newIndex])
    }
  }
  
  const redo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1
      setHistoryIndex(newIndex)
      setContent(history[newIndex])
      onChange(history[newIndex])
    }
  }

  const resetAll = () => {
    setEditorFontSize(fontSize)
    setEditorFontFamily(fontFamily)
    setPreviewFontFam(previewFontFamily)
  }

  const insertTag = (openTag: string, closeTag: string) => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = content.substring(start, end)
    const beforeText = content.substring(0, start)
    const afterText = content.substring(end)

    const newContent = beforeText + openTag + selectedText + closeTag + afterText
    setContent(newContent)
    onChange(newContent)
    addToHistory(newContent)

    // Set cursor position after the inserted text
    setTimeout(() => {
      textarea.focus()
      textarea.selectionStart = start + openTag.length + selectedText.length + closeTag.length
      textarea.selectionEnd = start + openTag.length + selectedText.length + closeTag.length
    }, 0)
  }
  
  const insertCodeBlock = (language = 'javascript') => {
    const codeTemplate = `<pre><code class="language-${language}">
// Your code here
</code></pre>`
    
    insertTag('<pre><code class="language-' + language + '">\n', '\n</code></pre>')
  }

  const formatButtons = [
    { icon: <Bold size={16} />, action: () => insertTag("<strong>", "</strong>"), title: "Bold (Ctrl+B)" },
    { icon: <Italic size={16} />, action: () => insertTag("<em>", "</em>"), title: "Italic (Ctrl+I)" },
    { icon: <Underline size={16} />, action: () => insertTag("<u>", "</u>"), title: "Underline (Ctrl+U)" },
    { icon: <Highlighter size={16} />, action: () => insertTag('<mark>', '</mark>'), title: "Highlight" },
  ]
  
  const headingButtons = [
    { icon: <Heading1 size={16} />, action: () => insertTag("<h1>", "</h1>"), title: "Heading 1" },
    { icon: <Heading2 size={16} />, action: () => insertTag("<h2>", "</h2>"), title: "Heading 2" },
    { icon: <Heading3 size={16} />, action: () => insertTag("<h3>", "</h3>"), title: "Heading 3" },
  ]
  
  const alignmentButtons = [
    { icon: <AlignLeft size={16} />, action: () => insertTag('<div style="text-align:left">', '</div>'), title: "Align Left" },
    { icon: <AlignCenter size={16} />, action: () => insertTag('<div style="text-align:center">', '</div>'), title: "Align Center" },
    { icon: <AlignRight size={16} />, action: () => insertTag('<div style="text-align:right">', '</div>'), title: "Align Right" },
  ]
  
  const listButtons = [
    { icon: <List size={16} />, action: () => insertTag("<ul>\n<li>", "</li>\n</ul>"), title: "Bullet List" },
    { icon: <ListOrdered size={16} />, action: () => insertTag("<ol>\n<li>", "</li>\n</ol>"), title: "Numbered List" },
  ]
  
  const insertButtons = [
    { icon: <LinkIcon size={16} />, action: () => insertTag('<a href="#">', "</a>"), title: "Link" },
    { icon: <ImageIcon size={16} />, action: () => insertTag('<img src="#" alt="', '" />'), title: "Image" },
    { icon: <MessageSquareQuote size={16} />, action: () => insertTag('<blockquote>', '</blockquote>'), title: "Blockquote" },
    { icon: <Quote size={16} />, action: () => insertTag('<q>', '</q>'), title: "Quote" },
  ]

  const codeButtons = [
    { icon: <Code size={16} />, action: () => insertTag("<code>", "</code>"), title: "Inline Code" },
    { icon: <CodeSquare size={16} />, action: () => insertCodeBlock(), title: "Code Block" },
  ]
  
  const fontFamilies = [
    { value: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace", label: "Monospace" },
    { value: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif", label: "Sans Serif" },
    { value: "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif", label: "Serif" },
    { value: "'Fira Code', monospace", label: "Fira Code" },
    { value: "'JetBrains Mono', monospace", label: "JetBrains Mono" },
    { value: "'IBM Plex Mono', monospace", label: "IBM Plex Mono" },
    { value: "'Source Code Pro', monospace", label: "Source Code Pro" },
  ]
  
  const previewFonts = [
    { value: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif", label: "Sans Serif" },
    { value: "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif", label: "Serif" },
    { value: "'Inter', sans-serif", label: "Inter" },
    { value: "'Merriweather', serif", label: "Merriweather" },
    { value: "'Lora', serif", label: "Lora" },
    { value: "'Open Sans', sans-serif", label: "Open Sans" },
  ]
  
  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'csharp', label: 'C#' },
    { value: 'php', label: 'PHP' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'go', label: 'Go' },
    { value: 'swift', label: 'Swift' },
    { value: 'rust', label: 'Rust' },
    { value: 'bash', label: 'Bash' },
    { value: 'sql', label: 'SQL' },
    { value: 'plaintext', label: 'Plain Text' },
  ]
  
  const toolbarGroups = [
    { title: "Text", buttons: formatButtons },
    { title: "Headings", buttons: headingButtons },
    { title: "Alignment", buttons: alignmentButtons },
    { title: "Lists", buttons: listButtons },
    { title: "Insert", buttons: insertButtons },
    { title: "Code", buttons: codeButtons },
  ]
  
  // Function to detect and highlight code blocks in preview mode
  const renderContent = () => {
    if (!content) return '';
    
    // This is a simplified approach - in a real implementation, 
    // you would use a proper HTML parser and syntax highlighter library
    return content;
  }

  return (
    <div className={`border rounded-lg shadow-sm overflow-hidden bg-background ${className || ''}`}>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b bg-muted/30">
        <TooltipProvider delayDuration={300}>
          <div className="flex items-center mr-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={undo}
                  disabled={historyIndex <= 0}
                >
                  <Undo size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Undo (Ctrl+Z)</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={redo}
                  disabled={historyIndex >= history.length - 1}
                >
                  <Redo size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Redo (Ctrl+Y)</TooltipContent>
            </Tooltip>
          </div>
          
          <div className="h-6 border-r mx-1" />
          
          {/* Font settings */}
          <div className="flex items-center mr-2">
            <Popover>
              <TooltipTrigger asChild>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Type size={16} />
                  </Button>
                </PopoverTrigger>
              </TooltipTrigger>
              <TooltipContent>Typography Settings</TooltipContent>
              
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2 text-sm">Editor Font</h4>
                    <Select 
                      value={editorFontFamily} 
                      onValueChange={setEditorFontFamily}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select font family" />
                      </SelectTrigger>
                      <SelectContent>
                        {fontFamilies.map((font) => (
                          <SelectItem key={font.label} value={font.value}>
                            {font.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2 text-sm">Preview Font</h4>
                    <Select 
                      value={previewFontFam} 
                      onValueChange={setPreviewFontFam}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select preview font" />
                      </SelectTrigger>
                      <SelectContent>
                        {previewFonts.map((font) => (
                          <SelectItem key={font.label} value={font.value}>
                            {font.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-sm">Font Size</h4>
                      <div className="flex items-center gap-1">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-6 w-6" 
                          onClick={() => setEditorFontSize(Math.max(10, editorFontSize - 1))}
                        >
                          <Minus size={12} />
                        </Button>
                        <span className="w-8 text-center">{editorFontSize}px</span>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-6 w-6" 
                          onClick={() => setEditorFontSize(Math.min(24, editorFontSize + 1))}
                        >
                          <Plus size={12} />
                        </Button>
                      </div>
                    </div>
                    <Slider
                      value={[editorFontSize]}
                      min={10}
                      max={24}
                      step={1}
                      onValueChange={(value) => setEditorFontSize(value[0])}
                      className="w-full"
                    />
                  </div>
                  
                  <div className="flex justify-end pt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center gap-1"
                      onClick={resetAll}
                    >
                      <RotateCcw size={14} /> Reset to defaults
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="h-6 border-r mx-1" />
          
          {toolbarGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="flex items-center">
              {group.buttons.map((button, index) => (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      type="button"
                      onClick={button.action}
                      className="h-8 w-8"
                    >
                      {button.icon}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>{button.title}</TooltipContent>
                </Tooltip>
              ))}
              {groupIndex < toolbarGroups.length - 1 && <div className="h-6 border-r mx-1" />}
            </div>
          ))}
          
          {/* Language selector for code blocks */}
          <div className="ml-auto flex items-center gap-2">
            <Select onValueChange={(lang) => insertCodeBlock(lang)}>
              <SelectTrigger className="h-8 w-40">
                <SelectValue placeholder="Insert code..." />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <div className="h-6 border-r mx-1" />
            
            <Tabs value={mode} onValueChange={(value) => setMode(value as "edit" | "preview" | "split")}>
              <TabsList className="h-8">
                <TabsTrigger value="edit" className="flex items-center gap-1 px-3">
                  <Pencil size={14} /> Edit
                </TabsTrigger>
                <TabsTrigger value="preview" className="flex items-center gap-1 px-3">
                  <EyeIcon size={14} /> Preview
                </TabsTrigger>
                <TabsTrigger value="split" className="px-3">Split</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </TooltipProvider>
      </div>

      {/* Editor/Preview Content */}
      <div className={`${mode === "split" ? "grid grid-cols-2 divide-x" : "block"}`}>
        {(mode === "edit" || mode === "split") && (
          <div className={`relative ${mode === "split" ? "" : ""}`}>
            <Textarea
              ref={textareaRef}
              value={content}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={placeholder}
              className="min-h-[300px] h-full w-full resize-none border-0 rounded-none p-4 focus-visible:ring-0 focus-visible:ring-offset-0"
              style={{ 
                minHeight, 
                maxHeight: mode === "split" ? maxHeight : undefined,
                fontFamily: editorFontFamily,
                fontSize: `${editorFontSize}px`,
                lineHeight: "1.5"
              }}
            />
          </div>
        )}
        
        {(mode === "preview" || mode === "split") && (
          <div 
            ref={contentRef}
            className="prose prose-zinc dark:prose-invert max-w-none overflow-auto p-4"
            style={{ 
              minHeight, 
              maxHeight: mode === "split" ? maxHeight : undefined,
              fontFamily: previewFontFam
            }}
            dangerouslySetInnerHTML={{ __html: renderContent() }}
          />
        )}
      </div>
      
      {/* Status bar */}
      <div className="flex items-center justify-between p-2 text-xs text-muted-foreground border-t bg-muted/30">
        <div className="flex items-center gap-2">
          <span>{content.length} characters</span>
          <div className="h-3 border-r mx-1" />
          <span>{content.split(/\s+/).filter(Boolean).length} words</span>
        </div>
        <div className="flex gap-4">
          <span>HTML Editor</span>
        </div>
      </div>
    </div>
  )
}