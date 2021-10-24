class CountdownTimer {

    constructor({ selector, targetDate }) {
        this.timerDOM = document.querySelector(selector);
        this.daysDOM = this.timerDOM.querySelector(`[data-value="days"]`);
        this.hoursDOM = this.timerDOM.querySelector(`[data-value="hours"]`);
        this.minsDOM = this.timerDOM.querySelector(`[data-value="mins"]`);
        this.secsDOM = this.timerDOM.querySelector(`[data-value="secs"]`);
        this.targetDate = targetDate;
        this.timeout = null;
    }
    
    start() {
        const currentTime = Date.now();
        const deltaTime = this.targetDate - currentTime;
        if (deltaTime <= 0)
            return;
        
        this.reRender(this.getDateTimeComponents(deltaTime));

        if (this.timeout)
            clearTimeout(this.timeout);
        
        this.timeout = setTimeout(this.start.bind(this), (deltaTime % 1000));

    }

    clearAnimation() {
        this.daysDOM.classList.remove("changed");
        this.hoursDOM.classList.remove("changed");
        this.minsDOM.classList.remove("changed");
        this.secsDOM.classList.remove("changed");
    }

    reRender({ days, hours, mins, secs }) {
        
        if (this.daysDOM.innerText != days)
            this.daysDOM.classList.add("changed");
        
        if (this.hoursDOM.innerText != hours)
            this.hoursDOM.classList.add("changed");
        
        if (this.minsDOM.innerText != mins)
            this.minsDOM.classList.add("changed");
        
        if (this.secsDOM.innerText != secs)
            this.secsDOM.classList.add("changed");

        this.daysDOM.innerText = days;
        this.hoursDOM.innerText = hours;
        this.minsDOM.innerText = mins;
        this.secsDOM.innerText = secs;

        setTimeout(this.clearAnimation.bind(this), 200);
    }

    getDateTimeComponents(time) {
        const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
        const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
        const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
        return { days, hours, mins, secs };
    }

    pad(value) {
        return String(value).padStart(2, '0');
    }

}


let timer = new CountdownTimer({
    selector: "#timer-1",
    targetDate: new Date(2021, 10, 06, 0, 40),
});

timer.start();
