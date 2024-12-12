import * as tf from '@tensorflow/tfjs';
// import * as high_interaction from highinteraction;
import { readFileSync } from "node:fs";


export interface TensorflowPrediction {
  id: string;
  title: string;
  score: number;
  description: string;
}

export const loadNCFModel = async () => {
  try {
    const model = await tf.loadLayersModel('/src/services/models/NCF/model.json');
    console.log('NCF Model loading complete');
    // console.log(high_interaction);
    
    return model;
  } catch (error) {
    console.error('Error loading NCF model:', error);
    throw error;
  }
};

export const getTensorflowRecommendations = async (userId: string): Promise<TensorflowPrediction[]> => {
  try {
    const model = await loadNCFModel();
    let high_interaction = JSON.parse(readFileSync('file', 'utf8'));
    console.log(high_interaction);
    
    // Create sample artist IDs for demonstration
    const artistIds = Array.from({ length: 5 }, (_, i) => i + 1);
    
    // Prepare input tensors
    const userTensor = tf.tensor2d(Array(artistIds.length).fill(Number(userId)), [artistIds.length, 1]);
    const artistTensor = tf.tensor2d(artistIds, [artistIds.length, 1]);
    
    // Make predictions
    const predictions = await model.predict([userTensor, artistTensor]) as tf.Tensor;
    const scores = await predictions.data();
    
    // Cleanup tensors
    userTensor.dispose();
    artistTensor.dispose();
    predictions.dispose();
    
    return artistIds.map((artistId, index) => ({
      id: `tf-${artistId}`,
      title: `Artist ${artistId}`,
      score: scores[index],
      description: `TensorFlow recommendation for user ${userId}`
    }));
  } catch (error) {
    console.error('Error making TensorFlow predictions:', error);
    throw error;
  }
};