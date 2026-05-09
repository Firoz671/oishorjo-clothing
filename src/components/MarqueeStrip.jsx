const MarqueeStrip = () => {
  const items = [
    "Heritage Drop Vol. 1",
    "•",
    "Monsoon Essentials",
    "•",
    "Archive '71",
    "•",
    "Earth Tones",
    "•",
    "Street Canvas",
    "•",
  ];

  // Repeat items to ensure smooth infinite scroll
  const duplicatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className="bg-brand-gold py-3 overflow-hidden relative flex whitespace-nowrap shadow-lg z-10 border-b-2 border-brand-black">
      <div className="animate-marquee flex items-center min-w-max">
        {duplicatedItems.map((item, index) => (
          <span 
            key={index} 
            className={`mx-6 text-sm ${item === '•' ? 'text-brand-black/40 font-sans text-[10px]' : 'font-mono font-bold text-brand-black uppercase tracking-[0.2em]'}`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MarqueeStrip;
