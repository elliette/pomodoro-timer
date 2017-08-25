define("app",["exports"],function(e){"use strict";function t(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var r=new Audio("../gong.wav"),n=new Audio("../beep.wav"),i="WORK_TIME",u=function(e){var t=e%60;return Math.floor(e/60)+":"+(t<10?"0":"")+t};e.App=function(){function e(){t(this,e),this.numIntervals=3,this.timeInSeconds=0,this.timeAsString="",this.timers={WORK_TIME:25,SHORT_BREAK:5,LONG_BREAK:15},this.currInterval={num:1,type:i},this.currTimer=null,this.nextTimer=null,this.timerOn=!1,this.soundOn=!1}return e.prototype.stopTimer=function(){clearTimeout(this.nextTimer),clearInterval(this.currTimer),this.currInterval={num:1,type:i},this.timeInSeconds=0,this.timeAsString="",this.timerOn=!1},e.prototype.startTimer=function(){var e=this;e.timeInSeconds=60*e.timers[e.currInterval.type],this.currTimer=setInterval(function(){e.timeInSeconds--,e.timeAsString=u(e.timeInSeconds)},1e3),this.nextTimer=setTimeout(function(){clearInterval(e.currTimer),!e.currInterval.type&&!e.currInterval.num||"LONG_BREAK"===e.currInterval.type?(e.currInterval.num=1,e.currInterval.type=i):e.currInterval.type===i&&e.currInterval.num===e.numIntervals?e.currInterval.type="LONG_BREAK":e.currInterval.type===i&&e.currInterval.num<e.numIntervals?e.currInterval.type="SHORT_BREAK":(e.currInterval.type=i,e.currInterval.num++),e.startTimer()},1e3*this.timeInSeconds),this.soundOn&&(this.currInterval.type===i?n.play():r.play()),this.timerOn=!0},e}()}),define("environment",["exports"],function(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={debug:!1,testing:!1}}),define("main",["exports","./environment"],function(e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.configure=function(e){e.use.standardConfiguration().feature("resources"),r.default.debug&&e.use.developmentLogging(),r.default.testing&&e.use.plugin("aurelia-testing"),e.start().then(function(){return e.setRoot()})};var r=function(e){return e&&e.__esModule?e:{default:e}}(t)}),define("resources/index",["exports"],function(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.configure=function(e){}}),define("text!app.html",["module"],function(e){e.exports='<template><div id="sound-toggle"></div><div id="app"><header><h1>Pomodoro Timer 🍅</h1></header><main><form submit.trigger="startTimer()" if.bind="!timerOn"><p>I would like to work for intervals of <input type="number" value.bind="timers.WORK_TIME"> minutes with a short <input type="number" value.bind="timers.SHORT_BREAK"> minute break in between. After <input type="number" value.bind="numIntervals"> intervals, I would like to take a longer <input type="number" value.bind="timers.LONG_BREAK"> minute break.</p><button type="submit">Let\'s go!</button></form><div if.bind="timerOn" id="timer"><div id="interval-info"><h2>${currInterval.type.split(\'_\').join(\' \')}</h2><h3>Interval no. ${currInterval.num}</h3></div><div id="time" class.bind="currInterval.type"><h1>${timeAsString}</h1></div><div id="timer-btns"><button click.delegate="stopTimer()">Clear</button></div></div></main><footer><div><p class="sound-prefs">Enable sound:</p><input class="sound-prefs" type="checkbox" checked.bind="soundOn"></div><p>Made with <a href="../puppies.mp4">❤</a> & <a href="http://aurelia.io/">Aurelia</a> by <a href="https://github.com/elliette">Elliott Brooks</a></p></footer></div></template>'});