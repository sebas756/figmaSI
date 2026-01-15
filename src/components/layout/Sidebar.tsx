import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  DollarSign, 
  Users,
  GraduationCap,
  MessageSquare,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import type { UserRole } from '../../App';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  userRole: UserRole;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: UserRole[];
}

const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    roles: ['Dirección General', 'Gerencia de Operaciones', 'Gerencia Comercial', 'Mercadeo', 'Gerencia Administrativa', 'Gerencia de RRHH']
  },
  {
    id: 'inventario',
    label: 'Operaciones & Inventario',
    icon: Package,
    roles: ['Dirección General', 'Gerencia de Operaciones']
  },
  {
    id: 'ventas',
    label: 'Ventas & CRM',
    icon: ShoppingCart,
    roles: ['Dirección General', 'Gerencia Comercial', 'Mercadeo']
  },
  {
    id: 'facturacion',
    label: 'Administración & Finanzas',
    icon: DollarSign,
    roles: ['Dirección General', 'Gerencia Administrativa']
  },
  {
    id: 'rrhh',
    label: 'Recursos Humanos',
    icon: Users,
    roles: ['Dirección General', 'Gerencia de RRHH']
  },
  {
    id: 'lms',
    label: 'Academia NEXUS',
    icon: GraduationCap,
    roles: ['Dirección General', 'Gerencia de Operaciones', 'Gerencia Comercial', 'Mercadeo', 'Gerencia Administrativa', 'Gerencia de RRHH']
  },
  {
    id: 'mensajeria',
    label: 'Mensajería',
    icon: MessageSquare,
    roles: ['Dirección General', 'Gerencia de Operaciones', 'Gerencia Comercial', 'Mercadeo', 'Gerencia Administrativa', 'Gerencia de RRHH']
  }
];

export function Sidebar({ currentView, onNavigate, userRole, collapsed, onToggleCollapse }: SidebarProps) {
  const filteredItems = menuItems.filter(item => item.roles.includes(userRole));

  return (
    <aside className={`bg-slate-900 text-white transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'} flex flex-col`}>
      <div className="p-6 border-b border-slate-800 flex items-center justify-between">
        {!collapsed && (
          <div>
            <h2 className="text-white">NEXUS</h2>
            <p className="text-xs text-slate-400">Intranet Corporativa</p>
          </div>
        )}
        <button
          onClick={onToggleCollapse}
          className="p-2 hover:bg-slate-800 rounded-lg transition-colors ml-auto"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {filteredItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-blue-600 text-white' 
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
              title={collapsed ? item.label : ''}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="text-sm">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className={`px-4 py-3 bg-slate-800 rounded-lg ${collapsed ? 'text-center' : ''}`}>
          <p className="text-xs text-slate-400">
            {collapsed ? 'v2.1' : 'Sistema v2.1.0'}
          </p>
        </div>
      </div>
    </aside>
  );
}