import { useState, useEffect } from "react";
import { StartScreen } from "./components/StartScreen";
import { ModeScreen, QuizMode } from "./components/ModeScreen";
import {
  CategoryScreen,
  Category,
} from "./components/CategoryScreen";
import { LevelScreen, Level } from "./components/LevelScreen";
import { QuizScreen, Question } from "./components/QuizScreen";
import { ResultScreen } from "./components/ResultScreen";
import { DuaReward, Dua } from "./components/DuaReward";
import { CongratsScreen } from "./components/CongratsScreen";

// Categorias disponíveis
const categories: Category[] = [
  {
    id: "pilares",
    name: "Pilares do Islam",
    description:
      "Perguntas sobre os cinco pilares fundamentais do Islam",
    icon: "star",
    questionCount: 15,
  },
  {
    id: "profetas",
    name: "História de Profetas",
    description: "Conheça os profetas e a história islâmica",
    icon: "book",
    questionCount: 15,
  },
  {
    id: "praticas",
    name: "Práticas Diárias",
    description:
      "Rotinas e práticas do dia a dia dos muçulmanos",
    icon: "heart",
    questionCount: 15,
  },
  {
    id: "cultura",
    name: "Cultura e Lugares",
    description:
      "Locais sagrados e aspectos culturais do Islam",
    icon: "globe",
    questionCount: 15,
  },
  {
    id: "seerah",
    name: "A Vida do Profeta Muhammad",
    description:
      "Seerah - A biografia e exemplo do último mensageiro",
    icon: "user",
    questionCount: 15,
  },
  {
    id: "mulheres",
    name: "Mulheres no Islam",
    description:
      "Grandes figuras femininas na história islâmica",
    icon: "users",
    questionCount: 15,
  },
  {
    id: "ciencia",
    name: "Conhecimentos e Curiosidades",
    description: "Ciência, invenções e contribuições islâmicas",
    icon: "lightbulb",
    questionCount: 15,
  },
  {
    id: "akhlaq",
    name: "Ética e Moral",
    description:
      "Akhlaq - Princípios de caráter e comportamento",
    icon: "shield",
    questionCount: 15,
  },
  {
    id: "alcorao",
    name: "Alcorão e Revelação",
    description: "A revelação divina e seus ensinamentos",
    icon: "book-open",
    questionCount: 15,
  },
];

// Níveis de dificuldade
const levels: Level[] = [
  {
    id: "easy",
    name: "Fácil",
    description: "Perguntas básicas sobre o Islam",
    icon: "leaf",
  },
  {
    id: "medium",
    name: "Médio",
    description: "Perguntas mais detalhadas sobre o Islam",
    icon: "star",
  },
  {
    id: "hard",
    name: "Difícil",
    description: "Perguntas avançadas sobre o Islam",
    icon: "fire",
  },
];

