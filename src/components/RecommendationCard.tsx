import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Recommendation {
  id: string;
  title: string;
  score: number;
  description?: string;
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
          {recommendations.map((rec) => (
            <li key={rec.id} className="recommendation-item p-3 rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <h4 className="font-medium">{rec.title}</h4>
                <span className="text-sm text-primary/80">
                  Score: {rec.score.toFixed(2)}
                </span>
              </div>
              {rec.description && (
                <p className="text-sm text-muted-foreground">{rec.description}</p>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};