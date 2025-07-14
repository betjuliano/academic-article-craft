import { useState } from "react";
import { Send, ArrowLeft, MessageSquare, User, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import AcademicLayout from "@/components/AcademicLayout";

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const WritingAssistant = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const processWithAcademicAgent = async (userText: string): Promise<string> => {
    // Simulated AI processing with the academic agent instructions
    setIsLoading(true);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // This would be replaced with actual LLM integration
    const response = `**Análise Acadêmica Concluída**

**Trecho Original:** "${userText}"

**Trecho Sugerido:** "${userText}" (com ajustes de fluidez e eliminação de redundâncias)

**Observação:** Recomendo verificar a adequação às normas APA 7ª edição e incluir referências adequadas para sustentar as afirmações apresentadas.

**Sugestões de Melhoria:**
- Considerar tom mais neutro e objetivo
- Eliminar possíveis redundâncias
- Verificar estrutura gramatical conforme padrão acadêmico

**Referências Necessárias:** 
- Referência 1: para fundamentar [conceito específico]
- Referência 2: para sustentar [metodologia mencionada]

*Análise realizada seguindo padrões acadêmicos internacionais e normas APA 7ª edição.*`;
    
    setIsLoading(false);
    return response;
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");

    try {
      const assistantResponse = await processWithAcademicAgent(input);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: assistantResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Erro ao processar mensagem:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <AcademicLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="academicOutline"
            size="sm"
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
          <div className="flex items-center gap-3">
            <MessageSquare className="w-6 h-6 text-academic-blue" />
            <h1 className="text-2xl font-bold text-foreground">Assistente de Redação Acadêmica</h1>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-academic-blue-light rounded-lg p-4 mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-2">Como Usar o Assistente</h2>
          <ul className="text-academic-gray text-sm space-y-1">
            <li>• Cole seu texto acadêmico para revisão e sugestões de melhoria</li>
            <li>• Receba feedback seguindo padrões APA 7ª edição</li>
            <li>• Obtenha sugestões de fluidez e eliminação de redundâncias</li>
            <li>• Identifique onde referências são necessárias</li>
            <li>• Mantenha tom acadêmico neutro e rigoroso</li>
          </ul>
        </div>

        {/* Chat Area */}
        <div className="bg-card rounded-lg shadow-[var(--shadow-card)] flex flex-col h-[600px]">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center py-12">
                <Bot className="w-12 h-12 text-academic-blue mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Assistente Acadêmico Pronto
                </h3>
                <p className="text-academic-gray">
                  Envie seu texto acadêmico para receber sugestões de melhoria seguindo rigor científico.
                </p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.type === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-academic-blue flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}
                  
                  <div
                    className={`max-w-[70%] p-4 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-academic-blue text-white'
                        : 'bg-academic-blue-light text-foreground'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    <div className="text-xs opacity-70 mt-2">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>

                  {message.type === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              ))
            )}
            
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-academic-blue flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-academic-blue-light p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-academic-blue rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-academic-blue rounded-full animate-pulse delay-75"></div>
                    <div className="w-2 h-2 bg-academic-blue rounded-full animate-pulse delay-150"></div>
                    <span className="text-academic-gray text-sm ml-2">Analisando texto...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-border p-4">
            <div className="flex gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Cole seu texto acadêmico aqui para revisão..."
                className="flex-1 min-h-[100px] resize-none"
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!input.trim() || isLoading}
                variant="academic"
                size="sm"
                className="self-end"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AcademicLayout>
  );
};

export default WritingAssistant;