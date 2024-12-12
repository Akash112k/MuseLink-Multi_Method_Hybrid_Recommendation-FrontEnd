import * as tf from '@tensorflow/tfjs';
import high_interaction from './highinteraction.json' with { type: 'json' };
import artist from './artists.json' with {type: 'json'};


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

    let artistIds = high_interaction.map(item => item.artistID);
    let uniqueArtistId = new Set(artistIds);
    artistIds = [...uniqueArtistId];
    
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
      id: `${artistId}`,
      title: `Artist ${artistId}`,
      score: scores[index],
      description: `TensorFlow recommendation for user ${userId}`
    })).sort((a, b) => b.score - a.score);
  } catch (error) {
    console.error('Error making TensorFlow predictions:', error);
    throw error;
  }
};