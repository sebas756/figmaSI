import { useState } from 'react';
import { 
  ShoppingCart, 
  Users, 
  FileText, 
  CheckCircle, 
  AlertCircle,
  Plus,
  Search
} from 'lucide-react';
import type { UserRole } from '../../App';

interface VentasProps {
  userRole: UserRole;
}

interface Producto {
  id: string;
  nombre: string;
  sku: string;
  precio: number;
  disponible: boolean;
  stock: number;
  categoria: string;
  imagen: string;
}

interface Cliente {
  id: string;
  nombre: string;
  rif: string;
  credito: number;
  estatusCredito: 'Bueno' | 'Alerta' | 'Bloqueado';
  ultimaCompra: string;
}

const productos: Producto[] = [
  {
    id: '1',
    nombre: 'Tornillos Hexagonales 10mm (Caja x100)',
    sku: 'TRN-HEX-10',
    precio: 125.50,
    disponible: true,
    stock: 45,
    categoria: 'Fijación',
    imagen: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400&h=300&fit=crop'
  },
  {
    id: '2',
    nombre: 'Lubricante Industrial X5 (20L)',
    sku: 'LUB-IND-X5',
    precio: 2850.00,
    disponible: true,
    stock: 12,
    categoria: 'Lubricantes',
    imagen: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&h=300&fit=crop'
  },
  {
    id: '3',
    nombre: 'Cojinetes de Rodillos 25mm',
    sku: 'CJN-ROD-25',
    precio: 485.75,
    disponible: false,
    stock: 8,
    categoria: 'Rodamientos',
    imagen: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop'
  },
  {
    id: '4',
    nombre: 'Filtros de Aire HEPA H13',
    sku: 'FLT-AIRE-H13',
    precio: 320.00,
    disponible: true,
    stock: 23,
    categoria: 'Filtración',
    imagen: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=300&fit=crop'
  },
  {
    id: '5',
    nombre: 'Válvula de Bola 1" Acero Inox',
    sku: 'VLV-BOLA-1',
    precio: 675.25,
    disponible: true,
    stock: 78,
    categoria: 'Válvulas',
    imagen: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop'
  },
  {
    id: '6',
    nombre: 'Manguera Hidráulica 3/4" (Metro)',
    sku: 'MNG-HIDR-3/4',
    precio: 95.50,
    disponible: true,
    stock: 230,
    categoria: 'Hidráulica',
    imagen: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=300&fit=crop'
  }
];

const clientes: Cliente[] = [
  {
    id: 'CLI-001',
    nombre: 'Industrias MetalCorp C.A.',
    rif: 'J-30125478-9',
    credito: 150000,
    estatusCredito: 'Bueno',
    ultimaCompra: '2025-12-08'
  },
  {
    id: 'CLI-002',
    nombre: 'Manufacturas del Este',
    rif: 'J-29887654-2',
    credito: 80000,
    estatusCredito: 'Bueno',
    ultimaCompra: '2025-12-10'
  },
  {
    id: 'CLI-003',
    nombre: 'Distribuciones Omega S.A.',
    rif: 'J-31256789-4',
    credito: 120000,
    estatusCredito: 'Alerta',
    ultimaCompra: '2025-11-28'
  },
  {
    id: 'CLI-004',
    nombre: 'Tecno-Industrial SAC',
    rif: 'J-28934512-7',
    credito: 95000,
    estatusCredito: 'Bueno',
    ultimaCompra: '2025-12-11'
  }
];

