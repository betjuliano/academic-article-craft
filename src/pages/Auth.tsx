import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Chrome } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

const Auth = () => {
  const navigate = useNavigate();
  const { user, signInWithGoogle, loading } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/assistente');
    }
  }, [user, navigate]);

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Error during Google login:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-academic-blue-light via-card to-background flex items-center justify-center">
        <div className="text-center">
          <GraduationCap className="w-12 h-12 text-academic-blue mx-auto mb-4 animate-pulse" />
          <p className="text-academic-gray">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-academic-blue-light via-card to-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-[var(--shadow-card)]">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gradient-to-br from-academic-blue to-primary rounded-lg shadow-[var(--shadow-academic)]">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">
            Bem-vindo ao AcademicWriter
          </CardTitle>
          <CardDescription className="text-academic-gray">
            Faça login para acessar sua plataforma de redação científica
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <Button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 transition-colors"
            size="lg"
          >
            <Chrome className="w-5 h-5" />
            Continuar com Google
          </Button>
          
          <div className="text-center">
            <p className="text-sm text-academic-gray">
              Ao fazer login, você concorda com nossos{' '}
              <a href="#" className="text-academic-blue hover:underline">
                Termos de Uso
              </a>{' '}
              e{' '}
              <a href="#" className="text-academic-blue hover:underline">
                Política de Privacidade
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;