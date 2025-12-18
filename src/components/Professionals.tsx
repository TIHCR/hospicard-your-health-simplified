import { 
  Stethoscope, 
  Heart, 
  Brain, 
  Eye, 
  Bone, 
  Baby,
  Activity,
  Microscope
} from "lucide-react";

const specialties = [
  { icon: Stethoscope, name: "Clínica Geral", color: "text-primary" },
  { icon: Heart, name: "Cardiologia", color: "text-primary" },
  { icon: Brain, name: "Neurologia", color: "text-secondary" },
  { icon: Eye, name: "Oftalmologia", color: "text-secondary" },
  { icon: Bone, name: "Ortopedia", color: "text-primary" },
  { icon: Baby, name: "Pediatria", color: "text-secondary" },
  { icon: Activity, name: "Fisioterapia", color: "text-primary" },
  { icon: Microscope, name: "Exames Laboratoriais", color: "text-secondary" },
];

export const Professionals = () => {
  return (
    <section id="profissionais" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-primary font-semibold text-sm tracking-wider uppercase mb-4">
            Profissionais Credenciados
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Escolha uma{" "}
            <span className="text-secondary">especialidade médica</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Contamos com profissionais de excelente qualificação atuando nas mais 
            variadas especialidades médicas para atender todas as suas necessidades.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {specialties.map((specialty, index) => (
            <div
              key={index}
              className="group bg-card border border-border p-6 rounded-2xl text-center hover:border-secondary hover:shadow-card-hover transition-all duration-300 cursor-pointer"
            >
              <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center mb-4 group-hover:bg-accent transition-colors duration-300">
                <specialty.icon className={`w-8 h-8 ${specialty.color} transition-transform duration-300 group-hover:scale-110`} />
              </div>
              <h3 className="font-display font-medium text-foreground text-sm md:text-base">
                {specialty.name}
              </h3>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="#contato"
            className="inline-flex items-center gap-2 text-secondary hover:text-hospicard-blue-dark font-semibold transition-colors"
          >
            Ver todas as especialidades
            <span className="text-xl">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};
