
var gang_contest_entries_needed_map = {1:2, 2:6, 3:9}

var globalmap = {

    "tournament_sport":{
        "1" : "cricket",
        "2" : "cricket",
        "3" : "cricket",
        "4" : "football",
        "5" : "cricket",
        "8" : "kabaddi"
    },

    "skill" : {
        "4":"{",
        "2":"[",
        "3":"}",
        "1":"]",
        "8":"&#x2084;",
        "7":"&#x2081;",
        "6":"&#x208A;",
        "5":"&#x2083;",
        "9":"&#x207E;",
        "10":"&#x2081;",
        "11":"&#x208F;",
        "12":"W",
        "13":"M"        
    },
    "pp":{

        "bat" : "~",
        "ball" : "^",
        "football" : "&#x2098;",
        "kabaddi" : "&#x2099;",
        
    },
    "sortorders" : {
        "skill" : [4,1,2,3,8,7,6,5,11,10,9,13,12],
        "team" : [],
        "pooltype" : [2,1,3]
    },
    
    "cheaters" : [],
    // "playoffs" : [6,11,2,9,3,14,1,4,16,13],
    "playoffs" : [65,68,71,74,77,80,83,86],

    "skill_names" : {
                        "4" : "Batsmen",
                        "3" : "Bowlers",
                        "2" : "All Rounders",
                        "1" : "Keepers",
                        "8" : "Goal Keeper",
                        "7" : "Defender",
                        "6" : "Mid Fielder",
                        "5" : "Forward"

                    },

    "pool_type" : {1:'Orange',2:'Maroon',3:'Green'},
    

}

/*Global mappings end*/
function getDdate(d) {
    d = d.split(" ");
    day = parseFloat(d[0]);
    if ((day >= 4 && day <= 20) || (day >= 24 && day <= 30)) {
        suffix = "TH"
    } else {
        suffix = ["ST", "ND", "RD"][(day % 10) - 1]
    }
    d[0] = d[0] + suffix;
    return d.join(" ")
}

function getShareDtFormat(dtm, b, f, sec) {
    var dt = new Date(strToDate(dtm));
    var suffix = "";
    day = (dt.getDate());
    if ((day >= 4 && day <= 20) || (day >= 24 && day <= 30)) {
        suffix = "th"
    } else {
        suffix = ["st", "nd", "rd"][(day % 10) - 1]
    }
    var tdate = dt.getDate();
    // if (tdate < 10) {
    //     tdate = "0" + tdate
    // }
    var dtstr =  dt.getMonthName(f) + " " + tdate + ", ";
    if (!b) {
        var dtstr =   dt.getMonthName(f) +" " +tdate+" "+suffix;
        return dtstr
    }
    var hour = dt.getHours();
    var ap = "am";
    if (hour > 11) {
        ap = "pm"
    }
    if (hour > 12) {
        hour = hour - 12
    }
    if (hour == 0) {
        hour = 12
    }
    // if (hour < 10) {
    //     hour = "0" + hour
    // }
    minu = dt.getMinutes();
    secs = dt.getSeconds();
    if (minu < 10) {
        minu = "0" + minu
    }
    if (sec) {
        if (secs <= 9) {
            dtstr += " " + hour + ":" + minu + ":0" + secs + " " + ap + " "
        } else {
            dtstr += " " + hour + ":" + minu + ":" + secs + " " + ap + " "
        }
    } else {
        dtstr += " " + hour + ":" + minu + "" + ap + " "
    }
    return dtstr
}

function strToDate(datestr) {
    var d = datestr.split(" ");
    var tmp = "";
    tmp = d[1].split(":");
    d = d[0].split("-");
    var dt = new Date(d[0], d[1] - 1, d[2], tmp[0], tmp[1], tmp[2].split(".")[0], 0);
    return dt
}
var months = function() {
    return {
        names: {
            0: "January",
            1: "February",
            2: "March",
            3: "April",
            4: "May",
            5: "June",
            6: "July",
            7: "August",
            8: "September",
            9: "October",
            10: "November",
            11: "December"
        },
        namesShort: {
            0: "Jan",
            1: "Feb",
            2: "Mar",
            3: "Apr",
            4: "May",
            5: "June",
            6: "July",
            7: "Aug",
            8: "Sep",
            9: "Oct",
            10: "Nov",
            11: "Dec"
        },
        getMonthName: function(m, f) {
            var n = "";
            if (f == undefined || !f) {
                n = this.names
            } else {
                n = this.namesShort
            }
            if (m === undefined || jQuery.trim(m).length === 0) {
                return ""
            }
            if (m < 0 || m > 11) {
                return ""
            } else {
                return n[m]
            }
        }
    }
}();
Date.prototype.getMonthName = function(f) {
    if (isNaN(this)) {
        return NaN
    }
    return months.getMonthName(this.getMonth(), f)
};

