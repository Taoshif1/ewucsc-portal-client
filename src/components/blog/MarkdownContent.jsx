import { Fragment } from "react";

const headingSlug = (value) =>
  value
    .toLowerCase()
    .replace(/<[^>]*>/g, "")
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .replace(/\s+/g, "-") || "section";

const splitTableRow = (line) =>
  line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());

const isTableDivider = (line) =>
  /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(line);

const isBlockStart = (line, nextLine = "") =>
  /^\s*#{1,6}\s+/.test(line) ||
  /^\s*>s?/.test(line) ||
  /^\s*([-*+]\s+|\d+[.)]\s+)/.test(line) ||
  /^\s*```/.test(line) ||
  /^\s*(---+|___+|\*\*\*+)\s*$/.test(line) ||
  (line.includes("|") && isTableDivider(nextLine));

export const parseMarkdown = (source = "") => {
  const lines = String(source).replace(/\r\n?/g, "\n").split("\n");
  const blocks = [];
  const headingCounts = new Map();
  let index = 0;

  const addHeading = (level, text) => {
    const baseId = headingSlug(text.replace(/\*\*|__|`/g, ""));
    const count = headingCounts.get(baseId) || 0;
    headingCounts.set(baseId, count + 1);
    blocks.push({
      type: "heading",
      level,
      text,
      id: count ? `${baseId}-${count + 1}` : baseId,
    });
  };

  while (index < lines.length) {
    const line = lines[index];
    const trimmed = line.trim();

    if (!trimmed) {
      index += 1;
      continue;
    }

    const fence = trimmed.match(/^```\s*([\w-]*)\s*$/);
    if (fence) {
      const language = fence[1] || "text";
      const codeLines = [];
      index += 1;
      while (index < lines.length && !/^\s*```\s*$/.test(lines[index])) {
        codeLines.push(lines[index]);
        index += 1;
      }
      if (index < lines.length) index += 1;
      blocks.push({ type: "code", language, code: codeLines.join("\n") });
      continue;
    }

    const heading = trimmed.match(/^(#{1,6})\s+(.+?)\s*#*$/);
    if (heading) {
      addHeading(heading[1].length, heading[2]);
      index += 1;
      continue;
    }

    if (/^(---+|___+|\*\*\*+)$/.test(trimmed)) {
      blocks.push({ type: "rule" });
      index += 1;
      continue;
    }

    if (/^>\s?/.test(trimmed)) {
      const quoteLines = [];
      while (index < lines.length && /^\s*>\s?/.test(lines[index])) {
        quoteLines.push(lines[index].replace(/^\s*>\s?/, ""));
        index += 1;
      }

      const marker = quoteLines[0]?.match(/^\[!(NOTE|TIP|WARNING|IMPORTANT|CAUTION)\]\s*(.*)$/i);
      if (marker) {
        blocks.push({
          type: "callout",
          tone: marker[1].toLowerCase(),
          lines: [marker[2], ...quoteLines.slice(1)].filter(Boolean),
        });
      } else {
        blocks.push({ type: "quote", lines: quoteLines });
      }
      continue;
    }

    const unordered = trimmed.match(/^[-*+]\s+(.+)$/);
    const ordered = trimmed.match(/^\d+[.)]\s+(.+)$/);
    if (unordered || ordered) {
      const isOrdered = Boolean(ordered);
      const items = [];

      while (index < lines.length) {
        const current = lines[index].trim();
        const match = isOrdered
          ? current.match(/^\d+[.)]\s+(.+)$/)
          : current.match(/^[-*+]\s+(.+)$/);
        if (!match) break;

        const task = match[1].match(/^\[([ xX])\]\s+(.*)$/);
        items.push(
          task
            ? { text: task[2], task: true, checked: task[1].toLowerCase() === "x" }
            : { text: match[1], task: false, checked: false },
        );
        index += 1;
      }

      blocks.push({ type: "list", ordered: isOrdered, items });
      continue;
    }

    if (line.includes("|") && index + 1 < lines.length && isTableDivider(lines[index + 1])) {
      const headers = splitTableRow(line);
      index += 2;
      const rows = [];

      while (index < lines.length && lines[index].trim().includes("|")) {
        rows.push(splitTableRow(lines[index]));
        index += 1;
      }

      blocks.push({ type: "table", headers, rows });
      continue;
    }

    const paragraphLines = [];
    while (index < lines.length && lines[index].trim()) {
      if (
        paragraphLines.length > 0 &&
        isBlockStart(lines[index].trim(), lines[index + 1] || "")
      ) {
        break;
      }

      if (paragraphLines.length === 0 && isBlockStart(lines[index].trim(), lines[index + 1] || "")) {
        break;
      }

      paragraphLines.push(lines[index].trim());
      index += 1;
    }

    if (paragraphLines.length > 0) {
      blocks.push({ type: "paragraph", text: paragraphLines.join(" ") });
    } else {
      // Keep malformed or unsupported syntax readable as ordinary text.
      blocks.push({ type: "paragraph", text: trimmed });
      index += 1;
    }
  }

  return blocks;
};

