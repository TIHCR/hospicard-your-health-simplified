import { useState, useEffect } from "react";
import { 
  Stethoscope, 
  Heart, 
  Microscope,
  X,
  Phone,
  User
} from "lucide-react";
import api from "../config/api";

interface Specialty {
  id: number;
  nome: string;
  slug: string;
  descricao: string | null;
  ativo: number;
  ordem: number;
}

interface Professional {
  id: number;
  especialidade_id: number;
  especialidade_nome: string;
  nome: string;
  telefone: string;
  imagem: string | null;
  observacoes: string | null;
  ativo: number;
  created_at: string;
  updated_at: string;
}

const iconMap: { [key: string]: any } = {
  Stethoscope,
  Heart,
  Microscope
};

const getRandomIcon = () => {
  const icons = Object.values(iconMap);
  return icons[Math.floor(Math.random() * icons.length)];
};

const getRandomColor = () => {
  const colors = ["text-primary", "text-secondary"];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const Professionals = () => {
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState<Specialty | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingProfessionals, setLoadingProfessionals] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        setLoading(true);
        const response = await api.get("/especialidades.php");
        
        // Garante que response.data é um array
        const dataArray = Array.isArray(response.data) ? response.data : [];
        
        const activeSpecialties = dataArray
          .filter((spec: Specialty) => spec.ativo === 1)
          .sort((a: Specialty, b: Specialty) => a.ordem - b.ordem);
        
        setSpecialties(activeSpecialties);
        setError(null);
      } catch (err) {
        console.error("Erro ao buscar especialidades:", err);
        setError("Não foi possível carregar as especialidades.");
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialties();
  }, []);

  const handleSpecialtyClick = async (specialty: Specialty) => {
    try {
      setLoadingProfessionals(true);
      setSelectedSpecialty(specialty);
      
      const response = await api.get(`/profissionais.php?especialidade_id=${specialty.id}`);
      
      // Garante que response.data é um array
      const dataArray = Array.isArray(response.data) ? response.data : [];
      setProfessionals(dataArray);
    } catch (err) {
      console.error("Erro ao buscar profissionais:", err);
      setProfessionals([]);
    } finally {
      setLoadingProfessionals(false);
    }
  };

  const closeModal = () => {
    setSelectedSpecialty(null);
    setProfessionals([]);
  };

  const displayedSpecialties = showAll ? specialties : specialties.slice(0, 8);

  if (loading) {
    return (
      <section id="profissionais" className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto">
          <div className="text-center">
            <p className="text-muted-foreground">Carregando especialidades...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="profissionais" className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto">
          <div className="text-center">
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      </section>
    );
  }

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
          {displayedSpecialties.map((specialty) => {
            const Icon = getRandomIcon();
            const color = getRandomColor();
            
            return (
              <div
                key={specialty.id}
                onClick={() => handleSpecialtyClick(specialty)}
                className="group bg-card border border-border p-6 rounded-2xl text-center hover:border-secondary hover:shadow-card-hover transition-all duration-300 cursor-pointer"
              >
                <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center mb-4 group-hover:bg-accent transition-colors duration-300">
                  <Icon className={`w-8 h-8 ${color} transition-transform duration-300 group-hover:scale-110`} />
                </div>
                <h3 className="font-display font-medium text-foreground text-sm md:text-base">
                  {specialty.nome}
                </h3>
              </div>
            );
          })}
        </div>

        {specialties.length > 8 && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 text-secondary hover:text-hospicard-blue-dark font-semibold transition-colors"
            >
              {showAll ? (
                <>
                  Ver menos especialidades
                  <span className="text-xl">↑</span>
                </>
              ) : (
                <>
                  Ver todas as {specialties.length} especialidades
                  <span className="text-xl">→</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Modal de Profissionais */}
      {selectedSpecialty && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header do Modal */}
            <div className="bg-primary text-white p-6 flex items-center justify-between">
              <div>
                <h3 className="font-display text-2xl font-bold">
                  {selectedSpecialty.nome}
                </h3>
                <p className="text-sm opacity-90 mt-1">
                  Profissionais credenciados
                </p>
              </div>
              <button
                onClick={closeModal}
                className="hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Conteúdo do Modal */}
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
              {loadingProfessionals ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Carregando profissionais...</p>
                </div>
              ) : professionals.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    Nenhum profissional encontrado para esta especialidade.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {professionals.map((professional) => (
                    <div
                      key={professional.id}
                      className="flex items-start gap-4 p-4 border border-border rounded-xl hover:border-secondary transition-colors"
                    >
                      <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground text-lg">
                          {professional.nome}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          {professional.especialidade_nome}
                        </p>
                        {professional.telefone && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Phone className="w-4 h-4" />
                            <span>{professional.telefone}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};