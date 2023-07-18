export default async function generateCommentReplyAPI(commentText) {
    const prompt = `Комментарий: ${commentText}\nОтвет:`;
    
    const openaiAPIKey = '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';
  
    const apiUrl = 'https://api.openai.com/v1/chat/completions'; 
  
    const requestBody = {
        model: 'gpt-3.5-turbo',
        prompt:prompt,
        max_tokens: 500,
        temperature: 0.7,
        top_p: 1.0,
        n: 1,
        stop: null,
    };
  
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${openaiAPIKey}`,
      },
      body: JSON.stringify(requestBody),
    };
  
    try {
      const response = await fetch(apiUrl, requestOptions);
      const data = await response.json();
      console.log(data)
      // Получаем сгенерированный ответ от OpenAI
      const generatedText = data.choices[0].text.trim();
  
      return generatedText;
    } catch (error) {
      console.error('Ошибка при генерации ответа:', error);
      throw error;
    }
  }


