FETCHDATATIMEOUT = 3 * 60 * 1000; // 3 minutes

function fetchData(serverId) {
    fetch(`https://rust-servers.net/api/?object=servers&element=detail&key=${serverId}`)
        .then(r => r.json())
        .then(data => printData(serverId, data))
    setTimeout(() => fetchData(serverId), FETCHDATATIMEOUT);
}

function printData(serverId, data) {
    const serverElement = document.querySelector(`#server-${serverId}`);
    serverElement.querySelector('.serverName').innerText = data.name;
    serverElement.querySelector('.version').innerText = data.version;
    serverElement.querySelector('.playerCount').innerText = data.players;
    serverElement.querySelector('.maxPlayers').innerText = data.maxplayers;
    serverElement.querySelector('.voteLink').href = `${data.url}/vote`;
    serverElement.querySelector('.connect').href = `steam://connect/${data.address}:${data.port}`;
    const onlineDot = serverElement.querySelector('.onlineDot');
    if(data.is_online == "1") {
        onlineDot.classList.add("green");
    } else {
        onlineDot.classList.remove("green");
    }
}

function addServer(serverId) {
    const template = document.querySelector('#ServerTemplate');
    const serverListDiv = document.querySelector('#serverList');
    const clone = template.content.cloneNode(true);
    const serverDiv = clone.querySelector('.serverContainer');
    serverDiv.id = `server-${serverId}`;
    serverListDiv.appendChild(serverDiv);
    fetchData(serverId);
}

const servers = [
    "GbKIS8WOKbSve4coOvcU0W2zO2DE3Ib4023", // Rust
];
servers.forEach(server => addServer(server));