/*End of date helper*/

var ajaxhelper = function() {

    var calllog = {};
    var totalcalls = 0;
    var results = {};
    var overallstatus = 1;
    var no_of_calls = 0;

    return {

        getData: function(opt, paramarr) {
            if (paramarr == undefined) {
                paramarr = [];
            }
            no_of_calls++;
            calllog[no_of_calls] = {"results" : {}, "totalcalls" : 0};
            // calllog[no_of_calls].results = {};
            var callback = opt["callback"];
            var urls = opt["urls"]
            // calllog[no_of_calls].totalcalls = 0;
            var results = {};
            for (i = 0; i < urls.length; i++) {
                ajaxhelper.get(urls[i]["url"], urls[i]["key"], opt["callback"], urls.length, paramarr,no_of_calls);

            }

        },

        get: function(url, key, callback, threshold, paramarr,no_of_calls) {

            $.getJSON(url)
                .done(function(data) {

                  calllog[no_of_calls].results[key] = {
                        "data": data,
                        "status": 1
                    }


                })
                .fail(function() {
                    overallstatus = -1;
                    calllog[no_of_calls].results[key] = {
                        "data": [],
                        "status": -1
                    }

                })
                .always(function() {
                     calllog[no_of_calls].totalcalls++;

                    if (calllog[no_of_calls].totalcalls == threshold) {
                        calllog[no_of_calls].results["overallstatus"] = overallstatus;
                        if (callback.length > 0) {

                            window[callback](calllog[no_of_calls].results, paramarr);
                        }

                    }

                });
        },

        post: function(url, data, callback, paramarr) {

            var aj = $.ajax({

                    method: "POST",
                    url: url,
                    data: JSON.stringify(data),
                    contentType: "application/json",
                   

                })
                .done(function(data) {

                     //alert("success");
                    results = {
                        "data": data,
                        "status": 1
                    }
                   
                })
                .fail(function() {

                    results = {
                        "data": [],
                        "status": -1
                    }
                })
                .always(function() {
                    if (callback.length > 0) {
                        window[callback](results, paramarr);
                    }
                });

                return aj;


        }



    }

}();
/*End of Ajax helper*/

var datahelper = function() {

    return {

        arrayToMap: function(arr, key, multiple) {
            ////console.log(arr);
            var map = {};
            if (arr == undefined) {
                return {}
            }
            if (multiple == undefined) {
                multiple = false;
            }


            $.each(arr, function(i, v) {
                v.pos = i;
                if (multiple) {
                    //console.log(v[key]);
                    if (map[v[key]] == undefined) {
                        map[v[key]] = [];
                    }

                    map[v[key]].push(v);
                } else {
                    map[v[key]] = v;
                }
            });

            return map;

        },

        mapToArray: function(map) {
            var arr = []
            $.each(map, function(i, v) {
                v["id_x"] = i;
                arr.push(v);
            });
            return arr;
        },


        createSnippets: function(snipx, data, placeholder) {

            ////console.log(snip);
            var tsnip = "";
            if (data.length > 0) {
                $.each(data, function(i, v) {

                    var snip = snipx;
                    $.each(placeholder, function(x, y) {
                        //console.log(y[0], v[y[1]]);
                        
                        snip = snip.replace(y[0], v[y[1]]);

                    });

                    tsnip += snip;

                });
            }

            return tsnip;
        },

        updateView: function(data, placeholder) {
            //console.log(placeholder)




            $.each(placeholder, function(x, y) {
                //console.log("***************");
                //console.log($("[placekey='"+y[0]+"']"));
                //console.log(data[y[0]]);
                if (y[1] == "val") {

                    $($("[placekey='" + y[0] + "']")).html(data[y[0]]);
                } else if (y[1] == "class") {

                    $($("[placekey='" + y[0] + "']")).addClass(data[y[0]]);


                } else {

                    $($("[placekey='" + y[0] + "']")).attr(y[1], data[y[0]]);

                }



            });






            return true;
        },


        addCommas: function(amount) {
            var delimiter = ",";
            var a = amount;
            var i = parseInt(a);
            if (isNaN(i)) {
                return ""
            }
            var minus = "";
            if (i < 0) {
                minus = "-"
            }
            i = Math.abs(i);
            var n = new String(i);
            var a = [];
            while (n.length > 3) {
                var nn = n.substr(n.length - 3);
                a.unshift(nn);
                n = n.substr(0, n.length - 3)
            }
            if (n.length > 0) {
                a.unshift(n)
            }
            n = a.join(delimiter);
            amount = minus + n;
            return amount
        },

        changeUnits: function(num, k) {

            var len = (num + "").length;
            if (len > 3 && len <= 5) {
                if (num % 1000 == 0) {
                    num = parseFloat(num / 1000) ;
                } else {
                    num = parseFloat(num / 1000).toFixed(1);
                }
                  num = datahelper.addCommas(num) +  "K";

            } else if (len > 5) {

                if (k == undefined || !k) {

                    if (num % 100000 == 0) {
                        num = parseFloat(num / 100000) ;
                    } else {
                        num = parseFloat(num / 100000).toFixed(1) ;
                    }
                    num = datahelper.addCommas(num)+ "L";;

                } else {

                    if (num % 1000 == 0) {
                        num = parseFloat(num / 1000) ;
                    } else {
                        num = parseFloat(num / 1000).toFixed(1) ;
                    }
                    num = datahelper.addCommas(num) +  "K";

                }
            } else {
                num = datahelper.addCommas(num);
            }
            return num;

        }



    }

}();


