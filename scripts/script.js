elment = document.getElementsByClassName('test-button') ; 

pointTo = Number(localStorage.getItem('pointTo'))||1 ;

elmentLentgh= 0;


for(let index = 0 ; index <= 20 * pointTo ; index++){
    
    let button = document.createElement('button');
    button.setAttribute('class','test-button')
    document.getElementById('js-div-1').appendChild(button)

    elment.item(index).setAttribute('id',`js-bt-${index}`);
    elment.item(index).setAttribute('onclick',`changeColor(${index})`);
    elment.item(index).innerHTML=`${index}`

    elmentLentgh = index;
    
}


let visiblity = JSON.parse(localStorage.getItem('visiblity')) || createObject();

let randomNumber = JSON.parse(localStorage.getItem('randomNumber'))||[];

let permistionToStart = JSON.parse(localStorage.getItem('permistionToStart'))|| false;

let displayInStart = JSON.parse(localStorage.getItem('displayInStart'))|| false;


let score = JSON.parse(localStorage.getItem('score')) || {
    point1:0 , 
    point2:0 
};

let timer ;

for(let index = 0 ; index <= elmentLentgh ; index++)
{   

    if(!visiblity[`number${index}`])
    {
        changeColor(index);
    }

}

displayPoint ();



function startTimer()
{   
    startGame();
    displayRandomNumber();
    clearTimeout(timer);
    permistionToStart = false ;
    localStorage.setItem('permistionToStart',JSON.stringify(permistionToStart));
    randomNumberText = document.querySelector('#js-p-2');
    timer = setTimeout (()=> {
        randomNumberText.innerText=``;
        permistionToStart=true;
        displayInStart = false;
        localStorage.setItem('permistionToStart',JSON.stringify(permistionToStart));
        localStorage.setItem('displayInStart',JSON.stringify(displayInStart));
        location.reload();
    }, 5000);


    if(permistionToStart===true)
    {
        location.reload();
    }

}

function changeColor (value){

    if(permistionToStart===true){
    buttonElment = document.querySelector(`#js-bt-${value}`) ; 

    if(buttonElment.classList.contains('is-lose'))
    {
        visiblity[`number${value}`]=true;
        buttonElment.disabled = false;
        localStorage.setItem('visiblity',JSON.stringify(visiblity));
        buttonElment.classList.remove('is-lose','is-win');
        if(displayInStart===false){
            return gamePoint(); 
        }
        
    }

    if(buttonElment.classList.contains('is-win'))
    {
         visiblity[`number${value}`]=true;
         localStorage.setItem('visiblity',JSON.stringify(visiblity));
         buttonElment.classList.remove('is-lose');
         buttonElment.classList.remove('is-lose','is-win') ;
         displayPoint();
         if(displayInStart===false){
            score.point1+=-1;
            return gamePoint(); 
        }
    }


    for(let index=0 ; index <= randomNumber.length ; index++)
    {
        if(randomNumber[index]===value)
        {
            visiblity[`number${value}`]=false;
            buttonElment.classList.add('is-lose');  
            buttonElment.disabled = true;
            localStorage.setItem('visiblity',JSON.stringify(visiblity));
            if(displayInStart===false){
            return gamePoint(); }
            
            
        }
    }
            visiblity[`number${value}`]=false;
            buttonElment.classList.add('is-win'); 
            localStorage.setItem('visiblity',JSON.stringify(visiblity));     
            if(displayInStart===false){
                return gamePoint(); }
    }
    else
    {
        alert('Please start game')
    }
}

function startGame(){
    restart();
    CreateRandomNumber(elmentLentgh);
    localStorage.setItem('randomNumber' , JSON.stringify(randomNumber));
    displayPoint();
}

function restart(){
    // location.reload();
    localStorage.removeItem('visiblity');
    score.point1=0;
    score.point2=0;
    randomNumber=[];
    localStorage.removeItem('score');
    localStorage.setItem('pointTo',pointTo);
    displayPoint ();
}



function createObject (){
    object={}
    for(let index=0 ; index <= elmentLentgh ; index++){
    object[`number${index}`] = true;  
    }
    return object;
}

function CreateRandomNumber(value){

    random = [] ;
    
    while(randomNumber.length <= value*0.6)
    {
        random = Math.floor(Math.random()*(value+1)+0);
        if(!randomNumber.includes(random))
        {
            randomNumber.push(random);
        }
    }
    }


function gamePoint(){
    if(displayInStart===false){
    score.point1 = Number(document.getElementsByClassName('is-lose').length*-1);
    score.point2 = Number(document.getElementsByClassName('is-win').length);
}

    displayPoint ();
  
    if(score.point1+score.point2>=5)
    {
        alert('You Win');
        setPoint(1)
        permStart();
        return startGame();
    }
    else if(score.point1+score.point2<=-2)
    {
        alert('You Lose');
        setPoint(-1)
        permStart();
        return startGame();
    }
    else if(allVisibli())
    {
        alert('You Lose');
        setPoint(-1)
        permStart();
        return startGame();
    }

}

function permStart(){
    location.reload();
    permistionToStart=false;
    localStorage.setItem('permistionToStart',JSON.stringify(permistionToStart));
}



function displayPoint (){

    document.querySelector('#js-p-1').innerText=`Your point is = ${(score.point1) + (score.point2)}
    Level = ${pointTo}
    `;


}   

function displayRandomNumber(){
    displayInStart = true;
    permistionToStart = true;
    // document.querySelector('#js-p-2').innerText=`Random Number Is =\n ${randomNumber}`
    for(i = 0 ; i <= elmentLentgh ; i++)
    {   
        visiblity[`number${i}`]=true;
        changeColor(i);
    }
    displayInStart= false;

    localStorage.setItem('displayInStart',JSON.stringify(displayInStart));
    localStorage.removeItem('visiblity');
}

function setPoint(value)
{
    if(pointTo+(value)>=0)
    {
        pointTo+=(value); 
        localStorage.setItem('pointTo',pointTo)
       
    }else
    {
        startGame();
    }
}

function allVisibli(){
    
    x=0 
    for(let index = 0 ; index <= elmentLentgh ; index++)
    {
        if(visiblity[`number${index}`]===false)
        {
            x++;
        }

    }
    if(x>elmentLentgh)
    {
        return true ; 
    }
    else{
        return false ; 
    }
}

