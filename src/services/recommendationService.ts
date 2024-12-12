interface Recommendation {
  id: string;
  title: string;
  score: number;
  description?: string;
}

interface ModelResponse {
  modelName: string;
  recommendations: Recommendation[];
}

export const fetchRecommendations = async (userId: string): Promise<ModelResponse[]> => {
  // Simulated API calls to different recommendation models
  const models = ['collaborative', 'content-based', 'hybrid'];
  
  const simulateModelCall = async (modelName: string): Promise<ModelResponse> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      modelName: modelName,
      recommendations: Array.from({ length: 5 }, (_, i) => ({
        id: `${modelName}-${i}`,
        title: `Recommendation ${i + 1} from ${modelName}`,
        score: Math.round((Math.random() * 100)) / 100,
        description: `This is a ${modelName} recommendation for user ${userId}`
      }))
    };
  };

  try {
    const results = await Promise.all(models.map(model => simulateModelCall(model)));
    return results;
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    throw error;
  }
};