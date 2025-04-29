# 🎥 YouPlan

**YouPlan** é uma aplicação web para ajudar você a planejar sua semana de vídeos no YouTube de forma inteligente. Com ela, você informa quanto tempo disponível tem por dia e a palavra-chave do tipo de conteúdo que deseja assistir. O sistema se encarrega de buscar os vídeos, calcular uma agenda viável e exibir insights baseados nos resultados.

## 🚀 Funcionalidades

- 🔍 **Busca de vídeos** com base em palavras-chave (usando a API do YouTube)
- 📊 **Exibição das 5 palavras mais comuns** nos títulos e descrições dos vídeos
- ⏱️ **Planejamento automático da semana**, baseado na duração dos vídeos e no tempo disponível informado
- 🧠 **Algoritmo inteligente** que respeita as regras:
  - Não assistir vídeos que excedam o tempo disponível do dia
  - Não iniciar vídeos que não possam ser finalizados no mesmo dia
  - Ignorar vídeos maiores do que o maior tempo disponível da semana
  - Manter a ordem dos vídeos como retornados
  - Considerar apenas os primeiros 200 vídeos

## 🛠️ Tecnologias Utilizadas

- React + TypeScript
- Tailwind CSS
- YouTube Data API v3
- Vite
- Axios

## 🔑 Pré-requisitos

- Conta no Google Cloud com acesso à [YouTube Data API](https://console.cloud.google.com/apis/library/youtube.googleapis.com)
- Chave de API configurada no `.env`

```env
VITE_YOUTUBE_API_KEY=your_api_key_here
```


## ⚙️ Como Rodar o Projeto

### 1. Clone o repositório
```bash
git clone https://https://github.com/LeticiaRosa/YouPlan.git
```

### 2. Acesse a pasta
```bash
cd youplan
```

### 3. Instale as dependências
```bash
npm install
```
### 4. Inicie o servidor de desenvolvimento
```bash
npm run dev
```

## 📌 Licença
Este projeto está sob a licença MIT.

## ✨ Autor
Desenvolvido com 💙 por Letícia Rosa
