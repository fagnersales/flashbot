const { readdir } = require(`fs`);

commandsMap = new Map();

readdir(`./commands/`, async (err, files) => {
    if (err) throw err;

    for (const file of files) {
        props = require(`../commands/${file}`);
        commandsMap.set(props.info.name, props);
    };

});

module.exports = commandsMap;

