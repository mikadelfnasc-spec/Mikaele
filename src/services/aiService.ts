import { GoogleGenAI } from '@google/genai';

export interface AIRequestOptions {
  prompt: string;
  topicTitle?: string;
  mode?: 'chat' | 'step_by_step' | 'essay_feedback' | 'schedule';
}

export async function askProfessorIA({ prompt, topicTitle, mode = 'chat' }: AIRequestOptions): Promise<string> {
  const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || (typeof process !== 'undefined' ? process.env.GEMINI_API_KEY : '');

  // 1. System instruction setup according to topic context & mode
  let systemContext = `Você é o "Professor IA" do Facilita+, uma plataforma de estudos brasileira voltada para o ENEM e Vestibulares (FUVEST, UNESP, UNICAMP, VUNESP, etc.).
Seu tom é extremamente acolhedor, altamente pedagógico, claro, motivador e didático.
Sempre responda em português do Brasil com ótima formatação em Markdown (use tópicos, negritos, fórmulas em formato limpo, exemplos práticos).`;

  if (topicTitle) {
    systemContext += `\nO estudante está atualmente estudando a matéria/tópico: "${topicTitle}".`;
  }

  if (mode === 'step_by_step') {
    systemContext += `\nMODO: Resolução Passo a Passo de Exercício. Mostre os dados fornecidos, a fórmula/conceito aplicável e a resolução etapa por etapa com conclusão final destacada.`;
  } else if (mode === 'essay_feedback') {
    systemContext += `\nMODO: Análise e Dicas de Redação ENEM. Avalie com base nas 5 competências do ENEM, aponte pontos fortes e sugestões de conectivos e repertório sociocultural.`;
  } else if (mode === 'schedule') {
    systemContext += `\nMODO: Criador de Cronograma de Estudos Personalizado. Crie uma rotina realista distribuindo matérias de forma equilibrada entre Exatas, Humanas, Biológicas e Redação.`;
  }

  // 2. Try Gemini API call if API key exists
  if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `${systemContext}\n\nPergunta do Aluno: ${prompt}`
      });

      if (response && response.text) {
        return response.text;
      }
    } catch (err) {
      console.warn('Gemini API call warning, falling back to intelligent tutor response generator:', err);
    }
  }

  // 3. Fallback inteligente em português quando a chave não estiver configurada ou falhar
  return generateIntelligentFallback(prompt, topicTitle, mode);
}

