var oUsers = {};

var oUserJson = {
    "BPT450": 338320,
    "100mya": 659148,
    "adwaitnad": 337868,
    "neha_": 644085,
    "strawhat_hermit": 644135,
    "Chonkpur_Cheetay": 45993,
    "adbhut": 37493,
    "Aadii4fan": 499326
};

function httpGet(theUrl, key) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    var json = JSON.parse(xmlHttp.responseText);
    var oPlayers = {};
    var score = json.team_info.score;
    oPlayers.aPlayers = [];
    for (var i = 0; i < json.players.length; i++) {
        oPlayers.aPlayers.push(json.players[i].player_id);
        if (json.players[i].batting_power == "T") oPlayers.batStar = json.players[i].player_id;
        if (json.players[i].bowling_power == "T") oPlayers.bowlStar = json.players[i].player_id;
    }
    oPlayers.score = score;
    oUsers[key] = oPlayers;
    return JSON.stringify(oUsers);
}

for (var key in oUserJson) {
    httpGet("https://fandromeda.com/v2/champ/classic_squad?tournament_id=324&edit_squad_page=0&user=" + oUserJson[key], key);
}