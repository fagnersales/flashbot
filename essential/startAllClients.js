module.exports = async (ClientsArray, client, messagechannel) => {

    text = [`<:ztoff:651351911471120386> TOP`,
        `<:ztoff:651351911471120386> JUNGLE`,
        `<:ztoff:651351911471120386> MID`,
        `<:ztoff:651351911471120386> ADC`,
        `<:ztoff:651351911471120386> SUP`];

    msg = await client.channels.get(messagechannel.id).send(text.join(" "));

    for (const [idx, element] of ClientsArray.entries()) {
        await element.client.login(element.token);
                
        lane = text[idx].split(" ")[1];
        text[idx] = `<:zton:651351920618897428> ${lane}`;

        msg.edit(text.join(" "));

        console.log(`${element.client.user.id} started`);
    }

    msg.edit(`${text.join(" ")}\nAll bots has successfully started.`);
    console.log(`All bots has been destroyed.`);
}