import { ReactNode } from "react";
import AcademicHeader from "./AcademicHeader";

interface AcademicLayoutProps {
  children: ReactNode;
}

const AcademicLayout = ({ children }: AcademicLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <AcademicHeader />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
};

export default AcademicLayout;