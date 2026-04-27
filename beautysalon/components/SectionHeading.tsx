interface SectionHeadingProps {
  en: string;
  ja: string;
  light?: boolean;
}

export default function SectionHeading({ en, ja, light }: SectionHeadingProps) {
  return (
    <div className="text-center mb-16">
      <p
        className="text-gold text-xs tracking-[0.4em] uppercase mb-4"
      >
        {en}
      </p>
      <h2
        className={`text-3xl md:text-4xl font-light tracking-[0.1em] ${light ? "text-obsidian" : "text-cream"}`}
        style={{ fontFamily: "var(--font-serif)" }}
      >
        {ja}
      </h2>
      <div className="flex items-center justify-center gap-4 mt-5">
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold" />
        <div className="w-1 h-1 rounded-full bg-gold" />
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold" />
      </div>
    </div>
  );
}
