import { useState, useEffect } from "react";
import { Search, Plus, Edit, Trash2, Stethoscope, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import api from "../../config/api";

interface Especialidade {
  id: number;
  nome: string;
  slug: string;
  descricao: string | null;
  ativo: number;
  ordem: number;
  created_at?: string;
  updated_at?: string;
}

interface Profissional {
  id: number;
  especialidade_id: number;
  especialidade_nome?: string;
  nome: string;
  telefone: string;
  imagem: string | null;
  observacoes: string | null;
  ativo: number;
  created_at?: string;
  updated_at?: string;
}

const GerenciarEspecialidades = () => {
  const [especialidades, setEspecialidades] = useState<Especialidade[]>([]);
  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchEspecialidade, setSearchEspecialidade] = useState("");
  const [searchProfissional, setSearchProfissional] = useState("");
  const [isEspecialidadeDialogOpen, setIsEspecialidadeDialogOpen] = useState(false);
  const [isProfissionalDialogOpen, setIsProfissionalDialogOpen] = useState(false);
  const [editingEspecialidade, setEditingEspecialidade] = useState<Especialidade | null>(null);
  const [editingProfissional, setEditingProfissional] = useState<Profissional | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Form states - Especialidade
  const [formEsp, setFormEsp] = useState({
    nome: "",
    slug: "",
    descricao: "",
    ativo: 1,
    ordem: 1
  });

  // Form states - Profissional
  const [formProf, setFormProf] = useState({
    especialidade_id: "",
    nome: "",
    telefone: "",
    imagem: "",
    observacoes: "",
    ativo: 1
  });

  // Fetch data
  useEffect(() => {
    fetchEspecialidades();
    fetchProfissionais();
  }, []);

  const fetchEspecialidades = async () => {
    try {
      setLoading(true);
      const response = await api.get("/especialidades.php");
      setEspecialidades(response.data || []);
    } catch (error) {
      console.error("Erro ao buscar especialidades:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProfissionais = async () => {
    try {
      const response = await api.get("/profissionais.php");
      setProfissionais(response.data || []);
    } catch (error) {
      console.error("Erro ao buscar profissionais:", error);
    }
  };

  // Especialidade handlers
  const handleCreateEspecialidade = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await api.post("/especialidades.php", formEsp);
      await fetchEspecialidades();
      setIsEspecialidadeDialogOpen(false);
      resetFormEsp();
    } catch (error) {
      console.error("Erro ao criar especialidade:", error);
      alert("Erro ao criar especialidade");
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateEspecialidade = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEspecialidade) return;
    setSubmitting(true);

    try {
      await api.put("/especialidades.php", {
        id: editingEspecialidade.id,
        ...formEsp
      });
      await fetchEspecialidades();
      setIsEspecialidadeDialogOpen(false);
      setEditingEspecialidade(null);
      resetFormEsp();
    } catch (error) {
      console.error("Erro ao atualizar especialidade:", error);
      alert("Erro ao atualizar especialidade");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteEspecialidade = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir esta especialidade?")) return;

    try {
      await api.delete("/especialidades.php", { data: { id } });
      await fetchEspecialidades();
    } catch (error) {
      console.error("Erro ao excluir especialidade:", error);
      alert("Erro ao excluir especialidade");
    }
  };

  const openEditEspecialidade = (esp: Especialidade) => {
    setEditingEspecialidade(esp);
    setFormEsp({
      nome: esp.nome,
      slug: esp.slug,
      descricao: esp.descricao || "",
      ativo: esp.ativo,
      ordem: esp.ordem
    });
    setIsEspecialidadeDialogOpen(true);
  };

  const resetFormEsp = () => {
    setFormEsp({
      nome: "",
      slug: "",
      descricao: "",
      ativo: 1,
      ordem: especialidades.length + 1
    });
    setEditingEspecialidade(null);
  };

  // Profissional handlers
  const handleCreateProfissional = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await api.post("/profissionais.php", {
        ...formProf,
        especialidade_id: parseInt(formProf.especialidade_id)
      });
      await fetchProfissionais();
      setIsProfissionalDialogOpen(false);
      resetFormProf();
    } catch (error) {
      console.error("Erro ao criar profissional:", error);
      alert("Erro ao criar profissional");
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateProfissional = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProfissional) return;
    setSubmitting(true);

    try {
      await api.put("/profissionais.php", {
        id: editingProfissional.id,
        ...formProf,
        especialidade_id: parseInt(formProf.especialidade_id)
      });
      await fetchProfissionais();
      setIsProfissionalDialogOpen(false);
      setEditingProfissional(null);
      resetFormProf();
    } catch (error) {
      console.error("Erro ao atualizar profissional:", error);
      alert("Erro ao atualizar profissional");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteProfissional = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir este profissional?")) return;

    try {
      await api.delete("/profissionais.php", { data: { id } });
      await fetchProfissionais();
    } catch (error) {
      console.error("Erro ao excluir profissional:", error);
      alert("Erro ao excluir profissional");
    }
  };

  const openEditProfissional = (prof: Profissional) => {
    setEditingProfissional(prof);
    setFormProf({
      especialidade_id: prof.especialidade_id.toString(),
      nome: prof.nome,
      telefone: prof.telefone,
      imagem: prof.imagem || "",
      observacoes: prof.observacoes || "",
      ativo: prof.ativo
    });
    setIsProfissionalDialogOpen(true);
  };

  const resetFormProf = () => {
    setFormProf({
      especialidade_id: "",
      nome: "",
      telefone: "",
      imagem: "",
      observacoes: "",
      ativo: 1
    });
    setEditingProfissional(null);
  };

  // Auto-generate slug from nome
  const handleNomeChange = (value: string) => {
    setFormEsp({
      ...formEsp,
      nome: value,
      slug: value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
    });
  };

  const filteredEspecialidades = especialidades.filter((esp) =>
    esp.nome.toLowerCase().includes(searchEspecialidade.toLowerCase())
  );

  const filteredProfissionais = profissionais.filter(
    (prof) =>
      prof.nome.toLowerCase().includes(searchProfissional.toLowerCase()) ||
      prof.telefone.includes(searchProfissional) ||
      (prof.especialidade_nome && prof.especialidade_nome.toLowerCase().includes(searchProfissional.toLowerCase()))
  );

  const getProfissionaisPorEspecialidade = (especialidadeId: number) => {
    return profissionais.filter(p => p.especialidade_id === especialidadeId).length;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Tabs defaultValue="especialidades" className="space-y-6">
      <TabsList className="grid w-full max-w-md grid-cols-2">
        <TabsTrigger value="especialidades" className="gap-2">
          <Stethoscope className="h-4 w-4" />
          Especialidades
        </TabsTrigger>
        <TabsTrigger value="profissionais" className="gap-2">
          <User className="h-4 w-4" />
          Profissionais
        </TabsTrigger>
      </TabsList>

      {/* Especialidades Tab */}
      <TabsContent value="especialidades" className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card p-4 rounded-xl border border-border">
            <p className="text-sm text-muted-foreground">Total de Especialidades</p>
            <p className="text-2xl font-bold text-foreground">{especialidades.length}</p>
          </div>
          <div className="bg-card p-4 rounded-xl border border-border">
            <p className="text-sm text-muted-foreground">Total de Profissionais</p>
            <p className="text-2xl font-bold text-primary">{profissionais.length}</p>
          </div>
          <div className="bg-card p-4 rounded-xl border border-border">
            <p className="text-sm text-muted-foreground">Média por Especialidade</p>
            <p className="text-2xl font-bold text-foreground">
              {especialidades.length > 0 ? (profissionais.length / especialidades.length).toFixed(1) : "0"}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar especialidade..."
              value={searchEspecialidade}
              onChange={(e) => setSearchEspecialidade(e.target.value)}
              className="pl-10"
            />
          </div>
          <Dialog 
            open={isEspecialidadeDialogOpen} 
            onOpenChange={(open) => {
              setIsEspecialidadeDialogOpen(open);
              if (!open) resetFormEsp();
            }}
          >
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Nova Especialidade
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingEspecialidade ? "Editar Especialidade" : "Nova Especialidade"}
                </DialogTitle>
              </DialogHeader>
              <div onSubmit={editingEspecialidade ? handleUpdateEspecialidade : handleCreateEspecialidade} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nome-esp">Nome da Especialidade *</Label>
                  <Input 
                    id="nome-esp" 
                    placeholder="Ex: Cardiologia"
                    value={formEsp.nome}
                    onChange={(e) => handleNomeChange(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug-esp">Slug *</Label>
                  <Input 
                    id="slug-esp" 
                    placeholder="cardiologia"
                    value={formEsp.slug}
                    onChange={(e) => setFormEsp({ ...formEsp, slug: e.target.value })}
                    required
                  />
                  <p className="text-xs text-muted-foreground">Gerado automaticamente a partir do nome</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="descricao-esp">Descrição</Label>
                  <Textarea 
                    id="descricao-esp" 
                    placeholder="Descrição breve da especialidade"
                    value={formEsp.descricao}
                    onChange={(e) => setFormEsp({ ...formEsp, descricao: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ordem-esp">Ordem de Exibição</Label>
                  <Input 
                    id="ordem-esp" 
                    type="number"
                    value={formEsp.ordem}
                    onChange={(e) => setFormEsp({ ...formEsp, ordem: parseInt(e.target.value) })}
                    min="1"
                  />
                </div>
                <Button 
                  onClick={editingEspecialidade ? handleUpdateEspecialidade : handleCreateEspecialidade} 
                  className="w-full" 
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Salvando...
                    </>
                  ) : editingEspecialidade ? "Atualizar Especialidade" : "Cadastrar Especialidade"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Table */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Especialidade</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead className="hidden md:table-cell">Descrição</TableHead>
                <TableHead className="text-center">Profissionais</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEspecialidades.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    Nenhuma especialidade encontrada
                  </TableCell>
                </TableRow>
              ) : (
                filteredEspecialidades.map((esp) => (
                  <TableRow key={esp.id}>
                    <TableCell className="font-medium">{esp.nome}</TableCell>
                    <TableCell className="text-muted-foreground">{esp.slug}</TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">
                      {esp.descricao || "-"}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="secondary">{getProfissionaisPorEspecialidade(esp.id)}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => openEditEspecialidade(esp)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-destructive"
                          onClick={() => handleDeleteEspecialidade(esp.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </TabsContent>

      {/* Profissionais Tab */}
      <TabsContent value="profissionais" className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card p-4 rounded-xl border border-border">
            <p className="text-sm text-muted-foreground">Total de Profissionais</p>
            <p className="text-2xl font-bold text-foreground">{profissionais.length}</p>
          </div>
          <div className="bg-card p-4 rounded-xl border border-border">
            <p className="text-sm text-muted-foreground">Ativos</p>
            <p className="text-2xl font-bold text-green-600">
              {profissionais.filter((p) => p.ativo === 1).length}
            </p>
          </div>
          <div className="bg-card p-4 rounded-xl border border-border">
            <p className="text-sm text-muted-foreground">Inativos</p>
            <p className="text-2xl font-bold text-muted-foreground">
              {profissionais.filter((p) => p.ativo === 0).length}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, telefone ou especialidade..."
              value={searchProfissional}
              onChange={(e) => setSearchProfissional(e.target.value)}
              className="pl-10"
            />
          </div>
          <Dialog 
            open={isProfissionalDialogOpen} 
            onOpenChange={(open) => {
              setIsProfissionalDialogOpen(open);
              if (!open) resetFormProf();
            }}
          >
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Novo Profissional
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingProfissional ? "Editar Profissional" : "Novo Profissional"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nome-prof">Nome Completo *</Label>
                  <Input 
                    id="nome-prof" 
                    placeholder="Ex: Dr. João Silva"
                    value={formProf.nome}
                    onChange={(e) => setFormProf({ ...formProf, nome: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="especialidade-prof">Especialidade *</Label>
                  <Select
                    value={formProf.especialidade_id}
                    onValueChange={(value) => setFormProf({ ...formProf, especialidade_id: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma especialidade" />
                    </SelectTrigger>
                    <SelectContent>
                      {especialidades.map((esp) => (
                        <SelectItem key={esp.id} value={esp.id.toString()}>
                          {esp.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefone-prof">Telefone *</Label>
                  <Input 
                    id="telefone-prof" 
                    placeholder="(00) 00000-0000"
                    value={formProf.telefone}
                    onChange={(e) => setFormProf({ ...formProf, telefone: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="imagem-prof">URL da Imagem</Label>
                  <Input 
                    id="imagem-prof" 
                    placeholder="https://exemplo.com/foto.jpg"
                    value={formProf.imagem}
                    onChange={(e) => setFormProf({ ...formProf, imagem: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="obs-prof">Observações</Label>
                  <Textarea 
                    id="obs-prof" 
                    placeholder="Informações adicionais sobre o profissional"
                    value={formProf.observacoes}
                    onChange={(e) => setFormProf({ ...formProf, observacoes: e.target.value })}
                  />
                </div>
                <Button 
                  onClick={editingProfissional ? handleUpdateProfissional : handleCreateProfissional} 
                  className="w-full" 
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Salvando...
                    </>
                  ) : editingProfissional ? "Atualizar Profissional" : "Cadastrar Profissional"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Table */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead className="hidden md:table-cell">Especialidade</TableHead>
                <TableHead className="hidden lg:table-cell">Telefone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProfissionais.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    Nenhum profissional encontrado
                  </TableCell>
                </TableRow>
              ) : (
                filteredProfissionais.map((prof) => (
                  <TableRow key={prof.id}>
                    <TableCell className="font-medium">{prof.nome}</TableCell>
                    <TableCell className="hidden md:table-cell">{prof.especialidade_nome}</TableCell>
                    <TableCell className="hidden lg:table-cell">{prof.telefone}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          prof.ativo === 1
                            ? "bg-green-100 text-green-800 border-green-200"
                            : "bg-gray-100 text-gray-800 border-gray-200"
                        }
                      >
                        {prof.ativo === 1 ? "Ativo" : "Inativo"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => openEditProfissional(prof)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-destructive"
                          onClick={() => handleDeleteProfissional(prof.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default GerenciarEspecialidades;