'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';

import { 
  Bold, 
  Italic, 
  Underline as UnderlineIcon,
  List, 
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Quote,
  Code,
  Eye,
  Link as LinkIcon
} from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

type EditorMode = 'visual' | 'code';

// Custom heading extension that adds inline styles
const CustomHeading = StarterKit.configure({
  heading: {
    levels: [1, 2, 3, 4, 5, 6],
    HTMLAttributes: {
      class: 'rich-text-heading',
    },
  },
});

// Helper function to check if editor is truly empty
const isEditorEmpty = (editor: any): boolean => {
  // Get text content and check if it's empty
  const textContent = editor.getText().trim();
  if (textContent !== '') return false;
  
  // Check if there are any elements with content
  const html = editor.getHTML();
  const isEmpty = html === '<p></p>' || 
                  html === '<p><br></p>' || 
                  html === '<p>&nbsp;</p>' || 
                  html === '' ||
                  html === '<p></p><p></p>' ||
                  html === '<p><br></p><p><br></p>';
  
  return isEmpty;
};

// Helper function to check if value is empty
const isValueEmpty = (value: string): boolean => {
  if (!value || value.trim() === '') return true;
  
  const trimmedValue = value.trim();
  return trimmedValue === '<p></p>' || 
         trimmedValue === '<p><br></p>' || 
         trimmedValue === '<p>&nbsp;</p>' ||
         trimmedValue === '<p></p><p></p>' ||
         trimmedValue === '<p><br></p><p><br></p>';
};

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<EditorMode>('visual');
  const [codeValue, setCodeValue] = useState(value);
  const [linkUrl, setLinkUrl] = useState('');
  const [showLinkInput, setShowLinkInput] = useState(false);
  const linkButtonRef = useRef<HTMLButtonElement>(null);

  const editor = useEditor({
    extensions: [
      CustomHeading,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary hover:text-hoverLinkLight font-medium',
        },
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      
      // Check if content is empty
      if (isEditorEmpty(editor)) {
        onChange('');
        setCodeValue('');
      } else {
        // Process HTML to add inline styles to headings
        const processedHtml = processHtmlWithHeadingStyles(html);
        onChange(processedHtml);
        setCodeValue(processedHtml);
      }
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none focus:outline-none min-h-[200px] p-4 text-style',
      },
    },
    immediatelyRender: false,
  });

  // Ensure component is mounted (client-side only)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Update editor content when value changes from parent
  useEffect(() => {
    if (editor && mounted) {
      // Check if the value is effectively empty
      if (isValueEmpty(value)) {
        if (editor.getHTML() !== '') {
          editor.commands.clearContent();
          setCodeValue('');
        }
      } else if (value !== editor.getHTML()) {
        const processedValue = processHtmlWithHeadingStyles(value);
        editor.commands.setContent(processedValue, false);
        setCodeValue(processedValue);
      }
    }
  }, [value, editor, mounted]);

  const processHtmlWithHeadingStyles = (html: string): string => {
    // If html is empty, return empty string
    if (isValueEmpty(html)) {
      return '';
    }

    const fontSizeMap: Record<number, string> = {
      1: '32px',
      2: '28px',
      3: '24px',
      4: '20px',
      5: '18px',
      6: '16px',
    };

    return html.replace(
      /<h([1-6])([^>]*)>(.*?)<\/h\1>/gs,
      (match, level, attributes, content) => {
        const levelNum = parseInt(level, 10);

        // Extract and clean existing style
        const existingStyleMatch = attributes.match(/style="([^"]*)"/);
        let existingStyle = existingStyleMatch ? existingStyleMatch[1] : '';

        // Remove any font-size declarations (px, rem, %, var, etc.)
        existingStyle = existingStyle.replace(/font-size\s*:\s*[^;]+;?/gi, '');

        // Merge with default heading style
        const finalStyle = `${existingStyle.trim()} font-size: ${fontSizeMap[levelNum]}; font-weight:500;`.trim();

        // Remove existing style and class attributes before rebuilding
        let cleanedAttributes = attributes
          .replace(/style="[^"]*"/g, '')
          .replace(/class="[^"]*"/g, '')
          .trim();

        return `<h${level}${cleanedAttributes ? ' ' + cleanedAttributes : ''} style="${finalStyle}">${content}</h${level}>`;
      }
    );
  };

  // Handle code mode changes
  const handleCodeChange = (newCode: string) => {
    // Check if code is effectively empty
    const trimmedCode = newCode.trim();
    const isEmpty = isValueEmpty(newCode);

    if (isEmpty) {
      setCodeValue('');
      onChange('');
      // Update visual editor if it exists
      if (editor && mode === 'code') {
        editor.commands.clearContent();
      }
    } else {
      const processedCode = processHtmlWithHeadingStyles(newCode);
      setCodeValue(processedCode);
      onChange(processedCode);
      
      // Update visual editor if it exists
      if (editor && mode === 'code') {
        editor.commands.setContent(processedCode, false);
      }
    }
  };

  // Switch to visual mode and update editor
  const switchToVisual = () => {
    if (editor) {
      if (isValueEmpty(codeValue)) {
        editor.commands.clearContent();
      } else {
        const processedValue = processHtmlWithHeadingStyles(codeValue);
        editor.commands.setContent(processedValue, false);
      }
    }
    setMode('visual');
  };

  // Switch to code mode
  const switchToCode = () => {
    setMode('code');
  };

  // Handle link insertion
  const setLink = () => {
    if (linkUrl === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor?.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run();
    setShowLinkInput(false);
    setLinkUrl('');
  };

  // Close link input when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showLinkInput && !(event.target as Element).closest('.link-input-container')) {
        setShowLinkInput(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showLinkInput]);

  if (!mounted) {
    return (
      <div className="border border-border rounded-lg">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full min-h-[200px] p-4 bg-bgLight text-textLight focus:outline-none resize-none text-style"
          rows={10}
        />
      </div>
    );
  }

  if (!editor) {
    return (
      <div className="border border-border rounded-lg">
        <div className="min-h-[200px] p-4 bg-bgLight text-textLight text-style">
          Loading editor...
        </div>
      </div>
    );
  }

  return (
    <div className="border border-border rounded-lg overflow-hidden relative">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between p-3 border-b border-border bg-input">
        <div className="flex flex-wrap items-center gap-1">
          {/* Mode Toggle */}
          <div className="flex items-center bg-bgLight rounded-lg p-1 mr-2">
            <button
              type="button"
              onClick={switchToVisual}
              className={`flex items-center space-x-2 px-2 py-1 rounded text-sm transition-colors ${
                mode === 'visual' 
                  ? 'bg-primary text-bgLight' 
                  : 'text-textLight hover:text-headingLight'
              }`}
            >
              <Eye className="h-3 w-3" />
              <span>Visual</span>
            </button>
            <button
              type="button"
              onClick={switchToCode}
              className={`flex items-center space-x-2 px-2 py-1 rounded text-sm transition-colors ${
                mode === 'code' 
                  ? 'bg-primary text-bgLight' 
                  : 'text-textLight hover:text-headingLight'
              }`}
            >
              <Code className="h-3 w-3" />
              <span>Code</span>
            </button>
          </div>

          {mode === 'visual' && (
            <>
              {/* Text Style */}
              <div className="w-px h-6 bg-border mx-1" />
              
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`p-2 rounded hover:bg-border transition-colors ${
                  editor.isActive('bold') ? 'bg-primary text-bgLight' : 'text-textLight hover:text-headingLight'
                }`}
                title="Bold"
              >
                <Bold className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`p-2 rounded hover:bg-border transition-colors ${
                  editor.isActive('italic') ? 'bg-primary text-bgLight' : 'text-textLight hover:text-headingLight'
                }`}
                title="Italic"
              >
                <Italic className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={`p-2 rounded hover:bg-border transition-colors ${
                  editor.isActive('underline') ? 'bg-primary text-bgLight' : 'text-textLight hover:text-headingLight'
                }`}
                title="Underline"
              >
                <UnderlineIcon className="h-4 w-4" />
              </button>

              <div className="w-px h-6 bg-border mx-1" />

              {/* Headings */}
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={`p-2 rounded hover:bg-border transition-colors ${
                  editor.isActive('heading', { level: 1 }) ? 'bg-primary text-bgLight' : 'text-textLight hover:text-headingLight'
                }`}
                title="Heading 1 (32px)"
              >
                <Heading1 className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`p-2 rounded hover:bg-border transition-colors ${
                  editor.isActive('heading', { level: 2 }) ? 'bg-primary text-bgLight' : 'text-textLight hover:text-headingLight'
                }`}
                title="Heading 2 (28px)"
              >
                <Heading2 className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={`p-2 rounded text-sm font-bold hover:bg-border transition-colors ${
                  editor.isActive('heading', { level: 3 }) ? 'bg-primary text-bgLight' : 'text-textLight hover:text-headingLight'
                }`}
                title="Heading 3 (24px)"
              >
                <Heading3 className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                className={`p-2 rounded text-xs font-bold hover:bg-border transition-colors ${
                  editor.isActive('heading', { level: 4 }) ? 'bg-primary text-bgLight' : 'text-textLight hover:text-headingLight'
                }`}
                title="Heading 4 (20px)"
              >
                <Heading4 className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                className={`p-2 rounded text-xs font-bold hover:bg-border transition-colors ${
                  editor.isActive('heading', { level: 5 }) ? 'bg-primary text-bgLight' : 'text-textLight hover:text-headingLight'
                }`}
                title="Heading 5 (18px)"
              >
                <Heading5 className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
                className={`p-2 rounded text-xs font-bold hover:bg-border transition-colors ${
                  editor.isActive('heading', { level: 6 }) ? 'bg-primary text-bgLight' : 'text-textLight hover:text-headingLight'
                }`}
                title="Heading 6 (16px)"
              >
                <Heading6 className="h-4 w-4" />
              </button>

              <div className="w-px h-6 bg-border mx-1" />

              {/* Link */}
              <div className="relative">
                <button
                  ref={linkButtonRef}
                  type="button"
                  onClick={() => setShowLinkInput(!showLinkInput)}
                  className={`p-2 rounded hover:bg-border transition-colors ${
                    editor.isActive('link') ? 'bg-primary text-bgLight' : 'text-textLight hover:text-headingLight'
                  }`}
                  title="Insert Link"
                >
                  <LinkIcon className="h-4 w-4" />
                </button>

                {/* Link Input Modal - Positioned relative to the link button */}
                {showLinkInput && (
                  <div className="absolute top-10 left-0 bg-bgLight border border-border rounded-lg p-4 shadow-lg z-50 link-input-container">
                    <div className="flex flex-col space-y-2">
                      <input
                        type="url"
                        value={linkUrl}
                        onChange={(e) => setLinkUrl(e.target.value)}
                        placeholder="https://example.com"
                        className="px-3 py-2 border border-border rounded text-sm text-style w-64"
                        onKeyPress={(e) => e.key === 'Enter' && setLink()}
                        autoFocus
                      />
                      <div className="flex space-x-2">
                        <button
                          type="button"
                          onClick={setLink}
                          className="flex-1 px-3 py-2 bg-primary text-bgLight rounded text-sm text-style hover:bg-primary-dark"
                        >
                          Apply Link
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowLinkInput(false);
                            setLinkUrl('');
                          }}
                          className="flex-1 px-3 py-2 bg-input text-textLight rounded text-sm text-style hover:bg-border"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="w-px h-6 bg-border mx-1" />

              {/* Lists */}
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`p-2 rounded hover:bg-border transition-colors ${
                  editor.isActive('bulletList') ? 'bg-primary text-bgLight' : 'text-textLight hover:text-headingLight'
                }`}
                title="Bullet List"
              >
                <List className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`p-2 rounded hover:bg-border transition-colors ${
                  editor.isActive('orderedList') ? 'bg-primary text-bgLight' : 'text-textLight hover:text-headingLight'
                }`}
                title="Numbered List"
              >
                <ListOrdered className="h-4 w-4" />
              </button>

              <div className="w-px h-6 bg-border mx-1" />

              {/* Text Alignment */}
              <button
                type="button"
                onClick={() => editor.chain().focus().setTextAlign('left').run()}
                className={`p-2 rounded hover:bg-border transition-colors ${
                  editor.isActive({ textAlign: 'left' }) ? 'bg-primary text-bgLight' : 'text-textLight hover:text-headingLight'
                }`}
                title="Align Left"
              >
                <AlignLeft className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => editor.chain().focus().setTextAlign('center').run()}
                className={`p-2 rounded hover:bg-border transition-colors ${
                  editor.isActive({ textAlign: 'center' }) ? 'bg-primary text-bgLight' : 'text-textLight hover:text-headingLight'
                }`}
                title="Align Center"
              >
                <AlignCenter className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => editor.chain().focus().setTextAlign('right').run()}
                className={`p-2 rounded hover:bg-border transition-colors ${
                  editor.isActive({ textAlign: 'right' }) ? 'bg-primary text-bgLight' : 'text-textLight hover:text-headingLight'
                }`}
                title="Align Right"
              >
                <AlignRight className="h-4 w-4" />
              </button>

              <div className="w-px h-6 bg-border mx-1" />

              {/* Blockquote */}
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={`p-2 rounded hover:bg-border transition-colors ${
                  editor.isActive('blockquote') ? 'bg-primary text-bgLight' : 'text-textLight hover:text-headingLight'
                }`}
                title="Blockquote"
              >
                <Quote className="h-4 w-4" />
              </button>
            </>
          )}
        </div>

      </div>

      {/* Editor Content */}
      {mode === 'visual' ? (
        <div className="relative">
          <EditorContent 
            editor={editor} 
            className="min-h-[200px] bg-bgLight prose prose-sm max-w-none"
          />
          
          {/* Placeholder */}
          {isValueEmpty(value) && placeholder && (
            <div className="absolute top-4 left-4 text-textLight pointer-events-none text-style">
              {placeholder}
            </div>
          )}
        </div>
      ) : (
        <div className="relative">
          <textarea
            value={codeValue}
            onChange={(e) => handleCodeChange(e.target.value)}
            className="w-full min-h-[200px] p-4 bg-bgLight text-textLight focus:outline-none resize-none font-mono text-sm border-0"
            placeholder="Enter HTML content..."
            rows={10}
          />
          
          {/* Placeholder */}
          {isValueEmpty(codeValue) && placeholder && (
            <div className="absolute top-4 left-4 text-textLight pointer-events-none text-style font-mono">
              {placeholder}
            </div>
          )}
        </div>
      )}

      {/* Custom CSS for proper styling */}
      <style jsx global>{`
        .ProseMirror {
          min-height: 200px;
          padding: 1rem;
          outline: none;
        }

        .ProseMirror h1 {
          font-size: 32px !important;
          font-weight: bold;
          color: rgb(var(--color-headingLight)) !important;
          margin: 1rem 0;
          line-height: 1.2;
        }

        .ProseMirror h2 {
          font-size: 28px !important;
          font-weight: bold;
          color: rgb(var(--color-headingLight)) !important;
          margin: 0.875rem 0;
          line-height: 1.3;
        }

        .ProseMirror h3 {
          font-size: 24px !important;
          font-weight: bold;
          color: rgb(var(--color-headingLight)) !important;
          margin: 0.75rem 0;
          line-height: 1.4;
        }

        .ProseMirror h4 {
          font-size: 20px !important;
          font-weight: bold;
          color: rgb(var(--color-headingLight)) !important;
          margin: 0.75rem 0;
          line-height: 1.4;
        }

        .ProseMirror h5 {
          font-size: 18px !important;
          font-weight: bold;
          color: rgb(var(--color-headingLight)) !important;
          margin: 0.75rem 0;
          line-height: 1.4;
        }

        .ProseMirror h6 {
          font-size: 16px !important;
          font-weight: bold;
          color: rgb(var(--color-headingLight)) !important;
          margin: 0.75rem 0;
          line-height: 1.4;
        }

        .ProseMirror p {
          color: rgb(var(--color-textLight));
          margin: 0.5rem 0;
          line-height: 1.6;
        }

        .ProseMirror a {
          color: rgb(var(--color-primary)) !important;
          text-decoration: underline;
        }

        .ProseMirror a:hover {
          color: rgb(var(--color-hoverLinkLight)) !important;
        }

        .ProseMirror strong {
          font-weight: bold;
          color: rgb(var(--color-headingLight));
        }

        .ProseMirror em {
          font-style: italic;
        }

        .ProseMirror u {
          text-decoration: underline;
        }

        .ProseMirror ul, .ProseMirror ol {
          color: rgb(var(--color-textLight));
          margin: 0.5rem 0;
          padding-left: 1.5rem;
        }

        .ProseMirror ul li {
          list-style-type: disc;
          margin: 0.25rem 0;
        }

        .ProseMirror ol li {
          list-style-type: decimal;
          margin: 0.25rem 0;
        }

        .ProseMirror blockquote {
          border-left: 4px solid rgb(var(--color-primary));
          padding-left: 1rem;
          margin: 1rem 0;
          font-style: italic;
          color: rgb(var(--color-textLight));
        }

        .ProseMirror [data-text-align="center"] {
          text-align: center;
        }

        .ProseMirror [data-text-align="right"] {
          text-align: right;
        }

        .ProseMirror:focus {
          outline: none;
        }

        .ProseMirror .is-empty::before {
          content: attr(data-placeholder);
          color: rgb(var(--color-textLight));
          float: left;
          height: 0;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}