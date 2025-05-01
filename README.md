# 🎥 YouPlan

**YouPlan** é uma aplicação web para ajudar você a planejar sua semana de vídeos no YouTube de forma inteligente. Com ela, você informa quanto tempo disponível tem por dia e a palavra-chave do tipo de conteúdo que deseja assistir. O sistema se encarrega de buscar os vídeos, calcular uma agenda viável e exibir insights baseados nos resultados.

## 🚀 Funcionalidades

Você recebeu uma demanda para desenvolver um sistema onde seja possível planejar os vídeos que deseja
ver no YouTube. Neste sistema, você poderá informar a quantidade de minutos disponíveis para cada dia da
semana e a palavra-chave dos vídeos que deseja ver. O sistema fornecerá a sequência de vídeos e os dias
em que você deve assisti-los. Além disso, algumas das funcionalidades que devem estar presentes estão lis-
tadas abaixo:

Busca e mostra os videos com base no termo de busca.

Mostra as 5 palavras que mais aparecem nos títulos e descrições.

Mostre quantos dias eu levaria para conseguir ver todos os videos retornados seguindo as seguintes
condições:

1. Usuário irá informar quanto tempo ele pode gastar diariamente durante uma semana. Por exemplo, [15,
120, 30, 150, 20, 40, 90] em minutos.

2. O usuário não gastará mais tempo assistindo a vídeos do que seu máximo diário.

3. O usuário não começará outro vídeo a menos que ele possa terminar no mesmo dia.

4. Vídeos mais longos do que o dia mais longo serão ignorados.

5. O usuário assistirá aos vídeos na exata ordem em que foram retornados.

6. Exemplo: considerando a semana como declarado acima e a pesquisa retornando 10 videos com as se-
guintes durações: [20, 30, 60, 90, 200, 30, 40, 20, 60, 15], no primeiro dia nenhum vídeo será assistido, no se-
gundo o usuário assistirá a 3 vídeos [20, 30, 60], no terceiro nenhum será assistido, no quarto 2 [90, 30] serão
assistidos e um será ignorado, no quinto nenhum será assistido, no sexto dia um vídeo [40] será assistido, no
sétimo dia 2 serão assistidos [20, 60] e no oitavo dia o último será assistido [15].

7. Apenas os primeiros 200 vídeos devem ser considerados.

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
