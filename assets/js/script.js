$(function () {});
  
const Currentdate = moment().format("dddd, MMMM Do");
const current = moment().format("H A");


let workTime = [
  { time: "9 AM", event: "" },
  { time: "10 AM", event: "" },
  { time: "11 AM", event: "" },
  { time: "12 PM", event: "" },
  { time: "1 PM", event: "" },
  { time: "2 PM", event: "" },
  { time: "3 PM", event: "" },
  { time: "4 PM", event: "" },
  { time: "5 PM", event: "" },
];


let eventWork = JSON.parse(localStorage.getItem("workDay"));
if (eventWork) {
  workTime = eventWork;
}


$("#currentDay").text(Currentdate);

workTime.forEach(function(timeBlock, index) {
	const labelTime = timeBlock.time;
	const blockColor = colorRow(labelTime);
	const row =
		'<div class="time-block" id="' +
		index +
		'"><div class="row no-gutters input-group"><div class="col-sm col-lg-1 input-group-prepend hour justify-content-sm-end pr-3 pt-3">' +
		labelTime +
		'</div><textarea class="form-control ' +
		blockColor +
		'">' +
		timeBlock.event +
		'</textarea><div class="col-sm col-lg-1 input-group-append"><button class="saveBtn btn-block" type="submit"><i class="fas fa-save"></i></button></div></div></div>';


	$(".container").append(row);
});


function colorRow(time) {
	const planNow = moment(current, "H A");
	const planEntry = moment(time, "H A");
	if (planNow.isBefore(planEntry) === true) {
		return "future";
	} else if (planNow.isAfter(planEntry) === true) {
		return "past";
	} else {
		return "present";
	}
}


$(".saveBtn").on("click", function() {
	const blockID = parseInt(
		$(this)
			.closest(".time-block")
			.attr("id")
	);
	const userEntry = $.trim(
		$(this)
			.parent()
			.siblings("textarea")
			.val()
	);
	workTime[blockID].event = userEntry;

	
	localStorage.setItem("workDay", JSON.stringify(workTime));
});