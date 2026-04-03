import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "./utils";
import { Home, FlaskConical, BarChart3, User } from "lucide-react";

const navItems = [
  { name: "Home", icon: Home, page: "Home" },
  { name: "Blend", icon: FlaskConical, page: "Blend" },
  { name: "Insights", icon: BarChart3, page: "Insights" },
  { name: "Profile", icon: User, page: "Profile" },
];

export default function Layout({ children, currentPageName }) {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col">
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