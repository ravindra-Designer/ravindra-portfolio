import { motion, useScroll, useSpring } from "motion/react";
import { 
  ArrowRight, 
  ArrowUpRight,
  Mail,
  Phone,
  MapPin
} from "lucide-react";
import { services, projects, skills, experience } from "../data";
import { Link } from "react-router-dom";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 z-[60] h-1 progress-gradient origin-left"
        style={{ scaleX }}
      />

      {/* Hero Section */}
      <section id="home" className="relative flex min-h-screen items-center px-6 lg:px-20 hero-gradient">
        {/* Ambient Blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ 
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-[10%] -left-[10%] w-[40vw] h-[40vw] rounded-full bg-brand-blue/20 blur-[120px]"
          />
          <motion.div 
            animate={{ 
              x: [0, -100, 0],
              y: [0, 80, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute top-[40%] -right-[10%] w-[35vw] h-[35vw] rounded-full bg-brand-magenta/20 blur-[100px]"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
          >
            <h2 className="font-display text-5xl font-bold leading-[1.1] text-white sm:text-7xl lg:text-8xl tracking-tighter">
              <div className="overflow-hidden">
                <motion.span
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
                  className="inline-block"
                >
                  Hello I’m
                </motion.span>
              </div>
              <div className="overflow-hidden">
                <motion.span
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: [0.19, 1, 0.22, 1] }}
                  className="opacity-50 inline-block"
                >
                  Ravindra Singh
                </motion.span>
              </div>
            </h2>
            <p className="mt-8 max-w-xl text-lg text-white/70 leading-relaxed">
              A multidisciplinary designer and developer based in Dehradun, India. I specialize in building digital products that combine aesthetics with functionality.
            </p>
            <div className="mt-10 flex flex-wrap gap-6">
              <motion.a 
                href="#contact" 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center space-x-3 bg-white px-8 py-4 text-sm font-bold text-black transition-all hover:bg-white/90"
              >
                <span>LET'S TALK</span>
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </motion.a>
              <motion.a 
                href="#portfolio" 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-3 border border-white/20 px-8 py-4 text-sm font-bold text-white transition-all hover:border-brand-blue hover:text-brand-blue hover:bg-white/5"
              >
                <span>VIEW WORK</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-6 lg:px-20 border-t border-brand-border">
        <div className="mb-16 overflow-hidden">
          <motion.div
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          >
            <h3 className="font-display text-4xl font-bold tracking-tight">Services</h3>
            <p className="mt-4 text-brand-muted">Design + Create + Refine + Promote</p>
          </motion.div>
        </div>
        
        <div className="grid gap-10 sm:grid-cols-2">
          {services.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.05)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative border border-brand-border p-10 transition-all hover:border-brand-blue bg-white"
            >
              <service.icon className="mb-6 text-brand-muted transition-colors group-hover:text-brand-blue" size={32} />
              <h4 className="mb-4 text-xl font-bold">{service.title}</h4>
              <p className="text-brand-muted leading-relaxed mb-6">{service.desc}</p>
              
              <ul className="space-y-2">
                {service.items.map((item) => (
                  <li key={item} className="flex items-center text-sm text-brand-muted">
                    <span className="mr-2 text-xs opacity-50">––</span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="absolute bottom-10 right-10 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:text-brand-blue translate-y-2 group-hover:translate-y-0">
                <ArrowRight size={20} />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 lg:px-20 border-t border-brand-border bg-[#f9f9f9]">
        <div className="grid gap-16 lg:grid-cols-2 items-center">
          <motion.div
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            whileInView={{ clipPath: "inset(0% 0 0 0)" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
            className="relative aspect-[4/5] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700"
          >
            <img 
              src="/img/me.png" 
              alt="Ravindra Singh Corporate" 
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-brand-bg/20" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="overflow-hidden mb-8">
              <motion.h3 
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                className="font-display text-4xl font-bold tracking-tight"
              >
                About Me
              </motion.h3>
            </div>
            <div className="space-y-6 text-lg text-brand-muted leading-relaxed">
              <p>
                I am a multi-disciplinary designer dedicated to the art of visual storytelling. With over half a decade of experience, I bridge the gap between creative intuition and data-driven design, transforming complex ideas into evocative digital experiences.
              </p>
              <p>
                For me, design is more than just a surface-level layer—it is the soul of communication. My philosophy is anchored in intentionality, where every pixel serves a purpose and every interaction is orchestrated to build a lasting connection.
              </p>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-8 border-t border-brand-border pt-10">
              <div>
                <p className="text-2xl font-bold">5+</p>
                <p className="text-xs text-brand-muted uppercase tracking-widest mt-1">Years Experience</p>
              </div>
              <div>
                <p className="text-2xl font-bold">50+</p>
                <p className="text-xs text-brand-muted uppercase tracking-widest mt-1">Projects Done</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills & Experience Section */}
      <div className="grid lg:grid-cols-2 border-t border-brand-border">
        {/* Skills */}
        <section id="skills" className="py-24 px-6 lg:px-20 border-r border-brand-border">
          <div className="overflow-hidden mb-12">
            <motion.h3 
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
              className="font-display text-4xl font-bold tracking-tight"
            >
              Skills
            </motion.h3>
          </div>
          <div className="space-y-10">
            {skills.map((skill) => (
              <div key={skill.name}>
                <div className="mb-3 flex justify-between text-sm font-bold uppercase tracking-widest">
                  <span>{skill.name}</span>
                  <span className="text-brand-muted">{skill.level}%</span>
                </div>
                <div className="h-1 w-full bg-brand-border">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-black"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="py-24 px-6 lg:px-20">
          <div className="overflow-hidden mb-12">
            <motion.h3 
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
              className="font-display text-4xl font-bold tracking-tight"
            >
              Experience
            </motion.h3>
          </div>
          <div className="space-y-12">
            {experience.map((item, idx) => (
              <motion.div
                key={item.company}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative pl-8 before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-black"
              >
                <div className="mb-1 flex items-center justify-between">
                  <h4 className="text-xl font-bold">{item.role}</h4>
                  <span className="text-xs font-bold text-brand-muted">{item.period}</span>
                </div>
                <p className="mb-4 text-sm font-bold uppercase tracking-widest text-brand-muted">{item.company}</p>
                <p className="text-brand-muted leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 px-6 lg:px-20 border-t border-brand-border">
        <div className="mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            >
              <h3 className="font-display text-4xl font-bold tracking-tight">Portfolio</h3>
              <p className="mt-4 text-brand-muted">A diverse collection of works across specialized categories</p>
            </motion.div>
          </div>
        </div>

        <motion.div 
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {/* Group projects by category and show one card per category on Home */}
          {Array.from(new Set(projects.map(p => p.category))).map((cat) => {
            const project = projects.find(p => p.category === cat)!;
            return (
              <motion.div
                key={cat}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] } }
                }}
                className="group relative flex h-64 flex-col overflow-hidden border border-brand-border bg-white transition-all hover:border-brand-blue"
              >
                <Link to={`/portfolio/${project.slug}`} className="absolute inset-0 z-20" />
                <div className="h-full w-full overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={cat} 
                    className="h-full w-full object-cover transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 z-30 pointer-events-none">
                  <h4 className="text-2xl font-bold text-white mb-2">{cat}</h4>
                  <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-white/70">
                    <span>Explore Category</span>
                    <ArrowRight size={12} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 lg:px-20 border-t border-brand-border bg-[#f9f9f9]">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <div className="overflow-hidden mb-8">
              <motion.h3 
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                className="font-display text-4xl font-bold tracking-tight"
              >
                Get In Touch
              </motion.h3>
            </div>
            <p className="text-lg text-brand-muted leading-relaxed mb-12">
              Have a project in mind? Let's work together to create something extraordinary.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-center space-x-6">
                <div className="flex h-12 w-12 items-center justify-center border border-brand-border transition-colors hover:border-brand-blue hover:text-brand-blue">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-brand-muted">Email</p>
                  <p className="font-bold">ravindrasingh0127@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="flex h-12 w-12 items-center justify-center border border-brand-border transition-colors hover:border-brand-blue hover:text-brand-blue">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-brand-muted">Phone</p>
                  <p className="font-bold">8755618060</p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="flex h-12 w-12 items-center justify-center border border-brand-border transition-colors hover:border-brand-blue hover:text-brand-blue">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-brand-muted">Location</p>
                  <p className="font-bold">Dehradun, India</p>
                </div>
              </div>
            </div>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-brand-muted">Name</label>
                <input 
                  type="text" 
                  className="w-full border border-brand-border bg-transparent px-4 py-4 focus:border-black focus:outline-none transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-brand-muted">Email</label>
                <input 
                  type="email" 
                  className="w-full border border-brand-border bg-transparent px-4 py-4 focus:border-black focus:outline-none transition-colors"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-brand-muted">Subject</label>
              <input 
                type="text" 
                className="w-full border border-brand-border bg-transparent px-4 py-4 focus:border-black focus:outline-none transition-colors"
                placeholder="Project Inquiry"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-brand-muted">Message</label>
              <textarea 
                rows={5}
                className="w-full border border-brand-border bg-transparent px-4 py-4 focus:border-black focus:outline-none transition-colors resize-none"
                placeholder="Tell me about your project..."
              />
            </div>
            <button className="group flex items-center space-x-3 bg-black px-10 py-5 text-sm font-bold text-white transition-all hover:bg-brand-muted w-full justify-center">
              <span>SEND MESSAGE</span>
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
          </motion.form>
        </div>
      </section>
    </>
  );
}
