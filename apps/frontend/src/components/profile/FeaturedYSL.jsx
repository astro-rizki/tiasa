import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";

const articles = [
  {
    id: 1,
    title: "The Art of Layering Scents",
    description: "Discover how to create your signature fragrance",
    image: "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=400&h=300&fit=crop",
    excerpt: "Master the sophisticated technique of fragrance layering to create a truly unique and personal scent signature that evolves throughout the day.",
    url: "https://www.ysl.com/en-us/beauty-stories"
  },
  {
    id: 2,
    title: "Behind the Bottle: Libre",
    description: "The story behind YSL's iconic fragrance",
    image: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=400&h=300&fit=crop",
    excerpt: "Explore the creative journey and inspiration behind one of YSL's most celebrated fragrances, from conception to the final masterpiece.",
    url: "https://www.ysl.com/en-us/fragrance"
  },
  {
    id: 3,
    title: "Sustainable Beauty",
    description: "Our commitment to the environment",
    image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=300&fit=crop",
    excerpt: "Learn about YSL Beauty's innovative approach to sustainability and our pledge to create luxurious fragrances while protecting our planet.",
    url: "https://www.ysl.com/en-us/sustainability"
  },
  {
    id: 4,
    title: "Perfume Making Process",
    description: "From raw materials to final product",
    image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=400&h=300&fit=crop",
    excerpt: "Take an exclusive behind-the-scenes look at the meticulous artistry and precision that goes into crafting every YSL fragrance.",
    url: "https://www.ysl.com/en-us/craftsmanship"
  }
];

export default function FeaturedYSL() {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleArticleClick = (article) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSelectedArticle(article);
    }, 800);
  };

  return (
    <>
      <motion.div
        className="mx-6 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <h2 className="font-serif-luxury text-xl text-white mb-1">Featured from YSL</h2>
        <p className="text-[10px] uppercase tracking-wider text-neutral-500 mb-4">
          Stories, Inspiration & Luxury
        </p>

        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {articles.map((article, idx) => (
            <motion.button
              key={article.id}
              onClick={() => handleArticleClick(article)}
              className="flex-shrink-0 w-64 glass-card rounded-2xl overflow-hidden hover:border-[#C0C0C0]/50 transition-all"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
            >
              <div className="relative h-40 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              </div>
              <div className="p-4 text-left">
                <h3 className="text-sm font-semibold text-white mb-1 line-clamp-1">
                  {article.title}
                </h3>
                <p className="text-xs text-neutral-400 line-clamp-2 mb-3">
                  {article.description}
                </p>
                <span className="text-[10px] uppercase tracking-wider text-[#C0C0C0] silver-text">
                  Read More →
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Loading Progress */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="w-64">
              <motion.div
                className="h-1 bg-neutral-800 rounded-full overflow-hidden"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-[#E0B23A] to-[#C0C0C0]"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
              </motion.div>
              <p className="text-xs text-neutral-500 text-center mt-3 uppercase tracking-wider">
                Loading content...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Article Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="min-h-screen"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {/* Hero Image */}
              <div className="relative h-80 overflow-hidden">
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />
                
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-all"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Content */}
              <div className="max-w-2xl mx-auto px-6 py-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  <h1 className="font-serif-luxury text-3xl text-white mb-2">
                    {selectedArticle.title}
                  </h1>
                  <p className="text-sm text-neutral-400 mb-6">
                    {selectedArticle.description}
                  </p>

                  <div className="prose prose-invert max-w-none mb-8">
                    <p className="text-neutral-300 leading-relaxed">
                      {selectedArticle.excerpt}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => setSelectedArticle(null)}
                      className="flex-1 py-4 rounded-xl border border-neutral-700 text-neutral-400 text-sm font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-all"
                    >
                      Close
                    </button>
                    <a
                      href={selectedArticle.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-4 rounded-xl bg-gradient-to-r from-[#E0B23A] to-[#C0C0C0] text-black text-sm font-semibold uppercase tracking-wider hover:opacity-90 transition-all flex items-center justify-center gap-2"
                    >
                      Continue to YSL.com
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}