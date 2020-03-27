module.exports = eleventyConfig => {
    eleventyConfig.addPassthroughCopy('browserconfig.xml');
    eleventyConfig.addPassthroughCopy('humans.txt');
    eleventyConfig.addPassthroughCopy('images');
    eleventyConfig.addPassthroughCopy('normalize.css');
    eleventyConfig.addPassthroughCopy('robots.txt');
    eleventyConfig.addPassthroughCopy('site.webmanifest');
    eleventyConfig.addPassthroughCopy('style.css');
    
    return {
        passthroughFileCopy: true
    }
};
