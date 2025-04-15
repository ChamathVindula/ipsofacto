module.exports.createGenerateQuestionsPrompt = (number_of_questions, genre, difficulty) => {
    return `
            Generate ${number_of_questions} trivia questions in the ${genre} genre with ${difficulty} difficulty.
            Give the questions in a json array and each question should be an object with the following properties:
            - question: the question text
            - answer: the correct answer
            - distractions: an array of 3 wrong answers and the correct answer

            Adjust the similarity of the distractions to the correct answer based on the difficulty level.

            Give only the array and no other text.
        `
}

module.exports.trimAIResponse = (response) => {
    let cleaned = response.choices[0].message.content.replace(/^```json/, "").replace(/```$/, "");
    
    if(!cleaned) {
        throw new Error('No questions found');
    }
    return JSON.parse(cleaned);
}