require('dotenv').config()
	const apiKey = process.env.AIRTABLE_API_KEY;
	const airtable = require('airtable');
	const base = new airtable({apiKey}).base('appIDPnCgGApCGUtF');

    const compareStreams = (a, b) => {
	    const streamA = new Date(a.startTime);
	    const streamB = new Date(b.startTime);
        
	    let comparison = 0;
	
	    if (streamA.getTime() > streamB.getTime()) {
	        comparison = 1;
	    } else if (streamA.getTime() < streamB.getTime()) {
	        comparison = -1;
	    }
	
	    return comparison;
    };
    
    const getPlatform = (url) => {
        if (url.includes('vimeo')) {
            return 'Vimeo';
        }
        if (url.includes('youtube') || url.includes('youtu.be')) {
            return 'YouTube';
        }
        return false;
    }

    module.exports = async function() {
	    return new Promise((resolve, reject) => {
	        var streams = [];
	
	        base('Streams').select().eachPage(function page(records, fetchNextPage) {
	            records.forEach(function(record) {
	                const name = record.get('Name');
                    const link = record.get('Link');
	                const startTime = record.get('Start Time');
                    const endTime = record.get('End Time');
                    const creatorName = record.get('Creator Name');
                    const creatorLink = record.get('Creator Link');
                    const platform = record.get('Platform') || getPlatform(link);
                    const subject = record.get('Subject');
                    const ageRange = record.get('Age Range');
	                streams.push({name, link, startTime, endTime, creatorName, creatorLink, platform, subject, ageRange});
	            });
	            fetchNextPage();
	            resolve({items: streams.sort(compareStreams)});
	        }, function done(err) {
	            if (err) { console.error(err); reject(error); }
	        });
	    });
	}
