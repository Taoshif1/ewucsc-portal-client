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
  /^\s*>/.test(line) ||
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

