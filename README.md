Countdown timer
Create a custom timer plugin that counts down to a predefined date. Such a plugin can be used on blogs and online stores, event registration pages, during maintenance, etc.

The plugin expects the following HTML markup and displays four numbers: days, hours, minutes and seconds in XX: XX: XX: XX format. The number of days can be more than two digits.

<div class = "timer" id = "timer-1">
  <div class = "field">
    <span class = "value" data-value = "days"> 11 </span>
    <span class = "label"> Days </span>
  </div>

  <div class = "field">
    <span class = "value" data-value = "hours"> 11 </span>
    <span class = "label"> Hours </span>
  </div>

  <div class = "field">
    <span class = "value" data-value = "mins"> 11 </span>
    <span class = "label"> Minutes </span>
  </div>

  <div class = "field">
    <span class = "value" data-value = "secs"> 11 </span>
    <span class = "label"> Seconds </span>
  </div>
</div>
The plugin is the CountdownTimer class, an instance of which creates a new timer with settings.

new CountdownTimer ({
selector: '# timer-1',
targetDate: new Date ('Jul 17, 2019'),
});
To calculate the values, use the following formulas, where time is the difference between targetDate and the current date.

/ \*

- Remaining days: divide the UTC value by 1000 _ 60 _ 60 \* 24, the number
- milliseconds in one day (milliseconds _ seconds _ minutes \* hours)
- /
  const days = Math.floor (time / (1000 _ 60 _ 60 \* 24));

/ \*

- Remaining hours: we get the remainder from the previous calculation using the operator
- remainder% and divide it by the number of milliseconds in one hour
- (1000 _ 60 _ 60 = milliseconds _ minutes _ seconds)
- /
  const hours = Math.floor ((time% (1000 _ 60 _ 60 _ 24)) / (1000 _ 60 \* 60));

/ \*

- Remaining minutes: get the remaining minutes and divide them by the number
- milliseconds in one minute (1000 _ 60 = milliseconds _ seconds)
- /
  const mins = Math.floor ((time% (1000 _ 60 _ 60)) / (1000 \* 60));

/ \*

- Remaining seconds: get the remaining seconds and divide them by the number
- milliseconds in one second (1000)
- /
  const secs = Math.floor ((time% (1000 \* 60)) / 1000);
