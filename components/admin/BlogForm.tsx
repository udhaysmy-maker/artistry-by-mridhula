"use client";

import { useActionState, useRef, useState, useCallback } from "react";
import { BlogCoverUploader } from "./BlogCoverUploader";
import type { BlogPost } from "@/lib/blog";
import {
  renderContent,
  estimateReadingTime,
} from "@/lib/blog/renderContent";

// ── Types ──────────────────────────────────────────────────────────────────────

interface BlogFormProps {
  action: (
    prev: { error: string | null },
    formData: FormData,
  ) => Promise<{ error: string | null }>;
  post?: BlogPost;
}

type EditorTab = "write" | "preview" | "split";

// ── Helpers ────────────────────────────────────────────────────────────────────

function toDatetimeLocal(iso: string) {
  return iso ? iso.slice(0, 16) : "";
}

function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

// ── Styles ─────────────────────────────────────────────────────────────────────

const fieldCls =
  "w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20";

const labelCls = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground";

// ── Syntax reference data ──────────────────────────────────────────────────────

const SYNTAX_GROUPS = [
  {
    title: "Headings",
    items: [
      { label: "## Heading 2", code: "## Your heading" },
      { label: "### Heading 3", code: "### Your heading" },
    ],
  },
  {
    title: "Text Formatting",
    items: [
      { label: "**Bold**", code: "**bold text**" },
      { label: "*Italic*", code: "*italic text*" },
      { label: "[Link](url)", code: "[link text](https://example.com)" },
    ],
  },
  {
    title: "Lists",
    items: [
      { label: "• Bullet list", code: "- Item 1\n- Item 2\n- Item 3" },
      { label: "1. Numbered list", code: "1. First\n2. Second\n3. Third" },
    ],
  },
  {
    title: "Blockquote & Rule",
    items: [
      { label: "> Blockquote", code: "> Quote text here" },
      { label: "--- Divider", code: "---" },
    ],
  },
  {
    title: "Images & Tables",
    items: [
      { label: "![alt](url)", code: "![Image caption](https://example.com/img.jpg)" },
      {
        label: "Table",
        code: "| Header 1 | Header 2 | Header 3 |\n| -------- | -------- | -------- |\n| Cell 1   | Cell 2   | Cell 3   |",
      },
    ],
  },
  {
    title: "Special Boxes",
    items: [
      { label: "💡 Quick Tip", code: ":::tip\nYour tip here\n:::" },
      { label: "📌 Important Note", code: ":::note\nImportant information here\n:::" },
      { label: "⚠️ Common Mistake", code: ":::mistake\nCommon mistake to avoid\n:::" },
      { label: "✨ Pro Advice", code: ":::pro\nPro advice here\n:::" },
      { label: "🎯 Key Takeaways", code: ":::takeaways\n- Point 1\n- Point 2\n- Point 3\n:::" },
    ],
  },
  {
    title: "FAQ Block",
    items: [
      {
        label: "FAQ Block",
        code: ":::faq\nQ: Your question here?\nA: Your answer here.\n\nQ: Another question?\nA: Another answer.\n:::",
      },
    ],
  },
];

// ── Toolbar ────────────────────────────────────────────────────────────────────

interface ToolbarProps {
  onInsert: (before: string, after?: string) => void;
  onInsertBlock: (template: string) => void;
  onImageClick: () => void;
  imageUploading: boolean;
}

