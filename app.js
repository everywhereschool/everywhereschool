function filterStreams() {
    const streams = document.querySelectorAll('article.card');
    const ageRange = document.getElementById('ages').value !== '' ? document.getElementById('ages').value : false;
    const subject = document.getElementById('subject').value !== '' ? document.getElementById('subject').value : false;

    const matchedStreams = [...streams].filter(stream => {
        if (ageRange && subject) {
            return stream.dataset.ages === ageRange && stream.dataset.subject === subject;
        } else if (ageRange) {
            return stream.dataset.ages === ageRange;
        } else if (subject) {
            return stream.dataset.subject === subject;
        } else {
            return stream;
        }
    });

    streams.forEach((stream) => {
        if (!matchedStreams.includes(stream)) {
            stream.setAttribute('hidden', '');
        } else {
            stream.removeAttribute('hidden');
        }
    });
}

document.addEventListener('input', function (event) {
    if (event.target.id !== 'ages' && event.target.id !=='subject') return;

	filterStreams();
}, false);

