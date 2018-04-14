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

    var matchId = 2958;
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

    var oUsers = {
        "BPT450": {
            "aPlayers": [1092, 549, 42, 126, 261, 1056, 11239, 960, 1107, 267, 1161],
            "bowlStar": 42,
            "batStar": 261,
            "score": 2260
        },
        "100mya": {
            "aPlayers": [1107, 261, 5487, 11239, 846, 549, 42, 939, 816, 114, 1056],
            "bowlStar": 1107,
            "batStar": 261,
            "score": 2376
        },
        "adwaitnad": {
            "aPlayers": [42, 11458, 939, 144, 1107, 261, 1062, 228, 11474, 11239, 957],
            "bowlStar": 42,
            "batStar": 261,
            "score": 2569
        },
        "neha_": {
            "aPlayers": [1107, 11239, 594, 126, 11474, 1056, 42, 261, 870, 549, 1083],
            "bowlStar": 1107,
            "batStar": 261,
            "score": 2495
        },
        "strawhat_hermit": {
            "aPlayers": [519, 939, 11474, 42, 240, 954, 6625, 1107, 882, 870, 261],
            "batStar": 1107,
            "bowlStar": 1107,
            "score": 2585
        },
        "Chonkpur_Cheetay": {
            "aPlayers": [1092, 1107, 9293, 267, 846, 42, 1056, 549, 764, 939, 60],
            "batStar": 1107,
            "bowlStar": 1107,
            "score": 2043
        },
        "adbhut": {
            "aPlayers": [867, 261, 1140, 764, 11474, 42, 144, 882, 855, 267, 870],
            "bowlStar": 42,
            "batStar": 870,
            "score": 2246
        },
        "Aadii4fan": {
            "aPlayers": [594, 11239, 267, 1092, 1056, 8058, 8562, 1125, 258, 939, 11474],
            "bowlStar": 11239,
            "batStar": 267,
            "score": 1124
        }
    };

    var finalCall = function (urlNew) {
        request(urlNew, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // console.log(body);
                var finalScores = [];
                for (var key in oUsers) {
                    var aPlayers = oUsers[key].aPlayers;
                    var json = JSON.parse(body);

                    var sum = 0;
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

                                thisPlayer = thisPlayer + (json.pps[i].bowling_pts + json.pps[i].batting_pts + json.pps[i].bonus_pts + json.pps[i].fielding_pts);
                                sum = sum + thisPlayer;
                            }
                        }
                    }
                    finalScores.push({
                        "user": key,
                        "score": sum,
                        "totalScore": oUsers[key].score + sum
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
                    page += '<p>' + finalScores[i].user + ": " + finalScores[i].score + ' ( TOTAL: ' + finalScores[i].totalScore + ' )</p>';
                }
                
            }
            res.end(page);
        });
    }


    var urlNew = "https://s3-us-west-2.amazonaws.com/fanlive/h2h-live/event_pp_" + matchId + ".json?v=" + (new Date()).getTime();
    finalCall(urlNew);

}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');