import { useState } from "react";
import { Key, Save, Settings, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

interface APIKey {
  id: string;
  name: string;
  placeholder: string;
  description: string;
}

const APIKeysConfig = () => {
  const { toast } = useToast();
  const [apiKeys, setApiKeys] = useState<Record<string, string>>({});
  const [savedKeys, setSavedKeys] = useState<Record<string, boolean>>({});

  const providers: APIKey[] = [
    {
      id: "openai",
      name: "OpenAI",
      placeholder: "sk-...",
      description: "Chave da API OpenAI para GPT-4 e outros modelos"
    },
    {
      id: "claude",
      name: "Claude (Anthropic)",
      placeholder: "sk-ant-...",
      description: "Chave da API Claude para modelos da Anthropic"
    },
    {
      id: "gemini",
      name: "Google Gemini",
      placeholder: "AIza...",
      description: "Chave da API Google Gemini"
    },
    {
      id: "groq",
      name: "Groq",
      placeholder: "gsk_...",
      description: "Chave da API Groq para modelos rápidos"
    },
    {
      id: "deepseek",
      name: "DeepSeek",
      placeholder: "sk-...",
      description: "Chave da API DeepSeek"
    },
    {
      id: "grok",
      name: "Grok (X.AI)",
      placeholder: "xai-...",
      description: "Chave da API Grok da X.AI"
    }
  ];

  const handleKeyChange = (providerId: string, value: string) => {
    setApiKeys(prev => ({
      ...prev,
      [providerId]: value
    }));
    
    // Remove saved status when key changes
    setSavedKeys(prev => ({
      ...prev,
      [providerId]: false
    }));
  };

  const saveKey = (providerId: string) => {
    const key = apiKeys[providerId];
    if (!key?.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, insira uma chave válida",
        variant: "destructive"
      });
      return;
    }

    // Save to localStorage
    localStorage.setItem(`api_key_${providerId}`, key);
    setSavedKeys(prev => ({
      ...prev,
      [providerId]: true
    }));

    toast({
      title: "Chave salva!",
      description: `Chave da API ${providers.find(p => p.id === providerId)?.name} salva com sucesso.`,
    });
  };

  const loadSavedKeys = () => {
    const saved: Record<string, string> = {};
    const savedStatus: Record<string, boolean> = {};
    
    providers.forEach(provider => {
      const savedKey = localStorage.getItem(`api_key_${provider.id}`);
      if (savedKey) {
        saved[provider.id] = savedKey;
        savedStatus[provider.id] = true;
      }
    });
    
    setApiKeys(saved);
    setSavedKeys(savedStatus);
  };

  // Load saved keys on component mount
  useState(() => {
    loadSavedKeys();
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="shadow-[var(--shadow-card)]">
        <CardHeader className="bg-gradient-to-r from-academic-blue-light to-card border-b">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-academic-blue text-white rounded-lg">
              <Settings className="w-6 h-6" />
            </div>
            <div>
              <CardTitle className="text-2xl text-foreground">
                Configuração de API Keys
              </CardTitle>
              <CardDescription className="text-lg text-academic-gray">
                Configure suas chaves de API para diferentes provedores de LLM
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-8">
          <div className="mb-6">
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Segurança</h4>
              <p className="text-sm text-yellow-700">
                As chaves são armazenadas localmente no seu navegador. Não as compartilhe e mantenha-as seguras.
              </p>
            </div>
          </div>

          <Tabs defaultValue="openai" className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
              {providers.map(provider => (
                <TabsTrigger key={provider.id} value={provider.id} className="relative">
                  {provider.name}
                  {savedKeys[provider.id] && (
                    <Check className="w-3 h-3 absolute -top-1 -right-1 text-green-500" />
                  )}
                </TabsTrigger>
              ))}
            </TabsList>

            {providers.map(provider => (
              <TabsContent key={provider.id} value={provider.id} className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Key className="w-5 h-5" />
                      {provider.name}
                    </CardTitle>
                    <CardDescription>
                      {provider.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor={`key-${provider.id}`}>Chave da API</Label>
                      <div className="flex gap-2">
                        <Input
                          id={`key-${provider.id}`}
                          type="password"
                          placeholder={provider.placeholder}
                          value={apiKeys[provider.id] || ""}
                          onChange={(e) => handleKeyChange(provider.id, e.target.value)}
                          className="flex-1"
                        />
                        <Button
                          onClick={() => saveKey(provider.id)}
                          className="bg-academic-blue hover:bg-academic-blue/90"
                          disabled={!apiKeys[provider.id]?.trim()}
                        >
                          <Save className="w-4 h-4 mr-2" />
                          Salvar
                        </Button>
                      </div>
                    </div>
                    
                    {savedKeys[provider.id] && (
                      <div className="flex items-center gap-2 text-green-600 text-sm">
                        <Check className="w-4 h-4" />
                        Chave salva e pronta para uso
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>

          <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2">ℹ️ Como obter as chaves</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li><strong>OpenAI:</strong> https://platform.openai.com/api-keys</li>
              <li><strong>Claude:</strong> https://console.anthropic.com/</li>
              <li><strong>Gemini:</strong> https://makersuite.google.com/app/apikey</li>
              <li><strong>Groq:</strong> https://console.groq.com/keys</li>
              <li><strong>DeepSeek:</strong> https://platform.deepseek.com/api-keys</li>
              <li><strong>Grok:</strong> https://console.x.ai/</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default APIKeysConfig;