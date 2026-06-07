"use client";

interface DeleteButtonProps {
  label: string;
}

export function DeleteButton({ label }: DeleteButtonProps) {
  return (
    <button
      type="submit"
      className="text-xs text-destructive hover:underline"
      onClick={(e) => {
        if (!confirm(`Delete "${label}"?`)) e.preventDefault();
      }}
    >
      Delete
    </button>
  );
}
