
let start = document.getElementById("startBtn");
let check = document.getElementById("checkBtn");
let newGame = document.getElementById("newBtn");
let timer = document.querySelector(".timer");
let fromField = document.getElementById("from");
let timerID;
let isStart = false;
let correctPuzzle = ["o1","o2","o3","o4","o5","o6","o7","o8","o9","o10","o11","o12","o13","o14","o15","o16"];


function shuffle() {
    let puzzels = ["o1","o2","o3","o4","o5","o6","o7","o8","o9","o10","o11","o12","o13","o14","o15","o16"];
        puzzels = puzzels.sort(() => Math.random() - 0.5);
        $('.parts').each(function (index, element) {
            $(this).addClass(puzzels[index])
        });
}  
shuffle();


//countdown function
function countdown() {
    isStart = true;
    let seconds = 60;
    function tick() {
        seconds--;
        $(".timer").html("00:" + (seconds >= 10 ? "" : "0") + String(seconds));
        if(seconds > 0){
            timerID = setTimeout(tick,1000)
        }else if(seconds < 0){
            clearTimeout(timerID);
            console.log("time is out")
            
        } 
        if(seconds == 0){
            checkGame()
            $("#checkBtn").prop("disabled","true")
        }
    }
    tick();
    
    
}


//start game function
function startGame(){
    if(isStart === false){
        countdown();
        start.disabled = true;
        check.disabled = false;
    }
}   


//start button
start.addEventListener("click", function(){
    startGame()
    
})


// check button
check.addEventListener("click", function(){
    $(".modal-container").css({"display":"block","z-index":"4"});
    $(".check-modal").css("display", "block");
})

$("#closeModalBtn").on("click",function(){
    $(".check-modal").css("display", "none");
    $(".modal-container").css({"display":"none","z-index":"-1"});
    $(".wrapper").css("z-index","3")
})
$("#checkModalBtn").on("click",function(){
    $(".check-modal").css("display", "none");
    clearTimeout(timerID)
    checkGame()
})

$("#closeLooseModalBtn").on("click",function(){
    $(".loose-modal").css("display", "none");
    $(".modal-container").css({"display":"none","z-index":"-1"});
})
$("#closeWinModalBtn").on("click",function(){
    $(".win-modal").css("display", "none");
    $(".modal-container").css({"display":"none","z-index":"-1"});
})
// new game button
$("#newBtn").on("click", function () {
    location.reload()
})




function dragAndDrop() {
    $('.parts').draggable({
        containment: 'gamefield',
        revert: 'invalid',
        start: function () {
            $(this).css("z-index","4")
            if ($(this).hasClass('dropped-puzzle')) {
                $(this).removeClass('dropped-puzzle');
                $(this).parent().removeClass('puzzle-present');
                
            }
        }
        });
        
     $('.droppable').droppable({
         accept: function () {
              return !$(this).hasClass('puzzle-present')
        },
        drop: function (event, ui) {
            startGame()
            let draggableElement = ui.draggable;
            let droppedOn = $(this);
            droppedOn.addClass('puzzle-present');
            $(draggableElement).addClass('dropped-puzzle');
            $(draggableElement).css({
                
                top: 0,
                left: 0,
                position: 'relative'
            }).appendTo(droppedOn);
         },
    });
};
dragAndDrop()

function checkGame() {
    if ($('#droparea .dropped-puzzle').length != 16) {
        loose()
        return false;
    } 
    let result = 0;
    for(let i = 0;i<16;i++){
        $(`#droparea .dropped-puzzle:eq(${i})`).hasClass(correctPuzzle[i])?result++:result--
    };
    if(result==16){
        success();
        return true;
    }else{
        loose();
        return false
    }
};

function success(){
    $(".modal-container").css({"display":"block","z-index":"4"});
    $(".win-modal").css("display","block");
}

function loose(){
    $(".modal-container").css({"display":"block","z-index":"4"});
    $(".loose-modal").css("display","block");
}









