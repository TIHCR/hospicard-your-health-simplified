import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../src/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, Loader2, Shield, Users, HeartPulse } from 'lucide-react';
import hospicardLogo from '@/assets/logo.png';
import hospicardIcon from '@/assets/favicon.png';

const Login = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Usuário e senha são obrigatórios');
      return;
    }

    try {
      await login(username, password);
      navigate('/painel/adesao');
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-red-600 to-red-800 relative overflow-hidden flex-col justify-between p-12">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-white blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center">
          {/* Logo */}
          <div className="mb-12">
            <img 
              src={hospicardLogo} 
              alt="HospiCard" 
              className="h-20 w-auto brightness-0 invert opacity-95"
            />
          </div>

          {/* Welcome Text */}
          <div className="space-y-6 text-white">
            <h1 className="text-4xl xl:text-5xl font-bold leading-tight">
              Bem-vindo ao<br />
              Painel Administrativo
            </h1>
            <p className="text-lg opacity-90 max-w-md leading-relaxed">
              Gerencie adesões, usuários e todo o sistema de cartões de saúde de forma simples e eficiente.
            </p>
          </div>

          {/* Features */}
          <div className="mt-12 space-y-4">
            <div className="flex items-center gap-4 text-white/90">
              <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-medium">Gestão completa de usuários</span>
            </div>
            <div className="flex items-center gap-4 text-white/90">
              <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur flex items-center justify-center flex-shrink-0">
                <HeartPulse className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-medium">Controle de adesões e benefícios</span>
            </div>
            <div className="flex items-center gap-4 text-white/90">
              <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-medium">Segurança e privacidade garantidas</span>
            </div>
          </div>
        </div>

        {/* Bottom decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-red-700/20 to-transparent" />
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 p-6 sm:p-12 relative">
        {/* Floating Icon - Top */}
        <div className="absolute top-8 opacity-20 animate-pulse pointer-events-none">
          <img 
            src={hospicardIcon} 
            alt="" 
            className="w-24 h-24"
          />
        </div>

        <div className="w-full max-w-md relative z-10">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-12 text-center pt-8">
            <img 
              src={hospicardLogo} 
              alt="HospiCard" 
              className="h-16 w-auto mx-auto"
            />
          </div>

          {/* Form Card */}
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Acessar Painel
              </h2>
              <p className="text-gray-600">
                Entre com suas credenciais para continuar
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <p className="text-red-700 text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium text-gray-900">
                  Usuário
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Digite seu usuário"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading}
                  className="w-full h-12 px-4 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-900">
                  Senha
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="w-full h-12 px-4 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-lg shadow-red-600/25 hover:shadow-xl hover:shadow-red-600/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  'Entrar'
                )}
              </Button>
            </form>

            {/* Footer Info */}
            <div className="pt-6 border-t border-gray-200">
              <div className="text-center text-xs text-gray-600 space-y-1">
                <p>Use as credenciais fornecidas pelo administrador do sistema</p>
                <p className="text-gray-500">Você será redirecionado para gerenciar adesões</p>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 text-center">
            <p className="text-xs text-gray-500">
              © 2025 HospiCard. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;