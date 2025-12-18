import { useState, useEffect } from "react";
import { Check, ChevronLeft, User, Calendar, MapPin, Phone, Building, AlertCircle } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "@/config/api";

interface FormData {
  nome: string;
  rg: string;
  cpf: string;
  nome_pai: string;
  nome_mae: string;
  data_nascimento: string;
  endereco: string;
  cidade: string;
  estado: string;
  estado_civil: string;
  profissao_trabalho: string;
  telefone: string;
  plano: string;
  forma_pagamento: string;
}

const estados = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];
const estadosCivil = ["Solteiro(a)", "Casado(a)", "Divorciado(a)", "Viúvo(a)", "Separado(a)"];
const formasPagamento = ["Cartão de Crédito", "Boleto", "Débito Automático", "PIX"];

const EnvioAdesao = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    rg: "",
    cpf: "",
    nome_pai: "",
    nome_mae: "",
    data_nascimento: "",
    endereco: "",
    cidade: "",
    estado: "",
    estado_civil: "",
    profissao_trabalho: "",
    telefone: "",
    plano: "",
    forma_pagamento: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string>("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const plano = searchParams.get("plano") || "";
    const preco = searchParams.get("preco") || "";
    const descricao = searchParams.get("descricao") || "";
    setFormData(prev => ({ ...prev, plano: `${plano} (${descricao}) - R$ ${preco}` }));
  }, [searchParams]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.nome.trim()) newErrors.nome = "Nome é obrigatório";
    if (!formData.rg.trim()) newErrors.rg = "RG é obrigatório";
    if (!formData.cpf.trim()) newErrors.cpf = "CPF é obrigatório";
    if (!formData.data_nascimento) newErrors.data_nascimento = "Data de nascimento é obrigatória";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
    if (apiError) setApiError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    setApiError("");

    try {
      const response = await api.post('/clientes.php', formData);

      if (response.status === 201 || response.status === 200) {
        setSuccess(true);
        
        // Redirecionar após 2 segundos
        setTimeout(() => {
          navigate('/', { state: { adesaoSucesso: true } });
        }, 2000);
      }
    } catch (error: any) {
      console.error("Erro na requisição:", error);
      
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.message;
        
        if (status === 409) {
          setApiError("CPF já cadastrado no sistema. Por favor, verifique os dados.");
        } else if (status === 400) {
          setApiError(message || "Dados incompletos. Verifique os campos obrigatórios.");
        } else if (status === 503) {
          setApiError("Erro ao processar no banco de dados. Tente novamente.");
        } else {
          setApiError(message || "Erro ao processar adesão. Tente novamente.");
        }
      } else if (error.request) {
        setApiError("Erro de conexão com o servidor. Verifique sua internet e tente novamente.");
      } else {
        setApiError("Erro inesperado. Por favor, tente novamente.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Tela de sucesso
  if (success) {
    return (
      <section className="min-h-screen py-20 bg-gradient-to-b from-muted/50 to-background flex items-center justify-center">
        <div className="container mx-auto max-w-md px-4">
          <div className="bg-card rounded-3xl shadow-2xl p-12 text-center border border-border">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-4">Adesão Confirmada!</h1>
            <p className="text-muted-foreground text-lg mb-6">
              Sua adesão foi enviada com sucesso. Em breve entraremos em contato.
            </p>
            <div className="animate-spin w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full mx-auto"></div>
            <p className="text-sm text-muted-foreground mt-4">Redirecionando...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen py-20 bg-gradient-to-b from-muted/50 to-background">
      <div className="container mx-auto max-w-lg px-4">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-primary hover:text-primary/80 mb-8 font-semibold transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Voltar
        </button>
        
        <div className="bg-card rounded-3xl shadow-2xl overflow-hidden border border-border">
          <div className="bg-gradient-to-r from-primary to-secondary p-8 text-primary-foreground text-center">
            <User className="w-16 h-16 mx-auto mb-4 opacity-80" />
            <h1 className="font-display text-3xl font-bold mb-2">Adesão ao Plano</h1>
            <p className="text-primary-foreground/90 text-lg">{formData.plano}</p>
          </div>

          {/* Mensagem de erro da API */}
          {apiError && (
            <div className="mx-8 mt-6 bg-destructive/10 border border-destructive/30 rounded-xl p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <p className="text-destructive text-sm font-medium">{apiError}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Nome Completo *
                </label>
                <input
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  className={`w-full p-4 bg-background border-2 rounded-2xl focus:border-secondary focus:outline-none transition-all text-foreground ${errors.nome ? 'border-destructive' : 'border-border hover:border-secondary/50'}`}
                  required
                />
                {errors.nome && <p className="text-destructive text-sm mt-1">{errors.nome}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Data Nascimento *
                </label>
                <input
                  type="date"
                  name="data_nascimento"
                  value={formData.data_nascimento}
                  onChange={handleChange}
                  className={`w-full p-4 bg-background border-2 rounded-2xl focus:border-secondary focus:outline-none transition-all ${errors.data_nascimento ? 'border-destructive' : 'border-border hover:border-secondary/50'}`}
                  required
                />
                {errors.data_nascimento && <p className="text-destructive text-sm mt-1">{errors.data_nascimento}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">RG *</label>
                <input 
                  name="rg" 
                  value={formData.rg} 
                  onChange={handleChange} 
                  className={`w-full p-4 bg-background border-2 rounded-2xl focus:border-secondary focus:outline-none transition-all hover:border-secondary/50 ${errors.rg ? 'border-destructive' : 'border-border'}`}
                  required 
                />
                {errors.rg && <p className="text-destructive text-sm mt-1">{errors.rg}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">CPF *</label>
                <input 
                  name="cpf" 
                  value={formData.cpf} 
                  onChange={handleChange}
                  placeholder="000.000.000-00"
                  className={`w-full p-4 bg-background border-2 rounded-2xl focus:border-secondary focus:outline-none transition-all hover:border-secondary/50 ${errors.cpf ? 'border-destructive' : 'border-border'}`}
                  required 
                />
                {errors.cpf && <p className="text-destructive text-sm mt-1">{errors.cpf}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">Nome do Pai</label>
                <input name="nome_pai" value={formData.nome_pai} onChange={handleChange} className="w-full p-4 bg-background border border-border rounded-2xl focus:border-secondary focus:outline-none hover:border-secondary/50 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">Nome da Mãe</label>
                <input name="nome_mae" value={formData.nome_mae} onChange={handleChange} className="w-full p-4 bg-background border border-border rounded-2xl focus:border-secondary focus:outline-none hover:border-secondary/50 transition-all" />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Endereço
                </label>
                <input name="endereco" value={formData.endereco} onChange={handleChange} className="w-full p-4 bg-background border border-border rounded-2xl focus:border-secondary focus:outline-none hover:border-secondary/50 transition-all" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">Cidade</label>
                  <input name="cidade" value={formData.cidade} onChange={handleChange} className="w-full p-4 bg-background border border-border rounded-2xl focus:border-secondary focus:outline-none hover:border-secondary/50 transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">Estado</label>
                  <select name="estado" value={formData.estado} onChange={handleChange} className="w-full p-4 bg-background border border-border rounded-2xl focus:border-secondary focus:outline-none hover:border-secondary/50 transition-all">
                    <option value="">Selecione</option>
                    {estados.map((uf) => <option key={uf} value={uf}>{uf}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">Est. Civil</label>
                  <select name="estado_civil" value={formData.estado_civil} onChange={handleChange} className="w-full p-4 bg-background border border-border rounded-2xl focus:border-secondary focus:outline-none hover:border-secondary/50 transition-all">
                    <option value="">Selecione</option>
                    {estadosCivil.map((ec) => <option key={ec} value={ec}>{ec}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Building className="w-4 h-4" />
                    Profissão
                  </label>
                  <input name="profissao_trabalho" value={formData.profissao_trabalho} onChange={handleChange} className="w-full p-4 bg-background border border-border rounded-2xl focus:border-secondary focus:outline-none hover:border-secondary/50 transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Telefone
                  </label>
                  <input 
                    name="telefone" 
                    value={formData.telefone} 
                    onChange={handleChange}
                    placeholder="(00) 00000-0000"
                    className="w-full p-4 bg-background border border-border rounded-2xl focus:border-secondary focus:outline-none hover:border-secondary/50 transition-all" 
                  />
                </div>
              </div>

              <div className="bg-muted/50 p-6 rounded-2xl border border-border">
                <label className="block text-sm font-semibold text-foreground mb-3">Forma de Pagamento</label>
                <select name="forma_pagamento" value={formData.forma_pagamento} onChange={handleChange} className="w-full p-4 bg-background border border-border rounded-2xl focus:border-secondary focus:outline-none hover:border-secondary/50 transition-all text-base">
                  <option value="">Selecione</option>
                  {formasPagamento.map((fp) => <option key={fp} value={fp}>{fp}</option>)}
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground py-6 rounded-2xl font-display font-bold text-xl shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {submitting ? (
                <>
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Check className="w-6 h-6" />
                  Confirmar Adesão
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EnvioAdesao;
