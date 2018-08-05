const express = require('express');
const os = require('os');
const bodyParser = require('body-parser');

const app = express();
const playableOptions = ['rock', 'paper', 'scissors'];
const computerFace = {
    win: ['surprise','tired','sad-tear','sad-cry','grimace','angry','dizzy','flushed'],
    lose: ['smile-wink','smile-beam','grin-wink','grin-stars','grin-squint-tears','grin-squint','laugh-wink','grin-tongue-wink','grin-tongue-squint'],
    tie: ['surprise','meh-rolling-eyes','meh','meh-blank','grin-beam-sweat','dizzy','flushed']
}

const rand = items => items[~~(items.length * Math.random())];
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const playGame = (me, you) => {
    if (me === you) { 
        return "tie";
    }
    //you don't need break; if you have a return. The break; will never get executed.
    switch (me) {
      case 'rock':
        return (you === 'scissors') ? 'win' : 'lose';
      case 'paper':
        return (you === 'rock') ? 'win' : 'lose';
      case 'scissors':
        return (you === 'paper') ? 'win' : 'lose';  
    }
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.json());
app.use(express.urlencoded());

app.post('/api/match', (req, res) => {
    const properties = req.body;
    const latency = getRandomInt(500, 1500);
    if(typeof properties.choice === 'undefined'){
        return res.status(400).json({ message: "'choice' param must not be null" });
    }
    // simulating network latency
    setTimeout(() => {
        const playerChoice = (properties.choice || '').toLowerCase();
        if (!playableOptions.includes(playerChoice)) {
            return res.status(400).json({ message: "'choice' param must be rock, paper, or scissors" });
        }
        // Send 500 ISE randomly 1 out of 10 times
        if (getRandomInt(1,10) === 1) {
            return res.status(500).json({message: "Internal Server Error"});
        }
        const computerChoice = rand(playableOptions);
        const result = playGame(playerChoice, computerChoice);
        const face = rand(computerFace[result]);

        //if the name and value label is the same you can use shorthand like below.
        return res.json({ playerChoice, computerChoice, result, face });
    }, latency); 
});
app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));
app.listen(8080, () => console.log('Listening on port 8080!'));
