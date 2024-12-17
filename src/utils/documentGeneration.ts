export async function generateLegalContent(
  description: string,
  documentType: string,
  courtInfo: { state: string; county: string }
): Promise<string> {
  // In a production environment, this would use environment variables
  const apiKey = localStorage.getItem('perplexityApiKey');
  
  if (!apiKey) {
    throw new Error("Perplexity API key not found");
  }

  const systemPrompt = `You are a legal document expert. Generate formal legal document content for a ${documentType} 
  that will be filed in ${courtInfo.state}, ${courtInfo.county}. The content should be formal, precise, and follow standard legal writing conventions.`;

  try {
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-small-128k-online',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: description
          }
        ],
        temperature: 0.2,
        max_tokens: 1000,
      }),
    });

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error generating document content:', error);
    throw new Error('Failed to generate document content');
  }
}