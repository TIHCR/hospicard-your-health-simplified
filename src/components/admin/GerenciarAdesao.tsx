import { useState, useEffect } from "react";
import { Search, Plus, Edit, Trash2, Eye, Loader2, AlertCircle } from "lucide-react";
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
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import api from "@/config/api";

interface Cliente {
  id: number;
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
  data_cadastro: string;
}

const GerenciarAdesao = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [clienteToDelete, setClienteToDelete] = useState<Cliente | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Buscar clientes da API usando axios
  const fetchClientes = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await api.get('/clientes.php');
      setClientes(Array.isArray(response.data) ? response.data : []);
    } catch (err: any) {
      console.error('Erro ao buscar clientes:', err);
      setError(err.response?.data?.message || 'Não foi possível carregar os clientes. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const filteredClientes = clientes.filter(
    (cliente) =>
      cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.cpf.includes(searchTerm) ||
      cliente.telefone.includes(searchTerm) ||
      cliente.plano.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewCliente = (cliente: Cliente) => {
    setSelectedCliente(cliente);
    setIsViewDialogOpen(true);
  };

  const handleDeleteClick = (cliente: Cliente) => {
    setClienteToDelete(cliente);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!clienteToDelete) return;

    setDeleting(true);
    try {
      await api.delete('/clientes.php', {
        data: { id: clienteToDelete.id }
      });

      // Atualizar lista local
      setClientes(clientes.filter(c => c.id !== clienteToDelete.id));
      setIsDeleteDialogOpen(false);
      setClienteToDelete(null);
    } catch (err: any) {
      console.error('Erro ao excluir:', err);
      alert(err.response?.data?.message || 'Erro ao excluir cliente. Tente novamente.');
    } finally {
      setDeleting(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const extractCategoria = (plano: string) => {
    // Extrair categoria do formato "Categoria MASTER (descrição) - R$ 139,00"
    const match = plano.match(/Categoria\s+(\w+)/i);
    return match ? match[1] : plano.split(' ')[0] || 'N/A';
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Carregando adesões...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4 max-w-md">
          <AlertCircle className="w-12 h-12 mx-auto text-destructive" />
          <p className="text-foreground font-semibold">Erro ao carregar</p>
          <p className="text-muted-foreground">{error}</p>
          <Button onClick={fetchClientes}>Tentar Novamente</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card p-6 rounded-xl border border-border">
          <p className="text-sm text-muted-foreground mb-1">Total de Adesões</p>
          <p className="text-3xl font-bold text-foreground">{clientes.length}</p>
        </div>
        <div className="bg-card p-6 rounded-xl border border-border">
          <p className="text-sm text-muted-foreground mb-1">Últimos 30 dias</p>
          <p className="text-3xl font-bold text-primary">
            {clientes.filter((c) => {
              const thirtyDaysAgo = new Date();
              thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
              return new Date(c.data_cadastro) >= thirtyDaysAgo;
            }).length}
          </p>
        </div>
        <div className="bg-card p-6 rounded-xl border border-border">
          <p className="text-sm text-muted-foreground mb-1">Categoria Mais Popular</p>
          <p className="text-xl font-bold text-secondary">
            {clientes.length > 0
              ? extractCategoria(
                  clientes
                    .map((c) => extractCategoria(c.plano))
                    .sort(
                      (a, b) =>
                        clientes.filter((c) => extractCategoria(c.plano) === b).length -
                        clientes.filter((c) => extractCategoria(c.plano) === a).length
                    )[0]
                )
              : 'N/A'}
          </p>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome, CPF, telefone ou plano..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button className="gap-2" onClick={() => window.location.href = '/envioadesao'}>
          <Plus className="h-4 w-4" />
          Nova Adesão
        </Button>
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        {filteredClientes.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">
            <p className="text-lg font-medium mb-2">Nenhuma adesão encontrada</p>
            <p className="text-sm">
              {searchTerm
                ? 'Tente ajustar os filtros de busca'
                : 'Clique em "Nova Adesão" para cadastrar o primeiro cliente'}
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>CPF</TableHead>
                <TableHead className="hidden md:table-cell">Telefone</TableHead>
                <TableHead className="hidden lg:table-cell">Categoria</TableHead>
                <TableHead className="hidden xl:table-cell">Data Adesão</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClientes.map((cliente) => (
                <TableRow key={cliente.id}>
                  <TableCell className="font-medium">{cliente.nome}</TableCell>
                  <TableCell>{cliente.cpf}</TableCell>
                  <TableCell className="hidden md:table-cell">{cliente.telefone || '-'}</TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                      {extractCategoria(cliente.plano)}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden xl:table-cell text-muted-foreground">
                    {formatDate(cliente.data_cadastro)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleViewCliente(cliente)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => handleDeleteClick(cliente)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalhes da Adesão</DialogTitle>
          </DialogHeader>
          {selectedCliente && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs">Nome Completo</Label>
                  <p className="font-medium">{selectedCliente.nome}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs">Data de Nascimento</Label>
                  <p className="font-medium">{formatDate(selectedCliente.data_nascimento)}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs">CPF</Label>
                  <p className="font-medium">{selectedCliente.cpf}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs">RG</Label>
                  <p className="font-medium">{selectedCliente.rg || '-'}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs">Telefone</Label>
                  <p className="font-medium">{selectedCliente.telefone || '-'}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs">Estado Civil</Label>
                  <p className="font-medium">{selectedCliente.estado_civil || '-'}</p>
                </div>
                <div className="space-y-2 col-span-2">
                  <Label className="text-muted-foreground text-xs">Nome do Pai</Label>
                  <p className="font-medium">{selectedCliente.nome_pai || '-'}</p>
                </div>
                <div className="space-y-2 col-span-2">
                  <Label className="text-muted-foreground text-xs">Nome da Mãe</Label>
                  <p className="font-medium">{selectedCliente.nome_mae || '-'}</p>
                </div>
                <div className="space-y-2 col-span-2">
                  <Label className="text-muted-foreground text-xs">Endereço</Label>
                  <p className="font-medium">{selectedCliente.endereco || '-'}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs">Cidade</Label>
                  <p className="font-medium">{selectedCliente.cidade || '-'}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs">Estado</Label>
                  <p className="font-medium">{selectedCliente.estado || '-'}</p>
                </div>
                <div className="space-y-2 col-span-2">
                  <Label className="text-muted-foreground text-xs">Profissão</Label>
                  <p className="font-medium">{selectedCliente.profissao_trabalho || '-'}</p>
                </div>
              </div>
              
              <div className="border-t pt-4 space-y-3">
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs">Plano Contratado</Label>
                  <p className="font-medium text-primary">{selectedCliente.plano}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs">Forma de Pagamento</Label>
                  <p className="font-medium">{selectedCliente.forma_pagamento || '-'}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs">Data de Cadastro</Label>
                  <p className="font-medium">{formatDate(selectedCliente.data_cadastro)}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir a adesão de{' '}
              <strong>{clienteToDelete?.nome}</strong>? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={deleting}
              className="bg-destructive hover:bg-destructive/90"
            >
              {deleting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Excluindo...
                </>
              ) : (
                'Excluir'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default GerenciarAdesao;
