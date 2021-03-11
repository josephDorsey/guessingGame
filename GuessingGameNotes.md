# Demo Manipulation

## What is the DOM actually?

`Document Object Model`: Structured representation of html documents allows javascript to access html elements and styles to manipulate them.

- we can change text, HTML, attributes, and even CSS styles

To target an element from the html file you need to type in the following:

document.querySelector('.message');

this will print to the console
console.log(document.querySelector('.message'))

<p class="message">Start guessing...</p>

If we want just the "Start guessing..." part we will use .textContent attached to it like this:

console.log(document.querySelector('.message').textContent);

this prints "Start guessing..." to the console

# Selecting and Manipulating Elements

## .textContent: how to set the content of an element

With `.textContent` you can set the content of an element similarly to the previous code we wrote. We just add an `=` sign and then set it to whatever content we want. When you look at the page again, it'll be updated. For example lets have our `.textContent` say ` 🎉 Correct Number!`

document.querySelector('.message').textContent = ` 🎉 Correct Number!`

- When we look in our chrome console, we still have the Start guessing... being logged because that's what the content of the element used to be before.
  - if we console.log the code above it will now reflect the change we made.
  - console.log(document.querySelector('.message').textContent);

lets do the same for the .number and .score classes and change their textContent to 13, and 10; and then look at the page again. It now reflects our change

## .value

For changing an Input field we need to target its value, and to do that we use .value

if we try calling our input class which is named .guess, when we call it with .value and log it to the console it prints a blank entry to the console. (Our input is empty)

console.log(document.querySelector('.guess').value);

Now lets try changing it by assigning something to it. OK! so we assigned it 23 and it appears in the input field! If we want it to log it to the console we just need to shift the console.log code down

document.querySelector('.guess').value = 23;
console.log(document.querySelector('.guess').value);

# Handling Click Events

`addEventListener('click')` will perform the action 'click' as the first argument because that is the name of the event that it is listening for. To get it to actually run we need to make a function for the second argument that will contain exactly the code that should be executed whenever this click event happens

```
.addEventListener('click', function() {
    console.log(document.querySelector('.guess').value)
});
```

remember we use `.value` here because its an input field and they require us to use .value to get its information.

- Now when we enter 9 in the input field and hit the check button, 9 will be printed to the console

We can also do some DOM manipulation here. If we add the code:

```
document.querySelector('.message').textContent = `🎉 Correct Number!`
```

to the `addEventListener` it will also change the Start guessing... to Correct Number! - however this bit has nothing to do with the game so we remove it from our code, it was just a demonstration

# Project #1 - Guessing Game Let's start building the game

So lets start off by instead of logging it to the console now we will save it to a variable called guess. When we look at the guess type of in the console it reflects that is a string. In this game we need our inputted answers to be numbers so we need to convert this variable to a string.

const guess = Number(document.querySelector('.guess').value)

- now when reflecting on the console you see that it is now a number. (guess, typeof guess) > 5 "number"

## Let's start building the game logic

-First in our game we want to make sure that the player has even entered a value. lets check if there is a value by writing a conditional statement

BIG BRAIN MOMENT

- Ok so if i hit enter on the check button and we have nothing inputted it will return a 0 in the log. And as we know in the fundamentals of javascript that 0 is a falsy. So when we enter no value in this guess field input it will be 0 and inside a conditional if() statement all parameters have a boolean value, in this case it is guess with no value inputted which returns 0 is already false. This is why we use the negation operator (!guess) to convert this statement from a falsy to a true.
  - Because now this statement says if guess = 0 and its true then we want it to print our that there is no number inputted.

## Game Logic there are 3 steps

- we need to implement something when a person enters the correct number (secret number)
- we need one when a number is too low
- we need one when a number is too high

### Game Logic #1 - Secret Number

In order for us to start we need to define that secret number. Otherwise there is nothing which we can compare the guess to, all right?

