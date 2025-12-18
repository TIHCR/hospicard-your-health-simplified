import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

const navLinks = [
  { href: "#inicio", label: "Início" },
  { href: "#sobre", label: "Sobre" },
  { href: "#profissionais", label: "Profissionais Credenciados" },
  { href: "#categorias", label: "Categorias" },
  { href: "#contato", label: "Contato" },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-[#0B1C2D] shadow-card py-3 transition-all duration-300"
    >
      <div className="container mx-auto flex items-center justify-between">
        <a href="#inicio" className="flex items-center">
          <img src={logo} alt="Hospicard Logo" className="h-12 md:h-14" />
        </a>
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-white/80 hover:text-blue-300 font-medium transition-colors duration-200 text-sm"
            >
              {link.label}
            </a>

          ))}
          <a
            href="#categorias"
            className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-semibold hover:bg-hospicard-red-dark transition-all duration-200 shadow-primary text-sm"
          >
            Contrate Agora
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className="lg:hidden bg-background border-t border-border mt-2">
          <div className="container mx-auto py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-foreground/80 hover:text-primary font-medium transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#categorias"
              className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold text-center hover:bg-hospicard-red-dark transition-all duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contrate Agora
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};
