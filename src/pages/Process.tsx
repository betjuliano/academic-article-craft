import { useState } from "react";
import { Target, FileText, BarChart3, MessageSquare, CheckCircle, BookOpen, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AcademicLayout from "@/components/AcademicLayout";
import StepNavigation from "@/components/StepNavigation";

const Process = () => {
  const [currentStep, setCurrentStep] = useState("objetivo");
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
      ]
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
      ]
    }
    // Adicionar mais conteúdo para outras seções conforme necessário
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

              {/* Guidance Section */}
              <div className="bg-academic-blue-light rounded-lg p-6 mb-8">
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

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t">
                <Button 
                  variant="academicOutline" 
                  onClick={handlePrevious}
                  disabled={currentStep === steps[0].id}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Anterior
                </Button>
                
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