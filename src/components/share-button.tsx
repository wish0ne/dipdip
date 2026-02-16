"use client";

import { Share2 } from "lucide-react";

interface ShareButtonProps {
  url: string;
  recipeName: string;
  className?: string;
}

export function ShareButton({ url, recipeName, className }: ShareButtonProps) {
  const handleShare = async () => {
    const absoluteUrl = url.startsWith("http")
      ? url
      : `${window.location.origin}${url}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${recipeName} - DipDip`,
          text: `${recipeName} 훠궈 소스 레시피를 확인해보세요!`,
          url: absoluteUrl,
        });
      } catch {
        // User cancelled share
      }
    } else {
      await navigator.clipboard.writeText(absoluteUrl);
      alert("링크가 복사되었습니다!");
    }
  };

  return (
    <button
      onClick={handleShare}
      className={
        className ??
        "bg-white/90 backdrop-blur-sm rounded-lg p-2 hover:bg-white transition-colors"
      }
    >
      <Share2 className="w-4 h-4" />
    </button>
  );
}
