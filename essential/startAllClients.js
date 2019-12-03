module.exports = async (ClientsArray) => {
clientsN = 0;
for (const [idx, element] of ClientsArray.entries()) {
        await element.client.login(element.token);
        clientsN++;
        console.log(`${element.client.user.id} started`);
    }
    console.log(`${clientsN} clients started`);

}