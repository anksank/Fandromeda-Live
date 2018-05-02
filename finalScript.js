var matchId = prompt("Please enter the IPL Match Number");
matchId = parseInt(matchId) + 2948;
var oPlayerJson = {
    "3": "M Nabi",
    "42": "Rashid Khan",
    "51": "S Watson",
    "54": "G Maxwell",
    "60": "A Finch",
    "81": "A Tye",
    "114": "Mustafizur",
    "126": "Shakib",
    "141": "A Hales",
    "144": "B Stokes",
    "147": "C Jordan",
    "159": "J Roy",
    "165": "J Buttler",
    "174": "M Ali",
    "180": "S Billings",
    "228": "A Rahane",
    "234": "Harbhajan",
    "237": "Hardik",
    "240": "J Bumrah",
    "243": "MS Dhoni",
    "246": "M Shami",
    "249": "P Negi",
    "252": "R Ashwin",
    "255": "R Jadeja",
    "258": "Rohit",
    "261": "S Dhawan",
    "264": "S Raina",
    "267": "V Kohli",
    "270": "Yuvraj",
    "504": "C Munro",
    "507": "C Anderson",
    "519": "K Williamson",
    "528": "M M'naghan",
    "540": "T Southee",
    "543": "T Boult",
    "549": "A Russell",
    "555": "C Brathwaite",
    "558": "C Gayle",
    "567": "D Bravo",
    "594": "AB d'Villiers",
    "597": "C Morris",
    "603": "D Miller",
    "609": "F du Plessis",
    "618": "I Tahir",
    "621": "JP Duminy",
    "624": "K Rabada",
    "630": "Q de Kock",
    "708": "D Chameera",
    "764": "E Lewis",
    "774": "M Pandey",
    "795": "Amit Mishra",
    "804": "Akshdeep",
    "810": "Axar",
    "813": "A Rajpoot",
    "816": "A Rayudu",
    "822": "Ankit",
    "825": "Anureet",
    "828": "A Tare",
    "837": "B Cutting",
    "843": "Bhuvi",
    "846": "B McCullum",
    "849": "Bipul",
    "852": "B Sran",
    "855": "C Lynn",
    "864": "D Chahar",
    "867": "D Hooda",
    "870": "D Karthik",
    "873": "D Kulkarni",
    "882": "G Gambhir",
    "885": "Gurkeerat",
    "888": "Harshal",
    "894": "I Kishan",
    "918": "J Unadkat",
    "921": "Jayant",
    "924": "Khaleel",
    "930": "Kedar",
    "936": "K Nair",
    "939": "Krunal",
    "945": "K Pollard",
    "951": "Karn",
    "954": "Kuldeep",
    "957": "L Rahul",
    "960": "Mayank",
    "963": "M Ashwin",
    "972": "M Johnson",
    "975": "M Lomror",
    "984": "Mandeep",
    "990": "M Stoinis",
    "993": "M Vijay",
    "996": "M Vohra",
    "1002": "Mohit",
    "1008": "N Ojha",
    "1011": "N Rana",
    "1014": "P Chawla",
    "1026": "Parthiv",
    "1032": "Pardeep",
    "1035": "P Sangwan",
    "1050": "R Bhui",
    "1056": "R Pant",
    "1062": "R Uthappa",
    "1071": "S Baby",
    "1074": "S Binny",
    "1080": "S Gopal",
    "1083": "S Iyer",
    "1092": "S Kaul",
    "1098": "S Lad",
    "1104": "S Nadeem",
    "1107": "S Narine",
    "1110": "S Samson",
    "1113": "Sandeep",
    "1119": "S Thakur",
    "1122": "S Tiwary",
    "1125": "Suryakumar",
    "1140": "Umesh",
    "1146": "Vinay",
    "1152": "V Shankar",
    "1158": "W Saha",
    "1161": "Y Chahal",
    "1164": "Y Pathan",
    "1564": "Sarfaraz",
    "5487": "C Woakes",
    "5497": "J Searles   ",
    "6482": "M Wood",
    "6516": "T Natarajan",
    "6524": "N Jagadeesan",
    "6625": "W Sundar",
    "7827": "B Laughlin",
    "7860": "C G'homme",
    "7899": "P Cummins",
    "8016": "B Stanlake",
    "8058": "D Christian",
    "8181": "B Dwarshuis",
    "8361": "P Deshpande",
    "8364": "K Gowtham",
    "8385": "I Jaggi",
    "8487": "Tanmay",
    "8502": "M Siraj",
    "8553": "C Bishnoi",
    "8562": "R Tewatia",
    "8577": "D Short",
    "8634": "P Shaw",
    "9036": "P Chopra",
    "9057": "L Ngidi",
    "9069": "M Tiwary",
    "9180": "C Delport",
    "9243": "T Curran",
    "9246": "H Klaasen",
    "9263": "Aniket",
    "9266": "Avesh",
    "9275": "Rinku",
    "9287": "B Thampi",
    "9293": "K Khejroliya",
    "9302": "N Saini",
    "9305": "R Chahar",
    "9308": "S Ghosh",
    "9328": "R Tripathi",
    "9963": "A Dananjaya",
    "11033": "S Gill",
    "11034": "S Goswami",
    "11075": "JC Archer",
    "11239": "Mujeeb",
    "11312": "D Shorey",
    "11334": "MD Nidheesh",
    "11338": "K Seth",
    "11357": "A Wankhade",
    "11456": "K Nagarkoti",
    "11457": "M Kalra",
    "11458": "S Mavi",
    "11459": "A Sharma",
    "11469": "S Midhun",
    "11470": "ZK Pakteen",
    "11471": "J Saxena",
    "11472": "A Joshi",
    "11473": "S Lumba",
    "11474": "M Markande",
    "11475": "S Lamichhane",
    "11476": "M Dagar",
    "11477": "Monu Singh",
    "11478": "AV Birla",
    "11479": "T Dhillon",
    "11480": "AS Roy",
    "11481": "Manzoor",
    "11482": "Mohsin Khan",
    "11483": "Mehdi",
    "11484": "Kshitiz",
    "11509": "KM Asif"
};

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
    // window.open("https://fandromeda.com/event");
    // window.location.reload();
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
    // return JSON.stringify(oUsers);
}

