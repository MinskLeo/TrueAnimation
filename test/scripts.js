// 1) Selecting
let square = document.querySelector(".square");
let play = document.querySelector("#play");
let undo = document.querySelector("#undo");
let stop = document.querySelector("#stop");

// 2) Constructor init
// let anim = new TrueAnimation(square,["width", "height", "background"],[{
//     // width => 3px;
//     duration: 500,
//     timingFunction: "linear",
//     lastValue: "3px",
//     delay: 0
// },{
//     // height => 3px;
//     duration: 500,
//     timingFunction: "linear",
//     lastValue: "3px",
//     delay: 0
// },{
//     // opacity => 0;
//     duration: 500,
//     timingFunction: "linear",
//     lastValue: "red",
//     delay: 0
// }]);


let anim = new TrueAnimation(square,["transform","background-color"],[{
    // width => 3px;
    duration: 500,
    timingFunction: "linear",
    lastValue: "scale(1.2)",
    delay: 0
},{
    // height => 3px;
    duration: 500,
    timingFunction: "linear",
    lastValue: "red",
    delay: 0
}]);

anim.init();

play.addEventListener("click",()=>{
    anim.start();
});
undo.addEventListener("click",()=>{
    anim.undo();
})
stop.addEventListener("click",() => {
    anim.stop();
})