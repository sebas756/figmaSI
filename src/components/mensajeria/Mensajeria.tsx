import { useState } from 'react';
import { 
  Send, 
  Paperclip, 
  Smile, 
  Search,
  MoreVertical,
  Phone,
  Video,
  Circle
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';

interface Contact {
  id: string;
  name: string;
  role: string;
  avatar: string;
  online: boolean;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isOwn: boolean;
}

const contacts: Contact[] = [
  {
    id: '1',
    name: 'Ricardo Salazar',
    role: 'Dirección General',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dirección General',
    online: true,
    lastMessage: 'Necesito el reporte de ventas del trimestre',
    lastMessageTime: '10:45',
    unreadCount: 2
  },
  {
    id: '2',
    name: 'Miguel Torres',
    role: 'Gerencia de Operaciones',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gerencia de Operaciones',
    online: true,
    lastMessage: 'Los rodamientos SKF ya llegaron al almacén',
    lastMessageTime: '09:23',
    unreadCount: 0
  },
  {
    id: '3',
    name: 'Ana López',
    role: 'Gerencia Comercial',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gerencia Comercial',
    online: false,
    lastMessage: 'Cliente Petroquímica del Caribe confirmó pedido',
    lastMessageTime: 'Ayer',
    unreadCount: 1
  },
  {
    id: '4',
    name: 'Patricia Ruiz',
    role: 'Mercadeo',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mercadeo',
    online: true,
    lastMessage: 'El catálogo de lubricantes está listo',
    lastMessageTime: 'Ayer',
    unreadCount: 0
  },
  {
    id: '5',
    name: 'Carlos Méndez',
    role: 'Gerencia Administrativa',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gerencia Administrativa',
    online: false,
    lastMessage: 'Revisar facturas pendientes de Corporación XYZ',
    lastMessageTime: '15 Feb',
    unreadCount: 0
  },
  {
    id: '6',
    name: 'Laura Fernández',
    role: 'Gerencia de RRHH',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gerencia de RRHH',
    online: true,
    lastMessage: 'Capacitación de seguridad agendada para el lunes',
    lastMessageTime: '14 Feb',
    unreadCount: 0
  }
];

export function Mensajeria() {
  const [selectedContact, setSelectedContact] = useState<Contact>(contacts[0]);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mensajes de ejemplo para el chat seleccionado
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      senderId: selectedContact.id,
      text: 'Buenos días, ¿cómo va el inventario de válvulas industriales?',
      timestamp: '10:30',
      isOwn: false
    },
    {
      id: '2',
      senderId: 'me',
      text: 'Buenos días, Ricardo. Ya revisé el stock y tenemos 245 unidades disponibles de válvulas de bola.',
      timestamp: '10:32',
      isOwn: true
    },
    {
      id: '3',
      senderId: selectedContact.id,
      text: 'Perfecto. También necesito el reporte de ventas del trimestre para la reunión de directorio.',
      timestamp: '10:45',
      isOwn: false
    },
    {
      id: '4',
      senderId: 'me',
      text: 'Claro, te lo envío en 15 minutos. ¿Necesitas el desglose por categoría de productos?',
      timestamp: '10:47',
      isOwn: true
    }
  ]);

  const handleSendMessage = () => {
    if (messageText.trim()) {
      const newMessage: Message = {
        id: String(messages.length + 1),
        senderId: 'me',
        text: messageText,
        timestamp: new Date().toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit' }),
        isOwn: true
      };
      setMessages([...messages, newMessage]);
      setMessageText('');
    }
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-140px)] bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
      <div className="flex h-full">
        {/* Lista de Chats Recientes */}
        <div className="w-80 border-r border-slate-200 flex flex-col bg-white">
          {/* Header de la lista */}
          <div className="p-4 border-b border-slate-200">
            <h2 className="text-slate-800 mb-3">Mensajería</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                type="text"
                placeholder="Buscar contactos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-slate-50 border-slate-200"
              />
            </div>
          </div>

          {/* Lista de contactos */}
          <ScrollArea className="flex-1">
            <div className="p-2">
              {filteredContacts.map((contact) => (
                <button
                  key={contact.id}
                  onClick={() => setSelectedContact(contact)}
                  className={`w-full p-3 rounded-lg hover:bg-slate-50 transition-colors text-left mb-1 ${
                    selectedContact.id === contact.id ? 'bg-blue-50 hover:bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={contact.avatar} alt={contact.name} />
                        <AvatarFallback className="bg-blue-600 text-white">
                          {contact.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      {contact.online && (
                        <Circle className="absolute bottom-0 right-0 w-3 h-3 fill-green-500 text-green-500 border-2 border-white rounded-full" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm text-slate-800 truncate">{contact.name}</p>
                        <span className="text-xs text-slate-500">{contact.lastMessageTime}</span>
                      </div>
                      <p className="text-xs text-slate-500 mb-1">{contact.role}</p>
                      <p className="text-xs text-slate-600 truncate">{contact.lastMessage}</p>
                    </div>
                    {contact.unreadCount > 0 && (
                      <div className="flex-shrink-0 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-xs text-white">{contact.unreadCount}</span>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Ventana de Chat Principal */}
        <div className="flex-1 flex flex-col bg-slate-50">
          {/* Header del Chat */}
          <div className="bg-white border-b border-slate-200 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={selectedContact.avatar} alt={selectedContact.name} />
                  <AvatarFallback className="bg-blue-600 text-white">
                    {selectedContact.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                {selectedContact.online && (
                  <Circle className="absolute bottom-0 right-0 w-3 h-3 fill-green-500 text-green-500 border-2 border-white rounded-full" />
                )}
              </div>
              <div>
                <p className="text-slate-800">{selectedContact.name}</p>
                <p className="text-xs text-slate-500">
                  {selectedContact.online ? 'En línea' : 'Desconectado'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-slate-600 hover:text-slate-800">
                <Phone className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-slate-600 hover:text-slate-800">
                <Video className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-slate-600 hover:text-slate-800">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Área de Mensajes */}
          <ScrollArea className="flex-1 p-6">
            <div className="space-y-4 max-w-4xl mx-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-md px-4 py-3 rounded-2xl ${
                      message.isOwn
                        ? 'bg-blue-600 text-white rounded-br-sm'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-bl-sm'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.isOwn ? 'text-blue-100' : 'text-slate-500'
                      }`}
                    >
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Campo de Entrada de Texto */}
          <div className="bg-white border-t border-slate-200 p-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-end gap-2">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="text-slate-600 hover:text-slate-800 flex-shrink-0"
                >
                  <Paperclip className="w-5 h-5" />
                </Button>
                <div className="flex-1 relative">
                  <Input
                    type="text"
                    placeholder="Escribe un mensaje..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    className="pr-10 bg-slate-50 border-slate-200"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-800"
                  >
                    <Smile className="w-5 h-5" />
                  </Button>
                </div>
                <Button
                  onClick={handleSendMessage}
                  disabled={!messageText.trim()}
                  className="bg-blue-600 hover:bg-blue-700 text-white flex-shrink-0"
                  size="icon"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
              <p className="text-xs text-slate-500 mt-2 text-center">
                Presiona Enter para enviar, Shift+Enter para nueva línea
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
