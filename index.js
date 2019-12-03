const { Client } = require("discord.js");
const tokens = require(`./structures/tokens.json`);

let CommandHandler;

const mainClient = new Client();

// create the clients and returns the array of them.
// ClientsArray = require(`./essential/createAllClients`);
// start the clients with an array of them.
// ClientsStart = require(`./essential/startAllClients`)(ClientsArray);

// create command handler.
mainClient.on(`ready`, () =>
    CommandHandler = require(`./structures/createCommandHandler`));

mainClient.on(`message`, message =>
    require(`./structures/callCommand`)(mainClient, message, CommandHandler));

mainClient.login(tokens.main);