function Toolbar({ onInsert, onInsertBlock, onImageClick, imageUploading }: ToolbarProps) {
  const sep = <div className="mx-1 h-5 w-px bg-border" />;

  const btn = (
    label: string,
    title: string,
    onClick: () => void,
    extra?: string,
    disabled?: boolean,
  ) => (
    <button
      key={title}
      type="button"
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={`rounded px-2 py-1 text-xs font-medium text-foreground transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50 ${extra ?? ""}`}
    >
      {label}
    </button>
  );

  return (
    <div className="flex flex-wrap items-center gap-0.5 border-b border-border bg-secondary/30 px-2 py-1.5">
      {btn("H2", "Heading 2", () => onInsertBlock("## "))}
      {btn("H3", "Heading 3", () => onInsertBlock("### "))}
      {sep}
      {btn("B", "Bold", () => onInsert("**", "**"), "font-bold")}
      {btn("I", "Italic", () => onInsert("*", "*"), "italic")}
      {btn("🔗", "Link", () => onInsert("[", "](url)"))}
      {sep}
      {btn("• List", "Bullet list", () => onInsertBlock("- Item 1\n- Item 2\n- Item 3"))}
      {btn("1. List", "Numbered list", () => onInsertBlock("1. First\n2. Second\n3. Third"))}
      {sep}
      {btn('" Quote', "Blockquote", () => onInsertBlock("> Quote text here"))}
      {btn("— HR", "Horizontal rule", () => onInsertBlock("---"))}
      {/* Image — triggers real file upload */}
      {btn(
        imageUploading ? "⏳ Uploading…" : "📷 Img",
        imageUploading ? "Uploading image…" : "Upload image from your device",
        onImageClick,
        "",
        imageUploading,
      )}
      {btn("⊞ Table", "Table", () => onInsertBlock("| Col 1 | Col 2 | Col 3 |\n| ----- | ----- | ----- |\n| Cell  | Cell  | Cell  |"))}
      {sep}
      {btn("💡 Tip", "Quick Tip box", () => onInsertBlock(":::tip\nYour tip here\n:::"))}
      {btn("📌 Note", "Important Note box", () => onInsertBlock(":::note\nImportant info here\n:::"))}
      {btn("⚠️ Mistake", "Common Mistake box", () => onInsertBlock(":::mistake\nCommon mistake to avoid\n:::"))}
      {btn("✨ Pro", "Pro Advice box", () => onInsertBlock(":::pro\nPro advice here\n:::"))}
      {btn("🎯 Keys", "Key Takeaways box", () => onInsertBlock(":::takeaways\n- Point 1\n- Point 2\n:::"))}
      {sep}
      {btn(
        "❓ FAQ",
        "FAQ block",
        () => onInsertBlock(":::faq\nQ: Your question?\nA: Your answer.\n\nQ: Another question?\nA: Another answer.\n:::"),
      )}
    </div>
  );
}

// ── Syntax Reference ───────────────────────────────────────────────────────────

