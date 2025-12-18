import heroImg from "@/assets/hero-img.png";
import { ChevronRight, Shield, Heart, Clock } from "lucide-react";

export const Hero = () => {
  return (
    <section
      id="inicio"
      className="min-h-screen bg-gradient-hero pt-24 pb-12 lg:pt-32 lg:pb-20 overflow-hidden"
    >
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-accent px-4 py-2 rounded-full mb-6">
              <Shield className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium text-accent-foreground">
                Sistema de Descontos e Facilidades
              </span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              O que é o{" "}
              <span className="text-primary">Hospicard</span>?
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              O Hospicard é um sistema de atendimento médico-hospitalar que oferece 
              estrutura moderna, profissionais de excelente qualificação e serviços 
              com <strong className="text-foreground">custos diferenciados</strong>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <a
                href="#sobre"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold hover:bg-hospicard-red-dark transition-all duration-300 shadow-primary text-lg"
              >
                Saiba Mais
                <ChevronRight className="w-5 h-5" />
              </a>
              <a
                href="#categorias"
                className="inline-flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-8 py-4 rounded-xl font-semibold hover:bg-hospicard-blue-dark transition-all duration-300 shadow-secondary text-lg"
              >
                Contrate Agora
              </a>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 text-primary mb-1">
                  <Heart className="w-5 h-5" />
                  <span className="font-display font-bold text-2xl">+50</span>
                </div>
                <p className="text-sm text-muted-foreground">Especialidades</p>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 text-secondary mb-1">
                  <Shield className="w-5 h-5" />
                  <span className="font-display font-bold text-2xl">100%</span>
                </div>
                <p className="text-sm text-muted-foreground">Credenciados</p>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 text-primary mb-1">
                  <Clock className="w-5 h-5" />
                  <span className="font-display font-bold text-2xl">24h</span>
                </div>
                <p className="text-sm text-muted-foreground">Atendimento</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-secondary/20 rounded-full blur-3xl" />
              <img
                src={heroImg}
                alt="Mulher segurando cartão Hospicard"
                className="w-full max-w-md lg:max-w-lg xl:max-w-xl animate-float"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
