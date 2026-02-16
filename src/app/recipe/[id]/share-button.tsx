"use client";

import { Share2 } from "lucide-react";

export function ShareButton({ recipeName }: { recipeName: string }) {
  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${recipeName} - DipDip`,
          text: `${recipeName} 훠궈 소스 레시피를 확인해보세요!`,
          url,
        });
      } catch {
        // User cancelled share
      }
    } else {
      await navigator.clipboard.writeText(url);
      alert("링크가 복사되었습니다!");
    }
  };

  return (
    <button
      onClick={handleShare}
      className="bg-white/90 backdrop-blur-sm rounded-lg p-2 hover:bg-white transition-colors"
    >
      <Share2 className="w-4 h-4" />
    </button>
  );
}
