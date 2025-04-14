const Question = require('./Question.js');

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

    generateQuestions() {
        // Use chatgpt api to generate questions
        let x = 0;

        while(x < this.number_of_questions) {
            let index = Math.floor(Math.random() * SAMPLE_TRIVIA_QUESTIONS.length);
            this.questions.push(this.createQuestion(SAMPLE_TRIVIA_QUESTIONS[index]));
            x++;
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

const SAMPLE_TRIVIA_QUESTIONS = [
    {
      question: "What is the capital of France?",
      answer: "Paris",
      distractions: ["Lyon", "Marseille", "Nice"]
    },
    {
      question: "Which planet is known as the Red Planet?",
      answer: "Mars",
      distractions: ["Venus", "Jupiter", "Mercury"]
    },
    {
      question: "Who wrote 'Romeo and Juliet'?",
      answer: "William Shakespeare",
      distractions: ["Charles Dickens", "Jane Austen", "Mark Twain"]
    },
    {
      question: "What is the largest ocean on Earth?",
      answer: "Pacific Ocean",
      distractions: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean"]
    },
    {
      question: "Which element has the chemical symbol 'O'?",
      answer: "Oxygen",
      distractions: ["Gold", "Osmium", "Oxide"]
    },
    {
      question: "In what year did World War II end?",
      answer: "1945",
      distractions: ["1939", "1942", "1950"]
    },
    {
      question: "Which country invented pizza?",
      answer: "Italy",
      distractions: ["Greece", "France", "Turkey"]
    },
    {
      question: "What is the smallest prime number?",
      answer: "2",
      distractions: ["1", "3", "5"]
    },
    {
      question: "Who painted the Mona Lisa?",
      answer: "Leonardo da Vinci",
      distractions: ["Vincent van Gogh", "Michelangelo", "Pablo Picasso"]
    },
    {
      question: "What gas do plants absorb from the atmosphere?",
      answer: "Carbon dioxide",
      distractions: ["Oxygen", "Nitrogen", "Hydrogen"]
    },
    {
      question: "What is the hardest natural substance?",
      answer: "Diamond",
      distractions: ["Gold", "Iron", "Quartz"]
    },
    {
      question: "How many continents are there on Earth?",
      answer: "7",
      distractions: ["6", "5", "8"]
    },
    {
      question: "Which language has the most native speakers?",
      answer: "Mandarin Chinese",
      distractions: ["English", "Spanish", "Hindi"]
    },
    {
      question: "Which planet has the most moons?",
      answer: "Saturn",
      distractions: ["Jupiter", "Uranus", "Neptune"]
    },
    {
      question: "Who discovered gravity?",
      answer: "Isaac Newton",
      distractions: ["Galileo Galilei", "Albert Einstein", "Nikola Tesla"]
    },
    {
        question: "What is the name of the ancient trade route that connected the East and West, facilitating the exchange of goods, culture, and ideas for centuries?",
        answer: "The Silk Road, an extensive network of trade routes that linked China to the Mediterranean Sea",
        distractions: [
            "The Amber Route, which mainly transported amber from the Baltic region to the Mediterranean",
            "The Spice Passage, a maritime route used primarily for transporting spices from Asia",
            "The Roman Merchant Trail, a road system built to supply Roman outposts with goods"
        ]
        },
        {
        question: "Which scientific theory, developed by Charles Darwin, explains the process by which organisms evolve over generations through natural selection?",
        answer: "The theory of evolution by natural selection, formulated by Charles Darwin in his 1859 book 'On the Origin of Species'",
        distractions: [
            "The theory of acquired characteristics proposed by Jean-Baptiste Lamarck",
            "The steady state theory of cosmic evolution",
            "The mutationism hypothesis developed in early 20th century genetics"
        ]
        },
        {
        question: "Which historical event marked the fall of the Western Roman Empire and is widely considered the end of Ancient Rome?",
        answer: "The deposition of Emperor Romulus Augustulus in 476 AD by the Germanic leader Odoacer",
        distractions: [
            "The assassination of Julius Caesar in 44 BC",
            "The eruption of Mount Vesuvius and destruction of Pompeii in 79 AD",
            "The division of the Roman Empire into Eastern and Western halves in 285 AD"
        ]
        },
        {
        question: "Which chemical element, known for its exceptional conductivity, is commonly used in electrical wiring and electronic components?",
        answer: "Copper, a reddish-brown metal with high electrical and thermal conductivity, often used in wiring",
        distractions: [
            "Aluminum, a lightweight metal used in power transmission lines due to its low cost",
            "Iron, which is commonly used in construction but less conductive",
            "Tin, a soft metal mainly used in coatings and alloys"
        ]
        },
        {
        question: "What is the name of the galaxy that contains our Solar System and appears as a hazy band in the night sky?",
        answer: "The Milky Way Galaxy, a barred spiral galaxy containing hundreds of billions of stars",
        distractions: [
            "The Andromeda Galaxy, our nearest spiral galaxy neighbor",
            "The Triangulum Galaxy, a smaller spiral in the Local Group",
            "The Whirlpool Galaxy, known for its well-defined spiral arms"
        ]
        },
        {
        question: "Which major world religion, founded in the 6th century BCE in India, emphasizes the Four Noble Truths and the Eightfold Path?",
        answer: "Buddhism, a religion and philosophy founded by Siddhartha Gautama focusing on the cessation of suffering",
        distractions: [
            "Hinduism, a major religion of India with many gods and practices",
            "Taoism, a Chinese philosophy emphasizing harmony with the Tao",
            "Zoroastrianism, one of the world’s oldest monotheistic religions founded in ancient Persia"
        ]
        },
        {
        question: "What is the term for the measurement of the total economic output of a country within a specific time frame?",
        answer: "Gross Domestic Product (GDP), which quantifies the value of all goods and services produced within a nation",
        distractions: [
            "Consumer Price Index (CPI), which measures changes in the price level of consumer goods",
            "Net National Product (NNP), which subtracts depreciation from Gross National Product",
            "Balance of Trade, which compares the value of exports and imports"
        ]
        },
        {
        question: "Which literary work is considered one of the earliest known pieces of literature, originating from ancient Mesopotamia?",
        answer: "The Epic of Gilgamesh, a Sumerian epic poem about a king's quest for immortality",
        distractions: [
            "The Iliad by Homer, detailing events of the Trojan War",
            "The Book of the Dead from ancient Egypt",
            "The Analects of Confucius, a collection of sayings and ideas"
        ]
        },
        {
        question: "Which famous structure in India was commissioned in 1632 by Emperor Shah Jahan as a mausoleum for his wife?",
        answer: "The Taj Mahal, a white marble mausoleum located in Agra and a UNESCO World Heritage Site",
        distractions: [
            "The Red Fort, a historic fort in Delhi also built by Shah Jahan",
            "The Qutub Minar, a minaret that is part of a complex in Delhi",
            "The Lotus Temple, a modern Baháʼí House of Worship in New Delhi"
        ]
        },
        {
        question: "What is the process by which green plants use sunlight to synthesize food from carbon dioxide and water?",
        answer: "Photosynthesis, a process that occurs in chloroplasts and produces oxygen as a byproduct",
        distractions: [
            "Respiration, a process by which cells convert sugars into energy",
            "Fermentation, an anaerobic process used by some organisms to generate energy",
            "Transpiration, the release of water vapor from plant leaves"
        ]
        },
        {
        question: "Which U.S. President issued the Emancipation Proclamation that declared slaves in Confederate states to be free?",
        answer: "Abraham Lincoln, who issued the proclamation on January 1, 1863, during the Civil War",
        distractions: [
            "Thomas Jefferson, who drafted the Declaration of Independence",
            "Ulysses S. Grant, who later became president after being a Union general",
            "Andrew Johnson, Lincoln’s successor who opposed many civil rights reforms"
        ]
        },
        {
        question: "Which scientific instrument is used to observe objects that are too small to be seen by the naked eye?",
        answer: "A microscope, an optical instrument that magnifies tiny specimens such as cells and bacteria",
        distractions: [
            "A telescope, which magnifies distant celestial objects",
            "A periscope, used to see over or around obstacles",
            "A spectrometer, used to measure light spectra"
        ]
        },
        {
        question: "Which global organization, established in 1945, aims to promote peace, security, and cooperation among nations?",
        answer: "The United Nations (UN), an intergovernmental organization headquartered in New York City",
        distractions: [
            "The World Trade Organization (WTO), focused on global trade",
            "The International Monetary Fund (IMF), which supports financial stability",
            "The North Atlantic Treaty Organization (NATO), a military alliance"
        ]
        },
        {
        question: "Which organ in the human body is responsible for filtering blood and producing urine?",
        answer: "The kidneys, two bean-shaped organs that remove waste and maintain fluid balance",
        distractions: [
            "The liver, which detoxifies chemicals and produces bile",
            "The pancreas, which produces insulin and enzymes",
            "The bladder, which stores urine but does not filter blood"
        ]
        },
        {
        question: "Which large desert located in northern Africa is the hottest and one of the driest places on Earth?",
        answer: "The Sahara Desert, stretching across several countries and covering over 9 million square kilometers",
        distractions: [
            "The Gobi Desert, located in northern China and southern Mongolia",
            "The Atacama Desert, one of the driest places, located in Chile",
            "The Kalahari Desert, a semi-arid sandy region in Southern Africa"
        ]
        },
        {
        question: "Which branch of mathematics deals with the study of shapes, sizes, and the properties of space?",
        answer: "Geometry, a mathematical discipline focused on the properties and relations of points, lines, surfaces, and solids",
        distractions: [
            "Algebra, which deals with symbols and the rules for manipulating them",
            "Calculus, focused on rates of change and integrals",
            "Statistics, which analyzes data and probabilities"
        ]
        },
        {
        question: "What is the term for a group of stars that form a recognizable pattern in the night sky?",
        answer: "A constellation, often named after mythological figures, animals, or objects",
        distractions: [
            "A galaxy, which is a massive system of stars, dust, and gas",
            "A nebula, a cloud of gas and dust in space",
            "An asteroid belt, a region of space with many small rocky bodies"
        ]
        },
        {
        question: "Which technological innovation, first demonstrated in 1927, allowed the transmission of moving images over a distance?",
        answer: "Television, a communication device that displays visual content transmitted by broadcast signals",
        distractions: [
            "The radio, which transmits audio signals without visuals",
            "The phonograph, an early device for playing recorded sound",
            "The typewriter, a mechanical machine for writing text"
        ]
        },
        {
        question: "What is the official term for a government ruled by a single person with absolute authority?",
        answer: "Autocracy, where one individual holds all political power without input from others",
        distractions: [
            "Oligarchy, a government ruled by a small group of people",
            "Democracy, where power is held by the people or their representatives",
            "Theocracy, where religious leaders govern in the name of a deity"
        ]
        },
    {
      question: "What is the square root of 64?",
      answer: "8",
      distractions: ["6", "7", "9"]
    },
    {
      question: "Which instrument has 88 keys?",
      answer: "Piano",
      distractions: ["Guitar", "Violin", "Accordion"]
    },
    {
      question: "How many legs does a spider have?",
      answer: "8",
      distractions: ["6", "10", "12"]
    },
    {
      question: "Which is the longest river in the world?",
      answer: "Nile",
      distractions: ["Amazon", "Yangtze", "Mississippi"]
    },
    {
      question: "Who is the author of 'Harry Potter'?",
      answer: "J.K. Rowling",
      distractions: ["J.R.R. Tolkien", "Stephen King", "Suzanne Collins"]
    },
    {
      question: "What is the main ingredient in guacamole?",
      answer: "Avocado",
      distractions: ["Tomato", "Cucumber", "Pepper"]
    },
    {
      question: "What is the currency of Japan?",
      answer: "Yen",
      distractions: ["Won", "Ruble", "Renminbi"]
    },
    {
      question: "Which country has the maple leaf on its flag?",
      answer: "Canada",
      distractions: ["Australia", "New Zealand", "United Kingdom"]
    },
    {
      question: "Which famous scientist developed the theory of relativity?",
      answer: "Albert Einstein",
      distractions: ["Isaac Newton", "Stephen Hawking", "Marie Curie"]
    },
    {
      question: "What is the tallest mountain in the world?",
      answer: "Mount Everest",
      distractions: ["K2", "Kangchenjunga", "Denali"]
    },
    {
      question: "Which metal is liquid at room temperature?",
      answer: "Mercury",
      distractions: ["Iron", "Aluminum", "Lead"]
    },
    {
      question: "Which is the only mammal capable of true flight?",
      answer: "Bat",
      distractions: ["Flying squirrel", "Bird", "Gliding possum"]
    },
    {
      question: "Which vitamin is produced when sunlight hits the skin?",
      answer: "Vitamin D",
      distractions: ["Vitamin A", "Vitamin C", "Vitamin E"]
    },
    {
      question: "What is the fastest land animal?",
      answer: "Cheetah",
      distractions: ["Lion", "Gazelle", "Horse"]
    },
    {
      question: "What color is the 'Ex' in FedEx Ground’s logo?",
      answer: "Green",
      distractions: ["Orange", "Red", "Blue"]
    },
    {
      question: "Which U.S. state is known as the Sunshine State?",
      answer: "Florida",
      distractions: ["California", "Arizona", "Nevada"]
    }
  ];
  