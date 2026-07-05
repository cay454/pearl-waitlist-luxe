import { createFileRoute, Link } from "@tanstack/react-router";
import heroAsset from "@/assets/pearl-hero.png.asset.json";
import collectionAsset from "@/assets/pearl-collection.png.asset.json";
import rollOnAsset from "@/assets/pearl-rollon.png.asset.json";
import { WaitlistForm } from "@/components/WaitlistForm";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pearl — The First Roll-On Liquid Makeup" },
      {
        name: "description",
        content:
          "Pearl is luxury, reinvented. The first-ever roll-on liquid blush, highlight, contour and glow. Join the waitlist for the inaugural drop.",
      },
      { property: "og:title", content: "Pearl — The First Roll-On Liquid Makeup" },
      {
        property: "og:description",
        content:
          "Luxury makeup, reinvented. The first-ever roll-on liquid collection. Reserve your place.",
      },
      { property: "og:image", content: heroAsset.url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: heroAsset.url },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Inter:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  component: Landing,
});

const products = [
  { name: "Liquid Blush", note: "A weightless flush" },
  { name: "Liquid Highlight", note: "Lit-from-within glow" },
  { name: "Liquid Contour", note: "Sculpted, never heavy" },
  { name: "Pearl Glow", note: "The signature finish" },
];

const advantages = [
  { title: "Roll-On Precision", body: "A cooling ceramic dome glides pigment exactly where you want it. No brushes. No fingers." },
  { title: "Liquid, Reimagined", body: "A patented suspension keeps the formula even from first roll to last." },
  { title: "Skin-First Formula", body: "Hyaluronic acid, squalane, and pearl extract. Makeup that treats your skin." },
  { title: "Refillable Brass", body: "Solid brushed brass vessels, made to be refilled — never thrown away." },
];

