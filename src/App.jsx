import React, { useEffect, useMemo, useState } from "react";
import { fetchWeather } from "./weather";
import {
  Plane,
  Car,
  Hotel,
  Ticket,
  CalendarDays,
  Clock3,
  Sun,
  Cloud,
  CloudSun,
  CloudRain,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  Snowflake,
} from "lucide-react";
import "./App.css";

export default function App() {
  const [activeDay, setActiveDay] = useState(15);
  const [activeHeroTab, setActiveHeroTab] = useState(null);
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState("");

  const travelers = ["Lucas", "Amanda", "Matheus", "Rafa"];

  const currentWeatherCity =
    activeDay >= 15 && activeDay <= 17
      ? "Miami"
      : activeDay >= 18 && activeDay <= 21
      ? "Orlando"
      : activeDay >= 22 && activeDay <= 24
      ? "Washington"
      : activeDay >= 25 && activeDay <= 27
      ? "New York City"
      : activeDay >= 28
      ? "Miami"
      : "Campinas";

  useEffect(() => {
    let isMounted = true;

    async function loadWeather() {
      try {
        setWeatherLoading(true);
        setWeatherError("");
        const data = await fetchWeather(currentWeatherCity);

        if (isMounted) {
          setWeather(data);
        }
      } catch (error) {
        if (isMounted) {
          setWeatherError("Não foi possível atualizar o clima.");
        }
      } finally {
        if (isMounted) {
          setWeatherLoading(false);
        }
      }
    }

    loadWeather();

    const interval = setInterval(() => {
      loadWeather();
    }, 15 * 60 * 1000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [currentWeatherCity]);

  const heroTabs = [
    {
      key: "flights",
      title: "Voos",
      value: "Trechos, horários e conexões",
      icon: <Plane size={24} strokeWidth={2.1} />,
    },
    {
      key: "car",
      title: "Carros",
      value: "BMW X7 + Mustang conversível",
      icon: <Car size={24} strokeWidth={2.1} />,
    },
    {
      key: "hotel",
      title: "Hotéis",
      value: "Miami, Orlando, Washington e NYC",
      icon: <Hotel size={24} strokeWidth={2.1} />,
    },
    {
      key: "tickets",
      title: "Ingressos",
      value: "Parques, museus e experiências",
      icon: <Ticket size={24} strokeWidth={2.1} />,
    },
  ];

  const heroDetails = {
    flights: [
      {
        label: "Ida",
        title: "GYN → VCP → FLL",
        text: "Saída em 14/04 e chegada em Fort Lauderdale em 15/04 às 06:20.",
      },
      {
        label: "Washington",
        title: "MCO → EWR → DCA",
        text: "Transição aérea da fase Orlando para Washington em 22/04.",
      },
      {
        label: "NYC",
        title: "IAD → LGA",
        text: "Voo noturno de Washington para Nova York em 24/04.",
      },
      {
        label: "Retorno",
        title: "FLL → VCP → GYN",
        text: "Volta ao Brasil em 29/04, com chegada em Goiânia às 21:25.",
      },
    ],

    car: [
      {
        label: "Miami / Orlando",
        title: "BMW X7",
        text: "Base da fase Miami, Lakeland e Orlando com conforto para operação forte.",
      },
      {
        label: "Final da viagem",
        title: "Mustang conversível",
        text: "Retirada em Miami no dia 28/04 para a última fase da viagem.",
      },
      {
        label: "Estratégia",
        title: "Carro só onde faz sentido",
        text: "Washington e NYC ficam sem carro, com foco em Uber, caminhada e transporte público.",
      },
    ],

    hotel: [
      {
        label: "Miami",
        title: "Casa Boutique Hotel",
        text: "Base de South Beach e retorno da fase final em Miami.",
      },
      {
        label: "Orlando",
        title: "Travelodge by Wyndham",
        text: "Base operacional da fase parques e compras.",
      },
      {
        label: "Washington",
        title: "Base urbana sem carro",
        text: "Foco em deslocamentos inteligentes por Uber e caminhada.",
      },
      {
        label: "NYC",
        title: "Wyndham Garden North Bergen",
        text: "Base estratégica para Manhattan com melhor lógica de custo e operação.",
      },
    ],

    tickets: [
      {
        label: "Parques",
        title: "Magic Kingdom, Epic e SeaWorld",
        text: "Execução forte com foco em tempo, energia e estratégia.",
      },
      {
        label: "Washington",
        title: "Library + Air & Space",
        text: "Blocos históricos e técnicos com horário bem definido.",
      },
      {
        label: "Nova York",
        title: "Liberty, 9/11, SUMMIT e Intrepid",
        text: "Pontos altos da fase NYC com reservas já alinhadas.",
      },
    ],
  };

  const itinerary = {
    14: [
      {
        time: "11:00",
        title: "Saída de Anápolis",
        description: "Início oficial da viagem rumo ao aeroporto de Goiânia.",
        strategy:
          "O primeiro dia precisa começar limpo. O objetivo não é só sair de casa; é proteger toda a cadeia do dia.",
        transport: "Carro ou Uber",
        location: "Anápolis → Aeroporto Santa Genoveva (GYN), Goiânia, GO",
        photoSpot: "",
        practicalPlan:
          "Sair com documentos, cartões, passaportes e reservas já concentrados na mochila principal. Nada de organizar mala no carro ou resolver detalhe no caminho.",
        pitfalls:
          "Sair no limite, descobrir documento faltando no meio do trajeto ou chegar ao aeroporto já no modo correria.",
        tips: [
          "Em dia de voo internacional, atraso bobo na etapa terrestre costuma contaminar o humor e a logística do resto do dia.",
          "Vale sair com roupa confortável e já pensando em muitas horas de deslocamento.",
          "Mochila principal precisa sair de casa pronta, não quase pronta.",
        ],
        hack: "Começar a viagem sem correria compra paz mental muito mais do que parece.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "12:10",
        title: "Chegada ao Aeroporto de Goiânia",
        description:
          "Despacho de bagagem e entrada na área segura antes do primeiro voo.",
        strategy:
          "Resolver a parte técnica cedo e transformar o aeroporto em base de conforto, não em sala de espera estressante.",
        transport: "A pé / aeroporto",
        location: "Aeroporto Santa Genoveva (GYN), Goiânia, GO",
        photoSpot: "",
        practicalPlan:
          "Despachar bagagem, passar pela segurança e seguir direto para a área segura sem enrolar no saguão.",
        pitfalls:
          "Perder tempo do lado de fora, reorganizar mala na fila e chegar na sala VIP tarde demais para aproveitar bem o bloco.",
        tips: [
          "Quanto mais cedo vocês entrarem na área segura, mais leve o resto da tarde fica.",
          "Esse bloco é sobre tirar ruído do dia, não sobre passear no terminal.",
          "Vale já deixar power bank e cabos acessíveis.",
        ],
        hack: "Despachou, passou pela segurança e entrou no lounge: o dia já melhora muito.",
        restaurant: "",
        lounge: "Advantage VIP Lounge",
      },
      {
        time: "12:30",
        title: "Almoço leve da viagem",
        description: "Primeira refeição estratégica da jornada, ainda no aeroporto.",
        strategy:
          "Comer bem sem pesar. O almoço aqui serve para sustentar a tarde e evitar fome ruim depois.",
        transport: "",
        location: "Advantage VIP Lounge — Aeroporto Santa Genoveva",
        photoSpot: "",
        practicalPlan:
          "Priorizar uma refeição simples, com proteína, algo leve de carboidrato e hidratação, sem transformar o bloco em pausa longa demais.",
        pitfalls:
          "Prato pesado, exagero em doce e sair do lounge já com sensação de cansaço.",
        tips: [
          "Em dia de conexão longa e voo noturno, almoço leve ajuda mais do que almoço caprichado demais.",
          "Água conta tanto quanto comida nesse começo.",
          "Melhor sair satisfeito do que estufado.",
        ],
        hack:
          "Quem come limpo cedo chega melhor em Viracopos e dorme melhor no internacional.",
        restaurant: "Refeição do lounge",
        lounge: "",
      },
      {
        time: "15:25",
        title: "Voo GYN → VCP",
        description:
          "Primeiro voo do deslocamento rumo à saída internacional do Brasil.",
        strategy:
          "Trecho funcional. A missão aqui é chegar bem em Viracopos para usar a conexão com inteligência.",
        transport: "Azul AD 4867",
        location:
          "Aeroporto Santa Genoveva (GYN) → Aeroporto de Viracopos (VCP)",
        photoSpot: "",
        practicalPlan:
          "Embarcar já com os itens do voo internacional organizados na mochila de mão, para não precisar revirar tudo depois.",
        pitfalls:
          "Tratar esse trecho como irrelevante e chegar em Campinas desorganizado.",
        tips: [
          "Conexão boa começa no voo anterior, não no aeroporto seguinte.",
          "Vale deixar fone, cabo, documento e itens de conforto fáceis de acessar.",
        ],
        hack:
          "Quem pousa em VCP já organizado aproveita muito melhor a conexão nobre do dia.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "17:05",
        title: "Conexão em Viracopos",
        description: "Bloco premium de preparação para a saída internacional.",
        strategy:
          "Viracopos não é corredor de aeroporto. É o bloco que vai transformar a noite longa em voo suportável e a chegada em Miami em algo muito melhor.",
        transport: "A pé / aeroporto",
        location: "Aeroporto de Viracopos — Campinas, SP",
        photoSpot: "",
        practicalPlan:
          "Entrar no lounge, jantar cedo, descansar, reorganizar itens pessoais e, se possível, tomar banho antes do embarque internacional.",
        pitfalls:
          "Gastar a conexão andando sem propósito no terminal e perder justamente o melhor momento de conforto da saída do Brasil.",
        tips: [
          "Conexão longa bem usada vale quase como uma mini recuperação antes do voo noturno.",
          "Banho, jantar e mochila organizada mudam de verdade a qualidade da madrugada.",
          "Quem desperdiça esse bloco geralmente sente isso no dia seguinte.",
        ],
        hack:
          "Tratar Viracopos como centro de comando da saída do Brasil eleva o nível da viagem inteira.",
        restaurant: "",
        lounge: "Lounge Azul internacional",
      },
      {
        time: "17:30",
        title: "Jantar principal da saída do Brasil",
        description: "Refeição principal antes do voo internacional.",
        strategy:
          "O jantar aqui serve para fazer vocês dependerem menos da comida do avião e embarcarem mais confortáveis.",
        transport: "",
        location: "Lounge Azul internacional — Viracopos",
        photoSpot: "",
        practicalPlan:
          "Comer com calma, sem exagerar, e deixar o avião mais para descanso do que para compensação alimentar.",
        pitfalls: "Exagerar no prato e embarcar pesado demais.",
        tips: [
          "Muita gente viaja melhor quando janta bem em solo e usa o voo só para descansar.",
          "Essa é uma das refeições mais estratégicas da viagem, não só mais uma parada para comer.",
        ],
        hack: "Jantar bom em solo quase sempre rende noite melhor no avião.",
        restaurant: "Refeição do lounge",
        lounge: "",
      },
      {
        time: "20:30",
        title: "Banho e reorganização final",
        description: "Último ajuste antes do embarque internacional.",
        strategy:
          "Entrar no avião já limpo, alimentado e com tudo acessível melhora muito a noite.",
        transport: "",
        location: "Lounge Azul internacional — Viracopos",
        photoSpot: "",
        practicalPlan:
          "Separar passaporte, fones, cabo, carregador e itens de descanso antes de sair do lounge.",
        pitfalls: "Sair correndo do lounge sem revisar o básico.",
        tips: [
          "Pequenos confortos antes do embarque viram diferença enorme quando a madrugada começa.",
          "Esse é daqueles blocos que parecem pequenos, mas elevam muito a experiência.",
        ],
        hack: "Quem embarca reorganizado dorme melhor e chega melhor.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "22:45",
        title: "Voo VCP → FLL",
        description: "Voo internacional para Fort Lauderdale.",
        strategy:
          "A missão do trecho é simples: descansar o máximo possível e chegar funcional para executar o dia 15.",
        transport: "Azul AD 8704",
        location:
          "Aeroporto de Viracopos (VCP) → Fort Lauderdale-Hollywood International Airport (FLL)",
        photoSpot: "",
        practicalPlan:
          "Acomodar rápido, hidratar, reduzir tela e entrar em modo descanso assim que possível.",
        pitfalls:
          "Transformar a madrugada em sessão de entretenimento e acordar quebrado na chegada.",
        tips: [
          "Em viagem curta e intensa, dormir no voo de ida vale mais do que aproveitar o avião.",
          "Chegar funcional em Miami muda muito a leitura do dia 15.",
        ],
        hack: "No voo de ida, descanso vale mais do que distração.",
        restaurant: "",
        lounge: "",
      },
    ],

    15: [
      {
        time: "05:50",
        title: "Preparação final ainda no voo",
        description: "Organização para pousar já no modo imigração e locadora.",
        strategy:
          "Chegar organizado na cabine economiza tempo, stress e energia no primeiro chão dos EUA.",
        transport: "",
        location: "Voo VCP → FLL",
        photoSpot: "",
        practicalPlan:
          "Deixar passaporte, endereço do hotel, reserva da locadora e eSIM/celular já prontos antes do pouso.",
        pitfalls: "Pousar sem saber onde está documento, endereço ou reserva.",
        tips: [
          "O desembarque internacional fica muito mais leve quando a cabine já foi resolvida antes de tocar o solo.",
          "Primeiros 20 minutos bons em aeroporto americano valem ouro no dia inteiro.",
        ],
        hack: "Quem pousa pronto ganha a primeira batalha do dia 15.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "06:20",
        title: "Chegada em Fort Lauderdale",
        description: "Imigração, bagagem e entrada oficial nos Estados Unidos.",
        strategy:
          "Ganhar tempo aqui protege toda a lógica de hotel, carro e Sawgrass.",
        transport: "A pé / aeroporto",
        location:
          "Fort Lauderdale-Hollywood International Airport — 100 Terminal Dr, Fort Lauderdale, FL 33315",
        photoSpot: "",
        practicalPlan:
          "Passar pela imigração sem bagunçar mochila, retirar malas e seguir direto para a locadora.",
        pitfalls:
          "Parar no meio da fila para procurar documento ou reorganizar bagagem.",
        tips: [
          "Primeira regra da chegada: fila não é lugar para começar a procurar passaporte.",
          "Mobile Passport Control, quando aplicável, pode ser uma diferença real de tempo.",
          "O tom do dia 15 nasce aqui: eficiência ou confusão.",
        ],
        hack: "Imigração limpa compra o restante do dia.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "07:30",
        title: "Retirada da BMW X7",
        description: "Ativação do carro da fase Miami / Lakeland / Orlando.",
        strategy:
          "Sair da locadora com carro, fotos, painel, rota e conectividade resolvidos evita retrabalho no resto da Flórida.",
        transport: "Shuttle / locadora",
        location:
          "Sixt / área de locadoras — Fort Lauderdale-Hollywood International Airport",
        photoSpot:
          "Melhor momento é logo após a vistoria, com o carro limpo e ainda sem bagagem espalhada; foto mais forte na dianteira em ângulo 3/4 ou lateral limpa, com Amanda e Rafa funcionando melhor em clique rápido e mais espontâneo.",
        practicalPlan:
          "Fazer vistoria externa e interna, fotografar rodas, lataria e painel, configurar Apple CarPlay e só então sair.",
        pitfalls:
          "Sair sem registrar o estado do carro e descobrir detalhe depois, já na estrada.",
        tips: [
          "Foto do carro aqui não é só estética; também ajuda a documentar o estado da locação.",
          "Painel, quilometragem e rodas merecem registro.",
          "Resolver navegação antes de sair da locadora evita erro besta logo no começo.",
        ],
        hack:
          "Primeiros dez minutos na locadora podem te poupar muita dor de cabeça depois.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "08:20",
        title: "Casa Boutique Hotel / luggage storage",
        description:
          "Parada técnica para deixar malas, encontrar a turma e sair rápido para a missão do dia.",
        strategy:
          "Hotel aqui é base operacional, não descanso. Resolver rápido para proteger a manhã do Sawgrass.",
        transport: "BMW X7",
        location:
          "Casa Boutique Hotel — 1334 Washington Ave, Miami Beach, FL 33139",
        photoSpot: "",
        practicalPlan:
          "Usar luggage storage ou pré-check-in, ir ao banheiro se necessário e sair sem transformar o hotel em pausa longa.",
        pitfalls:
          "Sentar, relaxar demais e matar justamente a melhor parte da manhã de compras.",
        tips: [
          "No dia 15, hotel é base operacional, não descanso.",
          "Quanto mais rápido esse bloco, melhor o Sawgrass rende.",
        ],
        hack: "Hotel rápido, outlet forte.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "08:45",
        title: "Saída para o Sawgrass",
        description: "Início do dia de compras com foco total em eficiência.",
        strategy:
          "A manhã foi desenhada para resolver compra real e não para passear no outlet sem rumo.",
        transport: "BMW X7",
        location: "Casa Boutique Hotel → Sawgrass Mills, Sunrise, FL",
        photoSpot: "",
        practicalPlan:
          "Ir direto para a ala mais coerente com a missão principal, estacionar bem e entrar no outlet já com ordem mental de lojas.",
        pitfalls: "Chegar sem plano, estacionar longe e começar por loja aleatória.",
        tips: [
          "Em outlet grande, vaga certa vale quase tanto quanto loja certa.",
          "Manhã limpa costuma entregar loja mais organizada e menos cansaço burro.",
          "Estacionamento entra como tática do bloco, não como detalhe secundário.",
        ],
        hack: "No Sawgrass, quem começa certo anda menos e compra melhor.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "09:45",
        title: "Bloco 1 da missão no Sawgrass",
        description:
          "Primeira metade do outlet, focada em resolver compra real enquanto a operação ainda está limpa e com menos ruído.",
        strategy:
          "A manhã é a parte mais valiosa do Sawgrass. Aqui a missão é resolver o essencial com cabeça fria, sem abrir espaço para passeio inútil.",
        transport: "Caminhada",
        location: "Sawgrass Mills — 12801 W Sunrise Blvd, Sunrise, FL 33323",
        photoSpot: "",
        practicalPlan:
          "Começar pelas lojas mais prioritárias e mais resolutivas, entrando primeiro no que realmente pode mudar a viagem: esportivo, roupa boa e oportunidades fortes.",
        pitfalls:
          "Começar por vitrine bonita, premium cedo demais ou loja aleatória que rouba ritmo logo no começo.",
        tips: [
          "Manhã de outlet costuma render melhor porque a loja está mais organizada e a energia de vocês ainda está alta.",
          "O erro clássico é tratar o começo do Sawgrass como passeio e o fim como compra; o correto é o contrário.",
          "Se uma peça realmente forte aparecer cedo, resolve cedo.",
        ],
        hack: "No Sawgrass, manhã boa vale por metade do outlet.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "12:30",
        title: "Almoço no Sawgrass",
        description: "Pausa estratégica no meio da missão, sem roubar a tarde.",
        strategy:
          "O almoço precisa sustentar o segundo turno das compras, não virar intervalo de shopping.",
        transport: "Caminhada",
        location:
          "Sawgrass Mills — área de alimentação / eixo do almoço mais conveniente à rota",
        photoSpot: "",
        practicalPlan:
          "Escolher um lugar que resolva rápido, comer sem exagerar e já sair com a segunda metade do outlet desenhada.",
        pitfalls:
          "Parar longe da rota, demorar demais decidindo ou comer pesado a ponto de matar a tarde.",
        tips: [
          "Em dia de compra forte, almoço bom é o que devolve vocês rápido para a missão.",
          "Se a manhã já resolveu parte importante, a tarde fica mais refinada e menos ansiosa.",
          "Água no almoço conta tanto quanto comida.",
        ],
        hack:
          "Quem almoça rápido e limpo compra melhor na segunda metade do dia.",
        restaurant:
          "Baratos: Shake Shack / opção rápida eficiente • Premium: Yard House",
        lounge: "",
      },
      {
        time: "13:20",
        title: "Bloco 2 da missão no Sawgrass",
        description:
          "Segunda metade do outlet, com foco em premium complementar, revisão final e oportunidades reais.",
        strategy:
          "A tarde não é para recomeçar o outlet. É para completar a missão com inteligência e mente fria.",
        transport: "Caminhada",
        location: "Sawgrass Mills — ala complementar / premium / revisão final",
        photoSpot: "",
        practicalPlan:
          "Entrar primeiro nas lojas que realmente completam a manhã, revisar oportunidades premium e encerrar o outlet sem inventar terceira rodada.",
        pitfalls:
          "Repetir loja sem necessidade, abrir bloco novo por impulso ou comprar coisa que não compensa de verdade.",
        tips: [
          "O premium da tarde só vale quando entra como complemento, não como distração.",
          "Se a manhã já resolveu o principal, a tarde precisa lapidar, não bagunçar.",
          "Outlet bom termina com sensação de missão cumprida, não de exaustão aleatória.",
        ],
        hack: "A tarde serve para lapidar o outlet, não para perder o fio da meada.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "16:40",
        title: "Retorno para Miami Beach",
        description: "Saída do Sawgrass e volta para a base em South Beach.",
        strategy:
          "Fechar o outlet no tempo certo protege a noite em Miami e evita chegar morto no hotel.",
        transport: "BMW X7",
        location: "Sawgrass Mills → Casa Boutique Hotel, Miami Beach",
        photoSpot: "",
        practicalPlan:
          "Organizar as compras no carro antes de sair, definir a rota e voltar sem desvio desnecessário.",
        pitfalls:
          "Emendar outra parada boba, sair sem organizar as sacolas ou tratar a volta como se o dia já estivesse resolvido.",
        tips: [
          "Saída limpa do outlet preserva humor e energia.",
          "O primeiro fim de tarde em Miami vale muito mais quando o Sawgrass termina no ponto certo.",
          "Vale deixar as compras já minimamente agrupadas para não bagunçar o check-in.",
        ],
        hack: "Sair do outlet no ponto certo protege a noite inteira.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "17:30",
        title: "Check-in definitivo no Casa Boutique",
        description:
          "Entrada oficial no hotel e reorganização curta antes da primeira noite em Miami.",
        strategy:
          "Esse bloco é operacional. A missão é hotelizar, respirar rápido e sair de novo.",
        transport: "BMW X7",
        location:
          "Casa Boutique Hotel — 1334 Washington Ave, Miami Beach, FL 33139",
        photoSpot: "",
        practicalPlan:
          "Subir malas e compras, alinhar quarto e estacionamento, tomar banho rápido e trocar de roupa sem transformar isso em descanso longo.",
        pitfalls:
          "Deitar, sumir por muito tempo ou perder o timing da noite por exaustão mal administrada.",
        tips: [
          "Primeiro check-in de verdade da viagem precisa resolver a base, não engolir a noite.",
          "Se o estacionamento do hotel exigir lógica específica, isso já deve ser resolvido aqui.",
          "Quanto mais simples for essa virada, melhor a noite rende.",
        ],
        hack: "Hotel bom no dia 15 é o que organiza a noite sem sequestrar a energia.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "18:30",
        title: "Ocean Drive e ambientação em South Beach",
        description:
          "Primeiro contato real com a atmosfera clássica de Miami Beach.",
        strategy:
          "A função desse bloco é fazer a chegada a Miami parecer grande, sem tentar espremer a cidade inteira no primeiro dia.",
        transport: "Caminhada",
        location: "Ocean Drive / Lummus Park — Miami Beach, FL",
        photoSpot:
          "Melhores fotos no eixo da Ocean Drive com o mar, as palmeiras e as fachadas ao fundo; fim de tarde e começo da noite favorecem Amanda e Rafa em fotos mais espontâneas, com pausa curta e clima de chegada, sem pose forçada demais.",
        practicalPlan:
          "Sair do hotel a pé, caminhar pelo eixo mais clássico da região, sentir o ambiente e guardar energia para jantar e fechamento da noite.",
        pitfalls:
          "Querer fazer Miami inteira no primeiro passeio ou cair em restaurante caça-turista só pela fachada.",
        tips: [
          "Ocean Drive funciona melhor como ambientação do que como bloco de pressa.",
          "A região mistura a praia, a linguagem Art Deco e a imagem mais clássica de South Beach.",
          "Primeira noite boa em Miami é a que apresenta a cidade sem esgotar o grupo.",
        ],
        hack: "No primeiro dia, sentir a cidade vale mais do que tentar dominá-la.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "20:00",
        title: "Jantar da primeira noite",
        description: "Fechamento gostoso e inteligente da chegada em Miami.",
        strategy:
          "O jantar precisa ser bom e coerente com o cansaço do dia, sem virar operação pesada demais.",
        transport: "Caminhada",
        location: "Miami Beach — eixo South Beach / próximo ao hotel",
        photoSpot: "",
        practicalPlan:
          "Escolher um jantar de boa execução e fácil encaixe no eixo da noite, preservando o retorno ao hotel sem grande deslocamento extra.",
        pitfalls:
          "Escolher só pela fachada, cair em armadilha turística ou transformar o jantar num bloco maior do que a energia do grupo suporta.",
        tips: [
          "Na primeira noite, conforto e sabor normalmente valem mais do que experiência mirabolante.",
          "Lugar bem escolhido ajuda o dia a terminar com sensação boa e não só com fome resolvida.",
          "Se o grupo estiver mais cansado, solução simples e boa vence jantar performático.",
        ],
        hack: "Primeira noite boa é a que fecha bem e deixa vontade de continuar.",
        restaurant:
          "Baratos: La Sandwicherie / Havana 1957 • Premium: Prime 112",
        lounge: "",
      },
      {
        time: "21:20",
        title: "Retorno ao hotel",
        description: "Fim oficial do primeiro dia em solo americano.",
        strategy:
          "Encerrar no ponto certo para o dia 16 nascer mais bonito e mais leve.",
        transport: "Caminhada",
        location: "South Beach → Casa Boutique Hotel",
        photoSpot: "",
        practicalPlan:
          "Voltar direto, colocar eletrônicos em carga e deixar o básico do dia seguinte separado.",
        pitfalls:
          "Esticar a noite sem necessidade só porque a cidade está bonita.",
        tips: [
          "Dias bons quase sempre terminam um pouco antes do impulso de exagerar.",
          "Carga de celular e power bank hoje vale tempo amanhã.",
        ],
        hack: "",
        restaurant: "",
        lounge: "",
      },
      {
        time: "21:40",
        title: "Preparação do dia seguinte",
        description:
          "Ajuste leve para o dia de South Beach + urbano premium.",
        strategy:
          "Separar o básico da manhã e já deixar a transição para a parte urbana mais fácil.",
        transport: "",
        location: "Casa Boutique Hotel",
        photoSpot: "",
        practicalPlan:
          "Deixar roupa da manhã, itens de praia leve, água, protetor, carregadores e troca para o bloco urbano já mais ou menos encaminhados.",
        pitfalls:
          "Dormir sem alinhar o mínimo e começar o dia 16 já no improviso.",
        tips: [
          "Dias híbridos rendem mais quando a troca de atmosfera começa na noite anterior.",
          "Miami de manhã e Miami de fim de tarde pedem leituras visuais diferentes.",
        ],
        hack: "Separar o básico hoje deixa o dia 16 muito mais elegante amanhã.",
        restaurant: "",
        lounge: "",
      },
    ],

    16: [
      {
        time: "07:45",
        title: "Acordar",
        description:
          "Início do dia que mistura praia clássica, arquitetura e fechamento elegante em Brickell.",
        strategy:
          "Hoje o segredo é costurar duas atmosferas: manhã leve de South Beach e tarde urbana refinada.",
        transport: "",
        location: "",
        photoSpot: "",
        practicalPlan:
          "Levantar já com uma mochila leve para a manhã e sem bagunçar a cabeça com a parte urbana ainda cedo demais.",
        pitfalls:
          "Começar o dia devagar demais e contaminar a virada para a tarde.",
        tips: [
          "O valor desse dia está justamente no contraste entre praia e cidade.",
          "Mochila leve cedo ajuda muito a curtir South Pointe com mais liberdade.",
        ],
        hack: "Hoje menos peso na mão significa mais beleza no dia.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "08:15",
        title: "Café da manhã no hotel",
        description: "Café funcional para proteger a manhã em South Beach.",
        strategy: "Ganhar tempo cedo e evitar deslocamento bobo para cafeteria.",
        transport: "",
        location: "Casa Boutique Hotel — Miami Beach, FL",
        photoSpot: "",
        practicalPlan:
          "Comer bem, sem exagerar, e sair já em ritmo de primeiro bloco, não em ritmo de manhã preguiçosa.",
        pitfalls: "Estender demais o café e deixar a praia já começar tarde.",
        tips: [
          "Café no hotel, nesse tipo de dia, é decisão inteligente e não falta de charme.",
          "Proteger a manhã externa vale mais do que buscar café bonito fora.",
        ],
        hack: "",
        restaurant: "Café do hotel / café vinculado à hospedagem",
        lounge: "",
      },
      {
        time: "08:50",
        title: "Saída do hotel",
        description: "Saída a pé rumo a South Pointe Park.",
        strategy:
          "Começar o dia andando já coloca Miami Beach no corpo e evita complicação desnecessária com carro cedo.",
        transport: "Caminhada",
        location: "Casa Boutique Hotel → South Pointe Park, Miami Beach",
        photoSpot: "",
        practicalPlan:
          "Levar só o essencial, sair leve e entrar no eixo da manhã sem inventar parada no meio.",
        pitfalls:
          "Carregar coisa demais ou transformar a ida em deslocamento desorganizado.",
        tips: [
          "Em South Beach, muita coisa rende melhor a pé do que de carro.",
          "Menos peso significa melhor foto, melhor caminhada e menos cansaço.",
        ],
        hack: "",
        restaurant: "",
        lounge: "",
      },
      {
        time: "09:05",
        title: "South Pointe Park",
        description:
          "Primeiro bloco forte da manhã, com mar, pedras, pier e skyline.",
        strategy:
          "Começar por South Pointe é começar por um dos pontos mais bonitos e mais limpos visualmente da região.",
        transport: "Caminhada",
        location: "South Pointe Park — 1 Washington Ave, Miami Beach, FL 33139",
        photoSpot:
          "Melhores fotos perto do pier e das bordas com pedras, usando o skyline e o mar ao fundo; manhã favorece luz mais limpa, foto posada elegante para Amanda e foto mais espontânea para Rafa caminhando ou olhando o horizonte.",
        practicalPlan:
          "Chegar cedo, trabalhar o pier primeiro, depois as pedras e os ângulos do parque, sem deixar o bloco virar caminhada longa demais.",
        pitfalls:
          "Chegar já cansado, correr demais pelo bloco ou gastar tempo no lugar menos bonito do parque.",
        tips: [
          "Esse é um dos pontos em que Miami Beach parece mais sofisticada e menos caricata.",
          "A manhã costuma entregar o melhor equilíbrio entre luz e tranquilidade.",
          "Vale pensar esse bloco como ponto de imagem forte do dia.",
        ],
        hack: "South Pointe cedo já faz Miami parecer premium.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "10:00",
        title: "Tower 10",
        description: "Parada curta no ícone clássico de South Beach.",
        strategy:
          "Usar esse bloco como foto de assinatura, sem roubar o ritmo da manhã.",
        transport: "Caminhada",
        location: "10th Street Lifeguard Tower — Miami Beach, FL",
        photoSpot:
          "Melhor foto com a torre lateralizada e céu aberto ao fundo; funciona melhor como clique rápido, leve e divertido, mais espontâneo do que encenado demais.",
        practicalPlan:
          "Chegar, fotografar bem e seguir, sem transformar a torre em bloco maior do que ela merece.",
        pitfalls:
          "Enrolar demais num ponto que é melhor justamente por ser curto e certeiro.",
        tips: [
          "As lifeguard towers fazem parte da identidade visual mais famosa de Miami Beach.",
          "Esse é daqueles clichês que valem a pena porque funcionam.",
        ],
        hack: "",
        restaurant: "",
        lounge: "",
      },
      {
        time: "10:30",
        title: "Lummus Park",
        description:
          "Fechamento da manhã de praia com palmeiras, faixa de areia e clima clássico de South Beach.",
        strategy:
          "Encerrar o bloco externo da manhã ainda com energia, antes de virar o dia para a parte urbana.",
        transport: "Caminhada",
        location: "Lummus Park — Ocean Dr, Miami Beach, FL 33139",
        photoSpot:
          "Melhores fotos no alinhamento entre palmeiras e praia, com composição mais aberta; esse ponto favorece foto espontânea, andando ou com pausa curta, mais do que pose parada longa.",
        practicalPlan:
          "Caminhar o suficiente para sentir o clima do lugar, fotografar e voltar ao hotel no ponto certo.",
        pitfalls:
          "Esticar demais a praia e prejudicar a troca de roupa, o almoço e o bloco urbano.",
        tips: [
          "Lummus é mais atmosfera do que atração isolada.",
          "Esse é um bom ponto para fotos com cara de Miami clássica sem esforço exagerado.",
        ],
        hack: "",
        restaurant: "",
        lounge: "",
      },
      {
        time: "11:15",
        title: "Retorno ao hotel",
        description: "Virada do dia: sai a praia, entra a cidade.",
        strategy:
          "Esse bloco existe para trocar a energia do dia, não para criar preguiça.",
        transport: "Caminhada",
        location: "Casa Boutique Hotel — Miami Beach",
        photoSpot: "",
        practicalPlan:
          "Tomar banho rápido, trocar de roupa, reorganizar o mínimo e sair já pensando na parte urbana.",
        pitfalls: "Deitar, relaxar demais e perder o eixo da tarde.",
        tips: [
          "Dia híbrido fica premium quando a troca de atmosfera é bem feita.",
          "Roupa certa muda muito a sensação de Design District e Brickell.",
        ],
        hack: "A elegância da tarde começa nesse banho rápido.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "12:30",
        title: "Almoço em Miami Beach",
        description:
          "Almoço de transição entre a manhã leve e a tarde mais urbana.",
        strategy:
          "Comer bem o suficiente para sustentar o resto do dia, sem almoço pesado demais.",
        transport: "",
        location: "Miami Beach — região útil à rota da tarde",
        photoSpot: "",
        practicalPlan:
          "Escolher um almoço de boa execução e saída rápida para não atrasar o Design District.",
        pitfalls:
          "Comer pesado demais ou deixar o almoço crescer demais no relógio.",
        tips: [
          "Almoço certo aqui protege o visual e a energia da tarde.",
          "Joe’s Take Away funciona muito bem quando se quer assinatura boa sem operação longa.",
        ],
        hack: "",
        restaurant:
          "Baratos: La Sandwicherie / Joe’s Take Away • Premium: Joe’s Stone Crab",
        lounge: "",
      },
      {
        time: "14:00",
        title: "Saída para o Miami Design District",
        description: "Início do bloco urbano da tarde.",
        strategy:
          "Entrar no Design District com estacionamento e direção resolvidos evita perda de tempo e de humor.",
        transport: "BMW X7",
        location: "Miami Beach → Miami Design District, Miami, FL",
        photoSpot: "",
        practicalPlan:
          "Ir direto para a garagem mais coerente com a rota, estacionar e começar o bloco a pé sem rodeio.",
        pitfalls:
          "Rodar atrás de vaga mágica na rua e chegar no bairro já irritado.",
        tips: [
          "Em bairro urbano premium, garagem certa vale muito mais do que romantizar vaga aleatória.",
          "Estacionamento deve servir a experiência, não competir com ela.",
        ],
        hack: "",
        restaurant: "",
        lounge: "",
      },
      {
        time: "14:30",
        title: "Miami Design District",
        description: "Arquitetura, vitrines premium e um Miami mais sofisticado.",
        strategy:
          "Esse bloco é menos sobre compra e mais sobre atmosfera, imagem e passeio refinado.",
        transport: "Caminhada",
        location: "Miami Design District — Miami, FL",
        photoSpot:
          "Melhores fotos em eixos de arquitetura limpa, obras e áreas abertas do distrito; funciona melhor com composições mais elegantes e posadas curtas para Amanda, enquanto Rafa tende a render bem em cliques mais espontâneos caminhando pelo espaço.",
        practicalPlan:
          "Primeiro trabalhar os pontos mais fotogênicos e arquitetônicos, depois entrar nas vitrines que realmente fizerem sentido, sem transformar o bairro em caminhada aleatória.",
        pitfalls:
          "Andar sem direção, entrar em toda loja por impulso ou esquecer que a graça do lugar está muito na atmosfera.",
        tips: [
          "O Design District vale tanto pela arquitetura quanto pelas marcas.",
          "Esse é um Miami menos óbvio e mais refinado.",
          "Estacionamento certo ajuda o bloco a parecer passeio, não operação.",
        ],
        hack: "No Design District, a experiência vale mais do que a sacola.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "16:20",
        title: "Apple Lincoln Road",
        description: "Bloco comercial leve antes do fechamento em Brickell.",
        strategy:
          "Resolver o que for útil sem deixar a Apple sequestrar a tarde.",
        transport: "BMW X7",
        location: "Apple Lincoln Road — 1021 Lincoln Rd, Miami Beach, FL 33139",
        photoSpot: "",
        practicalPlan:
          "Entrar sabendo o que resolver, fazer o essencial e sair com tempo ainda bonito para Brickell.",
        pitfalls:
          "Virar permanência longa demais em loja que deveria ser bloco curto.",
        tips: [
          "Lincoln Road funciona bem como transição entre passeio e último bloco urbano.",
          "Resolver Apple com objetividade deixa o fim do dia muito mais redondo.",
        ],
        hack: "",
        restaurant: "",
        lounge: "",
      },
      {
        time: "18:00",
        title: "Brickell",
        description:
          "Fechamento elegante do dia em Miami, com skyline e clima urbano forte.",
        strategy:
          "Brickell é o bloco para encerrar o dia com imagem grande, urbana e sofisticada.",
        transport: "BMW X7",
        location: "Brickell / Brickell City Centre — Miami, FL",
        photoSpot:
          "Melhores fotos no fim de tarde e início da noite, usando o skyline e os eixos mais limpos do bairro; esse bloco favorece foto mais posada e elegante para Amanda e mais espontânea urbana para Rafa, com pausa um pouco maior do que nos blocos de praia.",
        practicalPlan:
          "Estacionar, caminhar primeiro pelo ponto de foto mais forte e depois encaixar o jantar sem dispersar o fechamento do dia.",
        pitfalls:
          "Rodar sem decidir ponto de parada ou transformar Brickell em caminhada sem direção.",
        tips: [
          "Brickell entrega a face mais cosmopolita de Miami no teu roteiro.",
          "Esse bloco funciona melhor quando entra como encerramento e não como correria de compras.",
          "Foto urbana boa pede menos pressa e mais composição.",
        ],
        hack: "Brickell é o ponto em que Miami deixa de ser praia e vira cidade grande.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "19:45",
        title: "Jantar em Brickell",
        description:
          "Último bloco gastronômico do dia mais elegante de Miami.",
        strategy:
          "Fechar com jantar coerente com o nível do dia, sem roubar a energia do 17/04.",
        transport: "",
        location: "Brickell — Miami, FL",
        photoSpot: "",
        practicalPlan:
          "Jantar no próprio eixo de Brickell, evitando deslocamento bobo depois do bloco de fotos.",
        pitfalls:
          "Alongar demais a noite antes do dia de saída cedo para Lakeland.",
        tips: [
          "Brickell funciona bem como jantar justamente porque já fecha o dia no mesmo clima urbano.",
          "Depois de praia + Design District + Brickell, a melhor leitura é simplificar o final.",
        ],
        hack: "",
        restaurant: "Baratos: North Italia / Pura Vida Miami • Premium: Komodo",
        lounge: "",
      },
      {
        time: "21:30",
        title: "Retorno ao hotel",
        description: "Fim do dia em Miami com volta organizada para a base.",
        strategy:
          "Fechar o dia limpo e preservar a madrugada curta do dia seguinte.",
        transport: "BMW X7",
        location: "Brickell → Casa Boutique Hotel, Miami Beach",
        photoSpot: "",
        practicalPlan:
          "Voltar sem desvio, colocar eletrônicos para carregar e entrar rapidamente no modo preparação do 17/04.",
        pitfalls:
          "Inventar extensão da noite ou chegar no hotel sem alinhar o básico do evento.",
        tips: [
          "O dia 17 começa cedo e recompensa quem fecha o 16 com disciplina.",
          "Carregar tudo à noite evita caos logo cedo.",
        ],
        hack: "",
        restaurant: "",
        lounge: "",
      },
      {
        time: "21:50",
        title: "Preparação do dia seguinte",
        description: "Ajuste fino para o SUN ’n FUN.",
        strategy:
          "A melhor estrada é a que já começa na noite anterior organizada.",
        transport: "",
        location: "Casa Boutique Hotel",
        photoSpot: "",
        practicalPlan:
          "Separar roupa, mochila leve, ingresso, água, carregadores e itens do evento antes de dormir.",
        pitfalls:
          "Dormir sem organizar o essencial e começar a madrugada no improviso.",
        tips: [
          "Evento de aviação no sol da Flórida cobra de quem sai desorganizado.",
          "Preparar mochila hoje vale muito mais do que improvisar amanhã cedo.",
        ],
        hack: "Quem dorme com a mochila pronta acorda muito melhor.",
        restaurant: "",
        lounge: "",
      },
    ],

        17: [
      {
        time: "05:45",
        title: "Acordar",
        description:
          "Início do dia mais operacional da fase Miami, com estrada, evento e transição para Orlando.",
        strategy:
          "Hoje a viagem precisa sair no modo execução. O dia só fica premium se começar disciplinado.",
        transport: "",
        location: "",
        photoSpot: "",
        practicalPlan:
          "Levantar com mochila, roupa, ingressos e itens de sol já resolvidos da noite anterior, sem reabrir decisões cedo demais.",
        pitfalls:
          "Perder tempo procurando item básico, reorganizando mochila ou saindo do quarto sem checklist fechado.",
        tips: [
          "Evento ao ar livre na Flórida cobra cedo de quem sai bagunçado.",
          "Água, boné, protetor, power bank e calçado bom valem mais do que levar muita coisa.",
          "Mochila leve sempre ganha de mochila heróica.",
        ],
        hack: "Hoje organização vale mais do que entusiasmo.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "06:15",
        title: "Café da manhã no hotel",
        description: "Café funcional antes da estrada longa até Lakeland.",
        strategy:
          "Comer o suficiente para sair desperto e leve, sem transformar o café em pausa arrastada.",
        transport: "",
        location:
          "Casa Boutique Hotel — 1334 Washington Ave, Miami Beach, FL 33139",
        photoSpot: "",
        practicalPlan:
          "Priorizar café simples, proteína, algo leve de carboidrato e água, saindo já em ritmo de estrada.",
        pitfalls:
          "Café pesado demais, demora desnecessária ou sair com fome achando que resolve no caminho.",
        tips: [
          "Em dia longo de estrada, café funcional costuma render mais do que café bonito.",
          "Sair bem alimentado reduz a chance de parada ruim por fome nervosa.",
        ],
        hack: "",
        restaurant: "Café do hotel",
        lounge: "",
      },
      {
        time: "06:40",
        title: "Preparação final / check-out operacional",
        description: "Último ajuste antes da saída de Miami rumo ao evento.",
        strategy:
          "Fechar o quarto e o carro sem retrabalho. Hoje tudo precisa fluir.",
        transport: "Hotel / carro",
        location: "Casa Boutique Hotel — Miami Beach",
        photoSpot: "",
        practicalPlan:
          "Conferir malas, fechar o quarto, carregar o carro e deixar só a mochila do evento acessível.",
        pitfalls:
          "Descer sem conferir o básico ou descobrir item faltando quando já estiverem na rua.",
        tips: [
          "Dias muito operacionais sempre recompensam quem reduz o número de movimentos.",
          "O que não vai ser usado de manhã já deve dormir resolvido no carro.",
        ],
        hack: "Hoje o segredo é não repetir etapa nenhuma.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "06:50",
        title: "Saída do hotel",
        description: "Partida cedo rumo a Lakeland para o SUN ’n FUN.",
        strategy:
          "O objetivo não é só chegar. É chegar bem, com margem e sem contaminar o evento logo cedo.",
        transport: "BMW X7",
        location:
          "Casa Boutique Hotel, Miami Beach → SUN ’n FUN Aerospace Expo, Lakeland, FL",
        photoSpot: "",
        practicalPlan:
          "Sair no horário certo, seguir rota limpa e tratar a margem de tempo como proteção real do dia, não como exagero.",
        pitfalls:
          "Achar que sair 15 ou 20 minutos depois dá no mesmo e acabar chegando já no modo recuperação.",
        tips: [
          "Em evento grande, chegar cedo muda estacionamento, entrada, fluxo e humor.",
          "Estrada boa é a que mantém o grupo calmo, não a que parece apertada mas dá.",
          "Vale deixar água e óculos acessíveis já no começo do trajeto.",
        ],
        hack: "Hoje a estrada compra o evento inteiro.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "08:40",
        title: "Parada técnica rápida",
        description:
          "Pausa funcional para banheiro, água e reset curto no meio da estrada.",
        strategy: "Parada curta e limpa. O melhor do dia está em Lakeland, não no posto.",
        transport: "BMW X7",
        location: "Wawa / Racetrac / 7-Eleven de estrada no eixo Miami → Lakeland",
        photoSpot: "",
        practicalPlan:
          "Parar, resolver banheiro, pegar água, revisar a rota e voltar para o carro sem transformar o bloco em mini passeio.",
        pitfalls:
          "Demorar demais, ficar olhando conveniência sem propósito ou voltar ao carro já disperso.",
        tips: [
          "Parada boa melhora muito a segunda metade da estrada.",
          "Água comprada agora vale mais do que depender de fila cara e longa no evento.",
        ],
        hack: "",
        restaurant: "",
        lounge: "",
      },
      {
        time: "09:55",
        title: "Chegada ao SUN ’n FUN",
        description:
          "Entrada oficial no principal evento de aviação da fase Flórida.",
        strategy:
          "Chegar dentro da janela certa protege a experiência inteira do evento.",
        transport: "Carro / caminhada",
        location: "SUN ’n FUN Aerospace Expo — Lakeland, FL",
        photoSpot: "",
        practicalPlan:
          "Estacionar, registrar visualmente onde o carro ficou, entrar com mapa em mente e começar o circuito sem correria.",
        pitfalls:
          "Entrar desorganizado, esquecer a localização do carro ou começar a andar sem prioridade definida.",
        tips: [
          "Em eventos grandes, lembrar onde o carro ficou parece detalhe até a saída.",
          "Chegada cedo costuma significar menos ruído, menos calor acumulado e fluxo melhor.",
          "O começo do evento decide quanto o restante do dia vai render.",
        ],
        hack: "Evento grande se vence na chegada, não na última hora.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "10:10",
        title: "Entrada no evento",
        description: "Abertura oficial da visita ao SUN ’n FUN.",
        strategy:
          "Entrar já com prioridade definida evita que o evento engula tempo e energia logo no começo.",
        transport: "Caminhada",
        location:
          "SUN ’n FUN Aerospace Expo — área de entrada / mapa / distribuição inicial",
        photoSpot: "",
        practicalPlan:
          "Pegar o mapa, definir os três focos principais do dia e só então começar a andar.",
        pitfalls:
          "Entrar no clima do evento sem plano e começar a ser puxado pelo acaso.",
        tips: [
          "Feira grande premia prioridade clara.",
          "Quem tenta ver tudo cedo normalmente não vê nada direito.",
        ],
        hack: "",
        restaurant: "",
        lounge: "",
      },
      {
        time: "10:15",
        title: "Warbirds e aviões históricos",
        description:
          "Primeiro grande bloco do evento, com aeronaves históricas e forte apelo visual.",
        strategy:
          "Começar pelos warbirds dá impacto visual, peso histórico e ajuda a abrir o evento no ponto mais forte.",
        transport: "Caminhada",
        location: "SUN ’n FUN — área histórica / warbirds",
        photoSpot:
          "Melhores fotos com enquadramento lateral de aeronaves históricas inteiras, evitando fundo poluído demais; funciona muito bem para Amanda em foto mais posada ao lado da fuselagem e para Rafa em clique espontâneo observando detalhes da aeronave.",
        practicalPlan:
          "Chegar cedo nessa área, fazer primeiro as fotos principais e depois olhar placas, detalhes e aeronaves com mais calma.",
        pitfalls:
          "Chegar já distraído, perder os melhores ângulos ou deixar a área para depois e pegar fluxo pior.",
        tips: [
          "Esse costuma ser um dos blocos mais marcantes visualmente do evento.",
          "Foto forte aqui depende mais de fundo limpo e enquadramento do que de quantidade de cliques.",
          "Vale observar também detalhes de pintura, nariz e hélice, não só fuselagem inteira.",
        ],
        hack: "Warbird bom se vê com os olhos primeiro e com a câmera depois.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "11:20",
        title: "Fabricantes e aviação geral",
        description:
          "Bloco técnico para aeronaves atuais, cabines, acabamentos e leitura mais prática da aviação.",
        strategy:
          "Aqui o valor está em entrar na experiência e não ficar só colecionando foto de fuselagem.",
        transport: "Caminhada",
        location: "SUN ’n FUN — área de fabricantes / aviação geral",
        photoSpot: "",
        practicalPlan:
          "Priorizar aeronaves de maior interesse, observar cabines e entrar quando permitido, usando o bloco como experiência técnica e não como simples corredor de exposição.",
        pitfalls:
          "Passar correndo, olhar só por fora ou gastar tempo demais em aeronave que não conversa com o interesse real do grupo.",
        tips: [
          "Cabine, ergonomia e painel contam muito mais do que aparência externa nesse setor.",
          "Conversa curta com staff certo às vezes vale mais do que várias placas.",
          "Esse é um bloco muito bom para curiosidade prática, não só visual.",
        ],
        hack: "",
        restaurant: "",
        lounge: "",
      },
      {
        time: "12:20",
        title: "Almoço no evento",
        description:
          "Pausa tática para sustentar a segunda metade do SUN ’n FUN.",
        strategy: "Comer para manter energia, não para derrubar o resto do dia.",
        transport: "Caminhada",
        location: "SUN ’n FUN — área de alimentação",
        photoSpot: "",
        practicalPlan:
          "Parar antes do pico pior, comer de forma simples e voltar ao circuito ainda com energia e foco.",
        pitfalls:
          "Parar tarde demais, enfrentar fila longa ou comer pesado demais em dia de sol forte.",
        tips: [
          "Sol + evento + comida pesada é combinação ruim.",
          "Almoço bom aqui é o que devolve vocês rápido ao mapa.",
        ],
        hack: "No SUN ’n FUN, almoço serve o evento — não o contrário.",
        restaurant: "Food court / refeição objetiva do evento",
        lounge: "",
      },
      {
        time: "13:00",
        title: "Homebuilt / experimental",
        description:
          "Bloco de criatividade, engenharia artesanal e boas surpresas fora do óbvio.",
        strategy:
          "Aqui vale entrar mais curioso e menos apressado, porque muita joia aparece em detalhe e conversa.",
        transport: "Caminhada",
        location: "SUN ’n FUN — área homebuilt / experimental",
        photoSpot: "",
        practicalPlan:
          "Caminhar com atenção, observar soluções diferentes e abrir espaço para olhar com calma projetos que realmente chamarem atenção.",
        pitfalls:
          "Passar rápido demais ou tratar a área como simples corredor secundário.",
        tips: [
          "Esse costuma ser um dos setores que mais surpreendem quem entra sem expectativa alta.",
          "Muita criatividade real aparece em acabamento, solução de projeto e improviso inteligente.",
          "É bloco forte para conhecimento e não só para foto.",
        ],
        hack: "Nem sempre o bloco menos famoso entrega menos.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "14:15",
        title: "Flight line / demonstrações",
        description: "Trecho de maior impacto visual e aéreo do evento.",
        strategy:
          "Esse bloco precisa ser vivido no ponto certo e com visão boa. Aqui o posicionamento importa muito.",
        transport: "Caminhada",
        location: "SUN ’n FUN — flight line / área de demonstração",
        photoSpot:
          "Melhores fotos em posição com horizonte mais limpo e aeronave vindo de lado ou em movimento, evitando multidão colada no enquadramento; esse é bloco mais de foto rápida e forte do que de pose longa.",
        practicalPlan:
          "Chegar com antecedência ao ponto mais útil, garantir campo visual e assistir sem ficar trocando demais de posição.",
        pitfalls:
          "Chegar em cima, ficar preso em ângulo ruim ou desperdiçar o bloco tentando achar lugar perfeito tarde demais.",
        tips: [
          "Em evento de aviação, lugar bom vale quase tanto quanto o show.",
          "Óculos, boné e água continuam contando muito nessa fase.",
          "Aqui o importante é enxergar bem e fotografar com inteligência, não freneticamente.",
        ],
        hack: "Vista boa transforma o bloco inteiro.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "15:15",
        title: "Loja oficial / fechamento do evento",
        description:
          "Última volta com foco em souvenir, loja oficial e fechamento limpo da missão.",
        strategy:
          "Sair do evento ainda bem-disposto vale mais do que espremer o último minuto sem critério.",
        transport: "Caminhada",
        location: "SUN ’n FUN — loja oficial / área final de circulação",
        photoSpot: "",
        practicalPlan:
          "Passar pela loja ou último ponto prioritário de forma objetiva e encerrar a visita antes de entrar no modo cansaço inútil.",
        pitfalls:
          "Ficar zanzando sem objetivo ou abrir novo bloco quando a missão já deveria estar fechando.",
        tips: [
          "Fechamento bom de evento costuma parecer simples, não dramático.",
          "Melhor sair satisfeito do que arrastado.",
        ],
        hack: "",
        restaurant: "",
        lounge: "",
      },
      {
        time: "16:00",
        title: "Saída do evento",
        description:
          "Encerramento do SUN ’n FUN e início da transição para Orlando.",
        strategy:
          "Agora a viagem muda de tom: sai a aviação, entram parques e operação de suprimentos.",
        transport: "BMW X7",
        location: "SUN ’n FUN, Lakeland → região Orlando / Kissimmee",
        photoSpot: "",
        practicalPlan:
          "Sair sem enrolar, pegar a estrada ainda com energia razoável e guardar foco para o Walmart técnico.",
        pitfalls:
          "Transformar a saída em bloco arrastado ou tentar encaixar parada desnecessária no caminho.",
        tips: [
          "Feiras grandes cansam mais do que parecem; sair no ponto certo é inteligência.",
          "A transição boa do dia 17 protege o dia 18 inteiro.",
        ],
        hack: "",
        restaurant: "",
        lounge: "",
      },
      {
        time: "17:25",
        title: "Walmart estratégico",
        description: "Compra do kit de guerra da fase parques.",
        strategy:
          "Esse bloco não é glamour. É conforto real para os próximos dias.",
        transport: "BMW X7",
        location: "Walmart Supercenter — região Orlando / Kissimmee",
        photoSpot: "",
        practicalPlan:
          "Entrar com lista pronta, pegar só o que realmente vai facilitar parque, saúde e rotina, e sair sem transformar o Walmart em passeio.",
        pitfalls:
          "Ficar passeando, abrir corredor aleatório ou esquecer item importante por falta de foco.",
        tips: [
          "Tylenol, curativo bom, protetor, água, Gatorade e snack útil valem muito mais do que compra improvisada depois.",
          "Parque pesado pune quem entra sem esse bloco resolvido.",
          "Esse é um dos blocos mais feios visualmente e mais valiosos operacionalmente.",
        ],
        hack: "Walmart certo hoje evita problema chato amanhã.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "18:40",
        title: "Jantar em Orlando / Kissimmee",
        description:
          "Fechamento confortável do dia mais puxado da fase carro.",
        strategy:
          "Depois de estrada, evento e Walmart, o jantar precisa resolver e não complicar.",
        transport: "BMW X7",
        location: "Região do hotel em Kissimmee / Orlando",
        photoSpot: "",
        practicalPlan:
          "Escolher um lugar de boa execução e tempo razoável, encerrando o dia sem alongar demais a noite.",
        pitfalls:
          "Inventar restaurante trabalhoso ou cair em espera longa sem necessidade.",
        tips: [
          "Depois de um dia assim, conforto vence sofisticação performática.",
          "Jantar certo aqui melhora muito a entrada no Magic Kingdom amanhã.",
        ],
        hack: "",
        restaurant:
          "Baratos: Olive Garden / Miller’s Ale House • Premium honesto: Texas Roadhouse",
        lounge: "",
      },
      {
        time: "20:15",
        title: "Check-in em Orlando",
        description: "Entrada oficial na base da fase parques.",
        strategy:
          "Chegar, subir, organizar o mínimo e virar a chave para o Magic Kingdom.",
        transport: "BMW X7",
        location:
          "Travelodge by Wyndham Orlando Lake Buena Vista South — 4646 W Irlo Bronson Memorial Hwy, Kissimmee, FL 34746",
        photoSpot: "",
        practicalPlan:
          "Fazer check-in, subir malas, separar o básico do parque e não inventar passeio extra.",
        pitfalls:
          "Chegar e ainda querer sair de novo ou deixar a mochila do parque para depois.",
        tips: [
          "Dia 18 começa na noite do 17.",
          "Quanto menos drama no check-in, melhor o parque rende.",
        ],
        hack: "",
        restaurant: "",
        lounge: "",
      },
      {
        time: "20:40",
        title: "Preparação do Magic Kingdom",
        description:
          "Ajuste fino da mochila e da lógica do primeiro parque forte da viagem.",
        strategy:
          "Quem organiza o parque à noite entra muito mais premium no dia seguinte.",
        transport: "",
        location: "Hotel em Orlando",
        photoSpot: "",
        practicalPlan:
          "Separar roupa, mochila, power bank, protetor, ingresso, água e a estratégia da manhã sem deixar nada para o despertar.",
        pitfalls:
          "Dormir sem alinhar o básico e começar o 18/04 já no modo correção.",
        tips: [
          "Preferred Parking e Lightning Lane só brilham de verdade quando o resto também está organizado.",
          "Parque cedo premia preparo silencioso da noite anterior.",
        ],
        hack: "O Magic Kingdom começa nessa mochila.",
        restaurant: "",
        lounge: "",
      },
    ],

    18: [
      {
        time: "06:20",
        title: "Acordar",
        description:
          "Início do dia de Magic Kingdom com estratégia premium desde cedo.",
        strategy:
          "Hoje não é dia de lentidão. O sucesso da TRON cedo, do estacionamento e da distribuição da energia depende da primeira hora do dia.",
        transport: "",
        location: "",
        photoSpot: "",
        practicalPlan:
          "Levantar já com mochila, ingressos, celular, água, protetor e power bank resolvidos da noite anterior.",
        pitfalls:
          "Começar o dia bagunçando mochila, discutindo detalhe já decidido ou saindo do hotel em ritmo frouxo.",
        tips: [
          "No Magic Kingdom, a primeira meia hora bem usada vale mais do que muita coisa no resto do dia.",
          "Parque bom começa no quarto do hotel, não no portão.",
          "Hoje a manhã compra o parque inteiro.",
        ],
        hack: "Se o começo for forte, o resto do parque fica muito mais leve.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "06:45",
        title: "Café da manhã no hotel",
        description: "Café funcional para entrar cedo e forte no parque.",
        strategy:
          "Comer bem, mas sem exagerar. O objetivo é chegar leve e com energia para a primeira onda de atrações.",
        transport: "",
        location: "Hotel em Orlando / Kissimmee",
        photoSpot: "",
        practicalPlan:
          "Fazer um café direto, sem transformar o bloco em pausa longa, e sair com tudo já pronto para o estacionamento.",
        pitfalls:
          "Demorar demais no café ou comer pesado a ponto de começar o parque mais lento.",
        tips: [
          "Em dia de parque, café funcional quase sempre vence café elaborado.",
          "Água logo cedo ajuda mais do que muita gente imagina no ritmo do dia.",
        ],
        hack: "",
        restaurant: "Café do hotel",
        lounge: "",
      },
      {
        time: "07:00",
        title: "Saída do hotel",
        description: "Deslocamento rumo ao Magic Kingdom.",
        strategy:
          "O dia precisa começar forte. Preferred Parking e entrada cedo fazem diferença real aqui.",
        transport: "BMW X7",
        location: "Hotel → Magic Kingdom, Walt Disney World",
        photoSpot: "",
        practicalPlan:
          "Sair cedo, ir direto ao estacionamento preferencial e seguir sem dispersar com paradas inúteis.",
        pitfalls:
          "Sair do hotel no ritmo de passeio comum e perder justamente a janela mais valiosa do parque.",
        tips: [
          "Preferred Parking aqui não é luxo bobo; é compra de tempo e conforto.",
          "Hoje o tempo poupado cedo volta em dobro mais tarde.",
        ],
        hack: "Preferred Parking + manhã forte é combinação de gente esperta.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "08:00",
        title: "Entrada no complexo / deslocamento final",
        description:
          "Chegada ao ecossistema do parque e posicionamento para o começo da operação.",
        strategy:
          "Nada de gastar o melhor minuto do dia com loja, foto aleatória ou distração antes da missão principal.",
        transport: "Estacionamento + transporte Disney",
        location: "Magic Kingdom — entrada / acesso interno",
        photoSpot: "",
        practicalPlan:
          "Entrar e já se posicionar para a rota de abertura, com foco total na primeira grande prioridade da manhã.",
        pitfalls:
          "Perder tempo logo na entrada e começar o parque já atrás do relógio.",
        tips: [
          "No Magic Kingdom, a entrada certa protege a manhã inteira.",
          "Foto clássica de entrada pode esperar um encaixe melhor no dia.",
        ],
        hack: "",
        restaurant: "",
        lounge: "",
      },
      {
        time: "08:30",
        title: "Bloco 1 — prioridades máximas da manhã",
        description:
          "Ataque às atrações mais importantes do começo do dia, com foco absoluto em TRON e nas filas que mais pesam.",
        strategy:
          "A manhã é a fase mais nobre do parque. O objetivo é resolver cedo o que mais pesa em fila, frustração e valor de experiência.",
        transport: "Caminhada",
        location: "Magic Kingdom — rota principal da manhã",
        photoSpot:
          "Fotos só em encaixes naturais entre deslocamentos, sem parar a missão principal; aqui o foco é parque rodando bem, não ensaio.",
        practicalPlan:
          "Ir primeiro para a TRON, depois encaixar as atrações mais críticas da manhã, mantendo ritmo firme e sem abrir exceções por impulso.",
        pitfalls:
          "Entrar em loja, parar demais para foto ou começar por atração errada só porque estava mais perto.",
        tips: [
          "TRON cedo é prioridade absoluta, como já definimos.",
          "Fila evitada de manhã vale mais do que foto bonita às 09:00.",
          "Hoje o parque precisa ser conduzido, não improvisado.",
        ],
        hack: "Manhã boa no Magic Kingdom vale por metade do dia.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "12:00",
        title: "Almoço no parque",
        description: "Pausa controlada no meio do Magic Kingdom.",
        strategy:
          "Almoço aqui é reabastecimento, não descanso prolongado. A tarde ainda precisa render muito.",
        transport: "Caminhada",
        location: "Magic Kingdom — ponto de refeição coerente com a rota",
        photoSpot: "",
        practicalPlan:
          "Comer em um ponto que faça sentido no fluxo do parque, descansar um pouco os pés e voltar logo para a segunda onda de atrações.",
        pitfalls:
          "Transformar o almoço em pausa longa e sair pesado ou lento demais para a tarde.",
        tips: [
          "Almoço rápido costuma render muito mais parque do que almoço teatral.",
          "Em parque cheio, refeição prática e bem posicionada é inteligência.",
        ],
        hack: "",
        restaurant:
          "Baratos: Casey’s Corner / Columbia Harbour House • Premium: Be Our Guest, se já estiver reservado e valendo a pena",
        lounge: "",
      },
      {
        time: "13:00",
        title: "Bloco 2 — segunda onda de atrações",
        description:
          "Continuação do parque com prioridades restantes, fotos bem encaixadas e energia bem distribuída.",
        strategy:
          "A tarde precisa equilibrar atrações, fotos e preservação de energia para os fogos e a TRON noturna.",
        transport: "Caminhada",
        location: "Magic Kingdom — rota da tarde",
        photoSpot:
          "Aqui entram os melhores encaixes para Amanda e Rafa sem quebrar a lógica do parque; foto boa é a que entra em janela certa, não a que atrapalha fila e deslocamento.",
        practicalPlan:
          "Executar as atrações restantes mais importantes, encaixar fotos nos respiros certos e não gastar energia demais cedo na tarde.",
        pitfalls:
          "Queimar perna e cabeça cedo demais e chegar fraco justamente na parte noturna do parque.",
        tips: [
          "Amanda e Rafa têm prioridade de fotos, mas dentro da inteligência do percurso.",
          "No parque, energia guardada vale ouro na reta final.",
          "A tarde boa é a que ainda chega viva na noite.",
        ],
        hack: "Guardar energia faz parte da estratégia, não é sinal de fraqueza.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "20:00",
        title: "Posicionamento para os fogos",
        description: "Hora de garantir um lugar forte para o show noturno.",
        strategy:
          "Esse bloco não pode ser improvisado. Ponto bom muda completamente a experiência dos fogos.",
        transport: "Caminhada",
        location: "Magic Kingdom — eixo do castelo / área de visualização",
        photoSpot:
          "Castelo no pré-show e durante o bloco noturno; melhor enquadramento com um pouco de respiro e sem estar esmagado no meio da multidão.",
        practicalPlan:
          "Chegar cedo ao ponto definido, travar posição boa e descansar um pouco sem deixar o grupo dispersar.",
        pitfalls:
          "Chegar em cima e aceitar ângulo ruim, aperto ruim e uma experiência abaixo do potencial.",
        tips: [
          "Fogos vistos do lugar certo mudam totalmente a memória do parque.",
          "Posição boa é parte da experiência, não detalhe secundário.",
        ],
        hack: "Chegar antes vale muito mais do que tentar remendar posição ruim depois.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "21:00",
        title: "Fogos do Magic Kingdom",
        description:
          "Momento principal da noite e um dos blocos mais simbólicos do parque.",
        strategy:
          "Curtir o show e já sair com a próxima missão mentalmente pronta: repetir a TRON à noite.",
        transport: "",
        location: "Magic Kingdom — área do castelo",
        photoSpot:
          "Castelo iluminado e clima do show; aqui a experiência vale mais do que tentar filmar tudo de qualquer jeito.",
        practicalPlan:
          "Assistir, curtir o momento e terminar o show já preparado para sair em direção à TRON sem ficar travando no fluxo.",
        pitfalls:
          "Tratar os fogos como fim do dia e perder o detalhe mais premium da tua estratégia: TRON noturna.",
        tips: [
          "Como você já decidiu, fogos não encerram o parque.",
          "O grande refinamento desse dia é justamente repetir a TRON à noite.",
        ],
        hack: "Hoje os fogos são penúltimo ato, não o último.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "21:30",
        title: "TRON à noite",
        description: "Repetição da principal atração em clima noturno.",
        strategy:
          "Esse é o fechamento perfeito do parque. A sensação da TRON à noite é parte da grandeza do dia 18.",
        transport: "Caminhada",
        location: "Tomorrowland — Magic Kingdom",
        photoSpot:
          "TRON iluminada e clima futurista; foto aqui funciona melhor rápida e bem encaixada, sem perder timing operacional.",
        practicalPlan:
          "Sair dos fogos e ir direto para a atração, sem abrir desvio ou pausa desnecessária no caminho.",
        pitfalls:
          "Parar no caminho, se distrair e perder justamente a melhor parte final da tua estratégia.",
        tips: [
          "Pouca coisa muda tanto de dia para noite quanto a própria TRON.",
          "Essa repetição é um dos maiores acertos do teu roteiro em Orlando.",
        ],
        hack:
          "TRON à noite é o tipo de detalhe que separa passeio comum de roteiro premium.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "22:15",
        title: "Saída do parque",
        description:
          "Encerramento com retorno planejado e sem bagunça.",
        strategy:
          "Voltar do jeito certo protege o fim do dia e evita saída feia depois de um parque tão bom.",
        transport: "Barco → estacionamento",
        location: "Magic Kingdom → TTC / estacionamento",
        photoSpot: "",
        practicalPlan:
          "Sair em direção ao barco, seguir até o estacionamento e evitar qualquer desvio bobo no fluxo de saída.",
        pitfalls:
          "Alongar a saída sem necessidade ou improvisar um fechamento pior do que o dia merece.",
        tips: [
          "Como já alinhamos, o barco é a melhor leitura para a tua saída.",
          "Fechar bem o parque altera muito a sensação final do dia.",
        ],
        hack: "",
        restaurant: "",
        lounge: "",
      },
      {
        time: "23:00",
        title: "Jantar rápido fora do parque",
        description:
          "Fechamento simples, gostoso e funcional depois do Magic Kingdom.",
        strategy:
          "Depois de um parque pesado, jantar precisa ser prático. Hoje não é noite para invenção.",
        transport: "BMW X7",
        location: "Região do hotel / caminho de retorno",
        photoSpot: "",
        practicalPlan:
          "Escolher uma solução rápida, matar a fome com inteligência e voltar logo para a base.",
        pitfalls:
          "Querer jantar sofisticado demais tarde da noite e transformar o fim do dia em arrasto.",
        tips: [
          "Pós-parque pede eficiência, não performance gastronômica.",
          "Sanduíche bom e rápido costuma resolver melhor do que restaurante lento.",
        ],
        hack: "",
        restaurant:
          "Baratos: Chick-fil-A / McDonald’s bem resolvido • Premium honesto: Miller’s Ale House, se estiver realmente encaixando",
        lounge: "",
      },
      {
        time: "23:35",
        title: "Retorno ao hotel e preparação do dia seguinte",
        description:
          "Chegada ao hotel, banho rápido e alinhamento da Epic Universe.",
        strategy:
          "Chegar, resolver o básico e dormir. O dia 19 ainda é forte e não pode nascer bagunçado.",
        transport: "BMW X7",
        location: "Hotel em Orlando / Kissimmee",
        photoSpot: "",
        practicalPlan:
          "Banho, eletrônicos em carga, mochila mínima do dia seguinte e cama. Sem conversa longa, sem inventar foto ou compra tarde da noite.",
        pitfalls:
          "Ficar mexendo em detalhe desnecessário e sacrificar sono precioso.",
        tips: [
          "Pós-parque bem administrado vale muito mais do que parece no dia seguinte.",
          "Dormir com o básico resolvido simplifica demais a Epic Universe.",
        ],
        hack: "Noite bem fechada é parte da operação do dia seguinte.",
        restaurant: "",
        lounge: "",
      },
    ],

        19: [
      {
        time: "06:50",
        title: "Acordar",
        description:
          "Início do dia de Epic Universe com segundo ato tático de compras e fechamento bonito em Celebration.",
        strategy:
          "Hoje o protagonista continua sendo parque. Compra entra como complemento inteligente, não como segundo dia 21.",
        transport: "",
        location: "",
        photoSpot: "",
        practicalPlan:
          "Levantar já com mochila, ingresso e o mínimo do dia resolvidos, sem reabrir pauta desnecessária logo cedo.",
        pitfalls:
          "Começar o dia disperso e tirar força da Epic antes mesmo de entrar.",
        tips: [
          "Parque novo tende a puxar a atenção para todo lado; por isso a disciplina cedo importa muito.",
          "O outlet do dia 19 é cirúrgico e tem missão clara: JD Sports e poucas coisas que realmente compensem.",
        ],
        hack: "Hoje parque manda, compra obedece.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "07:15",
        title: "Café da manhã no hotel",
        description: "Café funcional para entrar forte na Epic Universe.",
        strategy:
          "Comer bem e sair leve. O parque é pesado e o dia ainda guarda bloco de compras e fechamento bonito.",
        transport: "",
        location: "Hotel em Orlando / Kissimmee",
        photoSpot: "",
        practicalPlan:
          "Café objetivo, sem demora desnecessária, e saída já com o ritmo do parque armado.",
        pitfalls: "Comer pesado ou atrasar a saída por causa do café.",
        tips: [
          "Parque forte pede energia estável, não exagero cedo.",
          "Quanto menos ruído cedo, melhor a Epic rende.",
        ],
        hack: "",
        restaurant: "Café do hotel",
        lounge: "",
      },
      {
        time: "07:40",
        title: "Saída do hotel",
        description: "Deslocamento rumo à Epic Universe.",
        strategy:
          "A Epic é o núcleo do dia. O resto só funciona bem se o parque começar forte.",
        transport: "BMW X7",
        location: "Hotel → Epic Universe",
        photoSpot: "",
        practicalPlan:
          "Sair cedo, estacionar bem e entrar já com a primeira e a segunda prioridade na cabeça.",
        pitfalls:
          "Chegar ao parque sem ordem clara, confiando que o Express Pass vai resolver tudo sozinho.",
        tips: [
          "Express ajuda muito, mas não substitui rota bem pensada.",
          "Parque novo castiga quem entra só no improviso.",
        ],
        hack: "Express Pass com cabeça vira ouro; sem cabeça vira muleta.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "08:15",
        title: "Entrada no parque",
        description: "Abertura da operação do dia na Epic Universe.",
        strategy:
          "Nada de rodar sem rumo. Começo bom evita desperdício do Express e da energia.",
        transport: "Carro + caminhada",
        location: "Epic Universe — entrada / acesso inicial",
        photoSpot: "",
        practicalPlan:
          "Entrar e seguir direto para a primeira prioridade sem abrir exceção para loja ou foto de entrada.",
        pitfalls:
          "Parar cedo demais em área bonita e deixar a lógica do parque escapar.",
        tips: [
          "Parque novo é lindo justamente para te distrair. Não caia nessa cedo demais.",
          "A primeira hora é onde o dia realmente ganha forma.",
        ],
        hack: "",
        restaurant: "",
        lounge: "",
      },
      {
        time: "08:30",
        title: "Bloco 1 — atrações prioritárias",
        description:
          "Ataque inicial às experiências mais valiosas do parque.",
        strategy:
          "A manhã precisa eliminar o que mais pesa em fila e em valor de experiência, deixando a tarde mais respirável.",
        transport: "Caminhada",
        location: "Epic Universe — rota principal da manhã",
        photoSpot:
          "Fotos entram só em encaixes naturais; o grande valor desse bloco é a execução forte das atrações, não parar para ensaio cedo.",
        practicalPlan:
          "Executar a ordem mais estratégica do parque, priorizando o que mais pesa em espera e deslocamento logo no início.",
        pitfalls:
          "Abrir blocos visuais cedo demais e deixar a parte operacional crítica para depois.",
        tips: [
          "Manhã boa em parque novo vale por metade do dia.",
          "Express Pass deve eliminar perda de tempo, não mascarar rota ruim.",
          "Hoje o parque precisa rodar bonito e firme.",
        ],
        hack: "A manhã da Epic precisa ser cirúrgica.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "12:30",
        title: "Almoço no parque",
        description: "Pausa controlada dentro da Epic Universe.",
        strategy:
          "Almoço rápido, bom e sem roubar a tarde. O parque ainda precisa render pesado.",
        transport: "Caminhada",
        location: "Epic Universe — refeição coerente com a rota",
        photoSpot: "",
        practicalPlan:
          "Parar onde o fluxo ajudar, comer com praticidade e voltar rápido para a segunda metade do parque.",
        pitfalls:
          "Parar longe da rota, demorar demais decidindo ou esfriar o dia.",
        tips: [
          "Parque bom se vence com refeições curtas e bem encaixadas.",
          "Comer no ponto certo evita ter que refazer perna depois.",
        ],
        hack: "",
        restaurant: "Opção rápida do parque / refeição simples bem posicionada",
        lounge: "",
      },
      {
        time: "13:30",
        title: "Bloco 2 — segunda metade da Epic",
        description:
          "Fechamento das experiências restantes com foco em aproveitamento total.",
        strategy:
          "A tarde serve para completar o parque, não para caminhar em círculo e remendar a manhã.",
        transport: "Caminhada",
        location: "Epic Universe — rota da tarde",
        photoSpot:
          "Agora sim entram fotos melhores, com menos ansiedade operacional, desde que não destruam a lógica do fechamento do parque.",
        practicalPlan:
          "Resolver o que ainda falta de mais importante, repetir algo só se realmente compensar e sair do parque satisfeito, não arrastado.",
        pitfalls:
          "Usar o Express para consertar rota ruim ou abrir área nova tarde demais sem necessidade real.",
        tips: [
          "A tarde boa é a que fecha o parque sem sensação de desperdício.",
          "Se a manhã foi boa, a tarde fica refinada.",
        ],
        hack: "Na Epic, a tarde tem que parecer consequência de manhã forte.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "18:45",
        title: "Saída do parque",
        description:
          "Encerramento da Epic Universe e mudança de chave para compras rápidas.",
        strategy:
          "Agora entra o bloco tático de outlet. Curto, agressivo e sem inventar outro dia de compras.",
        transport: "BMW X7",
        location: "Epic Universe → Orlando International Premium Outlets",
        photoSpot: "",
        practicalPlan:
          "Sair do parque já em modo compra objetiva, sem passeio, sem indecisão e com missão curta na cabeça.",
        pitfalls:
          "Chegar no outlet sem foco e deixar o bloco crescer até roubar Celebration.",
        tips: [
          "O outlet do dia 19 funciona porque conversa com a geografia da Universal/Epic.",
          "Esse bloco não compete com o dia 21; ele complementa.",
        ],
        hack: "Saiu do parque? Agora é JD Sports e poucas lojas-chave. Só.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "19:05",
        title: "Orlando International Premium Outlets",
        description:
          "Bloco curto e agressivo de compras, com foco na JD Sports e oportunidades muito pontuais.",
        strategy:
          "Missão curta e objetiva. A prioridade é JD Sports; o resto só entra se houver ganho claro.",
        transport: "BMW X7",
        location:
          "Orlando International Premium Outlets — 4951 International Dr, Orlando, FL 32819",
        photoSpot: "",
        practicalPlan:
          "Estacionar o mais perto possível da área útil, entrar primeiro na JD Sports e, no máximo, encaixar 1 ou 2 lojas complementares se realmente fizer sentido.",
        pitfalls:
          "Passear sem missão, abrir muitas lojas ou deixar o outlet sugar a noite inteira.",
        tips: [
          "Esse outlet é perfeito aqui porque resolve tênis, streetwear e oportunidade rápida sem virar maratona.",
          "JD Sports é prioridade alta e ponto central do bloco.",
          "Entrar com lista curta ajuda muito.",
        ],
        hack: "Hoje o outlet é bisturi, não foice.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "20:40",
        title: "Saída para Celebration",
        description:
          "Encerramento elegante da noite depois do parque e da compra curta.",
        strategy:
          "Agora o objetivo é respirar, jantar bem e fazer o dia terminar bonito.",
        transport: "BMW X7",
        location: "Orlando International Premium Outlets → Celebration, FL",
        photoSpot: "",
        practicalPlan:
          "Sair do outlet sem abrir mais uma loja e seguir direto para o fechamento em Celebration.",
        pitfalls:
          "Tentar espremer mais compra no caminho e perder o melhor clima da noite.",
        tips: [
          "Celebration entra justamente para fazer o contraste com o peso do parque.",
          "Dia bom também precisa acabar bonito, não só útil.",
        ],
        hack: "",
        restaurant: "",
        lounge: "",
      },
      {
        time: "21:00",
        title: "Celebration",
        description:
          "Passeio leve, bonito e jantar em um dos fechamentos mais agradáveis da fase Orlando.",
        strategy:
          "Depois de um parque forte, Celebration entra como respiro elegante e não como obrigação turística.",
        transport: "Caminhada",
        location: "Celebration, FL",
        photoSpot:
          "Noite em Celebration com luzes, rua bonita e clima mais calmo; bom bloco para foto mais espontânea e leve, sem esforço.",
        practicalPlan:
          "Estacionar, caminhar um pouco, jantar e aproveitar a atmosfera sem ficar rodando sem propósito.",
        pitfalls:
          "Chegar tarde demais e transformar o bloco só em refeição sem curtir o ambiente.",
        tips: [
          "Celebration funciona muito bem à noite justamente porque parece pausa da intensidade de Orlando.",
          "Boa leitura para fechar o dia sem parecer shopping nem parque.",
        ],
        hack: "Celebration Town Tavern é leitura muito boa de custo-benefício aqui.",
        restaurant:
          "Baratos: Celebration Town Tavern / Market Street Café • Premium: Columbia Restaurant",
        lounge: "",
      },
      {
        time: "22:20",
        title: "Retorno ao hotel",
        description:
          "Fim do dia com volta limpa para descansar antes do SeaWorld.",
        strategy:
          "Voltar sem inventar segunda rodada de passeio e proteger o dia 20.",
        transport: "BMW X7",
        location: "Celebration → hotel em Kissimmee",
        photoSpot: "",
        practicalPlan:
          "Saída direta para o hotel, com o mínimo do dia seguinte já na cabeça, sem esticar nada à toa.",
        pitfalls: "Alongar a noite sem ganho real.",
        tips: [
          "No dia 19, a beleza está em fazer bastante coisa sem parecer corrido.",
          "A boa volta preserva o próximo parque.",
        ],
        hack: "",
        restaurant: "",
        lounge: "",
      },
      {
        time: "22:40",
        title: "Preparação do dia seguinte",
        description: "Ajuste final para o SeaWorld.",
        strategy:
          "Deixar o dia 20 preparado ajuda a aproveitar melhor parque e outlet complementar.",
        transport: "",
        location: "Hotel em Orlando / Kissimmee",
        photoSpot: "",
        practicalPlan:
          "Separar mochila, ingresso, roupa e power bank antes de dormir.",
        pitfalls:
          "Dormir sem alinhar o básico e começar o SeaWorld já em modo bagunça.",
        tips: [
          "A manhã seguinte quase sempre depende da noite anterior.",
          "Quem prepara o parque hoje ganha paz amanhã.",
        ],
        hack: "SeaWorld preparado à noite fica muito melhor de manhã.",
        restaurant: "",
        lounge: "",
      },
    ],

    20: [
      {
        time: "06:40",
        title: "Acordar",
        description:
          "Início do dia de SeaWorld com dining plan, animais, rides e outlet complementar.",
        strategy:
          "Hoje o parque não pode ser tratado como passeio aleatório. O valor está no equilíbrio entre experiências e no uso inteligente do dining plan.",
        transport: "",
        location: "",
        photoSpot: "",
        practicalPlan:
          "Levantar com o básico pronto e já sair com mentalidade de parque técnico, não de parque caótico.",
        pitfalls:
          "Começar tarde, sair bagunçado ou tratar o SeaWorld como parque só de brinquedo.",
        tips: [
          "SeaWorld rende mais quando a parte de animais entra cedo e a parte de rides cresce depois.",
          "O dining plan vale mais quando serve a rota, não quando vira dono da rota.",
        ],
        hack: "Hoje o parque pede cabeça, não improviso.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "07:00",
        title: "Café da manhã no hotel",
        description: "Café funcional para entrar forte no SeaWorld.",
        strategy:
          "Comer cedo e sair leve. O dining ajuda, mas não substitui um bom começo.",
        transport: "",
        location: "Hotel em Orlando / Kissimmee",
        photoSpot: "",
        practicalPlan:
          "Fazer um café simples e eficiente, sem alongar demais o bloco e sem sair com fome.",
        pitfalls: "Sair sem comer direito ou exagerar cedo demais no café.",
        tips: [
          "Mesmo com All Day Dining, parque bom começa com café organizado.",
          "O ritmo da manhã depende muito da qualidade desse começo.",
        ],
        hack: "",
        restaurant: "Café do hotel",
        lounge: "",
      },
      {
        time: "07:20",
        title: "Saída do hotel",
        description: "Deslocamento rumo ao SeaWorld Orlando.",
        strategy:
          "Esse parque pede ordem. A ideia é combinar animais, atrações e alimentação com inteligência.",
        transport: "BMW X7",
        location: "Hotel → SeaWorld Orlando",
        photoSpot: "",
        practicalPlan:
          "Sair cedo e entrar no estacionamento já sabendo que a manhã prioriza a parte animal e a lógica do dining.",
        pitfalls: "Chegar sem ordem entre animais, rides e pausas.",
        tips: [
          "SeaWorld perde valor quando é tratado como parque genérico.",
          "A leitura certa dele é justamente o equilíbrio.",
        ],
        hack: "",
        restaurant: "",
        lounge: "",
      },
      {
        time: "08:00",
        title: "Entrada no parque",
        description: "Início do dia com posicionamento inteligente.",
        strategy:
          "A primeira missão é ativar cedo a lógica do All Day Dining e alinhar a rota do parque.",
        transport: "Carro + caminhada",
        location: "SeaWorld Orlando — entrada / acesso inicial",
        photoSpot: "",
        practicalPlan:
          "Entrar, entender cedo os pontos do dining e começar o parque pelo bloco animal, não pelos impulsos.",
        pitfalls:
          "Ignorar a lógica do dining e correr cedo demais para ride por ansiedade.",
        tips: [
          "No SeaWorld, alimentação e rota conversam mais do que em outros parques.",
          "Quick Queue só vale se o comportamento do parque justificar de verdade.",
        ],
        hack: "Dining cedo começa a devolver valor logo no início do parque.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "08:20",
        title: "Ativação do All Day Dining",
        description: "Organização da lógica de refeições do parque.",
        strategy:
          "Comida inclusa precisa ser usada com cabeça. Ativar cedo ajuda a distribuir melhor pausas e economia real.",
        transport: "Caminhada",
        location: "SeaWorld Orlando — pontos do dining plan",
        photoSpot: "",
        practicalPlan:
          "Entender cedo quais pontos fazem mais sentido na rota e tratar o dining como ferramenta de ritmo, não só de comida.",
        pitfalls: "Usar o dining por impulso, sem encaixe na lógica do parque.",
        tips: [
          "No SeaWorld, comer mal posicionado custa tempo real.",
          "Dining bem usado reduz gasto e melhora descanso dos pés.",
        ],
        hack: "",
        restaurant: "All Day Dining",
        lounge: "",
      },
      {
        time: "08:30",
        title: "Bloco 1 — animais prioritários",
        description:
          "Primeira metade da manhã com foco no que faz o SeaWorld ser diferente.",
        strategy:
          "Dar atenção real aos animais aqui é decisão correta. Essa é a parte mais singular do parque e não pode ser engolida só pelas rides.",
        transport: "Caminhada",
        location: "SeaWorld Orlando — áreas animais prioritárias",
        photoSpot:
          "Áreas de animais e pontos mais bonitos da manhã; esse bloco favorece fotos mais naturais e contemplativas, não pose corrida.",
        practicalPlan:
          "Começar pelos animais e exposições mais valiosos, usando a manhã para ver com calma e sem pressão de fila.",
        pitfalls:
          "Pular cedo para rides e deixar a parte animal para horário pior e energia menor.",
        tips: [
          "A manhã costuma ser melhor para observar sem tanto cansaço e sem tanta ansiedade de fila.",
          "Esse é o diferencial real do parque em relação aos outros.",
        ],
        hack: "A parte animal do SeaWorld precisa entrar cedo para brilhar.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "11:10",
        title: "Primeira refeição do dining plan",
        description: "Uso inteligente do plano de alimentação.",
        strategy:
          "Refeição curta, útil e bem posicionada para manter energia sem esfriar o parque.",
        transport: "Caminhada",
        location: "SeaWorld Orlando — ponto coerente do All Day Dining",
        photoSpot: "",
        practicalPlan:
          "Parar, comer e usar o momento também para descansar um pouco os pés sem desligar do ritmo do dia.",
        pitfalls: "Sentar por tempo demais e esfriar a cabeça e o corpo.",
        tips: [
          "No SeaWorld, pausa boa é a que alimenta sem derrubar o ritmo.",
          "Comida grátis mal usada ainda custa tempo e energia.",
        ],
        hack: "",
        restaurant: "All Day Dining",
        lounge: "",
      },
      {
        time: "11:45",
        title: "Bloco 2 — rides importantes",
        description: "Atrações fortes do parque com foco no que realmente importa.",
        strategy:
          "Agora entram os brinquedos importantes, mas sem deixar o parque virar só corrida de atração.",
        transport: "Caminhada",
        location: "SeaWorld Orlando — rota de rides",
        photoSpot: "",
        practicalPlan:
          "Executar as rides mais relevantes e só considerar Quick Queue se houver ganho real e claro de tempo.",
        pitfalls:
          "Comprar fila rápida por ansiedade ou transformar o parque em parque de montanha-russa pura.",
        tips: [
          "O valor do SeaWorld está no equilíbrio entre animais e rides, não num só lado.",
          "Quick Queue só entra se realmente compensar.",
        ],
        hack: "Quick Queue só se der ganho real. Comprar por ansiedade é furada.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "15:00",
        title: "Segunda refeição do dining plan",
        description: "Pausa controlada na segunda metade do dia.",
        strategy:
          "Refeição para sustentar a reta final e não para apagar o grupo no meio do parque.",
        transport: "Caminhada",
        location: "SeaWorld Orlando — ponto útil do dining",
        photoSpot: "",
        practicalPlan:
          "Comer em bloco curto, no timing certo, e usar o plano com inteligência em vez de comer só porque está incluído.",
        pitfalls:
          "Comer por obrigação ou por impulso e perder o melhor timing do fechamento do parque.",
        tips: [
          "Comida incluída não é convite para exagero.",
          "Usar o dining com cabeça melhora o resto do dia.",
        ],
        hack: "",
        restaurant: "All Day Dining",
        lounge: "",
      },
      {
        time: "15:40",
        title: "Bloco 3 — reta final do parque",
        description:
          "Últimas prioridades e fechamento do SeaWorld sem andar em círculo.",
        strategy:
          "Fechar o dia com aproveitamento bom e sem destruir energia para o outlet complementar.",
        transport: "Caminhada",
        location: "SeaWorld Orlando — fechamento da rota",
        photoSpot: "",
        practicalPlan:
          "Resolver o que faltou de essencial e aceitar que o resto é excesso.",
        pitfalls:
          "Querer esticar só porque ainda existe tempo físico de parque.",
        tips: [
          "Boa saída de parque é a que ainda deixa vocês com dignidade para o resto do dia.",
          "Sair no ponto certo também é estratégia premium.",
        ],
        hack: "Se faltou algo essencial, entra aqui; o resto é excesso.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "18:00",
        title: "Saída do parque",
        description:
          "Encerramento do SeaWorld e transição para outlet complementar.",
        strategy:
          "A ida ao outlet é complementar, não missão principal. Hoje o parque continua sendo o centro do dia.",
        transport: "BMW X7",
        location: "SeaWorld Orlando → Orlando Vineland Premium Outlets",
        photoSpot: "",
        practicalPlan:
          "Sair do parque e entrar no outlet já em modo compra objetiva, sem transformar o bloco em nova maratona.",
        pitfalls:
          "Tratar o Vineland como outro dia 21 e estourar o fim da noite.",
        tips: [
          "Vineland conversa melhor com o eixo SeaWorld/Disney e entra aqui como refinamento, não ataque pesado.",
          "O valor está em complementar, não competir com o dia principal de compras.",
        ],
        hack: "",
        restaurant: "",
        lounge: "",
      },
      {
        time: "18:20",
        title: "Orlando Vineland Premium Outlets",
        description:
          "Parada rápida e útil após o SeaWorld, com foco em complemento e oportunidade real.",
        strategy:
          "Compra pontual, rápida e útil. Nada de prolongar demais esse bloco.",
        transport: "BMW X7",
        location:
          "Orlando Vineland Premium Outlets — 8200 Vineland Ave, Orlando, FL 32821",
        photoSpot: "",
        practicalPlan:
          "Entrar com foco em no máximo 2 a 4 lojas relevantes, priorizando itens que façam sentido para o restante da viagem.",
        pitfalls:
          "Entrar sem foco e abrir o outlet inteiro, desperdiçando a inteligência do dia.",
        tips: [
          "Vineland funciona melhor como bloco de lapidação do que de caça pesada.",
          "Menor número de lojas, melhor qualidade de decisão.",
        ],
        hack: "Pensar em necessidade, não em garimpo infinito.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "20:00",
        title: "Jantar",
        description: "Fechamento do dia com comida boa e sem exagero.",
        strategy:
          "Depois de parque + outlet, o jantar precisa resolver bem sem roubar o sono.",
        transport: "BMW X7",
        location: "Região do hotel / caminho de retorno",
        photoSpot: "",
        practicalPlan:
          "Escolher algo gostoso, de boa execução e sem alongar demais a noite.",
        pitfalls: "Jantar pesado ou lento demais depois de um dia já comprido.",
        tips: [
          "O melhor jantar pós-parque é o que encerra o dia, não o que reabre outro bloco.",
          "Aqui, conforto honesto ganha de invenção.",
        ],
        hack: "",
        restaurant:
          "Baratos: Miller’s Ale House / Olive Garden • Premium honesto: Texas Roadhouse",
        lounge: "",
      },
      {
        time: "21:20",
        title: "Retorno ao hotel",
        description:
          "Chegada à base depois do dia técnico de SeaWorld.",
        strategy:
          "Volta limpa, sem desvio e já com foco total no grande dia de compras.",
        transport: "BMW X7",
        location: "Região do hotel em Kissimmee / Orlando",
        photoSpot: "",
        practicalPlan:
          "Ir direto ao hotel, sem inventar nova parada, e começar a preparar mentalmente a missão do dia 21.",
        pitfalls:
          "Esticar a noite à toa e perder a manhã mais importante de compras do roteiro.",
        tips: [
          "O dia 21 rende mais quando o 20 termina sem ruído.",
          "Boa volta também é parte da operação.",
        ],
        hack: "",
        restaurant: "",
        lounge: "",
      },
      {
        time: "21:40",
        title: "Preparação do dia seguinte",
        description: "Ajuste fino para o grande dia de compras.",
        strategy:
          "Separar roupa, mala leve, água e mentalidade de missão. O dia 21 é muito melhor quando vocês acordam prontos.",
        transport: "",
        location: "Hotel em Orlando / Kissimmee",
        photoSpot: "",
        practicalPlan:
          "Deixar roupa confortável, água, celular e a lógica mental da manhã já prontos antes de dormir.",
        pitfalls:
          "Acordar sem saber a ordem das lojas e sem clareza do que realmente compensa comprar.",
        tips: [
          "Dia de compra pesada começa na noite anterior, não no estacionamento da Ross.",
          "A manhã de amanhã é intocável.",
        ],
        hack: "Quem dorme com o plano claro compra melhor.",
        restaurant: "",
        lounge: "",
      },
    ],

    21: [
      {
        time: "07:00",
        title: "Acordar",
        description: "Início do grande dia de compras do roteiro.",
        strategy:
          "Esse é o dia mais importante de compra real. A manhã é sagrada e não pode ser sacrificada por shopping bonito ou passeio aleatório.",
        transport: "",
        location: "",
        photoSpot: "",
        practicalPlan:
          "Levantar com roupa leve, tênis bom, água, celular e cabeça no modo missão. Hoje o foco é preço real e oportunidade forte.",
        pitfalls:
          "Começar o dia pensando em shopping premium antes de resolver o que realmente compensa muito.",
        tips: [
          "Quem compra bem cedo em off-price store normalmente encontra loja mais organizada e melhor chance de achado forte.",
          "O luxo de hoje é comprar bem, não parecer chique comprando mal.",
        ],
        hack: "Hoje a manhã manda no dia inteiro.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "07:25",
        title: "Café da manhã no hotel",
        description: "Café funcional antes da manhã mais importante de compras.",
        strategy:
          "Comer bem e sair cedo. Hoje o corpo precisa aguentar uma manhã longa e produtiva.",
        transport: "",
        location: "Hotel em Kissimmee",
        photoSpot: "",
        practicalPlan:
          "Café objetivo, sem perda de tempo e sem inventar saída extra só para comer fora.",
        pitfalls: "Perder tempo demais no café ou sair sem comer direito.",
        tips: [
          "Dia de compra pesada rende mais quando o corpo não está brigando com fome logo cedo.",
          "Hoje não é dia de gourmetizar café da manhã.",
        ],
        hack: "",
        restaurant: "Café do hotel",
        lounge: "",
      },
      {
        time: "08:00",
        title: "Saída para o eixo da manhã",
        description:
          "Início da missão pesada de compras no eixo The Loop / Kissimmee.",
        strategy:
          "Esse dia é sobre inteligência absoluta. As lojas da manhã foram escolhidas por paz, qualidade de estoque e melhor chance de achado forte.",
        transport: "BMW X7",
        location: "Hotel → eixo The Loop / Kissimmee",
        photoSpot: "",
        practicalPlan:
          "Seguir a ordem fechada da manhã: Ross, TJ Maxx, Marshalls, Nike e Burlington opcional apenas se estiver rápido e valendo.",
        pitfalls:
          "Começar a improvisar rota cedo ou abrir espaço para loja que não estava na lógica principal.",
        tips: [
          "A manhã é intocável.",
          "Esse eixo foi pensado justamente para fugir de áreas mais batidas e preservar qualidade de compra.",
          "Hoje o foco é comprar o que compensa muito, não ficar girando vitrine.",
        ],
        hack: "Ordem certa na manhã evita desespero burro na tarde.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "08:20",
        title: "Ross",
        description:
          "Abertura da manhã em loja com boa chance de mala, frio e achado forte.",
        strategy:
          "Abrir o dia aqui ajuda a pegar a loja mais arrumada e com maior chance de peça forte logo cedo.",
        transport: "Caminhada / carro curto",
        location: "Ross Dress for Less — eixo The Loop / Kissimmee",
        photoSpot: "",
        practicalPlan:
          "Entrar com foco em mala, peças de frio, roupa útil e oportunidade muito forte, sem dispersar em corredor aleatório.",
        pitfalls:
          "Perder tempo olhando tudo e esquecer a missão principal da loja.",
        tips: [
          "Ross boa cedo costuma render muito melhor do que Ross moída no meio do dia.",
          "Se a mala certa aparecer aqui, resolve cedo e isso libera o resto do dia.",
          "Casaco e roupa de frio precisam entrar com prioridade alta por Washington e NYC.",
        ],
        hack: "Primeira missão da Ross: mala e frio. O resto é consequência.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "09:10",
        title: "TJ Maxx + Marshalls",
        description:
          "Miolo forte da manhã com foco em marcas melhores, frio e oportunidades premium de department store.",
        strategy:
          "Essas lojas entram como bloco de qualidade. Aqui a manhã ganha nível sem perder preço.",
        transport: "Caminhada / carro curtíssimo",
        location: "TJ Maxx + Marshalls — eixo The Loop / Kissimmee",
        photoSpot: "",
        practicalPlan:
          "Focar em casacos, roupas boas, marcas fortes e itens de frio antes de abrir espaço para acessório ou besteira secundária.",
        pitfalls:
          "Perder tempo em corredor que não conversa com o objetivo do dia.",
        tips: [
          "TJ Maxx e Marshalls costumam ser excelentes para Ralph Lauren, Calvin Klein, Tommy e peças boas com desconto.",
          "Aqui é bloco de qualidade e valor, não só de quantidade.",
          "Frio para Washington e NYC entra como prioridade real.",
        ],
        hack:
          "Se a manhã estiver boa, esse costuma ser o bloco que eleva o nível das compras.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "10:40",
        title: "Nike do eixo da manhã",
        description:
          "Bloco esportivo focado em oportunidade real sem quebrar a lógica do roteiro.",
        strategy:
          "Manter a Nike dentro do eixo da manhã preserva a inteligência do dia e evita deslocamento inútil para outra ponta de Orlando.",
        transport: "BMW X7",
        location: "Nike — eixo The Loop / Kissimmee",
        photoSpot: "",
        practicalPlan:
          "Entrar já em modo tênis e esportivo, resolver o que realmente compensar e sair sem tentar transformar a Nike em outlet inteiro.",
        pitfalls:
          "Gastarem tempo demais aqui e perderem força para a Dillard’s e Rack depois.",
        tips: [
          "Às vezes a melhor Nike não é a mais famosa, e sim a que conversa melhor com tua rota.",
          "Esportivo cedo mantém o dia racional.",
        ],
        hack: "Resolver esportivo cedo evita bagunça mental depois.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "11:30",
        title: "Burlington opcional",
        description:
          "Fechamento técnico da manhã com foco em mala e frio, só se estiver valendo muito.",
        strategy:
          "Burlington entra como bloco opcional e rápido. Se estiver boa, ajuda muito; se estiver fraca, corta sem dó.",
        transport: "BMW X7",
        location: "Burlington — eixo The Loop / Kissimmee",
        photoSpot: "",
        practicalPlan:
          "Entrar e sair rápido, priorizando mala, frio e oportunidade forte. Sem romantizar loja fraca.",
        pitfalls: "Gastar 40 minutos onde não existe ganho real.",
        tips: [
          "Burlington boa ajuda muito; Burlington ruim vira buraco negro de tempo.",
          "Esse bloco é talvez. E, se entrar, precisa ser tiro curto.",
        ],
        hack: "Burlington não manda no dia; ela só entra se ajudar muito.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "12:10",
        title: "Almoço da missão de compras",
        description: "Pausa curta antes da segunda metade do dia.",
        strategy:
          "Almoço precisa ser bom e rápido. A tarde ainda tem Dillard’s Clearance, Nordstrom Rack, Millenia opcional, Lake Buena e Disney Springs.",
        transport: "",
        location: "Região The Loop / Kissimmee",
        photoSpot: "",
        practicalPlan:
          "Escolher algo rápido, comer sem arrastar o relógio e sair com a cabeça já na Dillard’s.",
        pitfalls: "Refeição longa no meio do dia mais pesado de compras.",
        tips: [
          "Almoço de compra boa é o que te devolve ao volante rápido e lúcido.",
          "Nada de sentar por uma eternidade no dia mais operacional de compras da viagem.",
        ],
        hack: "Almoço rápido protege o segundo turno.",
        restaurant:
          "Baratos: Chick-fil-A / Panera Bread • Premium honesto: Brio Italian Grille",
        lounge: "",
      },
      {
        time: "13:05",
        title: "Dillard’s Clearance",
        description:
          "Bloco tático principal da tarde, com foco em oportunidade real e preço forte.",
        strategy:
          "Dillard’s Clearance é caça de verdade. Não é passeio. É entrar frio, focar em preço bom e sair sem vaidade.",
        transport: "BMW X7",
        location: "Dillard’s Clearance Center — West Oaks Mall / Ocoee",
        photoSpot: "",
        practicalPlan:
          "Entrar com foco em peça forte, marca boa e desconto real. Resolver rápido o que compensa muito e não se apaixonar por etiqueta sem preço certo.",
        pitfalls:
          "Transformar a loja em passeio, andar sem critério ou comprar marca só porque é marca.",
        tips: [
          "Clearance boa costuma render mais do que shopping premium inteiro.",
          "Esse é o teu grande bloco tático da tarde.",
          "Preço de verdade vem antes de glamour.",
        ],
        hack: "Dillard’s é bloco de sangue frio. Quem entra frio, sai melhor.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "14:40",
        title: "Nordstrom Rack",
        description:
          "Bloco mais forte da segunda metade do dia para marca boa com desconto.",
        strategy:
          "Depois da Dillard’s, o Rack vira a melhor oportunidade de marca boa sem pagar preço cheio de shopping premium.",
        transport: "BMW X7",
        location: "Nordstrom Rack — Millenia Crossing",
        photoSpot: "",
        practicalPlan:
          "Entrar com cabeça fria, focar em oportunidade objetiva e revisar calçado, roupa melhor e bagagem sem virar passeio sem fim.",
        pitfalls:
          "Começar a achar que tudo que é melhor precisa entrar só porque o ambiente é bom.",
        tips: [
          "O Rack conversa muito bem com a tua regra de comprar só se compensar muito.",
          "Bloco excelente para marca boa sem teatro de luxo normal.",
        ],
        hack:
          "No Rack, marca boa começa a fazer sentido sem bancar luxo normal.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "16:10",
        title: "Mall at Millenia opcional",
        description:
          "Shopping premium que entra somente se sobrar tempo e energia.",
        strategy:
          "Millenia não manda no dia. Ele entra só se sobrar tempo e só como vitrine premium ou oportunidade muito rara.",
        transport: "BMW X7",
        location: "Mall at Millenia — Orlando, FL",
        photoSpot:
          "Ambiente mais sofisticado do shopping; foto aqui é totalmente secundária e só entra se estiver muito natural e sem roubar a missão.",
        practicalPlan:
          "Passada curta e fria, olhando só o que realmente fizer sentido. Luxo a preço normal entra aqui só para ver.",
        pitfalls:
          "Deixar o Millenia engolir o que realmente compensa no dia.",
        tips: [
          "Luxo a preço normal é passeio, não compra inteligente.",
          "Esse bloco é opcional de verdade, não obrigatório emocionalmente.",
        ],
        hack: "Olhar certo, decidir rápido e seguir.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "17:20",
        title: "Lake Buena Vista Factory Stores",
        description: "Fechamento útil do dia antes de Disney Springs.",
        strategy:
          "Última oportunidade funcional de compra do dia, menor, mais controlável e mais coerente com o eixo Disney.",
        transport: "BMW X7",
        location:
          "Lake Buena Vista Factory Stores — 15657 S Apopka Vineland Rd, Orlando, FL 32821",
        photoSpot: "",
        practicalPlan:
          "Entrar com olhar de revisão final, não de recomeço. Últimas lojas-alvo e saída limpa.",
        pitfalls:
          "Tentar reinventar o dia de compras inteiro nesse bloco final.",
        tips: [
          "Lake Buena funciona bem justamente por ser mais controlável e menos cansativo.",
          "Bloco ótimo para revisão do que ainda faz sentido comprar.",
        ],
        hack: "Última passada útil, sem épico desnecessário.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "19:05",
        title: "Disney Springs",
        description:
          "Noite mais leve depois do dia pesado de compras.",
        strategy:
          "Depois de um dia tão operacional, Disney Springs entra como respiro visual, passeio gostoso e jantar.",
        transport: "Caminhada",
        location: "Disney Springs — Orlando, FL",
        photoSpot:
          "Noite em Disney Springs, luzes e clima mais leve; bom para foto de fechamento mais descontraída, sem obrigação.",
        practicalPlan:
          "Estacionar, caminhar um pouco, jantar e tratar o bloco como fechamento agradável, não nova maratona de loja.",
        pitfalls:
          "Chegar em Disney Springs e transformar o bloco em caça de souvenir ou novo shopping.",
        tips: [
          "Depois do dia 21, o valor de Disney Springs é mais atmosfera do que compra.",
          "Boa hora para curtir sem correria e sentir que a missão compras terminou bem.",
          "Aqui também é bom momento para checar se a missão de roupa de frio ficou realmente resolvida.",
        ],
        hack: "Disney Springs hoje é exalação, não missão.",
        restaurant: "Baratos: Blaze Pizza / Chicken Guy • Premium: The Boathouse",
        lounge: "",
      },
      {
        time: "20:35",
        title: "Retorno ao hotel",
        description:
          "Fim do grande dia de compras com volta limpa para a base.",
        strategy:
          "Voltar sem inventar rodada extra e proteger a madrugada crítica do dia 22.",
        transport: "BMW X7",
        location: "Disney Springs → hotel em Kissimmee",
        photoSpot: "",
        practicalPlan:
          "Saída direta do jantar para o hotel e começo mental da fase Washington.",
        pitfalls: "Emendar mais uma parada depois de Disney Springs.",
        tips: [
          "No dia 21, o melhor luxo é terminar satisfeito e organizado, não exausto.",
          "Hoje a disciplina da volta protege o dia seguinte.",
        ],
        hack: "",
        restaurant: "",
        lounge: "",
      },
      {
        time: "21:00",
        title: "Preparação do dia seguinte",
        description:
          "Fechamento de malas e alinhamento da madrugada crítica rumo a Washington.",
        strategy:
          "O dia 22 começa cedo demais para improviso. Tudo precisa dormir pronto.",
        transport: "",
        location: "Hotel em Orlando / Kissimmee",
        photoSpot: "",
        practicalPlan:
          "Fechar malas, separar documentos, carregadores e tudo que vai entrar na lógica da madrugada e dos voos.",
        pitfalls: "Deixar fechamento de mala para 04:00 da manhã.",
        tips: [
          "Madrugada crítica só funciona quando a noite anterior foi disciplinada.",
          "Documentos e carregadores precisam estar mais fáceis do que normalmente estão.",
        ],
        hack: "Quem fecha tudo hoje compra paz real amanhã.",
        restaurant: "",
        lounge: "",
      },
    ],

        22: [
      {
        time: "03:50",
        title: "Acordar",
        description:
          "Início do dia mais crítico de logística da fase Orlando → Washington.",
        strategy:
          "Esse é dia de operação cirúrgica. Não existe espaço para moleza ou improviso.",
        transport: "",
        location: "",
        photoSpot: "",
        practicalPlan:
          "Levantar com mala, documentos, carregadores e roupa já resolvidos desde a noite anterior, sem reabrir bagagem nem checklist complexo.",
        pitfalls:
          "Tentar fechar mala nessa hora, procurar documento perdido ou achar que alguns minutos não vão fazer diferença.",
        tips: [
          "Madrugada de voo cedo pune quem negocia com o relógio.",
          "Tudo que puder dormir pronto precisa dormir pronto.",
          "Hoje a disciplina vale mais do que qualquer conforto.",
        ],
        hack:
          "Em dia como esse, organização da noite anterior é quase metade do sucesso.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "04:05",
        title: "Check-out e saída do hotel",
        description: "Saída muito cedo rumo ao aeroporto de Orlando.",
        strategy:
          "A manhã inteira gira em torno do voo das 06:00. O foco é chegar com folga, devolver carro e passar pela segurança sem susto.",
        transport: "BMW X7",
        location: "Hotel em Kissimmee / Orlando → MCO",
        photoSpot: "",
        practicalPlan:
          "Fazer check-out limpo, carregar o carro, seguir direto para o aeroporto e não abrir espaço para qualquer parada desnecessária.",
        pitfalls:
          "Sair no limite ou tratar o deslocamento como se fosse apenas mais um trecho simples.",
        tips: [
          "Em aeroporto grande, 10 minutos cedo valem muito mais do que 10 minutos tarde.",
          "Hoje não existe saída relaxada.",
        ],
        hack: "Nesse tipo de manhã, margem não é luxo; é proteção.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "04:50",
        title: "Devolução da BMW X7",
        description:
          "Encerramento da fase Miami / Lakeland / Orlando de carro.",
        strategy:
          "Devolução limpa e rápida. Esse bloco precisa ser muito bem executado para não contaminar a segurança e o embarque.",
        transport: "BMW X7",
        location: "Sixt / locadora — Aeroporto de Orlando (MCO)",
        photoSpot: "",
        practicalPlan:
          "Chegar, retirar malas, conferir interior do carro, registrar mentalmente o básico e seguir direto para o terminal.",
        pitfalls:
          "Esquecer item no carro, sair com mala mal conferida ou tratar a devolução como detalhe irrelevante.",
        tips: [
          "Última checagem de carro sempre merece atenção no banco traseiro, porta-malas e compartimentos.",
          "MCO Reserve é uma das melhores cartas desse dia.",
        ],
        hack: "Última olhada no carro poupa dor de cabeça idiota.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "05:10",
        title: "Segurança e embarque",
        description:
          "Passagem pela segurança com foco total em agilidade.",
        strategy:
          "Esse é o tipo de manhã em que qualquer desorganização vira estresse desnecessário.",
        transport: "A pé / aeroporto",
        location: "Aeroporto Internacional de Orlando (MCO)",
        photoSpot: "",
        practicalPlan:
          "Passar pela segurança com mochila preparada e, se sobrar janela real, usar sala VIP só de forma funcional e curta.",
        pitfalls:
          "Reorganizar mala em fila, abrir bagagem na hora errada ou ir para lounge sem acompanhar portão e tempo real.",
        tips: [
          "Lounge em voo cedo não é luxo bobo; muitas vezes é o único momento civilizado da manhã.",
          "Mochila pronta para segurança muda muito a experiência.",
        ],
        hack: "Segurança boa começa antes da fila.",
        restaurant: "",
        lounge:
          "The Club MCO / Plaza Premium / sala compatível via Visa Airport Companion ou Mastercard Airport Experiences, conforme terminal e disponibilidade",
      },
      {
        time: "06:00",
        title: "Voo MCO → EWR",
        description:
          "Primeiro trecho da transição até Washington.",
        strategy:
          "Trecho funcional. A missão é chegar em Newark e executar bem a conexão para DCA.",
        transport: "United UA 1309",
        location: "Orlando (MCO) → Newark (EWR)",
        photoSpot: "",
        practicalPlan:
          "Usar o voo para respirar, reorganizar cabeça e não desperdiçar energia mental à toa.",
        pitfalls:
          "Desembarcar em Newark sem clareza do próximo passo da conexão.",
        tips: [
          "Conexão boa depende menos de sorte e mais de sair do avião com plano claro.",
          "Hoje a energia precisa ser distribuída porque ainda existe tarde e noite em Washington.",
        ],
        hack: "Esse voo é ponte, não capítulo principal.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "09:00",
        title: "Conexão em Newark",
        description: "Passagem funcional por EWR até o segundo voo do dia.",
        strategy:
          "Conexão limpa e objetiva. O dia ainda tem bloco urbano forte em Washington.",
        transport: "A pé / aeroporto",
        location: "Newark Liberty International Airport (EWR)",
        photoSpot: "",
        practicalPlan:
          "Descer, confirmar portão, resolver banheiro e água, e usar lounge só se a janela permitir sem risco burro.",
        pitfalls:
          "Gastar energia demais em Newark, andar longe sem necessidade ou relaxar demais na conexão.",
        tips: [
          "Conexão boa não é a mais confortável; é a que deixa o resto do dia vivo.",
          "Hoje simplicidade vence ambição de aeroporto.",
        ],
        hack: "Não gastar energia demais em Newark já é ganhar parte da tarde em DC.",
        restaurant: "",
        lounge:
          "United Club ou sala parceira via Visa Airport Companion / Mastercard Airport Experiences, se compatível com o terminal e a janela de conexão",
      },
      {
        time: "11:00",
        title: "Voo EWR → DCA",
        description: "Segundo trecho até Washington.",
        strategy:
          "Trecho final da transição. O foco agora já é pousar e entrar rápido na cidade.",
        transport: "United UA 4172",
        location: "Newark (EWR) → Washington National (DCA)",
        photoSpot: "",
        practicalPlan:
          "Pousar já com hotel, deslocamento e primeiro bloco da tarde mentalmente prontos.",
        pitfalls:
          "Pousar sem saber a logística até o hotel ou sem mentalidade de cidade.",
        tips: [
          "DCA ajuda muito porque coloca vocês mais perto da cidade do que outras alternativas.",
          "Boa entrada em Washington depende de sair do aeroporto com direção clara.",
        ],
        hack: "Pousar já em modo urbano faz a tarde render mais.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "13:15",
        title: "Chegada ao hotel / deixar malas",
        description:
          "Entrada técnica em Washington antes do bloco da tarde e noite.",
        strategy:
          "Deixar malas rápido e sair para a cidade. Esse não é bloco para descansar.",
        transport: "Uber",
        location: "Hotel em Washington DC",
        photoSpot: "",
        practicalPlan:
          "Usar luggage storage ou check-in rápido, deixar o peso e seguir para a cidade sem transformar o hotel em pausa longa.",
        pitfalls:
          "Sentar demais no hotel e desperdiçar a primeira tarde em Washington.",
        tips: [
          "No primeiro dia de cidade nova, parar demais no hotel custa caro em roteiro.",
          "Hotel aqui é base técnica, não recompensa.",
        ],
        hack: "Se o quarto não estiver pronto, luggage storage e rua.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "14:15",
        title: "The Wharf",
        description: "Primeiro bloco urbano de ambientação em Washington.",
        strategy:
          "Entrar em Washington pelo Wharf é inteligente: visual bom, clima agradável e transição suave para a cidade.",
        transport: "Uber + caminhada",
        location: "The Wharf — Washington, DC",
        photoSpot:
          "Boas fotos com água, píer e atmosfera urbana leve; melhor em cliques espontâneos, sem transformar o lugar em ensaio.",
        practicalPlan:
          "Chegar, caminhar, sentir o ambiente e fazer fotos leves sem gastar tempo demais antes do eixo monumental.",
        pitfalls:
          "Ficar tempo demais aqui e apertar o Lincoln no melhor horário do dia.",
        tips: [
          "The Wharf mostra um Washington menos sisudo e mais vivo.",
          "Bom bloco de ambientação antes do peso histórico do Mall.",
        ],
        hack: "É um ótimo começo porque abre a cidade sem jogar tudo de uma vez.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "16:00",
        title: "Washington Monument + World War II Memorial",
        description: "Bloco clássico e simbólico do National Mall.",
        strategy:
          "Aqui começa o coração visual e histórico da viagem em Washington.",
        transport: "Uber + caminhada",
        location: "National Mall — Washington Monument / World War II Memorial",
        photoSpot:
          "Eixos clássicos do Mall com monumento ao fundo; foto melhor com composição limpa e direção de caminhada clara, sem virar passeio torto.",
        practicalPlan:
          "Descer em ponto que poupe perna, fazer o eixo com direção e seguir já pensando no Lincoln Memorial no pôr do sol.",
        pitfalls:
          "Andar sem direção no Mall e desperdiçar energia antes do melhor bloco visual da noite.",
        tips: [
          "No Mall, direção certa vale tanto quanto entusiasmo.",
          "Washington recompensa muito quem respeita eixo e ordem.",
        ],
        hack: "Caminhar com direção no Mall poupa tempo e perna.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "18:15",
        title: "Lincoln Memorial no pôr do sol",
        description:
          "Um dos pontos mais fortes da experiência em Washington.",
        strategy:
          "Esse momento precisa acontecer do jeito certo. O Lincoln no pôr do sol é bloco de memória forte.",
        transport: "Caminhada / Uber curto",
        location:
          "Lincoln Memorial — 2 Lincoln Memorial Cir NW, Washington, DC 20002",
        photoSpot:
          "Fotos muito fortes no exterior com a luz do fim de tarde e também no interior com enquadramento respeitoso; bom bloco para pausa maior e contemplação de verdade.",
        practicalPlan:
          "Chegar com calma, viver o lugar com presença e não tratar o memorial só como item para riscar da lista.",
        pitfalls:
          "Passar correndo ou chegar já cansado e sem espaço mental para absorver o lugar.",
        tips: [
          "Alguns lugares não pedem pressa; o Lincoln é um deles.",
          "Esse é um dos pontos mais impactantes de Washington quando encaixado no horário certo.",
        ],
        hack: "Chegar com calma aqui muda tudo.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "19:45",
        title: "Jantar em Georgetown",
        description:
          "Fechamento elegante da primeira noite em Washington.",
        strategy:
          "Georgetown entra como contraste perfeito depois do eixo monumental: mais vida, charme e jantar bom.",
        transport: "Uber",
        location: "Georgetown — Washington, DC",
        photoSpot:
          "Noite em Georgetown com rua bonita e clima mais humano; boas fotos espontâneas, sem esforço.",
        practicalPlan:
          "Chegar, caminhar um pouco, jantar e manter a noite agradável sem alongar além do necessário.",
        pitfalls:
          "Escolher lugar ruim por pressa ou deixar a noite crescer demais num dia já pesado de logística.",
        tips: [
          "Georgetown ajuda a equilibrar o Washington monumental com um lado mais gostoso e vivo.",
          "Martin’s Tavern agrega história e experiência ao mesmo tempo.",
        ],
        hack:
          "Primeira noite boa em DC fecha melhor em Georgetown do que em correria.",
        restaurant:
          "Baratos: Clyde’s / Martin’s Tavern no modo enxuto • Premium: Founding Farmers ou Martin’s Tavern em clima completo",
        lounge: "",
      },
      {
        time: "21:30",
        title: "Retorno ao hotel",
        description:
          "Fim da primeira noite em Washington com volta limpa para descansar.",
        strategy:
          "Voltar cedo o suficiente para proteger o dia 23, que tem horários fixos importantes.",
        transport: "Uber",
        location: "Georgetown → hotel em Washington DC",
        photoSpot: "",
        practicalPlan:
          "Saída direta após o jantar, sem inventar segunda parada nem alongar a noite sem ganho real.",
        pitfalls:
          "Esticar a noite e contaminar o dia histórico mais importante de Washington.",
        tips: [
          "Washington rende muito quando os dias começam cedo e terminam limpos.",
          "Amanhã o relógio manda bastante.",
        ],
        hack: "",
        restaurant: "",
        lounge: "",
      },
      {
        time: "21:50",
        title: "Preparação do dia seguinte",
        description:
          "Ajuste fino para Capitólio, Library of Congress e Air & Space.",
        strategy:
          "O dia 23 tem hora fixa e peso histórico. Tudo precisa dormir pronto.",
        transport: "",
        location: "Hotel em Washington DC",
        photoSpot: "",
        practicalPlan:
          "Separar roupa, documentos, celular e a lógica do primeiro deslocamento antes de dormir.",
        pitfalls:
          "Acordar sem clareza do eixo do dia ou tendo que improvisar logo cedo.",
        tips: [
          "Em cidade histórica, atraso pequeno vira roteiro torto muito fácil.",
          "Hoje a noite precisa preparar amanhã com respeito ao relógio.",
        ],
        hack: "Dormir com o dia 23 desenhado poupa tempo real.",
        restaurant: "",
        lounge: "",
      },
    ],

    23: [
      {
        time: "07:10",
        title: "Acordar",
        description:
          "Início do dia forte de Washington, com blocos históricos e horários fixos.",
        strategy:
          "Hoje é dia de precisão. O valor está em respeitar os horários e o peso dos lugares.",
        transport: "",
        location: "",
        photoSpot: "",
        practicalPlan:
          "Levantar, vestir e sair com o eixo do dia muito claro: Capitólio, Library e Air & Space no horário certo.",
        pitfalls:
          "Começar a manhã em ritmo solto ou tratar horários fixos como se fossem flexíveis.",
        tips: [
          "Washington premia bastante quem respeita relógio.",
          "Hoje o dia vale mais pela ordem do que pela pressa.",
        ],
        hack: "Dia de agenda fixa exige cabeça reta desde o despertar.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "07:35",
        title: "Café da manhã no hotel",
        description: "Café funcional antes do eixo histórico do dia.",
        strategy:
          "Café curto e eficiente. O foco é sair cedo e sem perder força no meio da manhã.",
        transport: "",
        location: "Hotel em Washington DC",
        photoSpot: "",
        practicalPlan:
          "Comer rápido, sem dispersar, e já sair com o primeiro Uber definido.",
        pitfalls:
          "Enrolar demais no hotel e apertar o Capitólio logo cedo.",
        tips: [
          "Em roteiro com horários fixos, café eficiente vale mais do que café charmoso.",
          "Hoje a manhã precisa sair sem ruído.",
        ],
        hack: "",
        restaurant: "Café do hotel",
        lounge: "",
      },
      {
        time: "08:00",
        title: "Saída do hotel",
        description: "Deslocamento para o Capitólio.",
        strategy:
          "O dia 23 precisa ser preciso. Ele gira em torno de horários fixos e áreas históricas muito relevantes.",
        transport: "Uber",
        location: "Hotel em Washington DC → U.S. Capitol",
        photoSpot: "",
        practicalPlan:
          "Sair já com o trajeto claro, sem abrir margem para improviso ou atraso bobo.",
        pitfalls:
          "Sair tarde achando que vai compensar no caminho.",
        tips: [
          "No eixo do Congresso, pequenos atrasos bagunçam vários blocos seguidos.",
          "Hoje o ritmo bom é o que parece controlado, não corrido.",
        ],
        hack: "Respeitar a saída é proteger o resto do dia inteiro.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "09:10",
        title: "Capitólio",
        description: "Primeiro grande bloco do dia histórico em Washington.",
        strategy:
          "Começar pelo Capitólio coloca o dia no trilho certo em história, imagem e hierarquia.",
        transport: "Uber + caminhada",
        location: "U.S. Capitol — Washington, DC",
        photoSpot:
          "Exterior do Capitólio com enquadramento mais limpo e eixo frontal ou lateral amplo; funciona melhor com tempo para olhar o prédio antes de fotografar.",
        practicalPlan:
          "Chegar cedo, alinhar a visita e trabalhar bem o exterior antes de seguir para a Library of Congress.",
        pitfalls:
          "Chegar apertado ou tratar o lugar como simples prédio para foto.",
        tips: [
          "O Capitólio é âncora visual e histórica da manhã.",
          "Boa leitura aqui já organiza mentalmente o restante do dia.",
        ],
        hack: "Capitólio cedo dá ao dia o peso certo logo de saída.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "11:15",
        title: "Library of Congress",
        description:
          "Bloco seguinte do eixo histórico, com força visual e cultural muito acima da média.",
        strategy:
          "Esse não é um bloco de passagem. A Library precisa ser vivida como experiência visual, histórica e arquitetônica.",
        transport: "Caminhada",
        location:
          "Library of Congress — 101 Independence Ave SE, Washington, DC 20540",
        photoSpot:
          "Interior da Library of Congress com foco em teto, escadarias e grandes salões; melhor bloco para fotos mais contemplativas e limpas.",
        practicalPlan:
          "Entrar com calma, olhar o prédio como experiência e não só como biblioteca a visitar rapidamente.",
        pitfalls:
          "Passar rápido demais ou reduzir o bloco a uma visita só funcional.",
        tips: [
          "A Library surpreende muito quem chega esperando 'só uma biblioteca'.",
          "Esse é um dos lugares mais bonitos de Washington no teu roteiro.",
        ],
        hack: "Olhar a Library como obra e não só como prédio muda tudo.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "12:45",
        title: "Almoço",
        description: "Pausa funcional entre os blocos principais do dia.",
        strategy:
          "Almoço rápido e funcional. A tarde ainda tem Air & Space, que é um dos grandes pontos da viagem para vocês.",
        transport: "Caminhada / Uber curto",
        location: "Região do Capitólio / National Mall",
        photoSpot: "",
        practicalPlan:
          "Escolher algo prático e perto do eixo do dia, evitando refeição pesada ou longa demais.",
        pitfalls:
          "Almoço pesado demais ou fora de rota, roubando energia e tempo do museu.",
        tips: [
          "No Mall e arredores, comida rápida boa quase sempre rende mais do que almoço longo.",
          "Aqui o almoço serve o museu, não o contrário.",
        ],
        hack: "",
        restaurant:
          "Baratos: Pret A Manger / food hall prático da região • Premium: Old Ebbitt Grill, se a logística realmente ajudar",
        lounge: "",
      },
      {
        time: "14:00",
        title: "Smithsonian National Air and Space Museum",
        description:
          "Bloco principal da tarde e um dos pontos mais alinhados ao perfil da viagem.",
        strategy:
          "Esse é um dos blocos mais fortes da viagem para vocês. Precisa ser vivido com prioridade e atenção, não no modo correria completa.",
        transport: "Caminhada / Uber curto",
        location:
          "Smithsonian National Air and Space Museum — 600 Independence Ave SW, Washington, DC 20560",
        photoSpot:
          "Hall principal e peças icônicas do museu; aqui a foto entra como consequência da experiência, não como objetivo principal.",
        practicalPlan:
          "Entrar já com mentalidade de prioridade: ver primeiro o que mais importa e não cair na ilusão de tentar ver tudo no mesmo ritmo.",
        pitfalls:
          "Querer abraçar o museu inteiro como se todas as áreas tivessem o mesmo peso para vocês.",
        tips: [
          "Museu grande se aproveita melhor por prioridade do que por abrangência.",
          "Esse é bloco nobre do dia e merece energia boa.",
          "Como já alinhado, o Air & Space fica às 14:00.",
        ],
        hack: "Entrar com prioridade clara faz o museu render muito mais.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "17:30",
        title: "Fechamento do museu / saída controlada",
        description:
          "Fim da parte mais intensa do dia em Washington.",
        strategy:
          "Fechar bem o museu, sem inventar bloco grande extra, preserva a qualidade do dia seguinte.",
        transport: "Uber",
        location: "Air & Space → hotel / eixo do jantar",
        photoSpot: "",
        practicalPlan:
          "Aceitar o fechamento do bloco, sair com calma e não tentar espremer mais um ponto histórico pesado só porque sobrou um pouco de energia.",
        pitfalls:
          "Forçar um bloco extra e transformar a reta final do dia em arrasto.",
        tips: [
          "Em DC, sair no ponto certo quase sempre vale mais do que forçar mais uma visita.",
          "Guardar perna e cabeça para o 24 é inteligência.",
        ],
        hack: "A boa saída também faz parte da qualidade do museu.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "19:30",
        title: "Jantar",
        description: "Fechamento do segundo dia em Washington.",
        strategy:
          "Jantar para encerrar bem, sem roubar descanso e sem tentar competir com o peso histórico do dia.",
        transport: "Uber",
        location: "Washington DC",
        photoSpot: "",
        practicalPlan:
          "Escolher um clássico bem resolvido e manter a noite limpa, sem abrir novo eixo de passeio.",
        pitfalls:
          "Alongar demais a noite ou criar deslocamento gastronômico ruim.",
        tips: [
          "Washington tem alguns clássicos que valem mais pela solidez do que pelo espetáculo.",
          "Depois de um dia desses, coerência vence invenção.",
        ],
        hack: "",
        restaurant: "Baratos: The Hamilton / Clyde’s • Premium: Old Ebbitt Grill",
        lounge: "",
      },
      {
        time: "21:15",
        title: "Retorno ao hotel",
        description:
          "Fim do dia histórico com volta organizada para descansar.",
        strategy:
          "Retornar cedo o bastante para deixar o dia 24 leve e bonito, como planejado.",
        transport: "Uber",
        location: "Washington DC → hotel",
        photoSpot: "",
        practicalPlan:
          "Volta direta, sem segunda parada, já pensando no último dia em Washington e no voo noturno.",
        pitfalls:
          "Esticar a noite e bagunçar a leveza elegante do dia 24.",
        tips: [
          "Boa parte do ritmo elegante de uma viagem nasce em noites bem encerradas.",
          "Hoje dormir bem vale muito.",
        ],
        hack: "",
        restaurant: "",
        lounge: "",
      },
      {
        time: "21:35",
        title: "Preparação do dia seguinte",
        description:
          "Ajuste leve para Georgetown, Martin’s, Arlington e voo noturno.",
        strategy:
          "O dia 24 não é corrido, mas precisa ser limpo. Preparar hoje deixa tudo mais leve amanhã.",
        transport: "",
        location: "Hotel em Washington DC",
        photoSpot: "",
        practicalPlan:
          "Separar roupa, revisar bagagem parcial e já alinhar mentalmente a lógica do checkout posterior.",
        pitfalls:
          "Deixar tudo para depois do almoço do dia 24.",
        tips: [
          "Dia leve também pede organização; só muda o tom.",
          "Adiantar parte da mala hoje deixa o 24 muito mais bonito.",
        ],
        hack: "Parte da leveza do dia 24 nasce nessa arrumação curta de hoje.",
        restaurant: "",
        lounge: "",
      },
    ],

        24: [
      {
        time: "08:00",
        title: "Acordar",
        description:
          "Início mais leve do último dia em Washington, sem desperdiçar a manhã.",
        strategy:
          "Hoje a proposta é mais leve, mas não frouxa. O valor está em sair descansado e elegante para fechar Washington bem antes do voo noturno.",
        transport: "",
        location: "",
        photoSpot: "",
        practicalPlan:
          "Levantar com calma, sem correria boba, mas sem transformar a manhã em lentidão desorganizada.",
        pitfalls:
          "Confundir dia leve com dia sem disciplina.",
        tips: [
          "Dia leve bem conduzido quase sempre entra entre os melhores da viagem.",
          "Descanso aqui é investimento, não perda.",
        ],
        hack: "Hoje a beleza está em parecer leve sem ficar frouxo.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "08:30",
        title: "Café da manhã no hotel",
        description:
          "Café funcional antes do fechamento elegante de Washington.",
        strategy:
          "Começar sem correria e sem sair caçando cafeteria. O dia já tem personalidade própria.",
        transport: "",
        location: "Hotel em Washington DC",
        photoSpot: "",
        practicalPlan:
          "Comer, fechar o básico e sair no horário certo para Georgetown.",
        pitfalls:
          "Estender demais a manhã no hotel e apertar o resto do dia à toa.",
        tips: [
          "O charme do dia 24 está justamente em parecer leve sem ficar mole.",
          "Café no hotel preserva a manhã bonita e limpa.",
        ],
        hack: "",
        restaurant: "Café do hotel",
        lounge: "",
      },
      {
        time: "10:20",
        title: "Saída do hotel",
        description: "Deslocamento para Georgetown.",
        strategy:
          "Georgetown entra como bloco agradável, sem correria e com bom clima urbano.",
        transport: "Uber",
        location: "Hotel em Washington DC → Georgetown",
        photoSpot: "",
        practicalPlan:
          "Pedir o Uber e chegar já no modo passeio leve, sem transformar o deslocamento em complicação.",
        pitfalls:
          "Sair tarde demais e apertar o almoço no Martin’s.",
        tips: [
          "A beleza do 24 está em costurar charme, história e logística sem parecer operação pesada.",
          "Boa área para fechar Washington com elegância.",
        ],
        hack: "",
        restaurant: "",
        lounge: "",
      },
      {
        time: "11:00",
        title: "Georgetown",
        description: "Passeio leve e bonito antes do almoço.",
        strategy:
          "Esse bloco serve para sentir a cidade e fechar Washington num tom mais humano, elegante e gostoso.",
        transport: "Caminhada",
        location: "Georgetown — Washington, DC",
        photoSpot:
          "Ruas clássicas de Georgetown com clima urbano bonito; ótimo para fotos leves e elegantes, sem pressa e sem cara de corrida.",
        practicalPlan:
          "Chegar, caminhar, observar vitrines e fazer fotos sem transformar o bairro em maratona.",
        pitfalls:
          "Apressar Georgetown como se fosse simples deslocamento antes do almoço.",
        tips: [
          "Georgetown ajuda a mostrar um Washington além de monumentos e governo.",
          "Bloco ótimo para fechar a cidade com charme.",
        ],
        hack: "Hoje o bairro vale tanto pelo clima quanto pelo roteiro.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "12:30",
        title: "Almoço no Martin’s Tavern",
        description:
          "Almoço com história, tradição e atmosfera clássica.",
        strategy:
          "Esse almoço não é só refeição. É experiência e narrativa da viagem.",
        transport: "Caminhada",
        location: "Martin’s Tavern — 1264 Wisconsin Ave NW, Washington, DC 20007",
        photoSpot: "",
        practicalPlan:
          "Chegar no horário, sentar com calma e aproveitar o contexto do lugar antes de seguir para Arlington.",
        pitfalls:
          "Tratar o almoço só como parada funcional e passar correndo por uma das histórias mais bonitas do dia.",
        tips: [
          "Lembrar da história do pedido de casamento de JFK aqui dá alma ao bloco.",
          "Esse é almoço de tradição, não de pressa.",
        ],
        hack: "Quando a mesa tem história, o almoço deixa de ser só comida.",
        restaurant: "Martin’s Tavern",
        lounge: "",
      },
      {
        time: "14:30",
        title: "Arlington National Cemetery",
        description:
          "Bloco da tarde com peso histórico e simbólico muito forte.",
        strategy:
          "Fazer Arlington à tarde é leitura inteligente por conta do ritmo do dia e da mudança de atmosfera que ele pede.",
        transport: "Uber",
        location: "Arlington National Cemetery — Arlington, VA",
        photoSpot:
          "Bloco menos sobre foto e mais sobre postura, atmosfera e contemplação; se fotografar, precisa ser com respeito e sem excesso.",
        practicalPlan:
          "Chegar com postura certa, entrar em modo contemplativo e fazer o eixo principal sem pressa caricata nem passeio banal.",
        pitfalls:
          "Entrar no ritmo errado para o lugar ou tratar o bloco como passeio qualquer.",
        tips: [
          "Arlington muda totalmente quando a pessoa entende o peso do local antes de entrar.",
          "Esse é um dos pontos mais solenes da viagem.",
        ],
        hack: "Entrar no clima certo muda completamente a visita.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "17:30",
        title: "Retorno ao hotel e malas",
        description:
          "Buscar bagagens e preparar a saída para o aeroporto.",
        strategy:
          "Esse bloco precisa ser limpo e sem enrolação. Pegar malas e seguir.",
        transport: "Uber",
        location: "Arlington → hotel em Washington DC",
        photoSpot: "",
        practicalPlan:
          "Ir direto ao hotel, pegar bagagens e revisar o básico sem deixar a mala virar drama de última hora.",
        pitfalls:
          "Fechar mala no desespero ou descobrir coisa solta demais nesse momento.",
        tips: [
          "Último dia de cidade quase sempre estraga quando a pessoa trata mala como detalhe.",
          "Quanto mais simples esse bloco, melhor o aeroporto rende.",
        ],
        hack: "Nada de fechar mala com pressa nessa hora.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "19:30",
        title: "Saída para o aeroporto",
        description: "Reta final de Washington rumo a Nova York.",
        strategy:
          "Sair com folga e encerrar Washington sem estresse.",
        transport: "Uber",
        location: "Hotel em Washington DC → IAD",
        photoSpot: "",
        practicalPlan:
          "Seguir para o aeroporto com passagens, documentos e malas já em modo totalmente pronto.",
        pitfalls:
          "Sair tarde e deixar o fim de Washington parecer corrido e feio.",
        tips: [
          "Despedida boa de cidade também depende de aeroporto bem executado.",
          "Hoje o voo não pode engolir a elegância do fechamento em DC.",
        ],
        hack: "",
        restaurant: "",
        lounge: "",
      },
      {
        time: "20:30",
        title: "Segurança e bloco aeroporto",
        description:
          "Passagem pela segurança e possível uso de sala VIP antes do voo.",
        strategy:
          "Resolver tudo cedo e, se a janela permitir, usar lounge como apoio funcional antes da ida para NYC.",
        transport: "A pé / aeroporto",
        location: "Washington Dulles International Airport (IAD)",
        photoSpot: "",
        practicalPlan:
          "Passar pela segurança, avaliar a janela real e só então usar lounge, sem se afastar do portão com imprudência.",
        pitfalls:
          "Ficar longe do portão ou tratar lounge como distração e não como respiro.",
        tips: [
          "Antes de voo noturno curto, lounge vale mais pela paz do que pela comida.",
          "Hoje o conforto bom é o que não gera risco.",
        ],
        hack: "Lounge como respiro, não como passeio.",
        restaurant: "",
        lounge:
          "Sala parceira via Visa Airport Companion ou Mastercard Airport Experiences, conforme terminal e disponibilidade",
      },
      {
        time: "22:08",
        title: "Voo IAD → LGA",
        description: "Trecho noturno para Nova York.",
        strategy:
          "Trecho curto, funcional e já com cabeça no hotel e no descanso em NYC.",
        transport: "United UA 6125",
        location: "Washington (IAD) → New York (LGA)",
        photoSpot: "",
        practicalPlan:
          "Embarcar e pousar já em modo hotel, sem criar expectativas de bloco noturno extra em Nova York.",
        pitfalls:
          "Pousar querendo ainda inventar passeio ou teste de cidade na madrugada.",
        tips: [
          "Chegar na cidade à noite e dormir logo ajuda muito o dia seguinte render pesado.",
          "Esse voo serve à operação, não à emoção.",
        ],
        hack: "Nova York fica melhor quando a entrada nela é limpa.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "23:40",
        title: "Retorno ao hotel em North Bergen",
        description:
          "Chegada à base de NYC e encerramento limpo do dia.",
        strategy:
          "Chegar, subir e dormir. Nada de inventar bloco noturno em Nova York nessa hora.",
        transport: "Uber",
        location: "LaGuardia (LGA) → Wyndham Garden North Bergen Near Secaucus",
        photoSpot: "",
        practicalPlan:
          "Pedir o Uber, fazer check-in e encerrar o dia sem tentar esticar o primeiro contato com a cidade.",
        pitfalls:
          "Querer testar Nova York na madrugada e pagar caro em cansaço no dia 25.",
        tips: [
          "Nova York recompensa muito quem chega à noite e respeita o descanso.",
          "Entrar limpo na cidade protege o primeiro grande dia.",
        ],
        hack: "Hoje o luxo é chegar e dormir.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "00:05",
        title: "Preparação do dia seguinte",
        description:
          "Ajuste mínimo para a saída cedo rumo ao Battery Park.",
        strategy:
          "Só o básico: separar roupa, carregar celular e dormir.",
        transport: "",
        location: "Hotel em North Bergen",
        photoSpot: "",
        practicalPlan:
          "Separar roupa, deixar celular e power bank carregando e já dormir sem inventar organização excessiva nessa hora.",
        pitfalls:
          "Tentar organizar demais a madrugada e perder sono à toa.",
        tips: [
          "Às vezes o melhor ajuste fino é simplesmente não inventar nada.",
          "Amanhã o dia já começa grande.",
        ],
        hack: "Hoje é só o básico. O luxo é dormir.",
        restaurant: "",
        lounge: "",
      },
    ],

    25: [
      {
        time: "05:45",
        title: "Acordar",
        description: "Início do primeiro grande dia em Nova York.",
        strategy:
          "O dia 25 é grande e precisa começar eficiente. A primeira metade gira em torno da Estátua da Liberdade e do downtown bem encaixado.",
        transport: "",
        location: "",
        photoSpot: "",
        practicalPlan:
          "Levantar com roupa, documentos, água e bilhetes já encaminhados, sem reabrir bagagem nem improvisar cedo.",
        pitfalls:
          "Começar a manhã em ritmo lento achando que NYC vai perdoar.",
        tips: [
          "Nova York premia muito quem entra cedo no dia e pune quem começa tarde.",
          "Hoje o relógio manda bastante.",
        ],
        hack: "Quem acorda alinhado vive Manhattan muito melhor.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "06:05",
        title: "Café da manhã no hotel",
        description:
          "Café funcional antes da saída para Lower Manhattan.",
        strategy:
          "Comer cedo e sair. O valor do dia está na rua, não em estender a manhã no hotel.",
        transport: "",
        location: "Hotel em North Bergen",
        photoSpot: "",
        practicalPlan:
          "Fazer o café direto, sem alongar o bloco e sem sair com fome para a travessia até Battery Park.",
        pitfalls:
          "Enrolar demais no hotel e comprometer a janela da Estátua.",
        tips: [
          "Na fase NYC, o bom café é o que não atrasa a cidade.",
          "Hoje o corpo precisa sair funcional e leve.",
        ],
        hack: "",
        restaurant: "Café do hotel",
        lounge: "",
      },
      {
        time: "06:30",
        title: "Saída do hotel",
        description:
          "Início do primeiro grande dia em Nova York rumo ao Battery Park.",
        strategy:
          "A saída precisa ser prática e econômica. Sem carro, o melhor modal é o que simplifica a operação sem jogar dinheiro fora.",
        transport: "Uber + trem / ônibus conforme trânsito e custo",
        location: "Hotel em North Bergen → Battery Park",
        photoSpot: "",
        practicalPlan:
          "Priorizar simplicidade: Uber até o ponto mais inteligente ou direto, conforme custo, fila e tempo real.",
        pitfalls:
          "Inventar rota complicada cedo demais e já começar o dia irritado.",
        tips: [
          "Em NYC e arredores, o modal certo é o que simplifica a operação do dia.",
          "Hoje simplicidade vence heroísmo de transporte público mal encaixado.",
        ],
        hack:
          "No dia 25, logística limpa vale muito mais do que economizar trocado sofrendo.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "08:30",
        title: "Statue of Liberty",
        description: "Primeiro bloco icônico do dia.",
        strategy:
          "Começar pela Estátua coloca o dia no eixo certo: ícones fortes logo no início.",
        transport: "Ferry",
        location: "Battery Park / Liberty Island — New York, NY",
        photoSpot:
          "Estátua, ferry e skyline; melhor trabalhar esse bloco como experiência completa e não só foto na ilha.",
        practicalPlan:
          "Chegar com tempo, entrar de forma organizada e viver também a travessia como parte da experiência.",
        pitfalls:
          "Chegar apertado e contaminar o resto do downtown desde cedo.",
        tips: [
          "A experiência não é só a estátua; o ferry e o skyline fazem parte do pacote emocional.",
          "Esse bloco abre Nova York em nível alto de simbolismo e imagem.",
        ],
        hack:
          "Dia grande em NYC fica ainda maior quando começa com a Estátua bem encaixada.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "11:30",
        title: "Joe’s Pizza",
        description: "Almoço clássico, rápido e certeiro de Nova York.",
        strategy:
          "Almoço curto, gostoso e inteligente. Dia grande pede refeição objetiva.",
        transport: "Caminhada / metrô / Uber",
        location: "Joe’s Pizza — New York, NY",
        photoSpot: "",
        practicalPlan:
          "Chegar, pedir sem enrolar, comer e já seguir para o 9/11 Museum sem transformar a pizza em pausa longa.",
        pitfalls:
          "Tentar transformar esse almoço em grande bloco de mesa num dia que ainda tem muito chão.",
        tips: [
          "Joe’s entrega tradição e agilidade ao mesmo tempo.",
          "Sim, a associação com o Homem-Aranha agrega charme à experiência.",
        ],
        hack: "Clássico rápido, gostoso e sem roubar a operação.",
        restaurant: "Joe’s Pizza",
        lounge: "",
      },
      {
        time: "14:00",
        title: "9/11 Museum",
        description: "Bloco emocional e histórico da tarde.",
        strategy:
          "Esse bloco precisa ser vivido com presença, não no modo correria.",
        transport: "Caminhada",
        location: "9/11 Museum — 180 Greenwich St, New York, NY 10007",
        photoSpot:
          "Exterior do memorial e entorno; dentro, a experiência precisa pesar mais que a câmera.",
        practicalPlan:
          "Entrar com calma, respeitando o ritmo do lugar e a atmosfera que ele pede.",
        pitfalls:
          "Tratar o bloco como simples passagem turística ou chegar corrido e mentalmente agitado demais.",
        tips: [
          "Alguns lugares pedem silêncio interno. O 9/11 é um deles.",
          "Esse é um dos pontos mais emocionalmente fortes da viagem.",
        ],
        hack: "Entrar com calma muda totalmente a qualidade do bloco.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "16:00",
        title: "Charging Bull",
        description: "Parada clássica do downtown financeiro.",
        strategy:
          "Parada curta, objetiva e simbólica, sem deixar o bloco crescer além do que ele merece.",
        transport: "Caminhada",
        location: "Charging Bull — Bowling Green, New York, NY",
        photoSpot:
          "Foto clássica do touro, rápida e objetiva; não vale perder o ritmo do dia aqui.",
        practicalPlan:
          "Chegar, fotografar e seguir para a ponte, sem prolongar a permanência.",
        pitfalls:
          "Ficar preso mais tempo do que o bloco pede.",
        tips: [
          "Esse é um símbolo rápido e forte do downtown.",
          "Funciona melhor como parada curta do que como bloco longo.",
        ],
        hack: "",
        restaurant: "",
        lounge: "",
      },
      {
        time: "16:40",
        title: "Travessia da Brooklyn Bridge",
        description:
          "Travessia com foco em experiência, skyline e fotos.",
        strategy:
          "A travessia precisa ser vivida como experiência, não como deslocamento qualquer.",
        transport: "Caminhada",
        location: "Brooklyn Bridge — New York, NY",
        photoSpot:
          "Ponte, skyline e caminhada; esse é bloco de atmosfera e percurso, não só de chegada.",
        practicalPlan:
          "Entrar na ponte com energia boa, fazer a travessia com calma e guardar espaço mental para DUMBO depois.",
        pitfalls:
          "Entrar na ponte já cansado demais ou tratá-la como simples passagem entre pontos.",
        tips: [
          "Alguns blocos de NYC não são sobre chegar, e sim sobre o caminho.",
          "A ponte é um dos mais fortes exemplos disso no teu roteiro.",
        ],
        hack: "Brooklyn Bridge pede cabeça boa e perna viva.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "17:30",
        title: "DUMBO + Jane’s Carousel",
        description:
          "Bloco visual forte da tarde e um dos mais fotogênicos da fase NYC.",
        strategy:
          "Aqui a viagem precisa render imagem forte e atmosfera de verdade.",
        transport: "Caminhada",
        location: "DUMBO / Jane’s Carousel — Brooklyn, NY",
        photoSpot:
          "DUMBO clássico e Jane’s Carousel; ótimo bloco para foto forte, com mais pausa e mais intenção.",
        practicalPlan:
          "Chegar sem pressa, trabalhar bem as fotos e sentir o clima do Brooklyn antes do Time Out Market.",
        pitfalls:
          "Passar rápido demais só porque o dia já está grande.",
        tips: [
          "DUMBO rende muito mais quando tratado como atmosfera e não só como check-in visual.",
          "Esse é um dos blocos premium de foto da viagem inteira.",
        ],
        hack: "DUMBO não é lugar para pressa.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "18:30",
        title: "Time Out Market",
        description:
          "Pausa estratégica no Brooklyn para reorganizar a reta final do dia.",
        strategy:
          "Boa parada para respirar, olhar vista e recalibrar o corpo sem quebrar o clima do Brooklyn.",
        transport: "Caminhada",
        location: "Time Out Market — 55 Water St, Brooklyn, NY 11201",
        photoSpot:
          "Vista do Time Out Market; bom para pausa curta e clique natural, sem transformar em novo grande bloco.",
        practicalPlan:
          "Subir, fazer uma pausa curta, olhar a vista e decidir se o jantar fecha ali ou se fica para depois no retorno.",
        pitfalls:
          "Transformar a pausa em parada longa e deixar a noite perder força.",
        tips: [
          "O valor do Time Out aqui é tanto a vista quanto a função de reorganizar a energia.",
          "Boa micro pausa antes do último ato do dia.",
        ],
        hack: "Pausa boa vale ouro quando o dia já foi grande.",
        restaurant: "Time Out Market",
        lounge: "",
      },
      {
        time: "20:00",
        title: "Jantar",
        description:
          "Fechamento do dia antes do bloco final em Manhattan.",
        strategy:
          "Jantar para fechar o dia com conforto, mas sem matar o último ato.",
        transport: "Caminhada / metrô / Uber",
        location: "Região do retorno",
        photoSpot: "",
        practicalPlan:
          "Resolver o jantar onde fizer mais sentido logístico, sem criar deslocamento gastronômico burro nessa altura.",
        pitfalls:
          "Complicar a noite com deslocamento só por causa de restaurante.",
        tips: [
          "À noite em NYC, a melhor decisão muitas vezes é a que respeita a energia restante.",
          "Se o Time Out já ajudou, não precisa transformar o jantar em operação.",
        ],
        hack: "Hoje a logística do jantar importa tanto quanto o prato.",
        restaurant:
          "Baratos: Time Out Market / Juliana’s • Premium: opção melhor resolvida no retorno, sem desviar a lógica do dia",
        lounge: "",
      },
      {
        time: "21:30",
        title: "Times Square",
        description:
          "Fechamento icônico da primeira grande noite em NYC.",
        strategy:
          "Terminar em Times Square fecha o dia com energia grande e imagem clássica de Nova York.",
        transport: "Metrô / Uber / caminhada",
        location: "Times Square — New York, NY",
        photoSpot:
          "Times Square à noite; foto forte e rápida, porque o valor aqui está mais no impacto do lugar do que em permanência longa.",
        practicalPlan:
          "Chegar, sentir o ambiente, fazer fotos e curtir o impacto visual sem tentar dominar o caos por muito tempo.",
        pitfalls:
          "Esticar demais só porque o lugar está aceso, barulhento e chamativo.",
        tips: [
          "Times Square funciona melhor como explosão final do que como bloco longo.",
          "Esse é o clássico 'cheguei em Nova York'.",
        ],
        hack: "Times Square no fim do dia rende mais do que no meio dele.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "22:35",
        title: "Retorno ao hotel",
        description:
          "Fim do primeiro grande dia em NYC com volta limpa para a base.",
        strategy:
          "A volta precisa priorizar praticidade. À noite, depois de um dia grande, simplificar é ganhar.",
        transport: "Uber / transporte público conforme energia, fila e custo",
        location: "Times Square → hotel em North Bergen",
        photoSpot: "",
        practicalPlan:
          "Escolher o modal mais simples e seguro do momento, sem heroísmo desnecessário no fim de um dia tão grande.",
        pitfalls:
          "Inventar volta excessivamente econômica e sacrificar conforto demais.",
        tips: [
          "No fim do dia, tempo e simplicidade costumam valer mais do que economizar poucos dólares.",
          "Essa volta protege diretamente o aniversário da Amanda amanhã.",
        ],
        hack: "Hoje a praticidade da volta vale muito.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "23:05",
        title: "Preparação do dia seguinte",
        description:
          "Ajuste fino para o dia mais especial da viagem: aniversário da Amanda.",
        strategy:
          "Separar roupa, revisar reserva e preparar o clima certo do dia 26.",
        transport: "",
        location: "Hotel em North Bergen",
        photoSpot: "",
        practicalPlan:
          "Separar looks, revisar SUMMIT e deixar tudo carregando sem mexer em coisa demais até tarde.",
        pitfalls:
          "Dormir sem alinhar o essencial do aniversário ou ficar mexendo em foto e detalhe até tarde demais.",
        tips: [
          "Dia especial se constrói nos detalhes pequenos da noite anterior.",
          "Hoje o cuidado com amanhã vale mais do que qualquer outra coisa.",
        ],
        hack: "O dia 26 já começa aqui.",
        restaurant: "",
        lounge: "",
      },
    ],

        26: [
      {
        time: "07:40",
        title: "Acordar",
        description:
          "Início do dia mais especial da viagem: aniversário da Amanda.",
        strategy:
          "O dia 26 precisa parecer diferente. Tudo deve sair mais bonito, mais leve e mais especial.",
        transport: "",
        location: "",
        photoSpot: "",
        practicalPlan:
          "Levantar sem correria, já com a cabeça no clima do dia e sem transformar a manhã em operação fria.",
        pitfalls:
          "Tratar o dia como mais um dia comum de roteiro ou começar já com pressa demais.",
        tips: [
          "Alguns dias da viagem não pedem só eficiência; pedem atmosfera.",
          "Hoje a logística precisa servir a celebração, não competir com ela.",
        ],
        hack: "Hoje a viagem precisa parecer comemoração, não planilha ambulante.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "08:05",
        title: "Café da manhã no hotel",
        description:
          "Café funcional antes do início do eixo mais clássico de Manhattan.",
        strategy:
          "Começar bem alimentado, mas sem pesar. O dia vai ser longo, bonito e especial.",
        transport: "",
        location: "Hotel em North Bergen",
        photoSpot: "",
        practicalPlan:
          "Fazer um café simples, limpo e já sair com tudo do dia bem encaixado.",
        pitfalls:
          "Café corrido demais ou pesado demais logo cedo.",
        tips: [
          "Dia especial ainda precisa de base operacional boa.",
          "Começar leve ajuda o dia inteiro a ficar bonito.",
        ],
        hack: "",
        restaurant: "Café do hotel",
        lounge: "",
      },
      {
        time: "08:35",
        title: "Saída do hotel",
        description: "Deslocamento para Midtown Manhattan.",
        strategy:
          "Hoje, mais do que nunca, a prioridade é simplicidade. O modal certo é o que entrega o começo bonito do dia sem estresse.",
        transport: "Uber / ônibus + trem conforme trânsito, custo e simplicidade",
        location: "Hotel em North Bergen → Grand Central Terminal",
        photoSpot: "",
        practicalPlan:
          "Escolher o caminho mais simples e estável do momento, priorizando tempo e paz mental.",
        pitfalls:
          "Começar o aniversário tentando economizar de um jeito que irrite ou complique a manhã.",
        tips: [
          "Em dia especial, a logística precisa servir o clima.",
          "Hoje simplicidade vale ouro.",
        ],
        hack: "O melhor deslocamento hoje é o que some e deixa o dia brilhar.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "09:00",
        title: "Grand Central Terminal",
        description: "Abertura do aniversário no coração clássico de Manhattan.",
        strategy:
          "Começar aqui coloca o dia em nível alto logo de saída: beleza, história, cinema e atmosfera.",
        transport: "Uber / metrô / caminhada",
        location: "Grand Central Terminal — 89 E 42nd St, New York, NY 10017",
        photoSpot:
          "Hall principal da Grand Central; esse é bloco forte para foto elegante, com mais pausa e enquadramento limpo.",
        practicalPlan:
          "Entrar com calma, olhar o hall principal como experiência e não como simples passagem.",
        pitfalls:
          "Passar corrido por um dos lugares mais bonitos do dia.",
        tips: [
          "Grand Central faz a cidade parecer cinema ao vivo.",
          "Esse começo dá ao dia um peso bonito sem esforço.",
        ],
        hack: "Abrir o aniversário na Grand Central já coloca o dia num patamar alto.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "09:45",
        title: "St. Patrick’s Cathedral",
        description: "Bloco clássico e simbólico da manhã.",
        strategy:
          "Parada elegante e forte, sem correria e sem transformar a igreja só em fachada para foto.",
        transport: "Caminhada",
        location: "St. Patrick’s Cathedral — 5th Ave, New York, NY 10022",
        photoSpot:
          "Exterior e interior da catedral; bom bloco para foto mais respeitosa, bonita e menos acelerada.",
        practicalPlan:
          "Entrar com respeito, viver o contraste entre fé, pedra e a força urbana da Fifth Avenue, e seguir sem esticar demais.",
        pitfalls:
          "Tratar o lugar só como fachada visual do roteiro.",
        tips: [
          "No eixo da Fifth, a catedral funciona como pausa de alma no meio da cidade grande.",
          "Bloco muito coerente com o tom especial do dia.",
        ],
        hack: "É uma pausa de alma no meio do brilho urbano.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "10:20",
        title: "Apple Fifth Avenue",
        description: "Primeiro bloco comercial icônico do aniversário.",
        strategy:
          "Tratar a Apple como experiência, não só compra.",
        transport: "Caminhada",
        location: "Apple Fifth Avenue — 767 5th Ave, New York, NY 10153",
        photoSpot:
          "Cubo da Apple; ótimo ponto para foto icônica e rápida, sem alongar demais.",
        practicalPlan:
          "Chegar, ver o cubo, entrar, resolver o que fizer sentido e sair sem deixar a loja sequestrar a manhã.",
        pitfalls:
          "Transformar o bloco em permanência longa demais.",
        tips: [
          "A Apple Fifth vale quase tanto pela experiência do lugar quanto pela compra.",
          "É uma das lojas-ícone da viagem.",
        ],
        hack: "Hoje Apple é experiência primeiro, compra depois.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "11:00",
        title: "Louis Vuitton Fifth Avenue",
        description: "Bloco premium do dia mais especial da viagem.",
        strategy:
          "Aqui entra o lado especial e memorável do aniversário. O valor está no momento, não só na compra.",
        transport: "Caminhada",
        location: "Louis Vuitton Fifth Avenue — New York, NY",
        photoSpot:
          "Fachada e experiência premium; foto mais elegante e com calma, sem parecer correria de roteiro.",
        practicalPlan:
          "Entrar com calma, viver o ambiente e tratar o bloco como momento especial de alto nível.",
        pitfalls:
          "Deixar o bloco virar pressa, tensão ou peso desnecessário.",
        tips: [
          "No dia 26, o que importa não é só o item em si, é o simbolismo do momento.",
          "Esse é um bloco de atmosfera e memória.",
        ],
        hack: "Hoje o luxo certo é o que tem significado.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "11:40",
        title: "M&M’s Store",
        description:
          "Bloco leve e divertido entre trechos mais sofisticados do dia.",
        strategy:
          "Quebrar o ritmo premium com energia leve e divertida, sem bagunçar a elegância do dia.",
        transport: "Caminhada",
        location: "M&M’s Store — Times Square / Midtown Manhattan",
        photoSpot:
          "Ambiente colorido e leve; bom para foto divertida e rápida, sem permanecer demais.",
        practicalPlan:
          "Passar, curtir, fotografar e seguir, sem deixar o bloco crescer além do que ele merece.",
        pitfalls:
          "Ficar tempo demais e perder o ritmo bonito do restante do dia.",
        tips: [
          "Dias especiais também precisam de leveza, não só solenidade.",
          "Esse respiro deixa o aniversário mais humano e divertido.",
        ],
        hack: "",
        restaurant: "",
        lounge: "",
      },
      {
        time: "13:00",
        title: "Almoço no Katz’s Delicatessen",
        description: "Almoço clássico e obrigatório de Nova York.",
        strategy:
          "Almoço forte, icônico e memorável. Esse é daqueles lugares que ajudam a contar a viagem depois.",
        transport: "Uber / metrô",
        location: "Katz’s Delicatessen — 205 E Houston St, New York, NY 10002",
        photoSpot: "",
        practicalPlan:
          "Chegar já com pedido mais ou menos em mente para não perder tempo demais em fila e decisão.",
        pitfalls:
          "Entrar indeciso, perder tempo demais e deixar o meio da tarde apertado.",
        tips: [
          "Katz’s é mais do que refeição; é narrativa de cidade.",
          "No aniversário, esse almoço entrega Nova York raiz com personalidade.",
        ],
        hack: "Entrar sabendo o que quer poupa fila e energia.",
        restaurant: "Katz’s Delicatessen",
        lounge: "",
      },
      {
        time: "16:15",
        title: "Tudor City",
        description: "Bloco elegante de transição para o SUMMIT.",
        strategy:
          "Esse trecho entra como aquecimento visual do fim de tarde e como bloco bonito de fotografia.",
        transport: "Caminhada / Uber curto",
        location: "Tudor City — Manhattan, New York, NY",
        photoSpot:
          "Tudor City com clima romântico e urbano; ótimo para foto mais refinada e menos óbvia.",
        practicalPlan:
          "Chegar com calma, usar o bloco como pausa estética e não cortar esse momento para entrar acelerado no SUMMIT.",
        pitfalls:
          "Pular esse bloco e chegar no SUMMIT em ritmo muito seco.",
        tips: [
          "O valor de Tudor City está justamente no clima que ele cria antes do SUMMIT.",
          "Boa pausa estética antes do grande clímax visual do dia.",
        ],
        hack: "Esse pequeno bloco deixa o resto do fim de tarde ainda mais bonito.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "17:00",
        title: "SUMMIT One Vanderbilt",
        description:
          "Experiência principal do fim de tarde e clímax visual do aniversário.",
        strategy:
          "Esse é um dos grandes momentos do dia 26. Precisa ser vivido com tempo e presença.",
        transport: "Caminhada",
        location: "SUMMIT One Vanderbilt — 45 E 42nd St, New York, NY 10017",
        photoSpot:
          "SUMMIT; bloco fortíssimo para imagem, reflexo, skyline e memória.",
        practicalPlan:
          "Entrar sem correria mental, absorver a experiência e não tratar o observatório como simples mirante.",
        pitfalls:
          "Chegar acelerado demais ou reduzir o bloco a foto e pressa.",
        tips: [
          "No contexto do aniversário, o SUMMIT funciona quase como coroação do dia.",
          "Esse é um dos pontos altos emocionais e visuais da viagem.",
        ],
        hack: "Entrar com presença muda tudo aqui.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "19:30",
        title: "Jantar no Peak",
        description: "Fechamento premium do aniversário da Amanda.",
        strategy:
          "Esse jantar é o fechamento nobre do dia mais especial da viagem.",
        transport: "Uber / caminhada",
        location: "Peak NYC — Hudson Yards, New York, NY",
        photoSpot: "",
        practicalPlan:
          "Chegar com calma, sem parecer correria de reserva, e deixar o jantar respirar como capítulo final do aniversário.",
        pitfalls:
          "Chegar acelerado, cansado demais ou transformar a mesa em bloco burocrático.",
        tips: [
          "No aniversário, jantar bom é o que parece capítulo final, não obrigação de agenda.",
          "Aqui o roteiro precisa parecer celebração, não logística.",
        ],
        hack: "Hoje o jantar fecha o dia como cena final, não como obrigação.",
        restaurant: "Peak NYC",
        lounge: "",
      },
      {
        time: "21:30",
        title: "Hudson Yards + Vessel iluminado",
        description: "Último bloco visual do aniversário.",
        strategy:
          "Fechar com luzes, arquitetura e clima memorável, sem tentar inventar mais nada depois disso.",
        transport: "Caminhada",
        location: "Hudson Yards / Vessel — New York, NY",
        photoSpot:
          "Vessel iluminado; bloco perfeito para foto final elegante do aniversário.",
        practicalPlan:
          "Caminhar com calma, aproveitar o cenário e deixar esse bloco funcionar como o ponto final bonito do dia.",
        pitfalls:
          "Querer encaixar mais alguma coisa depois daqui.",
        tips: [
          "Alguns dias têm que acabar no alto; esse é um deles.",
          "Esse é o ponto final perfeito do dia 26.",
        ],
        hack: "Quando o dia já foi grande, o melhor fechamento é visual e simples.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "22:25",
        title: "Retorno ao hotel",
        description:
          "Fim do aniversário com volta limpa para a base.",
        strategy:
          "A volta precisa ser simples. O dia já entregou tudo o que tinha que entregar.",
        transport: "Uber / transporte simples conforme energia e custo",
        location: "Hudson Yards → hotel em North Bergen",
        photoSpot: "",
        practicalPlan:
          "Escolher o modal mais fácil do momento e encerrar o dia sem heroísmo nem invenção.",
        pitfalls:
          "Inventar nova parada depois de um dia já perfeito.",
        tips: [
          "Às vezes a melhor decisão é simplesmente não mexer mais no dia.",
          "O grande luxo agora é voltar em paz.",
        ],
        hack: "Quando o dia já foi ótimo, o melhor é não estragar o final.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "22:55",
        title: "Preparação do dia seguinte",
        description:
          "Ajuste fino para o último dia completo em NYC.",
        strategy:
          "Separar o básico e dormir. O dia 27 ainda tem muito valor, mas não pode competir com o 26.",
        transport: "",
        location: "Hotel em North Bergen",
        photoSpot: "",
        practicalPlan:
          "Separar roupa e revisar o eixo Central Park / Intrepid antes de apagar.",
        pitfalls:
          "Mexer em coisas demais até tarde e sacrificar o descanso depois de um dia já tão alto emocionalmente.",
        tips: [
          "Depois de um dia assim, descanso vira parte da qualidade do roteiro.",
          "Hoje o ideal é só o básico e cama.",
        ],
        hack: "",
        restaurant: "",
        lounge: "",
      },
    ],

    27: [
      {
        time: "07:20",
        title: "Acordar",
        description:
          "Início do último dia completo em NYC, com clima bonito, forte e já preparando a madrugada do voo.",
        strategy:
          "Hoje o dia precisa render bastante, mas sem destruir a noite. É dia de despedida bonita e inteligência.",
        transport: "",
        location: "",
        photoSpot: "",
        practicalPlan:
          "Levantar com mochila leve, roupa confortável e o eixo do dia claro: Central Park, lado oeste, Intrepid e pôr do sol no Hudson.",
        pitfalls:
          "Começar lento e sacrificar o fechamento bonito do dia ou o retorno cedo.",
        tips: [
          "Último dia completo costuma ficar melhor quando não tenta competir com o melhor dia anterior.",
          "Hoje o segredo é fluidez, não pressa.",
        ],
        hack: "Despedida boa de cidade grande precisa de ritmo, não correria.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "07:45",
        title: "Café da manhã no hotel",
        description: "Café funcional antes da saída para Manhattan.",
        strategy:
          "Comer cedo e sair. O dia tem bastante deslocamento a pé e precisa começar organizado.",
        transport: "",
        location: "Hotel em North Bergen",
        photoSpot: "",
        practicalPlan:
          "Fazer um café objetivo e sair sem alongar a manhã no hotel.",
        pitfalls:
          "Enrolar cedo e apertar o Central Park sem necessidade.",
        tips: [
          "Em dia final de cidade, disciplina cedo compra leveza depois.",
          "Nada de inventar café charmoso fora logo cedo hoje.",
        ],
        hack: "",
        restaurant: "Café do hotel",
        lounge: "",
      },
      {
        time: "08:10",
        title: "Saída do hotel",
        description:
          "Deslocamento para Manhattan e início do bloco do Central Park.",
        strategy:
          "A lógica é entrar em Manhattan já pelo lado certo do parque, evitando cruzar a cidade à toa.",
        transport: "Uber / ônibus + trem conforme custo, trânsito e simplicidade",
        location: "Hotel em North Bergen → Central Park / eixo sul",
        photoSpot: "",
        practicalPlan:
          "Escolher o modal mais simples do momento, priorizando entrar em Manhattan já bem posicionado para o parque.",
        pitfalls:
          "Começar o dia com rota torta e desperdício de perna.",
        tips: [
          "Em NYC, geografia certa logo cedo vale quase tanto quanto a própria atração.",
          "Hoje entrar pelo lado certo do parque poupa muito tempo.",
        ],
        hack: "Geografia boa em NYC é meio roteiro pronto.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "09:00",
        title: "Central Park",
        description:
          "Entrada no parque mais clássico de Nova York, com caminhada bonita e ritmo agradável.",
        strategy:
          "O Central Park volta porque é obrigatório para fechar NYC do jeito certo. Ele é atmosfera, respiro e cartão-postal.",
        transport: "Caminhada",
        location: "Central Park — New York, NY",
        photoSpot:
          "Eixos clássicos do parque, skyline e caminhos arborizados; bom bloco para foto natural, elegante e sem pressa.",
        practicalPlan:
          "Entrar sem correria, fazer um recorte inteligente do parque e evitar abraçar o Central Park inteiro.",
        pitfalls:
          "Querer ver o parque inteiro e destruir o restante do dia.",
        tips: [
          "Central Park não se vence por abrangência, e sim por recorte inteligente.",
          "Esse é o bloco verde e cinematográfico da despedida de NYC.",
        ],
        hack: "No Central Park, escolher bem o trecho vale mais do que andar demais.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "10:10",
        title: "Belvedere Castle",
        description:
          "Parada clássica do parque com visual forte e clima de despedida elegante.",
        strategy:
          "O castelo entra porque entrega exatamente o tom que faltava: beleza clássica, foto boa e clima memorável.",
        transport: "Caminhada",
        location: "Belvedere Castle — Central Park, New York, NY",
        photoSpot:
          "Belvedere Castle e entorno; ótimo para Amanda e Rafa, com foto mais forte e mais calma.",
        practicalPlan:
          "Chegar com calma, fotografar e seguir sem transformar o parque inteiro em maratona até aqui.",
        pitfalls:
          "Chegar cansado demais ou deixar o bloco perder força por excesso de caminhada inútil.",
        tips: [
          "Belvedere é daqueles pontos que fazem o Central Park parecer ainda mais filme.",
          "Esse é um dos pontos de assinatura do dia 27.",
        ],
        hack: "Esse castelo dá ao dia 27 a assinatura visual que faltava.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "11:20",
        title: "Hudson Yards e High Line",
        description:
          "Passeio urbano clássico de Nova York no eixo oeste de Manhattan.",
        strategy:
          "Começar pelo lado oeste depois do parque mantém o dia bem amarrado e faz a cidade fluir visualmente.",
        transport: "Uber / caminhada",
        location: "Hudson Yards → High Line — New York, NY",
        photoSpot:
          "Trechos icônicos da High Line; fotos boas entram caminhando, com clima urbano e sem pressa.",
        practicalPlan:
          "Chegar em Hudson Yards e descer pela High Line em ritmo gostoso, tratando o percurso como experiência, não só conexão.",
        pitfalls:
          "Transformar o trecho em corrida ou ignorar o valor do percurso em si.",
        tips: [
          "A High Line funciona melhor como experiência de percurso do que como 'ponto'.",
          "Esse bloco entrega o contraste perfeito com a manhã verde do parque.",
        ],
        hack: "Na High Line, o caminho é metade da graça.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "12:30",
        title: "Almoço",
        description: "Pausa controlada antes do museu.",
        strategy:
          "Almoço simples e coerente com a tarde que ainda vem. Nada de refeição longa no último dia completo.",
        transport: "Caminhada",
        location: "Chelsea Market / região",
        photoSpot: "",
        practicalPlan:
          "Comer rápido, sem deixar o Chelsea Market engolir tempo demais, e sair com energia para o Intrepid.",
        pitfalls:
          "Perder tempo demais no food hall e apertar o museu depois.",
        tips: [
          "Chelsea Market engole tempo fácil se a pessoa entra sem foco.",
          "Hoje o almoço precisa ajudar o Intrepid, não competir com ele.",
        ],
        hack: "",
        restaurant:
          "Baratos: Friedman’s / Very Fresh Noodles • Premium: opção melhor resolvida dentro do Chelsea Market ou arredores",
        lounge: "",
      },
      {
        time: "14:30",
        title: "Intrepid Museum",
        description:
          "Bloco principal da tarde e um dos mais alinhados ao perfil da viagem.",
        strategy:
          "Museu muito importante do roteiro. Aqui o foco é viver a experiência com atenção.",
        transport: "Uber / caminhada",
        location: "Intrepid Museum — Pier 86, W 46th St, New York, NY 10036",
        photoSpot:
          "Deck do Intrepid e ângulos externos; bloco forte para clima técnico e visual.",
        practicalPlan:
          "Chegar bem no horário, entrar com energia boa e priorizar o que realmente mais conversa com vocês.",
        pitfalls:
          "Chegar quebrado demais ou correr no museu como se ele fosse só mais um item do dia.",
        tips: [
          "O Intrepid funciona melhor quando é tratado como parte nobre do dia.",
          "Esse é um dos grandes blocos técnicos da fase NYC.",
        ],
        hack: "Entrar no Intrepid com cabeça boa faz muita diferença.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "15:30",
        title: "Concorde Tour",
        description: "Experiência especial dentro do Intrepid.",
        strategy:
          "Esse bloco é diferenciado e precisa ser tratado como ponto alto técnico da visita.",
        transport: "Caminhada",
        location: "Intrepid Museum — Concorde Tour",
        photoSpot:
          "Concorde; bloco mais de experiência técnica e memória do que de foto exagerada.",
        practicalPlan:
          "Chegar no horário, entrar no clima do tour e não perder o fluxo da experiência reservada.",
        pitfalls:
          "Chegar em cima e perder o encaixe do tour.",
        tips: [
          "Experiências especiais como essa são as que mais ficam na memória depois.",
          "Esse é um dos itens mais únicos da fase NYC.",
        ],
        hack: "Chegar no horário aqui é obrigatório, não recomendação.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "18:20",
        title: "Pôr do sol no eixo do Hudson",
        description:
          "Fechamento visual do último dia completo em NYC.",
        strategy:
          "O dia 27 precisa terminar bonito. O pôr do sol no eixo oeste é a leitura mais elegante para fechar sem forçar a barra.",
        transport: "Caminhada / Uber curto",
        location: "Hudson River Park / pier da região oeste",
        photoSpot:
          "Pôr do sol no eixo do Hudson; esse é o grande bloco de despedida visual do dia.",
        practicalPlan:
          "Sair do Intrepid e encaixar um ponto bonito no Hudson antes do retorno, sem complicar a geografia.",
        pitfalls:
          "Inventar deslocamento difícil demais nessa hora ou tentar encaixar mais um grande ponto.",
        tips: [
          "No dia 27, o pôr do sol vale mais como sensação de despedida do que como atração isolada.",
          "Esse é o jeito certo de fechar NYC sem repetir coisas nem cansar demais.",
        ],
        hack: "Fechar o dia olhando o Hudson dá ao 27 a despedida que ele merece.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "19:10",
        title: "Jantar leve de encerramento",
        description:
          "Último jantar completo em NYC antes da madrugada do voo.",
        strategy:
          "Hoje o jantar precisa ser bom, mas não pode roubar o sono nem complicar a volta.",
        transport: "Uber / caminhada",
        location: "Região do retorno",
        photoSpot: "",
        practicalPlan:
          "Comer onde a logística ajudar mais, sem criar jantar longo ou desvio bobo.",
        pitfalls:
          "Jantar longo demais e retorno tarde demais num dia que ainda tem madrugada crítica.",
        tips: [
          "Última noite boa não precisa ser a mais cara; precisa ser a mais coerente.",
          "Hoje elegância é terminar cedo o suficiente para a madrugada não doer.",
        ],
        hack: "",
        restaurant:
          "Baratos: Friedman’s / Shake Shack bem encaixado • Premium: jantar melhor resolvido, mas sem sacrificar o retorno cedo",
        lounge: "",
      },
      {
        time: "20:30",
        title: "Retorno cedo ao hotel",
        description:
          "Fim inteligente do último dia completo em NYC.",
        strategy:
          "Esse retorno cedo não é fraqueza. É preparação para a madrugada e para o voo das 06:00 do dia seguinte.",
        transport: "Uber",
        location: "Manhattan → hotel em North Bergen",
        photoSpot: "",
        practicalPlan:
          "Sair de Manhattan sem tentar arrancar mais um bloco e ir direto fechar malas.",
        pitfalls:
          "Inventar última rodada de passeio e sabotar o dia 28.",
        tips: [
          "O melhor luxo da última noite é não criar problema para a próxima manhã.",
          "Fechar malas cedo compra paz real.",
        ],
        hack: "Volta cedo hoje é decisão premium.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "21:00",
        title: "Preparação do dia seguinte",
        description:
          "Fechamento total de malas e preparação para o voo muito cedo.",
        strategy:
          "O dia 28 começa na madrugada. Dormir cedo aqui é obrigatório.",
        transport: "",
        location: "Hotel em North Bergen",
        photoSpot: "",
        practicalPlan:
          "Fechar malas, revisar documentos e deixar tudo alinhado para sair sem pensar às 03:20.",
        pitfalls:
          "Deixar qualquer coisa para a madrugada.",
        tips: [
          "A boa saída de NYC começa na noite anterior, não no despertador.",
          "Nada de heroísmo em última noite.",
        ],
        hack: "Hoje a arrumação vale mais do que qualquer bloco extra.",
        restaurant: "",
        lounge: "",
      },
    ],

        28: [
      {
        time: "03:20",
        title: "Acordar",
        description: "Início da madrugada de retorno a Miami.",
        strategy:
          "Esse dia exige precisão absoluta. Voo 06:00 significa madrugada limpa, sem erro e sem distração.",
        transport: "",
        location: "",
        photoSpot: "",
        practicalPlan:
          "Levantar, vestir e sair com tudo já pronto desde a noite anterior.",
        pitfalls:
          "Tentar fechar qualquer coisa nessa hora ou começar a madrugada no improviso.",
        tips: [
          "Madrugada boa é a que parece mecânica, não dramática.",
          "Tudo precisa estar 100% pronto desde a noite anterior.",
        ],
        hack: "Hoje a tranquilidade vem da disciplina de ontem.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "03:40",
        title: "Saída do hotel",
        description: "Deslocamento rumo ao aeroporto.",
        strategy:
          "Sair cedo protege o voo e elimina estresse desnecessário.",
        transport: "Uber",
        location: "North Bergen → LaGuardia Airport (LGA)",
        photoSpot: "",
        practicalPlan:
          "Pedir o carro e sair sem revisão inútil de mala nem hesitação de última hora.",
        pitfalls:
          "Negociar com o relógio nessa manhã.",
        tips: [
          "Em madrugada de voo, o principal luxo é não depender de sorte.",
          "Esse é bloco de precisão, não de esperança.",
        ],
        hack: "",
        restaurant: "",
        lounge: "",
      },
      {
        time: "04:35",
        title: "Segurança e possível sala VIP",
        description:
          "Passagem pela segurança e uso funcional de lounge antes do embarque.",
        strategy:
          "Resolver segurança cedo e, se a janela permitir, usar lounge só como apoio rápido.",
        transport: "A pé / aeroporto",
        location: "LaGuardia Airport (LGA)",
        photoSpot: "",
        practicalPlan:
          "Passar pela segurança, confirmar portão e usar sala VIP apenas se a janela real justificar.",
        pitfalls:
          "Distanciar demais do portão ou tratar lounge como passeio em conexão curta.",
        tips: [
          "Sala VIP em madrugada curta vale mais pela paz do que pelo serviço.",
          "Hoje o conforto bom é o que não cria risco.",
        ],
        hack: "Lounge bom aqui é o que te acalma, não o que te distrai.",
        restaurant: "",
        lounge:
          "Sala parceira via Visa Airport Companion ou Mastercard Airport Experiences, conforme terminal e disponibilidade",
      },
      {
        time: "06:00",
        title: "Voo LGA → IAD",
        description: "Primeiro trecho da volta para a Flórida.",
        strategy:
          "Trecho curto e funcional. O foco é executar bem a conexão seguinte.",
        transport: "United UA 6128",
        location: "New York (LGA) → Washington (IAD)",
        photoSpot: "",
        practicalPlan:
          "Usar o voo como ponte operacional e manter a cabeça já na conexão para Miami.",
        pitfalls:
          "Relaxar demais e perder o senso da sequência do dia.",
        tips: [
          "Conexões ficam fáceis quando a cabeça já saiu da cidade anterior.",
          "Hoje ainda existe locadora, hotel e fase final em Miami.",
        ],
        hack: "",
        restaurant: "",
        lounge: "",
      },
      {
        time: "07:40",
        title: "Conexão em IAD",
        description: "Bloco técnico entre os voos da manhã.",
        strategy:
          "Conexão limpa, objetiva e sem dispersão. Se houver tempo, lounge curto; se não, portão.",
        transport: "A pé / aeroporto",
        location: "Washington Dulles International Airport (IAD)",
        photoSpot: "",
        practicalPlan:
          "Checar portão, resolver água e banheiro e só então avaliar sala VIP.",
        pitfalls:
          "Ir longe demais no aeroporto ou transformar a conexão em passeio desnecessário.",
        tips: [
          "Na conexão curta, eficiência vence conforto ambicioso.",
          "Se a janela for pequena, lounge vira distração; se for boa, vira alívio.",
        ],
        hack: "",
        restaurant: "",
        lounge:
          "Sala parceira via Visa Airport Companion ou Mastercard Airport Experiences, se terminal e janela permitirem",
      },
      {
        time: "08:35",
        title: "Voo IAD → MIA",
        description: "Segundo trecho até Miami.",
        strategy:
          "Chegar em Miami e virar rapidamente a operação para carro + hotel + grupo.",
        transport: "United UA 1073",
        location: "Washington (IAD) → Miami (MIA)",
        photoSpot: "",
        practicalPlan:
          "Pousar já pensando em locadora, hotel e reentrada leve na última fase da viagem.",
        pitfalls:
          "Pousar ainda mentalmente em Nova York e demorar para virar a chave de Miami.",
        tips: [
          "A reentrada em Miami funciona melhor quando tratada como nova fase, não como sobra da viagem.",
          "Hoje a logística ainda importa bastante.",
        ],
        hack: "Ao pousar, a cabeça já precisa estar na operação Miami.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "12:20",
        title: "Retirada do Mustang conversível",
        description: "Início da última fase terrestre da viagem.",
        strategy:
          "Retirar o carro de forma limpa, rápida e já sair com tudo pronto.",
        transport: "Locadora / carro",
        location: "Alamo — Miami International Airport (MIA)",
        photoSpot:
          "Fotos do Mustang logo após a vistoria, com o carro limpo e sem bagagem espalhada; bloco ótimo para clique visual forte da reta final da viagem.",
        practicalPlan:
          "Fazer fotos do carro, painel e estado geral, configurar CarPlay e rota antes de sair.",
        pitfalls:
          "Sair sem revisar o estado do carro ou sem organizar a navegação.",
        tips: [
          "Última locação pede a mesma disciplina da primeira; glamour não substitui atenção.",
          "Fotos do carro e painel continuam obrigatórias.",
        ],
        hack: "Mustang bonito não dispensa vistoria boa.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "13:15",
        title: "Retorno ao Casa Boutique Hotel",
        description:
          "Volta à base de Miami e reorganização da fase final.",
        strategy:
          "Chegar, resolver rápido e seguir a lógica do grupo.",
        transport: "Mustang conversível",
        location:
          "Casa Boutique Hotel — 1334 Washington Ave, Miami Beach, FL 33139",
        photoSpot: "",
        practicalPlan:
          "Deixar malas, alinhar a base e não transformar o hotel em arrasto depois da manhã aérea.",
        pitfalls:
          "Chegar e deixar o hotel engolir a tarde.",
        tips: [
          "Voltar ao mesmo hotel ajuda a fechar a viagem com sensação de ciclo completo.",
          "Resolver a base cedo deixa o resto da tarde muito mais leve.",
        ],
        hack: "",
        restaurant: "",
        lounge: "",
      },
      {
        time: "14:00",
        title: "Buscar Rafa e Matheus / recompor o grupo",
        description:
          "Recompor a operação completa para a fase final da viagem em Miami.",
        strategy:
          "A viagem toda é pensada para 4. Esse bloco recompõe a formação completa para o último capítulo.",
        transport: "Mustang conversível",
        location: "Miami Beach / região do grupo",
        photoSpot: "",
        practicalPlan:
          "Resolver isso cedo e seguir com a tarde já limpa, sem deixar esse acerto para depois.",
        pitfalls:
          "Empurrar a recomposição do grupo para mais tarde e bagunçar o resto da tarde.",
        tips: [
          "Na reta final, reorganizar o grupo cedo evita ruído desnecessário.",
          "Esse é bloco simples, mas importante para o fechamento da viagem.",
        ],
        hack: "Resolver cedo evita bagunça depois.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "16:00",
        title: "Tarde leve em Miami",
        description:
          "Bloco mais solto e agradável depois da madrugada e da sequência de voos.",
        strategy:
          "Não transformar esse dia em maratona. Ele precisa ser gostoso, funcional e visualmente bonito.",
        transport: "Mustang conversível",
        location: "Miami / Miami Beach",
        photoSpot:
          "Mustang + Miami / Miami Beach; ótimo bloco para fotos da reta final da viagem com clima mais leve e descontraído.",
        practicalPlan:
          "Fazer um passeio curto, visual e sem missão pesada, aproveitando o Mustang e o clima de Miami sem destruir a noite.",
        pitfalls:
          "Tentar fazer grande operação nessa tarde e estragar a leveza que o dia pede.",
        tips: [
          "Às vezes o fim ideal da viagem é justamente o bloco mais leve.",
          "Hoje curtir bem vale mais do que encaixar muito.",
        ],
        hack: "Boa leitura para aproveitar o Mustang sem exagero.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "20:00",
        title: "Jantar final em Miami",
        description: "Fechamento gostoso da última noite nos EUA.",
        strategy:
          "Noite de curtir, mas sem dormir tarde, porque o retorno do dia 29 começa cedo.",
        transport: "Carro / caminhada",
        location: "Miami Beach",
        photoSpot: "",
        practicalPlan:
          "Escolher um jantar gostoso, coerente com o cansaço do dia e sem complicar a madrugada seguinte.",
        pitfalls:
          "Transformar a última noite em exagero ou balada logística.",
        tips: [
          "Última noite boa não precisa ser grandiosa; precisa parecer certa.",
          "Hoje o objetivo é fechar bem, não extrair mais um monte de coisa do dia.",
        ],
        hack: "Última noite boa é a que termina no ponto certo.",
        restaurant:
          "Baratos: La Sandwicherie / Havana 1957 • Premium: Prime 112",
        lounge: "",
      },
      {
        time: "21:45",
        title: "Retorno ao hotel",
        description:
          "Fim da última noite em Miami com volta organizada para a base.",
        strategy:
          "Volta limpa, sem esticar e já pensando no retorno ao Brasil.",
        transport: "Carro / caminhada",
        location: "Miami Beach → Casa Boutique Hotel",
        photoSpot: "",
        practicalPlan:
          "Retornar direto, sem rodada extra, e entrar imediatamente no modo fechamento da viagem.",
        pitfalls:
          "Inventar mais um bloco quando a madrugada do retorno já está logo ali.",
        tips: [
          "A última noite boa quase sempre é a que termina no ponto certo.",
          "Hoje o melhor luxo é encerrar cedo.",
        ],
        hack: "",
        restaurant: "",
        lounge: "",
      },
      {
        time: "22:05",
        title: "Preparação do dia seguinte",
        description:
          "Fechamento total da viagem para o retorno ao Brasil.",
        strategy:
          "Tudo precisa dormir pronto: malas, documentos, rota para FLL e saída cedo.",
        transport: "",
        location: "Casa Boutique Hotel",
        photoSpot: "",
        practicalPlan:
          "Fechar malas, revisar passaportes, cartões e deixar a rota para Fort Lauderdale já alinhada.",
        pitfalls:
          "Deixar qualquer coisa para a madrugada do dia 29.",
        tips: [
          "A melhor volta é a que começa organizada na noite anterior.",
          "Hoje passaporte, cartões e malas precisam estar 100% prontos.",
        ],
        hack: "Quem fecha tudo hoje volta muito melhor amanhã.",
        restaurant: "",
        lounge: "",
      },
    ],

    29: [
      {
        time: "04:45",
        title: "Acordar",
        description: "Início da volta definitiva para o Brasil.",
        strategy:
          "Última manhã precisa ser limpa e sem erro. O dia de volta não permite moleza.",
        transport: "",
        location: "",
        photoSpot: "",
        practicalPlan:
          "Levantar e sair com tudo pronto, sem reabrir mala nem negociar com o relógio.",
        pitfalls:
          "Reabrir mala, discutir logística ou descobrir documento fora de lugar nessa hora.",
        tips: [
          "Último dia de viagem costuma punir muito quem relaxa cedo demais.",
          "Tudo fechado e revisado na noite anterior é o segredo desse bloco.",
        ],
        hack: "Volta boa começa com disciplina até o último dia.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "05:15",
        title: "Saída do hotel",
        description: "Partida rumo a Fort Lauderdale.",
        strategy:
          "Saída cedo para devolver o carro e embarcar sem estresse.",
        transport: "Mustang conversível",
        location: "Casa Boutique Hotel → Fort Lauderdale (FLL)",
        photoSpot: "",
        practicalPlan:
          "Sair cedo, seguir rota limpa e não tratar esse último deslocamento terrestre como simples demais.",
        pitfalls:
          "Sair no limite e contaminar a devolução do carro e o embarque internacional.",
        tips: [
          "Na volta, tudo parece perto até o relógio apertar.",
          "Último deslocamento terrestre precisa ser limpo.",
        ],
        hack: "",
        restaurant: "",
        lounge: "",
      },
      {
        time: "06:00",
        title: "Devolução do Mustang",
        description: "Encerramento da última locação da viagem.",
        strategy:
          "Devolução limpa e rápida. Esse bloco não pode consumir energia demais na reta final.",
        transport: "Carro / locadora",
        location: "Alamo — Fort Lauderdale Airport (FLL)",
        photoSpot: "",
        practicalPlan:
          "Chegar, tirar malas, conferir o carro e encerrar a entrega de forma objetiva.",
        pitfalls:
          "Esquecer item no carro ou tratar a devolução como detalhe irrelevante por já estar cansado.",
        tips: [
          "Última devolução costuma ser a mais relaxada — e exatamente por isso precisa de atenção.",
          "Últimas fotos e conferência rápida ainda valem muito.",
        ],
        hack: "Última checagem no carro evita fim de viagem idiota.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "06:40",
        title: "Check-in, segurança e bloco aeroporto",
        description: "Entrada na fase final aérea da viagem.",
        strategy:
          "Resolver rápido e, se der, usar algum conforto de lounge ou área melhor antes do embarque.",
        transport: "A pé / aeroporto",
        location: "Fort Lauderdale-Hollywood International Airport (FLL)",
        photoSpot: "",
        practicalPlan:
          "Check-in, segurança e lounge só se a janela fizer sentido real, sem bagunçar documentos nessa reta final.",
        pitfalls:
          "Ficar desorganizando documento e cartão no pior momento do dia.",
        tips: [
          "Na volta, sala VIP vale muito mais pela paz do que pelo luxo.",
          "Documentos e cartões precisam ficar à mão até o fim.",
        ],
        hack: "Na volta, organização vale mais que disposição.",
        restaurant: "",
        lounge:
          "Sala VIP compatível via Visa Airport Companion ou Mastercard Airport Experiences, conforme terminal e disponibilidade",
      },
      {
        time: "08:20",
        title: "Voo FLL → VCP",
        description: "Trecho internacional de volta ao Brasil.",
        strategy:
          "Trecho longo. Agora a lógica é conforto, hidratação e paciência.",
        transport: "Azul AD 8705",
        location: "Fort Lauderdale (FLL) → Campinas (VCP)",
        photoSpot: "",
        practicalPlan:
          "Embarcar já em modo retorno, hidratando bem e descansando o que der.",
        pitfalls:
          "Baixar a guarda em documentos e itens pessoais só porque a viagem 'já acabou'.",
        tips: [
          "Muita confusão acontece justamente quando a pessoa pensa que o mais difícil já passou.",
          "No voo de volta, hidratar e descansar o que der já ajuda demais.",
        ],
        hack: "Na volta, atenção até o último trecho ainda importa.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "18:00",
        title: "Conexão em Viracopos",
        description: "Último bloco premium da viagem.",
        strategy:
          "Usar bem esse bloco final ajuda a fechar a viagem com conforto antes do trecho final para Goiânia.",
        transport: "A pé / aeroporto",
        location: "Aeroporto de Viracopos (VCP)",
        photoSpot: "",
        practicalPlan:
          "Ir para a área segura, avaliar lounge, comer algo leve e reorganizar a reta final sem gastar energia inútil no terminal.",
        pitfalls:
          "Ficar andando sem propósito ou desperdiçar a última boa conexão da jornada.",
        tips: [
          "O último bloco premium quase sempre ajuda o corpo a entender que a viagem está realmente acabando.",
          "Se houver tempo e acesso, vale muito usar o lounge.",
        ],
        hack:
          "Viracopos fecha a viagem como começou: quando bem usado, muda bastante o conforto.",
        restaurant: "",
        lounge: "Lounge Azul / sala compatível, conforme janela real da conexão",
      },
      {
        time: "20:00",
        title: "Voo VCP → GYN",
        description: "Trecho final até Goiânia.",
        strategy:
          "Último voo, agora já com mentalidade de chegada e atenção até o fim.",
        transport: "Azul AD 2694",
        location: "Campinas (VCP) → Goiânia (GYN)",
        photoSpot: "",
        practicalPlan:
          "Embarcar e só manter atenção a documentos, mala e logística de desembarque até o pouso.",
        pitfalls:
          "Baixar a guarda em mala e documento no último trecho por achar que já acabou.",
        tips: [
          "O último trecho parece o mais fácil, mas é justamente onde muita gente relaxa demais.",
          "Nada de baixar guarda em documento, mala ou logística de desembarque.",
        ],
        hack: "Último voo ainda merece atenção completa.",
        restaurant: "",
        lounge: "",
      },
      {
        time: "21:25",
        title: "Chegada em Goiânia",
        description: "Fim oficial da jornada aérea.",
        strategy:
          "Fechar bem até o último minuto. Depois ainda existe o retorno para casa.",
        transport: "Aeroporto",
        location: "Aeroporto Santa Genoveva (GYN), Goiânia, GO",
        photoSpot: "",
        practicalPlan:
          "Retirar malas, conferir tudo e sair com calma para o deslocamento final até Anápolis.",
        pitfalls:
          "Sair correndo e esquecer item ou baixar a guarda justamente no fim.",
        tips: [
          "Fim de viagem também pede disciplina até o último passo.",
          "Conferir tudo antes de sair do aeroporto continua sendo obrigatório.",
        ],
        hack: "",
        restaurant: "",
        lounge: "",
      },
      {
        time: "22:40",
        title: "Chegada em Anápolis",
        description: "Encerramento definitivo da viagem.",
        strategy:
          "Agora é só fechar a missão do jeito certo: em paz e sem correria boba.",
        transport: "Carro ou Uber",
        location: "Goiânia → Anápolis",
        photoSpot: "",
        practicalPlan:
          "Voltar para casa com calma, segurança e sem acelerar sem necessidade no último bloco da jornada.",
        pitfalls:
          "Dirigir no automático e sem atenção só porque já está em casa mentalmente.",
        tips: [
          "Toda viagem grande merece um fim em paz.",
          "Último bloco da viagem: voltar em paz e sem correria.",
        ],
        hack: "Missão bem feita também termina bem.",
        restaurant: "",
        lounge: "",
      },
    ],
  };

  const dayMap = useMemo(
    () => ({
      14: {
        title: "Partida e conexões",
        subtitle: "Anápolis → Goiânia → Campinas → noite a bordo",
        highlights: [
          "Saída de Anápolis",
          "GYN com lounge",
          "VCP com Lounge Azul",
          "Voo internacional",
        ],
        attention: {
          risk: "Sair tarde e contaminar toda a cadeia do dia.",
          priority:
            "Despacho limpo, lounges bem usados e voo internacional confortável.",
          critical: "Chegar cedo em GYN e usar Viracopos com inteligência.",
          flexible: "Ritmo do lounge e tempo de descanso na conexão.",
        },
      },

      15: {
        title: "Chegada a Miami",
        subtitle: "FLL → Casa Boutique → Sawgrass → South Beach",
        highlights: [
          "Imigração eficiente",
          "BMW X7",
          "Sawgrass por blocos",
          "Primeira noite em Miami",
        ],
        attention: {
          risk: "Perder tempo logo na chegada e enfraquecer o Sawgrass.",
          priority: "Carro, hotel técnico e compras bem executadas.",
          critical: "Locadora, luggage storage e manhã forte no outlet.",
          flexible: "Lojas secundárias e ritmo do fim de tarde em South Beach.",
        },
      },

      16: {
        title: "South Beach + Miami urbana",
        subtitle: "South Pointe → Tower 10 → Lummus → Design District → Brickell",
        highlights: [
          "South Pointe Park",
          "Tower 10",
          "Design District",
          "Brickell",
        ],
        attention: {
          risk: "Alongar a manhã de praia e apertar a parte urbana.",
          priority: "Virada elegante entre praia e cidade.",
          critical: "South Pointe cedo e fechamento forte em Brickell.",
          flexible: "Tempo de vitrines, Apple e ritmo do jantar.",
        },
      },

      17: {
        title: "SUN ’n FUN + transição para Orlando",
        subtitle: "Miami → Lakeland → Walmart → Kissimmee",
        highlights: [
          "Chegar até 10:00",
          "Warbirds e flight line",
          "Walmart estratégico",
          "Dormir cedo",
        ],
        attention: {
          risk: "Sair tarde de Miami e perder a melhor janela do evento.",
          priority:
            "Estrada limpa, evento forte e transição inteligente para Orlando.",
          critical: "Saída 06:50 e chegada em Lakeland até 10:00.",
          flexible: "Tempo na loja oficial e bloco final do evento.",
        },
      },

      18: {
        title: "Magic Kingdom",
        subtitle: "TRON cedo + fogos + TRON à noite",
        highlights: [
          "Preferred Parking",
          "Lightning Lane",
          "Fogos",
          "TRON noturna",
        ],
        attention: {
          risk: "Desperdiçar a manhã mais valiosa do parque.",
          priority: "TRON cedo, ritmo forte e fechamento bonito.",
          critical: "Entrada cedo, fogos e repetição da TRON à noite.",
          flexible: "Fotos e pausas entre blocos médios.",
        },
      },

      19: {
        title: "Epic Universe + bloco tático de compras",
        subtitle: "Epic → International Premium → Celebration",
        highlights: [
          "Express Pass",
          "Epic por blocos",
          "JD Sports",
          "Celebration",
        ],
        attention: {
          risk: "Deixar o outlet roubar a noite e bagunçar o dia.",
          priority: "Parque forte, compra curta e fechamento bonito.",
          critical: "Execução da Epic e JD Sports sem dispersão.",
          flexible: "Lojas secundárias do outlet e tempo em Celebration.",
        },
      },

      20: {
        title: "SeaWorld + Vineland",
        subtitle: "Animais + rides + dining plan + outlet complementar",
        highlights: [
          "Dining cedo",
          "Animais prioritários",
          "Rides importantes",
          "Vineland",
        ],
        attention: {
          risk: "Tratar o SeaWorld como parque sem estratégia.",
          priority: "Equilibrar animais, rides e dining plan.",
          critical: "Usar bem a manhã e o dining cedo.",
          flexible: "Vineland e jantar, se a energia cair.",
        },
      },

      21: {
        title: "Grande dia de compras",
        subtitle: "The Loop + Dillard’s + Rack + Lake Buena + Disney Springs",
        highlights: [
          "Ross / TJ / Marshalls",
          "Nike",
          "Dillard’s Clearance",
          "Nordstrom Rack",
        ],
        attention: {
          risk:
            "Perder a manhã em loja errada e desperdiçar o melhor estoque.",
          priority:
            "Comprar o que compensa muito, cedo e com cabeça fria.",
          critical: "The Loop forte e Dillard’s no ponto certo.",
          flexible: "Millenia e Lake Buena, se sobrar tempo e energia.",
        },
      },

      22: {
        title: "Orlando → Washington",
        subtitle: "MCO cedo → DCA → Wharf → Mall → Georgetown",
        highlights: [
          "MCO Reserve",
          "Devolução da BMW X7",
          "Lincoln no pôr do sol",
          "Georgetown",
        ],
        attention: {
          risk:
            "Errar a madrugada e contaminar voos, conexão e chegada em DC.",
          priority: "Executar aeroporto cedo e pousar bem em Washington.",
          critical: "Devolução do carro, segurança e conexão limpa.",
          flexible: "Wharf e ritmo do jantar em Georgetown.",
        },
      },

      23: {
        title: "Washington histórico",
        subtitle: "Capitólio + Library of Congress + Air & Space",
        highlights: [
          "Capitol 09:10",
          "Library 11:15",
          "Air & Space 14:00",
          "Uber + caminhada",
        ],
        attention: {
          risk: "Atrasar horários fixos do dia.",
          priority: "Respeitar agenda e preservar energia.",
          critical: "Capitólio, Library e Air & Space nos horários.",
          flexible: "Jantar e ritmo do fim de tarde.",
        },
      },

      24: {
        title: "Washington leve → NYC",
        subtitle: "Georgetown + Martin’s + Arlington + voo noturno",
        highlights: [
          "Georgetown",
          "Martin’s Tavern",
          "Arlington",
          "Voo IAD → LGA",
        ],
        attention: {
          risk: "Deixar bagagem e voo apertarem a tarde.",
          priority: "Fechar Washington bonito e sem correria.",
          critical: "Martin’s, Arlington e retorno ao hotel no horário.",
          flexible: "Tempo de caminhada em Georgetown.",
        },
      },

      25: {
        title: "Downtown NYC + Brooklyn",
        subtitle: "Liberty + 9/11 + Bull + Bridge + DUMBO + Times Square",
        highlights: [
          "Statue 08:30",
          "9/11 14:00",
          "Brooklyn Bridge",
          "Times Square",
        ],
        attention: {
          risk: "Começar tarde e apertar o downtown inteiro.",
          priority: "Estátua cedo e ponte ainda com energia.",
          critical: "Battery Park, 9/11 e Brooklyn Bridge bem encaixados.",
          flexible: "Tempo no Time Out, jantar e ritmo de Times Square.",
        },
      },

      26: {
        title: "Aniversário da Amanda",
        subtitle: "Grand Central + Fifth Ave + SUMMIT + Peak + Vessel",
        highlights: [
          "Grand Central",
          "Apple + LV",
          "SUMMIT 17:00",
          "Peak NYC",
        ],
        attention: {
          risk:
            "Deixar a logística roubar o clima do aniversário.",
          priority: "Manter o dia bonito, leve e especial.",
          critical: "SUMMIT, Peak e eixo da Fifth bem executados.",
          flexible: "Tempo em lojas leves e pausas da tarde.",
        },
      },

      27: {
        title: "Último dia completo em NYC",
        subtitle: "Central Park + Belvedere + High Line + Intrepid + Hudson",
        highlights: [
          "Central Park",
          "Belvedere Castle",
          "Intrepid 14:30",
          "Pôr do sol no Hudson",
        ],
        attention: {
          risk:
            "Tentar abraçar Manhattan inteira no último dia.",
          priority: "Fechar NYC forte, bonito e sem destruir a noite.",
          critical: "Central Park cedo, Intrepid e retorno antecipado.",
          flexible: "Tempo na High Line e no jantar final.",
        },
      },

      28: {
        title: "NYC → Miami",
        subtitle: "Voo cedo + Alamo + Mustang + Casa Boutique",
        highlights: [
          "LGA 06:00",
          "Chegada MIA 11:31",
          "Mustang conversível",
          "Buscar Rafa e Matheus",
        ],
        attention: {
          risk: "Errar a madrugada e chegar quebrado em Miami.",
          priority: "Voos limpos, locadora rápida e reentrada leve.",
          critical: "LGA cedo, Mustang e hotel sem arrasto.",
          flexible: "Passeio leve e ritmo do jantar final.",
        },
      },

      29: {
        title: "Retorno ao Brasil",
        subtitle: "Miami Beach → FLL → VCP → GYN → Anápolis",
        highlights: [
          "Alamo FLL 06:00",
          "FLL 08:20",
          "Lounge em VCP",
          "Volta para Anápolis",
        ],
        attention: {
          risk: "Relaxar cedo demais no último dia.",
          priority: "Devolver carro e embarcar sem ruído.",
          critical: "Saída cedo, locadora e check-in internacional.",
          flexible: "Uso de lounge e ritmo da conexão em VCP.",
        },
      },
    }),
    []
  );

  const fallbackDay = {
    title: "Dia em definição",
    subtitle: "Roteiro ainda não carregado corretamente",
    highlights: ["Verificar dados do dia"],
    attention: {
      risk: "Dados ausentes.",
      priority: "Revisar o dayMap e o itinerary.",
      critical: "Garantir que o dia selecionado exista.",
      flexible: "Ajustes visuais depois da correção estrutural.",
    },
  };

  const dayList = Array.from({ length: 16 }, (_, i) => i + 14);
  const currentDay = dayMap[activeDay] || fallbackDay;
  const currentTimeline = itinerary[activeDay] || [];
  const activeHeroDetails = heroDetails[activeHeroTab] || [];
    const buildMetaItems = (item) => {
    const metaItems = [
      item.transport
        ? {
            label: "Transporte",
            text: item.transport,
            tone: "operational",
          }
        : null,

      item.location
        ? {
            label: "Local",
            text: item.location,
            tone: "operational",
          }
        : null,

      item.restaurant
        ? {
            label: "Restaurante",
            text: item.restaurant,
            tone: "operational",
          }
        : null,

      item.lounge
        ? {
            label: "Sala VIP",
            text: item.lounge,
            tone: "operational",
          }
        : null,

      item.practicalPlan
        ? {
            label: "Plano prático",
            text: item.practicalPlan,
            tone: "context",
          }
        : null,

      item.photoSpot
        ? {
            label: "Foto spot",
            text: item.photoSpot,
            tone: "context",
          }
        : null,

      item.pitfalls
        ? {
            label: "Pegadinhas para evitar",
            text: item.pitfalls,
            tone: "alert",
          }
        : null,
    ];

    return metaItems.filter(Boolean);
  };

  const renderWeatherIcon = (iconCode) => {
    const normalized = String(iconCode || "")
      .toLowerCase()
      .trim();

    const iconMap = {
      sun: <Sun size={38} strokeWidth={2.2} />,
      clear: <Sun size={38} strokeWidth={2.2} />,
      sunny: <Sun size={38} strokeWidth={2.2} />,

      cloud: <Cloud size={38} strokeWidth={2.2} />,
      cloudy: <Cloud size={38} strokeWidth={2.2} />,
      overcast: <Cloud size={38} strokeWidth={2.2} />,

      "partly-cloudy": <CloudSun size={38} strokeWidth={2.2} />,
      "partly_cloudy": <CloudSun size={38} strokeWidth={2.2} />,
      "partly cloudy": <CloudSun size={38} strokeWidth={2.2} />,
      "mostly-sunny": <CloudSun size={38} strokeWidth={2.2} />,
      "mostly sunny": <CloudSun size={38} strokeWidth={2.2} />,

      rain: <CloudRain size={38} strokeWidth={2.2} />,
      rainy: <CloudRain size={38} strokeWidth={2.2} />,
      shower: <CloudRain size={38} strokeWidth={2.2} />,
      showers: <CloudRain size={38} strokeWidth={2.2} />,

      drizzle: <CloudDrizzle size={38} strokeWidth={2.2} />,

      storm: <CloudLightning size={38} strokeWidth={2.2} />,
      thunder: <CloudLightning size={38} strokeWidth={2.2} />,
      thunderstorm: <CloudLightning size={38} strokeWidth={2.2} />,

      fog: <CloudFog size={38} strokeWidth={2.2} />,
      mist: <CloudFog size={38} strokeWidth={2.2} />,

      snow: <Snowflake size={38} strokeWidth={2.2} />,
    };

    return iconMap[normalized] || <CloudSun size={38} strokeWidth={2.2} />;
  };

  const weatherDisplay = {
    city: weather?.city || currentWeatherCity,
    temp: weatherLoading ? "--°C" : weather?.temperature || "--°C",
    condition: weatherError || weather?.condition || "Clima indisponível",
    rainChance: weather?.rainChance || "--%",
    icon: renderWeatherIcon(weather?.icon),
  };

  return (
    <div className="app-shell">
      <section className="hero panel">
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="hero-kicker">
              <CalendarDays size={16} strokeWidth={2.2} />
              <span>Roteiro operacional premium</span>
            </div>

            <h1 className="hero-title">EUA 2026</h1>

            <p className="hero-passengers">
              Lucas, Amanda, Matheus e Rafa • Miami, Lakeland, Orlando,
              Washington e Nova York
            </p>
          </div>

          <div className="hero-tabs-grid">
            {heroTabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                className={`hero-tab-card ${
                  activeHeroTab === tab.key ? "is-active" : ""
                }`}
                onClick={() =>
                  setActiveHeroTab((prev) => (prev === tab.key ? null : tab.key))
                }
              >
                <div className="hero-tab-icon">{tab.icon}</div>

                <div className="hero-tab-copy">
                  <p className="hero-tab-title">{tab.title}</p>
                  <p className="hero-tab-value">{tab.value}</p>
                </div>
              </button>
            ))}
          </div>

          {activeHeroTab && (
            <div className="hero-details-panel">
              <div className="hero-details-grid">
                {activeHeroDetails.map((detail) => (
                  <div key={`${detail.label}-${detail.title}`} className="hero-detail-card">
                    <p className="mini-label">{detail.label}</p>
                    <h3 className="hero-detail-title">{detail.title}</h3>
                    <p className="hero-detail-text">{detail.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <main className="dashboard-grid">
        <aside className="sidebar-column">
          <section className="panel sidebar-box">
            <div className="panel-header">
              <Clock3 size={16} strokeWidth={2.2} />
              <h2 className="panel-title">Dias da viagem</h2>
            </div>

            <div className="days-grid">
              {dayList.map((day) => (
                <button
                  key={day}
                  type="button"
                  className={`day-button ${activeDay === day ? "is-active" : ""}`}
                  onClick={() => setActiveDay(day)}
                >
                  Dia {day}
                </button>
              ))}
            </div>
          </section>
        </aside>

        <section className="content-column">
          <section className="panel summary-panel">
            <div className="summary-header">
              <div>
                <p className="mini-label">Resumo do dia</p>
                <h2 className="summary-title">{currentDay.title}</h2>
                <p className="summary-subtitle">{currentDay.subtitle}</p>
              </div>
            </div>

            <div className="summary-grid">
              <div className="summary-card">
                <p className="mini-label">Destaques</p>
                <div className="summary-highlight-grid">
                  {currentDay.highlights.map((highlight) => (
                    <div key={highlight} className="summary-highlight-item">
                      {highlight}
                    </div>
                  ))}
                </div>
              </div>

              <div className="summary-weather-card">
                <div className="summary-weather-top">
                  <div className="summary-weather-icon">
                    {weatherLoading ? "…" : weatherDisplay.icon}
                  </div>

                  <div className="summary-weather-copy">
                    <div className="summary-weather-temp">{weatherDisplay.temp}</div>
                    <div className="summary-weather-city">{weatherDisplay.city}</div>
                  </div>
                </div>

                <div className="summary-weather-meta">
                  <span>{weatherDisplay.condition}</span>
                  <span>Chuva {weatherDisplay.rainChance}</span>
                </div>
              </div>
            </div>

            <div className="attention-card">
              <div className="attention-card-header">
                <p className="mini-label">Atenção do dia</p>
                <span className="attention-badge">Operacional</span>
              </div>

              <div className="attention-grid">
                <div className="attention-item attention-item-risk">
                  <p className="attention-label">Risco</p>
                  <p className="attention-text">{currentDay.attention.risk}</p>
                </div>

                <div className="attention-item attention-item-priority">
                  <p className="attention-label">Prioridade</p>
                  <p className="attention-text">{currentDay.attention.priority}</p>
                </div>

                <div className="attention-item attention-item-critical">
                  <p className="attention-label">Não pode atrasar</p>
                  <p className="attention-text">{currentDay.attention.critical}</p>
                </div>

                <div className="attention-item attention-item-flex">
                  <p className="attention-label">Flexível</p>
                  <p className="attention-text">{currentDay.attention.flexible}</p>
                </div>
              </div>
            </div>
          </section>

          <section className="timeline-section">
            {currentTimeline.map((item, index) => {
              const metaItems = buildMetaItems(item);

              return (
                <article key={`${item.time}-${item.title}-${index}`} className="timeline-card">
                  <div className="timeline-header-block">
                    <div className="timeline-time">{item.time}</div>

                    <div className="timeline-copy">
                      <h3 className="timeline-title">{item.title}</h3>
                      <p className="timeline-description">{item.description}</p>
                    </div>
                  </div>

                  {item.strategy && (
                    <div className="timeline-strategy-box">
                      <p className="mini-label">Estratégia</p>
                      <p className="summary-text">{item.strategy}</p>
                    </div>
                  )}

                  {metaItems.length > 0 && (
                    <div className="timeline-meta-grid">
                      {metaItems.map((meta) => (
                        <div
                          key={`${item.title}-${meta.label}`}
                          className={`meta-box ${
                            meta.tone === "alert"
                              ? "meta-box--alert"
                              : meta.tone === "context"
                              ? "meta-box--context"
                              : ""
                          }`}
                        >
                          <p className="mini-label">{meta.label}</p>
                          <p
                            className={`card-text ${
                              meta.tone === "operational" || meta.tone === "alert"
                                ? "strong"
                                : ""
                            }`}
                          >
                            {meta.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {((item.tips && item.tips.length > 0) || item.hack || item.warning) && (
                    <div className="timeline-intelligence-block">
                      {item.warning && (
                        <div className="warning-box">
                          <p className="mini-label">Alerta crítico</p>
                          <p className="card-text strong">{item.warning}</p>
                        </div>
                      )}

                      {item.tips && item.tips.length > 0 && (
                        <div className="tips-box">
                          <p className="mini-label">Dicas e Curiosidades</p>
                          <ul className="tips-list">
                            {item.tips.map((tip) => (
                              <li key={tip}>{tip}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {item.hack && (
                        <div className="hack-box">
                          <p className="mini-label">Hack Premium</p>
                          <p className="card-text strong">{item.hack}</p>
                        </div>
                      )}
                    </div>
                  )}
                </article>
              );
            })}
          </section>
        </section>
      </main>
    </div>
  );
}