const working = 'WORKING',
	shortBreak = 'SHORT_BREAK',
	longBreak = 'LONG_BREAK';

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
			WORKING: 25,
			SHORT_BREAK: 5,
			LONG_BREAK: 15
		};
		this.currInterval = {
			num: 0,
			type: ''
		};
		this.currTimer = null;
	}

	startTimer(){

		// Helper functions:
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

		// Implementation:
		convertMinsToSeconds();
		this.currTimer = setInterval(getTime, 1000);
		setTimeout(startNextTimer, this.timeInSeconds * 1000);
	}
}
