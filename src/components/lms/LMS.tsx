import { useState } from 'react';
import { 
  BookOpen, 
  Award, 
  Clock, 
  TrendingUp, 
  Users, 
  PlayCircle, 
  CheckCircle, 
  Star,
  Plus,
  Filter,
  Search,
  BarChart3,
  FileText,
  Video,
  Headphones,
  Shield,
  Wrench,
  ShoppingBag,
  Settings,
  Download
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import type { UserRole } from '../../App';

interface LMSProps {
  userRole: UserRole;
}

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  instructor: string;
  duration: string;
  lessons: number;
  enrolled: number;
  rating: number;
  progress: number;
  thumbnail: string;
  level: 'Básico' | 'Intermedio' | 'Avanzado';
  status: 'En Progreso' | 'Completado' | 'Nuevo';
}

const courses: Course[] = [
  {
    id: '1',
    title: 'Seguridad Industrial y Prevención de Riesgos',
    description: 'Aprende los fundamentos de seguridad en el ambiente industrial y manejo de EPP.',
    category: 'Seguridad',
    instructor: 'Ing. Roberto Díaz',
    duration: '4h 30min',
    lessons: 12,
    enrolled: 45,
    rating: 4.8,
    progress: 65,
    thumbnail: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400',
    level: 'Básico',
    status: 'En Progreso'
  },
  {
    id: '2',
    title: 'Gestión de Inventarios y Almacenamiento',
    description: 'Técnicas avanzadas de control de stock, rotación FIFO/LIFO y optimización de espacios.',
    category: 'Operaciones',
    instructor: 'Lic. Carmen Soto',
    duration: '6h 15min',
    lessons: 18,
    enrolled: 38,
    rating: 4.9,
    progress: 100,
    thumbnail: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=400',
    level: 'Intermedio',
    status: 'Completado'
  },
  {
    id: '3',
    title: 'Técnicas de Ventas Consultivas',
    description: 'Domina el arte de la venta consultiva y cierre de negocios B2B en el sector industrial.',
    category: 'Ventas',
    instructor: 'Mgt. Luis Morales',
    duration: '5h 00min',
    lessons: 15,
    enrolled: 52,
    rating: 4.7,
    progress: 40,
    thumbnail: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400',
    level: 'Intermedio',
    status: 'En Progreso'
  },
  {
    id: '4',
    title: 'Excel Avanzado para Análisis de Datos',
    description: 'Tablas dinámicas, funciones avanzadas y visualización de datos para toma de decisiones.',
    category: 'Tecnología',
    instructor: 'Ing. María Rodríguez',
    duration: '8h 20min',
    lessons: 24,
    enrolled: 67,
    rating: 4.9,
    progress: 0,
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
    level: 'Avanzado',
    status: 'Nuevo'
  },
  {
    id: '5',
    title: 'Atención al Cliente de Excelencia',
    description: 'Desarrolla habilidades de comunicación y resolución de conflictos con clientes.',
    category: 'Ventas',
    instructor: 'Lic. Andrea Castillo',
    duration: '3h 45min',
    lessons: 10,
    enrolled: 59,
    rating: 4.6,
    progress: 0,
    thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400',
    level: 'Básico',
    status: 'Nuevo'
  },
  {
    id: '6',
    title: 'Mantenimiento Preventivo de Equipos',
    description: 'Protocolos de mantenimiento, diagnóstico de fallas y prolongación de vida útil.',
    category: 'Operaciones',
    instructor: 'Tec. Jorge Paredes',
    duration: '7h 10min',
    lessons: 20,
    enrolled: 31,
    rating: 4.8,
    progress: 25,
    thumbnail: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400',
    level: 'Avanzado',
    status: 'En Progreso'
  }
];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Seguridad': return Shield;
    case 'Operaciones': return Wrench;
    case 'Ventas': return ShoppingBag;
    case 'Tecnología': return Settings;
    default: return BookOpen;
  }
};

