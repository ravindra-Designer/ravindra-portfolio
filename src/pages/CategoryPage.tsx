import { motion, AnimatePresence } from "motion/react";
import { useParams, Link } from "react-router-dom";
import { projects } from "../data";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function CategoryPage() {
  const { slug } = useParams();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const categoryProjects = projects.filter(p => p.slug === slug);
  const categoryName = categoryProjects[0]?.category || "Portfolio Category";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Prevent scroll when lightbox is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  return (
    <div className="min-h-screen bg-brand-bg">
      <section className="py-24 px-6 lg:px-20">
        <div className="mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          >
            <Link to="/#portfolio" className="group mb-8 flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-brand-muted hover:text-black transition-colors">
              <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
              <span>Back to Overview</span>
            </Link>
            <h1 className="font-display text-5xl font-bold tracking-tight mb-4">{categoryName}</h1>
            <p className="text-brand-muted max-w-xl">
              Exploring the boundaries of {categoryName.toLowerCase()} through meticulous craftsmanship and intentional design.
            </p>
          </motion.div>
        </div>

        <div className={slug === 'logo-folio' ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" : "columns-1 md:columns-2 gap-8 space-y-8"}>
          {categoryProjects.length > 0 ? (
            categoryProjects.map((project, idx) => (
              <motion.div
                key={project.image + idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.05, ease: [0.19, 1, 0.22, 1] }}
                className={slug === 'logo-folio' ? "" : "break-inside-avoid mb-8"}
              >
                {project.isMediaOnly ? (
                  <div 
                    onClick={() => setSelectedImage(project.image)}
                    className="bg-white border border-brand-border overflow-hidden group hover:shadow-2xl transition-all duration-700 cursor-pointer"
                  >
                    <img 
                      src={project.image} 
                      alt="Featured Artwork" 
                      className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ) : (
                  <div 
                    onClick={() => setSelectedImage(project.image)}
                    className="group flex flex-col border border-brand-border bg-white transition-all hover:border-brand-blue hover:shadow-2xl duration-500 overflow-hidden cursor-pointer"
                  >
                    <div className="overflow-hidden border-b border-brand-border">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="h-full w-full object-cover transition-all duration-1000 grayscale group-hover:grayscale-0 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="p-8">
                      <h4 className="text-xl font-bold mb-2">{project.title}</h4>
                      <p className="text-brand-muted text-sm mb-6">Designed with precision and purpose to elevate the visual narrative.</p>
                      <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-brand-blue">
                        <span>Explore Project</span>
                        <ArrowRight size={12} />
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-brand-muted italic">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Suggest Other Categories */}
      <section className="py-24 px-6 lg:px-20 border-t border-brand-border bg-[#f9f9f9]">
        <h3 className="font-display text-2xl font-bold tracking-tight mb-12">Other Categories</h3>
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
           {Array.from(new Set(projects.map(p => p.category)))
            .filter(cat => cat !== categoryName)
            .map(cat => {
              const proj = projects.find(p => p.category === cat);
              return (
                <Link 
                  key={cat}
                  to={`/portfolio/${proj?.slug}`}
                  className="px-6 py-4 border border-brand-border bg-white text-xs font-bold uppercase tracking-widest hover:border-brand-blue hover:text-brand-blue transition-all text-center"
                >
                  {cat}
                </Link>
              );
            })
           }
        </div>
      </section>

      {/* Lightbox / Full Screen View */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 lg:p-20 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-8 right-8 z-[110] text-white/50 hover:text-white transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X size={40} strokeWidth={1} />
            </motion.button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative max-h-full max-w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage} 
                alt="Fullscreen view" 
                className="max-h-[90vh] max-w-full object-contain shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
