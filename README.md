# Website voor Acrobatiekvereniging Op De Kop

[www.op-de-kop.nl](http://www.op-de-kop.nl/)

## Development

To start working on the site:

- `npm install`
- `npm start`
- visit the URL Eleventy suggests

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
