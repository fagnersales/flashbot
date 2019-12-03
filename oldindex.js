const Discord = require(`discord.js`);
const mainClient = new Discord.Client();
const topClient = new Discord.Client();
const jungleClient = new Discord.Client();
const midClient = new Discord.Client();
const adcClient = new Discord.Client();
const supClient = new Discord.Client();

let clients = [topClient, jungleClient, midClient, adcClient, supClient];
let clientsStr = ["top", "jungle", "mid", "adc", "sup"];

const tokens = require(`./structures/tokens.json`);

let flashChannel;
let guild;
let running = false;
let vc = false;

// laneSpell = {
//     mid: {
//         flash: {
//             seconds: 300
//         },
//         other: {
//             heal: true
//         }
//     }
// }

let laneSpell = {
    top: {
        flash: null,
        other: null
    },
    jungle: {
        flash: null,
        other: null
    },
    mid: {
        flash: null,
        other: null
    },
    adc: {
        flash: null,
        other: null
    },
    sup: {
        flash: null,
        other: null
    }
}
const needToStart = () => { flashChannel.send(`You need to \`start\` before use this command.`) };
const hasFlash = (lane) => { return laneSpell[lane].flash };
const getFlashTime = (lane) => { return laneSpell[lane].flash.seconds };
const addFlash = (lane) => { laneSpell[lane].flash = { seconds: 300 } };
const removeFlash = (lane) => { laneSpell[lane].flash = null };

wordsTopFlash = ["top", "to", "tpo", "otp", "toplane"];
wordsJungleFlash = ["jungle", "jg", "jung", "jug"];
wordsMidFlash = ["mid", "mdi", "middle", "midlane"];
wordsAdcFlash = ["adc", "ad", "acd", "bot", "bottom", "atirador"];
wordsSupFlash = ["sup", "spu", "support", "suport", "suporte", "puta"];

mainClient.on(`ready`, () => {
    guild = mainClient.guilds.get("629702486021636097");
    flashChannel = mainClient.channels.get(`650853553883054090`);
    console.log(`[mainClient] => has been started.`);
});

mainClient.on(`message`, message => {
    if (!message.channel.id == flashChannel || message.author.bot) return;

    let args = message.content.toLowerCase().split(" ");

    if (args[0] === "start") startFlashBot();
    if (args[0] === "stop") stopFlashBot();
    if (args[0] === "reset") resetBot();

    if (wordsTopFlash.includes(args[0])) laneFlash("top", message);
    if (wordsJungleFlash.includes(args[0])) laneFlash("jungle", message);
    if (wordsMidFlash.includes(args[0])) laneFlash("mid", message);
    if (wordsAdcFlash.includes(args[0])) laneFlash("adc", message);
    if (wordsSupFlash.includes(args[0])) laneFlash("sup", message);
});

async function startFlashBot() {
    if (running) return flashChannel.send(`The flash marker is already running.`);

    text = [`<:ztoff:651351911471120386> TOP`,
        `<:ztoff:651351911471120386> JUNGLE`,
        `<:ztoff:651351911471120386> MID`,
        `<:ztoff:651351911471120386> ADC`,
        `<:ztoff:651351911471120386> SUP`];

    msg = await flashChannel.send(text.join("\n"));

    for (const [idx, client] of clients.entries()) {
        await client.login(tokens[clientsStr[idx]])
        lane = text[idx].split(" ")[1];
        text[idx] = `<:zton:651351920618897428> ${lane}`

        msg.edit(text);
    }
    flashChannel.send(`All bots is ready now!`);
    running = true;
}

async function stopFlashBot() {
    if (!running) return flashChannel.send(`the flash marker is not running yet.`);
    text = [`<:zton:651351920618897428> TOP`,
        `<:zton:651351920618897428> JUNGLE`,
        `<:zton:651351920618897428> MID`,
        `<:zton:651351920618897428> ADC`,
        `<:zton:651351920618897428> SUP`];

    msg = await flashChannel.send(text.join("\n"));

    if (vc) leaveChannel();

    for (const [idx, client] of clients.entries()) {
        await client.destroy();
        lane = text[idx].split(" ")[1];
        text[idx] = `<:ztoff:651351911471120386> ${lane}`

        await msg.edit(text);
    }
    resetBot(true);
    flashChannel.send(`All bots has been destroyed!`);
    running = false;
}

async function resetBot(msg) {
    if (!running && !msg) return needToStart();

    for (const [idx, client] of clients.entries()) {
        await guild.members.get(client.user.id).setNickname(clientsStr[idx].toUpperCase());
    }
    msg ? null : flashChannel.send(`All the bots has successfully reseted!`)
}

async function joinChannel(voiceChannel, client) {
    if (!voiceChannel) return flashChannel.send(`the voice channel was not informed.`);
    if (!client) return flashChannel.send(`The client was not informed.`);

    client.channels.get(voiceChannel).join();
}

async function leaveChannel(voiceChannel, client) {
    if (!voiceChannel) return flashChannel.send(`the voice channel was not informed.`);
    if (!client) return flashChannel.send(`The client was not informed.`);

    client.guilds.get(guild.id).me.voiceChannel.leave();
}

function laneFlash(lane, message) {
    if (!running) return needToStart();
    let laneClient;

    switch (lane) {
        case "top": laneClient = topClient;

            break;
        case "jungle": laneClient = jungleClient;

            break;
        case "mid": laneClient = midClient;

            break;
        case "adc": laneClient = adcClient;

            break;
        case "sup": laneClient = supClient;
            break;
    }


    if (hasFlash(lane)) return flashChannel.send(`${laneClient.user} already flashed, will return in **${getFlashTime(lane)}** seconds.`);

    member = guild.members.find(member => member.id === laneClient.user.id);

    member.setNickname(`[${lane.toUpperCase()}] NO FLASH`);

    addFlash(lane, laneClient, member);

    flashChannel.send(`${laneClient.user} has flashed! with **${getFlashTime(lane)}** seconds cooldown.`);

    if (message.member.voiceChannel) joinChannel(message.member.voiceChannelID, laneClient);

    secondsLessLess = setInterval(() => {
        if (laneSpell[lane].flash.seconds) {
            laneSpell[lane].flash.seconds = laneSpell[lane].flash.seconds - 1;
            if (laneSpell[lane].flash.seconds === 0) {
            flashUp();
            clearInterval(secondsLessLess);
        }
    }
    }, 1000);

    function flashUp() {
        flashChannel.send(`${laneClient.user} now has flash! Be careful!`);
        member.setNickname(`[${lane.toUpperCase()}] FLASH UP`);
        removeFlash(lane);
        leaveChannel(message.member.voiceChannelID, laneClient);
    }

}

mainClient.login(tokens.main);
