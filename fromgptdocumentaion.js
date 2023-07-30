
async function runOpenAI() {
    try {
        const configuration = new openai.Configuration({
            apiKey: "OPEN_AI_KEY",
        });
        const openaiInstance = new openai.OpenAIApi(configuration);
        const chat_completion = await openaiInstance.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: "Hello world" }],
        });

        // Process the result, e.g., log the response
        console.log(chat_completion);
    } catch (error) {
        // Handle any errors that might occur during the API call
        console.error("Error:", error.message);
    }
}
