import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "./utils";
import { Home, FlaskConical, BarChart3, User } from "lucide-react";
import { useTheme } from "./lib/ThemeContext";

const navItems = [
  { name: "Home", icon: Home, page: "Home" },
  { name: "Blend", icon: FlaskConical, page: "Blend" },
  { name: "Insights", icon: BarChart3, page: "Insights" },
  { name: "Profile", icon: User, page: "Profile" },
];

export default function Layout({ children, currentPageName }) {
  const { darkMode } = useTheme();
  return (
    <div className={`min-h-screen text-white flex flex-col transition-colors duration-300 ${darkMode ? "bg-[#0A0A0A]" : "bg-[#F5F5F0] light-mode"}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;0,6..96,600;0,6..96,700;1,6..96,400&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500&display=swap');

        :root {
          --gold: #D4AF37;
          --gold-light: #FCF6BA;
          --gold-dark: #AA771C;
          --silver: #C0C0C0;
          --silver-light: #E8E8E8;
          --silver-dark: #8C8C8C;
          --bg-deep: #0A0A0A;
          --bg-card: rgba(23, 23, 23, 0.6);
        }

        .font-serif-luxury {
          font-family: 'Bodoni Moda', serif;
        }
        .font-body {
          font-family: 'Inter', sans-serif;
        }
        .font-mono-data {
          font-family: 'JetBrains Mono', monospace;
        }
        .gold-text {
          background: linear-gradient(to right, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .gold-glow {
          box-shadow: 0 0 20px rgba(212, 175, 55, 0.15), 0 0 40px rgba(212, 175, 55, 0.05);
        }
        .gold-glow-strong {
          box-shadow: 0 0 20px rgba(212, 175, 55, 0.3), 0 0 60px rgba(212, 175, 55, 0.1);
        }
        .glass-card {
          background: rgba(23, 23, 23, 0.6);
          backdrop-filter: blur(20px);
          border: 0.5px solid rgba(212, 175, 55, 0.2);
        }
        .glass-card-strong {
          background: rgba(23, 23, 23, 0.7);
          backdrop-filter: blur(24px);
          border: 1px solid rgba(212, 175, 55, 0.3);
        }
        .silver-text {
          background: linear-gradient(to right, #8C8C8C, #E8E8E8, #C0C0C0, #E8E8E8, #8C8C8C);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .silver-glow {
          box-shadow: 0 0 15px rgba(192, 192, 192, 0.2), 0 0 30px rgba(192, 192, 192, 0.1);
        }

        /* Hide scrollbar */
        ::-webkit-scrollbar { display: none; }
        * { -ms-overflow-style: none; scrollbar-width: none; }

        /* ── Light mode overrides ── */

        /* Card backgrounds */
        .light-mode .glass-card {
          background: rgba(255, 255, 255, 0.9) !important;
          border: 0.5px solid rgba(180, 150, 40, 0.2) !important;
          backdrop-filter: blur(20px);
        }
        .light-mode .glass-card-strong {
          background: rgba(255, 255, 255, 0.94) !important;
          border: 1px solid rgba(180, 150, 40, 0.25) !important;
          backdrop-filter: blur(24px);
        }

        /* Primary text — scoped ONLY inside glass cards to avoid overriding text on image/dark-overlay cards */
        .light-mode .glass-card .text-white,
        .light-mode .glass-card-strong .text-white {
          color: #1a1a1a !important;
        }

        /* Section headings & labels that live outside glass-card at page level */
        .light-mode .font-serif-luxury.text-white  { color: #1a1a1a !important; }
        .light-mode p.text-neutral-500             { color: #888 !important; }
        .light-mode p.text-neutral-400             { color: #666 !important; }

        /* Secondary / muted text inside glass cards */
        .light-mode .glass-card .text-neutral-300,
        .light-mode .glass-card-strong .text-neutral-300  { color: #444 !important; }
        .light-mode .glass-card .text-neutral-400,
        .light-mode .glass-card-strong .text-neutral-400  { color: #666 !important; }
        .light-mode .glass-card .text-neutral-500,
        .light-mode .glass-card-strong .text-neutral-500  { color: #888 !important; }
        .light-mode .glass-card .text-neutral-600,
        .light-mode .glass-card-strong .text-neutral-600  { color: #999 !important; }

        /* silver-text (Read More →, etc.) — make darker on light backgrounds */
        .light-mode .glass-card .silver-text,
        .light-mode .glass-card-strong .silver-text {
          background: linear-gradient(to right, #555, #888, #666, #888, #555) !important;
          -webkit-background-clip: text !important;
          -webkit-text-fill-color: transparent !important;
          background-clip: text !important;
        }

        /* Dark inline backgrounds inside glass cards → light */
        .light-mode .glass-card .bg-neutral-900,
        .light-mode .glass-card-strong .bg-neutral-900  { background-color: #efefef !important; }
        .light-mode .glass-card .bg-neutral-800,
        .light-mode .glass-card-strong .bg-neutral-800  { background-color: #e2e2e2 !important; }
        .light-mode .glass-card .bg-neutral-700,
        .light-mode .glass-card-strong .bg-neutral-700  { background-color: #d4d4d4 !important; }

        /* Looser bg-neutral overrides for elements not inside glass-card */
        .light-mode .bg-neutral-900  { background-color: #f0f0f0 !important; }
        .light-mode .bg-neutral-800  { background-color: #e4e4e4 !important; }

        /* Border neutrals */
        .light-mode .border-neutral-800 { border-color: #d0d0d0 !important; }
        .light-mode .border-neutral-700 { border-color: #c4c4c4 !important; }

        /* Inputs inside light mode */
        .light-mode input[class*="bg-neutral"] {
          background-color: #f0f0f0 !important;
          color: #1a1a1a !important;
          border-color: #c4c4c4 !important;
        }
        .light-mode input::placeholder { color: #aaa !important; }
      `}</style>

      <div className="flex-1 overflow-y-auto pb-24 font-body">
        {children}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <div className="max-w-md mx-auto">
          <div className="mx-4 mb-4 rounded-2xl glass-card-strong px-2 py-3">
            <div className="flex justify-around items-center">
              {navItems.map((item) => {
                const isActive = currentPageName === item.page;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.page}
                    to={createPageUrl(item.page)}
                    className="flex flex-col items-center gap-1 relative"
                  >
                    <div className={`p-2 rounded-xl transition-all duration-300 ${
                      isActive 
                        ? "bg-[#D4AF37]/15" 
                        : "hover:bg-white/5"
                    }`}>
                      <Icon 
                        className={`w-5 h-5 transition-all duration-300 ${
                          isActive ? "text-[#D4AF37]" : "text-neutral-500"
                        }`} 
                        strokeWidth={isActive ? 2 : 1.5}
                      />
                    </div>
                    <span className={`text-[10px] tracking-wider uppercase transition-all duration-300 ${
                      isActive 
                        ? "text-[#D4AF37] font-medium" 
                        : "text-neutral-600"
                    }`}>
                      {item.name}
                    </span>
                    {isActive && (
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#D4AF37]" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}