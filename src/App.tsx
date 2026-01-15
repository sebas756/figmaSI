import { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { Login } from './components/Login';
import { Dashboard } from './components/dashboard/Dashboard';
import { Inventario } from './components/operaciones/Inventario';
import { Ventas } from './components/ventas/Ventas';
import { Facturacion } from './components/administracion/Facturacion';
import { RecursosHumanos } from './components/rrhh/RecursosHumanos';
import { LMS } from './components/lms/LMS';
import { Mensajeria } from './components/mensajeria/Mensajeria';

export type UserRole = 
  | 'Dirección General' 
  | 'Gerencia de Operaciones' 
  | 'Gerencia Comercial' 
  | 'Mercadeo' 
  | 'Gerencia Administrativa' 
  | 'Gerencia de RRHH'
  | null;

export interface User {
  name: string;
  role: UserRole;
  avatar: string;
}

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<string>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('dashboard');
  };

  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard userRole={currentUser.role} />;
      case 'inventario':
        return <Inventario userRole={currentUser.role} />;
      case 'ventas':
        return <Ventas userRole={currentUser.role} />;
      case 'facturacion':
        return <Facturacion userRole={currentUser.role} />;
      case 'rrhh':
        return <RecursosHumanos userRole={currentUser.role} />;
      case 'lms':
        return <LMS userRole={currentUser.role} />;
      case 'mensajeria':
        return <Mensajeria />;
      default:
        return <Dashboard userRole={currentUser.role} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        currentView={currentView}
        onNavigate={setCurrentView}
        userRole={currentUser.role}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={currentUser} onLogout={handleLogout} />
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}