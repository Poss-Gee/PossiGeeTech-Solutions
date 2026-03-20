"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Code, Smartphone, Palette, Globe, ChevronRight, CheckCircle2, Terminal } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[#0A0A0A] -z-10" />
        <motion.div
          className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-96 h-96 bg-[#EAB308]/20 rounded-full blur-[120px] -z-10"
          animate={{
            x: [0, 20, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-96 h-96 bg-[#EAB308]/10 rounded-full blur-[120px] -z-10"
          animate={{
            x: [0, -20, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-[#1E1E1E] border border-[#333] text-[#EAB308] text-sm font-medium mb-6">
              Welcome to PossiGeeTech Solutions
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-heading font-bold text-white tracking-tight mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            We Build The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EAB308] to-[#CA8A04]">Future</span> <br className="hidden md:block" /> Of Digital Technology
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            PossiGeeTech Solutions specializes in building high-quality websites, mobile applications, software systems, and digital products that help businesses grow in the digital world.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row justify-center items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link
              href="/portfolio"
              className="px-8 py-4 rounded-md font-semibold bg-[#EAB308] text-black transition-all shadow-[0_0_15px_rgba(234,179,8,0.3)] w-full sm:w-auto hover:bg-[#FACC15] active:scale-95"
            >
              View Our Work
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 rounded-md font-semibold bg-[#1E1E1E] text-white transition-all border border-[#333] w-full sm:w-auto flex items-center justify-center gap-2 hover:bg-[#333] active:scale-95"
            >
              Let&apos;s Talk <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="py-24 bg-[#0A0A0A] border-t border-[#1E1E1E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">Our Core Services</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Comprehensive digital solutions designed to accelerate your growth and establish your brand online.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { id: "web-dev", icon: Globe, title: "Web Development", desc: "Modern, responsive, and high-performance websites." },
              { id: "mobile-apps", icon: Smartphone, title: "Mobile Apps", desc: "Powerful user-friendly mobile applications." },
              { id: "ui-ux", icon: Palette, title: "UI/UX Design", desc: "Visually appealing and user-friendly interfaces." },
              { id: "software-dev", icon: Code, title: "Software Dev", desc: "Custom software and automation tools." },
            ].map((service, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 transition-all group flex flex-col h-full hover:border-[#EAB308]/50 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(234,179,8,0.1)]"
                whileHover={{ y: -10 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-14 h-14 bg-[#0A0A0A] rounded-xl flex items-center justify-center mb-6 border border-[#333] group-hover:border-[#EAB308] transition-colors">
                  <service.icon className="w-7 h-7 text-[#EAB308]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                <p className="text-gray-400 mb-6 flex-grow">{service.desc}</p>
                <Link href={`/services#${service.id}`} className="inline-flex items-center text-[#EAB308] font-medium hover:text-[#FACC15] transition-colors mt-auto">
                  Learn more <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">Why Partner With PossiGeeTech?</h2>
              <p className="text-gray-400 mb-8 text-lg">We don&apos;t just build software; we build solutions that solve real-world problems and drive business success. Our commitment to excellence sets us apart.</p>

              <div className="space-y-4">
                {[
                  "Expert team of developers and designers",
                  "Agile methodology for fast delivery",
                  "Cutting-edge technology stack",
                  "24/7 dedicated support and maintenance"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[#EAB308]" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <Link href="/about" className="px-6 py-3 rounded-md font-semibold bg-[#1E1E1E] text-white hover:bg-[#333] border border-[#333] transition-all inline-flex items-center gap-2">
                  About Our Company <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              className="relative rounded-2xl overflow-hidden aspect-square md:aspect-video lg:aspect-square bg-[#1E1E1E] border border-[#333]"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {/* Decorative grid pattern mimicking a tech environment */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#EAB308] blur-[100px] opacity-20 rounded-full" />
                  <Terminal className="w-32 h-32 text-[#EAB308] relative z-10" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#EAB308] relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5ad06_1px,transparent_1px),linear-gradient(to_bottom,#e5ad06_1px,transparent_1px)] bg-[size:20px_20px]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-black mb-6">Ready to bring your ideas to life?</h2>
          <p className="text-black/80 text-lg mb-10 max-w-2xl mx-auto">
            Use our interactive calculator to estimate your project cost, or contact us directly to discuss your specific requirements.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href="/calculator"
              className="px-8 py-4 rounded-md font-bold bg-black text-[#EAB308] hover:bg-gray-900 transition-all w-full sm:w-auto shadow-xl"
            >
              Estimate Project Cost
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
