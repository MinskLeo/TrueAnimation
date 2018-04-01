# TrueAnimation
This is low weight lib, that helps with step-by-step animation
# Usage
To use that lib correctly:
1. Connect lib to your project
```
<head>

    // Other tags here
    <script src="libs/TrueAnimation.js"></script>
</head>
```
2. Make new .js file with your code
3. Then you need to setup your animation

  Select necessary element
  ```
  let square = document.querySelector(".square");
  ```
  Init constructor
  ```
  let anim = new TrueAnimation(square,["width", "height", "opacity"],[{
      duration: 500,
      timingFunction: "linear",
      lastValue: "3px"
    },{
      duration: 500,
      timingFunction: "linear",
      lastValue: "3px"
    },{
      duration: 200,
      timingFunction: "linear",
      lastValue: "0"
    }]);
  ```
  Almost before an animation you should init css transition rules with init() method
  
  *Don't worry about your current transition rules! Lib will automatically save it and restore when the animation ends!*
  ```
  anim.init();
  ```
  At last, when you want to start animation, use start() method
  ```
  square.addEventListener("click",()=>{
    anim.start();
  });
  ```
  
  That's all! Congratulations!
