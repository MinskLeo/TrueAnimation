class TrueAnimation{
    constructor(element, animations,options){ 
        this.TrueAnimationElement=element;
        this.TrueAnimationAnimations=animations;
        this.TrueAnimationOptons=options;

        this.TrueAnimationTimeouts=[0];

        let timeoutsSum = options[0].duration;
        for(let i=1;i<animations.length;i++){
            this.TrueAnimationTimeouts[i]=timeoutsSum;
            timeoutsSum+=options[i].duration;
        }
        this.TrueAnimationTimeouts[animations.length]=timeoutsSum;
    }
    init () {
        // CSS transition init method
        this.TransitionStringBackup=this.TrueAnimationElement.style.getPropertyValue('transition');

        // Transition can be null, so that helps to correct it
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
        // Undo animation
    }
}