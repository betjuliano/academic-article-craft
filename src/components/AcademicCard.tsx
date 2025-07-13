import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface AcademicCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  status?: "pending" | "in-progress" | "completed";
  onClick?: () => void;
  className?: string;
}

const AcademicCard = ({ 
  title, 
  description, 
  icon: Icon, 
  status = "pending", 
  onClick, 
  className 
}: AcademicCardProps) => {
  const statusStyles = {
    pending: "border-muted hover:border-academic-blue/50",
    "in-progress": "border-academic-blue bg-academic-blue-light/30",
    completed: "border-green-500 bg-green-50"
  };

  const iconStyles = {
    pending: "text-academic-gray bg-academic-gray-light",
    "in-progress": "text-academic-blue bg-academic-blue-light",
    completed: "text-green-600 bg-green-100"
  };

  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all hover:shadow-[var(--shadow-card)] hover:scale-[1.02]",
        statusStyles[status],
        className
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start gap-4">
          <div className={cn(
            "p-3 rounded-lg transition-all",
            iconStyles[status]
          )}>
            <Icon className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-lg text-foreground mb-1">{title}</CardTitle>
            <CardDescription className="text-academic-gray leading-relaxed">
              {description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      {status !== "pending" && (
        <CardContent className="pt-0">
          <div className="flex items-center gap-2 text-sm">
            <div className={cn(
              "w-2 h-2 rounded-full",
              status === "in-progress" ? "bg-academic-blue animate-pulse" : "bg-green-500"
            )} />
            <span className="text-academic-gray">
              {status === "in-progress" ? "Em andamento" : "Concluído"}
            </span>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default AcademicCard;