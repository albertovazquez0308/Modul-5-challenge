$(document).ready(function () {

    $("#currentDay").html(moment().format('dddd, MMMM Do, YYYY, h:mm:ss a'));

    var update = function () {
        $("#currentDay").html(moment().format('dddd, MMMM Do, YYYY, h:mm:ss a'));
    }
    setInterval(update, 1000);



    function submitRecall(textID) {
        var calendarListCurrent = [];

        if (localStorage.getItem("calendarListStorage") === null) {
            calendarListCurrent;}

        else {
            calendarListCurrent = JSON.parse(localStorage.getItem("calendarListStorage"));}

        let timeTestCheck = calendarListCurrent.find(calendarListCurrent => calendarListCurrent.time === textID);

        if (timeTestCheck) {
            var elementPos = calendarListCurrent.map(function (calendarListCurrent) { return calendarListCurrent.time; }).indexOf(textID);
            var eventReplace = {
                time: textID,
                events: document.getElementById(textID).value.trim()};
            calendarListCurrent.splice(elementPos, 1, eventReplace);}

        else {
            var eventNew = {
                time: textID,
                events: document.getElementById(textID).value.trim()};
            calendarListCurrent.push(eventNew);}
        localStorage.setItem("calendarListStorage", JSON.stringify(calendarListCurrent));};



    function buttonClick() {
        console.log(this.id);
        var textID = this.id + "text";
        submitRecall(textID);}

    $(".buttonButton").on("click", buttonClick);



    function timeCheck() {
        var currentTime = moment().format()

        $(".timeText").each(function () {
            var timeClassText = $(this).text();
            var timeClassTime = moment(timeClassText, ["h a"]);
            var timeClassTimePlusOne = moment(timeClassTime).add(1, "hour").format()

            if (moment(currentTime).isBetween(timeClassTime, timeClassTimePlusOne)) {
                var overallRow = this.parentElement.parentElement;
                overallRow.classList.remove("past", "present", "future");
                overallRow.classList.add("present");}

            else if (moment(currentTime).isBefore(timeClassTime)) {
                var overallRow = this.parentElement.parentElement;
                overallRow.classList.remove("past", "present", "future");
                overallRow.classList.add("future");}

            else if (moment(currentTime).isAfter(timeClassTime)) {
                var overallRow = this.parentElement.parentElement;
                overallRow.classList.remove("past", "present", "future");
                overallRow.classList.add("past");}});}
    timeCheck()

    function eventsDisplay() {
        $("textarea").each(function () {
            var textID = this.id;
            var calendarListCurrent = [];
            if (localStorage.getItem("calendarListStorage") === null) {
                calendarListCurrent;}
            else {
                calendarListCurrent = JSON.parse(localStorage.getItem("calendarListStorage"));
            }
            let timeTestCheck = calendarListCurrent.find(calendarListCurrent => calendarListCurrent.time === textID);

            if (timeTestCheck) {
                var elementPos = calendarListCurrent.map(function (calendarListCurrent) { return calendarListCurrent.time; }).indexOf(textID);
                var display = calendarListCurrent[elementPos].events
                document.getElementById(textID).value = display;
            }
            else {return;}})};
    eventsDisplay()});