# Website voor Acrobatiekvereniging Op De Kop

[www.op-de-kop.nl](http://www.op-de-kop.nl/)

## Development

To start working on the site:

- `npm start`
- visit the URL Eleventy suggests


### root redirection

The site is hosted at [mijndomein.nl](https://mijndomein.nl) and they use
Apache. To redirect `/` to the preferred language we use an `.htaccess` file.

During development the redirection config is done in `.eleventy.js`.
