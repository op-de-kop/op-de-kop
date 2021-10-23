module.exports = config => {
    config.addFilter("log", value => {
        console.log(value);
    });

    config.addFilter("getSingleKey", value => Object.keys(value).pop());
    config.addFilter("getSingleValue", value => Object.values(value).pop());

    config.addPassthroughCopy("./src/static/images/");
    config.addPassthroughCopy("./src/static/docs/");
    config.addPassthroughCopy({ "./src/static/root/": "/" });
    return {
        markdownTemplateEngine: "njk",
        dataTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
        dir: {
            input: "src",
            output: "dist",
        },
    };
};