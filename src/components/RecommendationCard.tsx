import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface Recommendation {
  id: string;
  title: string;
  score: number;
  description?: string;
  url: string;
}

interface RecommendationCardProps {
  modelName: string;
  recommendations: Recommendation[];
}

export const RecommendationCard = ({ modelName, recommendations }: RecommendationCardProps) => {
  return (
    <Card className="glass-card fade-in">
      <CardHeader>
        <CardTitle className="text-lg font-medium bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          {modelName.charAt(0).toUpperCase() + modelName.slice(1)} Model
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {recommendations.map((rec, index) => (
            <li key={rec.id} className="recommendation-item p-3 rounded-lg">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={rec.description} alt={rec.title} />
                  <AvatarFallback>{rec.title[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-medium">
                      <a href={rec.url} className="hover:text-primary transition-colors">
                        {rec.title}
                      </a>
                    </h4>
                    <span className="text-sm text-primary/80">
                      Score: {rec.score.toFixed(2)}
                    </span>
                  </div>
                  {rec.description && (
                    <p className="text-sm text-muted-foreground">Artist Id: {rec.id}</p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};