// Perguntas organizadas por categoria
const questionsByCategory: Record<string, Question[]> = {
  pilares: [
    // NÍVEL 1 - BÁSICO (Perguntas 1-5)
    {
      id: 1,
      question: "Quantos pilares tem o Islam?",
      options: ["A) 3", "B) 4", "C) 5", "D) 6"],
      correctAnswer: 2,
      explanation:
        "O Islam possui 5 pilares fundamentais. O Profeta Muhammad (paz e benção de Allah esteja com ele) disse: 'O Islam é construído sobre cinco pilares: testemunhar que não há divindade além de Allah e que Muhammad é o Seu mensageiro, estabelecer a oração, pagar o Zakat, fazer o Hajj e jejuar no Ramadã.' (Sahih al-Bukhari 8 e Sahih Muslim 16)",
    },
    {
      id: 2,
      question: "Qual é o primeiro pilar do Islam?",
      options: [
        "A) Shahada (Testemunho de fé)",
        "B)Swalat (Oração)",
        "B) Zakat (Caridade)",
        "D) Hajj (Peregrinação)",
      ],
      correctAnswer: 0,
      explanation:
        "A Shahada (testemunho de fé) é o primeiro e mais importante pilar do Islam. Consiste em declarar: 'Não há divindade além de Allah e Muhammad é o Seu mensageiro'. Allah diz no Alcorão: 'Saibam que não há divindade além de Allah' (Alcorão 47:19). Esta declaração é a base de toda a fé islâmica.",
    },
    {
      id: 3,
      question: "O que é Zakat no Islam?",
      options: [
        "A) Jejum",
        "B) Caridade obrigatória",
        "C) Oração",
        "D) Peregrinação",
      ],
      correctAnswer: 1,
      explanation:
        "Zakat é a caridade obrigatória, o terceiro pilar do Islam. Allah ordena no Alcorão: 'E estabeleçam a oração e paguem o Zakat' (Alcorão 2:43). É uma purificação da riqueza, onde os muçulmanos que possuem recursos acima de um certo limite devem dar 2,5% de sua riqueza anualmente aos necessitados.",
    },
    {
      id: 4,
      question: "Como se chama a peregrinação à Meca?",
      options: ["A) Zakat", "B) Swawm", "C) Swalat", "D) Hajj"],
      correctAnswer: 3,
      explanation:
        "Hajj é o quinto pilar do Islam, a peregrinação à cidade sagrada de Meca. Allah diz: 'A peregrinação à Casa é um dever que as pessoas devem a Allah - aqueles que podem encontrar um caminho' (Alcorão 3:97). Todo muçulmano que tenha condições físicas e financeiras deve realizar o Hajj pelo menos uma vez na vida.",
    },
    {
      id: 5,
      question:
        "Qual é opilar praticado durante o mês de Ramadãn?",
      options: [
        "A) Swalat",
        "B) Sawm (Jejum)",
        "C) Zakat",
        "D) Hajj",
      ],
      correctAnswer: 1,
      explanation:
        "Swawm (jejum) é o quarto pilar do Islam, praticado no mês sagrado de Ramadãn. Allah revelou: 'Ó vocês que creem! O jejum foi prescrito a vocês como foi prescrito àqueles antes de vocês, para que possam alcançar a piedade' (Alcorão 2:183). Durante o Ramadã, os muçulmanos se abstêm de comida, bebida e relações íntimas do amanhecer ao pôr do sol.",
    },
    // NÍVEL 2 - INTERMEDIÁRIO (Perguntas 6-10)
    {
      id: 6,
      question:
        "Quantas vezes por dia os muçulmanos devem realizar a Swalat obrigatória?",
      options: [
        "A) 3 vezes",
        "B) 5 vezes",
        "C) 7 vezes",
        "D) Não há número fixo",
      ],
      correctAnswer: 1,
      explanation:
        "Os muçulmanos realizam 5 orações obrigatórias diariamente: Fajr, Dhuhr, Asr, Maghrib e Isha. O Profeta (paz esteja com ele) disse: 'As cinco orações diárias e a oração de sexta-feira até a próxima sexta-feira expiam os pecados cometidos entre elas, desde que os pecados graves sejam evitados' (Sahih Muslim 233).",
    },
    {
      id: 7,
      question:
        "Qual é a porcentagem do Zakat sobre a riqueza acumulada?",
      options: ["A) 2,5%", "B) 1%", "C) 5%", "D) 10%"],
      correctAnswer: 0,
      explanation:
        "O Zakat é 2,5% da riqueza que atingiu o nisab (limite mínimo) e permaneceu por um ano lunar. O Profeta (paz e benção de Allah estejam com ele) disse: 'Nenhum possuidor de ouro ou prata que não pague o devido por ela, exceto que no Dia da Ressurreição serão feitas para ele placas de fogo' (Sahih Muslim 987). Este pilar purifica a riqueza e auxilia os necessitados.",
    },
    {
      id: 8,
      question: "Em que mês islâmico ocorre o Hajj?",
      options: [
        "A) Ramadãn",
        "B) Muharram",
        "C) Dhul-Hijjah",
        "D) Rajab",
      ],
      correctAnswer: 2,
      explanation:
        "O Hajj ocorre no mês de Dhul-Hijjah, o 12º mês do calendário islâmico. Allah diz: 'O Hajj é [durante] meses bem conhecidos' (Alcorão 2:197). Durante esse mês, milhões de muçulmanos de todo o mundo se reúnem em Meca para realizar os rituais do Hajj, culminando no Dia de Arafah, o melhor dia do ano.",
    },
    {
      id: 9,
      question: "O que invalida o jejum durante o Ramadãn?",
      options: [
        "A) Dormir",
        "B) Falar",
        "C) Trabalhar",
        "D) Comer ou beber intencionalmente",
      ],
      correctAnswer: 3,
      explanation:
        "Comer ou beber intencionalmente durante as horas do jejum invalida o jejum. Allah diz: 'E comam e bebam até que se distinga o fio branco do fio negro do alvorecer. Então completem o jejum até a noite' (Alcorão 2:187). O jejum deve ser do amanhecer ao pôr do sol, e quem quebrar intencionalmente deve compensá-lo.",
    },
    {
      id: 10,
      question: "O que significa 'Lá ilaha illa Allah'?",
      options: [
        "A) Allah é grande",
        "B) Não há divindade além de Allah",
        "C) Em nome de Allah",
        "D) Louvado seja Allah",
      ],
      correctAnswer: 1,
      explanation:
        "Esta é a primeira parte da Shahada, o testemunho de fé. O Profeta (paz e benção de Allah estejam com ele) disse: 'Quem disser \"Não há divindade além de Allah\" e negar tudo que é adorado além de Allah, sua propriedade e sangue se tornam sagrados, e suas contas são deixadas para Allah' (Swahih Muslim 23). Esta declaração é o fundamento do Tawhid (monoteísmo).",
    },
    // NÍVEL 3 - AVANÇADO (Perguntas 11-15)
    {
      id: 11,
      question:
        "Qual oração é considerada a melhor após as orações obrigatórias?",
      options: [
        "A) Tahajjud",
        "B) Duha",
        "C) Ishraq",
        "D) Tarawih",
      ],
      correctAnswer: 0,
      explanation:
        "A oração de Tahajjud (oração noturna) é a melhor oração voluntária. O Profeta (paz esteja com ele) disse: 'A melhor oração depois das orações obrigatórias é a oração na profundidade da noite' (Sahih Muslim 1163). Allah elogia no Alcorão: 'Eles costumavam dormir pouco da noite' (Alcorão 51:17).",
    },
    {
      id: 12,
      question: "Quem está isento de pagar Zakat?",
      options: [
        "A) Pessoas ricas",
        "B) Comerciantes",
        "C) Quem não possui o nisab",
        "D) Idosos",
      ],
      correctAnswer: 2,
      explanation:
        "Quem não possui riqueza acima do nisab (limite mínimo, equivalente a 85g de ouro) está isento do Zakat. O Profeta (paz esteja com ele) disse: 'Não há Zakat sobre uma propriedade até que tenha passado um ano' (Sunan Ibn Majah 1792). O Islam não sobrecarrega ninguém além de sua capacidade.",
    },
    {
      id: 13,
      question:
        "Qual ritual do Hajj envolve caminhar sete vezes ao redor da Kaaba?",
      options: ["A) Sa'i", "B) Rawy", "C) Wuquf", "D) Tawaf"],
      correctAnswer: 3,
      explanation:
        "Tawaf é circular a Kaaba sete vezes em sentido anti-horário. Allah diz: 'E que circundem a Casa Antiga' (Alcorão 22:29). Este ritual foi ensinado pelo Profeta Abraão e é parte essencial do Hajj e Umrah. Representa a unidade da criação adorando o Criador único.",
    },
    {
      id: 14,
      question:
        "Qual é a recompensa de jejuar voluntariamente no dia de Arafah?",
      options: [
        "A) Perdão de um ano",
        "B) Perdão de dois anos",
        "C) Entrada garantida no Paraíso",
        "D) Aumento na riqueza",
      ],
      correctAnswer: 1,
      explanation:
        "O Profeta (paz e benção de Allah estejam com ele) disse: 'Jejuar no dia de Arafah expia os pecados dos dois anos anteriores e do ano seguinte' (Sahih Muslim 1162). O dia de Arafah (9 de Dhul-Hijjah) é o melhor dia do ano, quando Allah liberta mais pessoas do Fogo do que em qualquer outro dia.",
    },
    {
      id: 15,
      question: "O que é Swadaqah e como difere do Zakat?",
      options: [
        "A) São a mesma coisa",
        "B) Swadaqah é só no Ramadã",
        "C) Swadaqah é apenas dinheiro",
        "D) Swadaqah é voluntária, Zakat é obrigatória",
      ],
      correctAnswer: 3,
      explanation:
        "Zakat é caridade obrigatória com valores específicos, enquanto Swadaqah é caridade voluntária de qualquer valor e forma. O Profeta (paz esteja com ele) disse: 'Até um sorriso no rosto do seu irmão é Swadaqah' (Tirmidhi 1956). Allah ama os generosos: 'Aqueles que gastam sua riqueza de noite e de dia, em segredo e em público' (Alcorão 2:274).",
    },
  ],
  profetas: [
    {
      id: 6,
      question: "Qual é o último profeta no Islam?",
      options: [
        "A) Moisés",
        "B) Jesus",
        "C) Abraão",
        "D) Muhammad (paz de Allah esteja com ele)",
      ],
      correctAnswer: 3,
      explanation:
        "Muhammad (paz e benção de Allah estejam com ele) é o último e final profeta enviado por Allah. O Alcorão afirma: 'Muhammad não é pai de nenhum de seus homens, mas é o Mensageiro de Allah e o Selo dos Profetas' (Alcorão 33:40). Ele trouxe a mensagem final e completa para toda a humanidade.",
    },
    {
      id: 7,
      question: "Qual profeta construiu a Kaaba?",
      options: [
        "A) Abraão (Ibrahim)",
        "B) Noé",
        "C) Moisés",
        "D) Muhammad",
      ],
      correctAnswer: 0,
      explanation:
        "O Profeta Abraão (Ibrahim) e seu filho Ismael construíram a Kaaba. Allah menciona no Alcorão: 'E quando Abraão e Ismael levantaram as fundações da Casa [dizendo]: Nosso Senhor, aceite [isso] de nós. Certamente Tu és o Ouvinte, o Conhecedor' (Alcorão 2:127). A Kaaba é o local mais sagrado do Islam.",
    },
    {
      id: 8,
      question: "Quantos profetas são mencionados no Alcorão?",
      options: ["A) 15", "B) 25", "C) 30", "D) 40"],
      correctAnswer: 1,
      explanation:
        "O Alcorão menciona 25 profetas por nome, embora muitos outros tenham sido enviados. Allah diz: 'E certamente enviamos mensageiros antes de você. Dentre eles estão aqueles [cujas histórias] te relatamos, e dentre eles estão aqueles [cujas histórias] não te relatamos' (Alcorão 40:78). Todos os profetas vieram com a mesma mensagem: adorar somente a Allah.",
    },
    {
      id: 9,
      question:
        "Qual profeta é conhecido como 'Amigo de Allah'?",
      options: [
        "A) Moisés",
        "B) Abraão (Ibrahim)",
        "C) Noé",
        "D) José",
      ],
      correctAnswer: 1,
      explanation:
        "O Profeta Abraão (Ibrahim) é conhecido como 'Khalilullah' (Amigo de Allah). O Alcorão menciona: 'E Allah tomou Abraão como amigo íntimo' (Alcorão 4:125). Ele é considerado o pai do monoteísmo e é reverenciado por muçulmanos, cristãos e judeus. Sua fé inabalável em Allah é um exemplo para todos os crentes.",
    },
    {
      id: 10,
      question: "Jesus (Isa) é reconhecido no Islam como?",
      options: [
        "A) Filho de Deus",
        "B) Um anjo",
        "C) Um profeta",
        "D) Um sábio",
      ],
      correctAnswer: 2,
      explanation:
        "Jesus (Isa) é reconhecido como um dos grandes profetas de Allah. O Alcorão diz: 'O Messias, Jesus filho de Maria, foi apenas um mensageiro de Allah' (Alcorão 4:171). Os muçulmanos acreditam em seu nascimento milagroso, seus milagres por permissão de Allah, mas não o consideram divino. Ele é altamente respeitado no Islam.",
    },
    // NÍVEL 2 - INTERMEDIÁRIO (Perguntas 11-15)
    {
      id: 11,
      question:
        "Qual Profeta construiu a Arca para salvar os crentes e os animais de uma grande inundação?",
      options: ["Abraão", "Noé (Nuh)", "Moisés", "Lot"],
      correctAnswer: 1,
      explanation:
        "O Profeta Noé (Nuh) construiu a Arca por ordem de Allah para escapar do dilúvio que destruiu os incrédulos. Allah diz: 'E construa a arca sob Nossa observação e Nossa revelação' (Alcorão 11:37). Noé pregou por 950 anos antes do dilúvio. Apenas ele, sua família crente e um par de cada animal foram salvos.",
    },
    {
      id: 12,
      question:
        "Qual Profeta foi abençoado com a sabedoria de entender a linguagem dos animais e governar sobre os Jinns?",
      options: [
        "Davi (Dawud)",
        "Salomão (Sulaiman)",
        "Moisés (Musa)",
        "José (Yusuf)",
      ],
      correctAnswer: 1,
      explanation:
        "O Profeta Salomão (Sulaiman) recebeu dons únicos de Allah. O Alcorão diz: 'E Salomão herdou de Davi. E disse: Ó humanidade, fomos ensinados a linguagem dos pássaros, e nos foi dado de todas as coisas' (Alcorão 27:16). Allah subjugou os ventos, jinns e animais ao seu comando. Ele usou esses dons para servir a Allah e estabelecer justiça.",
    },
    {
      id: 13,
      question:
        "Qual Profeta é conhecido como 'Khalilullah' (O Amigo de Allah)?",
      options: [
        "Moisés",
        "Abraão (Ibrahim)",
        "Noé",
        "Muhammad",
      ],
      correctAnswer: 1,
      explanation:
        "Abraão (Ibrahim) é chamado de 'Khalilullah' (O Amigo Íntimo de Allah). O Alcorão afirma: 'E Allah tomou Abraão como amigo íntimo' (Alcorão 4:125). Sua fé absoluta foi testada quando Allah ordenou que sacrificasse seu filho Ismael. Ele obedeceu prontamente, e Allah substituiu Ismael por um carneiro, estabelecendo o sacrifício do Eid al-Adha.",
    },
    {
      id: 14,
      question:
        "Qual Profeta foi separado de seu pai Yaqub e vendido como escravo no Egito?",
      options: ["Moisés", "Ismael", "José (Yusuf)", "Jonas"],
      correctAnswer: 2,
      explanation:
        "O Profeta José (Yusuf) foi vendido por seus irmãos invejosos. Allah diz: 'Certamente havia em José e seus irmãos sinais para os que perguntam' (Alcorão 12:7). Apesar de ser jogado num poço, vendido como escravo e injustamente aprisionado, sua fé permaneceu firme. Allah o elevou a ministro do Egito, e ele perdoou seus irmãos, dizendo: 'Não haverá censura sobre vocês hoje' (Alcorão 12:92).",
    },
    {
      id: 15,
      question:
        "Qual Profeta recebeu as Tábuas da Lei no Monte Sinai?",
      options: ["Abraão", "Davi", "Moisés (Musa)", "Jesus"],
      correctAnswer: 2,
      explanation:
        "Moisés (Musa) recebeu a Torá (Tawrat) no Monte Sinai. O Alcorão narra: 'E escrevemos para ele nas tábuas orientação e explicação detalhada de todas as coisas' (Alcorão 7:145). Moisés é um dos profetas mais mencionados no Alcorão. Allah falou com ele diretamente, dando-lhe o título 'Kalimullah' (Aquele com quem Allah falou).",
    },
    // NÍVEL 3 - AVANÇADO (Perguntas 16-20)
    {
      id: 16,
      question:
        "Qual Profeta foi enviado ao povo de Thamud com o milagre da Camela que saiu de uma rocha?",
      options: ["Hud", "Salih", "Shuaib", "Lot"],
      correctAnswer: 1,
      explanation:
        "O Profeta Salih foi enviado ao povo de Thamud, que vivia em Al-Hijr (atual Arábia Saudita). Allah diz: 'E para Thamud [enviamos] seu irmão Salih. Ele disse: Ó meu povo, adorem a Allah' (Alcorão 7:73). Quando pediram um milagre, Allah fez uma camela sair da rocha. Mas eles a mataram, então Allah os destruiu com um terremoto e trovão ensurdecedor. Suas ruínas ainda existem hoje.",
    },
    {
      id: 17,
      question:
        "Qual Profeta é mencionado no Alcorão como aquele que Allah falou diretamente sem intermediários?",
      options: ["Abraão", "Moisés (Musa)", "Muhammad", "Noé"],
      correctAnswer: 1,
      explanation:
        "Moisés (Musa) tem o título especial 'Kalimullah' (Aquele com quem Allah falou). Allah diz: 'E Allah falou a Moisés diretamente' (Alcorão 4:164). Quando Moisés pediu para ver Allah, foi-lhe dito: 'Você não Me verá. Mas olhe para a montanha; se ela permanecer em seu lugar, então você Me verá' (Alcorão 7:143). Quando Allah Se manifestou, a montanha se desfez, mostrando a majestade de Allah.",
    },
    {
      id: 18,
      question:
        "Qual Profeta foi testado com a perda de todos os filhos e saúde, mas nunca deixou de agradecer a Allah?",
      options: ["Noé", "Abraão", "Jó (Ayub)", "Jacó"],
      correctAnswer: 2,
      explanation:
        "O Profeta Jó (Ayub) é o exemplo supremo de paciência (Sabr). Perdeu seus filhos, riqueza e saúde, ficando gravemente doente. Mas nunca se queixou de Allah. O Alcorão elogia: 'Certamente o encontramos paciente, um excelente servo. Certamente ele voltava-se constantemente [para Allah]' (Alcorão 38:44). Após anos de teste, Allah o curou e devolveu tudo em dobro.",
    },
    {
      id: 19,
      question:
        "Quantos anos durou a missão profética do Profeta Muhammad (SAWs)?",
      options: ["10 anos", "20 anos", "23 anos", "30 anos"],
      correctAnswer: 2,
      explanation:
        "A missão profética do Profeta Muhammad durou 23 anos (13 anos em Meca, 10 em Medina). Começou aos 40 anos com a primeira revelação em 610 EC e terminou com sua morte em 632 EC. Durante este período, o Alcorão foi revelado gradualmente, respondendo a situações específicas e fortalecendo os crentes. Esta revelação gradual tinha sabedoria divina para facilitar a implementação e compreensão.",
    },
    {
      id: 20,
      question:
        "Qual Profeta preparou o caminho para a vinda do Profeta Isa (Jesus)?",
      options: [
        "Zacarias",
        "João Batista (Yahya)",
        "Elias",
        "Eliseu",
      ],
      correctAnswer: 1,
      explanation:
        "João Batista (Yahya) preparou o caminho para Jesus. O Alcorão diz sobre Zacarias: 'Então os anjos o chamaram... certamente Allah lhe dá boas novas de João, confirmando uma palavra de Allah' (Alcorão 3:39). Yahya nasceu milagrosamente de pais idosos. Era conhecido por sua piedade desde criança: 'Ó Yahya, segure a Escritura com força. E demos-lhe sabedoria enquanto ainda era criança' (Alcorão 19:12).",
    },
  ],
  praticas: [
    {
      id: 11,
      question:
        "Quantas orações diárias são obrigatórias no Islam?",
      options: ["3", "5", "7", "10"],
      correctAnswer: 1,
      explanation:
        "Cinco orações diárias são obrigatórias no Islam: Fajr (amanhecer), Dhuhr (meio-dia), Asr (tarde), Maghrib (pôr do sol) e Isha (noite). Allah diz: 'Mantenham as orações e [em particular] a oração do meio' (Alcorão 2:238). A oração foi estabelecida durante a jornada noturna do Profeta (Mi'raj) e é o segundo pilar do Islam.",
    },
    {
      id: 12,
      question: "Qual é o mês sagrado de jejum no Islam?",
      options: [
        "Muharram",
        "Ramadãn",
        "Shawwal",
        "Dhul-Hijjah",
      ],
      correctAnswer: 1,
      explanation:
        "Ramadã é o nono mês do calendário islâmico e o mês do jejum obrigatório. Allah revelou: 'O mês de Ramadã em que foi revelado o Alcorão, uma orientação para a humanidade' (Alcorão 2:185). Foi neste mês abençoado que o Alcorão começou a ser revelado ao Profeta Muhammad (paz esteja com ele).",
    },
    {
      id: 13,
      question: "Em que direção os muçulmanos oram?",
      options: [
        "Norte",
        "Leste",
        "Em direção à Kaaba em Meca",
        "Sul",
      ],
      correctAnswer: 2,
      explanation:
        "Os muçulmanos oram na direção da Kaaba em Meca, chamada de Qibla. Allah ordenou: 'Então vire seu rosto em direção à Mesquita Sagrada. E onde quer que vocês [crentes] estejam, virem seus rostos em direção a ela' (Alcorão 2:144). Esta unidade na direção simboliza a união dos muçulmanos em todo o mundo.",
    },
    {
      id: 14,
      question: "O que significa 'Wudu'?",
      options: [
        "Jejum",
        "Ablução (purificação)",
        "Oração",
        "Caridade",
      ],
      correctAnswer: 1,
      explanation:
        "Wudu é a ablução ritual, a purificação com água antes da oração. Allah instrui: 'Ó vocês que creem! Quando se levantarem para a oração, lavem seus rostos e mãos até os cotovelos, passem as mãos pela cabeça e [lavem] seus pés até os tornozelos' (Alcorão 5:6). A pureza física e espiritual é essencial para se apresentar diante de Allah.",
    },
    {
      id: 15,
      question: "Qual é a saudação islâmica tradicional?",
      options: [
        "Bom dia",
        "As-Salamu Alaikum",
        "Olá",
        "Boa tarde",
      ],
      correctAnswer: 1,
      explanation:
        "'As-Salamu Alaikum' significa 'A paz esteja com você'. O Profeta Muhammad (paz esteja com ele) disse: 'Vocês não entrarão no Paraíso até que acreditem, e não acreditarão até que se amem. Devo informá-los de algo que, se fizerem, se amarão? Espalhem a saudação de paz entre vocês' (Sahih Muslim 54). Esta saudação promove paz e fraternidade.",
    },
    // NÍVEL 2 - INTERMEDIÁRIO (Perguntas 16-20)
    {
      id: 16,
      question:
        "Qual mão deve ser usada para comer e beber, seguindo a Sunnah?",
      options: [
        "Mão esquerda",
        "Mão direita",
        "Qualquer mão",
        "As duas mãos",
      ],
      correctAnswer: 1,
      explanation:
        "Deve-se usar a mão direita para comer e beber. O Profeta (paz esteja com ele) disse: 'Quando um de vocês comer, que coma com a mão direita, e quando beber, que beba com a mão direita, pois Satanás come com a mão esquerda e bebe com a mão esquerda' (Sahih Muslim 2020). A mão direita também é usada para coisas limpas e honradas.",
    },
    {
      id: 17,
      question:
        "O que um muçulmano deve dizer antes de começar a comer ou estudar?",
      options: [
        "Alhamdulillah",
        "Bismillah",
        "SubhanAllah",
        "Allahu Akbar",
      ],
      correctAnswer: 1,
      explanation:
        "'Bismillah' (Em nome de Allah) deve ser dito antes de comer, beber ou iniciar qualquer ação boa. O Profeta (paz esteja com ele) disse: 'Quando um de vocês comer, que mencione o nome de Allah. Se esquecer de mencionar o nome de Allah no início, que diga: Bismillah no início e no fim' (Sunan Abu Dawud 3767). Começar com Bismillah traz bênção (barakah).",
    },
    {
      id: 18,
      question:
        "Como se chama o ato de usar um ramo natural para limpar os dentes?",
      options: ["Miskin", "Miswak", "Miraj", "Misbaha"],
      correctAnswer: 1,
      explanation:
        "Miswak (ou Siwak) é um ramo de árvore Arak usado para limpar os dentes. O Profeta (paz esteja com ele) disse: 'Se não fosse dificultar minha comunidade, teria ordenado o Miswak com cada ablução' (Sahih al-Bukhari 887). Também disse: 'O Miswak purifica a boca e agrada ao Senhor' (Sunan an-Nasa'i 5). Tem benefícios científicos comprovados para saúde oral.",
    },
    {
      id: 19,
      question:
        "Qual é a saudação recomendada ao entrar em uma casa ou encontrar alguém?",
      options: [
        "Bom dia",
        "As-Salamu Alaikum",
        "Olá",
        "Marhaban",
      ],
      correctAnswer: 1,
      explanation:
        "'As-Salamu Alaikum' (A paz esteja com você) é a saudação islâmica. Allah ordena: 'Quando entrarem em casas, saudem-se uns aos outros com uma saudação de Allah, abençoada e boa' (Alcorão 24:61). A resposta deve ser 'Wa Alaikum as-Salam' (E sobre você a paz). Iniciar a saudação tem 10 recompensas, e responder tem 10-30 recompensas.",
    },
    {
      id: 20,
      question: "O que se deve dizer ao espirrar?",
      options: [
        "Bismillah",
        "Alhamdulillah",
        "SubhanAllah",
        "Mashallah",
      ],
      correctAnswer: 1,
      explanation:
        "Ao espirrar, deve-se dizer 'Alhamdulillah' (Louvado seja Allah). O Profeta (paz esteja com ele) disse: 'Quando um de vocês espirrar, que diga Alhamdulillah, e que seu irmão ou companheiro responda Yarhamukallah (Que Allah tenha misericórdia de você), e quando lhe disserem Yarhamukallah, que responda Yahdikumullah (Que Allah os guie)' (Sahih al-Bukhari 6224).",
    },
    // NÍVEL 3 - AVANÇADO (Perguntas 21-25)
    {
      id: 21,
      question:
        "O que significa o termo 'Adab' no contexto do comportamento diário?",
      options: [
        "Força física",
        "Etiqueta e boas maneiras",
        "Riqueza",
        "Conhecimento religioso",
      ],
      correctAnswer: 1,
      explanation:
        "Adab significa etiqueta, boas maneiras e comportamento refinado. Engloba como falar, comer, caminhar, tratar outros e conduzir-se em todas as situações. O Profeta (paz esteja com ele) disse: 'Meu Senhor me educou e aperfeiçoou minha educação (Adab)' (Al-Jami' as-Saghir). O Islam enfatiza Adab em todas as áreas: com Allah, pessoas, animais e ambiente. Bom Adab reflete a fé interior.",
    },
    {
      id: 22,
      question:
        "Qual é a recompensa mencionada para quem remove um obstáculo (como um galho ou pedra) do caminho das pessoas?",
      options: [
        "Entrada no Paraíso",
        "É considerado uma Sadaqah (caridade)",
        "Perdão de pecados",
        "Todas as anteriores",
      ],
      correctAnswer: 3,
      explanation:
        "Remover obstáculos do caminho tem grande recompensa. O Profeta (paz esteja com ele) disse: 'Vi um homem desfrutando no Paraíso por causa de uma árvore que cortou que estava prejudicando os muçulmanos' (Sahih Muslim 1914). Também disse: 'A fé tem mais de setenta ramos... e remover obstáculos do caminho é um ramo da fé' (Sahih Muslim 35). É Sadaqah que traz bênçãos.",
    },
    {
      id: 23,
      question:
        "Como se chama a oração voluntária realizada na última parte da noite?",
      options: ["Duha", "Ishraq", "Tahajjud", "Tarawih"],
      correctAnswer: 2,
      explanation:
        "Tahajjud é a oração voluntária na última terça parte da noite. O Profeta (paz esteja com ele) disse: 'Nosso Senhor desce ao céu mais baixo toda noite no último terço e diz: Quem Me invoca para que Eu responda? Quem Me pede para que Eu dê? Quem busca Meu perdão para que Eu perdoe?' (Sahih al-Bukhari 1145). Allah elogia: 'Eles se levantam de suas camas' (Alcorão 32:16).",
    },
    {
      id: 24,
      question:
        "Qual é a regra islâmica sobre a higiene após usar o banheiro (Istinja)?",
      options: [
        "Usar apenas papel",
        "Limpeza completa com água ou materiais secos limpos",
        "Não é necessário",
        "Apenas lavar as mãos",
      ],
      correctAnswer: 1,
      explanation:
        "Istinja é a limpeza completa após usar o banheiro. O Profeta (paz esteja com ele) ensinou usar água ou pedras limpas (hoje lenços). Allah ama os que se purificam: 'Certamente Allah ama os que se arrependem e ama os que se purificam' (Alcorão 2:222). Deve-se usar a mão esquerda, entrar com o pé esquerdo, fazer dua específica e garantir limpeza completa antes do Wudu.",
    },
    {
      id: 25,
      question:
        "O que se deve dizer ao ouvir o nome do Profeta Muhammad?",
      options: [
        "Alhamdulillah",
        "SubhanAllah",
        "Sallallahu Alayhi Wa Sallam",
        "Mashallah",
      ],
      correctAnswer: 2,
      explanation:
        "'Sallallahu Alayhi Wa Sallam' (Que a paz e bênçãos de Allah estejam com ele) deve ser dito ao mencionar o Profeta. Allah ordena: 'Certamente Allah e Seus anjos enviam bênçãos ao Profeta. Ó vocês que creem, enviem bênçãos a ele e o saudem com saudações de paz' (Alcorão 33:56). O Profeta disse: 'Quem enviar bênçãos a mim uma vez, Allah enviará dez bênçãos a ele' (Sahih Muslim 384).",
    },
  ],
  cultura: [
    {
      id: 16,
      question:
        "Qual cidade é considerada a mais sagrada no Islam?",
      options: ["Medina", "Jerusalém", "Meca", "Cairo"],
      correctAnswer: 2,
      explanation:
        "Meca é a cidade mais sagrada do Islam, onde está localizada a Kaaba. O Profeta Muhammad (paz esteja com ele) disse: 'Uma oração na Mesquita Sagrada [Meca] é melhor do que cem mil orações em qualquer outra mesquita' (Sahih Ibn Majah 1406). É o local de nascimento do Profeta e o destino do Hajj.",
    },
    {
      id: 17,
      question: "Qual é o livro sagrado do Islam?",
      options: ["A Bíblia", "O Alcorão", "A Torá", "O Vedas"],
      correctAnswer: 1,
      explanation:
        "O Alcorão é o livro sagrado do Islam, a palavra literal de Allah revelada ao Profeta Muhammad (paz esteja com ele) por meio do Anjo Gabriel. Allah diz: 'Certamente Nós revelamos a Mensagem, e certamente Nós seremos seus guardiões' (Alcorão 15:9). É preservado em sua forma original há mais de 1400 anos.",
    },
    {
      id: 18,
      question: "Qual é o significado da palavra 'Islam'?",
      options: ["Fé", "Submissão a Deus", "Paz", "Oração"],
      correctAnswer: 1,
      explanation:
        "'Islam' vem da raiz árabe 's-l-m' que significa paz, pureza, submissão e obediência. No contexto religioso, significa submissão à vontade de Allah. O Alcorão diz: 'Certamente, a religião [aprovada] perante Allah é o Islam [submissão a Ele]' (Alcorão 3:19). Um muçulmano é aquele que se submete pacificamente a Allah.",
    },
    {
      id: 19,
      question:
        "Quantas vezes o Hajj deve ser realizado na vida?",
      options: [
        "Sempre que possível",
        "Uma vez (se tiver condições)",
        "Anualmente",
        "Nunca é obrigatório",
      ],
      correctAnswer: 1,
      explanation:
        "O Hajj é obrigatório uma vez na vida para quem tem condições físicas e financeiras. O Profeta Muhammad (paz e benção de Allah estejam com ele) disse: 'Ó pessoas! Allah prescreveu o Hajj sobre vocês, então realizem o Hajj'. Um homem perguntou: 'Todo ano, ó Mensageiro de Allah?' Ele respondeu: 'Se eu dissesse sim, seria obrigatório [todo ano]... [mas é obrigatório] uma vez' (Sahih Muslim 1337).",
    },
    {
      id: 20,
      question: "O que é a Mesquita?",
      options: [
        "Um livro sagrado",
        "Lugar de oração dos muçulmanos",
        "Uma celebração",
        "Um tipo de jejum",
      ],
      correctAnswer: 1,
      explanation:
        "A mesquita (Masjid em árabe, que significa 'lugar de prostração') é o local de adoração dos muçulmanos. O Profeta Muhammad (paz esteja com ele) disse: 'As mesquitas são as casas de Allah na terra, e é direito do Hóspede honrar o convidado' (Al-Bayhaqi). As mesquitas servem como centros comunitários para oração, estudo e reuniões sociais.",
    },
    // NÍVEL 2 - INTERMEDIÁRIO (Perguntas 21-25)
    {
      id: 21,
      question:
        "Em qual país se localizam as cidades sagradas de Meca e Medina?",
      options: [
        "Egito",
        "Arábia Saudita",
        "Jordânia",
        "Emirados Árabes Unidos",
      ],
      correctAnswer: 1,
      explanation:
        "Meca e Medina estão na Arábia Saudita. Meca é onde está a Kaaba e onde o Profeta nasceu. Medina (anteriormente Yathrib) é para onde o Profeta migrou (Hijra) e onde está enterrado. Estas duas cidades são tão sagradas que não-muçulmanos não podem entrar nelas. São os destinos mais importantes do mundo islâmico.",
    },
    {
      id: 22,
      question:
        "Qual é o nome do calendário seguido pelos muçulmanos para datas religiosas?",
      options: [
        "Calendário Gregoriano",
        "Calendário Hijri / Lunar",
        "Calendário Persa",
        "Calendário Solar",
      ],
      correctAnswer: 1,
      explanation:
        "O Calendário Hijri (ou Islâmico) é lunar, com 354-355 dias por ano. Começou com a Hijra (migração) do Profeta de Meca para Medina em 622 EC. O Profeta disse: 'O tempo voltou à sua forma original como era quando Allah criou os céus e a terra' (Sahih al-Bukhari 4662). Por isso, o Ramadã e outras datas islâmicas se movem cerca de 11 dias mais cedo a cada ano no calendário solar.",
    },
    {
      id: 23,
      question:
        "Qual destas é a maior mesquita do mundo, localizada em Meca?",
      options: [
        "Masjid an-Nabawi",
        "Masjid al-Haram",
        "Masjid al-Aqsa",
        "Masjid Sultan Ahmed",
      ],
      correctAnswer: 1,
      explanation:
        "Masjid al-Haram (Mesquita Sagrada) em Meca é a maior mesquita do mundo, abrangendo 356.000 m² e comportando 4 milhões de fiéis. A Kaaba está em seu centro. O Profeta disse: 'Uma oração aqui vale 100.000 orações em qualquer outra mesquita' (Sunan Ibn Majah 1406). Tem 9 minaretes e 210 portas. É expandida continuamente para acomodar peregrinos.",
    },
    {
      id: 24,
      question:
        "Qual é o nome do festival que marca o fim do jejum do Ramadã?",
      options: [
        "Eid al-Adha",
        "Eid al-Fitr",
        "Mawlid",
        "Laylat al-Qadr",
      ],
      correctAnswer: 1,
      explanation:
        "Eid al-Fitr (Festival da Quebra do Jejum) celebra o fim do Ramadã no 1º dia de Shawwal. O Profeta (paz esteja com ele) estabeleceu este dia de alegria e agradecimento. Muçulmanos realizam oração especial pela manhã, dão Zakat al-Fitr (caridade obrigatória), vestem roupas novas, visitam familiares, perdoam-se mutuamente e compartilham refeições festivas. É proibido jejuar neste dia.",
    },
    {
      id: 25,
      question:
        "Qual cidade foi o centro do conhecimento durante a Idade de Ouro, abrigando a 'Casa da Sabedoria'?",
      options: ["Cairo", "Bagdá", "Damasco", "Córdoba"],
      correctAnswer: 1,
      explanation:
        "Bagdá, sob o Califado Abássida (séculos 8-13), abrigou a Bayt al-Hikmah (Casa da Sabedoria), fundada pelo Califa Al-Ma'mun. Era uma biblioteca, academia de tradução e centro de pesquisa onde estudiosos de todas as religiões trabalhavam juntos. Textos gregos, persas e indianos foram traduzidos para o árabe. Foi a era de ouro da ciência, matemática, astronomia, medicina e filosofia islâmicas.",
    },
    // NÍVEL 3 - AVANÇADO (Perguntas 26-30)
    {
      id: 26,
      question:
        "Quem foi o arquiteto do império otomano responsável por mesquitas famosas como a Selimiye?",
      options: [
        "Ibn al-Haytham",
        "Mimar Sinan",
        "Al-Khwarizmi",
        "Al-Biruni",
      ],
      correctAnswer: 1,
      explanation:
        "Mimar Sinan (1489-1588) foi o maior arquiteto otomano. Projetou mais de 300 estruturas, incluindo a Mesquita Süleymaniye e a Mesquita Selimiye (considerada sua obra-prima). Suas mesquitas combinam grandiosidade, inovação estrutural e harmonia estética. Revolucionou a arquitetura islâmica ao criar cúpulas enormes sustentadas por pilares minimalistas, criando espaços amplos e iluminados naturalmente.",
    },
    {
      id: 27,
      question:
        "Qual é o nome da mesquita em Medina que contém o túmulo do Profeta Muhammad?",
      options: [
        "Masjid al-Haram",
        "Masjid an-Nabawi",
        "Masjid Quba",
        "Masjid al-Qiblatain",
      ],
      correctAnswer: 1,
      explanation:
        "Masjid an-Nabawi (Mesquita do Profeta) foi construída pelo próprio Profeta após a Hijra. Ele disse: 'Uma oração na minha mesquita é melhor que mil orações em qualquer outra, exceto a Mesquita Sagrada' (Sahih al-Bukhari 1190). Seu túmulo está sob a Cúpula Verde. É o segundo local mais sagrado do Islam. Visitá-la não é obrigatório, mas altamente recomendado ao fazer Hajj ou Umrah.",
    },
    {
      id: 28,
      question:
        "Em qual cidade se localiza a Alhambra, um dos maiores exemplos de arquitetura islâmica na Europa?",
      options: [
        "Sevilha, Espanha",
        "Granada, Espanha",
        "Lisboa, Portugal",
        "Palermo, Itália", 
      ],
      correctAnswer: 1,
      explanation:
        "A Alhambra fica em Granada, Espanha. Foi construída pela dinastia Nasrida (séculos 13-14) durante Al-Andalus (Espanha Islâmica). É um complexo palaciano com jardins exuberantes, fontes, arabescos intrincados e caligrafia alcorânica. Representa o auge da arte e arquitetura islâmica na Europa. A palavra 'Alhambra' vem do árabe 'Al-Hamra' (A Vermelha) devido às suas muralhas avermelhadas.",
    },
    {
      id: 29,
      question:
        "Qual califa fundou a cidade de Cairo, no Egito?",
      options: [
        "Umar ibn al-Khattab",
        "Os Fatímidas / Al-Mu'izz",
        "Salahuddin Al-Ayyubi",
        "Harun al-Rashid",
      ],
      correctAnswer: 1,
      explanation:
        "O Cairo foi fundado em 969 EC pelo general Jawhar al-Siqilli, a mando do Califa Fatímida Al-Mu'izz li-Din Allah. O nome 'Al-Qahira' significa 'A Vitoriosa'. Foi planejada como capital do Califado Fatímida. Tornou-se centro de aprendizado islâmico com a Universidade Al-Azhar (fundada em 970 EC, ainda funcionando hoje). O Cairo foi estrategicamente localizado perto do Nilo, facilitando comércio e defesa.",
    },
    {
      id: 30,
      question:
        "Qual é a importância histórica da Mesquita de Al-Qarawiyyin em Marrocos?",
      options: [
        "Mesquita mais antiga",
        "Universidade mais antiga do mundo ainda em funcionamento",
        "Mesquita mais alta",
        "Primeira mesquita na África",
      ],
      correctAnswer: 1,
      explanation:
        "A Universidade de Al-Qarawiyyin em Fez, Marrocos, fundada em 859 EC por Fatima al-Fihri, é reconhecida pelo Guinness World Records como a universidade mais antiga em operação contínua. Funcionava como mesquita e instituição educacional oferecendo graus em teologia, direito, matemática, astronomia e medicina. Atraía estudiosos de todo o mundo, incluindo o Papa Silvestre II que lá estudou matemática árabe.",
    },
  ],

  // As 5 novas categorias serão implementadas gradualmente
  // Para demonstração, adicionando estruturas básicas
  seerah: [
    // NÍVEL 1 - BÁSICO (Perguntas 1-5)
    {
      id: 1,
      question:
        "Em que ano nasceu o Profeta Muhammad (paz esteja com ele)?",
      options: [
        "A) 570 d.C. (Ano do Elefante)",
        "B) 600 d.C.",
        "C) 550 d.C.",
        "D) 610 d.C.",
      ],
      correctAnswer: 0,
      explanation:
        "O Profeta Muhammad (paz esteja com ele) nasceu em 570 d.C., no ano conhecido como 'Ano do Elefante', quando Abraha tentou destruir a Kaaba com um exército que incluía elefantes. Allah protegeu a Kaaba enviando pássaros (Ababil) que jogaram pedras de argila ardente. Allah menciona este evento: 'Não viste como teu Senhor tratou os companheiros do Elefante?' (Alcorão 105:1). Ibn Ishaq e outros historiadores confirmam esta data.",
    },
    {
      id: 2,
      question:
        "Qual era o nome da mãe do Profeta Muhammad (paz esteja com ele)?",
      options: [
        "A) Khadija",
        "B) Aminah",
        "C) Fatimah",
        "D) Aisha",
      ],
      correctAnswer: 1,
      explanation:
        "Aminah bint Wahb foi a mãe do Profeta Muhammad (paz esteja com ele). Ela faleceu quando ele tinha apenas 6 anos de idade, em Al-Abwa, durante uma viagem de retorno de Medina. Ibn Sa'd relata em 'At-Tabaqat al-Kubra' que ela era conhecida por sua nobreza e piedade. O Profeta (saws) visitou seu túmulo anos depois e chorou, dizendo: 'Visitei o túmulo de minha mãe e pedi permissão ao meu Senhor para pedir perdão por ela, mas não me foi permitido' (Sahih Muslim 976).",
    },
    {
      id: 3,
      question:
        "Quantos anos tinha o Profeta Muhammad (paz esteja com ele) quando recebeu a primeira revelação?",
      options: [
        "A) 30 anos",
        "B) 40 anos",
        "C) 25 anos",
        "D) 50 anos",
      ],
      correctAnswer: 1,
      explanation:
        "O Profeta Muhammad (paz esteja com ele) tinha 40 anos quando recebeu a primeira revelação na Caverna de Hira. Aisha (que Allah esteja satisfeito com ela) narrou: 'A primeira coisa que começou para o Mensageiro de Allah foi os sonhos verdadeiros... então o isolamento se tornou querido para ele e ele costumava ir à caverna de Hira onde adorava (Allah) continuamente por vários dias' (Sahih al-Bukhari 3). Este evento ocorreu durante o mês de Ramadã, como Allah diz: 'O mês de Ramadã em que foi revelado o Alcorão' (Alcorão 2:185).",
    },
    {
      id: 4,
      question:
        "Qual foi a primeira palavra revelada ao Profeta Muhammad (paz esteja com ele)?",
      options: [
        "A) Alhamdulillah",
        "B) Bismillah",
        "C) Iqra (Leia)",
        "D) Qul (Diga)",
      ],
      correctAnswer: 2,
      explanation:
        "'Iqra' (Leia/Recite) foi a primeira palavra revelada. Allah diz: 'Leia em nome do seu Senhor que criou' (Alcorão 96:1). Esta foi a primeira revelação que o Anjo Jibril (Gabriel) trouxe ao Profeta na Caverna de Hira. Ibn Abbas narrou que o Profeta disse: 'Eu não sei ler', e o Anjo o abraçou fortemente três vezes antes de revelar os primeiros cinco versos da Surah Al-Alaq (Sahih al-Bukhari 3).",
    },
    {
      id: 5,
      question:
        "Quem foi a primeira esposa do Profeta Muhammad (paz esteja com ele)?",
      options: [
        "A) Aisha",
        "B) Hafsa",
        "C) Khadija",
        "D) Sawdah",
      ],
      correctAnswer: 2,
      explanation:
        "Khadija bint Khuwaylid foi a primeira esposa do Profeta Muhammad (paz esteja com ele). Eles se casaram quando ele tinha 25 anos e ela 40 anos. Ela foi a primeira pessoa a acreditar nele e apoiá-lo quando recebeu a revelação. O Profeta (saws) disse sobre ela: 'Ela acreditou em mim quando as pessoas me rejeitaram, ela me apoiou com sua riqueza quando as pessoas me privaram' (Musnad Ahmad). Permaneceram casados por 25 anos até a morte dela, e ele nunca se casou com outra mulher durante a vida de Khadija.",
    },

    // NÍVEL 2 - INTERMEDIÁRIO (Perguntas 6-10)
    {
      id: 6,
      question:
        "Qual é o nome da migração do Profeta (paz esteja com ele) de Meca para Medina?",
      options: ["A) Isra", "B) Miraj", "C) Hijrah", "D) Umrah"],
      correctAnswer: 2,
      explanation:
        "Hijrah (migração) é o nome dado à mudança do Profeta e dos muçulmanos de Meca para Medina em 622 d.C. Este evento foi tão significativo que marca o início do calendário islâmico. Allah diz: 'Se vocês não o ajudarem, [saibam que] Allah o ajudou quando os descrentes o expulsaram, sendo ele o segundo de dois, quando estavam na caverna' (Alcorão 9:40), referindo-se à sua estadia na Caverna de Thawr com Abu Bakr durante a Hijrah. Ibn Kathir documenta em sua Seerah que esta migração estabeleceu o primeiro estado islâmico.",
    },
    {
      id: 7,
      question:
        "Qual batalha foi a primeira grande vitória militar dos muçulmanos?",
      options: [
        "A) Batalha de Uhud",
        "B) Batalha de Badr",
        "C) Batalha de Khandaq",
        "D) Conquista de Meca",
      ],
      correctAnswer: 1,
      explanation:
        "A Batalha de Badr (624 d.C.) foi a primeira grande vitória, onde 313 muçulmanos derrotaram cerca de 1.000 coraixitas. Allah diz: 'E Allah já os havia ajudado em Badr quando vocês eram fracos' (Alcorão 3:123). O Profeta (saws) disse sobre os participantes de Badr: 'Talvez Allah tenha olhado para o povo de Badr e disse: Façam o que quiserem, pois Eu já os perdoei' (Sahih al-Bukhari 3983). Esta batalha ocorreu no 17º dia de Ramadã.",
    },
    {
      id: 8,
      question:
        "Quantos filhos o Profeta Muhammad (paz esteja com ele) teve?",
      options: ["A) 5", "B) 7", "C) 9", "D) 3"],
      correctAnswer: 1,
      explanation:
        "O Profeta (paz esteja com ele) teve 7 filhos: 3 filhos (Al-Qasim, Abdullah e Ibrahim) e 4 filhas (Zainab, Ruqayyah, Umm Kulthum e Fatimah). Todos de Khadija, exceto Ibrahim que foi de Maria, a copta. Anas ibn Malik narrou sobre Ibrahim: 'Quando Ibrahim, o filho do Profeta, morreu, o Mensageiro de Allah disse: Há uma ama de leite para ele no Paraíso' (Sahih al-Bukhari 1383). Apenas Fatimah sobreviveu após sua morte.",
    },
    {
      id: 9,
      question:
        "Qual evento milagroso aconteceu com o Profeta (paz esteja com ele) em uma única noite, viajando de Meca a Jerusalém e depois ao céu?",
      options: [
        "A) Hijrah",
        "B) Isra e Miraj",
        "C) Conquista de Meca",
        "D) Tratado de Hudaybiyyah",
      ],
      correctAnswer: 1,
      explanation:
        "Isra e Miraj foi a jornada noturna milagrosa onde o Profeta viajou de Meca a Jerusalém (Isra) e depois ascendeu aos céus (Miraj). Allah diz: 'Glorificado seja Aquele que levou Seu servo numa jornada noturna da Mesquita Sagrada à Mesquita Al-Aqsa' (Alcorão 17:1). Durante o Miraj, as cinco orações diárias foram prescritas. Ibn Abbas narrou detalhes desta jornada em Sahih al-Bukhari (349). Ocorreu antes da Hijrah.",
    },
    {
      id: 10,
      question:
        "Qual era o apelido (Kunyah) do Profeta Muhammad (paz esteja com ele)?",
      options: [
        "A) Abu Bakr",
        "B) Abu Al-Qasim",
        "C) Abu Abdullah",
        "D) Abu Ibrahim",
      ],
      correctAnswer: 1,
      explanation:
        "O Profeta era conhecido como 'Abu Al-Qasim' (pai de Al-Qasim), nomeado após seu primeiro filho, Al-Qasim. Anas ibn Malik narrou: 'O Profeta estava no mercado quando um homem o chamou: Ó Abu Al-Qasim! O Profeta se virou para ele. O homem disse: Eu estava chamando outra pessoa. O Profeta disse: Dê-se o meu nome, mas não use a minha kunyah' (Sahih al-Bukhari 6190). Al-Qasim morreu ainda criança em Meca.",
    },

    // NÍVEL 3 - AVANÇADO (Perguntas 11-15)
    {
      id: 11,
      question:
        "Quantos anos durou a missão profética do Profeta Muhammad (paz esteja com ele)?",
      options: [
        "A) 20 anos",
        "B) 23 anos",
        "C) 25 anos",
        "D) 30 anos",
      ],
      correctAnswer: 1,
      explanation:
        "A missão profética durou 23 anos: 13 anos em Meca e 10 anos em Medina. Ibn Abbas narrou: 'O Profeta permaneceu em Meca por treze anos recebendo a revelação, depois lhe foi ordenado migrar, e permaneceu em Medina por dez anos. Ele morreu aos 63 anos' (Sahih al-Bukhari 3902). A revelação começou quando ele tinha 40 anos e continuou até sua morte aos 63 anos. Durante este período, o Alcorão completo foi revelado gradualmente.",
    },
    {
      id: 12,
      question:
        "Qual tratado de paz o Profeta (paz esteja com ele) assinou com os coraixitas de Meca?",
      options: [
        "A) Tratado de Medina",
        "B) Tratado de Hudaybiyyah",
        "C) Pacto de Aqabah",
        "D) Tratado de Tabuk",
      ],
      correctAnswer: 1,
      explanation:
        "O Tratado de Hudaybiyyah foi assinado em 628 d.C. (6 AH). Embora parecesse desvantajoso inicialmente, Allah o chamou de 'vitória manifesta': 'Na verdade, concedemos-te uma vitória evidente' (Alcorão 48:1). Al-Bara narrou: 'Vocês consideram a conquista de Meca como vitória, enquanto nós consideramos o Tratado de Hudaybiyyah como a verdadeira vitória' (Sahih al-Bukhari 4148). Este tratado levou a muitas conversões ao Islam e pavimentou o caminho para a conquista pacífica de Meca dois anos depois.",
    },
    {
      id: 13,
      question:
        "Em que ano ocorreu a Conquista de Meca (Fath Makkah)?",
      options: [
        "A) 6 AH / 628 d.C.",
        "B) 8 AH / 630 d.C.",
        "C) 10 AH / 632 d.C.",
        "D) 5 AH / 627 d.C.",
      ],
      correctAnswer: 1,
      explanation:
        "A Conquista de Meca ocorreu em 8 AH (630 d.C.) no mês de Ramadã. O Profeta entrou em Meca pacificamente com 10.000 muçulmanos. Ibn Abbas narrou: 'Allah conquistou Meca através de Seu Mensageiro no ano 8 da Hijrah' (Sahih al-Bukhari 4280). O Profeta demonstrou clemência extraordinária, perdoando a maioria de seus antigos inimigos e declarando: 'Vão, vocês estão livres' (Ibn Hisham, Seerah). Allah diz: 'Quando vier a ajuda de Allah e a vitória' (Alcorão 110:1), referindo-se a este evento.",
    },
    {
      id: 14,
      question:
        "Qual foi o último sermão público do Profeta (paz esteja com ele)?",
      options: [
        "A) Sermão de Arafah",
        "B) Sermão da Despedida",
        "C) Sermão de Ghadir Khumm",
        "D) Sermão de Medina",
      ],
      correctAnswer: 1,
      explanation:
        "O Sermão da Despedida (Khutbat al-Wada) foi proferido durante sua última peregrinação em 632 d.C. (10 AH) no Monte Arafah. O Profeta disse: 'Ó pessoas! Ouçam-me com atenção, pois não sei se voltarei a me encontrar com vocês neste lugar após este ano'. Ele enfatizou a igualdade: 'Não há superioridade de um árabe sobre um não-árabe, nem de um não-árabe sobre um árabe... exceto pela piedade' (Musnad Ahmad 22391). Cerca de 124.000 muçulmanos testemunharam este sermão histórico.",
    },
    {
      id: 15,
      question:
        "Em que mês e ano (islâmico) o Profeta Muhammad (paz esteja com ele) faleceu?",
      options: [
        "A) Ramadã, 11 AH",
        "B) Rabi al-Awwal, 11 AH",
        "C) Muharram, 11 AH",
        "D) Dhul-Hijjah, 10 AH",
      ],
      correctAnswer: 1,
      explanation:
        "O Profeta (paz esteja com ele) faleceu em 12 de Rabi al-Awwal, 11 AH (8 de junho de 632 d.C.) aos 63 anos de idade. Anas ibn Malik narrou: 'Quando o Mensageiro de Allah morreu, Medina nunca foi tão iluminada como no dia em que ele entrou nela, e nunca ficou tão escura como no dia em que ele morreu' (Sunan Ibn Majah 1631). Ele foi enterrado em seu quarto em Medina, onde hoje está a Mesquita do Profeta. Aisha narrou seus últimos momentos em Sahih al-Bukhari (4448).",
    },
  ],
  mulheres: [
    // NÍVEL 1 - BÁSICO (Perguntas 1-5)
    {
      id: 1,
      question:
        "Quem foi a primeira pessoa a aceitar o Islam e apoiar o Profeta Muhammad (saws) após a primeira revelação?",
      options: [
        "Aisha bint Abu Bakr",
        "Khadija bint Khuwaylid",
        "Sumayya bint Khayyat",
        "Fátima al-Zahra",
      ],
      correctAnswer: 1,
      explanation:
        "Khadija foi a primeira pessoa a crer na mensagem. Quando o Profeta recebeu a revelação, ela o confortou dizendo: 'Por Allah, Ele nunca te humilhará. Tu unes os laços de parentesco e dizes a verdade'. O Profeta (saws) disse mais tarde sobre ela: Ela acreditou em mim quando as pessoas me rejeitaram e me confortou com sua riqueza quando as pessoas me privaram '(Relatado em Ahmad e Swahih Al-Bukhari)'",
    },
    {
      id: 2,
      question:
        "Qual mulher é mencionada no Alcorão como um exemplo eterno de fé por sua pureza e por ter sido escolhida por Allah para ser a mãe do Profeta Isa (Jesus)?",
      options: ["Asiya", "Sarah", "Mariam (Maria)", "Hajar"],
      correctAnswer: 2,
      explanation:
        "Mariam é a única mulher mencionada pelo nome no Alcorão, que dedica uma Surata inteira a ela. O Alcorão afirma: E quando os anjos disseram: 'Ó Mariam! Em verdade, Allah te escolheu e te purificou; Ele te escolheu acima de todas as mulheres da humanidade (Al-Imran 3:42).",
    },
    {
      id: 3,
      question:
        "Qual filha do Profeta Muhammad (saws) é descrita na Sunnah como a 'Líder das mulheres do Paraíso' e era profundamente amada por ele?",
      options: [
        "Zainab",
        "Ruqayyah",
        "Fatima al-Zahra",
        "Umm Kulthum",
      ],
      correctAnswer: 2,
      explanation:
        "Fatima tinha uma conexão espiritual única com o pai. O Profeta Muhammad (saws) disse explicitamente: 'Fatima é uma parte de mim, e quem quer que a irrite, me irrita'. Em outro Hadith, ele disse: 'Ó Fatima, não ficarias satisfeita em ser a líder das mulheres dos crentes?' (Sahih Al-Bukhari 3623, 3624)",
    },
    {
      id: 4,
      question:
        "Quem foi a esposa do Faraó que, apesar de viver em um palácio de tirania, aceitou a fé e é citada no Alcorão como exemplo para os fiéis?",
      options: ["Nefertiti", "Asiya", "Zulaikha", "Bilqis"],
      correctAnswer: 1,
      explanation:
        "Asiya escolheu a fé em vez das riquezas do mundo. O Alcorão registra sua súplica enquanto era torturada: 'E Allah propõe, como exemplo para os fiéis, a mulher do Faraó', que disse: 'Senhor meu, edifica-me junto a Ti uma morada no Paraíso, livra-me do Faraó e das suas ações' (Al-Tahrim 66:11).",
    },
    {
      id: 5,
      question:
        "Qual mulher é destacada no Alcorão por sua sabedoria ao governar o reino de Sabá e, após reconhecer a verdade através de Sulaiman (Salomão), submeteu-se a Allah?",
      options: [
        "A esposa do Faraó",
        "Bilqis (Rainha de Sabá)",
        "A mãe de Musa",
        "A irmã de Musa",
      ],
      correctAnswer: 1,
      explanation:
        "O Alcorão descreve como ela foi prudente ao evitar a guerra e buscar o conhecimento. Ao aceitar o monoteísmo, ela declarou conforme o versículo: 'Senhor meu, em verdade fui injusta comigo mesma e agora me submeto, com Sulaiman, a Allah, Senhor do Universo' (Alcorão, Surata Al-Naml 27:44)",
    },
    // NÍVEL 2 - INTERMEDIÁRIO (Perguntas 6-10)
    {
      id: 6,
      question:
        "Qual companheira (Sahabiya) é conhecida por sua coragem ao defender fisicamente o Profeta Muhammad (saws) na Batalha de Uhud?",
      options: [
        "Aisha bint Abu Bakr",
        "Nusaybah bint Ka'b (Umm Umarah)",
        "Umm Salama",
        "Fatima al-Zahra",
      ],
      correctAnswer: 1,
      explanation:
        "Nusaybah bint Ka'b protegeu o Profeta com sua espada e arco quando muitos haviam recuado. O Profeta Muhammad (saws) disse sobre ela naquele dia: 'Para onde quer que eu olhasse, à direita ou à esquerda, eu a via lutando em minha defesa'. (Relatado em Al-Dhahabi, Siyar A'lam al-Nubala).",
    },
    {
      id: 7,
      question:
        "Qual foi a primeira pessoa a ser martirizada por se recusar a abandonar a fé no Islam durante as perseguições em Meca?",
      options: [
        "A) Khadija bint Khuwaylid",
        "B) Sumayyah bint Khayyat",
        "C) Asma bint Abu Bakr",
        "D) Umm Ayman",
      ],
      correctAnswer: 1,
      explanation:
        "Sumayyah foi morta por Abu Jahl por sua persistência na fé. O Profeta (saws) passava por ela e sua família enquanto eram torturados e dizia: ‘Paciência, ó família de Yasir, pois o vosso destino é o Paraíso’. (Al-Mu'jam al-Awsat de al-Tabarani).",
    },
    {
      id: 8,
      question:
        "Qual esposa do Profeta Muhammad (saws) era conhecida por sua sabedoria política ao aconselhá-lo durante o difícil momento do Tratado de Hudaybiyyah?",
      options: [
        "A) Safiyya bint Huyayy",
        "B) Sawda bint Zam'a",
        "C) Umm Salama",
        "D) Juwayriya bint al-Harith",
      ],
      correctAnswer: 2,
      explanation:
        "Quando os companheiros estavam relutantes em aceitar os termos do tratado, Umm Salama sugeriu que o Profeta saísse e realizasse o seu sacrifício e cortasse o cabelo primeiro. Ao vê-lo fazer isso, todos os companheiros o seguiram imediatamente. Esta história está detalhada no Sahih al-Bukhari (2731).",
    },
    {
      id: 9,
      question:
        "Quem foi a dedicada ama de leite do Profeta Muhammad (saws), que o criou no deserto durante sua primeira infância e é honrada pela história islâmica?",
      options: [
        "A) Amina bint Wahb",
        "B) Halimah al-Sa'diyah",
        "C) Barakah (Umm Ayman)",
        "D) Shifa bint Abdullah",
      ],
      correctAnswer: 1,
      explanation:
        "Halimah cuidou do Profeta quando ele era bebê e sua casa foi repleta de bênçãos (Barakah) durante esse tempo. O Alcorão menciona a prática da amamentação de forma geral: ‘E as mães amamentarão seus filhos durante dois anos inteiros’ (Al-Baqarah 2:233), e a Sunnah detalha o carinho especial que o Profeta sempre demonstrou por Halimah ao reencontrá-la na vida adulta.",
    },
    {
      id: 10,
      question:
        "Qual esposa do Profeta Muhammad (saws) foi a responsável por guardar os manuscritos originais e oficiais do Alcorão após a morte do segundo califa, Umar ibn al-Khattab?",
      options: [
        "A) Aisha bint Abu Bakr",
        "B) Umm Salama",
        "C) Sawda bint Zam'a",
        "D) Hafsa bint Umar",
      ],
      correctAnswer: 3,
      explanation:
        "Hafsa era uma das poucas pessoas alfabetizadas na época e foi a fiel guardiã do Mushaf (o volume escrito do Alcorão). Quando o primeiro khalifa, Abu Bakr, compilou os manuscritos, eles foram passados para Umar e, após a morte deste, ficaram sob os cuidados de Hafsa. O terceiro califa, Uthman, solicitou esse manuscrito original a ela para fazer as cópias oficiais que usamos até hoje. Este fato histórico é amplamente documentado na Sunnah e nos relatos sobre a compilação do Alcorão (Sahih Al-Bukhari 4987).",
    },
    // NÍVEL 3 - AVANÇADO (Perguntas 11-15)
    {
      id: 11,
      question:
        "Qual esposa do Profeta (saws) era conhecida como ‘Mãe dos Pobres’ (Umm al-Masakin) devido à sua extrema generosidade e cuidado com os necessitados antes e durante o Islam?",
      options: [
        "A) Maymuna bint al-Harith",
        "B) Zaynab bint Jahsh",
        "C) Juwayriya bint al-Harith",
        "D) Zaynab bint Khuzayma",
      ],
      correctAnswer: 3,
      explanation:
        "Zaynab bint Khuzayma recebeu este título honorífico ainda no período da Jahiliyyah (antes do Islam) por sua bondade. O Profeta Muhammad (saws) elogiou a sua natureza caritativa. Embora tenha falecido pouco tempo após o casamento com o Profeta, o seu legado de caridade é um exemplo citado na Sunnah como uma forma de alcançar a proximidade com Allah (Relatado em biografias como Ibn Hisham).",
    },
    {
      id: 12,
      question:
        "Quem foi a sábia mulher muçulmana nomeada pelo segundo califa, Umar ibn al-Khattab, para atuar como inspetora oficial de administração e comércio no mercado de Medina?",
      options: [
        "A) Umm Ayman",
        "B) Ash-Shifa bint Abdullah",
        "C) Rufayda al-Aslamia",
        "D) Khawla bint Tha'labah",
      ],
      correctAnswer: 1,
      explanation:
        "Ash-Shifa era extremamente instruída e perita em medicina e escrita. O califa Umar confiava tanto na sua honestidade e intelecto que lhe deu autoridade sobre o mercado de Medina para garantir que as transações fossem justas. A Sunnah registra que o Profeta (saws) a incentivava a ensinar escrita a outras mulheres, como Hafsa, destacando o valor do empoderamento feminino através do conhecimento (Abu Dawood 3887).",
    },
    {
      id: 13,
      question:
        "Qual companheira (Sahabiya) é mencionada indiretamente no Alcorão após ter discutido com o Profeta (saws) sobre uma injustiça conjugal, levando à revelação do início da Surata Al-Mujadilah?",
      options: [
        "A) Asma bint Yazid",
        "B) Fatima bint Qais",
        "C) Khawla bint Tha’labah",
        "D) Hind bint Utbah",
      ],
      correctAnswer: 2,
      explanation:
        "Khawla queixou-se a Allah sobre uma prática de divórcio injusta da época (Zihar). Allah ouviu a sua súplica e revelou: ‘Allah ouviu a palavra daquela que discutia contigo (Muhammad) acerca do seu marido e se queixava a Allah. E Allah ouvia o vosso diálogo...’ (Alcorão 58:1). Este versículo prova que Allah ouve e responde diretamente às preocupações das mulheres.",
    },
    {
      id: 14,
      question:
        "Qual esposa do Profeta Muhammad (saws) é considerada a maior estudiosa do Islam entre as mulheres, sendo uma das principais fontes de Hadiths e transmissora da Sunnah?",
      options: [
        "A) Hafsa bint Umar",
        "B) Umm Salama",
        "C) Aisha bint Abu Bakr",
        "D) Zaynab bint Jahsh",
      ],
      correctAnswer: 2,
      explanation:
        "Aisha (ra) transmitiu mais de 2.210 Hadiths e era consultada pelos maiores companheiros do Profeta em questões de fiqh (jurisprudência) e Sunnah. O próprio Profeta (saws) disse: ‘Tomem metade da vossa religião desta ruivinha (Aisha)’ (Al-Hakim, Al-Mustadrak). Após a morte do Profeta, ela ensinou durante décadas e sua câmara tornou-se uma universidade islâmica, provando que o Islam honra a inteligência e o saber femininos.",
    },
    {
      id: 15,
      question:
        "Qual guerreira muçulmana liderou tropas na batalha de Al-Qadisiyyah e foi uma das primeiras mulheres a ser reconhecida por sua bravura militar no início do Islam?",
      options: [
        "A) Nusaybah bint Ka’b",
        "B) Khawla bint al-Azwar",
        "C) Asma bint Abu Bakr",
        "D) Umm Atiyyah al-Ansariyyah",
      ],
      correctAnswer: 1,
      explanation:
        "Khawla bint al-Azwar foi uma notável guerreira muçulmana do século VII que participou de várias batalhas durante o califado de Abu Bakr e Umar ibn al-Khattab. Na batalha de Al-Qadisiyyah (636 d.C.) e outras campanhas na Síria, ela lutou com tal bravura que inicialmente os soldados pensavam tratar-se de um homem. Quando feita prisioneira pelos Bizantinos, liderou outras mulheres cativas em um levante com ramos de tendas. O Islam reconhece o esforço (jihad) de cada um: ‘Aos homens cabe a recompensa do que ganharam, e às mulheres, a do que ganharam’ (Alcorão 4:32).",
    },
  ],
  ciencia: [
    // NÍVEL 1 - BÁSICO (Perguntas 1-5)
    {
      id: 1,
      question:
        "Qual é o país que possui a maior população muçulmana do mundo atualmente?",
      options: [
        "A)  Arábia Saudita",
        "B) Indonésia",
        "C) Egipto",
        "D) Paquistão",
      ],
      correctAnswer: 1,
      explanation:
        "Embora o Islam tenha surgido na Arábia, a Indonésia é o país com o maior número de muçulmanos (mais de 230 milhões). A prova está nos dados demográficos globais (Pew Research Center), que mostram que a maior parte da população muçulmana vive na região Ásia-Pacífico",
    },
    {
      id: 2,
      question:
        "Qual é o significado literal da palavra 'Alcorão' (Quran) em árabe?",
      options: [
        "A) A Verdade",
        "B) O Livro Sagrado",
        "C) A Lei de Deus",
        "D) A Recitação",
      ],
      correctAnswer: 3,
      explanation:
        "A palavra deriva da raiz árabe qara'a, que significa ler ou recitar. A prova está no próprio Alcorão, na primeira revelação feita ao Profeta Muhammad (saws): ‘Recita (Iqra!) em nome do teu Senhor que criou...’ (Surata Al-Alaq 96:1).",
    },
    {
      id: 3,
      question:
        "Qual destas cidades é considerada a terceira mais sagrada para o Islam, acolhendo a Mesquita de Al-Aqsa?",
      options: [
        "A) Istambul",
        "B) Jerusalém (Al-Quds)",
        "C) Bagdá",
        "D) Cairo",
      ],
      correctAnswer: 1,
      explanation:
        "Jerusalém é o local para onde os muçulmanos se voltavam em oração antes da transição para Meca. O Profeta (saws) disse: ‘Não se deve empreender uma jornada (para orar) exceto para três mesquitas: a Mesquita Sagrada (Meca), a minha Mesquita (Medina) e a Mesquita de Al-Aqsa’ (Sahih Bukhari 1189).",
    },
    {
      id: 4,
      question:
        "Quantos capítulos (Suratas) compõem o Alcorão Sagrado, desde a sua revelação até à sua compilação final?",
      options: ["A) 99", "B) 110", "C) 124", "D) 114"],
      correctAnswer: 3,
      explanation:
        "O Alcorão é composto por 114 Suratas. Esta estrutura foi preservada desde a época da compilação oficial pelos companheiros do Profeta (Sahaba) e é a mesma em todos os exemplares do mundo, sem qualquer alteração.",
    },
    {
      id: 5,
      question:
        "Qual é o nome do calendário lunar utilizado pelos muçulmanos para determinar datas como o Ramadã e o Hajj",
      options: [
        "A) Calendário Hijri",
        "B) Calendário Gregoriano",
        "C) Calendário Solar",
        "D) Calendário Lunar Persa",
      ],
      correctAnswer: 0,
      explanation:
        "O calendário islâmico é chamado de Hijri porque marca o início a partir da Hégira (migração do Profeta para Medina). A prova está no Alcorão: ‘O número de meses para Allah é de doze meses, no Livro de Allah, desde o dia em que Ele criou os céus e a terra’ (Surata At-Tawbah 9:36).",
    },
    // NÍVEL 2 - INTERMEDIÁRIO (Perguntas 6-10)
    {
      id: 6,
      question:
        "Qual científico muçulmano é conhecido como o ‘Pai da Álgebra’ por seus trabalhos matemáticos revolucionários?",
      options: [
        "A) Ibn Sina (Avicena)",
        "B) Al-Khwarizmi",
        "C) Al-Farabi",
        "D) Ibn Rushd (Averróis)",
      ],
      correctAnswer: 1,
      explanation:
        "Al-Khwarizmi (780-850 d.C.) foi o matemático muçulmano que fundou a álgebra com seu livro ‘Al-Kitab al-Mukhtasar fi Hisab al-Jabr wal-Muqabala’. A própria palavra ‘álgebra’ vem de ‘al-jabr’ no título dessa obra. O Islam incentiva o conhecimento: ‘Dize: Terão o mesmo destino os que sabem e os que não sabem?’ (Alcorão 39:9).",
    },
    {
      id: 7,
      question:
        "Qual médico muçulmano medieval escreveu o ‘Cânone da Medicina’, obra que foi usada como livro didático nas universidades europeias por mais de 600 anos?",
      options: [
        "A) Al-Zahrawi",
        "B) Al-Razi (Rhazes)",
        "C) Ibn Sina (Avicena)",
        "D) Ibn al-Nafis",
      ],
      correctAnswer: 2,
      explanation:
        "Ibn Sina (980-1037 d.C.), conhecido no Ocidente como Avicena, escreveu o ‘Al-Qanun fi al-Tibb’ (Cânone da Medicina), uma enciclopédia médica com mais de um milhão de palavras. Esta obra descreveu quarenta e duas doenças, apresentou conceitos de quarentena e higiene, e foi traduzida para latim sendo usada na Europa até o século XVII. O Islam valoriza a cura: ‘Allah não enviou uma doença sem enviar também a sua cura’ (Sahih Bukhari 5678).",
    },
    {
      id: 8,
      question:
        "Qual foi a primeira universidade do mundo a conceder diplomas de maneira formal, fundada por uma mulher muçulmana no século IX?",
      options: [
        "A) Universidade de Bolonha (Itália)",
        "B) Universidade de Al-Qarawiyyin (Marrocos)",
        "C) Universidade de Oxford (Inglaterra)",
        "D) Madraça de Nizamiyyah (Bagdá)",
      ],
      correctAnswer: 1,
      explanation:
        "A Universidade de Al-Qarawiyyin, em Fez (Marrocos), foi fundada em 859 d.C. por Fatima al-Fihri, uma mulher muçulmana. É reconhecida pelo Guinness World Records como a universidade mais antiga em funcionamento contínuo do mundo. O Profeta (saws) disse: ‘Buscar o conhecimento é uma obrigação de todo muçulmano’ (Sunan Ibn Majah 224), e Fatima al-Fihri transformou essa obrigação em realidade para toda a humanidade.",
    },
    {
      id: 9,
      question:
        "Qual astrônomo muçulmano do século IX descobriu que a Terra é redonda e calculou sua circunferência com apenas 200 km de erro em relação ao valor atual?",
      options: [
        "A) Al-Battani",
        "B) Al-Biruni",
        "C) Thabit ibn Qurra",
        "D) Al-Farghani",
      ],
      correctAnswer: 1,
      explanation:
        "Al-Biruni (973-1048 d.C.) calculou a circunferência da Terra em cerca de 40.075 km, enquanto o valor atual é de 40.075 km — uma precisão extraordinária para a época. Ele também estudou o movimento dos planetas e desenvolveu métodos para determinar a direção da Qibla (direção de Meca) de qualquer ponto do globo usando matemática esférica, servindo assim ao Islam e à ciência simultaneamente.",
    },
    {
      id: 10,
      question:
        "Qual é o nome do sistema numérico que os muçulmanos desenvolveram e introduziram na Europa, substituindo os algarismos romanos e sendo usado globalmente até hoje?",
      options: [
        "A) Algarismos Romanos",
        "B) Algarismos Árabes (Sistema Indo-Arábico)",
        "C) Algarismos Gregos",
        "D) Sistema Binário",
      ],
      correctAnswer: 1,
      explanation:
        "Os algarismos que usamos hoje (0, 1, 2, 3... 9) foram sistematizados pelos matemáticos muçulmanos, especialmente Al-Khwarizmi, com base em numerais indianos, e introduzidos na Europa pelos muçulmanos. O conceito do zero como número foi fundamental para o desenvolvimento da matemática moderna. O Alcorão estimula a reflexão e o cálculo: ‘O Sol e a Lua seguem seus cursos calculados’ (Alcorão 55:5).",
    },
    // NÍVEL 3 - AVANÇADO (Perguntas 11-15)
    {
      id: 11,
      question:
        "Al-Zahrawi é amplamente reconhecido como o ‘Pai da Cirurgia Moderna’. Qual foi sua principal contribuição para a medicina no século X?",
      options: [
        "A) A criação do ‘Al-Tasrif’, enciclopédia com mais de 200 instrumentos cirúrgicos e uso do catgut para suturas",
        "B) A descoberta da vacina contra a varíola",
        "C) O desenvolvimento da primeira máquina de anestesia",
        "D) A fundação do primeiro hospital psiquiátrico",
      ],
      correctAnswer: 0,
      explanation:
        "Al-Zahrawi (936-1013 d.C.), conhecido no Ocidente como Abulcasis, escreveu a enciclopédia médica ‘Al-Tasrif’, que incluía um volume inteiramente dedicado à cirurgia com ilustrações detalhadas de mais de 200 instrumentos cirúrgicos que ele mesmo inventou, como fórceps e bisturis. Foi também o primeiro a usar fios de catgut (intestinos de animais) para suturas internas, técnica ainda utilizada. O Islam valoriza a preservação da vida: ‘Quem salva uma vida é como se tivesse salvo toda a humanidade’ (Alcorão 5:32).",
    },
    {
      id: 12,
      question:
        "Qual astrônomo muçulmano do século IX foi o primeiro a calcular com precisão a inclinação do eixo da Terra e os movimentos do Sol, sendo chamado de ‘o Ptolomeu dos árabes’?",
      options: [
        "A) Al-Biruni",
        "B) Ibn al-Haytham",
        "C) Al-Battani (Albategnius)",
        "D) Al-Khwarizmi",
      ],
      correctAnswer: 2,
      explanation:
        "Al-Battani (858-929 d.C.) calculou o ano solar com uma precisão de apenas 2 minutos e 22 segundos de erro. Suas obras foram traduzidas para latim e influenciaram Copérnico, Tycho Brahe e Galileu. O Alcorão convida à observação do cosmos: ‘Não contemplam os céus e a terra e o que Allah criou?’ (Alcorão 7:185), e Al-Battani transformou essa contemplação em ciência rigorosa.",
    },
    {
      id: 13,
      question:
        "Qual cientista muçulmano do século XI é considerado o fundador da óptica moderna por ter descoberto que a visão é causada pela luz que entra nos olhos, e não emitida por eles?",
      options: [
        "A) Al-Kindi",
        "B) Ibn al-Haytham (Alhazen)",
        "C) Al-Farabi",
        "D) Ibn Rushd (Averróis)",
      ],
      correctAnswer: 1,
      explanation:
        "Ibn al-Haytham (965-1040 d.C.), conhecido no Ocidente como Alhazen, revolucionou a ciência com seu ‘Livro da Óptica’ (Kitab al-Manazir). Ele refutou a teoria grega de que os olhos emitem luz e provou experimentalmente que vemos porque a luz reflete nos objetos e entra nos olhos. Também inventou a câmara obscura e desenvolveu o método científico experimental. Sua obra inspirou Leonardo da Vinci e Kepler séculos depois.",
    },
    {
      id: 14,
      question:
        "Qual é o nome da contribuição islâmica medieval que preservou e transmitiu à Europa as obras dos filósofos gregos como Aristóteles, salvando-as do esquecimento durante a Idade das Trevas?",
      options: [
        "A) A Inquisição Espanhola",
        "B) A Reconquista de Toledo",
        "C) A Casa da Sabedoria (Bayt al-Hikmah) de Bagdá",
        "D) O Concílio de Nicéia",
      ],
      correctAnswer: 2,
      explanation:
        "A Casa da Sabedoria (Bayt al-Hikmah), fundada em Bagdá pelo califa Abássida Harun al-Rashid e expandida por Al-Ma’mun (século VIII-IX), foi o maior centro de tradução e pesquisa do mundo medieval. Estudiosos muçulmanos, cristãos e judeus trabalhavam juntos traduzindo obras gregas, persas e indianas para o árabe, e depois o árabe foi traduzido para o latim na Europa. O Alcorão ordena: ‘Lê em nome do teu Senhor que criou’ (Alcorão 96:1), e essa instituição materializou esse mandato divino.",
    },
    {
      id: 15,
      question:
        "Ibn Khaldun, pensador muçulmano do século XIV, é considerado o precursor de qual área do conhecimento moderno por sua análise das civilizações e sociedades na obra ‘Al-Muqaddimah’?",
      options: [
        "A) Física e Astronomia",
        "B) Medicina e Biologia",
        "C) Sociologia e Filosofia da História",
        "D) Geometria e Álgebra",
      ],
      correctAnswer: 2,
      explanation:
        "Ibn Khaldun (1332-1406 d.C.) escreveu ‘Al-Muqaddimah’ (A Introdução), onde analisou os ciclos das civilizações, o conceito de ‘Asabiyyah’ (coesão social), e os fatores econômicos e sociais que determinam a ascensão e queda dos impérios. É considerado o pai da Sociologia, da Economia e da Historiografia científica, sendo citado por Arnold Toynbee como ‘o maior trabalho da sua espécie’. O Islam encoraja a reflexão histórica: ‘Viajeis pela terra e observai como foram o fim daqueles que os precederam’ (Alcorão 12:109).",
    },
  ],
  akhlaq: [
    // NÍVEL 1 - BÁSICO (Perguntas 1-5)
    {
      id: 1,
      question:
        "De acordo com os ensinamentos islâmicos, qual é a melhor forma de cumprimentar outro muçulmano ao encontrá-lo?",
      options: [
        "A)  Assalamu Alaikum",
        "B) Bom dia",
        "C) Olá, tudo bem",
        "D) Apenas um aceno",
      ],
      correctAnswer: 0,
      explanation:
        "Assalamu Alaikum significa 'A paz de Allah esteja convosco'. O Alcorão diz: 'Quando fordes saudados com uma saudação, saudai com outra melhor ou retribui-a' (Surata An-Nisa 4:86).",
    },
    {
      id: 2,
      question:
        "A quem o Islam ensina que devemos o maior respeito, obediência e cuidado, logo após a adoração a Allah?",
      options: [
        "A) Aos amigos",
        "B) Aos chefes de trabalho",
        "C) Aos pais",
        "D) As visinhos distantes",
      ],
      correctAnswer: 2,
      explanation:
        "Allah diz no Alcorão: 'O teu Senhor decretou que não adoreis senão a Ele e que sejais bondosos com os vossos pais' (Surata Al-Isra 17:23).",
    },
    {
      id: 3,
      question:
        "O que o Profeta Muhammad (S.A.W) disse sobre aquele que não é misericordioso com os animais?",
      options: [
        "A) Que não faz diferença",
        "B) Que não receberá a misericórdia de Allah",
        "C) Que os animais não sentem dor",
        "D) Que é permitido maltratá-los se necessário",
      ],
      correctAnswer: 1,
      explanation:
        "O Islam proíbe qualquer crueldade animal. Há relatos de pessoas que ganharam o Paraíso por dar água a um cão sedento e pessoas punidas por maltratar gatos",
    },
    {
      id: 4,
      question:
        "Qual é a regra de ouro do comportamento islâmico em relação ao próximo?",
      options: [
        "A) Pensar apenas no seu próprio sucesso",
        "B) Ignorar quem precisa de ajuda",
        "C) Falar bem apenas de quem fala bem de você",
        "D) Desejar para o irmão o que deseja para si mesmo",
      ],
      correctAnswer: 3,
      explanation:
        "O Profeta (S.A.W) disse: 'Nenhum de vós crerá verdadeiramente até que deseje para seu irmão o que deseja para si próprio' (Sahih Bukhari)",
    },
    {
      id: 5,
      question:
        "Qual é a importância de manter a limpeza do corpo e do ambiente no Islam",
      options: [
        "A) A limpeza é metade da fé (Iman)",
        "B) É apenas uma recomendação estética",
        "C) Só é necessário antes de ir à mesquita",
        "D) Não é importante para a religião",
      ],
      correctAnswer: 0,
      explanation:
        "O calendário islâmico é chamado de Hijri porque marca o início a partir da Hégira (migração do Profeta para Medina). A prova está no Alcorão: ‘O número de meses para Allah é de doze meses, no Livro de Allah, desde o dia em que Ele criou os céus e a terra’ (Surata At-Tawbah 9:36).",
    },
    // NÍVEL 2 - INTERMEDIÁRIO (Perguntas 6-10)
    {
      id: 6,
      question:
        "Como o muçulmano deve reagir quando alguém o insulta ou age com ignorância?",
      options: [
        "A)  Responder com palavras de paz e paciência",
        "B) Responder com um insulto pior",
        "C) Gritar para ser ouvido",
        "D) Guardar rancor para sempre",
      ],
      correctAnswer: 0,
      explanation:
        "O Alcorão descreve os servos do Misericordioso: 'E os servos do Misericordioso são os que andam,mensamente, sobre a terra e, quando os ignorantes lhes dirigem a palavra, dizem: (salam!) 'Paz!' (Surata Al-Furqan 25:63).",
    },
    {
      id: 7,
      question:
        "Qual é o limite ensinado pelo Islam sobre o desperdício de água, mesmo que você esteja à beira de um rio caudaloso?",
      options: [
        "A)  Pode gastar o quanto quiser se houver abundância",
        "B) Só é pecado desperdiçar se a água for paga",
        "C) É proibido desperdiçar qualquer quantidade",
        "D) O desperdício só conta dentro de casa",
      ],
      correctAnswer: 2,
      explanation:
        "O Profeta (S.A.W) proibiu o desperdício mesmo durante a ablução (Wudu) no rio, ensinando a consciência ambiental e a gratidão pelos recursos..",
    },
    {
      id: 8,
      question:
        "O que significa o conceito de 'Amanah' (Confiança) no caráter de um muçulmano?",
      options: [
        "A) Apenas acreditar em Allah",
        "B) Cumprir promessas e devolver o que lhe foi confiado",
        "C) Confiar que tudo vai dar certo sem esforço",
        "D) Guardar segredos apenas de amigos ricos",
      ],
      correctAnswer: 1,
      explanation:
        "Ser confiável (Al-Amin) era a característica principal do Profeta (S.A.W) mesmo antes da revelação. Quebrar uma promessa é um dos sinais de hipocrisia.",
    },
    {
      id: 9,
      question:
        "Em relação à mesa e às refeições, qual é o Adab (etiqueta) ensinado para começar a comer?",
      options: [
        "A) Comer com a mão esquerda",
        "B) Começar a comer antes de todos",
        "C) Criticar a comida se não estiver boa",
        "D) Dizer 'Bismillah' e comer com a mão direita",
      ],
      correctAnswer: 3,
      explanation:
        "O Profeta (S.A.W) ensinou: 'Ó jovem, menciona o nome de Allah, come com a tua mão direita e come do que está à tua frente'.",
    },
    {
      id: 10,
      question:
        "Qual é a importância de visitar os doentes no Islam?",
      options: [
        "A) É um direito do muçulmano sobre o seu irmão",
        "B) É opcional e não traz recompensas",
        "C) Só deve ser feito se o doente for da família",
        "D) É apenas uma formalidade social",
      ],
      correctAnswer: 0,
      explanation:
        "Visitar um enfermo é uma das seis obrigações sociais mencionadas pelo Profeta (saws). Ele disse que quem visita um doente permanece nos jardins do Paraíso até retornar..",
    },

    // NÍVEL 3 - AVANÇADO (Perguntas 11-15)
    {
      id: 11,
      question:
        "Qual é o conceito de 'Ihsan' no comportamento islâmico?",
      options: [
        "A) Fazer tudo como se estivesse vendo Allah, e se não O vê, saber que Ele te vê",
        "B) Apenas fazer o mínimo obrigatório",
        "C) Fazer boas ações apenas quando for visto",
        "D) Competir com outros em riqueza",
      ],
      correctAnswer: 0,
      explanation:
        "Ihsan é a excelência em todas as ações. O Profeta (paz esteja com ele) definiu Ihsan quando o Anjo Jibril perguntou: 'O que é Ihsan?' Ele respondeu: 'É adorar a Allah como se O estivesse vendo, e embora não O vejas, saibas que Ele te vê' (Sahih Muslim 8). Este é o mais alto nível de consciência espiritual, onde cada ação é feita com perfeição. Allah diz: 'Na verdade, Allah ordena a justiça e Ihsan (excelência)' (Alcorão 16:90).",
    },
    {
      id: 12,
      question:
        "Qual é o ensinamento islâmico sobre controlar a raiva (Ghadab)?",
      options: [
        "A) A raiva é sinal de força e masculinidade",
        "B) Quem controla a raiva quando tem poder de agir é o verdadeiramente forte",
        "C) É permitido explodir quando se está com razão",
        "D) Deve-se guardar rancor para vingança posterior",
      ],
      correctAnswer: 1,
      explanation:
        "O controle da raiva é uma virtude suprema no Islam. O Profeta (paz esteja com ele) disse: 'O forte não é aquele que vence os outros na luta, mas o forte é aquele que controla a si mesmo quando está com raiva' (Sahih al-Bukhari 6114). Em outra ocasião, um homem pediu conselho repetidamente e o Profeta continuou dizendo: 'Não fique com raiva' (Sahih al-Bukhari 6116). Allah elogia os crentes: 'E aqueles que reprimem a raiva e perdoam as pessoas - Allah ama os que fazem o bem' (Alcorão 3:134).",
    },
    {
      id: 13,
      question:
        "O que é 'Ghiba' (fofoca/difamação) e qual é sua gravidade no Islam?",
      options: [
        "A) É apenas conversa normal entre amigos",
        "B) É mencionar sobre seu irmão algo que ele não gostaria, mesmo sendo verdade",
        "C) Só é proibido se for mentira",
        "D) É permitido se a pessoa nunca souber",
      ],
      correctAnswer: 1,
      explanation:
        "Ghiba (fofoca/calúnia) é um dos pecados graves no Islam. O Profeta (paz esteja com ele) explicou: 'Vocês sabem o que é Ghiba?' Disseram: 'Allah e Seu Mensageiro sabem melhor.' Ele disse: 'É mencionar sobre seu irmão o que ele não gosta.' Foi perguntado: 'E se o que eu disse é verdade?' Ele respondeu: 'Se é verdade, você cometeu Ghiba, e se for mentira, você o caluniou' (Sahih Muslim 2589). Allah compara a Ghiba a comer a carne do irmão morto: 'Gostaria algum de vós comer a carne do seu irmão morto? Certamente o detestaríeis!' (Alcorão 49:12).",
    },
    {
      id: 14,
      question:
        "Qual é a posição do Islam sobre a humildade (Tawadu) e a arrogância (Kibr)?",
      options: [
        "A) A arrogância é aceitável se a pessoa for realmente superior",
        "B) A humildade diminui o valor da pessoa",
        "C) Allah não aceita quem tem um átomo de arrogância no coração",
        "D) Só os pobres devem ser humildes",
      ],
      correctAnswer: 2,
      explanation:
        "A arrogância (Kibr) é um dos pecados mais graves, pois foi o pecado de Iblis (Satanás). O Profeta (paz esteja com ele) disse: 'Não entrará no Paraíso aquele que tiver no coração o peso de um átomo de arrogância' (Sahih Muslim 91). Ele definiu arrogância como: 'Rejeitar a verdade e desprezar as pessoas.' Em contraste, Allah diz: 'E não vires o teu rosto das pessoas por arrogância, nem andes pela terra com insolência. Allah não ama nenhum arrogante presunçoso' (Alcorão 31:18). O Profeta era o mais humilde: 'Certamente és de caráter magnífico' (Alcorão 68:4).",
    },
    {
      id: 15,
      question:
        "Qual é o conceito de 'Sadaqah Jariyah' (caridade contínua) e por que é importante?",
      options: [
        "A) É apenas dar dinheiro aos pobres",
        "B) É uma caridade cujos benefícios continuam após a morte da pessoa",
        "C) É menos importante que outras caridades",
        "D) Só pode ser feita por pessoas ricas",
      ],
      correctAnswer: 1,
      explanation:
        "Sadaqah Jariyah é uma caridade cujas recompensas continuam fluindo mesmo após a morte. O Profeta (paz esteja com ele) disse: 'Quando o ser humano morre, suas ações cessam, exceto três: caridade contínua (Sadaqah Jariyah), conhecimento do qual as pessoas se beneficiam, ou um filho piedoso que reza por ele' (Sahih Muslim 1631). Exemplos incluem: construir mesquitas, poços de água, plantar árvores, ensinar conhecimento útil, etc. Allah diz: 'O exemplo daqueles que gastam sua riqueza no caminho de Allah é como uma semente que produz sete espigas, em cada espiga cem grãos' (Alcorão 2:261).",
    },
  ],
  alcorao: [
    // NÍVEL 1 - BÁSICO (Perguntas 1-5)
    {
      id: 1,
      question:
        "Quantas Surahs (capítulos) tem o Alcorão Sagrado?",
      options: ["A) 100", "B) 114", "C) 120", "D) 99"],
      correctAnswer: 1,
      explanation:
        "O Alcorão Sagrado contém 114 Surahs (capítulos), começando com Al-Fatiha e terminando com An-Nas. O Profeta Muhammad (paz esteja com ele) disse: 'Aquele que recita uma letra do Livro de Allah terá uma boa ação, e cada boa ação é multiplicada por dez' (Tirmidhi 2910). As Surahs variam em tamanho, desde Al-Kawthar com apenas 3 versos até Al-Baqarah com 286 versos.",
    },
    {
      id: 2,
      question:
        "Qual é a primeira Surah (capítulo) do Alcorão?",
      options: [
        "A) Al-Baqarah",
        "B) Al-Ikhlas",
        "C) Al-Fatiha",
        "D) Al-Alaq",
      ],
      correctAnswer: 2,
      explanation:
        "Al-Fatiha (A Abertura) é a primeira Surah do Alcorão. O Profeta (paz esteja com ele) disse: 'A Surah Al-Fatiha é a maior Surah do Alcorão' (Sahih al-Bukhari 4474). Ela contém 7 versos e é recitada em cada unidade (rakat) da oração. Allah diz sobre ela: 'E certamente te demos sete dos versículos repetidos e o grande Alcorão' (Alcorão 15:87), referindo-se a Al-Fatiha.",
    },
    {
      id: 3,
      question:
        "Em qual idioma o Alcorão foi revelado originalmente?",
      options: [
        "A) Persa",
        "B) Hebraico",
        "C) Árabe",
        "D) Aramaico",
      ],
      correctAnswer: 2,
      explanation:
        "O Alcorão foi revelado em árabe puro. Allah diz: 'Na verdade, fizemos dele um Alcorão em árabe para que possam entender' (Alcorão 43:3). Também diz: 'E este é um Livro que fizemos descer, abençoado, confirmando o que estava antes dele' (Alcorão 6:92). O árabe foi escolhido porque era a língua do Profeta Muhammad (paz esteja com ele) e de seu povo, permitindo comunicação clara da mensagem divina.",
    },
    {
      id: 4,
      question:
        "Qual anjo trouxe a revelação do Alcorão ao Profeta Muhammad (paz esteja com ele)?",
      options: [
        "A) Mikail",
        "B) Israfil",
        "C) Jibril (Gabriel)",
        "D) Azrael",
      ],
      correctAnswer: 2,
      explanation:
        "O Anjo Jibril (Gabriel) foi quem trouxe a revelação. Allah diz: 'Diga: Quem é inimigo de Jibril - pois ele fez descer o Alcorão ao seu coração pela permissão de Allah' (Alcorão 2:97). Aisha narrou que o Profeta viu Jibril em sua forma original e ele tinha 600 asas (Sahih al-Bukhari 3232). Jibril era o mensageiro principal de Allah aos profetas ao longo da história.",
    },
    {
      id: 5,
      question: "Durante quantos anos o Alcorão foi revelado?",
      options: [
        "A) 10 anos",
        "B) 23 anos",
        "C) 30 anos",
        "D) 40 anos",
      ],
      correctAnswer: 1,
      explanation:
        "O Alcorão foi revelado gradualmente ao longo de 23 anos (13 anos em Meca e 10 anos em Medina). Allah diz: 'E foi um Alcorão que separamos [em partes] para que possas recitá-lo às pessoas em intervalos. E o revelamos gradualmente' (Alcorão 17:106). Esta revelação gradual permitiu que os muçulmanos compreendessem, memorizassem e aplicassem os ensinamentos progressivamente. Ibn Abbas confirmou este período em Sahih al-Bukhari (3902).",
    },

    // NÍVEL 2 - INTERMEDIÁRIO (Perguntas 6-10)
    {
      id: 6,
      question: "Qual é a Surah mais longa do Alcorão?",
      options: [
        "A) Al-Fatiha",
        "B) Al-Baqarah",
        "C) Al-Imran",
        "D) An-Nisa",
      ],
      correctAnswer: 1,
      explanation:
        "Al-Baqarah (A Vaca) é a Surah mais longa com 286 versos. O Profeta (paz esteja com ele) disse: 'Não transformem suas casas em cemitérios. Satanás foge da casa onde a Surah Al-Baqarah é recitada' (Sahih Muslim 780). Esta Surah contém Ayat al-Kursi (verso do Trono), que o Profeta chamou de maior verso do Alcorão. Foi revelada em Medina e aborda legislação, fé e histórias dos profetas anteriores.",
    },
    {
      id: 7,
      question:
        "Qual verso do Alcorão é conhecido como o maior verso (Ayat al-Kursi)?",
      options: [
        "A) Al-Fatiha 1:1",
        "B) Al-Baqarah 2:255",
        "C) Al-Ikhlas 112:1",
        "D) An-Nas 114:1",
      ],
      correctAnswer: 1,
      explanation:
        "Ayat al-Kursi é Al-Baqarah 2:255. O Profeta (paz esteja com ele) perguntou a Ubayy ibn Ka'b: 'Qual verso no Livro de Allah é o maior?' Ele respondeu: 'Allah e Seu Mensageiro sabem melhor.' Quando repetiu, Ubayy disse: 'Ayat al-Kursi.' O Profeta bateu em seu peito e disse: 'Que o conhecimento seja agradável para você, Ó Abu Mundhir!' (Sahih Muslim 810). Este verso descreve a grandeza e soberania de Allah.",
    },
    {
      id: 8,
      question: "Quantos Juz (partes) tem o Alcorão?",
      options: ["A) 20", "B) 25", "C) 30", "D) 40"],
      correctAnswer: 2,
      explanation:
        "O Alcorão é dividido em 30 Juz (partes iguais) para facilitar a recitação, especialmente durante o Ramadã. Cada Juz contém aproximadamente 20 páginas. Embora esta divisão não seja mencionada no próprio Alcorão, foi estabelecida pelos compiladores para auxiliar a memorização e recitação organizada. Abdullah ibn Amr narrou: 'Recite o Alcorão em um mês' (Sahih al-Bukhari 5052), indicando a prática de dividir a recitação em partes gerenciáveis.",
    },
    {
      id: 9,
      question:
        "Qual Surah é conhecida como o 'coração do Alcorão'?",
      options: [
        "A) Al-Fatiha",
        "B) Ya-Sin",
        "C) Al-Mulk",
        "D) Ar-Rahman",
      ],
      correctAnswer: 1,
      explanation:
        "Surah Ya-Sin (capítulo 36) é chamada de 'coração do Alcorão'. O Profeta (paz esteja com ele) disse: 'Tudo tem um coração, e o coração do Alcorão é Ya-Sin. Quem recitar Ya-Sin, Allah escreverá para ele a recompensa de recitar o Alcorão dez vezes' (Tirmidhi 2887). Esta Surah aborda temas centrais do Islam: profecia, ressurreição, unicidade de Allah e sinais da criação. Foi revelada em Meca.",
    },
    {
      id: 10,
      question:
        "Qual foi a última Surah completa revelada ao Profeta Muhammad (paz esteja com ele)?",
      options: [
        "A) Al-Fatiha",
        "B) An-Nasr",
        "C) Al-Ikhlas",
        "D) Al-Falaq",
      ],
      correctAnswer: 1,
      explanation:
        "Surah An-Nasr (110) foi a última Surah completa revelada. Ibn Abbas narrou que quando esta Surah foi revelada, o Profeta soube que sua morte estava próxima (Sahih al-Bukhari 4970). A Surah diz: 'Quando vier a ajuda de Allah e a vitória, e vires as pessoas entrarem na religião de Allah em multidões, então glorifique os louvores do seu Senhor e peça Seu perdão. Na verdade, Ele é o Aceitador do arrependimento' (Alcorão 110:1-3). Foi revelada após a conquista de Meca.",
    },

    // NÍVEL 3 - AVANÇADO (Perguntas 11-15)
    {
      id: 11,
      question:
        "Quem foi o primeiro califa a compilar o Alcorão em um único volume (Mushaf)?",
      options: [
        "A) Abu Bakr As-Siddiq",
        "B) Umar ibn Al-Khattab",
        "C) Uthman ibn Affan",
        "D) Ali ibn Abi Talib",
      ],
      correctAnswer: 0,
      explanation:
        "Abu Bakr As-Siddiq foi o primeiro a compilar o Alcorão completo em um único volume após a morte de muitos hafiz (memorizadores) na Batalha de Yamama. Zaid ibn Thabit narrou: 'Abu Bakr me enviou após as baixas de Yamama e disse: Umar veio até mim e disse que muitos recitadores do Alcorão foram mortos, e temo que mais sejam mortos em outras batalhas... então você deve ordenar que o Alcorão seja coletado' (Sahih al-Bukhari 4986). Esta compilação foi preservada com Hafsa bint Umar.",
    },
    {
      id: 12,
      question:
        "Durante o califado de qual líder o Alcorão foi padronizado em uma única cópia oficial (Mushaf Uthmani)?",
      options: [
        "A) Abu Bakr",
        "B) Umar ibn Al-Khattab",
        "C) Uthman ibn Affan",
        "D) Ali ibn Abi Talib",
      ],
      correctAnswer: 2,
      explanation:
        "Uthman ibn Affan padronizou o Alcorão no Mushaf Uthmani para unificar a recitação dos muçulmanos. Anas ibn Malik narrou: 'Hudhayfah veio a Uthman na época quando o povo da Síria e do Iraque estava conquistando a Armênia e o Azerbaijão. Hudhayfah ficou com medo de suas diferenças na recitação... Então Uthman enviou para Hafsa pedindo as escrituras para que pudesse compilar cópias perfeitas' (Sahih al-Bukhari 4987). Cópias foram enviadas para diferentes regiões islâmicas.",
    },
    {
      id: 13,
      question:
        "Quantos versículos (Ayat) tem o Alcorão aproximadamente?",
      options: ["A) 5.000", "B) 6.236", "C) 7.000", "D) 8.000"],
      correctAnswer: 1,
      explanation:
        "O Alcorão contém aproximadamente 6.236 versos (Ayat), embora haja pequenas variações na contagem devido a diferentes escolas de recitação. O número exato varia ligeiramente (entre 6.204 e 6.236) dependendo do método de contagem usado pelas diferentes escolas de Qira'at (recitação). Abu Huraira narrou que o Profeta disse: 'Alá revelou 104 escrituras celestiais, das quais 10 foram para Adão...' (Musnad Ahmad), indicando que o Alcorão é o último e completo livro divino.",
    },
    {
      id: 14,
      question:
        "Qual é a única Surah do Alcorão que não começa com 'Bismillah ir-Rahman ir-Rahim'?",
      options: [
        "A) Al-Fatiha",
        "B) At-Tawbah",
        "C) Al-Ikhlas",
        "D) Al-Falaq",
      ],
      correctAnswer: 1,
      explanation:
        "Surah At-Tawbah (capítulo 9) é a única Surah que não começa com a Basmala (Bismillah). Os estudiosos dizem que isso ocorre porque ela é uma continuação de Al-Anfal (capítulo 8), ou porque começa com declarações de guerra contra os incrédulos politeístas, o que não se harmoniza com a invocação da misericórdia de Allah. Ibn Abbas narrou que Uthman disse: 'O Profeta morreu e não nos informou se At-Tawbah era parte de Al-Anfal' (Sunan Abu Dawud 786).",
    },
    {
      id: 15,
      question:
        "Qual Surah do Alcorão contém dois 'Sajdah' (prosternações) obrigatórias durante sua recitação?",
      options: [
        "A) Al-Hajj",
        "B) As-Sajdah",
        "C) Fussilat",
        "D) Al-Alaq",
      ],
      correctAnswer: 0,
      explanation:
        "Surah Al-Hajj (capítulo 22) é a única Surah que contém duas prosternações de recitação (Sajdat at-Tilawah): uma no verso 18 e outra no verso 77. Quando estes versos são recitados ou ouvidos, é recomendado fazer uma prosternação. Uqbah ibn Amir narrou: 'Eu disse: Ó Mensageiro de Allah, a Surah Al-Hajj foi preferida sobre as outras Surahs, pois contém duas prosternações? Ele disse: Sim' (Sunan Abu Dawud 1402). Existem 14 prosternações no Alcorão no total.",
    },
  ],
};

