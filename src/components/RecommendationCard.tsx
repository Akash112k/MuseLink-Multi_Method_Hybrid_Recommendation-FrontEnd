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

const getPlaceholderImage = (index: number) => {
  const images = [
    'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
    'https://images.unsplash.com/photo-1518770660439-4636190af475',
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e'
  ];
  return images[index % images.length];
};

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
                  <AvatarImage src={getPlaceholderImage(index)} alt={rec.title} />
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