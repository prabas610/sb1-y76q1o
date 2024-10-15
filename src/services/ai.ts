// This is a mock AI service. In a real application, you would integrate with an actual AI API.

export interface AIResponse {
  content: string;
  error?: string;
}

export const generateContent = async (prompt: string): Promise<AIResponse> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Simulate success/failure randomly
  const success = Math.random() > 0.1;

  if (success) {
    return {
      content: `AI generated content based on: "${prompt}"\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`
    };
  } else {
    return {
      content: '',
      error: 'An error occurred while generating content. Please try again.'
    };
  }
};