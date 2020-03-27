require('dotenv').config()
	const apiKey = process.env.AIRTABLE_API_KEY;
	const airtable = require('airtable');
	const base = new airtable({apiKey}).base('appIDPnCgGApCGUtF');

    const compareStreams = (a, b) => {
	    const streamA = new Date(a.starTime);
	    const streamB = new Date(b.startTime);
        
	    let comparison = 0;
	
	    if (streamA.getTime() > streamB.getTime()) {
	        comparison = 1;
	    } else if (streamA.getTime() < streamB.getTime()) {
	        comparison = -1;
	    }
	
	    return comparison;
	};

    module.exports = async function() {
	    return new Promise((resolve, reject) => {
	        var streams = [];
	
	        base('Streams').select().eachPage(function page(records, fetchNextPage) {
	            records.forEach(function(record) {
	                const name = record.get('Name');
                    const link = record.get('Link');
	                const startTime = record.get('Start Time');
                    const endTime = record.get('End Time');
                    const creatorName = record.get('Creator Name') || false;
                    const creatorLink = record.get('Creator Link') || false;
                    const platform = record.get('Platform') || false;
                    const subject = record.get('Subject') || false;
                    const ageRange = record.get('Age Range') || false;
	                streams.push({name, link, startTime, endTime, creatorName, creatorLink, platform, subject, ageRange});
	            });
	            fetchNextPage();
	            resolve({items: streams.sort(compareStreams)});
	        }, function done(err) {
	            if (err) { console.error(err); reject(error); }
	        });
	    });
	}