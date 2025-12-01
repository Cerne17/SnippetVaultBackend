import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markup'; // HTML
import 'prismjs/themes/prism-dark.css';

interface CodeEditorProps {
  value: string;
  onValueChange: (code: string) => void;
  language: string;
  placeholder?: string;
  className?: string;
}

export default function CodeEditor({ value, onValueChange, language, placeholder, className }: CodeEditorProps) {
  const highlightCode = (code: string) => {
    const lang = language.toLowerCase();
    // Map common languages to prismjs
    let prismLang = languages.javascript;
    if (lang === 'typescript') prismLang = languages.typescript;
    if (lang === 'python') prismLang = languages.python;
    if (lang === 'java') prismLang = languages.java;
    if (lang === 'csharp') prismLang = languages.csharp;
    if (lang === 'go') prismLang = languages.go;
    if (lang === 'rust') prismLang = languages.rust;
    if (lang === 'sql') prismLang = languages.sql;
    if (lang === 'css') prismLang = languages.css;
    if (lang === 'html') prismLang = languages.markup;

    return highlight(code, prismLang || languages.javascript, lang);
  };

  return (
    <div className={`border border-slate-300 rounded-lg overflow-hidden bg-[#1e1e1e] ${className}`}>
      <Editor
        value={value}
        onValueChange={onValueChange}
        highlight={highlightCode}
        padding={16}
        placeholder={placeholder}
        className="font-mono text-sm min-h-[300px] text-white"
        textareaClassName="focus:outline-none"
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 14,
        }}
      />
    </div>
  );
}
