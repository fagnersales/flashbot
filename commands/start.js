module.exports.run = async (client, message, stats) => {

    messagechannel = client.channels.get(message.channel.id);

    if (stats.infoRunning() === true) return messagechannel.send(`already started.`);

    Clients = require(`../index`).Clients;

    ClientsStart = await require(`../essential/startAllClients`)(Clients, client, messagechannel);
    stats.setRunning(true);

}

module.exports.info = {
    name: "start",
    aliases: ["start", "star", "strat"]
}