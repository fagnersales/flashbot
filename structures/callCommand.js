module.exports = (client, message, CommandHandler, stats) => {

    if (message.author.bot || message.channel.type === "dm" || message.channel.id !== "650853553883054090") return;

    let args = message.content.toLowerCase().split(" ");

    let command;
    let name;

    if (CommandHandler.has(args[0])) {
        command = CommandHandler.get(args[0]);
        name = command.info.name;
    }

    try {

        switch (name) {
            case "test": command.run(client, message, args);
                break;
            default: command.run(client, message, stats);
                break;
        }

    } catch (error) {
        console.log(error);
    }

} 