It's important to build this outside of the event handler because if we didn't we would get a new secret number every time we would click our check button.

For example let's say that we wanted our number to be between 0-20.

In order for us to create the secret number we are going to use (Math.random()_ 20) because this will spawn us a number between 0-19 including decimals and in order to make it 1-20 we simply add + 1 (Math.random()_ 20)+1 get rid of the decimals we simply just Math.trunc() the code and it will remove it.

Now with this we have our secret number. In the real game the ? is hidden but for the sake of our development let's show it.

So lets select that .number class:

document.querySelector('.number').textContent = number;

kind of like before when we assigned it a value of 13, this time we will assign it to our new variable number. So now every time we reload the page our random number is selected in the box.

### Game Logic #2 - Let's compare guess to the secret number (guess === secretNumber)

So we already have the condition if there is no guess then just print no number. But now what if there actually is a guess?

so we need an else if statement if guess is the same as the secret number

if (!guess) {
document.querySelector('.message').textContent = 'No number ⛔️!';
} else if (guess === number) {
document.querySelector('.message').textContent = '🎉 Correct Number!`';
}

### Game Logic #3 - Let's make a conditional for if the guess is too high

if (!guess) {
document.querySelector('.message').textContent = 'No number ⛔️!';
} else if (guess === number) {
document.querySelector('.message').textContent = '🎉 Correct Number!`'; } else if (guess > secretNumber) { document.querySelector('.message').textContent = 'Number is too high`';

### Game Logic #4 - Let's make a conditional for if the guess is too low

if (!guess) {
document.querySelector('.message').textContent = 'No number ⛔️!';
} else if (guess === number) {
document.querySelector('.message').textContent = '🎉 Correct Number!`'; } else if (guess > secretNumber) { document.querySelector('.message').textContent = 'Number is too high`';
} else if (guess < secretNumber) {
document.querySelector('.message').textContent = 'Number is too low`';
}

## Score how to make it decrease when a guess is wrong

- each time there is a wrong guess we want the Score value to decrease by 1
- so first lets create a variable for score and assign it a value of 20

```
let score = 20;
```

Next, we target our two conditionals where the decrements would happen and add in the code score = score - 1 or score--. This will decrease the score each time.
Now we need to update the element that holds the score to do that we simply do:

document.querySelector('.score').textContent = score; under our score--;

It's important to not just rely on the DOM to hold our data, we want to actually store it in a variable like we did with score.

So when testing the decrement and we reach 0. Nothing happens because we have no created a conditional that sets anything up for that. So in this case it keeps going on - When reviewing the code we want this all to only run whenever the score is above 0. So we need to create another if statement inside our decrement code that will explain what happens when the score runs out

```
} else if (guess > secretNumber) {
    if (score > 0) {
      document.querySelector('.message').textContent = 'too high ⬆';
      score--;
      document.querySelector('.score').textContent = score;
    }
```

it is perfectly fine to have another if statement inside this already else if block - this basically says if the score is above 0 only then do all of this - and then we make an else block that if it is 0 then we want to display another message.

```
document.querySelector('.message').textContent = 'YOU LOST THE GAME!';
```

So when we get to 0 we still have to click it one more time to get the message that we lost. In order to fix this we need to set the conditional to greater than 1 instead of 0. - when we try this time we get you Lost at 1. in order to fix that we need to add the document.querySelector to the else block for losing and assign it to 0

```
document.querySelector('.score').textContent = 0 ;
```

## How to use JavaScript to manipulate CSS

We want to try and change the entire background page to a green color whenever the user gets the correct number. And we want the guess box to be wider when they win

### Targeting the body

We need to target the body so lets create a document.querySelector('body'); - since there is only one body, its going to target the whole thing

To change the CSS we need to write .style and then the property we want to change:

```
document.querySelector('body').style.backgroundColor = "#60b347";
```

background-color is not used because in javascript the - is not valid so CSS properties adapt the camelCase notation. When we enter the color it needs the equals and its needs to be a string

### Target the width

Whenever we are manipulating a style, we need to specify a string and in there we need a unit. When we check the CSS file .number has a 15rem, lets double it and make it 30rem
document.querySelector('.number').style.width = ""

## Coding Challenge #1

Implement a game reset functionality, so that the player can make a new guess! Here is how:

1. Select the element with the 'again' class and attach a click event handler
2. in the handler function restore initial values of the score and number variables
3. restore the initial conditions of the message, number, and score and guess input field
4. Also restore the original background color (#222) and number width (15rem)

We will be doing the again button on our own, but first we need to fix something. We need to hide our secret number. We only want it to show when our player wins. So lets just move it to our winner section part of the code

### Restoring the secretNumber and score variables

so we need to put our state variables inside this new function

```
document.querySelector('.again').addEventListener('click', function() {
score = 20;
secretNumber = Math.trunc(Math.random() \* 20) + 1;
})
```

we don't want to use let because we don't want to reassign these as a new variables

### next we reset .message

document.querySelector('.message').textContent = 'Start guessing...';

- to reset for this challenge we need to set the message back to this.

### next we reset the score

document.querySelector('.score').textContent = score;

- we use score instead of assigning it 20 because score already has the value of 20. So its better to use that than repeating the same value

### change the number

document.querySelector('.number').textContent = '?';

- this will reset this back to the ?

### change the guess field to empty

document.querySelector('.guess').value = '';

- if we want this to be empty then we give it an empty value like this

### restore background and width

document.querySelector('body').style.backgroundColor = '#222';
document.querySelector('.number').style.width = '15rem';

Now this should all work.

## Implementing highScores

First we are going to need a variable for highscore.
so make one with our other state variables. Let's start it off with 0 because the first score is always gonna be highest score because it's always going to be greater than 0.

```
let highscore = 0;
```

Where will we implement this code? We will put this inside the winner's if block. So all we need to do is make a conditional that says if score > highscore then highscore = score. And then we need to display that on the element

```
if (score > highscore) {
    highscore = score;
document.querySelector('.highscore').textContent = highscore;

}
```

## Refactoring to clean up our code

Let's clean up our duplicate code, we are going to refactor.

### We are starting with the guess is too high and too low

- the only difference they have so far is their string that says if they are too high or too low
- Instead of having a block for too high and too low we can make it into one block for the situation where the guess is different
- lets make a new else if, kind of similar to our win block we had if guess === secretNumber you win. If we set it to guess !== secretNumber its the same as

```
//when guess is wrong
else if ( guess !== secretNumber) {
        if (score > 1) {
            document.querySelector('.message').textContent = 'too high ⬆';
            score--;
            document.querySelector('.score').textContent = score;
          } else {
            document.querySelector('.message').textContent = 'YOU LOST THE GAME! 😵';
            document.querySelector('.score').textContent = 0;
          }
    }
```

So we copy the code and put it here, but we still need a conditional to figure out if the number is too high or too low.

#### Using the ternary operator

guess > secretNumber ? 'too high' : 'too low';

this basically says if guess is greater than secretNumber itll print, too high, but if its not it faults to the other side of the colon which is our else conditional which then print too low

### Another good way to refactor code is to create functions

- for example we have the same code here in multiple places
- when we highlight:

```
document.querySelector('.message').textContent =
```

in vscode we so the other occurences of this same code

- whenever that happens we can also refactor this same code into a function and then call the function in all the places where we have the duplicate code. The lecturer wont do all of them but we will do the .message one and we can do the others on our own.
- so we will take that code string and make it into a state variable

so we create

```
const displayMessage = function(message) {
    document.querySelector('.message').textContent = message;
}
```

we assigned the `=` to `message` and that will be replaced by what's inside the parameter.

so lets comment out:

```
document.querySelector('.message').textContent = 'No number ⛔️';
```

and replace it with:

```
displayMessage('No number ⛔️');
```
