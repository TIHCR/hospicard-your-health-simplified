import { useState } from "react";
import { Search, Plus, Edit, Trash2, Shield, ShieldCheck } from "lucide-react";
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

interface Usuario {
  id: string;
  nome: string;
  email: string;
  role: "admin" | "moderador" | "usuario";
  status: "ativo" | "inativo";
  ultimoAcesso: string;
}

const mockUsuarios: Usuario[] = [
  {
    id: "1",
    nome: "Admin Sistema",
    email: "admin@hospicard.com",
    role: "admin",
    status: "ativo",
    ultimoAcesso: "2024-03-15 14:30",
  },
  {
    id: "2",
    nome: "Maria Gestora",
    email: "maria@hospicard.com",
    role: "moderador",
    status: "ativo",
    ultimoAcesso: "2024-03-15 10:15",
  },
  {
    id: "3",
    nome: "João Atendente",
    email: "joao@hospicard.com",
    role: "usuario",
    status: "ativo",
    ultimoAcesso: "2024-03-14 16:45",
  },
  {
    id: "4",
    nome: "Ana Suporte",
    email: "ana@hospicard.com",
    role: "usuario",
    status: "inativo",
    ultimoAcesso: "2024-02-20 09:00",
  },
];

const GerenciarUsuarios = () => {
  const [usuarios] = useState<Usuario[]>(mockUsuarios);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredUsuarios = usuarios.filter(
    (usuario) =>
      usuario.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleBadge = (role: Usuario["role"]) => {
    const config = {
      admin: { label: "Admin", className: "bg-purple-100 text-purple-800 border-purple-200", icon: ShieldCheck },
      moderador: { label: "Moderador", className: "bg-blue-100 text-blue-800 border-blue-200", icon: Shield },
      usuario: { label: "Usuário", className: "bg-gray-100 text-gray-800 border-gray-200", icon: null },
    };
    const { label, className, icon: Icon } = config[role];
    return (
      <Badge variant="outline" className={`${className} gap-1`}>
        {Icon && <Icon className="h-3 w-3" />}
        {label}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card p-4 rounded-xl border border-border">
          <p className="text-sm text-muted-foreground">Total de Usuários</p>
          <p className="text-2xl font-bold text-foreground">{usuarios.length}</p>
        </div>
        <div className="bg-card p-4 rounded-xl border border-border">
          <p className="text-sm text-muted-foreground">Administradores</p>
          <p className="text-2xl font-bold text-purple-600">
            {usuarios.filter((u) => u.role === "admin").length}
          </p>
        </div>
        <div className="bg-card p-4 rounded-xl border border-border">
          <p className="text-sm text-muted-foreground">Moderadores</p>
          <p className="text-2xl font-bold text-blue-600">
            {usuarios.filter((u) => u.role === "moderador").length}
          </p>
        </div>
        <div className="bg-card p-4 rounded-xl border border-border">
          <p className="text-sm text-muted-foreground">Ativos</p>
          <p className="text-2xl font-bold text-green-600">
            {usuarios.filter((u) => u.status === "ativo").length}
          </p>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Novo Usuário
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Novo Usuário</DialogTitle>
            </DialogHeader>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome Completo</Label>
                <Input id="nome" placeholder="Digite o nome" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="email@hospicard.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="senha">Senha</Label>
                <Input id="senha" type="password" placeholder="••••••••" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Tipo de Usuário</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="moderador">Moderador</SelectItem>
                    <SelectItem value="usuario">Usuário</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full">
                Cadastrar Usuário
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
              <TableHead>Email</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead className="hidden md:table-cell">Último Acesso</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsuarios.map((usuario) => (
              <TableRow key={usuario.id}>
                <TableCell className="font-medium">{usuario.nome}</TableCell>
                <TableCell>{usuario.email}</TableCell>
                <TableCell>{getRoleBadge(usuario.role)}</TableCell>
                <TableCell className="hidden md:table-cell text-muted-foreground">
                  {usuario.ultimoAcesso}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      usuario.status === "ativo"
                        ? "bg-green-100 text-green-800 border-green-200"
                        : "bg-gray-100 text-gray-800 border-gray-200"
                    }
                  >
                    {usuario.status === "ativo" ? "Ativo" : "Inativo"}
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
    </div>
  );
};

export default GerenciarUsuarios;
