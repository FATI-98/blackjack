var blackjackGame={
  'you':{'div':'#your-box','scoreSpan':'#your-blackjack-result','score':0},
  'dealer':{'div':'#dealer-box','scoreSpan':'#dealer-blackjack-result','score':0},
   'cards':['2','3','4','5','6','7','8','9','10','K','J','A','Q'],
   'cardMap':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'J':10,'Q':10,'A':[1,11]},
   'wins':0,
   'losses':0,
   'draws':0,
};
const YOU=blackjackGame['you'];
const DEALER=blackjackGame['dealer'];
const hitSound = new Audio('sounds/hitSound.mp3');
const winsound = new Audio('sounds/winsound.mp3');
const losesound = new Audio('sounds/losesound.mp3');
const drawsound = new Audio('sounds/drawsound.mp3');


document.querySelector('#hit-btn').addEventListener('click',blackjackhit);
document.querySelector('#deal-btn').addEventListener('click',blackjackdeal);
document.querySelector('#stand-btn').addEventListener('click',dealerLogic);


function blackjackhit(){
  let card=randomCard();
  showcard(card,YOU);
  updateScore(card,YOU);
  showScore(YOU);
}

function blackjackdeal(){
  let yourImage=document.querySelector('#your-box').querySelectorAll('img');
  let dealerImage=document.querySelector('#dealer-box').querySelectorAll('img');

  document.querySelector('.restart-notice').textContent='';
  document.querySelector('#blackjack-result').textContent='';
  document.querySelector('#blackjack-result').textContent="Let's Play";
  document.querySelector('#blackjack-result').style.color="black";



  for(i=0 ;i<yourImage.length;i++){
    yourImage[i].remove();
    YOU['score']=0;
    document.querySelector('#your-blackjack-result').textContent=0;
    document.querySelector('#your-blackjack-result').style.color='white';
  }
  for(i=0 ;i<dealerImage.length;i++){
    dealerImage[i].remove();
    DEALER['score']=0;
    document.querySelector('#dealer-blackjack-result').textContent=0;
    document.querySelector('#dealer-blackjack-result').style.color='white';

  }

  document.querySelector('#win').textContent='';
  document.querySelector('#win').textContent=0;
  document.querySelector('#losses').textContent='';
  document.querySelector('#losses').textContent=0;
  document.querySelector('#draws').textContent='';
  document.querySelector('#draws').textContent=0;
  hitSound.play();

}

function randomCard(){
  let randomIndex=Math.floor(Math.random()*13);
  return blackjackGame['cards'][randomIndex];
}


function showcard(card,activatePlayer){
  if(activatePlayer['score']<=21){
    var cardImage=document.createElement('img');
    cardImage.src=`image/${card}.png`;
    console.log(cardImage);
    document.querySelector(activatePlayer['div']).appendChild(cardImage);
    hitSound.play();
  }else{
    document.querySelector(activatePlayer['div']).remove('img')
    var cardImage=document.createElement('img');
    cardImage.src=`image/${card}.png`;
    console.log(cardImage);
    document.querySelector(activatePlayer['div']).appendChild(cardImage);
    hitSound.play();
  }
}


function updateScore(card,activatePlayer){
  if(card==='A'){
    //if adding 11keeps me below21 ,add 11.otherwise add 1
     if(activatePlayer['score'] + blackjackGame['cardMap'][card][1]<=21){
      activatePlayer['score'] += blackjackGame['cardMap'][card][1];
     }else{
      activatePlayer['score'] += blackjackGame['cardMap'][card][0];
     }
  }else{
      activatePlayer['score'] +=blackjackGame['cardMap'][card];
      console.log(activatePlayer['score'] += blackjackGame['cardMap'][card]);
  }
}

function showScore(activatePlayer){
  if(activatePlayer['score']>21){
    document.querySelector(activatePlayer['scoreSpan']).textContent='BUST!!!';
    document.querySelector(activatePlayer['scoreSpan']).style.color='red';

    let notice= document.createElement('h1');
    notice.innerHTML="<h1 style='color:yellow;text-align:center; position:absolute;right:180px; bottom:400px;  transform:rotate(-30deg);'> Click On Deal To Restart</h1>";
    document.querySelector('#principal-div').appendChild(notice);
    notice.classList.add("restart-notice");
    console.log(notice.getAttribute("class"));

  }else{
  document.querySelector(activatePlayer['scoreSpan']).textContent=activatePlayer['score'];
 }
}
function dealerLogic(){
    let card=randomCard();
    showcard(card,DEALER);
    updateScore(card,DEALER);
    showScore(DEALER);
    if(DEALER['score']>=15){
   showresult(computerWinner());

   }
}
//compute winner and return who just won
function computerWinner(){
  let winner;

  if(YOU['score']<=21){
    //condition:higher score than dealer or when  dealer bust but you 're
      if(YOU['score']>DEALER['score']||(DEALER['score']>21)) {
        winner=YOU;
        blackjackGame['wins']++;
      }else if(YOU['score']<DEALER['score']) {
        winner=DEALER;
        blackjackGame['losses']++;
      }else if(YOU['score']===DEALER['score']){
        blackjackGame['draws']++;
        console.log('drew!!');
      }
  }else if(YOU['score']>21 && DEALER['score']<=21){
    winner=DEALER;
    blackjackGame['losses']++;


  }else if(YOU['score']>21 && DEALER['score']>21){
    blackjackGame['draws']++;

  }
  return winner;
}

function showresult(winner){

  if (winner===YOU){
    document.querySelector('#blackjack-result').textContent='You Won!!!';
    document.querySelector('#blackjack-result').style.color='green';
    document.getElementById('win').textContent=blackjackGame['wins'];
    winsound.play();

  }else if(winner===DEALER){
    document.querySelector('#blackjack-result').textContent='You Lost!!!';
    document.querySelector('#blackjack-result').style.color='red';
    document.getElementById('losses').textContent=blackjackGame['losses'];
    losesound.play();


  }else  {
    document.querySelector('#blackjack-result').textContent='You Drew!!!';
    document.querySelector('#blackjack-result').style.color='yellow';
    document.getElementById('draws').textContent=blackjackGame['draws'];
    drawsound.play();
  }
}
