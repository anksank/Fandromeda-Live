var request = require('request');
var https = require('https');
var http = require('http');
var url = require('url');

http.createServer(function (req, res) {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    var page = '';

    res.writeHead(200, {
        'Content-Type': 'text/html'
    });

    var matchId = 2964;
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

    var oUsers = {"BPT450":{"aPlayers":[957,843,1092,549,261,11239,960,1107,894,1062,1110],"batStar":957,"bowlStar":843,"score":4277},"100mya":{"aPlayers":[1092,843,957,1125,267,1107,549,939,228,954,7827],"bowlStar":843,"batStar":957,"score":5007},"adwaitnad":{"aPlayers":[261,42,957,11239,11474,228,1062,1107,1011,1110,165],"bowlStar":42,"batStar":957,"score":4881},"neha_":{"aPlayers":[1107,1140,261,1056,11474,957,267,1110,1011,252,126],"batStar":261,"bowlStar":252,"score":4723},"strawhat_hermit":{"aPlayers":[261,936,42,11474,954,6625,1107,870,228,1011,144],"batStar":261,"bowlStar":42,"score":4843},"Chonkpur_Cheetay":{"aPlayers":[11239,918,144,1062,957,1110,549,1107,1092,1011,936],"bowlStar":1092,"batStar":936,"score":4819},"adbhut":{"aPlayers":[261,252,126,228,1110,870,855,11474,11239,1107,594],"batStar":261,"bowlStar":252,"score":4053},"Aadii4fan":{"aPlayers":[936,567,1092,261,1110,11458,594,267,7827,1107,549],"bowlStar":1092,"batStar":261,"score":3406}};

    var finalCall = function (urlNew) {
        request(urlNew, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // console.log(body);
                var finalScores = [];
                for (var key in oUsers) {
                    var aPlayers = oUsers[key].aPlayers;
                    var json = JSON.parse(body);

                    var sum = 0;
                    var aPlayersPlaying = [];
                    for (var i = 0; i < json.pps.length; i++) {
                        
                        for (var j = 0; j < aPlayers.length; j++) {
                            if (aPlayers[j] == json.pps[i].player_id) {
                                var thisPlayer = 0;
                                // console.log(oUsers[key].batStar, json.pps[i].player_id);
                                if (oUsers[key].batStar == json.pps[i].player_id) {
                                    thisPlayer = json.pps[i].batting_pts;
                                    // page += " - " + thisPlayer;
                                } else if (oUsers[key].bowlStar == json.pps[i].player_id) {
                                    thisPlayer = json.pps[i].bowling_pts;
                                    // page += " - " + thisPlayer;
                                }
                                // page += oPlayerJson[json.pps[i].player_id];
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
                finalScores.sort(compare);
                for (var i = 0; i < finalScores.length; i++) {
                    page += '<p>' + finalScores[i].user + ": " + finalScores[i].score + 
                            ' ( TOTAL: <span style="font-weight:bold;">' + finalScores[i].totalScore + '</span> )</p>'; 
                    // page += '<p>Batting Star: ' + finalScores[i].batStar + ', Bowling Star: ' +
                    //         finalScores[i].bowlStar + ' Players: ' + finalScores[i].players + '</p><br>';
                }
                
            }
            res.end(page);
        });
    }


    var urlNew = "https://s3-us-west-2.amazonaws.com/fanlive/h2h-live/event_pp_" + matchId + ".json?v=" + (new Date()).getTime();
    finalCall(urlNew);

}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');