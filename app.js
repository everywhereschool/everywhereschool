import { format, isPast, isAfter, isBefore, isToday, isTomorrow, addHours, addDays } from "/web_modules/date-fns.js";

const streams = document.querySelectorAll('article.card');
if (streams.length > 0) {
    let current = false;
    streams.forEach(function(stream) {
        const date = stream.querySelector('.card-date');
        const startTime = date.getAttribute('datetime');
        const endTime = date.dataset.end;
        let formattedStartTime = `${format(new Date(startTime), 'PP')} at ${format(new Date(startTime), 'p')}`;
        date.innerText = formattedStartTime;
        // Stream is today.
        if (isToday(new Date(startTime))) {
            if (!current) {
                const heading = document.createElement('h2');
                heading.className = 'clearfix date-title';
                heading.textContent = 'Today’s Livestreams';
                stream.parentNode.insertBefore(heading, stream);
            }
            current = 'today';
        }
        // Stream is tomorrow.
        if (isTomorrow(new Date(startTime))) {
            if (current === 'today') {
                const heading = document.createElement('h2');
                heading.className = 'clearfix date-title';
                heading.textContent = 'Tomorrow’s Livestreams';
                stream.parentNode.insertBefore(heading, stream);
            }
            current = 'tomorrow';
        }
        // Stream is after tomorrow.
        if (isAfter(new Date(startTime), addDays(new Date(), 2))) {
            if (current === 'tomorrow') {
                const heading = document.createElement('h2');
                heading.className = 'clearfix date-title';
                heading.textContent = 'Coming Later';
                stream.parentNode.insertBefore(heading, stream);
            }
            current = 'later';
        }
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
