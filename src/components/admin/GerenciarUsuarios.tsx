import { useState, useEffect } from "react";
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
import api from "../../config/api";

interface Usuario {
  id: number;
  username: string;
  email: string;
  status: "ativo" | "inativo";
  created_at: string;
  role?: "admin" | "moderador" | "usuario";
}

const GerenciarUsuarios = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get("/usuarios.php");
      setUsuarios(response.data);
    } catch (err) {
      setError("Erro ao carregar usuários");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsuarios = usuarios.filter(
    (usuario) =>
      usuario.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleBadge = (role?: string) => {
    const roleMap = role || "usuario";
    const config = {
      admin: { label: "Admin", className: "bg-purple-100 text-purple-800 border-purple-200", icon: ShieldCheck },
      moderador: { label: "Moderador", className: "bg-blue-100 text-blue-800 border-blue-200", icon: Shield },
      usuario: { label: "Usuário", className: "bg-gray-100 text-gray-800 border-gray-200", icon: null },
    };
    const { label, className, icon: Icon } = config[roleMap as keyof typeof config] || config.usuario;
    return (
      <Badge variant="outline" className={`${className} gap-1`}>
        {Icon && <Icon className="h-3 w-3" />}
        {label}
      </Badge>
    );
  };

  const handleAddUsuario = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      await api.post("/usuarios.php", {
        username: formData.get("nome"),
        email: formData.get("email"),
        password: formData.get("senha"),
        role: formData.get("role"),
      });
      setIsDialogOpen(false);
      fetchUsuarios();
    } catch (err) {
      console.error("Erro ao adicionar usuário:", err);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Carregando usuários...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card p-4 rounded-xl border border-border">
          <p className="text-sm text-muted-foreground">Total de Usuários</p>
          <p className="text-2xl font-bold text-foreground">{usuarios.length}</p>
        </div>
        <div className="bg-card p-4 rounded-xl border border-border">
          <p className="text-sm text-muted-foreground">Ativos</p>
          <p className="text-2xl font-bold text-green-600">
            {usuarios.filter((u) => u.status === "ativo").length}
          </p>
        </div>
        <div className="bg-card p-4 rounded-xl border border-border">
          <p className="text-sm text-muted-foreground">Inativos</p>
          <p className="text-2xl font-bold text-red-600">
            {usuarios.filter((u) => u.status === "inativo").length}
          </p>
        </div>
        <div className="bg-card p-4 rounded-xl border border-border">
          <p className="text-sm text-muted-foreground">Último Cadastro</p>
          <p className="text-lg font-bold text-foreground">
            {usuarios.length > 0 ? new Date(usuarios[0].created_at).toLocaleDateString("pt-BR") : "-"}
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
            <form className="space-y-4" onSubmit={handleAddUsuario}>
              <div className="space-y-2">
                <Label htmlFor="nome">Nome Completo</Label>
                <Input id="nome" name="nome" placeholder="Digite o nome" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="email@hospicard.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="senha">Senha</Label>
                <Input id="senha" name="senha" type="password" placeholder="••••••••" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Tipo de Usuário</Label>
                <Select defaultValue="usuario">
                  <SelectTrigger>
                    <SelectValue />
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
        {error && (
          <div className="p-4 bg-red-50 text-red-800 border-b border-red-200">
            {error}
          </div>
        )}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Usuário</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="hidden md:table-cell">Cadastrado em</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsuarios.length > 0 ? (
              filteredUsuarios.map((usuario) => (
                <TableRow key={usuario.id}>
                  <TableCell className="font-medium">{usuario.username}</TableCell>
                  <TableCell>{usuario.email}</TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">
                    {new Date(usuario.created_at).toLocaleDateString("pt-BR")}
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
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  Nenhum usuário encontrado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default GerenciarUsuarios;