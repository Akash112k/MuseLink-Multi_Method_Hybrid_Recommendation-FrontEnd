import { getTensorflowRecommendations } from './tensorflowService';

interface Recommendation {
  id: string;
  title: string;
  score: number;
  description?: string;
  url: string;
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
    // Get traditional model recommendations
    const traditionalResults = await Promise.all(models.map(model => simulateModelCall(model)));
    
    // Get TensorFlow recommendations
    const tfRecommendations = await getTensorflowRecommendations(userId);
    const tensorflowResult = {
      modelName: 'NCF',
      recommendations: tfRecommendations
    };

    // Combine all results
    return [tensorflowResult];
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    throw error;
  }
};