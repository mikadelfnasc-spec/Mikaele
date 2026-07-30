import { Subject, VestibularInfo, Simulado, Achievement, StudyCalendarEvent, UserProfile } from '../types';

export const INITIAL_USER: UserProfile = {
  id: 'usr_1',
  name: 'Ana Souza',
  email: 'ana.souza@estudante.com',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  grade: '3º ano',
  period: 'Manhã',
  streakDays: 12,
  hoursStudied: 38,
  weeklyGoalHours: 15,
  weeklyStudiedHours: 11.5,
  completedTopicIds: ['mat-1', 'mat-2', 'mat-3', 'port-1', 'bio-1', 'hist-1'],
  favoriteTopicIds: ['mat-2', 'port-9', 'bio-3'],
  lastAccessedTopicId: 'mat-3',
  theme: 'light'
};

export const SUBJECTS: Subject[] = [
  {
    id: 'matematica',
    name: 'Matemática',
    icon: 'Calculator',
    color: '#2563EB',
    bgColor: 'bg-blue-50 text-blue-600',
    borderColor: 'border-blue-200',
    description: 'Álgebra, geometria, probabilidade e matemática financeira para o ENEM.',
    topics: [
      {
        id: 'mat-1',
        subjectId: 'matematica',
        subjectName: 'Matemática',
        title: 'Matemática Básica',
        summary: 'Operações fundamentais, frações, dízimas periódicas, potenciação e radiciação.',
        explanation: `### O que é a Matemática Básica?
A Matemática Básica é a base para qualquer prova de vestibular ou ENEM. Ela engloba:
1. **Operações Fundamentais**: Soma, subtração, multiplicação e divisão de números inteiros e decimais.
2. **Frações**: Soma com MMC, multiplicação (numerador x numerador, denominador x denominador) e divisão (mantém a primeira e multiplica pelo inverso da segunda).
3. **Potenciação**: $a^n = a \\times a \\dots \\times a$. Propriedades: $a^m \\cdot a^n = a^{m+n}$, $(a^m)^n = a^{m \\cdot n}$.
4. **Radiciação**: Simplificação de radicais e racionalização de denominadores.

### Dica para o ENEM
Questões de matemática básica representam cerca de 25% a 30% da prova de Matemática do ENEM. Dominar agilidade em cálculos sem calculadora garante tempo para as questões complexas.`,
        youtubeEmbedId: 'm4Xo8J5g2kQ',
        youtubeTitle: 'Matemática Básica do Zero para ENEM e Vestibulares',
        estimatedMinutes: 30,
        exercises: [
          {
            id: 'ex-mat1-1',
            title: 'ENEM 2022 - Operações e Frações',
            contextText: 'Uma dona de casa comprou 3/4 de um bolo e dividiu igualmente entre seus 3 filhos. Qual fração do bolo inteiro cada filho recebeu?',
            options: ['1/4', '1/3', '1/12', '3/12', '1/2'],
            correctIndex: 0,
            explanation: 'Dividir 3/4 por 3 é equivalente a (3/4) * (1/3) = 3/12 = 1/4 do bolo original.',
            examName: 'ENEM',
            year: 2022
          },
          {
            id: 'ex-mat1-2',
            title: 'FUVEST - Potenciação',
            contextText: 'O valor da expressão (2^3 * 2^4) / 2^5 é igual a:',
            options: ['2', '4', '8', '16', '1'],
            correctIndex: 1,
            explanation: 'No numerador: 2^3 * 2^4 = 2^7. Dividindo por 2^5 temos 2^(7-5) = 2^2 = 4.',
            examName: 'FUVEST',
            year: 2021
          }
        ],
        examQuestions: [
          {
            id: 'enem-mat1-1',
            title: 'ENEM 2021 - Notação Científica',
            contextText: 'O vírus SARS-CoV-2 possui um diâmetro aproximado de 0,00000012 metros. Em notação científica, este valor é representado por:',
            options: ['1,2 x 10^-7 m', '12 x 10^-8 m', '1,2 x 10^-6 m', '0,12 x 10^-6 m', '1,2 x 10^-8 m'],
            correctIndex: 0,
            explanation: 'Deslocando a vírgula 7 casas para a direita até o 1,2 temos 1,2 x 10^-7 metros.',
            examName: 'ENEM',
            year: 2021
          }
        ],
        flashcards: [
          {
            id: 'fc-mat1-1',
            front: 'Como somar frações com denominadores diferentes?',
            back: 'Encontre o MMC dos denominadores, ajuste os numeradores proporcionalmente e depois some os numeradores mantendo o denominador comum.',
            subjectName: 'Matemática',
            topicTitle: 'Matemática Básica'
          },
          {
            id: 'fc-mat1-2',
            front: 'Qual é a propriedade de (a^m)^n?',
            back: 'Consiste na potência de potência: multiplica-se os expoentes, resultando em a^(m * n).',
            subjectName: 'Matemática',
            topicTitle: 'Matemática Básica'
          }
        ]
      },
      {
        id: 'mat-2',
        subjectId: 'matematica',
        subjectName: 'Matemática',
        title: 'Razão e Proporção',
        summary: 'Proporcionalidade direta e inversa, regra de três simples e composta, escalas.',
        explanation: `### Conceito de Razão e Proporção
- **Razão**: Divisão entre duas grandezas $a/b$ (com $b \\neq 0$).
- **Proporção**: Igualdade entre duas razões ($a/b = c/d$). Propriedade fundamental: $a \\cdot d = b \\cdot c$.

### Regra de Três
1. **Diretamente Proporcional**: Quando uma grandeza aumenta, a outra aumenta na mesma proporção.
2. **Inversamente Proporcional**: Quando uma grandeza aumenta, a outra diminui na mesma proporção.

### Escalas Mapas e Maquetes
Escala = Dimensão no Desenho / Dimensão Real. Ex: 1:100.000 significa que 1 cm no mapa equivale a 100.000 cm (1 km) na realidade.`,
        youtubeEmbedId: '3G33s6AAn-s',
        youtubeTitle: 'Razão e Proporção e Escalas no ENEM',
        estimatedMinutes: 25,
        exercises: [
          {
            id: 'ex-mat2-1',
            title: 'ENEM 2020 - Escala de Mapa',
            contextText: 'Em um mapa com escala 1 : 50.000, a distância entre duas cidades é de 8 cm. Qual a distância real em quilômetros?',
            options: ['4 km', '40 km', '400 km', '0,4 km', '4.000 km'],
            correctIndex: 0,
            explanation: '8 cm * 50.000 = 400.000 cm = 4.000 m = 4 km.',
            examName: 'ENEM',
            year: 2020
          }
        ],
        examQuestions: [],
        flashcards: [
          {
            id: 'fc-mat2-1',
            front: 'O que caracteriza grandezas inversamente proporcionais?',
            back: 'O produto entre os valores das duas grandezas permanece constante (x * y = k). Quando uma dobra, a outra cai pela metade.',
            subjectName: 'Matemática',
            topicTitle: 'Razão e Proporção'
          }
        ]
      },
      {
        id: 'mat-3',
        subjectId: 'matematica',
        subjectName: 'Matemática',
        title: 'Porcentagem',
        summary: 'Cálculos de porcentagem, aumentos e descontos sucessivos.',
        explanation: `### Porcentagem e Fator de Multiplicação
A porcentagem é uma fração de base 100 ($p\\% = p / 100$).

- **Aumento de x%**: Multiplica-se pelo fator $(1 + x/100)$. Ex: Aumento de 20% -> Fator = 1,20.
- **Desconto de x%**: Multiplica-se pelo fator $(1 - x/100)$. Ex: Desconto de 15% -> Fator = 0,85.
- **Aumentos/Descontos Sucessivos**: Multiplicam-se os fatores sequencialmente. Um aumento de 10% seguido de outro de 10% resulta em fator $1,10 \\times 1,10 = 1,21$ (aumento real de 21%, e NÃO 20%).`,
        youtubeEmbedId: 'A0y1x4f8R5A',
        youtubeTitle: 'Porcentagem sem Segredos para Vestibulares',
        estimatedMinutes: 20,
        exercises: [
          {
            id: 'ex-mat3-1',
            title: 'UNICAMP - Desconto Sucessivo',
            contextText: 'Um produto de R$ 200,00 sofreu um desconto de 20% e, em seguida, um novo desconto de 10%. Qual o valor final?',
            options: ['R$ 140,00', 'R$ 144,00', 'R$ 150,00', 'R$ 160,00', 'R$ 136,00'],
            correctIndex: 1,
            explanation: 'Valor final = 200 * 0,80 * 0,90 = 200 * 0,72 = R$ 144,00.',
            examName: 'UNICAMP',
            year: 2022
          }
        ],
        examQuestions: [],
        flashcards: []
      },
      {
        id: 'mat-4',
        subjectId: 'matematica',
        subjectName: 'Matemática',
        title: 'Juros',
        summary: 'Juros simples vs Juros compostos, fórmula do montante.',
        explanation: `### Juros Simples vs Compostos
- **Juros Simples**: Os juros incidem apenas sobre o capital inicial. $J = C \\cdot i \\cdot t$, e Montante $M = C + J = C(1 + i \\cdot t)$.
- **Juros Compostos**: Juros sobre juros. O montante a cada período rende novos juros. $M = C(1 + i)^t$.`,
        youtubeEmbedId: 'J5aQ_L4a1s8',
        youtubeTitle: 'Juros Simples e Compostos no ENEM',
        estimatedMinutes: 25,
        exercises: [],
        examQuestions: [],
        flashcards: []
      },
      {
        id: 'mat-5',
        subjectId: 'matematica',
        subjectName: 'Matemática',
        title: 'Equações',
        summary: 'Equações do 1º e 2º grau, fórmulas e resolução.',
        explanation: 'Resolução de sistemas lineares e fórmula de Bhaskara $x = \\frac{-b \\pm \\sqrt{\\Delta}}{2a}$.',
        youtubeEmbedId: 'm4Xo8J5g2kQ',
        youtubeTitle: 'Equações e Sistemas',
        estimatedMinutes: 30,
        exercises: [],
        examQuestions: [],
        flashcards: []
      },
      {
        id: 'mat-6',
        subjectId: 'matematica',
        subjectName: 'Matemática',
        title: 'Funções',
        summary: 'Função afim, quadrática, exponencial e logarítmica.',
        explanation: 'Estudo de gráficos, vértices da parábola, domínio e imagem.',
        youtubeEmbedId: 'm4Xo8J5g2kQ',
        youtubeTitle: 'Funções de 1º e 2º grau',
        estimatedMinutes: 35,
        exercises: [],
        examQuestions: [],
        flashcards: []
      },
      {
        id: 'mat-7',
        subjectId: 'matematica',
        subjectName: 'Matemática',
        title: 'Logaritmos',
        summary: 'Propriedades dos logaritmos e mudança de base.',
        explanation: '$\\log_b(a) = c \\iff b^c = a$. Propriedades do produto, quociente e potência.',
        youtubeEmbedId: 'm4Xo8J5g2kQ',
        youtubeTitle: 'Logaritmos sem trauma',
        estimatedMinutes: 30,
        exercises: [],
        examQuestions: [],
        flashcards: []
      },
      {
        id: 'mat-8',
        subjectId: 'matematica',
        subjectName: 'Matemática',
        title: 'Trigonometria',
        summary: 'Seno, cosseno, tangente, ciclo trigonométrico e lei dos senos/cossenos.',
        explanation: 'Relação fundamental $\\sin^2(x) + \\cos^2(x) = 1$. Triângulo retângulo e ângulos notáveis (30º, 45º, 60º).',
        youtubeEmbedId: 'm4Xo8J5g2kQ',
        youtubeTitle: 'Trigonometria Completa',
        estimatedMinutes: 40,
        exercises: [],
        examQuestions: [],
        flashcards: []
      },
      {
        id: 'mat-9',
        subjectId: 'matematica',
        subjectName: 'Matemática',
        title: 'Geometria Plana',
        summary: 'Áreas de triângulos, quadriláteros, círculos e Teorema de Pitágoras.',
        explanation: 'Cálculo de perímetro, áreas de figuras planas e semelhança de triângulos.',
        youtubeEmbedId: 'm4Xo8J5g2kQ',
        youtubeTitle: 'Áreas da Geometria Plana',
        estimatedMinutes: 35,
        exercises: [],
        examQuestions: [],
        flashcards: []
      },
      {
        id: 'mat-10',
        subjectId: 'matematica',
        subjectName: 'Matemática',
        title: 'Geometria Espacial',
        summary: 'Prismas, pirâmides, cilindros, cones e esferas.',
        explanation: 'Cálculo de volume e área de superfície de sólidos geométricos.',
        youtubeEmbedId: 'm4Xo8J5g2kQ',
        youtubeTitle: 'Volumes da Geometria Espacial',
        estimatedMinutes: 40,
        exercises: [],
        examQuestions: [],
        flashcards: []
      },
      {
        id: 'mat-11',
        subjectId: 'matematica',
        subjectName: 'Matemática',
        title: 'Probabilidade',
        summary: 'Espaço amostral, eventos independentes e probabilidade condicional.',
        explanation: 'P(A) = Casos Favoráveis / Casos Possíveis.',
        youtubeEmbedId: 'm4Xo8J5g2kQ',
        youtubeTitle: 'Probabilidade para o ENEM',
        estimatedMinutes: 30,
        exercises: [],
        examQuestions: [],
        flashcards: []
      },
      {
        id: 'mat-12',
        subjectId: 'matematica',
        subjectName: 'Matemática',
        title: 'Estatística',
        summary: 'Média, mediana, moda, desvio padrão e interpretação de gráficos.',
        explanation: 'Análise de dados estatísticos, amplitude e interpretação visual.',
        youtubeEmbedId: 'm4Xo8J5g2kQ',
        youtubeTitle: 'Média, Mediana e Moda',
        estimatedMinutes: 25,
        exercises: [],
        examQuestions: [],
        flashcards: []
      }
    ]
  },
  {
    id: 'portugues',
    name: 'Português',
    icon: 'BookOpen',
    color: '#9333EA',
    bgColor: 'bg-purple-50 text-purple-600',
    borderColor: 'border-purple-200',
    description: 'Gramática, interpretação de texto, literatura e estrutura da Redação Nota 1000.',
    topics: [
      {
        id: 'port-1',
        subjectId: 'portugues',
        subjectName: 'Português',
        title: 'Interpretação de Texto',
        summary: 'Compreensão textual, coesão, coerência, inferências e funções da linguagem.',
        explanation: `### Como Interpretar Textos no ENEM
A prova de Linguagens do ENEM é predominantemente focada em **Interpretação de Texto**.

1. **Compreensão x Interpretação**:
   - **Compreensão**: O que está *explícito* no texto (segundo o autor...).
   - **Interpretação**: O que se pode *inferir/concluir* a partir do texto.
2. **Funções da Linguagem**:
   - *Referencial*: Foco no contexto (notícias).
   - *Emotiva/Expressiva*: Foco no emissor (diários, poesias).
   - *Conativa/Persuasiva*: Foco no receptor (propagandas).
   - *Phatica*: Foco no canal (Alô? Entendeu?).
   - *Metalinguística*: O código explicando o próprio código (poema sobre fazer poesia).
   - *Poética*: Foco na estética da mensagem.`,
        youtubeEmbedId: 'G1O438c8wX0',
        youtubeTitle: 'Interpretação de Texto Infalível no ENEM',
        estimatedMinutes: 30,
        exercises: [
          {
            id: 'ex-port1-1',
            title: 'ENEM 2021 - Funções da Linguagem',
            contextText: 'Um anúncio publicitário utiliza frases imperativas como "Compre agora!" e "Não perca esta oportunidade!". Qual função da linguagem predomina?',
            options: ['Função Poética', 'Função Conativa (Persuasiva)', 'Função Metalinguística', 'Função Referencial', 'Função Fática'],
            correctIndex: 1,
            explanation: 'A função conativa tem como objetivo influenciar o comportamento do receptor através de verbos no imperativo.',
            examName: 'ENEM',
            year: 2021
          }
        ],
        examQuestions: [],
        flashcards: [
          {
            id: 'fc-port1-1',
            front: 'Qual a diferença entre coesão e coerência?',
            back: 'Coesão diz respeito às conexões gramaticais e conectivos entre frases. Coerência diz respeito ao sentido lógico e à não contradição das ideias.',
            subjectName: 'Português',
            topicTitle: 'Interpretação de Texto'
          }
        ]
      },
      {
        id: 'port-2',
        subjectId: 'portugues',
        subjectName: 'Português',
        title: 'Gramática',
        summary: 'Classes de palavras, análise sintática e funções da linguagem.',
        explanation: 'Substantivo, adjetivo, verbo, pronome, advérbio e termos da oração.',
        youtubeEmbedId: 'G1O438c8wX0',
        youtubeTitle: 'Gramática Básica para Provas',
        estimatedMinutes: 30,
        exercises: [],
        examQuestions: [],
        flashcards: []
      },
      {
        id: 'port-3',
        subjectId: 'portugues',
        subjectName: 'Português',
        title: 'Ortografia',
        summary: 'Novo acordo ortográfico, acentuação gráfica e uso dos porquês.',
        explanation: 'Regras de oxítonas, paroxítonas, proparoxítonas e uso de "por que", "por quê", "porque" e "porquê".',
        youtubeEmbedId: 'G1O438c8wX0',
        youtubeTitle: 'Acentuação e Porquês',
        estimatedMinutes: 20,
        exercises: [],
        examQuestions: [],
        flashcards: []
      },
      {
        id: 'port-4',
        subjectId: 'portugues',
        subjectName: 'Português',
        title: 'Concordância',
        summary: 'Concordância verbal e nominal, casos especiais.',
        explanation: 'Regras de sujeito simples, composto, verbo haver e fazer impessoais.',
        youtubeEmbedId: 'G1O438c8wX0',
        youtubeTitle: 'Concordância Verbal e Nominal',
        estimatedMinutes: 25,
        exercises: [],
        examQuestions: [],
        flashcards: []
      },
      {
        id: 'port-5',
        subjectId: 'portugues',
        subjectName: 'Português',
        title: 'Regência',
        summary: 'Regência verbal e nominal, verbos de dupla regência.',
        explanation: 'Verbos como assistir, visar, aspirar, preferir e esquecer.',
        youtubeEmbedId: 'G1O438c8wX0',
        youtubeTitle: 'Regência Verbal sem erros',
        estimatedMinutes: 25,
        exercises: [],
        examQuestions: [],
        flashcards: []
      },
      {
        id: 'port-6',
        subjectId: 'portugues',
        subjectName: 'Português',
        title: 'Crase',
        summary: 'Casos proibidos, obrigatórios e facultativos do uso da crase.',
        explanation: 'Crase é a fusão da preposição "a" com o artigo feminino "a". Macete: substitua a palavra feminina por uma masculina ("vou à praia" -> "vou ao clube").',
        youtubeEmbedId: 'G1O438c8wX0',
        youtubeTitle: 'Crase Definitiva',
        estimatedMinutes: 25,
        exercises: [],
        examQuestions: [],
        flashcards: []
      },
      {
        id: 'port-7',
        subjectId: 'portugues',
        subjectName: 'Português',
        title: 'Literatura',
        summary: 'Escolas literárias brasileiras: Barroco, Arcadismo, Romantismo, Realismo e Modernismo.',
        explanation: 'Estudo das obras obrigatórias da FUVEST, UNICAMP e fases do Modernismo no Brasil.',
        youtubeEmbedId: 'G1O438c8wX0',
        youtubeTitle: 'Escolas Literárias no ENEM',
        estimatedMinutes: 40,
        exercises: [],
        examQuestions: [],
        flashcards: []
      },
      {
        id: 'port-8',
        subjectId: 'portugues',
        subjectName: 'Português',
        title: 'Figuras de Linguagem',
        summary: 'Metáfora, metonímia, hipérbole, ironia, antítese e paradoxo.',
        explanation: 'Recursos estilísticos utilizados pelos autores para enriquecer o texto.',
        youtubeEmbedId: 'G1O438c8wX0',
        youtubeTitle: 'Figuras de Linguagem Principais',
        estimatedMinutes: 25,
        exercises: [],
        examQuestions: [],
        flashcards: []
      },
      {
        id: 'port-9',
        subjectId: 'portugues',
        subjectName: 'Português',
        title: 'Redação',
        summary: 'Estrutura do texto dissertativo-argumentativo, repertório sociocultural e proposta de intervenção.',
        explanation: `### Estrutura da Redação ENEM Nota 1000
A redação deve ter entre 20 e 30 linhas, dividida em 4 parágrafos:
1. **Introdução**: Tese + Contextualização/Repertório.
2. **Desenvolvimento 1**: Argumento 1 + Repertório legítimo + Consequências.
3. **Desenvolvimento 2**: Argumento 2 + Repertório + Relação com a tese.
4. **Conclusão**: Proposta de Intervenção detalhada com os 5 elementos obrigatórios:
   - **Agente**: Quem fará? (ex: Ministério da Educação).
   - **Ação**: O que fará? (ex: Promover campanhas educativas).
   - **Meio/Modo**: Como fará? (ex: Por meio de mídias de grande alcance).
   - **Efeito**: Para que fará? (ex: A fim de mitigar o analfabetismo funcional).
   - **Detalhamento**: Explicar ou exemplificar um dos elementos acima.`,
        youtubeEmbedId: 'G1O438c8wX0',
        youtubeTitle: 'Como Fazer Redação Nota 1000 no ENEM',
        estimatedMinutes: 45,
        exercises: [],
        examQuestions: [],
        flashcards: [
          {
            id: 'fc-port9-1',
            front: 'Quais são os 5 elementos obrigatórios da Proposta de Intervenção no ENEM?',
            back: 'Agente, Ação, Meio/Modo, Efeito e Detalhamento.',
            subjectName: 'Português',
            topicTitle: 'Redação'
          }
        ]
      }
    ]
  },
  {
    id: 'biologia',
    name: 'Biologia',
    icon: 'Dna',
    color: '#16A34A',
    bgColor: 'bg-green-50 text-green-600',
    borderColor: 'border-green-200',
    description: 'Citologia, ecologia, genética, evolução e biologia celular.',
    topics: [
      {
        id: 'bio-1',
        subjectId: 'biologia',
        subjectName: 'Biologia',
        title: 'Citologia',
        summary: 'Organelas celulares, membrana plasmática, transporte celular e respiração.',
        explanation: `### O que é Citologia?
Estudo das células e suas estruturas internas:
- **Membrana Plasmática**: Modelo do Mosaico Fluido. Transporte passivo (difusão, osmose) e ativo (bomba de Na+/K+).
- **Mitocôndria**: Respiração celular e produção de ATP.
- **Ribossomo**: Síntese de proteínas.
- **Retículo Endoplasmático**: Rugoso (síntese proteica) e Liso (síntese de lipídios e desintoxicação).
- **Complexo de Golgi**: Secreção celular e formação do acrossomo do espermatozoide.`,
        youtubeEmbedId: 'fA26fCg14jI',
        youtubeTitle: 'Citologia e Organelas Celulares',
        estimatedMinutes: 30,
        exercises: [],
        examQuestions: [],
        flashcards: []
      },
      {
        id: 'bio-2',
        subjectId: 'biologia',
        subjectName: 'Biologia',
        title: 'Genética',
        summary: 'Leis de Mendel, hereditariedade, tipo sanguíneo ABO/Rh e DNA/RNA.',
        explanation: '1ª e 2ª Lei de Mendel, codominância e herança ligada ao sexo.',
        youtubeEmbedId: 'fA26fCg14jI',
        youtubeTitle: 'Genética e Leis de Mendel',
        estimatedMinutes: 35,
        exercises: [],
        examQuestions: [],
        flashcards: []
      },
      {
        id: 'bio-3',
        subjectId: 'biologia',
        subjectName: 'Biologia',
        title: 'Ecologia',
        summary: 'Cadeia alimentar, ciclos biogeoquímicos, relações ecológicas e impactos ambientais.',
        explanation: 'Produtores, consumidores, decompositores. Ciclos da água, carbono e nitrogênio.',
        youtubeEmbedId: 'fA26fCg14jI',
        youtubeTitle: 'Ecologia - O Tema que Mais Cai no ENEM',
        estimatedMinutes: 35,
        exercises: [],
        examQuestions: [],
        flashcards: []
      },
      {
        id: 'bio-4',
        subjectId: 'biologia',
        subjectName: 'Biologia',
        title: 'Evolução',
        summary: 'Lamarckismo vs Darwinismo, Seleção Natural e Neodarwinismo.',
        explanation: 'Lamarck (Uso/Desuso e Caracteres Adquiridos) vs Darwin (Seleção Natural das variações existentes).',
        youtubeEmbedId: 'fA26fCg14jI',
        youtubeTitle: 'Evolução e Seleção Natural',
        estimatedMinutes: 25,
        exercises: [],
        examQuestions: [],
        flashcards: []
      },
      {
        id: 'bio-5',
        subjectId: 'biologia',
        subjectName: 'Biologia',
        title: 'Corpo Humano',
        summary: 'Sistemas digestório, circulatório, respiratório, nervoso e imunitário.',
        explanation: 'Anatomia e fisiologia humana, vacinas vs soros.',
        youtubeEmbedId: 'fA26fCg14jI',
        youtubeTitle: 'Sistemas do Corpo Humano',
        estimatedMinutes: 40,
        exercises: [],
        examQuestions: [],
        flashcards: []
      },
      {
        id: 'bio-6',
        subjectId: 'biologia',
        subjectName: 'Biologia',
        title: 'Botânica',
        summary: 'Grupos vegetais (Briófitas, Pteridófitas, Gimnospermas, Angiospermas) e fisiologia vegetal.',
        explanation: 'Evolução das plantas, tecidos de condução (xilema e floema) e hormônios vegetais.',
        youtubeEmbedId: 'fA26fCg14jI',
        youtubeTitle: 'Reino Vegetal e Botânica',
        estimatedMinutes: 30,
        exercises: [],
        examQuestions: [],
        flashcards: []
      },
      {
        id: 'bio-7',
        subjectId: 'biologia',
        subjectName: 'Biologia',
        title: 'Zoologia',
        summary: 'Invertebrados e Vertebrados: Poríferos a Mamíferos.',
        explanation: 'Principais filos do reino animal e características adaptativas.',
        youtubeEmbedId: 'fA26fCg14jI',
        youtubeTitle: 'Zoologia Simplificada',
        estimatedMinutes: 35,
        exercises: [],
        examQuestions: [],
        flashcards: []
      },
      {
        id: 'bio-8',
        subjectId: 'biologia',
        subjectName: 'Biologia',
        title: 'Biotecnologia',
        summary: 'Engenharia genética, transgênicos, clonagem, PCR e células-tronco.',
        explanation: 'Aplicações tecnológicas da biologia na medicina e agricultura moderna.',
        youtubeEmbedId: 'fA26fCg14jI',
        youtubeTitle: 'Biotecnologia no ENEM',
        estimatedMinutes: 25,
        exercises: [],
        examQuestions: [],
        flashcards: []
      }
    ]
  },
  {
    id: 'quimica',
    name: 'Química',
    icon: 'FlaskConical',
    color: '#EA580C',
    bgColor: 'bg-orange-50 text-orange-600',
    borderColor: 'border-orange-200',
    description: 'Tabela periódica, estequiometria, soluções e química orgânica.',
    topics: [
      {
        id: 'qui-1',
        subjectId: 'quimica',
        subjectName: 'Química',
        title: 'Química Geral',
        summary: 'Modelos atômicos, tabela periódica e propriedades periódicas.',
        explanation: 'Evolução de Dalton a Bohr, raio atômico e eletronegatividade.',
        youtubeEmbedId: 'Kz18yL9_4d4',
        youtubeTitle: 'Química Geral e Modelos Atômicos',
        estimatedMinutes: 30,
        exercises: [],
        examQuestions: [],
        flashcards: []
      },
      {
        id: 'qui-2',
        subjectId: 'quimica',
        subjectName: 'Química',
        title: 'Ligações Químicas',
        summary: 'Ligações iônica, covalente, metálica e forças intermoleculares.',
        explanation: 'Geometria molecular e polaridade das moléculas.',
        youtubeEmbedId: 'Kz18yL9_4d4',
        youtubeTitle: 'Ligações Químicas',
        estimatedMinutes: 30,
        exercises: [],
        examQuestions: [],
        flashcards: []
      },
      {
        id: 'qui-3',
        subjectId: 'quimica',
        subjectName: 'Química',
        title: 'Soluções',
        summary: 'Concentração comum, molaridade, diluição e misturas.',
        explanation: 'Soluto, solvente, curvas de solubilidade e $C = m / V$.',
        youtubeEmbedId: 'Kz18yL9_4d4',
        youtubeTitle: 'Concentração de Soluções',
        estimatedMinutes: 30,
        exercises: [],
        examQuestions: [],
        flashcards: []
      },
      {
        id: 'qui-4',
        subjectId: 'quimica',
        subjectName: 'Química',
        title: 'Estequiometria',
        summary: 'Cálculos estequiométricos, rendimento e pureza de reagentes.',
        explanation: 'Leis ponderais e relações em massa, mol e volume nas reações.',
        youtubeEmbedId: 'Kz18yL9_4d4',
        youtubeTitle: 'Estequiometria do Zero',
        estimatedMinutes: 40,
        exercises: [],
        examQuestions: [],
        flashcards: []
      },
      {
        id: 'qui-5',
        subjectId: 'quimica',
        subjectName: 'Química',
        title: 'Termoquímica',
        summary: 'Reações endotérmicas, exotérmicas e Lei de Hess.',
        explanation: 'Variação de entalpia (ΔH) e energia de ligação.',
        youtubeEmbedId: 'Kz18yL9_4d4',
        youtubeTitle: 'Termoquímica e Lei de Hess',
        estimatedMinutes: 30,
        exercises: [],
        examQuestions: [],
        flashcards: []
      },
      {
        id: 'qui-6',
        subjectId: 'quimica',
        subjectName: 'Química',
        title: 'Química Orgânica',
        summary: 'Cadeias carbônicas, funções orgânicas e isomeria.',
        explanation: 'Nomenclatura IUPAC de álcoois, cetonas, aldeídos e ácidos carboxílicos.',
        youtubeEmbedId: 'Kz18yL9_4d4',
        youtubeTitle: 'Funções Orgânicas',
        estimatedMinutes: 40,
        exercises: [],
        examQuestions: [],
        flashcards: []
      },
      {
        id: 'qui-7',
        subjectId: 'quimica',
        subjectName: 'Química',
        title: 'Eletroquímica',
        summary: 'Pilhas, eletrólise e número de oxidação (NOX).',
        explanation: 'Anodo (oxidação) e Cátodo (redução). Cálculo do ddp da pilha.',
        youtubeEmbedId: 'Kz18yL9_4d4',
        youtubeTitle: 'Pilhas e Eletrólise no ENEM',
        estimatedMinutes: 35,
        exercises: [],
        examQuestions: [],
        flashcards: []
      }
    ]
  },
  {
    id: 'fisica',
    name: 'Física',
    icon: 'Zap',
    color: '#0284C7',
    bgColor: 'bg-sky-50 text-sky-600',
    borderColor: 'border-sky-200',
    description: 'Mecânica, termodinâmica, ondas, óptica e eletricidade.',
    topics: [
      {
        id: 'fis-1',
        subjectId: 'fisica',
        subjectName: 'Física',
        title: 'Cinemática',
        summary: 'Movimento Uniforme (MRU), Movimento Uniformemente Variado (MRUV) e queda livre.',
        explanation: 'Fórmulas do sorvete $S = S_0 + v \\cdot t$ e Torricelli $v^2 = v_0^2 + 2a \\Delta S$.',
        youtubeEmbedId: '3m2N8E4p1u0',
        youtubeTitle: 'Cinemática MRU e MRUV',
        estimatedMinutes: 35,
        exercises: [],
        examQuestions: [],
        flashcards: []
      },
      {
        id: 'fis-2',
        subjectId: 'fisica',
        subjectName: 'Física',
        title: 'Dinâmica',
        summary: 'Leis de Newton, força atrito, força centrípeta e plano inclinado.',
        explanation: '$F = m \\cdot a$. Ação e reação, força normal e peso.',
        youtubeEmbedId: '3m2N8E4p1u0',
        youtubeTitle: 'Leis de Newton',
        estimatedMinutes: 35,
        exercises: [],
        examQuestions: [],
        flashcards: []
      },
      {
        id: 'fis-3',
        subjectId: 'fisica',
        subjectName: 'Física',
        title: 'Trabalho e Energia',
        summary: 'Energia cinética, potencial gravitacional e elástica, conservação de energia.',
        explanation: '$E_c = \\frac{m v^2}{2}$, $E_p = m g h$. Princípio da conservação da energia mecânica.',
        youtubeEmbedId: '3m2N8E4p1u0',
        youtubeTitle: 'Conservação da Energia Mecânica',
        estimatedMinutes: 30,
        exercises: [],
        examQuestions: [],
        flashcards: []
      },
      {
        id: 'fis-4',
        subjectId: 'fisica',
        subjectName: 'Física',
        title: 'Hidrostática',
        summary: 'Pressão, densidade, Princípio de Pascal e Teorema de Arquimedes (Empuxo).',
        explanation: 'Pressão hidrostática $P = d \\cdot g \\cdot h$ e Empuxo $E = d_{liq} \\cdot V_{sub} \\cdot g$.',
        youtubeEmbedId: '3m2N8E4p1u0',
        youtubeTitle: 'Hidrostática e Empuxo',
        estimatedMinutes: 30,
        exercises: [],
        examQuestions: [],
        flashcards: []
      },
      {
        id: 'fis-5',
        subjectId: 'fisica',
        subjectName: 'Física',
        title: 'Ondulatória',
        summary: 'Equação fundamental da onda $v = \\lambda \\cdot f$, reflexão, refração e difração.',
        explanation: 'Ondas transversais e longitudinais, espectro eletromagnético e ressonância.',
        youtubeEmbedId: '3m2N8E4p1u0',
        youtubeTitle: 'Ondulatória e Fenômenos Ondulatórios',
        estimatedMinutes: 35,
        exercises: [],
        examQuestions: [],
        flashcards: []
      },
      {
        id: 'fis-6',
        subjectId: 'fisica',
        subjectName: 'Física',
        title: 'Óptica',
        summary: 'Espelhos planos e esféricos, lentes e refração da luz.',
        explanation: 'Lei de Snell-Descartes e formação de imagens em lentes convergentes e divergentes.',
        youtubeEmbedId: '3m2N8E4p1u0',
        youtubeTitle: 'Óptica Geométrica',
        estimatedMinutes: 30,
        exercises: [],
        examQuestions: [],
        flashcards: []
      },
      {
        id: 'fis-7',
        subjectId: 'fisica',
        subjectName: 'Física',
        title: 'Eletricidade',
        summary: 'Leis de Ohm, circuitos elétricos em série e paralelo, potência elétrica.',
        explanation: '$V = R \\cdot I$ e Potência $P = V \\cdot I = R \\cdot I^2$. Consumo em kWh.',
        youtubeEmbedId: '3m2N8E4p1u0',
        youtubeTitle: 'Eletrodinâmica e Circuitos no ENEM',
        estimatedMinutes: 40,
        exercises: [],
        examQuestions: [],
        flashcards: []
      },
      {
        id: 'fis-8',
        subjectId: 'fisica',
        subjectName: 'Física',
        title: 'Física Moderna',
        summary: 'Efeito fotoelétrico, teoria da relatividade e física quântica básica.',
        explanation: 'Fótons, dualidade onda-partícula e fórmula de Einstein $E = m c^2$.',
        youtubeEmbedId: '3m2N8E4p1u0',
        youtubeTitle: 'Física Moderna para Vestibulares',
        estimatedMinutes: 25,
        exercises: [],
        examQuestions: [],
        flashcards: []
      }
    ]
  },
  {
    id: 'historia',
    name: 'História',
    icon: 'Landmark',
    color: '#D97706',
    bgColor: 'bg-amber-50 text-amber-600',
    borderColor: 'border-amber-200',
    description: 'História do Brasil, história geral e geopolítica histórica.',
    topics: [
      {
        id: 'hist-1',
        subjectId: 'historia',
        subjectName: 'História',
        title: 'Brasil Colônia',
        summary: 'Capitanias hereditárias, ciclo do açúcar, escravidão e mineração.',
        explanation: 'Período pré-colonial a 1822. Economia açucareira e mão de obra escravizada.',
        youtubeEmbedId: 'P_4c2S8e_s8',
        youtubeTitle: 'Brasil Colônia - Resumo Ilustrado',
        estimatedMinutes: 35,
        exercises: [],
        examQuestions: [],
        flashcards: []
      },
      {
        id: 'hist-2',
        subjectId: 'historia',
        subjectName: 'História',
        title: 'Império',
        summary: 'Primeiro Reinado, Período Regencial e Segundo Reinado com Dom Pedro II.',
        explanation: 'Independência, Guerra do Paraguai, ciclo do café e abolição da escravidão.',
        youtubeEmbedId: 'P_4c2S8e_s8',
        youtubeTitle: 'Brasil Império',
        estimatedMinutes: 35,
        exercises: [],
        examQuestions: [],
        flashcards: []
      },
      {
        id: 'hist-3',
        subjectId: 'historia',
        subjectName: 'História',
        title: 'República',
        summary: 'República da Espada, República Velha, Era Vargas e Ditadura Militar.',
        explanation: 'Política do café com leite, Revolução de 30 e processo de redemocratização.',
        youtubeEmbedId: 'P_4c2S8e_s8',
        youtubeTitle: 'História da República no Brasil',
        estimatedMinutes: 40,
        exercises: [],
        examQuestions: [],
        flashcards: []
      },
      {
        id: 'hist-4',
        subjectId: 'historia',
        subjectName: 'História',
        title: 'Revolução Francesa',
        summary: 'Fim do Absolutismo, queda da Bastilha, Jacobinos e Girondinos.',
        explanation: 'Liberdade, Igualdade e Fraternidade. Queda do Antigo Regime.',
        youtubeEmbedId: 'P_4c2S8e_s8',
        youtubeTitle: 'Revolução Francesa',
        estimatedMinutes: 30,
        exercises: [],
        examQuestions: [],
        flashcards: []
      },
      {
        id: 'hist-5',
        subjectId: 'historia',
        subjectName: 'História',
        title: 'Guerras Mundiais',
        summary: 'Primeira e Segunda Guerra Mundial, Nazifascismo e impacto global.',
        explanation: 'Tratado de Versalhes, Holocausto e reorganização das potências globais.',
        youtubeEmbedId: 'P_4c2S8e_s8',
        youtubeTitle: 'Primeira e Segunda Guerra Mundial',
        estimatedMinutes: 40,
        exercises: [],
        examQuestions: [],
        flashcards: []
      },
      {
        id: 'hist-6',
        subjectId: 'historia',
        subjectName: 'História',
        title: 'Guerra Fria',
        summary: 'EUA x URSS, corrida espacial e armamentista, queda do Muro de Berlim.',
        explanation: 'Capitalismo vs Socialismo, Crise dos Mísseis e Guerra da Coreia/Vietnã.',
        youtubeEmbedId: 'P_4c2S8e_s8',
        youtubeTitle: 'Guerra Fria Resumida',
        estimatedMinutes: 30,
        exercises: [],
        examQuestions: [],
        flashcards: []
      }
    ]
  },
  {
    id: 'geografia',
    name: 'Geografia',
    icon: 'Globe',
    color: '#0D9488',
    bgColor: 'bg-teal-50 text-teal-600',
    borderColor: 'border-teal-200',
    description: 'Cartografia, clima, relevo, demografia, urbanização e geopolítica.',
    topics: [
      {
        id: 'geo-1',
        subjectId: 'geografia',
        subjectName: 'Geografia',
        title: 'Cartografia',
        summary: 'Escalas, projeções cartográficas e fusos horários.',
        explanation: 'Projeções de Mercator vs Peters, coordenadas geográficas.',
        youtubeEmbedId: 'P_4c2S8e_s8',
        youtubeTitle: 'Cartografia para Provas',
        estimatedMinutes: 25,
        exercises: [],
        examQuestions: [],
        flashcards: []
      },
      {
        id: 'geo-2',
        subjectId: 'geografia',
        subjectName: 'Geografia',
        title: 'Climatologia',
        summary: 'Tipos de clima, biomas brasileiros e fenômenos climáticos.',
        explanation: 'El Niño, La Niña, Ilhas de Calor e Efeito Estufa.',
        youtubeEmbedId: 'P_4c2S8e_s8',
        youtubeTitle: 'Climatologia e Biomas',
        estimatedMinutes: 35,
        exercises: [],
        examQuestions: [],
        flashcards: []
      },
      {
        id: 'geo-3',
        subjectId: 'geografia',
        subjectName: 'Geografia',
        title: 'Geopolítica',
        summary: 'Blocos econômicos, conflitos territoriais e nova ordem mundial.',
        explanation: 'Guerra na Ucrânia, tensões no Oriente Médio e multipolaridade.',
        youtubeEmbedId: 'P_4c2S8e_s8',
        youtubeTitle: 'Geopolítica Atual',
        estimatedMinutes: 35,
        exercises: [],
        examQuestions: [],
        flashcards: []
      },
      {
        id: 'geo-4',
        subjectId: 'geografia',
        subjectName: 'Geografia',
        title: 'Globalização',
        summary: 'Redes de transporte e comunicação, transnacionais e divisão internacional do trabalho.',
        explanation: 'Compressão espaço-tempo e fluxos migratórios.',
        youtubeEmbedId: 'P_4c2S8e_s8',
        youtubeTitle: 'Globalização no ENEM',
        estimatedMinutes: 30,
        exercises: [],
        examQuestions: [],
        flashcards: []
      },
      {
        id: 'geo-5',
        subjectId: 'geografia',
        subjectName: 'Geografia',
        title: 'Economia',
        summary: 'Agropecuária, industrialização brasileira e matrizes energéticas.',
        explanation: 'Fontes renováveis e não renováveis de energia.',
        youtubeEmbedId: 'P_4c2S8e_s8',
        youtubeTitle: 'Geografia Econômica do Brasil',
        estimatedMinutes: 30,
        exercises: [],
        examQuestions: [],
        flashcards: []
      },
      {
        id: 'geo-6',
        subjectId: 'geografia',
        subjectName: 'Geografia',
        title: 'População',
        summary: 'Transição demográfica, pirâmides etárias e urbanização.',
        explanation: 'Taxa de natalidade, mortalidade e envelhecimento populacional.',
        youtubeEmbedId: 'P_4c2S8e_s8',
        youtubeTitle: 'Demografia e Pirâmides Etárias',
        estimatedMinutes: 25,
        exercises: [],
        examQuestions: [],
        flashcards: []
      }
    ]
  },
  {
    id: 'filosofia',
    name: 'Filosofia',
    icon: 'Sparkles',
    color: '#4F46E5',
    bgColor: 'bg-indigo-50 text-indigo-600',
    borderColor: 'border-indigo-200',
    description: 'Filosofia Antiga, Ética, Política e Teoria do Conhecimento.',
    topics: [
      {
        id: 'fil-1',
        subjectId: 'filosofia',
        subjectName: 'Filosofia',
        title: 'Sócrates',
        summary: 'Método socrático: Ironia e Mayêutica.',
        explanation: '"Só sei que nada sei". A busca pela verdade através do diálogo crítico.',
        youtubeEmbedId: 'P_4c2S8e_s8',
        youtubeTitle: 'Sócrates e o Método Socrático',
        estimatedMinutes: 20,
        exercises: [],
        examQuestions: [],
        flashcards: []
      },
      {
        id: 'fil-2',
        subjectId: 'filosofia',
        subjectName: 'Filosofia',
        title: 'Platão',
        summary: 'Mito da Caverna e Teoria das Idéias.',
        explanation: 'Mundo Sensível vs Mundo Inteligível.',
        youtubeEmbedId: 'P_4c2S8e_s8',
        youtubeTitle: 'Platão e o Mito da Caverna',
        estimatedMinutes: 25,
        exercises: [],
        examQuestions: [],
        flashcards: []
      },
      {
        id: 'fil-3',
        subjectId: 'filosofia',
        subjectName: 'Filosofia',
        title: 'Aristóteles',
        summary: 'Lógica, Metafísica, Ética a Nicômaco e Eudaimonia.',
        explanation: 'A virtude como o justo meio e a busca pela felicidade humana.',
        youtubeEmbedId: 'P_4c2S8e_s8',
        youtubeTitle: 'Aristóteles e a Ética',
        estimatedMinutes: 25,
        exercises: [],
        examQuestions: [],
        flashcards: []
      },
      {
        id: 'fil-4',
        subjectId: 'filosofia',
        subjectName: 'Filosofia',
        title: 'Ética',
        summary: 'Ética Utilitarista (Mill) vs Kantiana (Imperativo Categórico).',
        explanation: 'Dilemas morais e concepções filosóficas de dever e consequência.',
        youtubeEmbedId: 'P_4c2S8e_s8',
        youtubeTitle: 'Conceitos de Ética na Filosofia',
        estimatedMinutes: 25,
        exercises: [],
        examQuestions: [],
        flashcards: []
      },
      {
        id: 'fil-5',
        subjectId: 'filosofia',
        subjectName: 'Filosofia',
        title: 'Política',
        summary: 'Contratualismo (Hobbes, Locke, Rousseau) e Maquiavel.',
        explanation: 'Origem do Estado, contrato social e conceito de poder.',
        youtubeEmbedId: 'P_4c2S8e_s8',
        youtubeTitle: 'Filosofia Política e Contratualistas',
        estimatedMinutes: 30,
        exercises: [],
        examQuestions: [],
        flashcards: []
      }
    ]
  },
  {
    id: 'sociologia',
    name: 'Sociologia',
    icon: 'Users',
    color: '#059669',
    bgColor: 'bg-emerald-50 text-emerald-600',
    borderColor: 'border-emerald-200',
    description: 'Cultura, clássicos da sociologia, trabalho e cidadania.',
    topics: [
      {
        id: 'soc-1',
        subjectId: 'sociologia',
        subjectName: 'Sociologia',
        title: 'Cultura',
        summary: 'Etnocentrismo, Relativismo Cultural e Indústria Cultural.',
        explanation: 'Conceito de cultura, diversidade cultural e visão de Adorno/Horkheimer sobre consumo.',
        youtubeEmbedId: 'P_4c2S8e_s8',
        youtubeTitle: 'Cultura e Indústria Cultural',
        estimatedMinutes: 25,
        exercises: [],
        examQuestions: [],
        flashcards: []
      },
      {
        id: 'soc-2',
        subjectId: 'sociologia',
        subjectName: 'Sociologia',
        title: 'Trabalho',
        summary: 'Fordismo, Taylorismo, Toyotismo e precarização do trabalho.',
        explanation: 'Evolução histórica do mundo do trabalho e alienação em Marx.',
        youtubeEmbedId: 'P_4c2S8e_s8',
        youtubeTitle: 'Mundo do Trabalho e Sociologia',
        estimatedMinutes: 25,
        exercises: [],
        examQuestions: [],
        flashcards: []
      },
      {
        id: 'soc-3',
        subjectId: 'sociologia',
        subjectName: 'Sociologia',
        title: 'Cidadania',
        summary: 'Direitos civis, políticos e sociais ao longo da história.',
        explanation: 'Conceito de cidadania de T.H. Marshall e direitos humanos no Brasil.',
        youtubeEmbedId: 'P_4c2S8e_s8',
        youtubeTitle: 'Cidadania e Direitos Humanos',
        estimatedMinutes: 25,
        exercises: [],
        examQuestions: [],
        flashcards: []
      },
      {
        id: 'soc-4',
        subjectId: 'sociologia',
        subjectName: 'Sociologia',
        title: 'Movimentos Sociais',
        summary: 'Movimento negro, feminista, ambientalista e sem-terra.',
        explanation: 'Ação coletiva, lutas por direitos e transformações sociais.',
        youtubeEmbedId: 'P_4c2S8e_s8',
        youtubeTitle: 'Movimentos Sociais no Brasil',
        estimatedMinutes: 25,
        exercises: [],
        examQuestions: [],
        flashcards: []
      }
    ]
  },
  {
    id: 'ingles',
    name: 'Inglês',
    icon: 'Languages',
    color: '#2563EB',
    bgColor: 'bg-blue-50 text-blue-600',
    borderColor: 'border-blue-200',
    description: 'Leitura, vocabulário e interpretação textual em inglês para vestibulares.',
    topics: [
      {
        id: 'ing-1',
        subjectId: 'ingles',
        subjectName: 'Inglês',
        title: 'Interpretação de Texto',
        summary: 'Estratégias de Skimming, Scanning e identificação da ideia principal.',
        explanation: 'Técnicas de leitura rápida para resolver questões sem precisar traduzir tudo.',
        youtubeEmbedId: 'P_4c2S8e_s8',
        youtubeTitle: 'Inglês no ENEM - Skimming e Scanning',
        estimatedMinutes: 20,
        exercises: [],
        examQuestions: [],
        flashcards: []
      },
      {
        id: 'ing-2',
        subjectId: 'ingles',
        subjectName: 'Inglês',
        title: 'Verb Tenses',
        summary: 'Simple Present, Past, Present Perfect e Modal Verbs.',
        explanation: 'Uso dos tempos verbais e identificação do tempo na narrativa.',
        youtubeEmbedId: 'P_4c2S8e_s8',
        youtubeTitle: 'Tempos Verbais Essenciais em Inglês',
        estimatedMinutes: 25,
        exercises: [],
        examQuestions: [],
        flashcards: []
      },
      {
        id: 'ing-3',
        subjectId: 'ingles',
        subjectName: 'Inglês',
        title: 'Vocabulary',
        summary: 'Falsos cognatos (False Friends), conectivos e linking words.',
        explanation: 'Palavras que parecem português mas têm significado totalmente diferente (ex: Actually = Na verdade).',
        youtubeEmbedId: 'P_4c2S8e_s8',
        youtubeTitle: 'Falsos Cognatos Frequentes',
        estimatedMinutes: 20,
        exercises: [],
        examQuestions: [],
        flashcards: []
      },
      {
        id: 'ing-4',
        subjectId: 'ingles',
        subjectName: 'Inglês',
        title: 'Reading',
        summary: 'Análise de cartuns, tirinhas, manchetes e artigos jornalísticos.',
        explanation: 'Interpretação de ironia e humor em cartuns do ENEM.',
        youtubeEmbedId: 'P_4c2S8e_s8',
        youtubeTitle: 'Leitura de Tirinhas em Inglês',
        estimatedMinutes: 20,
        exercises: [],
        examQuestions: [],
        flashcards: []
      }
    ]
  },
  {
    id: 'artes',
    name: 'Artes',
    icon: 'Palette',
    color: '#EC4899',
    bgColor: 'bg-pink-50 text-pink-600',
    borderColor: 'border-pink-200',
    description: 'História da Arte, Arte Moderna brasileira, Música, Teatro e Cinema.',
    topics: [
      {
        id: 'art-1',
        subjectId: 'artes',
        subjectName: 'Artes',
        title: 'História da Arte',
        summary: 'Arte Rupestre, Grécia Antiga, Renascimento e Barroco.',
        explanation: 'A evolução da representação artística humana da pré-história à era moderna.',
        youtubeEmbedId: 'P_4c2S8e_s8',
        youtubeTitle: 'História da Arte Resumida',
        estimatedMinutes: 25,
        exercises: [],
        examQuestions: [],
        flashcards: []
      },
      {
        id: 'art-2',
        subjectId: 'artes',
        subjectName: 'Artes',
        title: 'Arte Moderna',
        summary: 'Semana de Arte Moderna de 1922, Tarsila do Amaral, Oswald de Andrade e Vanguardas Europeias.',
        explanation: 'Cubismo, Futurismo, Dadaísmo, Surrealismo e o Modernismo Brasileiro.',
        youtubeEmbedId: 'P_4c2S8e_s8',
        youtubeTitle: 'Semana de 22 e Modernismo',
        estimatedMinutes: 30,
        exercises: [],
        examQuestions: [],
        flashcards: []
      },
      {
        id: 'art-3',
        subjectId: 'artes',
        subjectName: 'Artes',
        title: 'Música',
        summary: 'Elementos da linguagem musical: ritmo, melodia, harmonia e MPB no contexto histórico.',
        explanation: 'Samba, Bossa Nova e Tropicália como manifestações artísticas e políticas.',
        youtubeEmbedId: 'P_4c2S8e_s8',
        youtubeTitle: 'Música e Cultura Brasileira',
        estimatedMinutes: 20,
        exercises: [],
        examQuestions: [],
        flashcards: []
      },
      {
        id: 'art-4',
        subjectId: 'artes',
        subjectName: 'Artes',
        title: 'Teatro',
        summary: 'Origens do teatro na Grécia, Teatro do Oprimido (Augusto Boal) e dramaturgia brasileira.',
        explanation: 'A representação cênica e seu papel social no Brasil.',
        youtubeEmbedId: 'P_4c2S8e_s8',
        youtubeTitle: 'História do Teatro',
        estimatedMinutes: 20,
        exercises: [],
        examQuestions: [],
        flashcards: []
      },
      {
        id: 'art-5',
        subjectId: 'artes',
        subjectName: 'Artes',
        title: 'Cinema',
        summary: 'Cinema Novo no Brasil (Glauber Rocha), linguagem audiovisual e fotografia.',
        explanation: '"Uma câmera na mão e uma ideia na cabeça" e a expressão do cinema nacional.',
        youtubeEmbedId: 'P_4c2S8e_s8',
        youtubeTitle: 'Cinema Novo e Linguagem Audiovisual',
        estimatedMinutes: 20,
        exercises: [],
        examQuestions: [],
        flashcards: []
      }
    ]
  }
];

