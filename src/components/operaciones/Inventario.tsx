import { useState } from 'react';
import { Search, Plus, MapPin, CheckCircle, Clock, Truck, Package } from 'lucide-react';
import type { UserRole } from '../../App';

interface InventarioProps {
  userRole: UserRole;
}

interface ProductoInventario {
  sku: string;
  nombre: string;
  stockReal: number;
  ubicacion: string;
  estado: 'Disponible' | 'Reservado' | 'En Tránsito';
  categoria: string;
}

interface Pedido {
  id: string;
  cliente: string;
  fecha: string;
  items: number;
  estado: 'Recibido' | 'En Preparación' | 'Despachado' | 'Entregado';
}

const productos: ProductoInventario[] = [
  { sku: 'TRN-HEX-10', nombre: 'Tornillos Hexagonales 10mm', stockReal: 45, ubicacion: 'A-12-03', estado: 'Disponible', categoria: 'Fijación' },
  { sku: 'TRN-HEX-8', nombre: 'Tornillos Hexagonales 8mm', stockReal: 340, ubicacion: 'A-12-02', estado: 'Disponible', categoria: 'Fijación' },
  { sku: 'LUB-IND-X5', nombre: 'Lubricante Industrial X5 (20L)', stockReal: 12, ubicacion: 'B-05-01', estado: 'Disponible', categoria: 'Lubricantes' },
  { sku: 'LUB-IND-X3', nombre: 'Lubricante Industrial X3 (5L)', stockReal: 87, ubicacion: 'B-05-02', estado: 'Disponible', categoria: 'Lubricantes' },
  { sku: 'CJN-ROD-25', nombre: 'Cojinetes de Rodillos 25mm', stockReal: 8, ubicacion: 'C-08-04', estado: 'Reservado', categoria: 'Rodamientos' },
  { sku: 'CJN-ROD-30', nombre: 'Cojinetes de Rodillos 30mm', stockReal: 56, ubicacion: 'C-08-05', estado: 'Disponible', categoria: 'Rodamientos' },
  { sku: 'FLT-AIRE-H13', nombre: 'Filtros de Aire HEPA H13', stockReal: 23, ubicacion: 'D-15-02', estado: 'Disponible', categoria: 'Filtración' },
  { sku: 'FLT-HIDR-HC', nombre: 'Filtros Hidráulicos Alta Capacidad', stockReal: 145, ubicacion: 'D-15-03', estado: 'Disponible', categoria: 'Filtración' },
  { sku: 'MNG-HIDR-3/4', nombre: 'Manguera Hidráulica 3/4"', stockReal: 230, ubicacion: 'E-20-01', estado: 'En Tránsito', categoria: 'Hidráulica' },
  { sku: 'VLV-BOLA-1', nombre: 'Válvula de Bola 1" Acero Inox', stockReal: 78, ubicacion: 'E-21-02', estado: 'Disponible', categoria: 'Válvulas' },
];

const pedidos: Pedido[] = [
  { id: 'PED-2891', cliente: 'Industrias MetalCorp', fecha: '2025-12-11', items: 12, estado: 'En Preparación' },
  { id: 'PED-2892', cliente: 'Manufacturas del Este', fecha: '2025-12-11', items: 8, estado: 'Recibido' },
  { id: 'PED-2893', cliente: 'Distribuciones Omega', fecha: '2025-12-10', items: 15, estado: 'Despachado' },
  { id: 'PED-2894', cliente: 'Tecno-Industrial SAC', fecha: '2025-12-10', items: 6, estado: 'Recibido' },
  { id: 'PED-2895', cliente: 'Construcciones del Sur', fecha: '2025-12-09', items: 20, estado: 'Entregado' },
];

