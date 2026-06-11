"use client";

import { useState } from "react";

interface SocialShareProps {
  title: string;
  slug: string;
  variant?: "horizontal" | "vertical";
}

function getUrl(slug: string) {
  if (typeof window === "undefined") return `/blog/${slug}`;
  return `${window.location.origin}/blog/${slug}`;
}

// ── Icons ──────────────────────────────────────────────────────────────────────

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function PinterestIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.735-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

// ── Shared button ─────────────────────────────────────────────────────────────

interface ShareButtonProps {
  label: string;
  onClick: () => void;
  className: string;
  icon: React.ReactNode;
  showLabel?: boolean;
}

function ShareButton({ label, onClick, className, icon, showLabel }: ShareButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={[
        "flex items-center justify-center gap-2 rounded-full transition-colors",
        showLabel ? "px-4 py-2 text-sm font-medium" : "h-10 w-10",
        className,
      ].join(" ")}
    >
      {icon}
      {showLabel && <span>{label}</span>}
    </button>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export function SocialShare({ title, slug, variant = "horizontal" }: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  function shareWhatsApp() {
    const url = encodeURIComponent(getUrl(slug));
    const text = encodeURIComponent(`${title} — `);
    window.open(`https://wa.me/?text=${text}${url}`, "_blank", "noopener");
  }

  function shareFacebook() {
    const url = encodeURIComponent(getUrl(slug));
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank", "noopener");
  }

  function sharePinterest() {
    const url = encodeURIComponent(getUrl(slug));
    const desc = encodeURIComponent(title);
    window.open(
      `https://pinterest.com/pin/create/button/?url=${url}&description=${desc}`,
      "_blank",
      "noopener"
    );
  }

  function shareX() {
    const url = encodeURIComponent(getUrl(slug));
    const text = encodeURIComponent(title);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank", "noopener");
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(getUrl(slug));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* Clipboard API unavailable */
    }
  }

  if (variant === "vertical") {
    return (
      <div className="rounded-2xl border border-border bg-card p-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Share
        </p>
        <div className="flex flex-col gap-2">
          <ShareButton label="WhatsApp" onClick={shareWhatsApp} icon={<WhatsAppIcon />} className="bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20" />
          <ShareButton label="Facebook" onClick={shareFacebook} icon={<FacebookIcon />} className="bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2]/20" />
          <ShareButton label="Pinterest" onClick={sharePinterest} icon={<PinterestIcon />} className="bg-[#E60023]/10 text-[#E60023] hover:bg-[#E60023]/20" />
          <ShareButton label="X / Twitter" onClick={shareX} icon={<XIcon />} className="bg-foreground/5 text-foreground hover:bg-foreground/10" />
          <ShareButton label={copied ? "Copied!" : "Copy link"} onClick={copyLink} icon={copied ? <CheckIcon /> : <CopyIcon />} className="bg-secondary text-foreground hover:bg-secondary/80" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-sm font-medium text-muted-foreground">Share:</span>
      <ShareButton label="WhatsApp" onClick={shareWhatsApp} icon={<WhatsAppIcon />} className="bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20" />
      <ShareButton label="Facebook" onClick={shareFacebook} icon={<FacebookIcon />} className="bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2]/20" />
      <ShareButton label="Pinterest" onClick={sharePinterest} icon={<PinterestIcon />} className="bg-[#E60023]/10 text-[#E60023] hover:bg-[#E60023]/20" />
      <ShareButton label="X / Twitter" onClick={shareX} icon={<XIcon />} className="bg-foreground/5 text-foreground hover:bg-foreground/10" />
      <ShareButton label={copied ? "Copied!" : "Copy link"} onClick={copyLink} icon={copied ? <CheckIcon /> : <CopyIcon />} className="bg-secondary text-foreground hover:bg-secondary/80" />
    </div>
  );
}
