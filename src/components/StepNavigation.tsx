import { Check, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
}

interface StepNavigationProps {
  steps: Step[];
  currentStep: string;
  onStepClick: (stepId: string) => void;
}

const StepNavigation = ({ steps, currentStep, onStepClick }: StepNavigationProps) => {
  return (
    <div className="bg-card border rounded-lg p-6 shadow-[var(--shadow-card)]">
      <h3 className="text-lg font-semibold text-foreground mb-4">Progresso do Artigo</h3>
      <div className="space-y-3">
        {steps.map((step, index) => {
          const isActive = step.id === currentStep;
          const isClickable = step.status !== "pending" || isActive;
          
          return (
            <div
              key={step.id}
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all",
                isActive ? "bg-academic-blue-light border border-academic-blue" : "hover:bg-academic-gray-light",
                !isClickable && "opacity-50 cursor-not-allowed"
              )}
              onClick={() => isClickable && onStepClick(step.id)}
            >
              <div className={cn(
                "flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium",
                step.status === "completed" 
                  ? "bg-green-500 text-white" 
                  : step.status === "in-progress"
                  ? "bg-academic-blue text-white"  
                  : "bg-academic-gray-light text-academic-gray"
              )}>
                {step.status === "completed" ? (
                  <Check className="w-4 h-4" />
                ) : (
                  index + 1
                )}
              </div>
              
              <div className="flex-1">
                <h4 className={cn(
                  "font-medium",
                  isActive ? "text-academic-blue" : "text-foreground"
                )}>
                  {step.title}
                </h4>
                <p className="text-sm text-academic-gray">{step.description}</p>
              </div>
              
              {isActive && (
                <ChevronRight className="w-5 h-5 text-academic-blue" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepNavigation;