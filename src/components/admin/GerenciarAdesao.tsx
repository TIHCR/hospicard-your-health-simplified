import { useState } from "react";
import { Search, Plus, Edit, Trash2, Eye } from "lucide-react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Adesao {
  id: string;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  categoria: string;
  status: "ativo" | "pendente" | "cancelado";
  dataAdesao: string;
}

const mockAdesoes: Adesao[] = [
  {
    id: "1",
    nome: "João Silva",
    cpf: "123.456.789-00",
    email: "joao@email.com",
    telefone: "(54) 99999-0001",
    categoria: "Master",
    status: "ativo",
    dataAdesao: "2024-01-15",
  },
  {
    id: "2",
    nome: "Maria Santos",
    cpf: "987.654.321-00",
    email: "maria@email.com",
    telefone: "(54) 99999-0002",
    categoria: "Plus",
    status: "pendente",
    dataAdesao: "2024-02-20",
  },
  {
    id: "3",
    nome: "Pedro Oliveira",
    cpf: "456.789.123-00",
    email: "pedro@email.com",
    telefone: "(54) 99999-0003",
    categoria: "Grupo Familiar Plus",
    status: "ativo",
    dataAdesao: "2024-03-10",
  },
];

const GerenciarAdesao = () => {
  const [adesoes, setAdesoes] = useState<Adesao[]>(mockAdesoes);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredAdesoes = adesoes.filter(
    (adesao) =>
      adesao.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      adesao.cpf.includes(searchTerm) ||
      adesao.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: Adesao["status"]) => {
    const variants = {
      ativo: "bg-green-100 text-green-800 border-green-200",
      pendente: "bg-yellow-100 text-yellow-800 border-yellow-200",
      cancelado: "bg-red-100 text-red-800 border-red-200",
    };
    const labels = {
      ativo: "Ativo",
      pendente: "Pendente",
      cancelado: "Cancelado",
    };
    return (
      <Badge variant="outline" className={variants[status]}>
        {labels[status]}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card p-4 rounded-xl border border-border">
          <p className="text-sm text-muted-foreground">Total de Adesões</p>
          <p className="text-2xl font-bold text-foreground">{adesoes.length}</p>
        </div>
        <div className="bg-card p-4 rounded-xl border border-border">
          <p className="text-sm text-muted-foreground">Ativos</p>
          <p className="text-2xl font-bold text-green-600">
            {adesoes.filter((a) => a.status === "ativo").length}
          </p>
        </div>
        <div className="bg-card p-4 rounded-xl border border-border">
          <p className="text-sm text-muted-foreground">Pendentes</p>
          <p className="text-2xl font-bold text-yellow-600">
            {adesoes.filter((a) => a.status === "pendente").length}
          </p>
        </div>
        <div className="bg-card p-4 rounded-xl border border-border">
          <p className="text-sm text-muted-foreground">Cancelados</p>
          <p className="text-2xl font-bold text-red-600">
            {adesoes.filter((a) => a.status === "cancelado").length}
          </p>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome, CPF ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Nova Adesão
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Nova Adesão</DialogTitle>
            </DialogHeader>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome Completo</Label>
                <Input id="nome" placeholder="Digite o nome" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cpf">CPF</Label>
                <Input id="cpf" placeholder="000.000.000-00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="email@exemplo.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input id="telefone" placeholder="(00) 00000-0000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="categoria">Categoria</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="master">Master</SelectItem>
                    <SelectItem value="plus">Plus</SelectItem>
                    <SelectItem value="grupo-familiar">Grupo Familiar Plus</SelectItem>
                    <SelectItem value="socio-benemerito-plus">Sócio Benemérito Plus</SelectItem>
                    <SelectItem value="socio-benemerito-master">Sócio Benemérito Master</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full">
                Cadastrar Adesão
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
              <TableHead>CPF</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead className="hidden lg:table-cell">Categoria</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAdesoes.map((adesao) => (
              <TableRow key={adesao.id}>
                <TableCell className="font-medium">{adesao.nome}</TableCell>
                <TableCell>{adesao.cpf}</TableCell>
                <TableCell className="hidden md:table-cell">{adesao.email}</TableCell>
                <TableCell className="hidden lg:table-cell">{adesao.categoria}</TableCell>
                <TableCell>{getStatusBadge(adesao.status)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Eye className="h-4 w-4" />
                    </Button>
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
    </div>
  );
};

export default GerenciarAdesao;
