import logo from "@/assets/logo.png";
import { Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <img src={logo} alt="Hospicard" className="h-12 brightness-0 invert" />
          
          <nav className="flex flex-wrap justify-center gap-6">
            <a href="#inicio" className="text-background/70 hover:text-background transition-colors text-sm">
              Início
            </a>
            <a href="#sobre" className="text-background/70 hover:text-background transition-colors text-sm">
              Sobre
            </a>
            <a href="#profissionais" className="text-background/70 hover:text-background transition-colors text-sm">
              Profissionais
            </a>
            <a href="#categorias" className="text-background/70 hover:text-background transition-colors text-sm">
              Categorias
            </a>
            <a href="#contato" className="text-background/70 hover:text-background transition-colors text-sm">
              Contato
            </a>
          </nav>
        </div>

        <div className="border-t border-background/20 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-background/60">
            <p>
              © 2025 CNPJ: 88.417.787/0001-32 - Hospital Cristo Redentor. Todos os direitos reservados.
            </p>
            <p className="flex items-center gap-2">
              Desenvolvido com <Heart className="w-4 h-4 text-primary fill-primary" /> por Universius
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
