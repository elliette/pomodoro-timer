'use strict';

const gong = new Audio('../gong.wav');
const beep = new Audio('../beep.wav');

const working = 'WORK_TIME';
const shortBreak = 'SHORT_BREAK';
const longBreak = 'LONG_BREAK';

const displayTime = (secs) => {
	const minutes = Math.floor(secs / 60);
	const seconds = (secs % 60);
	return `${minutes}:${(seconds < 10 ? '0' : '') + seconds}`;
};

export class App {
	constructor() {
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

	stopTimer(){
		clearTimeout(this.nextTimer);
		clearInterval(this.currTimer);
		this.currInterval = {
			num: 1,
			type: working
		};
		this.timeInSeconds = 0;
		this.timeAsString = '';
		this.timerOn = false;
	}

	startTimer(){
		const convertMinsToSeconds = () => {
			this.timeInSeconds = this.timers[this.currInterval.type] * 60;
		};

		const getTime = () => {
			this.timeInSeconds--;
			this.timeAsString = displayTime(this.timeInSeconds);
		};

		const startNextTimer = () => {
			clearInterval(this.currTimer);

			if ((!this.currInterval.type && !this.currInterval.num) || this.currInterval.type === longBreak){
				this.currInterval.num = 1;
				this.currInterval.type = working;
			} else if (this.currInterval.type === working && this.currInterval.num === this.numIntervals){
				this.currInterval.type = longBreak;
			} else if (this.currInterval.type === working && this.currInterval.num < this.numIntervals){
				this.currInterval.type = shortBreak;
			} else {
				this.currInterval.type = working;
				this.currInterval.num++;
			}

			this.startTimer();
		};

		convertMinsToSeconds();
		this.currTimer = setInterval(getTime, 1000);
		this.nextTimer = setTimeout(startNextTimer, this.timeInSeconds * 1000);
		if (this.soundOn) {
			if (this.currInterval.type === working){
				beep.play();
			} else {
				gong.play();
			}
		}
		this.timerOn = true;
	}

}
