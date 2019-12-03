module.exports = (client, message, CommandHandler) => {
    if (message.author.bot || message.channel.type === "dm" || message.channel.id !== "650853553883054090") return;
    
    let args = message.content.toLowerCase().split(" ");
    
    let command;

    if (CommandHandler.has(args[0])) {
        command = CommandHandler.get(args[0]);
    }
    try {
        command.run(client, message, args);
    } catch (error) {
        console.log(error);
    }
    
} 