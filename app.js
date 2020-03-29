import { format } from '/web_modules/date-fns.js';

const dates = document.querySelectorAll('time');

dates.forEach(date => {
    date.innerText = `${format(new Date(date.getAttribute('datetime')), 'PP')} at ${format(new Date(date.getAttribute('datetime')), 'p')}`;
});
