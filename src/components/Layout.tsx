import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Menu, 
  X, 
  Github, 
  Twitter, 
  Linkedin, 
  Instagram, 
} from "lucide-react";
import { navLinks } from "../data";
import { useLocation, Link } from "react-router-dom";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sections = ["home", "services", "about", "skills", "experience", "portfolio", "contact"];
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [location]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const isHomePage = location.pathname === "/";

  return (
    <div className="flex min-h-screen flex-col lg:flex-row bg-brand-bg relative lg:cursor-none">
      {/* Sidebar - Desktop */}
      <motion.aside 
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
        className="fixed left-0 top-0 hidden h-screen w-72 flex-col border-r border-brand-border bg-brand-bg p-10 lg:flex"
      >
        <div className="mb-12">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
            className="mb-8 h-20 w-20 overflow-hidden rounded-full border-2 border-brand-blue/20 p-1"
          >
            <img 
              src="/img/me.png" 
              alt="Ravindra Singh Profile" 
              className="h-full w-full rounded-full object-cover grayscale transition-all duration-500 hover:grayscale-0"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <h1 className="font-display text-2xl font-bold tracking-tighter uppercase">RAVINDRA SINGH</h1>
          <p className="text-xs text-brand-muted uppercase tracking-[0.2em] mt-2 font-semibold">Graphic Designer</p>
        </div>

        <nav className="flex-1">
          <ul className="space-y-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <motion.div
                  whileHover={{ x: 10 }}
                >
                  <Link
                    to={link.href}
                    className={`group flex items-center text-sm font-medium transition-colors ${
                       (isHomePage && activeSection === link.href.split("#")[1]) || (!isHomePage && link.href === "/") ? "text-black" : "text-brand-muted hover:text-black"
                    }`}
                  >
                    <span className={`mr-3 h-px w-4 bg-brand-border transition-all group-hover:w-8 group-hover:bg-black ${
                      (isHomePage && activeSection === link.href.split("#")[1]) || (!isHomePage && link.href === "/") ? "w-8 bg-black" : ""
                    }`} />
                    {link.name}
                  </Link>
                </motion.div>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto pt-10">
          <div className="flex space-x-4">
            {[Twitter, Github, Linkedin, Instagram].map((Icon, i) => (
              <motion.a
                key={i}
                href="#"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="text-brand-muted hover:text-black transition-colors"
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </div>
          <p className="mt-6 text-[10px] text-brand-muted uppercase tracking-widest">© 2026 Ravindra Singh</p>
        </div>
      </motion.aside>

      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-brand-border bg-brand-bg/90 px-6 py-4 backdrop-blur-md lg:hidden text-brand-accent">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 overflow-hidden rounded-full border border-brand-border">
            <img 
              src="/img/me.png" 
              alt="Avatar" 
              className="h-full w-full object-cover grayscale"
              referrerPolicy="no-referrer"
            />
          </div>
          <h1 className="font-display text-xl font-bold tracking-tighter">RAVINDRA SINGH</h1>
        </div>
        <button onClick={toggleMenu} className="text-current">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 flex flex-col bg-brand-bg p-10 lg:hidden"
          >
            <div className="mt-20 flex flex-col space-y-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-3xl font-display font-bold hover:text-brand-muted transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="mt-auto flex space-x-6">
              <Twitter size={24} />
              <Github size={24} />
              <Linkedin size={24} />
              <Instagram size={24} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 lg:ml-72">
        {children}
      </main>
    </div>
  );
}
