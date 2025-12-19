import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/react_protected_route";
import Index from "./pages/Index";
import Painel from "./pages/Painel";
import Login from "../src/react_login_page";
import NotFound from "./pages/NotFound";
import EnvioAdesao from "@/components/EnvioAdesao";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            {/* Rotas Públicas */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            
            {/* Rotas Protegidas */}
            {/* ✅ ADICIONADO: Rota com parâmetro opcional para seção */}
            <Route
              path="/painel/:section?"
              element={
                <ProtectedRoute>
                  <Painel />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/envioadesao"
              element={
                  <EnvioAdesao />
              }
            />
            
            {/* Rota 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;