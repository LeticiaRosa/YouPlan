# 🎥 YouPlan

**YouPlan** é uma aplicação web inteligente para planejar sua agenda semanal de vídeos do YouTube. Com uma interface moderna e algoritmos inteligentes, você pode otimizar seu tempo de visualização baseado na sua disponibilidade e interesses.

![image](https://github.com/user-attachments/assets/be08c76e-2334-4539-816e-88f625e72fe1)

### 🔍 **Sistema de Busca Inteligente**

- Busca de vídeos por múltiplas palavras-chave simultâneas
- Suporte a pesquisas combinadas
- Sistema de tags para gerenciar termos de busca
- Validação para evitar termos duplicados

### 📅 **Planejamento Automático da Agenda**

- Configure minutos disponíveis para cada dia da semana
- Algoritmo inteligente que distribui vídeos respeitando:
  - Duração máxima por dia
  - Não fragmentação de vídeos entre dias
  - Otimização baseada no maior tempo disponível
  - Horários automáticos (início às 9:00)

### 🎯 **Interface Moderna e Responsiva**

- Design responsivo com Tailwind CSS
- Calendário interativo com React Big Calendar
- Modal para visualização detalhada de eventos
- Skeleton loading para melhor UX

### ⚡ **Performance e Otimização**

- Busca paginada de vídeos (até 200 por sessão)
- Processamento em lotes da API do YouTube
- Sistema de cache e otimização de requests
- Validação robusta com Zod e React Hook Form

## 🏗️ Arquitetura do Projeto

```
src/
├── api/
│   ├── clients/          # Configuração do Axios
│   ├── services/         # Serviços da API YouTube
│   ├── types/           # Tipos TypeScript
│   └── mock/            # Dados mockados
├── components/
│   ├── Form/            # Formulários e validação
│   │   ├── Search/      # Sistema de busca
│   │   └── Minutes-per-day/ # Configuração de tempo
│   ├── CalendarSkeleton.tsx # Loading state
│   ├── Header.tsx       # Cabeçalho
│   └── VideoSchedule.tsx # Calendário principal
├── contexts/            # Context API (Estado global)
└── global.css          # Estilos Tailwind customizados
```

## 🛠️ Stack Tecnológica

### **Frontend**

- ⚛️ **React 19** com TypeScript
- 🎨 **Tailwind CSS 4** (latest) + PostCSS
- 📋 **React Hook Form** + Zod para validação
- 📅 **React Big Calendar** para interface de calendário
- 🔄 **React Loading Skeleton** para estados de loading
- 🎯 **Phosphor React** para ícones

### **API e Dados**

- 🌐 **YouTube Data API v3**
- 📡 **Axios** para requisições HTTP
- 📊 **Date-fns** para manipulação de datas
- ⏱️ **ISO8601 Duration** para parsing de durações

### **Build Tools**

- ⚡ **Vite 6** como bundler
- 📝 **ESLint** para linting
- 🔧 **TypeScript 5.7** para tipagem

## 🚀 Como Executar o Projeto

### **Pré-requisitos**

- Node.js 18+
- npm ou yarn
- Chave da API do YouTube Data v3

### **1. Configuração da API YouTube**

1. Acesse o [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Habilite a [YouTube Data API v3](https://console.cloud.google.com/apis/library/youtube.googleapis.com)
4. Crie credenciais (API Key)
5. Configure domínios autorizados se necessário

### **2. Instalação**

```bash
# Clone o repositório
git clone https://github.com/LeticiaRosa/YouPlan.git

# Acesse o diretório
cd YouPlan

# Instale as dependências
npm install
```

### **3. Configuração do Ambiente**

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_YOUTUBE_API_KEY=sua_chave_api_aqui
VITE_YOUTUBE_BASE_API_URL=https://www.googleapis.com/youtube/v3
```

### **4. Executar em Desenvolvimento**

```bash
npm run dev
```

### **5. Build para Produção**

```bash
npm run build
npm run preview
```

## 📖 Como Usar

1. **Configure sua busca**: Adicione termos de busca usando o campo "Search"
2. **Defina sua disponibilidade**: Configure quantos minutos você tem disponível para cada dia da semana
3. **Escolha a quantidade**: Defina quantos vídeos deseja incluir na busca (1-200)
4. **Gere sua agenda**: Clique em "Generate Schedule" e aguarde o processamento
5. **Visualize no calendário**: Navegue pela agenda gerada e clique nos vídeos para assistir

## 🎯 Algoritmo de Agendamento

O sistema utiliza um algoritmo recursivo inteligente que:

- **Filtra vídeos** pela duração máxima configurada
- **Distribui cronologicamente** respeitando a ordem de relevância
- **Otimiza o uso do tempo** sem fragmentar vídeos
- **Recicla dias** quando há vídeos não agendados
- **Gera horários realistas** começando às 9h da manhã

## 🔧 Scripts Disponíveis

```bash
npm run dev       # Servidor de desenvolvimento
npm run build     # Build de produção
npm run preview   # Preview da build
npm run lint      # Verificação de código
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Desenvolvido por

**Letícia Rosa**

- GitHub: [@LeticiaRosa](https://github.com/LeticiaRosa)

---

<div align="center">

**⭐ Se este projeto foi útil para você, considere dar uma estrela!**

</div>