function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

/*end of data helper*/

var dsorter = function() {
    return {
        key :  "t",
        key1 : "d",
        key2 : "a",
        desc : "desc",
        asc : "asc",
        type : "asc",
        sortstate : {},
        order : {
           
            // t : [403, 58, 5, 3, 50, 1, 399, 398, 400, 7, 8, 4, 32, 6, 62, 404, 402, 401],
            // s : [4, 2, 1, 3],
            // a : [],
            // p : [],
            // f : [],
            // d : [40, 42, 24, 14, 41, 20, 10, 32, 23, 30]
        },

        keymap: {
            
            t: "team_id",
            s: "skill_id",
            plname: "short_name",
            p: "price",
            pt:"points",
            tname:"team_shortname"
          
            
        },

        setOrder: function(order){
            dsorter.order = order;
        },
       
        toggleSorter : function(j, k, k1, k2){

            if(dsorter.order[k] == undefined){
                dsorter.order[k] = [];
            }
             if(dsorter.order[k1] == undefined){
                dsorter.order[k1] = [];
            }
             if(dsorter.order[k2] == undefined){
                dsorter.order[k2] = [];
            }

            if(dsorter.sortstate[k] == undefined){
                dsorter.sortstate[k] = false;
            }

            else{
                 dsorter.sortstate[k] = !dsorter.sortstate[k];
            }

           
            if(dsorter.sortstate[k]){

               return dsorter.sortAsc(j,k,k1,k2);
            }
            else{
                return dsorter.sortDsc(j,k,k1,k2);
            }

        },
        setKeys : function(typ, k, k1, k2) {
            dsorter.key = k;
            dsorter.key1 = k1;
            dsorter.key2 = k2;
            dsorter.type = typ
             if(dsorter.order[k] == undefined){
                dsorter.order[k] = [];
             }
             if(dsorter.order[k1] == undefined){
                dsorter.order[k1] = [];
             }
             if(dsorter.order[k2] == undefined){
                dsorter.order[k2] = [];
             }
        },
        getVal : function(k, v) {

             if(dsorter.order[k] == undefined){
                dsorter.order[k] = [];
            } 
            
            v = isNaN(parseInt(v)) ? v : parseInt(v);
            if (dsorter.order[k].length == 0) {
                return v
            } else {
                return $.inArray(v, dsorter.order[k])
            }
        },
        sortAsc : function(j, k, k1, k2, forgetkeys) {
            
            var prevkeys = {"key":dsorter.key,"key1":dsorter.key1,"key2":dsorter.key2,"type":dsorter.type};
            dsorter.setKeys(dsorter.asc, k, k1, k2);

            
                  
            res = $(j).sort(function(a, b) {
                var x = isNaN(parseFloat($(a).attr(dsorter.key))) ? $(a).attr(dsorter.key) : parseFloat($(a).attr(dsorter.key));
                var y = isNaN(parseFloat($(b).attr(dsorter.key))) ? $(b).attr(dsorter.key) : parseFloat($(b).attr(dsorter.key));
                if (dsorter.order[dsorter.key].length > 0) {
                    x = $.inArray(x, dsorter.order[dsorter.key]);
                    y = $.inArray(y, dsorter.order[dsorter.key])
                }
                if (x == y) {
                    if (dsorter.key1 == undefined) {
                        return 0
                    } else {
                        x = isNaN(parseFloat($(a).attr(dsorter.key1))) ? $(a).attr(dsorter.key1) : parseFloat($(a).attr(dsorter.key1));
                        y = isNaN(parseFloat($(b).attr(dsorter.key1))) ? $(b).attr(dsorter.key1) : parseFloat($(b).attr(dsorter.key1));
                        if (dsorter.order[dsorter.key1].length > 0) {
                            x = $.inArray(x, dsorter.order[dsorter.key1]);
                            y = $.inArray(y, dsorter.order[dsorter.key1])
                        }
                        if (x == y) {
                            if (dsorter.key2 == undefined) {
                                return 0
                            } else {
                                x = isNaN(parseFloat($(a).attr(dsorter.key2))) ? $(a).attr(dsorter.key2) : parseFloat($(a).attr(dsorter.key2));
                                y = isNaN(parseFloat($(b).attr(dsorter.key2))) ? $(b).attr(dsorter.key2) : parseFloat($(b).attr(dsorter.key2));
                                if (dsorter.order[dsorter.key2].length > 0) {
                                    x = $.inArray(x, dsorter.order[dsorter.key2]);
                                    y = $.inArray(y, dsorter.order[dsorter.key2])
                                }
                                if (x == y) {
                                    return 0
                                }
                                return x > y ? 1 : -1
                            }
                        }
                        return x > y ? 1 : -1
                    }
                }
                return x > y ? 1 : -1
            });
            if(forgetkeys){
                dsorter.key = prevkeys.key;
                dsorter.key1 = prevkeys.key1;
                dsorter.key2 = prevkeys.key2;
                dsorter.type = prevkeys.type;

            }
            return res
        },
        sortDsc : function(j, k, k1, k2) {
            dsorter.setKeys(dsorter.desc, k, k1, k2);
            res = $(j).sort(function(a, b) {
                var x = isNaN(parseFloat($(a).attr(dsorter.key))) ? $(a).attr(dsorter.key) : parseFloat($(a).attr(dsorter.key));
                var y = isNaN(parseFloat($(b).attr(dsorter.key))) ? $(b).attr(dsorter.key) : parseFloat($(b).attr(dsorter.key));
                if (dsorter.order[dsorter.key].length > 0) {
                    x = $.inArray(x, dsorter.order[dsorter.key]);
                    y = $.inArray(y, dsorter.order[dsorter.key])
                }
                if (x == y) {
                    if (dsorter.key1 == undefined) {
                        return 0
                    } else {
                        x = isNaN(parseFloat($(a).attr(dsorter.key1))) ? $(a).attr(dsorter.key1) : parseFloat($(a).attr(dsorter.key1));
                        y = isNaN(parseFloat($(b).attr(dsorter.key1))) ? $(b).attr(dsorter.key1) : parseFloat($(b).attr(dsorter.key1));
                        if (dsorter.order[dsorter.key1].length > 0) {
                            x = $.inArray(x, dsorter.order[dsorter.key1]);
                            y = $.inArray(y, dsorter.order[dsorter.key1])
                        }
                        if (x == y) {
                            if (dsorter.key2 == undefined) {
                                return 0
                            } else {
                                x = isNaN(parseFloat($(a).attr(dsorter.key2))) ? $(a).attr(dsorter.key2) : parseFloat($(a).attr(dsorter.key2));
                                y = isNaN(parseFloat($(b).attr(dsorter.key2))) ? $(b).attr(dsorter.key2) : parseFloat($(b).attr(dsorter.key2));
                                if (dsorter.order[dsorter.key2].length > 0) {
                                    x = $.inArray(x, dsorter.order[dsorter.key2]);
                                    y = $.inArray(y, dsorter.order[dsorter.key2])
                                }
                                if (x == y) {
                                    return 0
                                }
                                return x > y ? 1 : -1
                            }
                        }
                        return x > y ? 1 : -1
                    }
                }
                return x > y ? -1 : 1
            });
            return res
        }
    }
}();

/*End of sorts*/


/*get user agent*/
function getMobileOperatingSystem() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;
  if( userAgent.match( /iPad/i ) || userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i ) ){
    return 'iOS';
  }
  else if( userAgent.match( /Android/i ) ){
    return 'Android';
  }
  else{
    return 'unknown';
  }
}

