const { Client } = require(`discord.js`);
const tokens = require(`../structures/tokens.json`);
const topClient = new Client();
const jungleClient = new Client();
const midClient = new Client();
const adcClient = new Client();
const supClient = new Client();

allClients = [{
    "client": topClient,
    "token": tokens.top
},
{
    "client": jungleClient,
    "token": tokens.jungle
},
{
    "client": midClient,
    "token": tokens.mid
},
{
    "client": adcClient,
    "token": tokens.adc
},
{
    "client": supClient,
    "token": tokens.sup
}];

module.exports = allClients;
module.exports.ClientsArray = [topClient, jungleClient, midClient, adcClient, supClient];