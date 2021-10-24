module.exports = {
    log(value) {
        console.log(value);
        // return so we can pipe further
        return value;
    },
    dump(value) {
        return JSON.stringify(value);
    },
};