"use client";

import { Download } from "lucide-react";
import { toPng } from "html-to-image";
import type { RefObject } from "react";

interface SaveImageButtonProps {
  targetRef: RefObject<HTMLElement | null>;
  fileName: string;
  className?: string;
}

export function SaveImageButton({
  targetRef,
  fileName,
  className,
}: SaveImageButtonProps) {
  const handleSave = async () => {
    if (!targetRef.current) return;

    try {
      const dataUrl = await toPng(targetRef.current, { pixelRatio: 2 });
      const link = document.createElement("a");
      link.download = `${fileName}.png`;
      link.href = dataUrl;
      link.click();
    } catch {
      alert("이미지 저장에 실패했습니다.");
    }
  };

  return (
    <button
      onClick={handleSave}
      className={
        className ??
        "text-xs text-muted-foreground hover:text-foreground transition-colors"
      }
    >
      <Download className="w-4 h-4" />
    </button>
  );
}
