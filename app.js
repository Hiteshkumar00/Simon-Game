let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
let highScore = 0;

let h2 = document.querySelector("h2");
let body = document.querySelector("body");
let h3 = document.querySelector("h3");

document.addEventListener("keypress", function(){
  if(started == false){
    console.log("Game started");
    started = true;

    levelUp();
  };
});

function gameFlash (btn) {
  btn.classList.add("flash");
  setTimeout(function(){
    btn.classList.remove("flash");
  }, 250);
};

function userFlash (btn) {
  btn.classList.add("userFlash");
  setTimeout(function(){
    btn.classList.remove("userFlash");
  }, 250);
};

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);

  gameSeq.push(randColor);
  console.log(gameSeq);

  gameFlash(randBtn);
};

function checkAns(idx){
  if(userSeq[idx] === gameSeq[idx]){
    if(userSeq.length == gameSeq.length){
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `GAME OVER! Your score was <span>${level}</span>. <br> Press any key to START`;
    if(highScore < level){
      highScore = level;
      h3.innerHTML = `Your highest score is <span>${highScore}</span>`;
    }
    reset();

    body.style.backgroundColor = "red";
    setTimeout(function(){
      body.style.backgroundColor = "";
    }, 150);
  };
};

function btnPress () {
  let btn = this;
  userFlash(btn);

  userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
};

let allBtn = document.querySelectorAll(".btn");

for(btn of allBtn){
  btn.addEventListener("click", btnPress);
};

function reset() { 
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
};