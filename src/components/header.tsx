import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm px-4 py-3">
      <Link href="/" className="flex items-center gap-1">
        <h1 className="text-2xl font-extrabold tracking-tight">
          <span className="text-brand-500">Dip</span>
          <span className="text-foreground">Dip</span>
        </h1>
        <span className="text-lg">🍲</span>
      </Link>
    </header>
  );
}
