import { useState } from 'react';
import { UserIdInput } from '@/components/UserIdInput';
import { RecommendationCard } from '@/components/RecommendationCard';
import { SkeletonCard } from '@/components/SkeletonCard';
import { fetchRecommendations } from '@/services/recommendationService';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleUserIdSubmit = async (userId: string) => {
    setIsLoading(true);
    try {
      const results = await fetchRecommendations(userId);
      setRecommendations(results);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch recommendations. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-gradient">
      <div className="max-w-7xl mx-auto p-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Recommendation Engine
          </h1>
          <p className="text-lg text-foreground">
            Enter a user ID to get personalized recommendations from multiple models
          </p>
        </div>

        <UserIdInput onSubmit={handleUserIdSubmit} isLoading={isLoading} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
          ) : (
            recommendations.map((model) => (
              <RecommendationCard
                key={model.modelName}
                modelName={model.modelName}
                recommendations={model.recommendations}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;