export function Ventas({ userRole }: VentasProps) {
  const [selectedTab, setSelectedTab] = useState<'catalogo' | 'cotizaciones' | 'clientes'>('catalogo');
  const [showCotizacionModal, setShowCotizacionModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [productosSeleccionados, setProductosSeleccionados] = useState<{producto: Producto, cantidad: number}[]>([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState<string>('');

  const productosFiltrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const agregarProducto = (producto: Producto) => {
    const existe = productosSeleccionados.find(p => p.producto.id === producto.id);
    if (existe) {
      setProductosSeleccionados(productosSeleccionados.map(p => 
        p.producto.id === producto.id ? {...p, cantidad: p.cantidad + 1} : p
      ));
    } else {
      setProductosSeleccionados([...productosSeleccionados, {producto, cantidad: 1}]);
    }
  };

  const calcularTotal = () => {
    return productosSeleccionados.reduce((acc, item) => acc + (item.producto.precio * item.cantidad), 0);
  };

  const getEstatusCreditoColor = (estatus: Cliente['estatusCredito']) => {
    switch (estatus) {
      case 'Bueno': return 'bg-green-100 text-green-700';
      case 'Alerta': return 'bg-orange-100 text-orange-700';
      case 'Bloqueado': return 'bg-red-100 text-red-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-800">Ventas & CRM</h1>
          <p className="text-slate-600 mt-1">Gestión comercial y relaciones con clientes</p>
        </div>
        <button 
          onClick={() => setShowCotizacionModal(true)}
          className="flex items-center gap-2 bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Nueva Cotización
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-slate-200">
        <button
          onClick={() => setSelectedTab('catalogo')}
          className={`px-4 py-2 border-b-2 transition-colors ${
            selectedTab === 'catalogo'
              ? 'border-blue-900 text-blue-900'
              : 'border-transparent text-slate-600 hover:text-slate-800'
          }`}
        >
          Catálogo Digital
        </button>
        <button
          onClick={() => setSelectedTab('cotizaciones')}
          className={`px-4 py-2 border-b-2 transition-colors ${
            selectedTab === 'cotizaciones'
              ? 'border-blue-900 text-blue-900'
              : 'border-transparent text-slate-600 hover:text-slate-800'
          }`}
        >
          Cotizaciones
        </button>
        <button
          onClick={() => setSelectedTab('clientes')}
          className={`px-4 py-2 border-b-2 transition-colors ${
            selectedTab === 'clientes'
              ? 'border-blue-900 text-blue-900'
              : 'border-transparent text-slate-600 hover:text-slate-800'
          }`}
        >
          Clientes
        </button>
      </div>

      {/* Contenido según tab */}
      {selectedTab === 'catalogo' && (
        <>
          {/* Búsqueda */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
          </div>

          {/* Galería de productos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productosFiltrados.map((producto) => (
              <div key={producto.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48 bg-slate-100">
                  <img 
                    src={producto.imagen} 
                    alt={producto.nombre}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    {producto.disponible ? (
                      <span className="flex items-center gap-1 bg-green-500 text-white text-xs px-2 py-1 rounded">
                        <CheckCircle className="w-3 h-3" />
                        Disponible
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 bg-red-500 text-white text-xs px-2 py-1 rounded">
                        <AlertCircle className="w-3 h-3" />
                        Agotado
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs text-slate-500 mb-1">{producto.categoria}</p>
                  <h3 className="text-slate-800 mb-2">{producto.nombre}</h3>
                  <p className="text-xs text-slate-500 mb-3">SKU: {producto.sku}</p>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-slate-900">Bs. {producto.precio.toFixed(2)}</p>
                    <p className="text-xs text-slate-600">Stock: {producto.stock}</p>
                  </div>
                  <button
                    onClick={() => agregarProducto(producto)}
                    disabled={!producto.disponible}
                    className="w-full bg-blue-900 text-white py-2 rounded-lg hover:bg-blue-800 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
                  >
                    Agregar a Cotización
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {selectedTab === 'cotizaciones' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-slate-800 mb-6">Cotizaciones Recientes</h2>
          <div className="space-y-4">
            {[
              { id: 'COT-2847', cliente: 'Industrias MetalCorp', fecha: '2025-12-11', total: 12450, estado: 'Aprobada' },
              { id: 'COT-2846', cliente: 'Manufacturas del Este', fecha: '2025-12-10', total: 8320, estado: 'Pendiente' },
              { id: 'COT-2845', cliente: 'Distribuciones Omega', fecha: '2025-12-10', total: 15670, estado: 'Aprobada' },
            ].map((cot) => (
              <div key={cot.id} className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-slate-800">{cot.id}</p>
                    <p className="text-sm text-slate-600 mt-1">{cot.cliente}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-900">Bs. {cot.total.toFixed(2)}</p>
                    <p className="text-xs text-slate-500 mt-1">{cot.fecha}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className={`text-xs px-2 py-1 rounded ${
                    cot.estado === 'Aprobada' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                  }`}>
                    {cot.estado}
                  </span>
                  {cot.estado === 'Aprobada' && (
                    <button className="text-sm text-blue-900 hover:underline">
                      Convertir a Orden de Pedido →
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedTab === 'clientes' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase">Cliente</th>
                  <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase">RIF</th>
                  <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase">Límite de Crédito</th>
                  <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase">Estatus</th>
                  <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase">Última Compra</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {clientes.map((cliente) => (
                  <tr key={cliente.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-800">{cliente.nombre}</p>
                      <p className="text-xs text-slate-500">{cliente.id}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700">{cliente.rif}</td>
                    <td className="px-6 py-4 text-sm text-slate-700">Bs. {cliente.credito.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded ${getEstatusCreditoColor(cliente.estatusCredito)}`}>
                        {cliente.estatusCredito}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700">{cliente.ultimaCompra}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Nueva Cotización */}
      {showCotizacionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-slate-800 mb-6">Generador de Cotizaciones</h2>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm text-slate-700 mb-2">Seleccionar Cliente</label>
                <select 
                  value={clienteSeleccionado}
                  onChange={(e) => setClienteSeleccionado(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                >
                  <option value="">-- Seleccione un cliente --</option>
                  {clientes.map(c => (
                    <option key={c.id} value={c.id}>{c.nombre}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="border border-slate-200 rounded-lg p-4 mb-6">
              <h3 className="text-slate-700 mb-4">Productos Seleccionados</h3>
              {productosSeleccionados.length === 0 ? (
                <p className="text-sm text-slate-500 text-center py-4">No hay productos seleccionados</p>
              ) : (
                <div className="space-y-3">
                  {productosSeleccionados.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-slate-50 p-3 rounded-lg">
                      <div className="flex-1">
                        <p className="text-sm text-slate-800">{item.producto.nombre}</p>
                        <p className="text-xs text-slate-500">Bs. {item.producto.precio.toFixed(2)} c/u</p>
                      </div>
                      <input
                        type="number"
                        min="1"
                        value={item.cantidad}
                        onChange={(e) => {
                          const newCant = parseInt(e.target.value) || 1;
                          setProductosSeleccionados(productosSeleccionados.map((p, i) => 
                            i === idx ? {...p, cantidad: newCant} : p
                          ));
                        }}
                        className="w-16 px-2 py-1 border border-slate-300 rounded text-center"
                      />
                      <p className="text-sm text-slate-800 ml-4 w-24 text-right">
                        Bs. {(item.producto.precio * item.cantidad).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-slate-50 p-4 rounded-lg mb-6">
              <div className="flex items-center justify-between">
                <p className="text-slate-700">Total:</p>
                <p className="text-slate-900">Bs. {calcularTotal().toFixed(2)}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowCotizacionModal(false);
                  setProductosSeleccionados([]);
                  setClienteSeleccionado('');
                }}
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setShowCotizacionModal(false);
                  setProductosSeleccionados([]);
                  setClienteSeleccionado('');
                }}
                className="flex-1 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
              >
                Generar Cotización
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
