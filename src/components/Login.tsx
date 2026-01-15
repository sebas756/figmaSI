import { useState } from 'react';
import { Building2, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import type { User, UserRole } from '../App';

interface LoginProps {
  onLogin: (user: User) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // Credenciales de demostración por rol
  const demoCredentials = {
    'Dirección General': { 
      email: 'direccion@nexus.com', 
      password: 'director123', 
      name: 'Ricardo Salazar',
      description: 'Acceso Total - Supervisión Estratégica'
    },
    'Gerencia de Operaciones': { 
      email: 'operaciones@nexus.com', 
      password: 'operaciones123', 
      name: 'Miguel Torres',
      description: 'Inventario, Almacén y Distribución'
    },
    'Gerencia Comercial': { 
      email: 'comercial@nexus.com', 
      password: 'comercial123', 
      name: 'Ana López',
      description: 'Ventas, CRM y Atención al Cliente'
    },
    'Mercadeo': { 
      email: 'mercadeo@nexus.com', 
      password: 'mercadeo123', 
      name: 'Patricia Ruiz',
      description: 'Catálogos, Marca y Captación'
    },
    'Gerencia Administrativa': { 
      email: 'administrativa@nexus.com', 
      password: 'admin123', 
      name: 'Carlos Méndez',
      description: 'Contabilidad, Finanzas y Proveedores'
    },
    'Gerencia de RRHH': { 
      email: 'rrhh@nexus.com', 
      password: 'rrhh123', 
      name: 'Laura Fernández',
      description: 'Personal, Asistencia y Capacitación'
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validar credenciales
    const credential = Object.entries(demoCredentials).find(
      ([_, cred]) => cred.email === email && cred.password === password
    );

    if (credential) {
      const [role, userInfo] = credential;
      const user: User = {
        name: userInfo.name,
        role: role as UserRole,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${role}`
      };
      onLogin(user);
    } else {
      setError('Correo o contraseña incorrectos');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-900 rounded-xl mb-4">
            <Building2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-slate-800 mb-2">Distribuciones NEXUS C.A.</h1>
          <p className="text-slate-600">Intranet Corporativa</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Formulario de Login */}
          <div>
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Campo de Correo Electrónico */}
              <div>
                <label htmlFor="email" className="block text-slate-700 mb-2">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="usuario@nexus.com"
                    required
                    className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Campo de Contraseña */}
              <div>
                <label htmlFor="password" className="block text-slate-700 mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-11 pr-12 py-3 border border-slate-300 rounded-lg bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Mensaje de Error */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800 transition-colors font-medium"
              >
                Ingresar al Sistema
              </button>
            </form>
          </div>

          {/* Credenciales de Demostración */}
          <div className="bg-slate-50 rounded-lg p-6">
            <p className="text-sm text-slate-700 mb-4">Credenciales de Demostración:</p>
            <div className="space-y-3 text-xs max-h-96 overflow-y-auto">
              {Object.entries(demoCredentials).map(([role, cred]) => (
                <div key={role} className="bg-white p-3 rounded-lg border border-slate-200 hover:border-blue-300 transition-colors">
                  <p className="text-slate-800 mb-1"><strong>{role}</strong></p>
                  <p className="text-slate-600 text-xs mb-2 italic">{cred.description}</p>
                  <div className="space-y-1">
                    <p className="text-slate-600">👤 {cred.name}</p>
                    <p className="text-slate-600">📧 {cred.email}</p>
                    <p className="text-slate-600">🔑 {cred.password}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}