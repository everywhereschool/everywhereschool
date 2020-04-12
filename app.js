import { format, isPast, isAfter, isBefore, isToday, isTomorrow, addHours, addDays, endOfTomorrow } from "/web_modules/date-fns.js";

function insertHeading(stream, label) {
    const heading = document.createElement('h2');
    heading.className = 'clearfix date-title';
    heading.textContent = label;
    stream.parentNode.insertBefore(heading, stream);
}

function formatDates(streams) {
    streams.forEach(function(stream) {
        const date = stream.querySelector('.card-date');
        const startTime = date.getAttribute('datetime');
        date.innerText = `${format(new Date(startTime), 'PP')} at ${format(new Date(startTime), 'p')}`;
    });
}

function groupStreams(streams) {
    let offset = false;
    streams.forEach(function(stream) {
        const startTime = stream.querySelector('.card-date').getAttribute('datetime');
        // Stream is today.
        if (isToday(new Date(startTime))) {
            if (!offset) {
                insertHeading(stream, 'Today’s Livestreams');
                offset = '0';
            }
        }
        // Stream is tomorrow.
        if (isTomorrow(new Date(startTime))) {
            if (offset === '0') {
                insertHeading(stream, 'Tomorrow’s Livestreams');
                offset = '1';
            }
        }

        // Stream is in two days.
        if (isAfter(new Date(startTime), endOfTomorrow()) && isBefore(new Date(startTime), addDays(endOfTomorrow(), 1))) {
            if (offset === '1') {
                insertHeading(stream, `${format(new Date(startTime), 'EEEE')}’s Livestreams`);
                offset = '2';
            }
        }
        // Stream is in three days.
        if (isAfter(new Date(startTime), addDays(endOfTomorrow(), 1)) && isBefore(new Date(startTime), addDays(endOfTomorrow(), 2))) {
            if (offset === '2') {
                insertHeading(stream, `${format(new Date(startTime), 'EEEE')}’s Livestreams`);
                offset = '3';
            }
        }
        // Stream is in four days.
        if (isAfter(new Date(startTime), addDays(endOfTomorrow(), 2)) && isBefore(new Date(startTime), addDays(endOfTomorrow(), 3))) {
            if (offset === '3') {
                insertHeading(stream, `${format(new Date(startTime), 'EEEE')}’s Livestreams`);
                offset = '4';
            }
        }
        // Stream is in five days.
        if (isAfter(new Date(startTime), addDays(endOfTomorrow(), 3)) && isBefore(new Date(startTime), addDays(endOfTomorrow(), 4))) {
            if (offset === '4') {
               insertHeading(stream, `${format(new Date(startTime), 'EEEE')}’s Livestreams`);
               offset = '5';
            }
        }
        // Stream is in six days.
        if (isAfter(new Date(startTime), addDays(endOfTomorrow(), 4)) && isBefore(new Date(startTime), addDays(endOfTomorrow(), 5))) {
            if (offset === '5') {
                insertHeading(stream, `${format(new Date(startTime), 'EEEE')}’s Livestreams`);
                offset = '6';
            }
        }
        // Stream is next week.
        if (isAfter(new Date(startTime), addDays(endOfTomorrow(), 5)) && isBefore(new Date(startTime), addDays(endOfTomorrow(), 13))) {
            if (offset === '6') {
                insertHeading(stream, 'Next Week’s Livestreams');
                offset = 'nextweek';
            }
        }
        // Stream is later.
        if (isAfter(new Date(startTime), addDays(endOfTomorrow(), 13))) {
            if (offset === 'nextweek') {
                insertHeading(stream, 'Future Livestreams');
                offset = 'later';
            }
        }
    });
}

function updateStreams() {
    const streams = document.querySelectorAll('article.card');

    streams.forEach(function(stream) {
        const date = stream.querySelector('.card-date');
        const startTime = date.getAttribute('datetime');
        const endTime = date.dataset.end;
        
        // Stream end time is in the past.
        if (isPast(new Date(endTime))) {
            stream.dataset.status = 'done';
            stream.querySelector('.badge .label').innerText = 'done';
        }
        // Stream start time is within the next hour.
        if (isAfter(new Date(startTime), new Date()) && isBefore(new Date(startTime), addHours(new Date(), 1))) {
            stream.dataset.status = 'soon';
            stream.querySelector('.badge .label').innerText = 'soon';
        }
        // Stream is live.
        if (isAfter(new Date(), new Date(startTime)) && isBefore(new Date(), new Date(endTime))) {
            stream.dataset.status = 'live';
            stream.querySelector('.badge .label').innerText = 'live';
        }
    });
}

function timedUpdate() {
    updateStreams();
    setTimeout(timedUpdate, 60000);
}

const streams = document.querySelectorAll('article.card');

if (streams.length > 0) {
    formatDates(streams);
    groupStreams(streams);
    timedUpdate();
}


