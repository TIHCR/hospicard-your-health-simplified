import { useState } from "react";
import { Search, Plus, Edit, Trash2, Stethoscope, User } from "lucide-react";
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

interface Especialidade {
  id: string;
  nome: string;
  descricao: string;
  profissionais: number;
}

interface Profissional {
  id: string;
  nome: string;
  crm: string;
  especialidade: string;
  telefone: string;
  status: "ativo" | "inativo";
}

const mockEspecialidades: Especialidade[] = [
  { id: "1", nome: "Cardiologia", descricao: "Especialidade do coração", profissionais: 5 },
  { id: "2", nome: "Ortopedia", descricao: "Especialidade óssea e muscular", profissionais: 3 },
  { id: "3", nome: "Pediatria", descricao: "Especialidade infantil", profissionais: 4 },
  { id: "4", nome: "Dermatologia", descricao: "Especialidade da pele", profissionais: 2 },
  { id: "5", nome: "Neurologia", descricao: "Especialidade do sistema nervoso", profissionais: 2 },
];

const mockProfissionais: Profissional[] = [
  { id: "1", nome: "Dr. Carlos Mendes", crm: "12345-RS", especialidade: "Cardiologia", telefone: "(54) 99999-1111", status: "ativo" },
  { id: "2", nome: "Dra. Ana Paula", crm: "23456-RS", especialidade: "Pediatria", telefone: "(54) 99999-2222", status: "ativo" },
  { id: "3", nome: "Dr. Roberto Lima", crm: "34567-RS", especialidade: "Ortopedia", telefone: "(54) 99999-3333", status: "ativo" },
  { id: "4", nome: "Dra. Fernanda Costa", crm: "45678-RS", especialidade: "Dermatologia", telefone: "(54) 99999-4444", status: "inativo" },
];

const GerenciarEspecialidades = () => {
  const [especialidades] = useState<Especialidade[]>(mockEspecialidades);
  const [profissionais] = useState<Profissional[]>(mockProfissionais);
  const [searchEspecialidade, setSearchEspecialidade] = useState("");
  const [searchProfissional, setSearchProfissional] = useState("");
  const [isEspecialidadeDialogOpen, setIsEspecialidadeDialogOpen] = useState(false);
  const [isProfissionalDialogOpen, setIsProfissionalDialogOpen] = useState(false);

  const filteredEspecialidades = especialidades.filter((esp) =>
    esp.nome.toLowerCase().includes(searchEspecialidade.toLowerCase())
  );

  const filteredProfissionais = profissionais.filter(
    (prof) =>
      prof.nome.toLowerCase().includes(searchProfissional.toLowerCase()) ||
      prof.crm.includes(searchProfissional) ||
      prof.especialidade.toLowerCase().includes(searchProfissional.toLowerCase())
  );

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
              {(profissionais.length / especialidades.length).toFixed(1)}
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
          <Dialog open={isEspecialidadeDialogOpen} onOpenChange={setIsEspecialidadeDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Nova Especialidade
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nova Especialidade</DialogTitle>
              </DialogHeader>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nome-esp">Nome da Especialidade</Label>
                  <Input id="nome-esp" placeholder="Ex: Cardiologia" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="descricao-esp">Descrição</Label>
                  <Input id="descricao-esp" placeholder="Descrição breve" />
                </div>
                <Button type="submit" className="w-full">
                  Cadastrar Especialidade
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Table */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Especialidade</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead className="text-center">Profissionais</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEspecialidades.map((esp) => (
                <TableRow key={esp.id}>
                  <TableCell className="font-medium">{esp.nome}</TableCell>
                  <TableCell className="text-muted-foreground">{esp.descricao}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant="secondary">{esp.profissionais}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
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
              {profissionais.filter((p) => p.status === "ativo").length}
            </p>
          </div>
          <div className="bg-card p-4 rounded-xl border border-border">
            <p className="text-sm text-muted-foreground">Inativos</p>
            <p className="text-2xl font-bold text-muted-foreground">
              {profissionais.filter((p) => p.status === "inativo").length}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, CRM ou especialidade..."
              value={searchProfissional}
              onChange={(e) => setSearchProfissional(e.target.value)}
              className="pl-10"
            />
          </div>
          <Dialog open={isProfissionalDialogOpen} onOpenChange={setIsProfissionalDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Novo Profissional
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Novo Profissional</DialogTitle>
              </DialogHeader>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nome-prof">Nome Completo</Label>
                  <Input id="nome-prof" placeholder="Ex: Dr. João Silva" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="crm">CRM</Label>
                  <Input id="crm" placeholder="00000-RS" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="especialidade-prof">Especialidade</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {especialidades.map((esp) => (
                        <SelectItem key={esp.id} value={esp.id}>
                          {esp.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefone-prof">Telefone</Label>
                  <Input id="telefone-prof" placeholder="(00) 00000-0000" />
                </div>
                <Button type="submit" className="w-full">
                  Cadastrar Profissional
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Table */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>CRM</TableHead>
                <TableHead className="hidden md:table-cell">Especialidade</TableHead>
                <TableHead className="hidden lg:table-cell">Telefone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProfissionais.map((prof) => (
                <TableRow key={prof.id}>
                  <TableCell className="font-medium">{prof.nome}</TableCell>
                  <TableCell>{prof.crm}</TableCell>
                  <TableCell className="hidden md:table-cell">{prof.especialidade}</TableCell>
                  <TableCell className="hidden lg:table-cell">{prof.telefone}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        prof.status === "ativo"
                          ? "bg-green-100 text-green-800 border-green-200"
                          : "bg-gray-100 text-gray-800 border-gray-200"
                      }
                    >
                      {prof.status === "ativo" ? "Ativo" : "Inativo"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default GerenciarEspecialidades;
