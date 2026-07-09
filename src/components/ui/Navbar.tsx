"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { buttonVariants } from "./Button";

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-md">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
          {/* Logo Lockup */}
          <Link href="/" className="flex flex-col items-center justify-center p-2 -ml-2 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-gold-500">
            <span className="font-serif text-2xl font-bold tracking-wider text-gold-500">
              Hair & Beauty
            </span>
            <span className="mt-1 h-[1px] w-full bg-gold-400" />
            <span className="mt-1 text-[0.65rem] uppercase tracking-[0.2em] text-zinc-400">
              Unisex Salon
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
            {navLinks.slice(1).map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative p-2 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded-md ${
                    isActive ? "text-gold-500 font-semibold" : "text-zinc-300 hover:text-gold-400"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active"
                      className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-gold-500"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:8222830906"
              className={buttonVariants({ variant: "outline", size: "sm" })}
              aria-label="Call us"
            >
              <Phone className="mr-2 h-4 w-4" />
              <span>8222830906</span>
            </a>
            <Link href="/book" className={buttonVariants({ variant: "primary", size: "sm" })}>
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="flex lg:hidden items-center justify-center p-2 -mr-2 text-zinc-300 transition-colors hover:text-gold-400 outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded-md min-h-[44px] min-w-[44px]"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={isMobileMenuOpen}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] flex flex-col bg-black/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex h-20 items-center justify-between px-4 border-b border-white/10">
              <span className="font-serif text-xl font-bold tracking-wider text-gold-500 p-2">Menu</span>
              <button
                type="button"
                className="flex items-center justify-center p-2 text-zinc-300 transition-colors hover:text-gold-400 outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded-md min-h-[44px] min-w-[44px]"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="flex flex-col flex-1 px-4 py-8 overflow-y-auto">
              <nav className="flex flex-col gap-2 mb-8">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      aria-current={isActive ? "page" : undefined}
                      className={`flex items-center min-h-[56px] px-4 text-lg font-medium rounded-lg transition-colors outline-none focus-visible:ring-2 focus-visible:ring-gold-500 ${
                        isActive ? "bg-gold-500/10 text-gold-400 font-semibold" : "text-zinc-300 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </nav>
              
              <div className="mt-auto flex flex-col gap-4">
                <a
                  href="tel:8222830906"
                  className={buttonVariants({ variant: "outline", size: "lg", className: "w-full text-lg justify-center" })}
                >
                  <Phone className="mr-2 h-5 w-5" />
                  <span>Call 8222830906</span>
                </a>
                <Link 
                  href="/book" 
                  className={buttonVariants({ variant: "primary", size: "lg", className: "w-full text-lg justify-center" })}
                >
                  Book Appointment
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
