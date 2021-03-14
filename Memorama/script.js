const cards = document.querySelectorAll('.memory-card'); //aqui estamos tomando las cartas del index para poder utilizarlas en el codigo

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() 
{
  if (lockBoard) return;

  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) //si la tarjeta no se ha volteado cambiar el valor a verdadero
  {
    
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  //segunda tarjeta
  secondCard = this;

  checkForMatch();
}

function checkForMatch() //esta funcion es simple, en el archivo index le pusimos una tag en el "data-framework" si el tag es igual en ambas se tomara como par
{
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards(); //esta es una funcion ternaria, es lo mismo como si fuera un if y else pero de esta manera ahorra mas codigo
  //si la condicion es verdadera la funcion de event listener cuando se haga click se eliminara
  //si la condicon es falsa, la cartas se voltearan
}

function disableCards() //funcion que quita el event listener
 {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() //funcion para voltear las tarjetas 
{
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() 
{
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() 
{
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12); //le estamos asiganando una tag a cada tarjeta para que se acomoden de modo aleatorio
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard)); //add event listener hace caso cuando uno la click a una tarjeta
//el 'flipcard' es una funcion que activa al momento de hacer click in la tarjeta