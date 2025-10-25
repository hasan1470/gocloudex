'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
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
  Quote
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const [mounted, setMounted] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none focus:outline-none min-h-[200px] p-4 text-style',
      },
    },
    immediatelyRender: false, // Explicitly set to false
  });

  // Ensure component is mounted (client-side only)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Update editor content when value changes from parent
  useEffect(() => {
    if (editor && mounted && value !== editor.getHTML()) {
      editor.commands.setContent(value, false);
    }
  }, [value, editor, mounted]);

  if (!mounted) {
    // Render a simple textarea during SSR or initial render
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
    <div className="border border-border rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-3 border-b border-border bg-input">
        {/* Text Style */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-border transition-colors ${
            editor.isActive('bold') ? 'bg-border text-headingLight' : 'text-textLight'
          }`}
        >
          <Bold className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-border transition-colors ${
            editor.isActive('italic') ? 'bg-border text-headingLight' : 'text-textLight'
          }`}
        >
          <Italic className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded hover:bg-border transition-colors ${
            editor.isActive('underline') ? 'bg-border text-headingLight' : 'text-textLight'
          }`}
        >
          <UnderlineIcon className="h-4 w-4" />
        </button>

        <div className="w-px h-6 bg-border mx-1" />

        {/* Headings */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 rounded hover:bg-border transition-colors ${
            editor.isActive('heading', { level: 1 }) ? 'bg-border text-headingLight' : 'text-textLight'
          }`}
        >
          <Heading1 className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded hover:bg-border transition-colors ${
            editor.isActive('heading', { level: 2 }) ? 'bg-border text-headingLight' : 'text-textLight'
          }`}
        >
          <Heading2 className="h-4 w-4" />
        </button>

        <div className="w-px h-6 bg-border mx-1" />

        {/* Lists */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-border transition-colors ${
            editor.isActive('bulletList') ? 'bg-border text-headingLight' : 'text-textLight'
          }`}
        >
          <List className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-border transition-colors ${
            editor.isActive('orderedList') ? 'bg-border text-headingLight' : 'text-textLight'
          }`}
        >
          <ListOrdered className="h-4 w-4" />
        </button>

        <div className="w-px h-6 bg-border mx-1" />

        {/* Text Alignment */}
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={`p-2 rounded hover:bg-border transition-colors ${
            editor.isActive({ textAlign: 'left' }) ? 'bg-border text-headingLight' : 'text-textLight'
          }`}
        >
          <AlignLeft className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={`p-2 rounded hover:bg-border transition-colors ${
            editor.isActive({ textAlign: 'center' }) ? 'bg-border text-headingLight' : 'text-textLight'
          }`}
        >
          <AlignCenter className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={`p-2 rounded hover:bg-border transition-colors ${
            editor.isActive({ textAlign: 'right' }) ? 'bg-border text-headingLight' : 'text-textLight'
          }`}
        >
          <AlignRight className="h-4 w-4" />
        </button>

        <div className="w-px h-6 bg-border mx-1" />

        {/* Blockquote */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded hover:bg-border transition-colors ${
            editor.isActive('blockquote') ? 'bg-border text-headingLight' : 'text-textLight'
          }`}
        >
          <Quote className="h-4 w-4" />
        </button>
      </div>

      {/* Editor Content */}
      <EditorContent 
        editor={editor} 
        className="min-h-[200px] bg-bgLight"
      />

      {/* Placeholder */}
      {!value && placeholder && (
        <div className="absolute top-16 left-4 text-textLight pointer-events-none text-style">
          {placeholder}
        </div>
      )}
    </div>
  );
}