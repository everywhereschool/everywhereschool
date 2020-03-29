import { format, isPast, isAfter, isBefore, addHours } from "/web_modules/date-fns.js";

const streams = document.querySelectorAll('article.card');
if (streams.length > 0) {
    streams.forEach(function(stream) {
        const date = stream.querySelector('.card-date');
        const startTime = date.getAttribute('datetime');
        const endTime = date.dataset.end;
        let formattedStartTime = `${format(new Date(startTime), 'PP')} at ${format(new Date(startTime), 'p')}`;
        date.innerText = formattedStartTime;
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