const safeHref = (value) => {
  const href = String(value || "").trim();
  if (!href || href.startsWith("//")) return null;
  if (/^(https?:\/\/|mailto:|tel:|\/|#)/i.test(href)) return href;
  return null;
};

const renderInline = (value) => {
  const source = String(value || "");
  const tokenPattern =
    /(\[([^\]]+)\]\(([^)\s]+)\)|\*\*(.+?)\*\*|__(.+?)__|`([^`]+)`|\*(?!\s)(.+?)(?<!\s)\*)/g;
  const output = [];
  let cursor = 0;
  let match;
  let key = 0;

  while ((match = tokenPattern.exec(source)) !== null) {
    if (match.index > cursor) {
      output.push(source.slice(cursor, match.index));
    }

    if (match[2] !== undefined) {
      const href = safeHref(match[3]);
      output.push(
        href ? (
          <a
            key={key++}
            href={href}
            target={/^https?:\/\//i.test(href) ? "_blank" : undefined}
            rel={/^https?:\/\//i.test(href) ? "noreferrer noopener" : undefined}
            className="font-semibold text-primary underline decoration-primary/40 underline-offset-4 transition hover:text-secondary hover:decoration-secondary"
          >
            {match[2]}
          </a>
        ) : (
          <span key={key++}>{match[2]}</span>
        ),
      );
    } else if (match[4] !== undefined || match[5] !== undefined) {
      output.push(
        <strong key={key++} className="font-bold text-base-content">
          {match[4] ?? match[5]}
        </strong>,
      );
    } else if (match[6] !== undefined) {
      output.push(
        <code
          key={key++}
          className="rounded-md border border-primary/15 bg-primary/10 px-1.5 py-0.5 font-mono text-[0.88em] text-primary"
        >
          {match[6]}
        </code>,
      );
    } else {
      output.push(<em key={key++} className="italic text-base-content">{match[7]}</em>);
    }

    cursor = tokenPattern.lastIndex;
  }

  if (cursor < source.length) output.push(source.slice(cursor));
  return output.map((part, index) => <Fragment key={index}>{part}</Fragment>);
};

const toneClasses = {
  note: "border-info/25 bg-info/5",
  tip: "border-success/25 bg-success/5",
  warning: "border-warning/25 bg-warning/5",
  important: "border-primary/25 bg-primary/5",
  caution: "border-error/25 bg-error/5",
};

const MarkdownContent = ({ content = "", className = "" }) => {
  const blocks = parseMarkdown(content);

  if (blocks.length === 0) {
    return <p className="text-base-content/55">This article has no content yet.</p>;
  }

  return (
    <div className={`space-y-6 break-words ${className}`}>
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          const headingClasses = {
            1: "mb-5 mt-12 border-b border-primary/20 pb-4 text-3xl font-black tracking-tight text-base-content md:text-4xl",
            2: "mb-4 mt-11 border-l-4 border-primary pl-4 text-2xl font-extrabold tracking-tight text-base-content md:text-3xl",
            3: "mb-3 mt-8 text-xl font-bold text-base-content md:text-2xl",
            4: "mb-2 mt-6 text-lg font-bold text-base-content",
            5: "mb-2 mt-5 text-base font-bold text-base-content",
            6: "mb-2 mt-4 text-sm font-bold uppercase tracking-wide text-secondary",
          };
          const Tag = `h${block.level}`;
          return (
            <Tag key={block.id || index} id={block.id} className={headingClasses[block.level]}>
              {renderInline(block.text)}
            </Tag>
          );
        }

        if (block.type === "paragraph") {
          return (
            <p key={index} className="text-[1.02rem] leading-[1.95] text-base-content/80 md:text-[1.075rem]">
              {renderInline(block.text)}
            </p>
          );
        }

        if (block.type === "rule") {
          return <hr key={index} className="my-10 border-white/10" />;
        }

        if (block.type === "quote") {
          return (
            <blockquote key={index} className="rounded-r-2xl border-l-4 border-secondary bg-secondary/5 px-5 py-4 text-lg leading-relaxed text-base-content/80">
              {block.lines.map((line, lineIndex) => (
                <p key={lineIndex} className={lineIndex ? "mt-3" : ""}>{renderInline(line)}</p>
              ))}
            </blockquote>
          );
        }

        if (block.type === "callout") {
          return (
            <aside key={index} className={`rounded-2xl border p-5 ${toneClasses[block.tone] || toneClasses.note}`}>
              <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-secondary">
                {block.tone}
              </p>
              <div className="space-y-2 leading-relaxed text-base-content/85">
                {block.lines.map((line, lineIndex) => <p key={lineIndex}>{renderInline(line)}</p>)}
              </div>
            </aside>
          );
        }

        if (block.type === "list") {
          const ListTag = block.ordered ? "ol" : "ul";
          return (
            <ListTag
              key={index}
              className={`space-y-3 pl-6 text-[1.02rem] leading-[1.85] text-base-content/80 md:text-[1.075rem] ${block.ordered ? "list-decimal" : "list-disc"}`}
            >
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex} className={item.task ? "list-none -ml-6" : "pl-2 marker:text-primary"}>
                  {item.task ? (
                    <span className="inline-flex items-start gap-3">
                      <span className={`mt-1 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded border ${item.checked ? "border-success bg-success text-success-content" : "border-base-content/30"}`}>
                        {item.checked ? "✓" : ""}
                      </span>
                      {renderInline(item.text)}
                    </span>
                  ) : renderInline(item.text)}
                </li>
              ))}
            </ListTag>
          );
        }

        if (block.type === "code") {
          return (
            <div key={index} className="overflow-hidden rounded-2xl border border-white/10 bg-[#07111f]">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyan-300/75">{block.language}</span>
                <span className="text-[10px] text-white/30">CODE</span>
              </div>
              <pre className="overflow-x-auto p-5 text-sm leading-7 text-slate-100">
                <code>{block.code}</code>
              </pre>
            </div>
          );
        }

        if (block.type === "table") {
          return (
            <div key={index} className="overflow-x-auto rounded-2xl border border-white/10">
              <table className="w-full min-w-[28rem] border-collapse text-left text-sm">
                <thead className="bg-primary/10 text-base-content">
                  <tr>
                    {block.headers.map((header, headerIndex) => (
                      <th key={headerIndex} className="border-b border-white/10 px-4 py-3 font-bold">
                        {renderInline(header)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row, rowIndex) => (
                    <tr key={rowIndex} className="odd:bg-base-200/25">
                      {block.headers.map((_, cellIndex) => (
                        <td key={cellIndex} className="border-b border-white/5 px-4 py-3 text-base-content/75">
                          {renderInline(row[cellIndex] || "")}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
};

export default MarkdownContent;
