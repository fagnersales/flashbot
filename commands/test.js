module.exports.run = (client, message, args) => {
    client.channels.get(message.channel.id).send(`Hi!`);
};

module.exports.info = {
    name: "test",
    aliases: ["test", "teste"]
}