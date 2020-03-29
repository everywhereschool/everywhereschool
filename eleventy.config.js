const format = require('date-fns/format');

module.exports = eleventyConfig => {

    eleventyConfig.addFilter('formatAndLocalizeDateTime', function(dateTime) { 
        return format(new Date(dateTime), 'PPPppp');
    });

    eleventyConfig.addPassthroughCopy('app.js');
    eleventyConfig.addPassthroughCopy('browserconfig.xml');
    eleventyConfig.addPassthroughCopy('humans.txt');
    eleventyConfig.addPassthroughCopy('fonts');
    eleventyConfig.addPassthroughCopy('images');
    eleventyConfig.addPassthroughCopy('normalize.css');
    eleventyConfig.addPassthroughCopy('robots.txt');
    eleventyConfig.addPassthroughCopy('site.webmanifest');
    eleventyConfig.addPassthroughCopy('style.css');
    eleventyConfig.addPassthroughCopy('web_modules');
    
    return {
        passthroughFileCopy: true
    }
};
