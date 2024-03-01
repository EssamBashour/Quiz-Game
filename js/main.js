const startBtn=document.querySelector('#start');
const refresh=document.querySelector('#refresh');
const screens= document.querySelectorAll('.screen');
const timeList= document.querySelector('#time-list');
let time = 0;
let score = 0;
const tasks= document.querySelectorAll('.task');
const timeEl= document.querySelector('#time');
const board= document.querySelector('#board');
const colors=['#1A91F0','#1170CD','#1A1C6A','#EFF2F9','#1e2532','#656e83','#084C41','#ff9800'];


startBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    screens[0].classList.add('up');
})

timeList.addEventListener('click',e =>{
    if(e.target.classList.contains('time-btn')){
        time = parseInt(e.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        
        startGame();
    }
})

function startGame(){
    setInterval(decreaseTime,1000);
    const api ="html_question.json";
async function getData(){
    try{
        const response = await fetch (api);
        const data = await response.json();
        console.log(data);
        printData(data)
    }
    catch(e){
        console.log("Error",e.message);
    }
}

function printData(data){
    const index=Math.floor(Math.random() * data.length);
    board.innerHTML += `
    <div class="task">
    <div class="question">${data[index].title}</div>
    <div class="answer">
    <ul>
        <li >${data[index].answer_1}</li>
        <li >${data[index].answer_2}</li>
        <li >${data[index].answer_3}</li>
        <li >${data[index].answer_4}</li>
    </ul>
    </div>
    </div>
    `

    let lis=document.querySelectorAll(".answer ul li");
    lis.forEach((ans)=>{
        ans.onclick=function(){
            console.log(ans.innerHTML);
            console.log(data[index].right_answer);
            if(ans.innerHTML === data[index].right_answer){
                ans.style.backgroundColor ="#16e36b";
                score++;
                board.innerHTML="";
                printData(data);
            }
            else{
                ans.style.backgroundColor="#e31665"
                finishGame();
            }
        }
    })
}


getData()
}
// board.addEventListener('click',event=>{
//     if(event.target.classList.contains('circle')){
//         score++
//         event.target.remove();
//         createRandomCircle()
//     }
// })

// function startGame(){
//     setInterval(decreaseTime,1000);
//     createRandomCircle();
//     setTime(time)
// }

function decreaseTime(){
    if(time===0){
        finishGame()
    }else{
        let current= --time;
    if(current<10){
        current=`0${current}`
    }
    setTime(current)
    }
    
}

function setTime(value){
    timeEl.innerHTML =`00:${value}`
}


function finishGame(){
    timeEl.parentNode.classList.add('hide');
    board.innerHTML=`<h1>Your score : <span class="primary">${score}</span></h1>
    
    `
    reStart();
    
    
}

function reStart(){
    refresh.addEventListener('click',(e)=>{
        e.preventDefault();
        window.location.reload()
    })
    ;
}

reStart();

// function createRandomCircle(){
//     const circle=document.createElement('div');
//     const size=getRandomNumber(10,60);
//     const{width,height} =board.getBoundingClientRect();
    
//     const x= getRandomNumber(0,width - size);
//     const y =getRandomNumber(0,height - size);

//     circle.classList.add("circle");
//     circle.style.width=`${size}px`;
//     circle.style.height=`${size}px`;
//     circle.style.top=`${y}px`;
//     circle.style.left=`${x}px`;
//     circle.style.backgroundColor=getRandomColor();
//     circle.style.boxShadow=`0 0 2px ${getRandomColor()}, 0 0 10px ${getRandomColor()}`
//     board.append(circle)
// }

// function getRandomNumber(min,max){
//     return Math.round(Math.random() * (max-min) + min)
// }

// function getRandomColor(){
//     const index=Math.floor(Math.random() * colors.length);
//     return colors[index]
// }