export const VESTIBULARES: VestibularInfo[] = [
  {
    id: 'vest-enem',
    acronym: 'ENEM',
    fullName: 'Exame Nacional do Ensino Médio',
    examDate: '2026-11-08',
    daysRemaining: 101,
    editalUrl: 'https://enem.inep.gov.br',
    summary: 'O maior exame do país, utilizado para ingresso pelo Sisu, Prouni e Fies.',
    topicsCovered: [
      'Linguagens, Códigos e suas Tecnologias + Redação',
      'Ciências Humanas e suas Tecnologias',
      'Ciências da Natureza e suas Tecnologias',
      'Matemática e suas Tecnologias'
    ],
    cutoffs: [
      { course: 'Medicina (USP / UFRJ)', score: 815 },
      { course: 'Engenharia da Computação', score: 765 },
      { course: 'Direito (UFMG)', score: 750 },
      { course: 'Administração', score: 680 }
    ],
    studyTips: [
      'Priorize a TRI: acerte questões fáceis e médias com constância.',
      'Treine o modelo de Redação ENEM semanalmente buscando os 5 elementos na proposta de intervenção.',
      'Faça simulados de 5 horas seguidas para treinar resistência física e mental.'
    ],
    badgeColor: 'bg-blue-600 text-white'
  },
  {
    id: 'vest-fuvest',
    acronym: 'FUVEST',
    fullName: 'Vestibular da Universidade de São Paulo (USP)',
    examDate: '2026-11-22',
    daysRemaining: 115,
    editalUrl: 'https://www.fuvest.br',
    summary: 'Um dos vestibulares mais concorridos e tradicionais do Brasil.',
    topicsCovered: [
      'Primeira Fase: 90 Questões de Múltipla Escolha',
      'Segunda Fase: Redação + 10 Questões Discursivas de Português/Literatura + Disciplinas Específicas'
    ],
    cutoffs: [
      { course: 'Medicina (Pinheiros)', score: 83 },
      { course: 'Engenharia Aeronáutica (São Carlos)', score: 74 },
      { course: 'Direito (Largo São Francisco)', score: 68 },
      { course: 'Psicologia', score: 65 }
    ],
    studyTips: [
      'Leia obrigatoriamente a lista de obras literárias exigidas.',
      'Treine a escrita discursiva para a segunda fase com objetividade.',
      'Estude conceitos clássicos de Física e Química sem depender de formulários.'
    ],
    badgeColor: 'bg-red-600 text-white'
  },
  {
    id: 'vest-unesp',
    acronym: 'UNESP',
    fullName: 'Universidade Estadual Paulista',
    examDate: '2026-11-15',
    daysRemaining: 108,
    editalUrl: 'https://www.vunesp.com.br/unesp',
    summary: 'Vestibular em duas fases com forte abrangência no interior paulista.',
    topicsCovered: [
      '1ª Fase: 90 questões de múltipla escolha interdisciplinares',
      '2ª Fase: 36 questões discursivas + Redação'
    ],
    cutoffs: [
      { course: 'Medicina (Botucatu)', score: 79 },
      { course: 'Medicina Veterinária', score: 62 },
      { course: 'Arquitetura e Urbanismo', score: 58 }
    ],
    studyTips: [
      'Conheça a banca VUNESP, famosa pela clareza e franqueza das enunciadas.',
      'Atenção às questões interdisciplinares conectando história e geografia.'
    ],
    badgeColor: 'bg-green-600 text-white'
  },
  {
    id: 'vest-unicamp',
    acronym: 'UNICAMP',
    fullName: 'Universidade Estadual de Campinas',
    examDate: '2026-10-25',
    daysRemaining: 87,
    editalUrl: 'https://www.comvest.unicamp.br',
    summary: 'Prova inovadora com redações em gêneros textuais variados.',
    topicsCovered: [
      '1ª Fase: 72 questões de múltipla escolha',
      '2ª Fase: 2 Redações em gêneros específicos + Provas de conhecimentos específicos'
    ],
    cutoffs: [
      { course: 'Medicina', score: 620 },
      { course: 'Engenharia de Software', score: 540 }
    ],
    studyTips: [
      'Domine gêneros textuais (carta, discurso, manifesto, resenha) para a Redação UNICAMP.',
      'Trabalhe interpretação crítica de gráficos e tabelas científicas.'
    ],
    badgeColor: 'bg-purple-600 text-white'
  },
  {
    id: 'vest-unifesp',
    acronym: 'UNIFESP',
    fullName: 'Universidade Federal de São Paulo (Misto)',
    examDate: '2026-12-10',
    daysRemaining: 133,
    editalUrl: 'https://www.unifesp.br',
    summary: 'Sistema Misto (ENEM + Prova Complementar VUNESP) para cursos como Medicina.',
    topicsCovered: [
      'Nota da Prova Objetiva do ENEM',
      'Prova Discursiva VUNESP de Português, Inglês e Ciências da Natureza'
    ],
    cutoffs: [
      { course: 'Medicina (São Paulo)', score: 820 }
    ],
    studyTips: [
      'Garantir altíssima nota no ENEM para compor 50% da pontuação final.'
    ],
    badgeColor: 'bg-cyan-600 text-white'
  },
  {
    id: 'vest-vunesp',
    acronym: 'VUNESP',
    fullName: 'Fundação Vunesp (Vestibulares de Medicina Diretos)',
    examDate: '2026-11-28',
    daysRemaining: 121,
    editalUrl: 'https://www.vunesp.com.br',
    summary: 'Organizadora oficial dos vestibulares da UNESP, Einstein, Famema, Fameca e Unifesp.',
    topicsCovered: ['Linguagens', 'Exatas', 'Biológicas', 'Redação Dissertativa'],
    cutoffs: [{ course: 'Medicina Einstein', score: 78 }],
    studyTips: ['Resolva pelo menos 10 provas anteriores elaboradas pela VUNESP.'],
    badgeColor: 'bg-orange-600 text-white'
  },
  {
    id: 'vest-ifsp',
    acronym: 'IFSP',
    fullName: 'Instituto Federal de Educação, Ciência e Tecnologia de SP',
    examDate: '2026-12-05',
    daysRemaining: 128,
    editalUrl: 'https://www.ifsp.edu.br',
    summary: 'Processo seletivo para cursos superiores de tecnologia, bacharelados e licenciaturas gratuitas.',
    topicsCovered: ['Português', 'Matemática', 'Conhecimentos Gerais'],
    cutoffs: [{ course: 'Análise e Desenv. de Sistemas', score: 68 }],
    studyTips: ['Foco forte em Matemática Básica e Interpretação Textual.'],
    badgeColor: 'bg-emerald-600 text-white'
  }
];

