import * as tf from '@tensorflow/tfjs';
import high_interaction from './highinteraction.json' with { type: 'json' };
import artist from './artists.json' with {type: 'json'};
import artist_tags from './artist_tags.json' with {type: 'json'};

export interface TensorflowPrediction {
  id: string;
  title: string;
  score: number;
  description: string;
  url: string;
  tags: String[];
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

    let artistMap = new Map();
    artist.forEach(artist => { artistMap.set(artist.id, artist);});

    let tagMap = new Map();
    artist_tags.forEach(atv => tagMap.set(atv.artistID, atv.tag));

    return artistIds.map((artistId, index) => ({
      id: `${artistId}`,
      title: artistMap.get(artistId).name,
      score: scores[index],
      description: artistMap.get(artistId).pictureURL,
      url: artistMap.get(artistId).url,
      tags: (tagMap.get(artistId) || []).slice(0, 5)
    })).sort((a, b) => b.score - a.score).slice(0, 9);
  } catch (error) {
    console.error('Error making TensorFlow predictions:', error);
    throw error;
  }
};