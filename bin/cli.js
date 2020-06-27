module.exports = {
    readArgs: (argv, callback) => {
        for (var i in argv) {
            return callback(argv[i]);
        }
    }
}