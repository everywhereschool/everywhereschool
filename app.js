import { format, isPast, isAfter, isBefore, addHours } from "/web_modules/date-fns.js";

const streams = document.querySelectorAll('article.card');
if (streams.length > 0) {
    streams.forEach(function(stream) {
        const date = stream.querySelector('.card-date');
        const startTime = date.getAttribute('datetime');
        const endTime = date.dataset.end;
        let formattedStartTime = `${format(new Date(startTime), 'PP')} at ${format(new Date(startTime), 'p')}`;
        date.innerText = formattedStartTime;
        if (isPast(new Date(endTime))) { // Stream end time is in the past.
            stream.dataset.status = 'done';
            stream.querySelector('.badge .label').innerText = 'done';
        }
        if (isAfter(new Date(startTime), new Date()) && isBefore(new Date(startTime), addHours(new Date(), 1))) { // Stream start time is within the next hour.
            stream.dataset.status = 'soon';
            stream.querySelector('.badge .label').innerText = 'soon';
        }
        if (isAfter(new Date(), new Date(startTime)) && isBefore(new Date(), new Date(endTime))) { // Stream is live.
            stream.dataset.status = 'live';
            stream.querySelector('.badge .label').innerText = 'live';
        }
    });
}