for (var key in oUserJson) {
    httpGet(
        "https://fandromeda.com/v2/champ/classic_squad?tournament_id=324&edit_squad_page=0&user=" +
        oUserJson[key], key);
}

var urlNew = "https://s3-us-west-2.amazonaws.com/fanlive/h2h-live/event_pp_" + matchId + ".json?v=" + (new Date()).getTime();


var xmlHttp = new XMLHttpRequest();
xmlHttp.open("GET", urlNew, false);
xmlHttp.send(null);
var json = JSON.parse(xmlHttp.responseText);

var finalScores = [];
for (var key in oUsers) {
    var aPlayers = oUsers[key].aPlayers;

    var sum = 0;
    var aPlayersPlaying = [];
    for (var i = 0; i < json.pps.length; i++) {

        for (var j = 0; j < aPlayers.length; j++) {
            if (aPlayers[j] == json.pps[i].player_id) {
                var thisPlayer = 0;
                if (oUsers[key].batStar == json.pps[i].player_id) {
                    thisPlayer = json.pps[i].batting_pts;
                } else if (oUsers[key].bowlStar == json.pps[i].player_id) {
                    thisPlayer = json.pps[i].bowling_pts;
                }
                aPlayersPlaying.push(oPlayerJson[json.pps[i].player_id]);
                thisPlayer = thisPlayer + (json.pps[i].bowling_pts + json.pps[i].batting_pts + json.pps[i].bonus_pts + json.pps[i].fielding_pts);
                sum = sum + thisPlayer;
            }
        }
    }
    // console.log(oPlayerJson[oUsers[key].batStar]);
    finalScores.push({
        "user": key,
        "score": sum,
        "totalScore": oUsers[key].score + sum,
        "batStar": oPlayerJson[oUsers[key].batStar],
        "bowlStar": oPlayerJson[oUsers[key].bowlStar],
        "players": aPlayersPlaying.join(", ")
    });
}

function compare(a, b) {
    if (a.totalScore < b.totalScore)
        return 1;
    if (a.totalScore > b.totalScore)
        return -1;
    return 0;
}
var text = "";
finalScores.sort(compare);
for (var i = 0; i < finalScores.length; i++) {
    text += finalScores[i].user + ": " + finalScores[i].score +
        ' ( TOTAL: ' + finalScores[i].totalScore + ' )\n';
	if (i > 0) {
		text += (finalScores[i-1].totalScore - finalScores[i].totalScore) + " points behind position " + i + "\n";
    }
    text += 'Batting Star: ' + finalScores[i].batStar + ', Bowling Star: ' +
        finalScores[i].bowlStar + ' Players: ' + finalScores[i].players + '\n\n';
}

copy(text);
