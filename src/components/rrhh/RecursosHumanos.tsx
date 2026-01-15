import { useState, useEffect } from 'react';
import { 
  Clock, 
  LogIn, 
  LogOut as LogOutIcon, 
  Search,
  BookOpen,
  FileText,
  Users,
  Folder
} from 'lucide-react';
import type { UserRole } from '../../App';

interface RecursosHumanosProps {
  userRole: UserRole;
}

interface DocumentoWiki {
  id: string;
  titulo: string;
  categoria: string;
  descripcion: string;
  icono: 'manual' | 'proceso' | 'politica' | 'formulario';
}

const documentosWiki: DocumentoWiki[] = [
  {
    id: 'DOC-001',
    titulo: 'Manual de Operaciones de Almacén',
    categoria: 'Manuales de Procesos',
    descripcion: 'Procedimientos para recepción, almacenamiento y despacho de mercancía',
    icono: 'manual'
  },
  {
    id: 'DOC-002',
    titulo: 'Proceso de Facturación',
    categoria: 'Manuales de Procesos',
    descripcion: 'Guía paso a paso para generar facturas desde órdenes aprobadas',
    icono: 'proceso'
  },
  {
    id: 'DOC-003',
    titulo: 'Política de Crédito a Clientes',
    categoria: 'Políticas Corporativas',
    descripcion: 'Lineamientos para aprobación de créditos y seguimiento de cuentas por cobrar',
    icono: 'politica'
  },
  {
    id: 'DOC-004',
    titulo: 'Manual de Ventas y CRM',
    categoria: 'Manuales de Procesos',
    descripcion: 'Procedimientos para gestión de cotizaciones y conversión a órdenes',
    icono: 'manual'
  },
  {
    id: 'DOC-005',
    titulo: 'Formulario de Solicitud de Vacaciones',
    categoria: 'Formularios RRHH',
    descripcion: 'Formato para solicitar permisos y vacaciones',
    icono: 'formulario'
  },
  {
    id: 'DOC-006',
    titulo: 'Código de Conducta Empresarial',
    categoria: 'Políticas Corporativas',
    descripcion: 'Normas de comportamiento y ética profesional',
    icono: 'politica'
  }
];

