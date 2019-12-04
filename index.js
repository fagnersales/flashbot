const { Client } = require("discord.js");
const tokens = require(`./structures/tokens.json`);
stats = require(`./structures/stats`);
stats = new stats();

let CommandHandler;

const mainClient = new Client();

// create the clients and returns the array of them.
Clients = require(`./essential/AllClients`);

module.exports.Clients = Clients;

// create command handler.
mainClient.on(`ready`, () => {
    console.log("logged.");
    CommandHandler = require(`./structures/createCommandHandler`);
});

mainClient.on(`message`, message =>
    require(`./structures/callCommand`)(mainClient, message, CommandHandler, stats));

mainClient.login(tokens.main);