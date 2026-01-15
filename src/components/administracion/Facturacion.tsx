import { useState } from 'react';
import { 
  FileText, 
  AlertCircle, 
  CheckCircle, 
  Clock,
  DollarSign,
  Calendar
} from 'lucide-react';
import type { UserRole } from '../../App';

interface FacturacionProps {
  userRole: UserRole;
}

interface OrdenAprobada {
  id: string;
  cliente: string;
  fecha: string;
  total: number;
  items: number;
  vendedor: string;
}

interface CuentaPorCobrar {
  id: string;
  cliente: string;
  monto: number;
  fechaEmision: string;
  fechaVencimiento: string;
  diasVencida: number;
  estado: 'Al Día' | 'Por Vencer' | 'Vencida';
}

const ordenesAprobadas: OrdenAprobada[] = [
  { id: 'ORD-2891', cliente: 'Industrias MetalCorp', fecha: '2025-12-11', total: 12450.00, items: 12, vendedor: 'Ana López' },
  { id: 'ORD-2890', cliente: 'Manufacturas del Este', fecha: '2025-12-11', total: 8320.50, items: 8, vendedor: 'Ana López' },
  { id: 'ORD-2887', cliente: 'Construcciones del Sur', fecha: '2025-12-10', total: 24680.75, items: 18, vendedor: 'Ana López' },
  { id: 'ORD-2885', cliente: 'Tecno-Industrial SAC', fecha: '2025-12-10', total: 6540.00, items: 6, vendedor: 'Ana López' },
];

const cuentasPorCobrar: CuentaPorCobrar[] = [
  { 
    id: 'FAC-1923', 
    cliente: 'Distribuciones Omega', 
    monto: 15670.00, 
    fechaEmision: '2025-11-15', 
    fechaVencimiento: '2025-12-15',
    diasVencida: 0,
    estado: 'Por Vencer' 
  },
  { 
    id: 'FAC-1918', 
    cliente: 'Industrias del Norte', 
    monto: 8920.50, 
    fechaEmision: '2025-10-28', 
    fechaVencimiento: '2025-11-28',
    diasVencida: 13,
    estado: 'Vencida' 
  },
  { 
    id: 'FAC-1910', 
    cliente: 'Manufacturas del Este', 
    monto: 12340.00, 
    fechaEmision: '2025-11-01', 
    fechaVencimiento: '2025-12-01',
    diasVencida: 10,
    estado: 'Vencida' 
  },
  { 
    id: 'FAC-1935', 
    cliente: 'Tecno-Industrial SAC', 
    monto: 6540.00, 
    fechaEmision: '2025-12-05', 
    fechaVencimiento: '2026-01-05',
    diasVencida: 0,
    estado: 'Al Día' 
  },
];

export function Facturacion({ userRole }: FacturacionProps) {
  const [selectedOrden, setSelectedOrden] = useState<string | null>(null);
  const [showFacturaModal, setShowFacturaModal] = useState(false);

  const generarFactura = (ordenId: string) => {
    setSelectedOrden(ordenId);
    setShowFacturaModal(true);
  };

  const getEstadoColor = (estado: CuentaPorCobrar['estado']) => {
    switch (estado) {
      case 'Al Día': return 'bg-green-100 text-green-700';
      case 'Por Vencer': return 'bg-orange-100 text-orange-700';
      case 'Vencida': return 'bg-red-100 text-red-700';
    }
  };

  const totalPorCobrar = cuentasPorCobrar.reduce((acc, cuenta) => acc + cuenta.monto, 0);
  const totalVencidas = cuentasPorCobrar.filter(c => c.estado === 'Vencida').reduce((acc, cuenta) => acc + cuenta.monto, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-slate-800">Administración & Finanzas</h1>
        <p className="text-slate-600 mt-1">Gestión de facturación y cuentas por cobrar</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-blue-900" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Total por Cobrar</p>
              <p className="text-slate-900">Bs. {totalPorCobrar.toLocaleString('es-VE', { minimumFractionDigits: 2 })}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Facturas Vencidas</p>
              <p className="text-slate-900">Bs. {totalVencidas.toLocaleString('es-VE', { minimumFractionDigits: 2 })}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <FileText className="w-6 h-6 text-green-700" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Órdenes por Facturar</p>
              <p className="text-slate-900">{ordenesAprobadas.length} órdenes</p>
            </div>
          </div>
        </div>
      </div>

      {/* Órdenes Aprobadas por Ventas */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-slate-800 mb-6">Órdenes Aprobadas - Listas para Facturar</h2>
        <div className="space-y-3">
          {ordenesAprobadas.map((orden) => (
            <div key={orden.id} className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <p className="text-slate-800">{orden.id}</p>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                      Aprobada por Ventas
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">{orden.cliente}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                    <span>Fecha: {orden.fecha}</span>
                    <span>Items: {orden.items}</span>
                    <span>Vendedor: {orden.vendedor}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-slate-900 mb-3">Bs. {orden.total.toLocaleString('es-VE', { minimumFractionDigits: 2 })}</p>
                  <button
                    onClick={() => generarFactura(orden.id)}
                    className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors text-sm"
                  >
                    Generar Factura Automática
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cuentas por Cobrar */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-orange-100 rounded-lg">
            <AlertCircle className="w-5 h-5 text-orange-600" />
          </div>
          <h2 className="text-slate-800">Panel de Cuentas por Cobrar</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Factura</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Cliente</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Monto</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Emisión</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Vencimiento</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {cuentasPorCobrar.map((cuenta) => (
                <tr key={cuenta.id} className="hover:bg-slate-50">
                  <td className="px-4 py-4 text-sm text-slate-700">{cuenta.id}</td>
                  <td className="px-4 py-4 text-sm text-slate-700">{cuenta.cliente}</td>
                  <td className="px-4 py-4 text-sm text-slate-700">
                    Bs. {cuenta.monto.toLocaleString('es-VE', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-600">{cuenta.fechaEmision}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-700">{cuenta.fechaVencimiento}</span>
                    </div>
                    {cuenta.diasVencida > 0 && (
                      <p className="text-xs text-red-600 mt-1">{cuenta.diasVencida} días vencida</p>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      {cuenta.estado === 'Vencida' && <AlertCircle className="w-4 h-4 text-red-600" />}
                      {cuenta.estado === 'Por Vencer' && <Clock className="w-4 h-4 text-orange-600" />}
                      {cuenta.estado === 'Al Día' && <CheckCircle className="w-4 h-4 text-green-600" />}
                      <span className={`text-xs px-2 py-1 rounded ${getEstadoColor(cuenta.estado)}`}>
                        {cuenta.estado}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Generar Factura */}
      {showFacturaModal && selectedOrden && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-8 max-w-lg w-full">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-slate-800 mb-2">Factura Generada Exitosamente</h2>
              <p className="text-slate-600">La factura ha sido creada y enviada al cliente</p>
            </div>

            <div className="bg-slate-50 rounded-lg p-6 mb-6">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Orden Original:</span>
                  <span className="text-slate-800">{selectedOrden}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Factura Generada:</span>
                  <span className="text-slate-800">FAC-{Math.floor(Math.random() * 10000)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Fecha de Emisión:</span>
                  <span className="text-slate-800">2025-12-11</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Vencimiento:</span>
                  <span className="text-slate-800">2026-01-11</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowFacturaModal(false);
                  setSelectedOrden(null);
                }}
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Cerrar
              </button>
              <button
                onClick={() => {
                  setShowFacturaModal(false);
                  setSelectedOrden(null);
                }}
                className="flex-1 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
              >
                Descargar PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
