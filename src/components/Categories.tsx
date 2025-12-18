import { Check, Star } from "lucide-react";

const categories = [
  {
    name: "Categoria MASTER",
    description: "Acomodação em suíte Master Individual",
    price: "139,00",
    period: "mês por Pessoa",
    popular: false,
    features: [
      "Suíte Master Individual",
      "Atendimento prioritário",
      "Todos os benefícios inclusos",
      "Carência de 90 dias para cirurgias",
    ],
  },
  {
    name: "Categoria PLUS",
    description: "Acomodação Plus em apto Individual",
    price: "109,00",
    period: "mês por Pessoa",
    popular: true,
    features: [
      "Apartamento Individual",
      "Atendimento completo",
      "Descontos em exames",
      "Carência de 90 dias para cirurgias",
    ],
  },
  {
    name: "Categoria GRUPO FAMILIAR PLUS",
    description: "Válido para grupos acima de 3 pessoas",
    price: "99,00",
    period: "mês por Pessoa",
    popular: false,
    features: [
      "Apartamento Individual",
      "Plano familiar",
      "Economia em grupo",
      "Carência de 90 dias para cirurgias",
    ],
  },
  {
    name: "Sócio Benemérito Plus",
    description: "Válido para sócios beneméritos, cônjuge, filhos, netos, bisnetos",
    price: "55,00",
    period: "mês por Pessoa",
    popular: false,
    promotional: true,
    features: [
      "Apartamento Individual",
      "Preço promocional exclusivo",
      "Sem carência para cirurgias",
      "Extensivo à família",
    ],
  },
  {
    name: "Sócio Benemérito Master",
    description: "Válido para sócios beneméritos, cônjuge, filhos, netos, bisnetos",
    price: "70,00",
    period: "mês por Pessoa",
    popular: false,
    promotional: true,
    features: [
      "Suíte Master Individual",
      "Preço promocional exclusivo",
      "Sem carência para cirurgias",
      "Extensivo à família",
    ],
  },
];

export const Categories = () => {
  return (
    <section id="categorias" className="py-20 lg:py-28 bg-muted/50">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-secondary font-semibold text-sm tracking-wider uppercase mb-4">
            Categorias
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Confira nossas <span className="text-primary">Categorias</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Escolha a categoria que melhor se adapta às suas necessidades
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`relative bg-card rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-card-hover ${
                category.popular
                  ? "border-2 border-secondary shadow-secondary"
                  : "border border-border shadow-card"
              }`}
            >
              {category.popular && (
                <div className="absolute top-0 left-0 right-0 bg-secondary text-secondary-foreground text-center py-2 text-sm font-semibold">
                  <Star className="w-4 h-4 inline mr-1" />
                  Popular
                </div>
              )}
              {category.promotional && (
                <div className="absolute top-0 left-0 right-0 bg-primary text-primary-foreground text-center py-2 text-sm font-semibold">
                  Promocional
                </div>
              )}

              <div className={`p-6 ${category.popular || category.promotional ? "pt-14" : ""}`}>
                <h3 className="font-display font-bold text-xl text-foreground mb-2">
                  {category.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-6">
                  {category.description}
                </p>

                <div className="mb-6">
                  <span className="text-sm text-muted-foreground">R$</span>
                  <span className="font-display text-4xl font-bold text-foreground">
                    {category.price}
                  </span>
                  <span className="text-sm text-muted-foreground">/{category.period}</span>
                </div>

                <ul className="space-y-3 mb-6">
                  {category.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm">
                      <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contato"
                  className={`block w-full text-center py-3 rounded-xl font-semibold transition-all duration-300 ${
                    category.popular
                      ? "bg-secondary text-secondary-foreground hover:bg-hospicard-blue-dark"
                      : "bg-primary text-primary-foreground hover:bg-hospicard-red-dark"
                  }`}
                >
                  Clique para aderir
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