export function Inventario({ userRole }: InventarioProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showIngresarModal, setShowIngresarModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'inventario' | 'trazabilidad'>('inventario');

  const productosFiltrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getEstadoColor = (estado: ProductoInventario['estado']) => {
    switch (estado) {
      case 'Disponible': return 'bg-green-100 text-green-700';
      case 'Reservado': return 'bg-orange-100 text-orange-700';
      case 'En Tránsito': return 'bg-blue-100 text-blue-700';
    }
  };

  const getEstadoPedidoIcon = (estado: Pedido['estado']) => {
    switch (estado) {
      case 'Recibido': return <Clock className="w-4 h-4" />;
      case 'En Preparación': return <Package className="w-4 h-4" />;
      case 'Despachado': return <Truck className="w-4 h-4" />;
      case 'Entregado': return <CheckCircle className="w-4 h-4" />;
    }
  };

  const getEstadoPedidoColor = (estado: Pedido['estado']) => {
    switch (estado) {
      case 'Recibido': return 'bg-slate-100 text-slate-700';
      case 'En Preparación': return 'bg-blue-100 text-blue-700';
      case 'Despachado': return 'bg-orange-100 text-orange-700';
      case 'Entregado': return 'bg-green-100 text-green-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-800">Operaciones & Inventario</h1>
          <p className="text-slate-600 mt-1">Gestión centralizada de stock y trazabilidad</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-slate-200">
        <button
          onClick={() => setSelectedTab('inventario')}
          className={`px-4 py-2 border-b-2 transition-colors ${
            selectedTab === 'inventario'
              ? 'border-blue-900 text-blue-900'
              : 'border-transparent text-slate-600 hover:text-slate-800'
          }`}
        >
          Inventario General
        </button>
        <button
          onClick={() => setSelectedTab('trazabilidad')}
          className={`px-4 py-2 border-b-2 transition-colors ${
            selectedTab === 'trazabilidad'
              ? 'border-blue-900 text-blue-900'
              : 'border-transparent text-slate-600 hover:text-slate-800'
          }`}
        >
          Trazabilidad de Pedidos
        </button>
      </div>

      {selectedTab === 'inventario' ? (
        <>
          {/* Barra de búsqueda y acciones */}
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar por nombre o SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
              />
            </div>
            <button 
              onClick={() => setShowIngresarModal(true)}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Ingresar Mercancía
            </button>
          </div>

          {/* Tabla de inventario */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">
                      Código SKU
                    </th>
                    <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">
                      Nombre Producto
                    </th>
                    <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">
                      Stock Real
                    </th>
                    <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">
                      Ubicación
                    </th>
                    <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">
                      Estado
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {productosFiltrados.map((producto) => (
                    <tr key={producto.sku} className="hover:bg-slate-50 cursor-pointer">
                      <td className="px-6 py-4 text-sm text-slate-700">
                        {producto.sku}
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-800">{producto.nombre}</p>
                        <p className="text-xs text-slate-500">{producto.categoria}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-sm ${
                          producto.stockReal < 50 ? 'text-orange-600' : 'text-slate-800'
                        }`}>
                          {producto.stockReal} unidades
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-slate-400" />
                          <span className="text-sm text-slate-700">{producto.ubicacion}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs px-2 py-1 rounded ${getEstadoColor(producto.estado)}`}>
                          {producto.estado}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Trazabilidad de Pedidos */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-slate-800 mb-6">Estado de Pedidos</h2>
            <div className="space-y-4">
              {pedidos.map((pedido) => (
                <div key={pedido.id} className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-slate-800">{pedido.id}</p>
                      <p className="text-sm text-slate-600 mt-1">{pedido.cliente}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-500">{pedido.fecha}</p>
                      <p className="text-xs text-slate-500 mt-1">{pedido.items} items</p>
                    </div>
                  </div>
                  
                  {/* Timeline de estados */}
                  <div className="flex items-center gap-2">
                    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${getEstadoPedidoColor(pedido.estado)}`}>
                      {getEstadoPedidoIcon(pedido.estado)}
                      <span className="text-xs">{pedido.estado}</span>
                    </div>
                  </div>

                  {/* Progreso visual */}
                  <div className="mt-4 flex items-center gap-2">
                    <div className={`w-1/4 h-2 rounded-full ${pedido.estado !== 'Recibido' ? 'bg-green-500' : 'bg-slate-300'}`}></div>
                    <div className={`w-1/4 h-2 rounded-full ${pedido.estado === 'En Preparación' || pedido.estado === 'Despachado' || pedido.estado === 'Entregado' ? 'bg-blue-500' : 'bg-slate-300'}`}></div>
                    <div className={`w-1/4 h-2 rounded-full ${pedido.estado === 'Despachado' || pedido.estado === 'Entregado' ? 'bg-orange-500' : 'bg-slate-300'}`}></div>
                    <div className={`w-1/4 h-2 rounded-full ${pedido.estado === 'Entregado' ? 'bg-green-500' : 'bg-slate-300'}`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Modal Ingresar Mercancía */}
      {showIngresarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
            <h2 className="text-slate-800 mb-6">Recepción de Mercancía</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-700 mb-2">SKU del Producto</label>
                <input
                  type="text"
                  placeholder="Ej: TRN-HEX-10"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-700 mb-2">Cantidad Recibida</label>
                <input
                  type="number"
                  placeholder="0"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-700 mb-2">Ubicación de Almacenamiento</label>
                <input
                  type="text"
                  placeholder="Ej: A-12-03"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowIngresarModal(false)}
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => setShowIngresarModal(false)}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Registrar Ingreso
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
