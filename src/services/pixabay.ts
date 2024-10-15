import axios from 'axios';

const PIXABAY_API_KEY = '46491310-e435423978349c0828869aecd';

export interface PixabayResult {
  id: number;
  pageURL: string;
  type: string;
  tags: string;
  previewURL: string;
  previewWidth: number;
  previewHeight: number;
  webformatURL: string;
  webformatWidth: number;
  webformatHeight: number;
  largeImageURL: string;
  imageWidth: number;
  imageHeight: number;
  imageSize: number;
  views: number;
  downloads: number;
  collections: number;
  likes: number;
  comments: number;
  user_id: number;
  user: string;
  userImageURL: string;
  videos?: {
    large: {
      url: string;
      width: number;
      height: number;
      size: number;
    };
    medium: {
      url: string;
      width: number;
      height: number;
      size: number;
    };
    small: {
      url: string;
      width: number;
      height: number;
      size: number;
    };
    tiny: {
      url: string;
      width: number;
      height: number;
      size: number;
    };
  };
}

export interface PixabayResponse {
  total: number;
  totalHits: number;
  hits: PixabayResult[];
}

export const searchPixabay = async (query: string, type: 'image' | 'video', page: number = 1): Promise<PixabayResponse> => {
  try {
    const response = await axios.get<PixabayResponse>(`https://pixabay.com/api/${type === 'video' ? 'videos/' : ''}`, {
      params: {
        key: PIXABAY_API_KEY,
        q: query,
        per_page: 20,
        page: page,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error searching Pixabay:', error);
    throw error;
  }
};