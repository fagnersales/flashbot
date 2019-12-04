module.exports.run = async (client, message, stats) => {

    messagechannel = client.channels.get(message.channel.id);

    if (stats.infoRunning() === false) return messagechannel.send(`The bots are already offline.`);

    Clients = require(`../essential/AllClients`).ClientsArray;


    text = [`<:zton:651351920618897428> TOP`,
        `<:zton:651351920618897428> JUNGLE`,
        `<:zton:651351920618897428> MID`,
        `<:zton:651351920618897428> ADC`,
        `<:zton:651351920618897428> SUP`];

    msg = await messagechannel.send(text.join(" "));


    for (const [idx, element] of Clients.entries()) {
        await element.destroy();
        lane = text[idx].split(" ")[1];
        text[idx] = `<:ztoff:651351911471120386> ${lane}`;

        console.log(`${element.user.id} destroyed`);

        await msg.edit(text.join(" "));
        
    }

    msg.edit(`${text.join(" ")}\nAll bots has been destroyed.`);
    stats.setRunning(false);
}

module.exports.info = {
    name: "stop",
    aliases: ["stop", "stpo", "stoo"]
}