import { GraduationCap, BookOpen, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const AcademicHeader = () => {
  return (
    <header className="bg-gradient-to-r from-card to-academic-blue-light border-b shadow-[var(--shadow-card)] sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-academic-blue to-primary rounded-lg shadow-[var(--shadow-academic)]">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">AcademicWriter</h1>
              <p className="text-sm text-academic-gray">Plataforma de Redação Científica</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-academic-gray hover:text-foreground">
              <BookOpen className="w-4 h-4 mr-2" />
              Guias
            </Button>
            <Button variant="academicOutline" size="sm">
              <User className="w-4 h-4 mr-2" />
              Perfil
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AcademicHeader;