import { FileText, Clock, CreditCard, Users } from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Contrato",
    description: "Contrato mínimo de 12 meses com renovação automática (sujeito a multa de cancelamento)",
  },
  {
    icon: Clock,
    title: "Carência",
    description: "Carência somente para cirurgias eletivas (90 dias), exceto para a categoria sócio benemérito",
  },
  {
    icon: CreditCard,
    title: "Cartão de Desconto",
    description: "Não se caracteriza como convênio. Sistema de descontos e facilidades.",
  },
  {
    icon: Users,
    title: "Critérios de Adesão",
    description: "Sem critério para adesão e sem limite de idade",
  },
];

export const About = () => {
  return (
    <section id="sobre" className="py-20 lg:py-28 bg-muted/50">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-secondary font-semibold text-sm tracking-wider uppercase mb-4">
            Sobre o Hospicard
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Seu hospital ainda mais{" "}
            <span className="text-primary">seu</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Internações, cirurgias, procedimentos ambulatoriais, exames e acesso 
            exclusivo a produtos farmacêuticos com valor e margem mínima da indústria 
            também integrarão o cartão de descontos. O produto foi formalizado e 
            projetado por uma comissão interna do HCR.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card p-6 rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-accent rounded-xl flex items-center justify-center mb-5 group-hover:bg-secondary transition-colors duration-300">
                <feature.icon className="w-7 h-7 text-secondary group-hover:text-secondary-foreground transition-colors duration-300" />
              </div>
              <h3 className="font-display font-semibold text-xl text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
