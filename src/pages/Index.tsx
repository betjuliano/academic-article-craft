import { Target, FileText, BarChart3, MessageSquare, CheckCircle, BookOpen, Users, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import AcademicLayout from "@/components/AcademicLayout";
import AcademicCard from "@/components/AcademicCard";
import academicHero from "@/assets/academic-hero.jpg";

const Index = () => {
  const navigate = useNavigate();

  const handleStartNewArticle = () => {
    navigate("/process");
  };
  const academicSteps = [
    {
      icon: Target,
      title: "Objetivo & Contexto",
      description: "Defina o objetivo central e o contexto do seu artigo acadêmico com orientação estruturada."
    },
    {
      icon: FileText,
      title: "Introdução Estruturada",
      description: "Construa uma introdução em formato de funil, da contextualização geral ao objetivo específico."
    },
    {
      icon: BarChart3,
      title: "Metodologia Detalhada",
      description: "Defina tipo de estudo, critérios de inclusão/exclusão e processo de seleção com rigor científico."
    },
    {
      icon: MessageSquare,
      title: "Resultados & Análise",
      description: "Organize e categorize seus achados principais com orientações para análise adequada."
    },
    {
      icon: CheckCircle,
      title: "Discussão & Conclusão",
      description: "Desenvolva interpretações, identifique limitações e estabeleça contribuições do estudo."
    },
    {
      icon: BookOpen,
      title: "Revisão Final",
      description: "Aplique rigor linguístico e científico com verificações finais antes da submissão."
    }
  ];

  const features = [
    {
      icon: Users,
      title: "Processo Colaborativo",
      description: "Interface pensada para trabalho em equipe com múltiplos pesquisadores."
    },
    {
      icon: Lightbulb,
      title: "Orientação Inteligente",
      description: "Dicas contextuais e lembretes para manter o padrão acadêmico em cada etapa."
    }
  ];

  return (
    <AcademicLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-academic-blue-light via-card to-background rounded-2xl p-12 mb-12 shadow-[var(--shadow-card)]">
        <div className="relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-foreground mb-6 leading-tight">
              Crie Artigos Acadêmicos com
              <span className="bg-gradient-to-r from-academic-blue to-primary bg-clip-text text-transparent"> Rigor Científico</span>
            </h1>
            <p className="text-xl text-academic-gray mb-8 leading-relaxed max-w-2xl mx-auto">
              Uma plataforma completa que orienta você através de cada etapa da redação acadêmica, 
              garantindo qualidade e estrutura desde o primeiro rascunho até a submissão final.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" variant="academic" className="text-lg px-8 py-6" onClick={handleStartNewArticle}>
                <FileText className="w-5 h-5 mr-2" />
                Iniciar Novo Artigo
              </Button>
              <Button size="lg" variant="academicOutline" className="text-lg px-8 py-6" onClick={handleStartNewArticle}>
                <BookOpen className="w-5 h-5 mr-2" />
                Ver Demonstração
              </Button>
            </div>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 bg-academic-blue rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-primary rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-academic-blue rounded-full"></div>
        </div>
      </section>

      {/* Academic Process Steps */}
      <section className="mb-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Processo Estruturado de Redação Acadêmica
          </h2>
          <p className="text-lg text-academic-gray max-w-2xl mx-auto">
            Siga um método comprovado que garante qualidade e rigor científico em cada seção do seu artigo.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {academicSteps.map((step, index) => (
            <AcademicCard
              key={index}
              title={step.title}
              description={step.description}
              icon={step.icon}
              status="pending"
              className="h-full"
            />
          ))}
        </div>
      </section>

      {/* Additional Features */}
      <section className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Recursos Adicionais
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <AcademicCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              status="pending"
              className="h-full"
            />
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center bg-gradient-to-r from-academic-blue-light to-card rounded-2xl p-10 shadow-[var(--shadow-card)]">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Pronto para Começar seu Artigo Acadêmico?
        </h2>
        <p className="text-lg text-academic-gray mb-6 max-w-2xl mx-auto">
          Junte-se a pesquisadores que já estão utilizando nossa plataforma para 
          criar artigos com maior rigor científico e estrutura profissional.
        </p>
        <Button size="lg" variant="academic" className="text-lg px-8 py-6" onClick={handleStartNewArticle}>
          <Target className="w-5 h-5 mr-2" />
          Começar Agora
        </Button>
      </section>
    </AcademicLayout>
  );
};

export default Index;
