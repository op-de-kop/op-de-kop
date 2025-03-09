# Website voor Acrobatiekvereniging Op De Kop

[www.op-de-kop.nl](http://www.op-de-kop.nl/)

## Development

To start working on the site:

- `npm install`
- `npm start`
- visit the URL Eleventy suggests


## Docker compose
To start without having to install npm on your system:
- `docker-compose run --rm npm npm install`
- `docker-compose up`

- visit: http://localhost:8080/nl-NL/

### Debug mode`

If you're having trouble with Eleventy you can run it in debug mode:

- `npm run start_debug` to get Eleventy debug messages
- `npm run start_debug_all` to get all debug messages

## Content management

### Class videos

To add class videos:

1. make sure the videos are uploaded to YouTube
1. copy the YouTube video id's, `3Lv0FrbyJYQ` for example
1. edit the `videos.md` files for all languages
1. follow the pattern of "class description": "YouTube video id"
1. run `npm start` to see your changes locally
1. if that looks good, commit and push

### Redirects

If you want to add redirects: add them to `/src/static/root/_redirects`.