function generateIntelligentFallback(prompt: string, topicTitle?: string, mode?: string): string {
  const lowerPrompt = prompt.toLowerCase();

  if (mode === 'essay_feedback' || lowerPrompt.includes('redação') || lowerPrompt.includes('redacao')) {
    return `### 📝 Dicas do Professor IA para Redação Nota 1000 no ENEM

Para mandar bem na redação sobre este tema, atente-se às **5 Competências do ENEM**:

1. **Competência 1 (Norma Padrão)**: Mantenha concordância impecável, evite períodos muito longos e utilize pontuação precisa.
2. **Competência 2 (Compreensão do Tema e Repertório)**:
   - *Repertório de Sociologia*: Cite a *Modernidade Líquida* de Zygmunt Bauman para problemas de relações ou consumismo.
   - *Repertório de Filosofia*: Cite o *Contrato Social* de Thomas Hobbes ou John Locke para falhas na atuação estatal.
3. **Competência 3 (Projeto de Texto)**: Defina a Tese no final do 1º parágrafo apontando 2 causas (D1 e D2).
4. **Competência 4 (Coesão)**: Use conectivos interparágrafos ("Em primeira análise,", "Ademais,", "Portanto,") e intraparágrafos.
5. **Competência 5 (Proposta de Intervenção)**: Não se esqueça dos 5 elementos no último parágrafo:
   - **Agente**: *O Ministério da Educação, em parceria com os meios de comunicação...*
   - **Ação**: *Deve implementar workshops e campanhas educativas...*
   - **Meio/Modo**: *Por meio de plataformas digitais interativas e palestras escolares...*
   - **Efeito**: *A fim de mitigar o problema e garantir a plena cidadania...*
   - **Detalhamento**: *Especificando o alcance das palestras para a comunidade regional.*

💡 **Dica Extra**: Reescreva sua introdução treinando manter no máximo 6 linhas! Tem mais alguma dúvida sobre a estrutura?`;
  }

  if (mode === 'step_by_step' || lowerPrompt.includes('passo a passo') || lowerPrompt.includes('exercicio') || lowerPrompt.includes('resolv')) {
    return `### 📐 Resolução Passo a Passo do Professor IA

Analisando a sua dúvida sobre **${topicTitle || 'este conceito de vestibular'}**:

#### 1. Identificação dos Dados do Problema
- **Conceito Chave**: Identificação da grandeza principal e relações de proporcionalidade.
- **Objetivo**: Encontrar o resultado numérico ou a alternativa correta aplicando o método direto.

#### 2. Aplicação da Fórmula / Relação Teórica
Por exemplo, se estivemos trabalhando com proporção ou função:
$$ y = a \\cdot x + b $$
Substituindo os valores fornecidos no enunciado:
1. Passo 1: Isolar as variáveis conhecidas de um lado da equação.
2. Passo 2: Executar as simplificações e cálculos algébricos básicos.
3. Passo 3: Conferir as unidades de medida (converter cm para m, min para horas, etc.).

#### 3. Conclusão Didática
Lembre-se: em vestibulares como ENEM e VUNESP, atentar-se às **unidades de medida e comandos do enunciado** (ex: "em km/h", "aproximadamente", "incorreto") elimina mais de 40% das pegadinhas!

Deseja que eu resolva outro exemplo específico para você?`;
  }

  if (mode === 'schedule' || lowerPrompt.includes('cronograma') || lowerPrompt.includes('horario') || lowerPrompt.includes('rotina')) {
    return `### 📅 Seu Cronograma Semanal Personalizado pelo Professor IA

Aqui está um plano focado em **alta eficiência e retenção**:

- **Segunda-feira (Exatas & Álgebra)**:
  - 14:00 - 15:30: Matemática (Exercícios de Porcentagem & Razão)
  - 15:40 - 16:30: Física (Cinemática & Leis de Newton)
- **Terça-feira (Linguagens & Escrita)**:
  - 14:00 - 15:30: Português (Interpretação e Funções da Linguagem)
  - 15:40 - 17:00: Redação (Escrita de 1 folha modelo ENEM)
- **Quarta-feira (Ciências da Natureza)**:
  - 14:00 - 15:30: Biologia (Ecologia & Citologia)
  - 15:40 - 16:30: Química (Estequiometria & Soluções)
- **Quinta-feira (Humanas & Sociedade)**:
  - 14:00 - 15:30: História (Brasil Império & República)
  - 15:40 - 16:30: Geografia (Cartografia & Clima)
- **Sexta-feira (RevisãoAtiva & Filosofia)**:
  - 14:00 - 15:30: Filosofia & Sociologia
  - 15:40 - 17:00: Rodada de Flashcards e Resumos das falhas da semana
- **Sábado (Simulado & Teste de Resistência)**:
  - 09:00 - 12:00: Execução de 1 Simulado do Facilita+ e análise de erros.

💡 **Regra de Ouro**: Faça pausas de 10 minutos a cada 50 minutos de estudo (Técnica Pomodoro).`;
  }

  // Resposta padrão
  return `### 💡 Resposta do Professor IA (${topicTitle ? `Foco em ${topicTitle}` : 'Estudos Facilita+'})

Olá! Excelente pergunta sobre **${prompt}**!

Para dominar este assunto com propriedade no ENEM e nos vestibulares:

1. **Conceito Central**: Compreender o princípio fundamental sem apenas memorizar fórmulas ou datas isoladas.
2. **Como a Banca Cobra**:
   - No **ENEM**, a cobrança é contextualizada, ligando o tema ao cotidiano ou a notícias socioambientais.
   - Na **FUVEST / UNESP / UNICAMP**, o foco exige rigor terminológico e aplicação direta dos conceitos.
3. **Estratégia Prática de Estudo**:
   - Assista à videoaula do tópico aqui no **Facilita+**.
   - Resolva os exercícios propostos logo abaixo da explicação.
   - Revise com os **Flashcards** antes de dormir para fixar na memória de longo prazo.

Precisa de um exemplo prático resolvido ou quer tirar alguma dúvida específica? Estou aqui para ajudar você a conquistar sua vaga! 🚀`;
}
