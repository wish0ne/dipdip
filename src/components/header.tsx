import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <header className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm px-4 py-3">
      <Link href="/">
        <Image src="/logo.png" alt="DipDip" width={100} height={40} priority />
      </Link>
    </header>
  );
}
