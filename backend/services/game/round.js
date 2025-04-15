const Question = require('./Question.js');
const openai = require('../../config/openai.js');
const { createGenerateQuestionsPrompt, trimAIResponse }  = require('../../utils/promptGeneratorUtils.js');

class Round {
    /**
     * 
     * @param {string} status 
     * @param {string} genre 
     * @param {string} difficulty 
     * @param {number} number_of_questions 
     * @param {number} time_per_question 
     * @param {Array<Question>} questions 
     * @param {number} current_question 
     */
    constructor(status, genre, difficulty, number_of_questions, time_per_question, questions = [], current_question = 0) {
        this.status = status;
        this.genre = genre;
        this.difficulty = difficulty;
        this.number_of_questions = number_of_questions;
        this.time_per_question = time_per_question;
        this.questions = questions.length ? this.hydrateQuestions(questions) : [];
        this.current_question = current_question;
        this.players_answered = 0;
    }

    complete() {
        this.status = 'completed';
    }
    
    getQuestions() {
        if(!this.questions.length) return { };

        return { 
            time_per_question: this.time_per_question,
            questions: this.questions.map(question => {
                return question.getCompiledQuestion();
            })
        };
    }

    getScores() {
        return this.questions.reduce((acc, question) => {
            acc[question.getId()] = question.getScores();
            return acc;
        }, {});
    }
    
    createQuestion(question_data) {
        return new Question(question_data.question, question_data.answer, question_data.distractions);
    }

    async generateQuestions() {
        try {
            let questions = await this.fetchQuestions();
            
            if(!questions || !questions.length) {
                throw new Error('No questions found');
            }
            questions.forEach((question) => {
                this.questions.push(this.createQuestion(question));
            });
            return true;
        } catch (error) {
            console.error('Error generating questions: ', error);
            return false;
        }
    }

    async fetchQuestions() {
        try {
            if(!this.genre || !this.difficulty || !this.number_of_questions) {
                reject(new Error('Missing parameters'));
            }
            let prompt = createGenerateQuestionsPrompt(this.number_of_questions, this.genre, this.difficulty);
            // Use chatgpt api to generate questions
            let response = await openai.chat.completions.create({
                model: 'gpt-4o-mini',
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
            });
            // Parse the response and return the questions
            return trimAIResponse(response);
        } catch (error) {
            console.error('Error fetching questions: ', error);
            return [];
        }
    }
    
    hydrateQuestions(questions) {
        if(!questions.length) return [];

        return questions.map(question => {
            return this.createQuestion(question);
        });
    }

    pushPlayerAnswers(player_id, answers) {
        this.questions.forEach((question) => {
            if(answers[question.getId()] !== undefined) {
                question.setPlayerAnswer(player_id, answers[question.getId()]);
            }
        });
        this.players_answered++;
    }

    playersAnswered() {
        return this.players_answered;
    }

    moveToNextQuestion() {
        this.current_question++;
    }

    serialise() {
        return {
            status: this.status,
            genre: this.genre,
            difficulty: this.difficulty,
            number_of_questions: this.number_of_questions,
            time_per_question: this.time_per_question,
            questions: this.questions.map(question => question.serialise()),
            current_question: this.current_question
        }
    }
}

module.exports = Round;