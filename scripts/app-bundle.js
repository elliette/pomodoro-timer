define('app',['exports'], function (exports) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var gong = new Audio('../gong.wav');
	var beep = new Audio('../beep.wav');

	var working = 'WORK_TIME';
	var shortBreak = 'SHORT_BREAK';
	var longBreak = 'LONG_BREAK';

	var displayTime = function displayTime(secs) {
		var minutes = Math.floor(secs / 60);
		var seconds = secs % 60;
		return minutes + ':' + ((seconds < 10 ? '0' : '') + seconds);
	};

	var App = exports.App = function () {
		function App() {
			_classCallCheck(this, App);

			this.numIntervals = 3;
			this.timeInSeconds = 0;
			this.timeAsString = '';
			this.timers = {
				WORK_TIME: 25,
				SHORT_BREAK: 5,
				LONG_BREAK: 15
			};
			this.currInterval = {
				num: 1,
				type: working
			};
			this.currTimer = null;
			this.nextTimer = null;
			this.timerOn = false;
			this.soundOn = false;
		}

		App.prototype.stopTimer = function stopTimer() {
			clearTimeout(this.nextTimer);
			clearInterval(this.currTimer);
			this.currInterval = {
				num: 1,
				type: working
			};
			this.timeInSeconds = 0;
			this.timeAsString = '';
			this.timerOn = false;
		};

		App.prototype.startTimer = function startTimer() {
			var _this = this;

			var convertMinsToSeconds = function convertMinsToSeconds() {
				_this.timeInSeconds = _this.timers[_this.currInterval.type] * 60;
			};

			var getTime = function getTime() {
				_this.timeInSeconds--;
				_this.timeAsString = displayTime(_this.timeInSeconds);
			};

			var startNextTimer = function startNextTimer() {
				clearInterval(_this.currTimer);

				if (!_this.currInterval.type && !_this.currInterval.num || _this.currInterval.type === longBreak) {
					_this.currInterval.num = 1;
					_this.currInterval.type = working;
				} else if (_this.currInterval.type === working && _this.currInterval.num === _this.numIntervals) {
					_this.currInterval.type = longBreak;
				} else if (_this.currInterval.type === working && _this.currInterval.num < _this.numIntervals) {
					_this.currInterval.type = shortBreak;
				} else {
					_this.currInterval.type = working;
					_this.currInterval.num++;
				}

				_this.startTimer();
			};

			convertMinsToSeconds();
			this.currTimer = setInterval(getTime, 1000);
			this.nextTimer = setTimeout(startNextTimer, this.timeInSeconds * 1000);
			if (this.soundOn) {
				if (this.currInterval.type === working) {
					beep.play();
				} else {
					gong.play();
				}
			}
			this.timerOn = true;
		};

		return App;
	}();
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('text!app.html', ['module'], function(module) { module.exports = "<template><div id=\"sound-toggle\"></div><div id=\"app\"><header><h1>Pomodoro Timer 🍅</h1></header><main><form submit.trigger=\"startTimer()\" if.bind=\"!timerOn\"><p>I would like to work for intervals of <input type=\"number\" value.bind=\"timers.WORK_TIME\"> minutes with a short <input type=\"number\" value.bind=\"timers.SHORT_BREAK\"> minute break in between. After <input type=\"number\" value.bind=\"numIntervals\"> intervals, I would like to take a longer <input type=\"number\" value.bind=\"timers.LONG_BREAK\"> minute break.</p><button type=\"submit\">Let's go!</button></form><div if.bind=\"timerOn\" id=\"timer\"><div id=\"interval-info\"><h2>${currInterval.type.split('_').join(' ')}</h2><h3>Interval no. ${currInterval.num}</h3></div><div id=\"time\" class.bind=\"currInterval.type\"><h1>${timeAsString}</h1></div><div id=\"timer-btns\"><button click.delegate=\"stopTimer()\">Clear</button></div></div></main><footer><div><p class=\"sound-prefs\">Enable sound:</p><input class=\"sound-prefs\" type=\"checkbox\" checked.bind=\"soundOn\"></div><p>Made with <a href=\"../puppies.mp4\">❤</a> & <a href=\"http://aurelia.io/\">Aurelia</a> by <a href=\"https://github.com/elliette\">Elliott Brooks</a></p></footer></div></template>"; });
//# sourceMappingURL=app-bundle.js.map