const i18n = require("eleventy-plugin-i18n");
const translations = require("./src/_data/i18n/index");

const makeYouTubeEmbed = video_id =>
    `
  <iframe
    src="https://www.youtube.com/embed/${video_id}"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer;
    autoplay;
    clipboard-write;
    encrypted-media;
    gyroscope;
    picture-in-picture"
    allowfullscreen
  ></iframe>`;

module.exports = config => {
    // i18n stuff
    config.addPlugin(i18n, {
        translations,
        fallbackLocales: {
            "*": "nl-NL",
        },
    });

    // During development we want to redirect "/"" to "/nl-NL/" just like we
    // do in .htaccess
    config.setBrowserSyncConfig({
        callbacks: {
            ready: function(err, bs) {
                bs.addMiddleware("*", (req, res) => {
                    if (req.url === "/") {
                        res.writeHead(302, {
                            location: "/nl-NL/",
                        });
                        res.end();
                    }
                });
            },
        },
    });

    // end i18n stuff

    // Filters

    config.addFilter("log", value => {
        console.log(value);
    });

    config.addFilter("getSingleKey", value => Object.keys(value).pop());
    config.addFilter("getSingleValue", value => Object.values(value).pop());
    config.addFilter("makeYouTubeEmbed", makeYouTubeEmbed);

    // end Filters
    config.addPassthroughCopy("./src/static/images/");
    config.addPassthroughCopy("./src/static/docs/");
    config.addPassthroughCopy({ "./src/static/root/": "/" });
    config.addPassthroughCopy({ "./src/static/css/": "/static/css" });
    config.addPassthroughCopy({ "./src/static/js/": "/static/js" });
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