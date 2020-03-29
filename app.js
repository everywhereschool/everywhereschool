import { format, isPast, isAfter, isBefore, addHours } from "/web_modules/date-fns.js";
import Vue from "/web_modules/vue/dist/vue.esm.browser.js";

Vue.component('stream', {
    template: '<article class="card" :data-status="item.status">\
        <div class="card-image"><img :src="item.photo[0].url" alt="" loading="lazy" /></div>\
        <time class="card-date" :datetime="item.startTime">{{ item.formattedStartTime }}</time>\
        <h2><a rel="external" :href="item.link">{{ item.name }}</a></h2>\
        <p>By <a rel="external" :href="item.creatorLink">{{ item.creatorName }}</a> on {{ item.platform }}</p>\
        <div class="meta">\
            <span class="subject">{{ item.subject }}</span>\
            <span class="separator"> • </span>\
            <span class="age-range">Ages {{ item.ageRange }}</span>\
        </div>\
        <div class="badge">\
            <span class="label">{{ item.status }}</span>\
            <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">\
                <g fill="currentColor">\
                    <path d="M0,0 L60,0 C71.045695,0 80,8.954305 80,20 L80,80 L80,80 L0,0 Z"></path>\
                </g>\
            </svg>\
        </div>\
    </article>\
    ',
    props: ['item']
  })

var app = new Vue({
    el: 'main',
    data: {
        items: []
    },
    mounted: function() {
        fetch('/data.js')
            .then(response => response.json())
            .then(data => {
                for (let index = 0; index < data.length; index++) {
                    let stream = data[index];
                    let formattedStartTime = `${format(new Date(stream.startTime), 'PP')} at ${format(new Date(stream.startTime), 'p')}`;
                    stream.formattedStartTime = formattedStartTime;
                    if (isPast(new Date(stream.endTime))) { // Stream end time is in the past.
                        stream.status = 'done';
                    }
                    if (isAfter(new Date(stream.startTime), new Date()) && isBefore(new Date(stream.startTime), addHours(new Date(), 1))) { // Stream start time is within the next hour.
                        stream.status = 'soon';
                    }
                    if (isAfter(new Date(), new Date(stream.startTime)) && isBefore(new Date(), new Date(stream.endTime))) { // Stream is live.
                        stream.status = 'live';
                    }
                    this.items.push(stream);
                }
            })
    }
});
