import type { ReactNode } from "react";

export interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
}

export type BoxType = "tip" | "note" | "mistake" | "pro" | "takeaways";

export interface FAQ {
  q: string;
  a: string;
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function extractHeadings(content: string): Heading[] {
  const result: Heading[] = [];
  for (const line of content.split("\n")) {
    if (line.startsWith("## ")) {
      const text = line.slice(3).trim();
      result.push({ id: slugifyHeading(text), text, level: 2 });
    } else if (line.startsWith("### ")) {
      const text = line.slice(4).trim();
      result.push({ id: slugifyHeading(text), text, level: 3 });
    }
  }
  return result;
}

export function estimateReadingTime(content: string): number {
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

export function extractFAQs(content: string): FAQ[] {
  const normalized = content.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const regex = /:::faq\n([\s\S]*?):::/g;
  const faqs: FAQ[] = [];
  let match: RegExpExecArray | null;
  while ((match = regex.exec(normalized)) !== null) {
    faqs.push(...parseFAQLines(match[1].split("\n")));
  }
  return faqs;
}

function parseFAQLines(lines: string[]): FAQ[] {
  const items: FAQ[] = [];
  const filtered = lines.filter((l) => l.trim());
  for (let i = 0; i + 1 < filtered.length; i++) {
    if (filtered[i].startsWith("Q:") && filtered[i + 1].startsWith("A:")) {
      items.push({ q: filtered[i].slice(2).trim(), a: filtered[i + 1].slice(2).trim() });
      i++;
    }
  }
  return items;
}

function parseInline(text: string): ReactNode {
  const nodes: ReactNode[] = [];
  const regex = /\*\*([^*]+)\*\*|\*([^*]+)\*|\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let k = 0;
  let m: RegExpExecArray | null;

  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    if (m[0].startsWith("**")) {
      nodes.push(
        <strong key={k++} className="font-semibold text-foreground">
          {m[1]}
        </strong>
      );
    } else if (m[0].startsWith("*")) {
      nodes.push(<em key={k++}>{m[2]}</em>);
    } else {
      nodes.push(
        <a
          key={k++}
          href={m[4]}
          className="text-primary underline underline-offset-2 hover:text-primary/80"
          target="_blank"
          rel="noopener noreferrer"
        >
          {m[3]}
        </a>
      );
    }
    last = regex.lastIndex;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes.length === 1 && typeof nodes[0] === "string"
    ? nodes[0]
    : nodes;
}

const BOX_CONFIG: Record<
  BoxType,
  { icon: string; label: string; wrapperCls: string; labelCls: string }
> = {
  tip: {
    icon: "💡",
    label: "Quick Tip",
    wrapperCls: "bg-emerald-50 border-emerald-200",
    labelCls: "text-emerald-700",
  },
  note: {
    icon: "📌",
    label: "Important Note",
    wrapperCls: "bg-sky-50 border-sky-200",
    labelCls: "text-sky-700",
  },
  mistake: {
    icon: "⚠️",
    label: "Common Mistake",
    wrapperCls: "bg-rose-50 border-rose-200",
    labelCls: "text-rose-700",
  },
  pro: {
    icon: "✨",
    label: "Pro Advice",
    wrapperCls: "bg-violet-50 border-violet-200",
    labelCls: "text-violet-700",
  },
  takeaways: {
    icon: "🎯",
    label: "Key Takeaways",
    wrapperCls: "bg-amber-50 border-amber-200",
    labelCls: "text-amber-700",
  },
};

type ParseState = "none" | "text" | "ul" | "ol" | "blockquote" | "table" | "box" | "faq";

export function renderContent(rawContent: string): ReactNode[] {
  // Normalize Windows line endings so the parser works regardless of OS
  const content = rawContent.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const lines = content.split("\n");
  const elements: ReactNode[] = [];
  let key = 0;

  let state: ParseState = "none";
  let buf: string[] = [];
  let boxType: BoxType | null = null;

  function commit() {
    if (!buf.length && state !== "box" && state !== "faq") return;

    switch (state) {
      case "text": {
        const text = buf.join(" ").trim();
        if (text) {
          elements.push(
            <p key={key++} className="mt-4 text-base leading-[1.85] text-foreground/80">
              {parseInline(text)}
            </p>
          );
        }
        break;
      }

      case "ul":
        elements.push(
          <ul key={key++} className="mt-4 space-y-2 pl-6 list-disc marker:text-primary">
            {buf.map((item, i) => (
              <li key={i} className="text-base leading-relaxed text-foreground/80">
                {parseInline(item)}
              </li>
            ))}
          </ul>
        );
        break;

      case "ol":
        elements.push(
          <ol key={key++} className="mt-4 space-y-2 pl-6 list-decimal marker:text-primary">
            {buf.map((item, i) => (
              <li key={i} className="text-base leading-relaxed text-foreground/80">
                {parseInline(item)}
              </li>
            ))}
          </ol>
        );
        break;

      case "blockquote":
        elements.push(
          <blockquote
            key={key++}
            className="my-6 border-l-[3px] border-primary/70 bg-secondary/40 py-4 pl-6 pr-4 italic text-foreground/70"
          >
            {parseInline(buf.join(" "))}
          </blockquote>
        );
        break;

      case "table": {
        const rows = buf.filter((l) => !l.match(/^[\s|:-]+$/));
        if (rows.length >= 2) {
          const parseRow = (row: string) =>
            row
              .split("|")
              .filter((_, i, arr) => i > 0 && i < arr.length - 1)
              .map((cell) => cell.trim());
          const headers = parseRow(rows[0]);
          const bodyRows = rows.slice(1);
          elements.push(
            <div key={key++} className="my-6 overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead className="bg-secondary/60">
                  <tr>
                    {headers.map((h, i) => (
                      <th key={i} className="px-4 py-3 text-left font-semibold text-foreground">
                        {parseInline(h)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {bodyRows.map((row, ri) => (
                    <tr key={ri} className="hover:bg-secondary/30 transition-colors">
                      {parseRow(row).map((cell, ci) => (
                        <td key={ci} className="px-4 py-3 text-foreground/80">
                          {parseInline(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        break;
      }

      case "box": {
        if (boxType) {
          const cfg = BOX_CONFIG[boxType];
          const contentLines = buf.filter((l) => l.trim());
          elements.push(
            <div key={key++} className={`my-6 rounded-xl border ${cfg.wrapperCls} p-5`}>
              <p className={`mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider ${cfg.labelCls}`}>
                <span aria-hidden="true">{cfg.icon}</span>
                {cfg.label}
              </p>
              {contentLines.length === 1 ? (
                <p className="text-sm leading-relaxed text-foreground/80">
                  {parseInline(contentLines[0])}
                </p>
              ) : (
                <ul className="space-y-1.5 list-disc pl-4">
                  {contentLines.map((line, i) => (
                    <li key={i} className="text-sm leading-relaxed text-foreground/80">
                      {parseInline(line.replace(/^[-*]\s+/, ""))}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
          boxType = null;
        }
        break;
      }

      case "faq": {
        const faqItems = parseFAQLines(buf);
        if (faqItems.length > 0) {
          elements.push(
            <div key={key++} className="my-8 divide-y divide-border rounded-2xl border border-border bg-card">
              {faqItems.map(({ q, a }, i) => (
                <details key={i} className="group px-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-sm font-medium text-foreground marker:hidden [&::-webkit-details-marker]:hidden">
                    {q}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0 transition-transform duration-300 group-open:rotate-180"><polyline points="6 9 12 15 18 9" /></svg>
                  </summary>
                  <p className="pb-4 text-sm leading-relaxed text-muted-foreground">{a}</p>
                </details>
              ))}
            </div>
          );
        }
        break;
      }
    }

    buf = [];
    state = "none";
  }

  for (const line of lines) {
    // Inside a faq block — accumulate until closing :::
    if (state === "faq") {
      if (line.trim() === ":::") {
        commit();
      } else {
        buf.push(line);
      }
      continue;
    }

    // Inside a box — accumulate until closing :::
    if (state === "box") {
      if (line.trim() === ":::") {
        commit();
      } else {
        buf.push(line);
      }
      continue;
    }

    // FAQ block start
    if (line.trim() === ":::faq") {
      commit();
      state = "faq";
      buf = [];
      continue;
    }

    // Box start
    const boxMatch = line.match(/^:::(tip|note|mistake|pro|takeaways)/);
    if (boxMatch) {
      commit();
      state = "box";
      boxType = boxMatch[1] as BoxType;
      buf = [];
      continue;
    }

    // H2
    if (line.startsWith("## ")) {
      commit();
      const text = line.slice(3).trim();
      elements.push(
        <h2
          key={key++}
          id={slugifyHeading(text)}
          className="mt-12 mb-4 scroll-mt-24 font-serif text-2xl font-semibold text-foreground md:text-3xl"
        >
          {text}
        </h2>
      );
      continue;
    }

    // H3
    if (line.startsWith("### ")) {
      commit();
      const text = line.slice(4).trim();
      elements.push(
        <h3
          key={key++}
          id={slugifyHeading(text)}
          className="mt-8 mb-3 scroll-mt-24 font-serif text-xl font-semibold text-foreground"
        >
          {text}
        </h3>
      );
      continue;
    }

    // H4
    if (line.startsWith("#### ")) {
      commit();
      const text = line.slice(5).trim();
      elements.push(
        <h4 key={key++} className="mt-6 mb-2 font-serif text-lg font-semibold text-foreground">
          {text}
        </h4>
      );
      continue;
    }

    // HR
    if (line.trim() === "---") {
      commit();
      elements.push(<hr key={key++} className="my-10 border-border" />);
      continue;
    }

    // Image
    const imgMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imgMatch) {
      commit();
      const alt = imgMatch[1];
      const src = imgMatch[2];
      // Skip placeholder URLs (e.g. "https://" with no host)
      if (!src || src === "https://" || src === "http://" || !/https?:\/\/.+\..+/.test(src)) continue;
      elements.push(
        <figure key={key++} className="my-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            loading="lazy"
            className="w-full rounded-xl object-cover shadow-sm"
          />
          {alt && (
            <figcaption className="mt-2 text-center text-xs text-muted-foreground italic">
              {alt}
            </figcaption>
          )}
        </figure>
      );
      continue;
    }

    // UL
    if (line.match(/^[-*] /)) {
      if (state !== "ul") commit();
      state = "ul";
      buf.push(line.slice(2).trim());
      continue;
    }

    // OL
    const olMatch = line.match(/^\d+\.\s+(.+)/);
    if (olMatch) {
      if (state !== "ol") commit();
      state = "ol";
      buf.push(olMatch[1]);
      continue;
    }

    // Blockquote
    if (line.startsWith("> ")) {
      if (state !== "blockquote") commit();
      state = "blockquote";
      buf.push(line.slice(2));
      continue;
    }

    // Table
    if (line.startsWith("|")) {
      if (state !== "table") commit();
      state = "table";
      buf.push(line);
      continue;
    }

    // Empty line — flush current state
    if (line.trim() === "") {
      commit();
      continue;
    }

    // Regular text
    if (state !== "text") commit();
    state = "text";
    buf.push(line);
  }

  commit();
  return elements;
}