export function RecursosHumanos({ userRole }: RecursosHumanosProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [asistenciaMarcada, setAsistenciaMarcada] = useState<'entrada' | 'salida' | null>(null);
  const [searchWiki, setSearchWiki] = useState('');
  const [selectedTab, setSelectedTab] = useState<'asistencia' | 'wiki'>('asistencia');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const documentosFiltrados = documentosWiki.filter(doc =>
    doc.titulo.toLowerCase().includes(searchWiki.toLowerCase()) ||
    doc.categoria.toLowerCase().includes(searchWiki.toLowerCase())
  );

  const categorias = Array.from(new Set(documentosWiki.map(doc => doc.categoria)));

  const getIconoDocumento = (tipo: DocumentoWiki['icono']) => {
    switch (tipo) {
      case 'manual': return <BookOpen className="w-5 h-5 text-blue-600" />;
      case 'proceso': return <FileText className="w-5 h-5 text-green-600" />;
      case 'politica': return <Users className="w-5 h-5 text-purple-600" />;
      case 'formulario': return <FileText className="w-5 h-5 text-orange-600" />;
    }
  };

  const marcarAsistencia = (tipo: 'entrada' | 'salida') => {
    setAsistenciaMarcada(tipo);
    setTimeout(() => setAsistenciaMarcada(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-slate-800">Recursos Humanos</h1>
        <p className="text-slate-600 mt-1">Control de asistencia y base de conocimiento</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-slate-200">
        <button
          onClick={() => setSelectedTab('asistencia')}
          className={`px-4 py-2 border-b-2 transition-colors ${
            selectedTab === 'asistencia'
              ? 'border-blue-900 text-blue-900'
              : 'border-transparent text-slate-600 hover:text-slate-800'
          }`}
        >
          Control de Asistencia
        </button>
        <button
          onClick={() => setSelectedTab('wiki')}
          className={`px-4 py-2 border-b-2 transition-colors ${
            selectedTab === 'wiki'
              ? 'border-blue-900 text-blue-900'
              : 'border-transparent text-slate-600 hover:text-slate-800'
          }`}
        >
          Wiki Corporativa
        </button>
      </div>

      {selectedTab === 'asistencia' ? (
        <>
          {/* Reloj y Control de Asistencia */}
          <div className="bg-gradient-to-br from-blue-900 to-slate-800 rounded-xl p-8 text-white">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white bg-opacity-20 rounded-full mb-4">
                <Clock className="w-10 h-10" />
              </div>
              <p className="text-5xl mb-2">
                {currentTime.toLocaleTimeString('es-VE', { 
                  hour: '2-digit', 
                  minute: '2-digit',
                  second: '2-digit'
                })}
              </p>
              <p className="text-xl text-blue-100">
                {currentTime.toLocaleDateString('es-VE', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <button
                onClick={() => marcarAsistencia('entrada')}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm rounded-xl p-6 transition-all hover:scale-105"
              >
                <LogIn className="w-8 h-8 mb-3 mx-auto" />
                <p className="text-xl">Marcar Entrada</p>
                <p className="text-sm text-blue-100 mt-2">Registrar llegada</p>
              </button>

              <button
                onClick={() => marcarAsistencia('salida')}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm rounded-xl p-6 transition-all hover:scale-105"
              >
                <LogOutIcon className="w-8 h-8 mb-3 mx-auto" />
                <p className="text-xl">Marcar Salida</p>
                <p className="text-sm text-blue-100 mt-2">Registrar salida</p>
              </button>
            </div>

            {asistenciaMarcada && (
              <div className="mt-6 bg-green-500 bg-opacity-20 border border-green-300 rounded-lg p-4 text-center animate-pulse">
                <p className="text-lg">
                  ✓ {asistenciaMarcada === 'entrada' ? 'Entrada' : 'Salida'} registrada exitosamente
                </p>
                <p className="text-sm text-green-100 mt-1">
                  {currentTime.toLocaleTimeString('es-VE')}
                </p>
              </div>
            )}
          </div>

          {/* Historial de Asistencia */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-slate-800 mb-6">Historial de Asistencia (Última Semana)</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Fecha</th>
                    <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Entrada</th>
                    <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Salida</th>
                    <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Horas Trabajadas</th>
                    <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { fecha: '2025-12-11', entrada: '08:00', salida: '--:--', horas: 'En curso', estado: 'Activo' },
                    { fecha: '2025-12-10', entrada: '08:05', salida: '17:30', horas: '9h 25m', estado: 'Completo' },
                    { fecha: '2025-12-09', entrada: '08:00', salida: '17:45', horas: '9h 45m', estado: 'Completo' },
                    { fecha: '2025-12-06', entrada: '08:10', salida: '17:20', horas: '9h 10m', estado: 'Completo' },
                    { fecha: '2025-12-05', entrada: '08:00', salida: '17:35', horas: '9h 35m', estado: 'Completo' },
                  ].map((registro, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="px-4 py-4 text-sm text-slate-700">{registro.fecha}</td>
                      <td className="px-4 py-4 text-sm text-slate-700">{registro.entrada}</td>
                      <td className="px-4 py-4 text-sm text-slate-700">{registro.salida}</td>
                      <td className="px-4 py-4 text-sm text-slate-700">{registro.horas}</td>
                      <td className="px-4 py-4">
                        <span className={`text-xs px-2 py-1 rounded ${
                          registro.estado === 'Activo' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          {registro.estado}
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
          {/* Wiki Corporativa */}
          <div className="space-y-6">
            {/* Búsqueda */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar en la base de conocimiento..."
                value={searchWiki}
                onChange={(e) => setSearchWiki(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
              />
            </div>

            {/* Categorías */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-slate-800 mb-6">Categorías de Documentos</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {categorias.map((categoria) => {
                  const count = documentosWiki.filter(doc => doc.categoria === categoria).length;
                  return (
                    <div key={categoria} className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 cursor-pointer transition-colors">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Folder className="w-5 h-5 text-blue-900" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-slate-800">{categoria}</p>
                          <p className="text-xs text-slate-500">{count} documentos</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Lista de Documentos */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-slate-800 mb-6">Documentos Disponibles</h2>
              <div className="space-y-3">
                {documentosFiltrados.map((doc) => (
                  <div key={doc.id} className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-all group">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-slate-100 rounded-lg group-hover:bg-white transition-colors">
                        {getIconoDocumento(doc.icono)}
                      </div>
                      <div className="flex-1">
                        <p className="text-slate-800 mb-1">{doc.titulo}</p>
                        <p className="text-sm text-slate-600 mb-2">{doc.descripcion}</p>
                        <div className="flex items-center gap-3">
                          <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                            {doc.categoria}
                          </span>
                          <span className="text-xs text-slate-500">{doc.id}</span>
                        </div>
                      </div>
                      <button className="text-sm text-blue-900 hover:underline opacity-0 group-hover:opacity-100 transition-opacity">
                        Ver Documento →
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {documentosFiltrados.length === 0 && (
                <div className="text-center py-12">
                  <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500">No se encontraron documentos</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
