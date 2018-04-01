class TrueAnimation{
    constructor(element, animations,options){ 
        this.TrueAnimationElement=element;
        this.TrueAnimationAnimations=animations;
        this.TrueAnimationOptions=options;

        this.TrueAnimationTimeouts=[0];
        this.TrueAnimationTimeoutsReversed = [0];

        // Normal timings
        let timeoutsSum = options[0].duration;
        for(let i=1;i<animations.length;i++){
            this.TrueAnimationTimeouts[i]=timeoutsSum;
            timeoutsSum+=options[i].duration;
        }
        this.TrueAnimationTimeouts[animations.length]=timeoutsSum;

        // UNDO timings
        let reversedOptions = [...this.TrueAnimationOptions].reverse();
        timeoutsSum=reversedOptions[0].duration;
        for(let i=1;i<animations.length;i++){
            this.TrueAnimationTimeoutsReversed[i]=timeoutsSum;
            timeoutsSum+=reversedOptions[i].duration;
        }
        this.TrueAnimationTimeoutsReversed[animations.length]=timeoutsSum;

        // Making an backup array with current values, before animation (for 'undo' method)
        this.TrueAnimationBackupedValues = [];
        for(let i=0;i<animations.length;i++){
            this.TrueAnimationBackupedValues[i]={   lastValue: window.getComputedStyle(element, null).getPropertyValue(animations[i])
            };
        }
        this.TrueAnimationBackupedValues=this.TrueAnimationBackupedValues.reverse();

        // Making all calculations in constructor method, for more effectiveness when works 'start' method
        let animationsBufReverse = [...animations];
        console.log(animations)
        this.TrueAnimationAnimationsReversed = animationsBufReverse.reverse();
        
    }

    init () {
        // CSS transition init method

        // For ONLY inline style backup (if no transition => undefined)
        // this.TransitionStringBackup=this.TrueAnimationElement.style.getPropertyValue('transition');

        // For every type of style (if no transition => 'all 0s ease 0s' )
        this.TransitionStringBackup=window.getComputedStyle(this.TrueAnimationElement, null).getPropertyValue('transition');

        // Transition can be null, so that helps to correct it (only inline get mistake)
        if(this.TransitionStringBackup){
            this.TransitionString = this.TransitionStringBackup+", ";
        }else{
            this.TransitionString="";
        }
        for(let i=0;i<this.TrueAnimationAnimations.length;i++){
            this.TransitionString+=this.TrueAnimationAnimations[i]+" "+this.TrueAnimationOptions[i].duration+"ms "+this.TrueAnimationOptions[i].timingFunction+" 0s";
            if(i<this.TrueAnimationAnimations.length-1){
                this.TransitionString+=", ";
            }
            
        }
    }

    start (undo) {
        // Just 'middle' variables
        let animationsArray = null;
        let animationsOptions = null;
        let animationsTimeouts = null;

        // If simple PLAY animation
        if(!undo){
            animationsArray = this.TrueAnimationAnimations;
            animationsOptions = this.TrueAnimationOptions;
            animationsTimeouts = this.TrueAnimationTimeouts;
        }else{
            // if UNDO animation
            animationsArray=this.TrueAnimationAnimationsReversed;
            animationsOptions = this.TrueAnimationBackupedValues;
            animationsTimeouts = this.TrueAnimationTimeoutsReversed;

        }
        // Start
        this.TrueAnimationElement.style.setProperty("transition", this.TransitionString);

        this.TrueAnimationElement.style.setProperty(animationsArray[0],animationsOptions[0].lastValue);
        for(let i=1;i<animationsArray.length;i++){
            setTimeout( () => {
                this.TrueAnimationElement.style.setProperty(animationsArray[i],animationsOptions[i].lastValue);
            }, animationsTimeouts[i]);
        }

        // End
        setTimeout( ()=>{
            this.TrueAnimationElement.style.setProperty("transition", this.TransitionStringBackup);
        },animationsTimeouts[animationsArray.length]);
    }

    undo() {
        this.init();
        this.start("undo");
    }
}

export default TrueAnimation;