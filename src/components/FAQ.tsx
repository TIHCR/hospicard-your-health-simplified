import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Existe algum limite de idade para fazer adesão ou participar?",
    answer: "Não, não existe nenhum limite de idade para adesão. Independentemente da sua faixa etária, você pode fazer parte do Hospicard e aproveitar todos os benefícios oferecidos pelo sistema de descontos e facilidades.",
  },
  {
    question: "Existe algum período de carência para utilizar o cartão Hospicard?",
    answer: "A carência é de 90 dias somente para cirurgias eletivas. Os demais serviços como consultas, exames e atendimentos ambulatoriais podem ser utilizados imediatamente após a adesão. Sócios beneméritos não têm carência.",
  },
  {
    question: "O Hospicard é um convênio médico?",
    answer: "Não, o Hospicard não se caracteriza como convênio. É um sistema de descontos e facilidades que oferece acesso a serviços médico-hospitalares com custos diferenciados.",
  },
  {
    question: "Posso incluir minha família no plano?",
    answer: "Sim! Temos a categoria Grupo Familiar Plus, válida para grupos acima de 3 pessoas, com valor especial de R$99,00 por pessoa. Sócios beneméritos podem incluir cônjuge, filhos, netos e bisnetos com preços promocionais.",
  },
  {
    question: "Quais serviços estão inclusos no Hospicard?",
    answer: "O Hospicard inclui internações, cirurgias, procedimentos ambulatoriais, exames e acesso exclusivo a produtos farmacêuticos com valor e margem mínima da indústria.",
  },
];

export const FAQ = () => {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-primary font-semibold text-sm tracking-wider uppercase mb-4">
            Dúvidas Frequentes
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Perguntas <span className="text-secondary">Frequentes</span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-xl px-6 data-[state=open]:shadow-card"
              >
                <AccordionTrigger className="text-left font-display font-semibold text-foreground hover:text-primary hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
