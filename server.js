var request = require('request');
var https = require('https');
var http = require('http');
var url = require('url');

// var express = require('express');
// var cookieParser = require('cookie-parser');

http.createServer(function (req, res) {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    var page = '';
    // if (url_parts.path == 'text') {
    //     page += '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>';
    // } else {
    //     page += '<p>Hello World</p>';
    //     page += '<p><a href="/text">Please, click me</a></p>';
    // }
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });

    var oPlayerJson = {
        "Rohit": 258,
        "JP Duminy": 621,
        "E Lewis": 764,
        "S Lad": 1098,
        "S Tiwary": 1122,
        "Suryakumar": 1125,
        "S Lumba": 11473,
        "A Tare": 828,
        "I Kishan": 894,
        "Hardik": 237,
        "B Cutting": 837,
        "Krunal": 939,
        "K Pollard": 945,
        "T Dhillon": 11479,
        "AS Roy": 11480,
        "Mustafizur": 114,
        "J Bumrah": 240,
        "M M'naghan": 528,
        "P Sangwan": 1035,
        "P Cummins": 7899,
        "R Chahar": 9305,
        "A Dananjaya": 9963,
        "MD Nidheesh": 11334,
        "M Markande": 11474,
        "Mohsin Khan": 11482,
        "S Raina": 264,
        "F du Plessis": 609,
        "A Rayudu": 816,
        "M Vijay": 993,
        "C Bishnoi": 8553,
        "D Shorey": 11312,
        "S Billings": 180,
        "MS Dhoni": 243,
        "N Jagadeesan": 6524,
        "S Watson": 51,
        "R Jadeja": 255,
        "D Bravo": 567,
        "Kedar": 930,
        "Kshitiz": 11484,
        "Harbhajan": 234,
        "I Tahir": 618,
        "D Chahar": 864,
        "Karn": 951,
        "S Thakur": 1119,
        "M Wood": 6482,
        "L Ngidi": 9057,
        "K Seth": 11338,
        "Monu Singh": 11477,
        "KM Asif": 11509,
        "G Maxwell": 54,
        "J Roy": 159,
        "C Munro": 504,
        "G Gambhir": 882,
        "Gurkeerat": 885,
        "S Iyer": 1083,
        "P Shaw": 8634,
        "M Kalra": 11457,
        "N Ojha": 1008,
        "R Pant": 1056,
        "C Morris": 597,
        "Jayant": 921,
        "V Shankar": 1152,
        "D Christian": 8058,
        "R Tewatia": 8562,
        "A Sharma": 11459,
        "M Shami": 246,
        "T Boult": 543,
        "K Rabada": 624,
        "Amit Mishra": 795,
        "Harshal": 888,
        "S Nadeem": 1104,
        "Avesh": 9266,
        "S Ghosh": 9308,
        "S Lamichhane": 11475,
        "A Finch": 60,
        "Yuvraj": 270,
        "C Gayle": 558,
        "D Miller": 603,
        "K Nair": 936,
        "Mayank": 960,
        "M Tiwary": 9069,
        "Akshdeep": 804,
        "L Rahul": 957,
        "Axar": 810,
        "M Stoinis": 990,
        "Manzoor": 11481,
        "A Tye": 81,
        "R Ashwin": 252,
        "A Rajpoot": 813,
        "B Sran": 852,
        "Mohit": 1002,
        "Pardeep": 1032,
        "B Dwarshuis": 8181,
        "Mujeeb": 11239,
        "M Dagar": 11476,
        "V Kohli": 267,
        "AB d'Villiers": 594,
        "B McCullum": 846,
        "Mandeep": 984,
        "M Vohra": 996,
        "Sarfaraz": 1564,
        "A Joshi": 11472,
        "Q de Kock": 630,
        "Parthiv": 1026,
        "M Ali": 174,
        "C Anderson": 507,
        "C Woakes": 5487,
        "W Sundar": 6625,
        "C G'homme": 7860,
        "P Deshpande": 8361,
        "P Negi": 249,
        "T Southee": 540,
        "M Ashwin": 963,
        "Umesh": 1140,
        "Y Chahal": 1161,
        "M Siraj": 8502,
        "Aniket": 9263,
        "K Khejroliya": 9293,
        "N Saini": 9302,
        "C Lynn": 855,
        "N Rana": 1011,
        "R Uthappa": 1062,
        "I Jaggi": 8385,
        "Rinku": 9275,
        "S Gill": 11033,
        "A Wankhade": 11357,
        "D Karthik": 870,
        "A Russell": 549,
        "S Narine": 1107,
        "C Delport": 9180,
        "Kuldeep": 954,
        "M Johnson": 972,
        "P Chawla": 1014,
        "Vinay": 1146,
        "J Searles   ": 5497,
        "T Curran": 9243,
        "K Nagarkoti": 11456,
        "S Mavi": 11458,
        "A Hales": 141,
        "S Dhawan": 261,
        "K Williamson": 519,
        "M Pandey": 774,
        "D Hooda": 867,
        "R Bhui": 1050,
        "S Baby": 1071,
        "Tanmay": 8487,
        "W Saha": 1158,
        "S Goswami": 11034,
        "M Nabi": 3,
        "Shakib": 126,
        "C Brathwaite": 555,
        "Y Pathan": 1164,
        "Rashid Khan": 42,
        "C Jordan": 147,
        "Bhuvi": 843,
        "Bipul": 849,
        "Khaleel": 924,
        "S Kaul": 1092,
        "Sandeep": 1113,
        "T Natarajan": 6516,
        "B Stanlake": 8016,
        "B Thampi": 9287,
        "Mehdi": 11483,
        "A Rahane": 228,
        "M Lomror": 975,
        "R Tripathi": 9328,
        "AV Birla": 11478,
        "J Buttler": 165,
        "S Samson": 1110,
        "P Chopra": 9036,
        "H Klaasen": 9246,
        "B Stokes": 144,
        "S Binny": 1074,
        "D Short": 8577,
        "J Saxena": 11471,
        "D Chameera": 708,
        "Ankit": 822,
        "Anureet": 825,
        "D Kulkarni": 873,
        "J Unadkat": 918,
        "S Gopal": 1080,
        "B Laughlin": 7827,
        "K Gowtham": 8364,
        "JC Archer": 11075,
        "S Midhun": 11469,
        "ZK Pakteen": 11470
    };

    var oPlayerJson = {
        "Raina": 264,
        "Raydu": 816,
        "Billings": 180,
        "Dhoni": 243,
        "Watson": 51,
        "Jadeja": 255,
        "Bravo": 567,
        "Harbhajan": 234,
        "Tahir": 618,
        "D Chahar": 864,
        "Thakur": 1119,
        "Lynn": 855,
        "N Rana": 1011,
        "Uthappa": 1062,
        "Rinku": 9275,
        "D Karthik": 870,
        "A Russel": 549,
        "Narine": 1107,
        "Kuldeep": 954,
        "P Chawla": 1014,
        "Vinay": 1146,
        "T Curran": 9243,
    };


    var aAnkit = {
        aPlayers:  [54, 81, 567, 855, 243, 234, 939, 882, 8577, 8364, 144],
        batStar: 8577,
        bowlStar: 144
    };
    var aNitin = {
        aPlayers:  [504, 8577, 1080, 843, 9328, 42, 1056, 237, 549, 855, 264],
        bowlStar: 8577,
        batStar: 1056
    };
    var aArun = {
        aPlayers:  [873, 870, 144, 882, 54, 519, 8577, 1107, 918, 6625, 954],
        batStar: 54,
        bowlStar: 918
    };
    var aSaumya = {
        aPlayers:  [918, 1119, 816, 567, 243, 549, 543, 1083, 519, 144, 42],
        bowlStar: 918,
        batStar: 1083
    };

    var aBibhu = {
        aPlayers:  [543, 1107, 843, 894, 960, 504, 11239, 1056, 261, 144, 882],
        bowlStar: 543,
        batStar: 882
    };
    var aAdwait = {
        aPlayers:  [864, 567, 870, 11474, 228, 1062, 843, 261, 1083, 1107, 144],
        bowlStar: 567,
        batStar: 870
    };
    var aNeha = {
        aPlayers:  [1083, 549, 984, 237, 870, 843, 261, 42, 228, 1056, 918],
        batStar: 1056,
        bowlStar: 918
    };


    // URL to get team players
    // https://fandromeda.com/v2/champ/classic_squad?tournament_id=324&edit_squad_page=0&user=338320

    //     var oPlayers = {};
    // function httpGet(theUrl) {
    //     var xmlHttp = new XMLHttpRequest();
    //     xmlHttp.open("GET", theUrl, false); // false for synchronous request
    //     xmlHttp.send(null);
    //     var json = JSON.parse(xmlHttp.responseText);
    // 	oPlayers.aPlayers = [];
    //     for (var i = 0; i < json.players.length; i++){
    //     	oPlayers.aPlayers.push(json.players[i].player_id);
    // 		if (json.players[i].batting_power == "T") oPlayers.batStar = json.players[i].player_id;
    // 		if (json.players[i].bowling_power == "T") oPlayers.bowlStar = json.players[i].player_id;
    // 	}
    // 	return oPlayers;
    // }

    // httpGet("https://fandromeda.com/v2/champ/classic_squad?tournament_id=324&edit_squad_page=0&user=644085");


    var sabLog = [{
        "Ankit": aAnkit
    }, {
        "Nitin": aNitin
    }, {
        "Arun": aArun
    }, {
        "Saumya": aSaumya
    }, {
        "Bibhu": aBibhu
    }, {
        "Adwait": aAdwait
    }, {
        "Neha": aNeha
    }];

    var finalCall = function (urlNew, oUserJson) {
        request(urlNew, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // console.log(body);
                for (var q = 0; q < sabLog.length; q++) {
                    var aPlayers = sabLog[q][Object.keys(sabLog[q])[0]];
                    var json = JSON.parse(body);

                    var sum = 0;
                    for (var i = 0; i < json.pps.length; i++) {

                        for (var j = 0; j < aPlayers.aPlayers.length; j++) {
                            if (aPlayers.aPlayers[j] == json.pps[i].player_id) {
                                var thisPlayer = 0;
                                if (aPlayers.batStar == json.pps[i].player_id) thisPlayer = json.pps[i].batting_pts;
                                else if (aPlayers.bowlStar == json.pps[i].player_id) {
                                    thisPlayer = json.pps[i].bowling_pts;
                                }

                                thisPlayer = thisPlayer + (json.pps[i].bowling_pts + json.pps[i].batting_pts + json.pps[i].bonus_pts + json.pps[i].fielding_pts);
                                sum = sum + thisPlayer;
                            }
                        }
                    }
                    page += '<p>' + Object.keys(sabLog[q])[0] + ": " + sum + '</p>';
                }
            }
            res.end(page);
        });
    }

    // URL to get the list of players and there IDs
    var playerIdUrl = "https://fandromeda.com/v2/champ_gang/get_gang_standings?tournament_id=324&league_id=28260&page=0";

    const options = {
        hostname: 'www.fandromeda.com',
        path: '/v2/champ_gang/get_gang_standings?tournament_id=324&league_id=28260&page=0',
        headers: {
            'Cookie': "t_id=54ae907c-c50d-4c19-b71e-bded1d11ecd2; _ga=GA1.2.641504263.1523369929; _gid=GA1.2.1799373421.1523369929"
        }
    };
    https.get(options, (res) => {

        res.on('data', (d) => {
            // process.stdout.write(d);
            // console.log(d);
            var data = d;
            console.log(d);
            var oUserJson = {};
            // for (var i = 0; i < data.members.length; i++) {
            //     oUserJson[data.members[i]] = data.members[i].user_id;
            // }
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
            var urlNew = "https://s3-us-west-2.amazonaws.com/fanlive/h2h-live/event_pp_2954.json?v=" + (new Date()).getTime();
            finalCall(urlNew, oUserJson);
        });

    }).on('error', (e) => {
        console.error(e);
    });

    // request(playerIdUrl, function (error, response, body) {
    //     if (!error && response.statusCode == 200) {
    //         // console.log(body);

    //     }
    //     // res.end(page);

    // });

}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');