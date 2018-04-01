// 1) Выбор элемента
let square = document.querySelector(".square");

// 2) Инициализация параметров
let anim = new TrueAnimation(square,["width", "height", "opacity"],[{
    // width => 0px;
    duration: 500,
    timingFunction: "linear",
    lastValue: "3px"
},{
    // height => 0px;
    duration: 500,
    timingFunction: "linear",
    lastValue: "3px"
},{
    // opacity => 0;
    duration: 200,
    timingFunction: "linear",
    lastValue: "0"
}]);

// anim.init();

square.addEventListener("click",()=>{
    anim.init();
    anim.start();
})