// Duas (súplicas) para recompensa
const duas: Dua[] = [
  {
    id: 1,
    arabic:
      "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    transliteration:
      "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina 'adhaban-nar",
    translation:
      "Nosso Senhor, concede-nos o bem neste mundo e o bem no Além, e protege-nos do castigo do Fogo.",
    source: "Alcorão 2:201",
  },
  {
    id: 2,
    arabic: "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي",
    transliteration: "Rabbi ishrah li sadri wa yassir li amri",
    translation:
      "Meu Senhor, expande meu peito e facilita meu assunto.",
    source: "Alcorão 20:25-26",
  },
  {
    id: 3,
    arabic:
      "رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً",
    transliteration:
      "Rabbana la tuzigh quloobana ba'da idh hadaytana wa hab lana min ladunka rahmah",
    translation:
      "Nosso Senhor, não desvies nossos corações depois de nos teres guiado, e concede-nos misericórdia de Ti.",
    source: "Alcorão 3:8",
  },
  {
    id: 4,
    arabic: "رَبِّ زِدْنِي عِلْمًا",
    transliteration: "Rabbi zidni 'ilma",
    translation: "Meu Senhor, aumenta-me em conhecimento.",
    source: "Alcorão 20:114",
  },
  {
    id: 5,
    arabic:
      "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا",
    transliteration:
      "Rabbana hab lana min azwajina wa dhurriyyatina qurrata a'yunin waj'alna lil-muttaqina imama",
    translation:
      "Nosso Senhor, concede-nos alegria de nossos cônjuges e descendentes, e faz-nos líderes dos piedosos.",
    source: "Alcorão 25:74",
  },
  {
    id: 6,
    arabic:
      "رَبَّنَا اغْفِرْ لَنَا ذُنُوبَنَا وَإِسْرَافَنَا فِي أَمْرِنَا وَثَبِّتْ أَقْدَامَنَا وَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ",
    transliteration:
      "Rabbana ighfir lana dhunubana wa israfana fi amrina wa thabbit aqdamana wansurna 'alal-qawmil-kafirin",
    translation:
      "Nosso Senhor, perdoa nossos pecados e nossos excessos em nossos assuntos, firma nossos passos e nos dá vitória sobre o povo descrente.",
    source: "Alcorão 3:147",
  },
  {
    id: 7,
    arabic:
      "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى",
    transliteration:
      "Allahumma inni as'alukal-huda wat-tuqa wal-'afafa wal-ghina",
    translation:
      "Ó Allah, eu Te peço orientação, piedade, castidade e autossuficiência.",
    source: "Sahih Muslim 2721",
  },
  {
    id: 8,
    arabic:
      "رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنتَ السَّمِيعُ الْعَلِيمُ",
    transliteration:
      "Rabbana taqabbal minna innaka antas-Sami'ul-'Alim",
    translation:
      "Nosso Senhor, aceita de nós. Certamente Tu és o Ouvinte, o Conhecedor.",
    source: "Alcorão 2:127",
  },
  {
    id: 9,
    arabic:
      "رَبِّ أَدْخِلْنِي مُدْخَلَ صِدْقٍ وَأَخْرِجْنِي مُخْرَجَ صِدْقٍ",
    transliteration:
      "Rabbi adkhilni mudkhala sidqin wa akhrijni mukhraja sidqin",
    translation:
      "Senhor meu, faze com que eu entre com honestidade e saia com honestidade (em todos os meus projetos).",
    source: "(Alcorão 17:80)",
  },
  {
    id: 10,
    arabic: "اللَّهُمَّ بَارِكْ لِي فِي رِزْقِي",
    transliteration: "RAllahumma barik li fi rizqi",
    translation: "Ó Allah, abençoa para mim o meu sustento.",
    source: "(Dua Islâmica)",
  },
  {
    id: 11,
    arabic:
      "اللَّهُمَّ اهْدِنِي لأَحْسَنِ الأَخْلاقِ لا يَهْدِي لأَحْسَنِهَا إِلا أَنْتَ",
    transliteration:
      "Allahumma-hdini li-ahsanil-akhlaq, la yahdi li-ahsaniha illa Ant",
    translation:
      "Ó Allah, guia-me para o melhor dos caráteres, pois ninguém guia para o melhor dele senão Tu.",
    source: "(Muslim)",
  },
  {
    id: 12,
    arabic:
      "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا طَيِّبًا وَعَمَلًا مُتَقَبَّلًا",
    transliteration:
      "Allahumma inni as’aluka ‘ilman naafi’an, wa rizqan tayyiban, wa ‘amalan mutaqabbalan",
    translation:
      "Ó Allah, eu Te peço um conhecimento benéfico, um sustento bom (Halal) e obras que sejam aceitas.",
    source: "(Ibn Majah)",
  },
];

