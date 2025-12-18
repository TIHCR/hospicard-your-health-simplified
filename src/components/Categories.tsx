import { Check, Star, ChevronDown } from "lucide-react";
import { useState } from "react";

const benefits = [
  "Atendimento com até 50% de desconto do serviço utilizado",
  "Desconto em consultas médicas nas mais variadas especialidades com desconto de R$50,00 a R$100,00",
  "Exames do HCR Diagnóstico com 20% a 50% de desconto",
  "Internações com 50% de desconto em serviços, 20% em medicações e materiais da parte do Hospital",
  "Pacotes Cirúrgicos 20% de desconto da Parte do Hospital",
  "Procedimentos ambulatoriais 50% de desconto em serviços, 20% em medicações e materiais da parte do hospital",
  "Desconto em Cirurgia Plásticas",
  "Desconto Odontológico",
  "Posto de combustível: desconto em postos de combustível (consulte com nossa central)",
  "Exames Laboratoriais do HCR LAB com 20% a 45%",
  "HCR FARMA (40% de desconto em medicamentos genéricos, 20% nos de marca e 10% em perfumaria)",
  "HCR Gourmet 10% de desconto",
  "HCR Clinic (desconto em exames obstétricos, vacinas para todas as idades)",
  "Empréstimos de equipamentos ortopédicos",
];

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

const CategoryCard = ({ category, index }: { category: typeof categories[0]; index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const maxHeight = isExpanded ? "max-h-[600px]" : "max-h-0";

  return (
    <div
      key={index}
      className={`relative bg-card rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-card-hover cursor-pointer group hover:scale-[1.02] active:scale-[0.98] ${category.popular
        ? "border-2 border-secondary shadow-secondary"
        : "border border-border shadow-card"
        }`}
      onClick={toggleExpanded}
    >
      {category.popular && (
        <div className="absolute top-0 left-0 right-0 bg-secondary text-secondary-foreground text-center py-2 text-sm font-semibold z-10">
          <Star className="w-4 h-4 inline mr-1" />
          Popular
        </div>
      )}
      {category.promotional && (
        <div className="absolute top-0 left-0 right-0 bg-primary text-primary-foreground text-center py-2 text-sm font-semibold z-10">
          Promocional
        </div>
      )}

      <div className={`p-6 transition-all duration-300 ${category.popular || category.promotional ? "pt-14" : ""}`}>
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

        {/* Botão Ver mais / Ver menos */}
        <button
          onClick={toggleExpanded}
          className="w-full text-left flex items-center justify-between py-3 text-sm font-semibold text-primary hover:text-primary/80 transition-colors mb-6 group-hover:underline"
        >
          {isExpanded ? "Ver menos" : "Ver mais"}
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
          />
        </button>

        {/* Conteúdo expandido */}
        <div className={`overflow-hidden transition-all duration-500 ${maxHeight} mb-6`}>
          <ul className="space-y-3 pt-4">
            {benefits.map((benefit, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm">
                <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            const params = new URLSearchParams({
              plano: category.name,
              preco: category.price,
              descricao: category.description
            });
            window.location.href = `/envioadesao?${params.toString()}`;
          }}
          className={`block w-full text-center py-3 rounded-xl font-semibold transition-all duration-300 ${category.popular
              ? "bg-secondary text-secondary-foreground hover:bg-hospicard-blue-dark"
              : "bg-primary text-primary-foreground hover:bg-hospicard-red-dark"
            }`}
        >
          Clique para aderir
        </button>


      </div>
    </div>
  );
};

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
            <CategoryCard key={index} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
