import { useRef, useState } from "react";
import {
  FaBold,
  FaCode,
  FaEye,
  FaHeading,
  FaItalic,
  FaLink,
  FaListOl,
  FaListUl,
  FaMinus,
  FaPen,
  FaQuoteLeft,
} from "react-icons/fa6";
import MarkdownContent from "../blog/MarkdownContent";

const BlogBodyEditor = ({ value = "", onChange, disabled = false }) => {
  const textareaRef = useRef(null);
  const [showPreview, setShowPreview] = useState(false);

  const replaceRange = (start, end, replacement, selectionStart, selectionEnd) => {
    const nextValue = value.slice(0, start) + replacement + value.slice(end);
    onChange(nextValue);

    requestAnimationFrame(() => {
      const textarea = textareaRef.current;
      if (!textarea) return;
      textarea.focus();
      textarea.setSelectionRange(selectionStart, selectionEnd);
    });
  };

  const wrapSelection = (before, after, placeholder) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = value.slice(start, end) || placeholder;
    const replacement = before + selected + after;

    replaceRange(
      start,
      end,
      replacement,
      start + before.length,
      start + before.length + selected.length,
    );
  };

  const prefixLines = (prefix, placeholder) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    if (start === end) {
      const lineStart = value.lastIndexOf("\n", Math.max(0, start - 1)) + 1;
      const insertion = `${prefix}${placeholder}\n`;
      replaceRange(
        lineStart,
        lineStart,
        insertion,
        lineStart + prefix.length,
        lineStart + prefix.length + placeholder.length,
      );
      return;
    }

    const selected = value.slice(start, end);
    const replacement = selected
      .split("\n")
      .map((line) => (line ? prefix + line : line))
      .join("\n");

    replaceRange(start, end, replacement, start, start + replacement.length);
  };

  const insertLink = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const label = value.slice(start, end) || "link text";
    const replacement = `[${label}](https://example.com)`;
    const urlStart = start + label.length + 3;

    replaceRange(
      start,
      end,
      replacement,
      start + 1,
      start + 1 + label.length,
    );

    requestAnimationFrame(() => {
      const current = textareaRef.current;
      if (!current) return;
      current.focus();
      current.setSelectionRange(urlStart, urlStart + "https://example.com".length);
    });
  };

  const insertCodeBlock = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = value.slice(start, end) || "your code here";
    const replacement = `\n```text\n${selected}\n```\n`;

    replaceRange(
      start,
      end,
      replacement,
      start + 9,
      start + 9 + selected.length,
    );
  };

  const toolbar = [
    { label: "H2", title: "Section heading", icon: <FaHeading />, action: () => prefixLines("## ", "Section heading") },
    { label: "H3", title: "Subheading", icon: <FaHeading />, action: () => prefixLines("### ", "Subheading") },
    { label: "Bold", title: "Bold text", icon: <FaBold />, action: () => wrapSelection("**", "**", "bold text") },
    { label: "Italic", title: "Italic text", icon: <FaItalic />, action: () => wrapSelection("*", "*", "italic text") },
    { label: "Link", title: "Insert hyperlink", icon: <FaLink />, action: insertLink },
    { label: "Bullets", title: "Bulleted list", icon: <FaListUl />, action: () => prefixLines("- ", "List item") },
    { label: "Numbered", title: "Numbered list", icon: <FaListOl />, action: () => prefixLines("1. ", "List item") },
    { label: "Quote", title: "Quote or highlight", icon: <FaQuoteLeft />, action: () => prefixLines("> ", "Important note") },
    { label: "Code", title: "Code block", icon: <FaCode />, action: insertCodeBlock },
    { label: "Divider", title: "Section divider", icon: <FaMinus />, action: () => wrapSelection("\n---\n", "", "") },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-base-100">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-base-200/65 p-3">
        <div className="flex flex-wrap gap-1.5">
          {toolbar.map((tool) => (
            <button
              key={tool.label}
              type="button"
              title={tool.title}
              aria-label={tool.title}
              onClick={tool.action}
              disabled={disabled || showPreview}
              className="btn btn-xs btn-ghost gap-1.5 border border-white/5"
            >
              {tool.icon}
              <span>{tool.label}</span>
            </button>
          ))}
        </div>

        <div className="join">
          <button
            type="button"
            onClick={() => setShowPreview(false)}
            className={`btn btn-xs join-item ${showPreview ? "btn-ghost" : "btn-primary"}`}
          >
            <FaPen /> Write
          </button>
          <button
            type="button"
            onClick={() => setShowPreview(true)}
            className={`btn btn-xs join-item ${showPreview ? "btn-primary" : "btn-ghost"}`}
          >
            <FaEye /> Preview
          </button>
        </div>
      </div>

      {showPreview ? (
        <div className="min-h-72 p-5 md:p-7">
          {value.trim() ? (
            <MarkdownContent content={value} />
          ) : (
            <p className="text-sm text-base-content/45">Your formatted article preview will appear here.</p>
          )}
        </div>
      ) : (
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={"Start writing your article...\n\n## A section heading\nWrite a paragraph here. Use **bold text**, *italics*, and [helpful links](https://example.com)."}
          className="min-h-80 w-full resize-y border-0 bg-transparent p-5 font-mono text-sm leading-7 outline-none focus:ring-0"
          required
          disabled={disabled}
          spellCheck
        />
      )}

      <details className="border-t border-white/10 bg-base-200/35 px-4 py-3">
        <summary className="cursor-pointer text-xs font-bold text-secondary">
          Formatting guide
        </summary>
        <div className="mt-3 grid gap-2 text-xs text-base-content/65 sm:grid-cols-2">
          <p><code className="text-primary">## Heading</code> — section heading</p>
          <p><code className="text-primary">### Subheading</code> — smaller heading</p>
          <p><code className="text-primary">**bold text**</code> — bold emphasis</p>
          <p><code className="text-primary">*italic text*</code> — italic emphasis</p>
          <p><code className="text-primary">[label](https://...)</code> — hyperlink</p>
          <p><code className="text-primary">- item</code> — bulleted list</p>
          <p><code className="text-primary">&gt; note</code> — highlighted quote</p>
          <p><code className="text-primary">```code```</code> — code block</p>
          <p><code className="text-primary">---</code> — section divider</p>
          <p><code className="text-primary">| Column | Value |</code> — table</p>
        </div>
        <p className="mt-3 text-[11px] leading-relaxed text-base-content/40">
          The article title is the page’s H1. Use H2 and H3 inside the article to keep the heading structure clear.
          Raw HTML is not rendered; links are restricted to safe web, mail, phone, and in-page destinations.
        </p>
      </details>
    </div>
  );
};

export default BlogBodyEditor;
