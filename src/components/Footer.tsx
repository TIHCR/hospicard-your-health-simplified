import logo from "@/assets/logo.png";
import logoSvg from "@/assets/logo_universius_footer.svg";

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        {/* Topo do footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          {/* Logo Hospicard */}
          <img
            src={logo}
            alt="Hospicard"
            className="h-12 brightness-0 invert"
          />

          {/* Desenvolvido por */}
          {/* Desenvolvido por */}
          <div className="flex items-center gap-4">
            <span className="text-base text-background/80">
              Desenvolvido por
            </span>
            <img
              src={logoSvg}
              alt="Universius"
              className="w-32 h-32 object-contain"
            />
          </div>

        </div>

        {/* Linha divisória */}
        <div className="border-t border-background/20 pt-6">
          <div className="text-center md:text-left text-sm text-background/60">
            © 2026 CNPJ: 88.417.787/0001-32 – Hospital Cristo Redentor. Todos os
            direitos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
};
