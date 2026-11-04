import { createFileRoute, Link } from "@tanstack/react-router";
import rollOnAsset from "@/assets/pearl-rollon.png.asset.json";

export const Route = createFileRoute("/mechanism")({
  head: () => ({
    meta: [
      { title: "The Mechanism — Pearl" },
      {
        name: "description",
        content:
          "Discover how Pearl's roll-on applicator deposits liquid formula exactly where you want it, in controlled, buildable layers.",
      },
      { property: "og:title", content: "The Mechanism — Pearl" },
      {
        property: "og:description",
        content:
          "The rollerball becomes the control mechanism. Smoother, more even application across blush, bronzer, highlighter and foundation.",
      },
      { property: "og:url", content: "https://pearlmakeup.org/mechanism" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://pearlmakeup.org/mechanism" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Inter:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  component: MechanismPage,
});

const controls = [
  {
    name: "Blush",
    body: "Control the intensity of pigment. Build from a sheer wash to a bold bloom with every pass.",
  },
  {
    name: "Bronzer",
    body: "Control the placement and distribution. Warm the high points exactly where the sun would hit.",
  },
  {
    name: "Highlighter",
    body: "Control exactly where luminosity sits. A pinpoint glow, never a glitter bomb.",
  },
  {
    name: "Foundation",
    body: "Control how much coverage you build. One roll for sheer, three for polished.",
  },
];

function MechanismPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <div className="border-b border-[color:var(--gold)]/15 bg-background/80 backdrop-blur">
        <p className="py-3 text-center text-[10px] uppercase tracking-luxe text-muted-foreground">
          The inaugural drop · Launching this season
        </p>
      </div>

      <header className="sticky top-0 z-30 border-b border-[color:var(--gold)]/10 bg-background/85 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link to="/" className="font-display text-xl tracking-luxe text-gold">
            PEARL
          </Link>
          <div className="hidden gap-10 text-[11px] uppercase tracking-luxe text-muted-foreground md:flex">
            <Link to="/" className="hover:text-gold transition">The Collection</Link>
            <Link to="/" className="hover:text-gold transition">The Advantage</Link>
            <Link to="/mechanism" className="text-gold transition">The Mechanism</Link>
            <Link to="/" className="hover:text-gold transition">The House</Link>
          </div>
          <Link
            to="/"
            hash="waitlist"
            className="border border-[color:var(--gold)]/60 px-4 py-2 text-[10px] uppercase tracking-luxe text-gold transition hover:bg-[color:var(--gold)] hover:text-[color:var(--primary-foreground)]"
          >
            Join Waitlist
          </Link>
        </nav>
      </header>

      <section className="relative overflow-hidden bg-radiance">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-[1fr_1.05fr] md:py-32">
          <div className="space-y-8">
            <p className="text-[11px] uppercase tracking-luxe text-gold">The Mechanism</p>
            <h1 className="font-display text-5xl leading-[1.05] md:text-7xl">
              Control, <span className="italic text-gold">rolled on.</span>
            </h1>
            <p className="max-w-md text-base leading-relaxed text-muted-foreground">
              The rollerball deposits liquid formula exactly where you want it, in controlled, buildable layers for smoother, more even application.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 bg-[color:var(--gold)]/10 blur-3xl" aria-hidden />
            <img
              src={rollOnAsset.url}
              alt="Macro view of a Pearl roll-on liquid makeup applicator — a shimmering rose-pink ceramic dome set into a hand-finished brushed brass vessel"
              className="relative w-full object-cover shadow-[0_30px_80px_-20px_rgb(0_0_0/0.6)]"
            />
          </div>
        </div>
      </section>

      <section className="border-t border-[color:var(--gold)]/10">
        <div className="mx-auto max-w-3xl px-6 py-24 md:py-32">
          <p className="text-center text-[11px] uppercase tracking-luxe text-gold">
            It works across the entire range
          </p>
          <h2 className="mt-6 text-center font-display text-4xl leading-tight md:text-5xl">
            One ball. <span className="italic">Four formulas.</span>
          </h2>

          <ul className="mt-12 divide-y divide-[color:var(--gold)]/15 border-y border-[color:var(--gold)]/15">
            {controls.map((c) => (
              <li key={c.name} className="py-6">
                <span className="font-display text-2xl text-foreground">{c.name}</span>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {c.body}
                </p>
              </li>
            ))}
          </ul>

          <p className="mt-10 text-center font-display text-2xl italic text-gold">
            The rollerball itself becomes the control mechanism.
          </p>
        </div>
      </section>

      <footer className="border-t border-[color:var(--gold)]/15">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row">
          <p className="font-display text-lg tracking-luxe text-gold">PEARL</p>
          <div className="flex flex-col items-center gap-4 md:flex-row md:gap-8">
            <div className="flex items-center gap-6">
              <a
                href="https://www.instagram.com/pearlmakeupcollection/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] uppercase tracking-luxe text-muted-foreground hover:text-gold transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://tiktok.com/@pearlmakeupcollection"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] uppercase tracking-luxe text-muted-foreground hover:text-gold transition-colors"
              >
                TikTok
              </a>
            </div>
            <div className="hidden h-4 w-px bg-[color:var(--gold)]/20 md:block" />
            <div className="flex items-center gap-6">
              <Link
                to="/auth"
                className="text-[10px] uppercase tracking-luxe text-muted-foreground hover:text-gold transition-colors inline-flex items-baseline gap-1"
              >
                Login
                <span className="text-[8px] tracking-[0.2em] text-muted-foreground/60 normal-case">Patented</span>
              </Link>
              <p className="text-[10px] uppercase tracking-luxe text-muted-foreground">
                © {new Date().getFullYear()} Pearl. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
