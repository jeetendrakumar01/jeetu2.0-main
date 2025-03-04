const API_KEY = "AIzaSyCZzRA0XfJ007hcjOz5aD-Yn2MrPrwKMT0";

async function generateAIResponse(prompt) {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            maxOutputTokens: 40
          }
        })
      }
    );


    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error generating AI response:', error);
    return "Sorry, I couldn't generate a response.";
  }
}

export default generateAIResponse;
