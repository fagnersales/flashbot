
async function leaveChannel() {
    if (!running) return flashChannel.send(`You need to start before use this command.`);
    if (!vc) return flashChannel.send(`The bot aren't at a channel.`);

    text = [`<a:zton2:651355840170688513> TOP`,
        `<a:zton2:651355840170688513> JUNGLE`,
        `<a:zton2:651355840170688513> MID`,
        `<a:zton2:651355840170688513> ADC`,
        `<a:zton2:651355840170688513> SUP`];

    msg = await flashChannel.send(text.join(`\n`));

    for (var idx = 0; idx < clients.length; idx++) {
        
        clients[idx].guilds.get(guild.id).me.voiceChannel.leave();

        emoji = text[idx].split(" ")[0];
        emoji = `<a:ztoff2:651355831740137504>`;

        lane = text[idx].split(" ")[1];
        text[idx] = emoji + " " + lane;

        await msg.edit(text);
    };

    vc = false;
    flashChannel.send(`All the bots has been disconnected.`);
}