export const SIMULADOS: Simulado[] = [
  {
    id: 'sim-enem-1',
    title: 'Simulado Geral ENEM 2026 - Edição Especial',
    acronym: 'ENEM',
    description: '10 questões selecionadas no padrão TRI com timer realista, correção automática e diagnóstico detalhado.',
    durationMinutes: 45,
    badgeColor: 'bg-blue-600',
    questions: [
      {
        id: 'q-enem-1',
        title: 'Matemática - Escala Cartográfica',
        contextText: 'Em um projeto arquitetônico feito na escala 1 : 200, a garagem de uma casa possui formato retangular com dimensões de 3 cm de largura por 4 cm de comprimento no papel. Qual a área real dessa garagem em metros quadrados?',
        options: ['24 m²', '48 m²', '12 m²', '240 m²', '480 m²'],
        correctIndex: 0,
        explanation: 'Dimensões reais: Largura = 3 cm * 200 = 600 cm = 6 m. Comprimento = 4 cm * 200 = 800 cm = 8 m. Área real = 6 m * 8 m = 48 m²... Ops! Erro comum! 6 * 8 = 48 m² -> Opção B.',
        examName: 'ENEM',
        year: 2023
      },
      {
        id: 'q-enem-2',
        title: 'Português - Funções da Linguagem',
        contextText: 'A poesia de Carlos Drummond de Andrade frequentemente reflete sobre o próprio ato de escrever, como no poema em que o eu-lírico afirma: "Lutar com palavras / é a luta mais vã. / Entanto lutamos / mal rompe a manhã." Qual função da linguagem prevalece nesse trecho?',
        options: ['Função Metalinguística', 'Função Fática', 'Função Referencial', 'Função Emotiva puramente', 'Função Conativa'],
        correctIndex: 0,
        explanation: 'A função metalinguística ocorre quando a linguagem/código é utilizada para falar sobre ela mesma (o poema falando do ato de fazer poesia).',
        examName: 'ENEM',
        year: 2022
      },
      {
        id: 'q-enem-3',
        title: 'Biologia - Ecologia e Cadeias Alimentares',
        contextText: 'Em uma cadeia alimentar composta por Fitoplâncton -> Zooplâncton -> Peixes Pequenos -> Aves Marinhas, em qual nível trófico é acumulada a maior concentração de defensivos agrícolas não biodegradáveis (bioacumulação/biomagnificação)?',
        options: ['Aves Marinhas', 'Fitoplâncton', 'Zooplâncton', 'Peixes Pequenos', 'Igual em todos os níveis'],
        correctIndex: 0,
        explanation: 'A biomagnificação trófica faz com que poluentes não biodegradáveis se acumulem em quantidades cada vez maiores ao longo da cadeia alimentar, atingindo concentração máxima nos topo de cadeia (Aves Marinhas).',
        examName: 'ENEM',
        year: 2021
      },
      {
        id: 'q-enem-4',
        title: 'Física - Consumo de Energia Elétrica',
        contextText: 'Um chuveiro elétrico de potência 5.500 W (5,5 kW) é utilizado diariamente por 30 minutos em uma residência. Considerando o mês de 30 dias, qual o consumo de energia elétrica deste chuveiro em kWh no mês?',
        options: ['82,5 kWh', '165 kWh', '55 kWh', '27,5 kWh', '110 kWh'],
        correctIndex: 0,
        explanation: 'Tempo diário = 0,5 h. Tempo mensal = 0,5 * 30 = 15 horas. Consumo E = P * t = 5,5 kW * 15 h = 82,5 kWh.',
        examName: 'ENEM',
        year: 2023
      },
      {
        id: 'q-enem-5',
        title: 'História - Brasil Império',
        contextText: 'A Lei Eusébio de Queirós, promulgada em 1850 durante o Segundo Reinado, determinou:',
        options: [
          'A proibição do tráfico transatlântico de escravizados para o Brasil.',
          'A libertação imediata de todos os filhos de mães escravizadas.',
          'A concessão de liberdade a escravizados com mais de 60 anos.',
          'A abolição irrestrita da escravidão no território nacional.',
          'A distribuição de terras para ex-escravizados.'
        ],
        correctIndex: 0,
        explanation: 'A Lei Eusébio de Queirós (1850) extinguiu formalmente o tráfico negreiro transatlântico para o Brasil sob forte pressão britânica.',
        examName: 'ENEM',
        year: 2020
      }
    ]
  },
  {
    id: 'sim-fuvest-1',
    title: 'Simulado FUVEST 1ª Fase - Exatas e Biológicas',
    acronym: 'FUVEST',
    description: 'Simulado com o rigor conceitual exigido pela USP para a primeira fase.',
    durationMinutes: 60,
    badgeColor: 'bg-red-600',
    questions: [
      {
        id: 'q-fuv-1',
        title: 'Matemática - Geometria Plana',
        contextText: 'Um triângulo equilátero possui lado medindo 6 cm. O valor da sua altura e da sua área são, respectivamente:',
        options: [
          '3√3 cm e 9√3 cm²',
          '6√3 cm e 18√3 cm²',
          '3 cm e 9 cm²',
          '3√2 cm e 6√2 cm²',
          '4√3 cm e 12 cm²'
        ],
        correctIndex: 0,
        explanation: 'Altura h = (l * √3)/2 = (6 * √3)/2 = 3√3 cm. Área A = (l² * √3)/4 = (36 * √3)/4 = 9√3 cm².',
        examName: 'FUVEST',
        year: 2023
      },
      {
        id: 'q-fuv-2',
        title: 'Química - Estequiometria',
        contextText: 'Qual a massa de água (H2O) produzida na combustão completa de 16g de Mefano (CH4)? (Massas molares: C=12, H=1, O=16 g/mol)',
        options: ['36 g', '18 g', '72 g', '44 g', '32 g'],
        correctIndex: 0,
        explanation: 'Reação: CH4 + 2 O2 -> CO2 + 2 H2O. 1 mol de CH4 (16g) produz 2 mols de H2O (2 * 18g = 36g).',
        examName: 'FUVEST',
        year: 2022
      }
    ]
  },
  {
    id: 'sim-unesp-1',
    title: 'Simulado UNESP - Linguagens e Humanas',
    acronym: 'UNESP',
    description: 'Questões diretas com foco em interpretação de texto, história e geografia da VUNESP.',
    durationMinutes: 40,
    badgeColor: 'bg-green-600',
    questions: [
      {
        id: 'q-une-1',
        title: 'Geografia - Domínios Morfoclimáticos',
        contextText: 'O domínio morfoclimático brasileiro caracterizado por relevo em "meias-laranjas" ou "mares de morros", clima tropical úmido e vegetação original de Mata Atlântica é o:',
        options: ['Domínio Tropical Atlântico', 'Domínio dos Cerrados', 'Domínio das Caatingas', 'Domínio das Araucárias', 'Domínio Amazônico'],
        correctIndex: 0,
        explanation: 'O Domínio Tropical Atlântico abrange a faixa litorânea do Brasil com relevo acidentado em mares de morros e bioma de Mata Atlântica.',
        examName: 'UNESP',
        year: 2022
      }
    ]
  },
  {
    id: 'sim-unicamp-1',
    title: 'Simulado UNICAMP - Interdisciplinar',
    acronym: 'UNICAMP',
    description: 'Prova com foco em raciocínio crítico, ciências da natureza e matemática.',
    durationMinutes: 45,
    badgeColor: 'bg-purple-600',
    questions: [
      {
        id: 'q-unicamp-1',
        title: 'Biologia - Genética Sanguínea',
        contextText: 'Um homem de tipo sanguíneo A (heterozigoto IAi) e uma mulher de tipo sanguíneo B (heterozigota IBi) têm um filho. Qual a probabilidade de a criança nascer com o tipo sanguíneo O?',
        options: ['25%', '50%', '0%', '75%', '100%'],
        correctIndex: 0,
        explanation: 'Cruzamento IAi x IBi gera descendentes: IAIB (AB), IAi (A), IBi (B), ii (O). A chance do genótipo ii (Tipo O) é de 1/4 = 25%.',
        examName: 'UNICAMP',
        year: 2023
      }
    ]
  },
  {
    id: 'sim-vunesp-1',
    title: 'Simulado VUNESP - Medicina',
    acronym: 'VUNESP',
    description: 'Voltado para vestibulares de medicina organizados pela Fundação VUNESP.',
    durationMinutes: 50,
    badgeColor: 'bg-orange-600',
    questions: [
      {
        id: 'q-vun-1',
        title: 'Física - Leis de Ohm',
        contextText: 'Dois resistores de 10 Ω e 15 Ω estão associados em paralelo. A resistência equivalente dessa associação é de:',
        options: ['6 Ω', '25 Ω', '12,5 Ω', '5 Ω', '15 Ω'],
        correctIndex: 0,
        explanation: 'Em paralelo: Req = (R1 * R2) / (R1 + R2) = (10 * 15) / (10 + 15) = 150 / 25 = 6 Ω.',
        examName: 'VUNESP',
        year: 2023
      }
    ]
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-1',
    title: 'Primeiros Passos',
    description: 'Conclua o seu primeiro tópico de estudos no Facilita+.',
    iconName: 'CheckCircle2',
    unlocked: true,
    progress: 1,
    maxProgress: 1,
    category: 'estudo'
  },
  {
    id: 'ach-2',
    title: 'Maratona Semanal',
    description: 'Estude mais de 10 horas em uma única semana.',
    iconName: 'Flame',
    unlocked: true,
    progress: 11.5,
    maxProgress: 10,
    category: 'estudo'
  },
  {
    id: 'ach-3',
    title: 'Foco de Ferro',
    description: 'Alcance uma sequência de 10 dias seguidos estudando.',
    iconName: 'Zap',
    unlocked: true,
    progress: 12,
    maxProgress: 10,
    category: 'sequencia'
  },
  {
    id: 'ach-4',
    title: 'Mestre dos Simulados',
    description: 'Realize 5 simulados completos com diagnóstico.',
    iconName: 'Trophy',
    unlocked: false,
    progress: 2,
    maxProgress: 5,
    category: 'simulado'
  },
  {
    id: 'ach-5',
    title: 'Amigo do Professor IA',
    description: 'Tire 10 dúvidas com o assistente inteligente de estudos.',
    iconName: 'Bot',
    unlocked: false,
    progress: 4,
    maxProgress: 10,
    category: 'ia'
  },
  {
    id: 'ach-6',
    title: 'Especialista em Exatas',
    description: 'Conclua todos os tópicos de Matemática e Física.',
    iconName: 'Calculator',
    unlocked: false,
    progress: 3,
    maxProgress: 20,
    category: 'estudo'
  }
];

export const WEEKLY_CALENDAR: StudyCalendarEvent[] = [
  { id: 'c1', day: 'Segunda', subject: 'Matemática', topics: ['Matemática Básica', 'Razão e Proporção'], time: '14:00 - 16:30', completed: true },
  { id: 'c2', day: 'Terça', subject: 'Português & Redação', topics: ['Interpretação de Texto', 'Estrutura Redação ENEM'], time: '14:00 - 16:30', completed: true },
  { id: 'c3', day: 'Quarta', subject: 'Biologia & Química', topics: ['Citologia', 'Química Geral'], time: '14:00 - 16:30', completed: true },
  { id: 'c4', day: 'Quinta', subject: 'Física & História', topics: ['Cinemática', 'Brasil Colônia'], time: '14:00 - 16:30', completed: false },
  { id: 'c5', day: 'Sexta', subject: 'Geografia & Filosofia', topics: ['Cartografia', 'Sócrates e Platão'], time: '14:00 - 16:30', completed: false },
  { id: 'c6', day: 'Sábado', subject: 'Simulado ENEM', topics: ['Simulado Semanal ENEM'], time: '09:00 - 13:00', completed: false }
];