function SyntaxReference() {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-border bg-card">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
      >
        Syntax Reference
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div className="border-t border-border px-4 pb-4 pt-3 space-y-4 max-h-80 overflow-y-auto">
          {SYNTAX_GROUPS.map((group) => (
            <div key={group.title}>
              <p className="mb-1.5 text-xs font-semibold text-foreground">{group.title}</p>
              {group.items.map((item) => (
                <div key={item.label} className="mb-1">
                  <p className="text-xs text-muted-foreground font-medium">{item.label}</p>
                  <pre className="mt-0.5 rounded bg-secondary/60 px-2 py-1 text-[10px] text-foreground/70 overflow-x-auto whitespace-pre-wrap">{item.code}</pre>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────

export function BlogForm({ action, post }: BlogFormProps) {
  const [state, formAction, isPending] = useActionState(action, { error: null });

  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [tab, setTab] = useState<EditorTab>("write");
  const [lastUploadedUrl, setLastUploadedUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [imageUploading, setImageUploading] = useState(false);

  const wordCount = content.trim() === "" ? 0 : content.trim().split(/\s+/).filter(Boolean).length;
  const readingTime = estimateReadingTime(content);

  // ── Auto-slug from title ─────────────────────────────────────────────────────
  function handleTitleChange(val: string) {
    setTitle(val);
    if (!post) {
      setSlug(slugify(val));
    }
  }

  // ── Cursor-aware insert ──────────────────────────────────────────────────────
  const insert = useCallback(
    (before: string, after = "") => {
      const el = textareaRef.current;
      if (!el) return;
      const start = el.selectionStart ?? 0;
      const end = el.selectionEnd ?? 0;
      const selected = content.substring(start, end);
      const newVal =
        content.substring(0, start) +
        before +
        selected +
        after +
        content.substring(end);
      setContent(newVal);
      requestAnimationFrame(() => {
        el.selectionStart = start + before.length;
        el.selectionEnd = start + before.length + selected.length;
        el.focus();
      });
    },
    [content],
  );

  // ── Block insert (ensures separation from surrounding text) ─────────────────
  const insertBlock = useCallback(
    (template: string) => {
      const el = textareaRef.current;
      if (!el) return;
      const pos = el.selectionStart ?? content.length;
      const before = content.substring(0, pos);
      const suffix = content.substring(pos);
      const prefix =
        before.length === 0
          ? ""
          : before.endsWith("\n\n")
          ? ""
          : before.endsWith("\n")
          ? "\n"
          : "\n\n";
      const after = suffix.startsWith("\n") ? "" : "\n";
      const newVal = before + prefix + template + after + suffix;
      setContent(newVal);
      requestAnimationFrame(() => {
        el.focus();
        const newPos = before.length + prefix.length + template.length + after.length;
        el.selectionStart = newPos;
        el.selectionEnd = newPos;
      });
    },
    [content],
  );

  // ── Inline image upload ──────────────────────────────────────────────────────
  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageUploading(true);
    setLastUploadedUrl(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/blog-images", { method: "POST", body: fd });
      if (!res.ok) throw new Error(await res.text());
      const json = await res.json() as { originalWebpUrl: string; thumbnailWebpUrl: string };
      const caption = file.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ");
      insertBlock(`![${caption}](${json.originalWebpUrl})`);
      setLastUploadedUrl(json.originalWebpUrl);
    } catch {
      alert("Image upload failed. Please try again.");
    } finally {
      setImageUploading(false);
      if (imageInputRef.current) imageInputRef.current.value = "";
    }
  }

  async function copyLastUrl() {
    if (!lastUploadedUrl) return;
    await navigator.clipboard.writeText(lastUploadedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  // ── Preview content nodes ────────────────────────────────────────────────────
  const previewNodes = content.trim() ? renderContent(content) : null;

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <form action={formAction} className="space-y-0">
      {/* Hidden fields for controlled values */}
      <input type="hidden" name="title" value={title} />
      <input type="hidden" name="slug" value={slug} />
      <input type="hidden" name="excerpt" value={excerpt} />
      {/* content is submitted via the textarea directly (hidden inputs strip newlines) */}
      {/* cover_image submitted via ImageUploader's own hidden input */}

      {/* Hidden file picker for inline image uploads via toolbar */}
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_320px]">

        {/* ── Editor column ──────────────────────────────────────────────── */}
        <div className="flex flex-col rounded-xl border border-border bg-card overflow-hidden">

          {/* Tab bar */}
          <div className="flex items-center justify-between gap-2 border-b border-border px-3 py-2">
            <div className="flex gap-1">
              {(["write", "preview", "split"] as EditorTab[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTab(t)}
                  className={`rounded-md px-3 py-1.5 text-xs font-semibold capitalize transition-colors ${
                    tab === t
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  {t === "write" ? "✏️ Write" : t === "preview" ? "👁 Preview" : "⊟ Split"}
                </button>
              ))}
            </div>
            {/* Stats */}
            <span className="text-xs text-muted-foreground">
              {wordCount} words · {readingTime} min read
            </span>
          </div>

          {/* Toolbar — shown in write / split */}
          {tab !== "preview" && (
            <Toolbar
              onInsert={insert}
              onInsertBlock={insertBlock}
              onImageClick={() => imageInputRef.current?.click()}
              imageUploading={imageUploading}
            />
          )}

          {/* Editor / Preview panes */}
          <div className={`flex min-h-[520px] flex-1 ${tab === "split" ? "divide-x divide-border" : ""}`}>

            {/* Write pane — always in DOM so the textarea submits correctly (hidden inputs lose newlines) */}
            <textarea
              ref={textareaRef}
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={"Write your blog post here...\n\nStart with an introduction paragraph,\nthen use ## for section headings.\n\nUse the toolbar above to insert special elements."}
              spellCheck
              className={`flex-1 resize-none bg-background p-4 font-mono text-xs leading-relaxed text-foreground/90 outline-none placeholder:text-muted-foreground/50 ${
                tab === "preview" ? "hidden" : tab === "split" ? "w-1/2" : "w-full"
              }`}
              style={{ minHeight: "520px" }}
            />

            {/* Preview pane */}
            {tab !== "write" && (
              <div
                className={`flex-1 overflow-y-auto bg-background p-6 ${
                  tab === "split" ? "w-1/2" : "w-full"
                }`}
              >
                {previewNodes ? (
                  <div>
                    {/* Preview header */}
                    {title && (
                      <div className="mb-6 border-b border-border pb-6">
                        <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
                          Bridal Beauty
                        </span>
                        <h1 className="mt-3 font-serif text-2xl font-semibold text-foreground">
                          {title}
                        </h1>
                        {excerpt && (
                          <p className="mt-2 text-sm text-muted-foreground">{excerpt}</p>
                        )}
                      </div>
                    )}
                    {/* Content */}
                    <div className="text-sm">{previewNodes}</div>
                  </div>
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                    Start writing to see the preview
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ── Meta sidebar ───────────────────────────────────────────────── */}
        <div className="space-y-4">

          {/* Title */}
          <div>
            <label htmlFor="bf-title" className={labelCls}>
              Title <span className="text-destructive">*</span>
            </label>
            <input
              id="bf-title"
              type="text"
              required
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className={fieldCls}
              placeholder="10 Bridal Makeup Tips for 2025"
            />
          </div>

          {/* Slug */}
          <div>
            <label htmlFor="bf-slug" className={labelCls}>
              Slug <span className="text-destructive">*</span>
            </label>
            <div className="flex gap-2">
              <input
                id="bf-slug"
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(slugify(e.target.value))}
                className={`${fieldCls} flex-1`}
                placeholder="10-bridal-makeup-tips-2025"
              />
              <button
                type="button"
                onClick={() => setSlug(slugify(title))}
                title="Re-generate slug from title"
                className="rounded-lg border border-border px-2.5 py-2 text-xs text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
              >
                ↺
              </button>
            </div>
            {slug && (
              <p className="mt-1 truncate text-[10px] text-muted-foreground">
                /blog/{slug}
              </p>
            )}
          </div>

          {/* Excerpt */}
          <div>
            <label htmlFor="bf-excerpt" className={labelCls}>
              Excerpt
            </label>
            <textarea
              id="bf-excerpt"
              rows={3}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className={`${fieldCls} resize-none`}
              placeholder="A short summary shown in the blog listing (1–2 sentences)"
            />
          </div>

          {/* Publish Date */}
          <div>
            <label htmlFor="bf-date" className={labelCls}>
              Publish Date
            </label>
            <input
              id="bf-date"
              name="published_at"
              type="datetime-local"
              defaultValue={post ? toDatetimeLocal(post.published_at) : ""}
              className={fieldCls}
            />
          </div>

          {/* Cover Image */}
          <BlogCoverUploader
            defaultOriginalUrl={post?.cover_image}
            defaultThumbnailUrl={post?.cover_thumbnail_url}
          />

          {/* Copy URL toast — shown after inline image upload */}
          {lastUploadedUrl && (
            <div className="flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-3 py-2 text-xs">
              <span className="min-w-0 flex-1 truncate text-muted-foreground">
                Last uploaded: <span className="font-mono text-foreground">{lastUploadedUrl.split("/").pop()}</span>
              </span>
              <button
                type="button"
                onClick={copyLastUrl}
                className="shrink-0 rounded-md bg-primary px-2.5 py-1 text-[10px] font-semibold text-primary-foreground hover:bg-primary/90"
              >
                {copied ? "Copied!" : "Copy URL"}
              </button>
            </div>
          )}

          {/* Syntax Reference */}
          <SyntaxReference />

          {/* Error */}
          {state.error && (
            <p role="alert" className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {state.error}
            </p>
          )}

          {/* Actions */}
          <div className="flex flex-col gap-2 pt-1">
            <button
              type="submit"
              disabled={isPending || !title.trim() || !slug.trim() || !content.trim()}
              className="w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {isPending ? "Saving…" : post ? "Update Post" : "Publish Post"}
            </button>
            <a
              href="/admin/blogs"
              className="w-full rounded-full border border-border py-3 text-center text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              Cancel
            </a>
          </div>

          {/* Category note */}
          <p className="text-[10px] text-muted-foreground/60 text-center leading-relaxed">
            Category defaults to <strong>Bridal Beauty</strong> on all posts.
          </p>
        </div>
      </div>
    </form>
  );
}
