import { useState } from "react";
import { Users, Stethoscope, FileText, Home, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import GerenciarAdesao from "@/components/admin/GerenciarAdesao";
import GerenciarEspecialidades from "@/components/admin/GerenciarEspecialidades";
import GerenciarUsuarios from "@/components/admin/GerenciarUsuarios";

type AdminSection = "adesao" | "especialidades" | "usuarios";

const menuItems = [
  { id: "adesao" as AdminSection, label: "Gerenciar Adesão", icon: FileText },
  { id: "especialidades" as AdminSection, label: "Especialidades e Profissionais", icon: Stethoscope },
  { id: "usuarios" as AdminSection, label: "Usuários", icon: Users },
];

const Painel = () => {
  const [activeSection, setActiveSection] = useState<AdminSection>("adesao");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderContent = () => {
    switch (activeSection) {
      case "adesao":
        return <GerenciarAdesao />;
      case "especialidades":
        return <GerenciarEspecialidades />;
      case "usuarios":
        return <GerenciarUsuarios />;
      default:
        return <GerenciarAdesao />;
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-0 md:w-16"
        } bg-card border-r border-border transition-all duration-300 flex flex-col fixed md:relative h-full z-50`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          {sidebarOpen && (
            <Link to="/">
              <img src={logo} alt="Hospicard" className="h-10" />
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="ml-auto"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors text-left ${
                activeSection === item.id
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted text-foreground"
              }`}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Back to Site */}
        <div className="p-2 border-t border-border">
          <Link to="/">
            <button className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-muted text-foreground transition-colors">
              <Home className="h-5 w-5 flex-shrink-0" />
              {sidebarOpen && <span className="text-sm font-medium">Voltar ao Site</span>}
            </button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 ${sidebarOpen ? "md:ml-0" : ""}`}>
        {/* Header */}
        <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold text-foreground">
              {menuItems.find((item) => item.id === activeSection)?.label}
            </h1>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-6">{renderContent()}</div>
      </main>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Painel;
