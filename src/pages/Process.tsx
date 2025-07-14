import { useState } from "react";
import { Target, FileText, BarChart3, MessageSquare, CheckCircle, BookOpen, ArrowRight, ArrowLeft, Bot, Sparkles, Search, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AcademicLayout from "@/components/AcademicLayout";
import StepNavigation from "@/components/StepNavigation";

const Process = () => {
  const [currentStep, setCurrentStep] = useState("objetivo");
  const [isAIProcessing, setIsAIProcessing] = useState(false);
  const [aiSuggestions, setAISuggestions] = useState<string[]>([]);
  const [aiGeneratedContent, setAIGeneratedContent] = useState("");
  const [showAIPanel, setShowAIPanel] = useState(false);
  const [formData, setFormData] = useState({
    objetivo: "",
    contexto: "",
    introducao: "",
    metodologia: "",
    resultados: "",
    discussao: "",
    conclusao: ""
  });

  const steps = [
    { id: "objetivo", title: "Objetivo & Contexto", description: "Defina o foco do estudo", status: "in-progress" as const },
    { id: "introducao", title: "Introdução", description: "Estruture o background", status: "pending" as const },
    { id: "metodologia", title: "Metodologia", description: "Detalhe os métodos", status: "pending" as const },
    { id: "resultados", title: "Resultados", description: "Apresente os achados", status: "pending" as const },
    { id: "discussao", title: "Discussão", description: "Interprete os dados", status: "pending" as const },
    { id: "conclusao", title: "Conclusão", description: "Finalize o artigo", status: "pending" as const }
  ];

  const stepIcons = {
    objetivo: Target,
    introducao: FileText,
    metodologia: BarChart3,
    resultados: MessageSquare,
    discussao: CheckCircle,
    conclusao: BookOpen
  };

  const stepContent = {
    objetivo: {
      title: "Defina o Objetivo e Contexto do Artigo",
      description: "Comece estabelecendo claramente o que seu artigo pretende investigar e o contexto que justifica essa investigação.",
      fields: [
        {
          id: "objetivo",
          label: "Objetivo Principal do Estudo",
          placeholder: "Ex: Investigar o impacto da tecnologia X no processo Y em contexto Z...",
          type: "textarea"
        },
        {
          id: "contexto",
          label: "Contexto e Justificativa",
          placeholder: "Ex: No cenário atual da área X, observa-se uma lacuna em relação a...",
          type: "textarea"
        }
      ],
      guidance: [
        "Seja específico e mensurável no objetivo",
        "Justifique a relevância do estudo", 
        "Contextualize dentro da área de conhecimento",
        "Identifique a lacuna que será preenchida"
      ],
      instructions: `
**INSTRUÇÕES PARA REDAÇÃO ACADÊMICA:**

1. **Nunca altere o conteúdo do material recebido** - preserve a essência das ideias
2. **Siga rigorosamente o padrão acadêmico APA 7ª edição**
3. **Ajuste fluidez e elimine redundâncias** - torne o texto mais conciso
4. **Mantenha tom neutro** - evite frases coloquiais ou sem validação acadêmica
5. **Aproveite as referências recebidas** - use-as para sustentar argumentos
6. **Solicite "Referência X"** quando necessário incluir citações adicionais
7. **Para reduções**: diminua ~20% do texto sem perder contexto ou padrão`
    },
    introducao: {
      title: "Construa uma Introdução Estruturada",
      description: "Desenvolva uma introdução em formato de funil, partindo do geral para o específico.",
      fields: [
        {
          id: "introducao",
          label: "Texto da Introdução",
          placeholder: "Desenvolva a introdução seguindo a estrutura: contextualização geral → revisão da literatura → identificação da lacuna → objetivo específico...",
          type: "textarea"
        }
      ],
      guidance: [
        "Inicie com contextualização ampla da área",
        "Apresente o estado da arte",
        "Identifique lacunas ou problemas",
        "Declare claramente o objetivo do estudo",
        "Destaque a contribuição esperada"
      ],
      instructions: `
**INSTRUÇÕES PARA REDAÇÃO ACADÊMICA:**

1. **Nunca altere o conteúdo do material recebido** - preserve a essência das ideias
2. **Siga rigorosamente o padrão acadêmico APA 7ª edição**
3. **Ajuste fluidez e elimine redundâncias** - torne o texto mais conciso
4. **Mantenha tom neutro** - evite frases coloquiais ou sem validação acadêmica
5. **Aproveite as referências recebidas** - use-as para sustentar argumentos
6. **Solicite "Referência X"** quando necessário incluir citações adicionais
7. **Para reduções**: diminua ~20% do texto sem perder contexto ou padrão`
    },
    metodologia: {
      title: "Detalhe a Metodologia do Estudo",
      description: "Estruture detalhadamente todos os aspectos metodológicos para garantir replicabilidade.",
      fields: [
        {
          id: "metodologia",
          label: "Metodologia Completa",
          placeholder: "Descreva: tipo de estudo, população, amostra, critérios, instrumentos, procedimentos, análises...",
          type: "textarea"
        }
      ],
      guidance: [
        "Defina claramente o tipo e desenho do estudo",
        "Especifique população e critérios de seleção",
        "Detalhe instrumentos e procedimentos de coleta",
        "Descreva métodos de análise de dados",
        "Inclua aspectos éticos e limitações"
      ],
      instructions: `
**INSTRUÇÕES PARA REDAÇÃO ACADÊMICA:**

1. **Nunca altere o conteúdo do material recebido** - preserve a essência das ideias
2. **Siga rigorosamente o padrão acadêmico APA 7ª edição**
3. **Ajuste fluidez e elimine redundâncias** - torne o texto mais conciso
4. **Mantenha tom neutro** - evite frases coloquiais ou sem validação acadêmica
5. **Aproveite as referências recebidas** - use-as para sustentar argumentos
6. **Solicite "Referência X"** quando necessário incluir citações adicionais
7. **Para reduções**: diminua ~20% do texto sem perder contexto ou padrão`
    },
    resultados: {
      title: "Apresente os Resultados",
      description: "Organize os achados de forma clara e objetiva, sem interpretações.",
      fields: [
        {
          id: "resultados",
          label: "Resultados do Estudo",
          placeholder: "Apresente os dados coletados, análises estatísticas, tabelas e figuras...",
          type: "textarea"
        }
      ],
      guidance: [
        "Caracterize a amostra estudada",
        "Apresente resultados por objetivos",
        "Use tabelas e figuras quando apropriado",
        "Mantenha objetividade, sem interpretação",
        "Inclua análises estatísticas relevantes"
      ],
      instructions: `
**INSTRUÇÕES PARA REDAÇÃO ACADÊMICA:**

1. **Nunca altere o conteúdo do material recebido** - preserve a essência das ideias
2. **Siga rigorosamente o padrão acadêmico APA 7ª edição**
3. **Ajuste fluidez e elimine redundâncias** - torne o texto mais conciso
4. **Mantenha tom neutro** - evite frases coloquiais ou sem validação acadêmica
5. **Aproveite as referências recebidas** - use-as para sustentar argumentos
6. **Solicite "Referência X"** quando necessário incluir citações adicionais
7. **Para reduções**: diminua ~20% do texto sem perder contexto ou padrão`
    },
    discussao: {
      title: "Interprete e Discuta os Resultados",
      description: "Analise os achados à luz da literatura existente e suas implicações.",
      fields: [
        {
          id: "discussao",
          label: "Discussão dos Resultados",
          placeholder: "Interprete os achados, compare com literatura, discuta implicações e limitações...",
          type: "textarea"
        }
      ],
      guidance: [
        "Interprete os achados principais",
        "Compare com estudos anteriores",
        "Discuta implicações teóricas e práticas",
        "Reconheça limitações do estudo",
        "Sugira direções para pesquisas futuras"
      ],
      instructions: `
**INSTRUÇÕES PARA REDAÇÃO ACADÊMICA:**

1. **Nunca altere o conteúdo do material recebido** - preserve a essência das ideias
2. **Siga rigorosamente o padrão acadêmico APA 7ª edição**
3. **Ajuste fluidez e elimine redundâncias** - torne o texto mais conciso
4. **Mantenha tom neutro** - evite frases coloquiais ou sem validação acadêmica
5. **Aproveite as referências recebidas** - use-as para sustentar argumentos
6. **Solicite "Referência X"** quando necessário incluir citações adicionais
7. **Para reduções**: diminua ~20% do texto sem perder contexto ou padrão`
    },
    conclusao: {
      title: "Finalize com Conclusões Sólidas",
      description: "Sintetize os achados e suas contribuições para o conhecimento.",
      fields: [
        {
          id: "conclusao",
          label: "Conclusão do Artigo",
          placeholder: "Sintetize achados principais, contribuições, implicações e recomendações futuras...",
          type: "textarea"
        }
      ],
      guidance: [
        "Sintetize os achados principais",
        "Responda claramente ao objetivo proposto",
        "Destaque a contribuição para o conhecimento",
        "Indique implicações práticas",
        "Sugira pesquisas futuras"
      ],
      instructions: `
**INSTRUÇÕES PARA REDAÇÃO ACADÊMICA:**

1. **Nunca altere o conteúdo do material recebido** - preserve a essência das ideias
2. **Siga rigorosamente o padrão acadêmico APA 7ª edição**
3. **Ajuste fluidez e elimine redundâncias** - torne o texto mais conciso
4. **Mantenha tom neutro** - evite frases coloquiais ou sem validação acadêmica
5. **Aproveite as referências recebidas** - use-as para sustentar argumentos
6. **Solicite "Referência X"** quando necessário incluir citações adicionais
7. **Para reduções**: diminua ~20% do texto sem perder contexto ou padrão`
    }
  };

  const currentStepData = stepContent[currentStep as keyof typeof stepContent];
  const CurrentIcon = stepIcons[currentStep as keyof typeof stepIcons];

  const handleNext = () => {
    const currentIndex = steps.findIndex(step => step.id === currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id);
    }
  };

  const handlePrevious = () => {
    const currentIndex = steps.findIndex(step => step.id === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id);
    }
  };

  // Prompts do Agente Especialista Acadêmico
  const agentPrompts = {
    objetivo: {
      role: "Especialista em Produção Acadêmica de Alto Rigor",
      task: "definir_objetivo_contexto",
      prompt: `Como especialista acadêmico sênior, analise o objetivo e contexto fornecidos. 
      
      Objetivo: ${formData.objetivo}
      Contexto: ${formData.contexto}
      
      Forneça:
      1. Versão aprimorada do objetivo (específica, mensurável, clara)
      2. Contexto expandido com justificativa científica
      3. Identificação de lacunas de pesquisa
      4. Sugestões de palavras-chave para busca bibliográfica
      5. Possíveis limitações a considerar
      
      Mantenha rigor acadêmico e linguagem formal. Sinalize com "Referência X" onde referências são necessárias.`
    },
    introducao: {
      role: "Especialista em Produção Acadêmica de Alto Rigor", 
      task: "redigir_introducao_funil",
      prompt: `Com base no objetivo e contexto validados, redija uma introdução estruturada em formato de funil:
      
      Contexto: ${formData.contexto}
      Objetivo: ${formData.objetivo}
      
      Estruture em 5-7 parágrafos:
      1. Contextualização ampla da área
      2. Estado da arte e principais estudos
      3. Lacunas identificadas na literatura  
      4. Justificativa do estudo
      5. Objetivo específico e hipóteses
      6. Contribuição esperada
      7. Estrutura do artigo (opcional)
      
      Sinalize "Referência X" onde citações são necessárias. Use linguagem acadêmica formal.`
    },
    metodologia: {
      role: "Especialista em Produção Acadêmica de Alto Rigor",
      task: "detalhar_metodologia", 
      prompt: `Estruture a metodologia completa baseada no objetivo:
      
      Objetivo: ${formData.objetivo}
      
      Inclua:
      1. Tipo de estudo e desenho metodológico
      2. População e amostra
      3. Critérios de inclusão/exclusão
      4. Instrumentos de coleta de dados
      5. Procedimentos de coleta
      6. Análise de dados (métodos estatísticos)
      7. Aspectos éticos
      8. Limitações metodológicas
      
      Detalhe cada seção com rigor científico.`
    },
    resultados: {
      role: "Especialista em Produção Acadêmica de Alto Rigor",
      task: "analisar_resultados",
      prompt: `Organize e analise os resultados fornecidos:
      
      Dados: ${formData.resultados}
      
      Estruture:
      1. Caracterização da amostra
      2. Resultados principais por objetivos
      3. Análises estatísticas descritivas
      4. Análises inferenciais
      5. Tabelas e figuras necessárias
      6. Resultados secundários
      
      Apresente objetivamente, sem interpretação. Use linguagem precisa e dados específicos.`
    },
    discussao: {
      role: "Especialista em Produção Acadêmica de Alto Rigor",
      task: "discutir_resultados", 
      prompt: `Interprete os resultados considerando:
      
      Resultados: ${formData.resultados}
      Objetivo: ${formData.objetivo}
      
      Desenvolva:
      1. Interpretação dos achados principais
      2. Comparação com literatura existente
      3. Implicações teóricas
      4. Implicações práticas
      5. Limitações do estudo
      6. Forças do estudo
      7. Direções futuras
      
      Sinalize "Referência X" para comparações. Mantenha rigor interpretativo.`
    },
    conclusao: {
      role: "Especialista em Produção Acadêmica de Alto Rigor",
      task: "finalizar_conclusoes",
      prompt: `Redija conclusão sintética baseada em:
      
      Objetivo: ${formData.objetivo}
      Resultados: ${formData.resultados}
      Discussão: ${formData.discussao}
      
      Inclua:
      1. Síntese dos achados principais
      2. Resposta ao objetivo proposto
      3. Contribuição para o conhecimento
      4. Implicações práticas
      5. Recomendações para pesquisas futuras
      6. Considerações finais
      
      Seja conciso, objetivo e conclusivo.`
    }
  };

  // Função para processar com IA
  const processWithAI = async (step: string) => {
    setIsAIProcessing(true);
    setShowAIPanel(true);
    
    try {
      const prompt = agentPrompts[step as keyof typeof agentPrompts];
      
      // Simulação de chamada IA (implementar com OpenAI posteriormente)
      const response = await simulateAIResponse(prompt.prompt);
      
      setAIGeneratedContent(response);
      setAISuggestions([
        "Conteúdo gerado com base no prompt do especialista acadêmico",
        "Requer validação do usuário antes de aplicar",
        "Referências indicadas precisam ser verificadas",
        "Sugestões de melhoria incluídas"
      ]);
    } catch (error) {
      console.error("Erro no processamento IA:", error);
    } finally {
      setIsAIProcessing(false);
    }
  };

  // Simulação de resposta IA (substituir por integração real)
  const simulateAIResponse = async (prompt: string): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const responses = {
      objetivo: `**OBJETIVO APRIMORADO:**
      Investigar os efeitos da implementação de metodologias ativas de aprendizagem no desempenho acadêmico e engajamento de estudantes universitários em cursos de ciências exatas.

      **CONTEXTO EXPANDIDO:**
      No cenário educacional contemporâneo, observa-se uma crescente demanda por metodologias que promovam maior engajamento estudantil (Referência 1). As metodologias tradicionais apresentam limitações na formação de competências essenciais (Referência 2).

      **LACUNAS IDENTIFICADAS:**
      - Escassez de estudos longitudinais sobre efetividade
      - Necessidade de métricas padronizadas de engajamento
      - Falta de análise por área específica do conhecimento`,
      
      introducao: `**INTRODUÇÃO ESTRUTURADA:**

      A educação superior enfrenta desafios significativos na formação de profissionais competentes para o século XXI (Referência 1). As transformações sociais e tecnológicas exigem abordagens pedagógicas inovadoras que superem o modelo tradicional de ensino (Referência 2).

      Estudos recentes demonstram que metodologias ativas promovem aprendizagem significativa e desenvolvimento de competências essenciais (Referência 3). A literatura evidencia benefícios como maior retenção de conhecimento e desenvolvimento do pensamento crítico (Referência 4).

      Contudo, identificam-se lacunas na compreensão dos mecanismos específicos através dos quais essas metodologias influenciam o desempenho acadêmico...`,
      
      default: `Conteúdo acadêmico estruturado gerado pelo especialista acadêmico com base no prompt fornecido. Este texto mantém rigor científico e linguagem formal apropriada para publicação em periódicos de alto impacto.`
    };
    
    const currentStepResponse = responses[currentStep as keyof typeof responses] || responses.default;
    return currentStepResponse;
  };

  const handleFieldChange = (fieldId: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  return (
    <AcademicLayout>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Step Navigation Sidebar */}
        <div className="lg:col-span-1">
          <StepNavigation 
            steps={steps}
            currentStep={currentStep}
            onStepClick={setCurrentStep}
          />
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3">
          <Card className="shadow-[var(--shadow-card)]">
            <CardHeader className="bg-gradient-to-r from-academic-blue-light to-card border-b">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-academic-blue text-white rounded-lg">
                  <CurrentIcon className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-foreground">
                    {currentStepData?.title}
                  </CardTitle>
                  <CardDescription className="text-lg text-academic-gray">
                    {currentStepData?.description}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-8">
              {/* Form Fields */}
              <div className="space-y-6 mb-8">
                {currentStepData?.fields.map((field) => (
                  <div key={field.id} className="space-y-2">
                    <Label htmlFor={field.id} className="text-base font-medium text-foreground">
                      {field.label}
                    </Label>
                    {field.type === "textarea" ? (
                      <Textarea
                        id={field.id}
                        placeholder={field.placeholder}
                        value={formData[field.id as keyof typeof formData]}
                        onChange={(e) => handleFieldChange(field.id, e.target.value)}
                        className="min-h-[120px] resize-y"
                      />
                    ) : (
                      <Input
                        id={field.id}
                        placeholder={field.placeholder}
                        value={formData[field.id as keyof typeof formData]}
                        onChange={(e) => handleFieldChange(field.id, e.target.value)}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* AI Agent Panel */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 mb-8 border border-blue-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <Bot className="w-5 h-5 text-academic-blue" />
                    Especialista Acadêmico IA
                  </h3>
                  <Button 
                    onClick={() => processWithAI(currentStep)} 
                    disabled={isAIProcessing}
                    className="bg-academic-blue hover:bg-academic-blue/90"
                  >
                    {isAIProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processando...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Analisar com IA
                      </>
                    )}
                  </Button>
                </div>
                
                <p className="text-sm text-academic-gray mb-4">
                  O especialista acadêmico analisará seu conteúdo e fornecerá sugestões com rigor científico.
                </p>

                {showAIPanel && (
                  <div className="space-y-4">
                    {aiSuggestions.length > 0 && (
                      <div className="bg-white rounded-lg p-4 border">
                        <h4 className="font-medium text-foreground mb-2">Análise do Especialista:</h4>
                        <ul className="space-y-1">
                          {aiSuggestions.map((suggestion, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm text-academic-gray">
                              <CheckCircle className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                              <span>{suggestion}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {aiGeneratedContent && (
                      <div className="bg-white rounded-lg p-4 border">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-foreground">Conteúdo Sugerido:</h4>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Search className="w-3 h-3 mr-1" />
                              Buscar Refs
                            </Button>
                            <Button 
                              size="sm" 
                              className="bg-academic-blue hover:bg-academic-blue/90"
                              onClick={() => {
                                const fieldId = currentStepData?.fields[0]?.id;
                                if (fieldId) {
                                  handleFieldChange(fieldId, aiGeneratedContent);
                                }
                              }}
                            >
                              Aplicar
                            </Button>
                          </div>
                        </div>
                        <div className="text-sm text-academic-gray whitespace-pre-wrap bg-gray-50 p-3 rounded max-h-60 overflow-y-auto">
                          {aiGeneratedContent}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Guidance Section */}
              <div className="bg-academic-blue-light rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-academic-blue" />
                  Orientações para esta Seção
                </h3>
                <ul className="space-y-2">
                  {currentStepData?.guidance.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2 text-academic-gray">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Academic Writing Instructions */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200 mb-8">
                <h3 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-purple-600" />
                  Instruções de Redação Acadêmica
                </h3>
                <div className="text-sm text-purple-700 whitespace-pre-line">
                  {currentStepData?.instructions}
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t">
                <div className="flex gap-3">
                  <Button 
                    variant="academicOutline" 
                    onClick={handlePrevious}
                    disabled={currentStep === steps[0].id}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Anterior
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => window.location.href = '/config-api'}
                    className="text-academic-blue border-academic-blue hover:bg-academic-blue/10"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Configurar APIs
                  </Button>
                </div>
                
                <div className="flex gap-3">
                  <Button variant="outline">
                    Salvar Rascunho
                  </Button>
                  <Button 
                    variant="academic"
                    onClick={handleNext}
                    disabled={currentStep === steps[steps.length - 1].id}
                  >
                    Próximo
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AcademicLayout>
  );
};

export default Process;