function Landing() {
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
          <a href="#top" className="font-display text-xl tracking-luxe text-gold">
            PEARL
          </a>
          <div className="hidden gap-10 text-[11px] uppercase tracking-luxe text-muted-foreground md:flex">
            <a href="#collection" className="hover:text-gold transition">The Collection</a>
            <a href="#advantage" className="hover:text-gold transition">The Advantage</a>
            <a href="#story" className="hover:text-gold transition">The House</a>
          </div>
          <a
            href="#waitlist"
            className="border border-[color:var(--gold)]/60 px-4 py-2 text-[10px] uppercase tracking-luxe text-gold transition hover:bg-[color:var(--gold)] hover:text-[color:var(--primary-foreground)]"
          >
            Join Waitlist
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section id="top" className="relative overflow-hidden bg-radiance">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-[1.05fr_1fr] md:py-32">
          <div className="space-y-8">
            <p className="text-[11px] uppercase tracking-luxe text-gold">
              Introducing · Pearl
            </p>
            <h1 className="font-display text-5xl leading-[1.05] md:text-7xl">
              The first ever
              <br />
              <span className="italic text-gold">roll-on liquid</span>
              <br />
              makeup.
            </h1>
            <p className="max-w-md text-base leading-relaxed text-muted-foreground">
              Pearl is luxury, reinvented. A cooling ceramic dome. A liquid that
              moves like silk. Blush, highlight, contour and glow — sculpted into a
              single, refillable brass vessel.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <a
                href="#waitlist"
                className="border border-[color:var(--gold)] bg-[color:var(--gold)] px-8 py-4 text-[11px] uppercase tracking-luxe text-[color:var(--primary-foreground)] transition hover:bg-[color:var(--gold-soft)]"
              >
                Reserve Your Place
              </a>
              <a
                href="#collection"
                className="text-[11px] uppercase tracking-luxe text-foreground/80 underline-offset-[6px] hover:underline"
              >
                Discover the Collection
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 bg-[color:var(--gold)]/10 blur-3xl" aria-hidden />
            <img
              src={heroAsset.url}
              alt="Pearl roll-on liquid blush, highlight and contour in brushed brass vessels"
              className="relative w-full object-cover shadow-[0_30px_80px_-20px_rgb(0_0_0/0.6)]"
            />
          </div>
        </div>
      </section>

      {/* Advantage */}
      <section id="advantage" className="border-t border-[color:var(--gold)]/10">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 py-24 md:grid-cols-[1fr_1.1fr] md:py-32">
          <div className="relative">
            <div className="absolute -inset-6 bg-[color:var(--gold)]/10 blur-3xl" aria-hidden />
            <img
              src={rollOnAsset.url}
              alt="Macro view of a Pearl roll-on liquid makeup applicator — a shimmering rose-pink ceramic dome set into a hand-finished brushed brass vessel, lit by warm directional light against a soft shadowed backdrop"
              className="relative h-full w-full object-cover shadow-[0_30px_80px_-20px_rgb(0_0_0/0.6)]"
            />
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-luxe text-gold">The Pearl Advantage</p>
            <h2 className="mt-6 font-display text-4xl md:text-5xl">
              Every detail, considered.
            </h2>
            <div className="mt-8 h-px w-16 bg-[color:var(--gold)]/60" />

            <div className="mt-12 grid gap-10">
              {advantages.map((a, i) => (
                <div key={a.title} className="flex gap-6">
                  <span className="font-display text-2xl text-gold/70">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl">{a.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {a.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Collection */}
      <section id="collection" className="relative border-t border-[color:var(--gold)]/10 bg-radiance">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-24 md:grid-cols-2 md:py-32">
          <div className="relative order-2 md:order-1">
            <div className="absolute -inset-6 bg-[color:var(--gold)]/10 blur-3xl" aria-hidden />
            <img
              src={collectionAsset.url}
              alt="The four Pearl roll-on liquid products lined up on a marble plinth"
              className="relative w-full object-cover shadow-[0_30px_80px_-20px_rgb(0_0_0/0.6)]"
            />
          </div>

          <div className="order-1 md:order-2">
            <p className="text-[11px] uppercase tracking-luxe text-gold">The Inaugural Collection</p>
            <h2 className="mt-6 font-display text-4xl md:text-5xl">
              Four objects.
              <br />
              <span className="italic">One ritual.</span>
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
              A complete face, in four roll-on gestures. Each formula housed in a
              hand-finished brass vessel, designed to live on your vanity.
            </p>

            <ul className="mt-10 divide-y divide-[color:var(--gold)]/15 border-y border-[color:var(--gold)]/15">
              {products.map((p) => (
                <li key={p.name} className="flex items-baseline justify-between py-4">
                  <span className="font-display text-xl">{p.name}</span>
                  <span className="text-xs uppercase tracking-luxe text-muted-foreground">
                    {p.note}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Story */}
      <section id="story" className="border-t border-[color:var(--gold)]/10">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center md:py-32">
          <p className="text-[11px] uppercase tracking-luxe text-gold">The House of Pearl</p>
          <h2 className="mt-6 font-display text-4xl leading-tight md:text-5xl">
            "Makeup should feel like an object you'd keep forever."
          </h2>
          <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
            Pearl began with a refusal: that liquid makeup had to mean plastic wands
            and disposable tubes. We spent two years engineering a cooling ceramic
            roll-on, a refillable brass vessel, and a formula that treats the skin
            it sits on. This is the result.
          </p>
        </div>
      </section>

      {/* Waitlist */}
      <section
        id="waitlist"
        className="relative border-t border-[color:var(--gold)]/15 bg-[color:var(--card)]"
      >
        <div className="mx-auto max-w-2xl px-6 py-24 md:py-32">
          <div className="text-center">
            <p className="text-[11px] uppercase tracking-luxe text-gold">
              The Waitlist
            </p>
            <h2 className="mt-6 font-display text-4xl leading-tight md:text-5xl">
              Be among the first
              <br />
              <span className="italic">to wear Pearl.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
              The inaugural drop is intentionally small. Waitlist members receive
              early access, a founding-member price, and an engraved cap with their
              first order.
            </p>
          </div>

          <div className="mt-12">
            <WaitlistForm />
          </div>
        </div>
      </section>

      <footer className="border-t border-[color:var(--gold)]/15">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-10 md:flex-row">
          <p className="font-display text-lg tracking-luxe text-gold">PEARL</p>
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
      </footer>
    </main>
  );
}
