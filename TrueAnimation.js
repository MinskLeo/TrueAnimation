

// 1. Передать элементы
// 
// 1)
//      a = document.querySelector(".class")
//      b = document.querySelector("#id")
//      c = document.querySelector("tag")
//      OR
//      ReactREF
// 2)
//      a
// 
// 
// 2. Передать типы анимации (последовательность) 
//      ["opacity", "height","display"]
// 3. Передать скорости прохождения анимации в объектах (и другие параметры)
//      [{
//          duration: 500,
//          timingFunction: "linear",
//          lastValue: 0
//      },{
//          duration: 200,
//          timingFunction: "ease-in",
//          lastValue: "50px"
//      },{
//          duration: 300,
//          timingFunction: "ease-out",
//          lastValue: none
//      }]
// 
// 4. Запустить анимацию
// ======================
// 
// let anim = TrueAnimation(a, ["opacity", "height", "display"], [{...},{...},{...}]);
// anim.init();       //Заранее, инициализация transition значений, для                                 немедленной анимации при start()
// anim.start();      //Запуск всех анимаций последовательно (ступенчато, друг                          после друга)
class TrueAnimation{
    constructor(element, animations,options){ 
        this.TrueAnimationElement=element;
        this.TrueAnimationAnimations=animations;
        this.TrueAnimationOptons=options;

        this.TrueAnimationTimeouts=[0];

        // 500,200,400
        // 0, 500, 700
        // i+(i-1)
        let timeoutsSum = options[0].duration;
        for(let i=1;i<animations.length;i++){
            this.TrueAnimationTimeouts[i]=timeoutsSum;
            timeoutsSum+=options[i].duration;
        }
        this.TrueAnimationTimeouts[animations.length]=timeoutsSum;
    }
    init () {
        // Инициализация css transition правил для элемента
        // "transition: opacity 200ms ease-in 0s"
        this.TransitionStringBackup=this.TrueAnimationElement.style.getPropertyValue('transition');

        // Transition может быть не указана, а следовательно undefined. Следующий блок if-else исправляет "ошибку"
        if(this.TransitionStringBackup){
            this.TransitionString = this.TransitionStringBackup+", ";
        }else{
            this.TransitionString="";
        }
        for(let i=0;i<this.TrueAnimationAnimations.length;i++){
            this.TransitionString+=this.TrueAnimationAnimations[i]+" "+this.TrueAnimationOptons[i].duration+"ms "+this.TrueAnimationOptons[i].timingFunction+" 0s";
            if(i<this.TrueAnimationAnimations.length-1){
                this.TransitionString+=", ";
            }
            
        }        
    }
    start () {
        // Start
        this.TrueAnimationElement.style.setProperty("transition", this.TransitionString);

        this.TrueAnimationElement.style.setProperty(this.TrueAnimationAnimations[0],this.TrueAnimationOptons[0].lastValue);
        for(let i=1;i<this.TrueAnimationAnimations.length;i++){
            setTimeout( () => {
                this.TrueAnimationElement.style.setProperty(this.TrueAnimationAnimations[i],this.TrueAnimationOptons[i].lastValue);
            }, this.TrueAnimationTimeouts[i]);
        }

        // End
        setTimeout( ()=>{
            this.TrueAnimationElement.style.setProperty("transition", this.TransitionStringBackup);
        },this.TrueAnimationTimeouts[this.TrueAnimationAnimations.length]);
    }
    undo() {
        // Откат изменений
    }
}