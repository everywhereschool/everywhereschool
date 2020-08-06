require('dotenv').config()

const apiKey = process.env.AIRTABLE_API_KEY;
const airtable = require('airtable');
const Bottleneck = require('bottleneck');
const base = new airtable({apiKey}).base('appIDPnCgGApCGUtF');

const compareStreams = (a, b) => {	
	let comparison = 0;

	if (a.name > b.name) {
		comparison = 1;
	} else if (a.name < b.name) {
		comparison = -1;
	}

	return comparison;
};

module.exports = async function() {
	return new Promise((resolve, reject) => {
		const limiter = new Bottleneck({minTime: 1000 / 5});
		const streams = [];

		limiter.wrap(base('Streams').select().eachPage(function page(records, fetchNextPage) {
			records.forEach(function(record) {
				const name = record.get('Name');
				const link = record.get('Link');
				const photo = record.get('Photo');
				const creatorName = record.get('Creator Name');
				const creatorLink = record.get('Creator Link');
				const platform = record.get('Platform') || false;
				const subject = record.get('Subject');
				const ageRange = record.get('Age Range');
				streams.push({name, link, photo, creatorName, creatorLink, platform, subject, ageRange});
			});
			fetchNextPage();
		}, function done(err) {
			if (err) {
				console.error(err);
				reject(error);
			}

			const subjects = streams.reduce((accumulator, currentStream) => {				
				if (!accumulator.includes(currentStream.subject)) {
					accumulator.push(currentStream.subject);
				}
		
				return accumulator;
			}, []);

			resolve({
				items: streams.sort(compareStreams),
				ageRanges: ["3+", "6+", "9+", "12+", "Teens+", "All Ages"],
				subjects: subjects.sort()
			});
		}));
	});
}
