import { 
  TrendingUp, 
  AlertTriangle, 
  Package, 
  DollarSign,
  FileText,
  Download,
  BarChart3,
  Users,
  Clock
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { UserRole } from '../../App';

interface DashboardProps {
  userRole: UserRole;
}

const ventasDiarias = [
  { dia: 'Lun', ventas: 48500 },
  { dia: 'Mar', ventas: 62300 },
  { dia: 'Mié', ventas: 55800 },
  { dia: 'Jue', ventas: 71200 },
  { dia: 'Vie', ventas: 89400 },
  { dia: 'Sáb', ventas: 34600 },
];

const inventarioCritico = [
  { sku: 'TRN-HEX-10', nombre: 'Tornillos Hexagonales 10mm', stock: 45, minimo: 200 },
  { sku: 'LUB-IND-X5', nombre: 'Lubricante Industrial X5', stock: 12, minimo: 50 },
  { sku: 'CJN-ROD-25', nombre: 'Cojinetes de Rodillos 25mm', stock: 8, minimo: 30 },
  { sku: 'FLT-AIRE-H13', nombre: 'Filtros de Aire HEPA H13', stock: 23, minimo: 100 },
];

const pedidosPendientes = [
  { id: 'PED-2891', cliente: 'Industrias MetalCorp', items: 12, estado: 'En Preparación' },
  { id: 'PED-2892', cliente: 'Manufacturas del Este', items: 8, estado: 'Recibido' },
  { id: 'PED-2893', cliente: 'Distribuciones Omega', items: 15, estado: 'En Preparación' },
  { id: 'PED-2894', cliente: 'Tecno-Industrial SAC', items: 6, estado: 'Recibido' },
];

const reportesGerenciales = [
  { 
    id: 'RPT-001', 
    titulo: 'Informe Mensual de Ventas',
    departamento: 'Gerencia Comercial',
    fecha: '14/01/2026 09:30',
    tipo: 'Ventas',
    prioridad: 'Alta'
  },
  { 
    id: 'RPT-002', 
    titulo: 'Análisis de Rotación de Inventario',
    departamento: 'Gerencia de Operaciones',
    fecha: '14/01/2026 08:15',
    tipo: 'Operaciones',
    prioridad: 'Media'
  },
  { 
    id: 'RPT-003', 
    titulo: 'Estado Financiero - Enero 2026',
    departamento: 'Gerencia Administrativa',
    fecha: '13/01/2026 16:45',
    tipo: 'Finanzas',
    prioridad: 'Alta'
  },
  { 
    id: 'RPT-004', 
    titulo: 'Indicadores de Marketing Digital',
    departamento: 'Mercadeo',
    fecha: '13/01/2026 14:20',
    tipo: 'Marketing',
    prioridad: 'Media'
  },
  { 
    id: 'RPT-005', 
    titulo: 'Reporte de Capacitación del Personal',
    departamento: 'Gerencia de RRHH',
    fecha: '12/01/2026 11:00',
    tipo: 'RRHH',
    prioridad: 'Baja'
  }
];

export function Dashboard({ userRole }: DashboardProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-800">Dashboard Gerencial</h1>
          <p className="text-slate-600 mt-1">Vista general del sistema</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors">
          <Download className="w-4 h-4" />
          Generar Reporte Consolidado
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-900" />
            </div>
            <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">+12.5%</span>
          </div>
          <p className="text-sm text-slate-600">Ventas del Mes</p>
          <p className="text-slate-900 mt-1">Bs. 3,847,250</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded">Crítico</span>
          </div>
          <p className="text-sm text-slate-600">Items Bajo Stock</p>
          <p className="text-slate-900 mt-1">4 Productos</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Package className="w-6 h-6 text-green-700" />
            </div>
            <span className="text-xs text-slate-600 bg-slate-100 px-2 py-1 rounded">Hoy</span>
          </div>
          <p className="text-sm text-slate-600">Pedidos Pendientes</p>
          <p className="text-slate-900 mt-1">12 Ordenes</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-slate-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-slate-700" />
            </div>
            <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">Positivo</span>
          </div>
          <p className="text-sm text-slate-600">Flujo de Caja</p>
          <p className="text-slate-900 mt-1">Bs. 1,245,800</p>
        </div>
      </div>

      {/* Gráfico de Ventas */}
      <div className="bg-white p-6 rounded-xl border border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-slate-800">Ventas de la Semana</h2>
          <select className="px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-700">
            <option>Última Semana</option>
            <option>Último Mes</option>
            <option>Último Trimestre</option>
          </select>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={ventasDiarias}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="dia" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #e2e8f0',
                borderRadius: '8px'
              }}
              formatter={(value) => `Bs. ${value.toLocaleString()}`}
            />
            <Bar dataKey="ventas" fill="#1e3a8a" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inventario Crítico */}
        <div className="bg-white p-6 rounded-xl border border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-orange-100 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
            </div>
            <h2 className="text-slate-800">Inventario Crítico</h2>
          </div>
          <div className="space-y-3">
            {inventarioCritico.map((item) => (
              <div key={item.sku} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-sm text-slate-700">{item.nombre}</p>
                    <p className="text-xs text-slate-500 mt-1">SKU: {item.sku}</p>
                  </div>
                  <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">
                    Bajo
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <div className="flex-1 bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-orange-500 h-full rounded-full"
                      style={{ width: `${(item.stock / item.minimo) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-slate-600">{item.stock}/{item.minimo}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pedidos Pendientes */}
        <div className="bg-white p-6 rounded-xl border border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="w-5 h-5 text-blue-900" />
            </div>
            <h2 className="text-slate-800">Pedidos Pendientes de Despacho</h2>
          </div>
          <div className="space-y-3">
            {pedidosPendientes.map((pedido) => (
              <div key={pedido.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200 hover:border-blue-300 cursor-pointer transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-slate-700">{pedido.id}</p>
                  <span className={`text-xs px-2 py-1 rounded ${
                    pedido.estado === 'En Preparación' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-slate-200 text-slate-700'
                  }`}>
                    {pedido.estado}
                  </span>
                </div>
                <p className="text-sm text-slate-600">{pedido.cliente}</p>
                <p className="text-xs text-slate-500 mt-1">{pedido.items} items</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reportes Gerenciales - Solo para Dirección General */}
      {userRole === 'Dirección General' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <BarChart3 className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h2 className="text-slate-800">Reportes de Control de Gestión</h2>
                <p className="text-sm text-slate-500">Informes enviados por las gerencias</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Clock className="w-4 h-4" />
              <span>Últimas 48h</span>
            </div>
          </div>
          <div className="space-y-3">
            {reportesGerenciales.map((reporte) => (
              <div key={reporte.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200 hover:border-purple-300 cursor-pointer transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-slate-800">{reporte.titulo}</p>
                      <span className={`text-xs px-2 py-1 rounded ${
                        reporte.prioridad === 'Alta' 
                          ? 'bg-red-100 text-red-700' 
                          : reporte.prioridad === 'Media'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-slate-200 text-slate-600'
                      }`}>
                        {reporte.prioridad}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-600">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {reporte.departamento}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {reporte.fecha}
                      </span>
                    </div>
                  </div>
                  <button className="ml-4 p-2 hover:bg-slate-200 rounded-lg transition-colors">
                    <Download className="w-4 h-4 text-slate-600" />
                  </button>
                </div>
                <div className="mt-2">
                  <span className="text-xs bg-slate-200 text-slate-700 px-2 py-1 rounded">
                    {reporte.tipo}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-200 text-center">
            <button className="text-sm text-blue-900 hover:underline">
              Ver todos los reportes (28)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}