export function LMS({ userRole }: LMSProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const isAdmin = userRole === 'Dirección General' || userRole === 'Gerencia de RRHH';

  // Filtrar cursos
  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'Todos' || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ['Todos', ...Array.from(new Set(courses.map(c => c.category)))];

  // Estadísticas generales
  const totalEnrolled = courses.reduce((sum, c) => sum + c.enrolled, 0);
  const avgProgress = Math.round(courses.reduce((sum, c) => sum + c.progress, 0) / courses.length);
  const completedCourses = courses.filter(c => c.status === 'Completado').length;

  if (selectedCourse) {
    return (
      <div className="space-y-6">
        {/* Header del curso */}
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => setSelectedCourse(null)}>
            ← Volver al Catálogo
          </Button>
          <Badge variant="outline">{selectedCourse.category}</Badge>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Contenido del curso */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="aspect-video rounded-lg overflow-hidden bg-slate-100 mb-4">
                  <img 
                    src={selectedCourse.thumbnail} 
                    alt={selectedCourse.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardTitle className="text-slate-800">{selectedCourse.title}</CardTitle>
                <div className="flex items-center gap-4 text-sm text-slate-600 mt-2">
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    {selectedCourse.rating}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {selectedCourse.enrolled} estudiantes
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {selectedCourse.duration}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-slate-800 mb-2">Descripción</h3>
                  <p className="text-slate-600">{selectedCourse.description}</p>
                </div>

                <div>
                  <h3 className="text-slate-800 mb-4">Contenido del Curso</h3>
                  <div className="space-y-2">
                    {Array.from({ length: selectedCourse.lessons }).map((_, i) => (
                      <div 
                        key={i}
                        className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          {i < selectedCourse.lessons * (selectedCourse.progress / 100) ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : (
                            <PlayCircle className="w-5 h-5 text-slate-400" />
                          )}
                          <div>
                            <p className="text-slate-800">
                              Lección {i + 1}: {i % 3 === 0 ? 'Fundamentos' : i % 3 === 1 ? 'Práctica' : 'Evaluación'}
                            </p>
                            <p className="text-sm text-slate-500">
                              {Math.floor(Math.random() * 20 + 10)} minutos
                            </p>
                          </div>
                        </div>
                        <Badge variant={i < selectedCourse.lessons * (selectedCourse.progress / 100) ? 'default' : 'outline'}>
                          {i < selectedCourse.lessons * (selectedCourse.progress / 100) ? 'Completado' : 'Pendiente'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar con información */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-slate-800">Tu Progreso</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-600">Completado</span>
                    <span className="text-slate-800">{selectedCourse.progress}%</span>
                  </div>
                  <Progress value={selectedCourse.progress} className="h-2" />
                </div>
                <div className="pt-4 border-t space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Lecciones completadas</span>
                    <span className="text-slate-800">
                      {Math.floor(selectedCourse.lessons * (selectedCourse.progress / 100))} / {selectedCourse.lessons}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Tiempo estimado restante</span>
                    <span className="text-slate-800">
                      {Math.floor((100 - selectedCourse.progress) / 100 * parseInt(selectedCourse.duration))}h
                    </span>
                  </div>
                </div>
                <Button className="w-full bg-blue-900 hover:bg-blue-800 mt-4">
                  Continuar Aprendiendo
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-slate-800">Instructor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-900" />
                  </div>
                  <div>
                    <p className="text-slate-800">{selectedCourse.instructor}</p>
                    <p className="text-sm text-slate-500">Experto certificado</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-slate-800">Recursos Descargables</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Manual del Curso.pdf
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Material de Apoyo.zip
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-800 mb-2">Academia NEXUS</h1>
          <p className="text-slate-600">
            {isAdmin 
              ? 'Gestiona cursos y monitorea el progreso del personal'
              : 'Desarrolla tus habilidades profesionales'
            }
          </p>
        </div>
        {isAdmin && (
          <Button className="bg-blue-900 hover:bg-blue-800">
            <Plus className="w-4 h-4 mr-2" />
            Crear Curso
          </Button>
        )}
      </div>

      {/* Estadísticas */}
      {isAdmin ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Total Cursos</p>
                  <p className="text-slate-800 mt-1">{courses.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-blue-900" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Estudiantes Activos</p>
                  <p className="text-slate-800 mt-1">{totalEnrolled}</p>
                </div>
                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Progreso Promedio</p>
                  <p className="text-slate-800 mt-1">{avgProgress}%</p>
                </div>
                <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Cursos Completados</p>
                  <p className="text-slate-800 mt-1">{completedCourses}</p>
                </div>
                <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Cursos en Progreso</p>
                  <p className="text-slate-800 mt-1">
                    {courses.filter(c => c.status === 'En Progreso').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-blue-900" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Cursos Completados</p>
                  <p className="text-slate-800 mt-1">
                    {courses.filter(c => c.status === 'Completado').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Certificados Obtenidos</p>
                  <p className="text-slate-800 mt-1">
                    {courses.filter(c => c.status === 'Completado').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tabs para Admin */}
      {isAdmin ? (
        <Tabs defaultValue="courses" className="space-y-6">
          <TabsList>
            <TabsTrigger value="courses">Catálogo de Cursos</TabsTrigger>
            <TabsTrigger value="students">Progreso de Estudiantes</TabsTrigger>
            <TabsTrigger value="stats">Estadísticas</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-6">
            {/* Búsqueda y Filtros */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar cursos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto">
                {categories.map(cat => (
                  <Button
                    key={cat}
                    variant={selectedCategory === cat ? "default" : "outline"}
                    onClick={() => setSelectedCategory(cat)}
                    className={selectedCategory === cat ? "bg-blue-900" : ""}
                  >
                    {cat}
                  </Button>
                ))}
              </div>
            </div>

            {/* Grid de Cursos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map(course => {
                const CategoryIcon = getCategoryIcon(course.category);
                return (
                  <Card 
                    key={course.id} 
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => setSelectedCourse(course)}
                  >
                    <CardContent className="p-0">
                      <div className="aspect-video rounded-t-lg overflow-hidden bg-slate-100">
                        <img 
                          src={course.thumbnail} 
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6 space-y-4">
                        <div className="flex items-start justify-between gap-2">
                          <Badge variant="outline" className="flex items-center gap-1">
                            <CategoryIcon className="w-3 h-3" />
                            {course.category}
                          </Badge>
                          <Badge 
                            variant={
                              course.status === 'Completado' ? 'default' : 
                              course.status === 'En Progreso' ? 'secondary' : 
                              'outline'
                            }
                          >
                            {course.status}
                          </Badge>
                        </div>
                        
                        <div>
                          <h3 className="text-slate-800 mb-2 line-clamp-2">{course.title}</h3>
                          <p className="text-sm text-slate-600 line-clamp-2">{course.description}</p>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-slate-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {course.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <BookOpen className="w-4 h-4" />
                            {course.lessons} lecciones
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            <span className="text-sm text-slate-700">{course.rating}</span>
                            <span className="text-sm text-slate-500">({course.enrolled})</span>
                          </div>
                          <Badge variant="outline">{course.level}</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="students">
            <Card>
              <CardHeader>
                <CardTitle className="text-slate-800">Progreso por Estudiante</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'José Ramírez', dept: 'Almacén', courses: 3, progress: 67 },
                    { name: 'María González', dept: 'Ventas', courses: 5, progress: 85 },
                    { name: 'Pedro Martínez', dept: 'Operaciones', courses: 4, progress: 45 },
                    { name: 'Lucía Vargas', dept: 'Administración', courses: 2, progress: 90 },
                    { name: 'Roberto Silva', dept: 'Almacén', courses: 3, progress: 55 }
                  ].map((student, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 border border-slate-200 rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-900">{student.name[0]}</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-slate-800">{student.name}</p>
                        <p className="text-sm text-slate-500">{student.dept} • {student.courses} cursos</p>
                      </div>
                      <div className="w-32">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-slate-600">Progreso</span>
                          <span className="text-slate-800">{student.progress}%</span>
                        </div>
                        <Progress value={student.progress} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-slate-800">Cursos Más Populares</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {courses
                      .sort((a, b) => b.enrolled - a.enrolled)
                      .slice(0, 5)
                      .map((course, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center text-blue-900">
                            {i + 1}
                          </div>
                          <div className="flex-1">
                            <p className="text-slate-800 text-sm">{course.title}</p>
                            <p className="text-xs text-slate-500">{course.enrolled} estudiantes</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-slate-800">Cursos por Categoría</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {categories.filter(c => c !== 'Todos').map((cat, i) => {
                      const count = courses.filter(c => c.category === cat).length;
                      const percentage = (count / courses.length) * 100;
                      return (
                        <div key={i}>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-slate-700">{cat}</span>
                            <span className="text-slate-800">{count} cursos</span>
                          </div>
                          <Progress value={percentage} className="h-2" />
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      ) : (
        <>
          {/* Búsqueda y Filtros para Estudiantes */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar cursos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {categories.map(cat => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  onClick={() => setSelectedCategory(cat)}
                  className={selectedCategory === cat ? "bg-blue-900" : ""}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>

          {/* Grid de Cursos para Estudiantes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map(course => {
              const CategoryIcon = getCategoryIcon(course.category);
              return (
                <Card 
                  key={course.id} 
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setSelectedCourse(course)}
                >
                  <CardContent className="p-0">
                    <div className="aspect-video rounded-t-lg overflow-hidden bg-slate-100">
                      <img 
                        src={course.thumbnail} 
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6 space-y-4">
                      <div className="flex items-start justify-between gap-2">
                        <Badge variant="outline" className="flex items-center gap-1">
                          <CategoryIcon className="w-3 h-3" />
                          {course.category}
                        </Badge>
                        <Badge 
                          variant={
                            course.status === 'Completado' ? 'default' : 
                            course.status === 'En Progreso' ? 'secondary' : 
                            'outline'
                          }
                        >
                          {course.status}
                        </Badge>
                      </div>
                      
                      <div>
                        <h3 className="text-slate-800 mb-2 line-clamp-2">{course.title}</h3>
                        <p className="text-sm text-slate-600 line-clamp-2">{course.description}</p>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-slate-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {course.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" />
                          {course.lessons} lecciones
                        </span>
                      </div>

                      {course.progress > 0 && (
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-slate-600">Progreso</span>
                            <span className="text-slate-800">{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-sm text-slate-700">{course.rating}</span>
                        </div>
                        <Badge variant="outline">{course.level}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