type Screen =
  | "start"
  | "mode"
  | "category"
  | "level"
  | "quiz"
  | "result"
  | "congrats"
  | "dua";

// Tipo para rastrear o progresso
interface Progress {
  [categoryId: string]: {
    unlockedLevels: Level[];
  };
}

export default function App() {
  const [currentScreen, setCurrentScreen] =
    useState<Screen>("start");
  const [selectedCategory, setSelectedCategory] = useState<
    string | null
  >(null);
  const [selectedLevel, setSelectedLevel] = useState<
    string | null
  >(null);
  const [finalScore, setFinalScore] = useState(0);
  const [quizMode, setQuizMode] = useState<QuizMode>("normal");
  const [progress, setProgress] = useState<Progress>({});

  // Carregar progresso do localStorage ao iniciar
  useEffect(() => {
    const savedProgress = localStorage.getItem(
      "islamQuizProgress",
    );
    if (savedProgress) {
      try {
        setProgress(JSON.parse(savedProgress));
      } catch (e) {
        console.error("Error loading progress:", e);
      }
    } else {
      // Inicializar com todos os níveis 1 desbloqueados
      const initialProgress: Progress = {};
      categories.forEach((cat) => {
        initialProgress[cat.id] = { unlockedLevels: [1] };
      });
      setProgress(initialProgress);
      localStorage.setItem(
        "islamQuizProgress",
        JSON.stringify(initialProgress),
      );
    }
  }, []);

  // Salvar progresso no localStorage quando mudar
  useEffect(() => {
    if (Object.keys(progress).length > 0) {
      localStorage.setItem(
        "islamQuizProgress",
        JSON.stringify(progress),
      );
    }
  }, [progress]);

  const handleStart = () => {
    setCurrentScreen("mode");
  };

  const handleSelectMode = (mode: QuizMode) => {
    setQuizMode(mode);
    setCurrentScreen("category");
  };

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentScreen("level");
  };

  const handleSelectLevel = (level: Level) => {
    setSelectedLevel(level.toString());
    setCurrentScreen("quiz");
  };

  const handleComplete = (score: number) => {
    setFinalScore(score);

    // Se passou com sucesso (mais de 60%), mostrar tela de parabéns
    const totalQuestions = currentQuestions.length;
    const passPercentage = (score / totalQuestions) * 100;

    if (passPercentage >= 60) {
      setCurrentScreen("congrats");
    } else {
      setCurrentScreen("result");
    }
  };

  const handleNextLevel = () => {
    if (!selectedCategory || !selectedLevel) return;

    const currentLevel = parseInt(selectedLevel) as Level;
    const nextLevel = (currentLevel + 1) as Level;

    // Desbloquear próximo nível
    if (nextLevel <= 3) {
      setProgress((prev) => {
        const categoryProgress = prev[selectedCategory] || {
          unlockedLevels: [1],
        };
        const unlockedLevels = [
          ...categoryProgress.unlockedLevels,
        ];
        if (!unlockedLevels.includes(nextLevel)) {
          unlockedLevels.push(nextLevel);
        }
        return {
          ...prev,
          [selectedCategory]: { unlockedLevels },
        };
      });

      // Ir para o próximo nível
      setSelectedLevel(nextLevel.toString());
      setCurrentScreen("quiz");
    }
  };

  const handleRetryLevel = () => {
    setCurrentScreen("quiz");
  };

  const handleBackToLevelMenu = () => {
    setCurrentScreen("level");
  };

  const handleShowDua = () => {
    setCurrentScreen("dua");
  };

  const handleRestart = () => {
    setCurrentScreen("category");
    setSelectedCategory(null);
    setSelectedLevel(null);
    setFinalScore(0);
  };

  const handleBackToStart = () => {
    setCurrentScreen("start");
    setSelectedCategory(null);
    setSelectedLevel(null);
  };

  const handleBackToCategory = () => {
    setCurrentScreen("category");
    setSelectedLevel(null);
  };

  // Filtrar perguntas por categoria e nível
  const getQuestionsForLevel = () => {
    if (!selectedCategory || !selectedLevel) return [];

    const allQuestions =
      questionsByCategory[selectedCategory] || [];
    const level = parseInt(selectedLevel);

    // Nível 1: perguntas 1-5 (índices 0-4)
    // Nível 2: perguntas 6-10 (índices 5-9)
    // Nível 3: perguntas 11-15 (índices 10-14)
    const startIndex = (level - 1) * 5;
    const endIndex = startIndex + 5;

    return allQuestions.slice(startIndex, endIndex);
  };

  const currentQuestions = getQuestionsForLevel();

  // Obter nome da categoria para exibir no LevelScreen
  const selectedCategoryData = categories.find(
    (cat) => cat.id === selectedCategory,
  );
  const categoryName = selectedCategoryData?.name || "";

  // Obter níveis desbloqueados para a categoria atual
  const unlockedLevels = selectedCategory
    ? progress[selectedCategory]?.unlockedLevels || [1]
    : [1];

  // Obter nome do nível atual
  const getLevelName = (level: string): string => {
    const lvl = parseInt(level);
    return lvl === 1
      ? "Fácil"
      : lvl === 2
        ? "Médio"
        : "Difícil";
  };

  // Verificar se tem próximo nível
  const hasNextLevel = selectedLevel
    ? parseInt(selectedLevel) < 3
    : false;

  // Selecionar uma Dua aleatória
  const randomDua =
    duas[Math.floor(Math.random() * duas.length)];

  return (
    <div className="size-full">
      {currentScreen === "start" && (
        <StartScreen onStart={handleStart} />
      )}
      {currentScreen === "mode" && (
        <ModeScreen
          onSelectMode={handleSelectMode}
          onBack={handleBackToStart}
        />
      )}
      {currentScreen === "category" && (
        <CategoryScreen
          categories={categories}
          onSelectCategory={handleSelectCategory}
          onBack={handleBackToStart}
        />
      )}
      {currentScreen === "level" && (
        <LevelScreen
          onSelectLevel={handleSelectLevel}
          onBack={handleBackToCategory}
          categoryName={categoryName}
          unlockedLevels={unlockedLevels}
        />
      )}
      {currentScreen === "quiz" && (
        <QuizScreen
          questions={currentQuestions}
          onComplete={handleComplete}
          mode={quizMode}
        />
      )}
      {currentScreen === "congrats" && (
        <CongratsScreen
          levelName={getLevelName(selectedLevel || "1")}
          score={finalScore}
          total={currentQuestions.length}
          hasNextLevel={hasNextLevel}
          onNextLevel={handleNextLevel}
          onRetry={handleRetryLevel}
          onBackToMenu={handleBackToLevelMenu}
          onShowDua={handleShowDua}
        />
      )}
      {currentScreen === "result" && (
        <ResultScreen
          score={finalScore}
          total={currentQuestions.length}
          onRestart={handleRestart}
          onShowDua={handleShowDua}
        />
      )}
      {currentScreen === "dua" && (
        <DuaReward dua={randomDua} onContinue={handleRestart} />
      )}
    </div>
  );
}