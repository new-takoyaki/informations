const schedule = require('node-schedule');

const date = new Date(2020, 0, 15, 8, 10, 0);
console.log(date);

const j = new schedule.scheduleJob(date, () => {
	console.log("Scheduler!!");
});

const rule = new schedule.RecurrenceRule();
rule.minute = 32;						// 매 시간마다 32분에 동작
const k = new schedule.scheduleJob(rule, () => {
	console.log("Scheduler - rule!!");
});

const another = new schedule.scheduleJob('5 * * * * *', function() {
	console.log("Second Tick");
});