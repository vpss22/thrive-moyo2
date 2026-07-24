import { useState } from 'react';
import { Phone } from 'lucide-react';

export default function CrisisButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href="tel:+254719288177"
      className="fixed bottom-6 right-6 z-[200] flex items-center gap-3 group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Label */}
      <span
        className={`font-body text-xs font-semibold text-white bg-crisis px-3 py-2 rounded whitespace-nowrap transition-all duration-300 ${
          hovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'
        }`}
        style={{ boxShadow: '0 4px 20px rgba(192,57,43,0.4)' }}
      >
        24/7 Help Line
      </span>

      {/* Button */}
      <div className="relative">
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-crisis/30 animate-pulse-ring" />
        <span
          className="relative flex items-center justify-center w-16 h-16 rounded-full bg-crisis text-white transition-all duration-300 group-hover:scale-110"
          style={{ boxShadow: '0 4px 20px rgba(192,57,43,0.4)' }}
        >
          <Phone className="w-6 h-6" />
        </span>
      </div>
    </a>
  );
}
