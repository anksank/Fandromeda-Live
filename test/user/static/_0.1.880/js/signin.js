var app = app || angular.module("FandromedaV2", []);
angular.module("FandromedaV2").requires.push("ngFacebook");
angular.module("FandromedaV2").requires.push("ngMessages");
angular.module("FandromedaV2").requires.push("ngCookies");
app.config(function($facebookProvider) {
    $facebookProvider.setAppId(fbappid || "971012136327031");
    $facebookProvider.setPermissions("email");
    $facebookProvider.setVersion("v2.9")
});
app.directive("customOtpValidator", function() {
    var NUMBER_REGEXP = /^([0-9]\d{5})$/;
    return {
        require: "?ngModel",
        link: function(scope, elm, attrs, ctrl) {
            if (ctrl) {
                ctrl.$validators.otp = function(modelValue) {
                    return ctrl.$isEmpty(modelValue) || NUMBER_REGEXP.test(modelValue)
                }
            }
        }
    }
});
app.run(function($rootScope) {
    (function() {
        if (document.getElementById("facebook-jssdk")) {
            return
        }
        var firstScriptElement = document.getElementsByTagName("script")[0];
        var facebookJS = document.createElement("script");
        facebookJS.id = "facebook-jssdk";
        facebookJS.src = "//connect.facebook.net/en_US/all.js";
        firstScriptElement.parentNode.insertBefore(facebookJS, firstScriptElement)
    }())
});
app.controller("SignIn", function($scope, $rootScope, asynNetworkService, dataHelper, $facebook, $cookies, $timeout, monitor) {
    $scope.league_id = getParameterByName("league_id");
    $scope.league_name = getParameterByName("league_name");
    $scope.color = getParameterByName("color");
    $scope.hash_color = "#" + $scope.color;
    $scope.joinLeagueCode = getParameterByName("code");
    $scope.proceed = getParameterByName("proceed");
    $scope.org_id = getParameterByName("org_id");
    $scope.tournament_id = getParameterByName("tournament_id");
    $scope.sponsor_id = getParameterByName("sponsor_id");
    $scope.otp = false;
    $scope.user = {};
    $rootScope.divShowReg2 = function(x) {
        if (x == 1) {
            $scope.getstarteddiv = 1
        } else {
            angular.element('input[type="radio"]#tab-1')[0].click();
            $scope.getstarteddiv = 0
        }
    }
    ;
    tracking_var = {
        utm_source: getParameterByName("utm_source") || "",
        utm_medium: getParameterByName("utm_medium") || "",
        utm_campaign: getParameterByName("utm_campaign") || ""
    };
    $rootScope.share_data = function() {
        $scope.user.username = $rootScope.shared_data
    }
    ;
    $scope.next = getParameterByName("_next");
    if ($scope.next) {
        var found = $scope.next.search("/v2/inst_gang/verify_email/");
        if (found == 0) {
            key = $scope.next.slice(27);
            var urls = [{
                key: "orgID",
                url: "/v2/inst_gang/orgid_code_mapping?key=" + key
            }];
            asynNetworkService.get(urls).then(function(results) {
                var result = {};
                result.org_id = angular.merge({}, results.orgID.data);
                $scope = angular.extend($scope, result);
                org_id = $scope.org_id.org_id;
                var urls = [{
                    key: "instColor",
                    url: "/v2/inst_gang/inst_color?org_id=" + org_id
                }];
                asynNetworkService.get(urls).then(function(results) {
                    var result = {};
                    result.hash_color = angular.merge({}, results.instColor.data);
                    result.hash_color = result.hash_color.color1;
                    $scope = angular.extend($scope, result)
                }, function(error) {})
            }, function(error) {})
        }
    }
    $rootScope.$on("loading:progress", function() {
        $scope.http_error = false;
        $scope.isLoading = true
    });
    $rootScope.$on("loading:finish", function() {
        $scope.isLoading = false
    });
    $rootScope.$on("loading:error", function() {
        $scope.http_error = true
    });
    $scope.login = {};
    $scope.otp_sent = 0;
    $scope.change_tab_from_login = function(x) {
        $rootScope.share_data_reg($scope.user.username);
        if (x == 1) {
            $scope.divShowReg1 = 1;
            $rootScope.divShowReg3(1)
        } else {
            $scope.divShowReg1 = 0;
            $rootScope.divShowReg3(0)
        }
    }
    ;
    $scope.change_tab_from_login_without_error = function(x) {
        $scope.change();
        $scope.changeLoginMain();
        if (x == 1) {
            $scope.divShowReg1 = 1
        } else {
            $scope.divShowReg1 = 0
        }
    }
    ;
    $scope.change = function() {
        $scope.login = {}
    }
    ;
    $scope.changeLoginMain = function() {
        $scope.user = {}
    }
    ;
    $scope.changePhoneLogin = function() {
        $scope.login.phone_exists = false
    }
    ;
    $scope.req_otp = function() {
        if (!$scope.number_in_username($scope.user.username)) {
            return 0
        }
        postdata = {
            number: $scope.user.username,
            c_code: "1"
        };
        monitor.track("2");
        asynNetworkService.post("/user/logreg/login_phone", postdata).then(function(result) {
            $scope.http_error = false;
            $scope.postRequestOTP(result)
        }, function(error) {
            $scope.http_error = true
        })
    }
    ;
    $scope.postRequestOTP = function(result) {
        loaderOverlayObj.hide();
        if (result.status == 1) {
            $scope.otp_sent = 1;
            $scope.otp = true
        } else {
            if (result.state == 1) {
                $scope.login = {};
                $scope.login.status = -1;
                $scope.login.message = result.message;
                $scope.login.phone_exists = true
            }
            if (result.state == 2) {
                $scope.login = {};
                $scope.login.status = -1;
                $scope.login.message = result.message
            }
        }
    }
    ;
    window.debug_sign = $scope;
    window.debug_root = $rootScope;
    $scope.ck = $cookies;
    $scope.inst_gang_proceed = function() {
        var urls = [{
            key: "league_id",
            url: "/v2/inst_gang/leagueid_from_orgid_and_member?org_id=" + $scope.org_id
        }];
        asynNetworkService.get(urls).then(function(results) {
            if (results.league_id["status"] == true) {
                $scope.inst_league_id = results.league_id["data"]["gang_id"];
                window.location.href = "/v2/user_leagues/mygang/" + $scope.inst_league_id
            } else {
                window.location.href = "/user/default/institutional_verify.html?proceed=2&org_id=" + $scope.org_id + "&color=" + $scope.color + "&new=0"
            }
        }, function(error) {})
    }
    ;
    $scope.sponsor_gang_proceed = function() {
        var urls = [{
            key: "leagueID",
            url: "/v2/sponsor_gang/leagueid_from_sponsorid?sponsor_id=" + $scope.sponsor_id
        }];
        asynNetworkService.get(urls).then(function(results) {
            $scope.sponsor_league_id = results.leagueID["data"]["gang_id"];
            window.location.href = "/v2/user_leagues/mygang/" + $scope.sponsor_league_id + "?auto_add=1"
        }, function(error) {})
    }
    ;
    $scope.postInit = function(result) {
        console.log(result);
        $scope.login = angular.extend($scope.login, result);
        loaderOverlayObj.hide();
        if ($cookies.get("r_cookie")) {
            cookie_val = JSON.parse($cookies.get("r_cookie"));
            $cookies.remove("r_cookie", {
                path: "/"
            })
        }
        if ($scope.login.status == 1) {
            if ($scope.proceed == 1) {
                window.location.href = "/v2/user_leagues/mygang/" + $scope.league_id + "?auto_add=1&code=" + $scope.joinLeagueCode
            } else {
                if ($scope.proceed == 2) {
                    $scope.inst_gang_proceed()
                } else {
                    if ($scope.proceed == 3) {
                        window.location.href = cookie_val.url
                    } else {
                        if ($scope.proceed == 4) {
                            window.location.href = "/v2/champ_gang/post_login_decider/" + $scope.tournament_id + "/" + $scope.league_id + "/" + $scope.joinLeagueCode
                        } else {
                            if ($scope.proceed == 5) {
                                $scope.sponsor_gang_proceed()
                            } else {
                                if (default_redirect && (dataHelper.getParameterByName("_next") == null)) {
                                    window.location.href = default_redirect
                                } else {
                                    window.location.href = ($scope.login.next && $scope.login.next != "") ? $scope.login.next : (dataHelper.getParameterByName("_next")) ? dataHelper.getParameterByName("_next") : "https://fandromeda.com/v2/champ/classic_squad?tournament_id=324&edit_squad_page=0&user=338320"
                                    // window.location.href = ($scope.login.next && $scope.login.next != "") ? $scope.login.next : (dataHelper.getParameterByName("_next")) ? dataHelper.getParameterByName("_next") : "./../index.html"                                    
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    ;
    $scope.number_in_username = function(username) {
        return username != undefined && username.length == 10 && !isNaN(Number(username))
    }
    ;
    $scope.postInitFB = function(result) {
        $scope.login = angular.extend($scope.login, result);
        if ($cookies.get("r_cookie")) {
            cookie_val = JSON.parse($cookies.get("r_cookie"));
            $cookies.remove("r_cookie", {
                path: "/"
            })
        }
        if ($scope.login.status == 1) {
            if ($scope.proceed == 1) {
                if (result.confirmed == 0) {
                    window.location.href = "/user/default/fb_register?proceed=" + $scope.proceed + "&code=" + $scope.joinLeagueCode + "&league_id=" + $scope.league_id + "&league_name=" + $scope.league_name + "&color=" + $scope.color
                } else {
                    window.location.href = "/v2/user_leagues/mygang/" + $scope.league_id + "?auto_add=1&code=" + $scope.joinLeagueCode
                }
            } else {
                if ($scope.proceed == 2) {
                    if (result.confirmed == 0) {
                        window.location.href = "/user/default/fb_register?proceed=" + $scope.proceed + "&org_id=" + $scope.org_id + "&color=" + $scope.color
                    } else {
                        $scope.inst_gang_proceed()
                    }
                } else {
                    if ($scope.proceed == 3) {
                        if (result.confirmed == 0) {
                            window.location.href = "/user/default/fb_register?proceed=" + $scope.proceed + "&org_id=" + $scope.org_id + "&color=" + $scope.color
                        } else {
                            window.location.href = cookie_val.url
                        }
                    } else {
                        if ($scope.proceed == 4) {
                            if (result.confirmed == 0) {
                                window.location.href = "/user/default/fb_register?proceed=" + $scope.proceed + "&code=" + $scope.joinLeagueCode + "&league_id=" + $scope.league_id + "&tournament_id=" + $scope.tournament_id + "&color=" + $scope.color
                            } else {
                                window.location.href = "/v2/champ_gang/post_login_decider/" + $scope.tournament_id + "/" + $scope.league_id + "/" + $scope.joinLeagueCode
                            }
                        } else {
                            if ($scope.proceed == 5) {
                                if (result.confirmed == 0) {
                                    window.location.href = "/user/default/fb_register?proceed=" + $scope.proceed + "&sponsor_id=" + $scope.sponsor_id + "&color=" + $scope.color
                                } else {
                                    $scope.sponsor_gang_proceed()
                                }
                            } else {
                                if (default_redirect && (dataHelper.getParameterByName("_next") == null)) {
                                    window.location.href = default_redirect
                                } else {
                                    window.location.href = ($scope.login.redirect && $scope.login.redirect != "") ? $scope.login.redirect : (dataHelper.getParameterByName("_next")) ? dataHelper.getParameterByName("_next") : "/v2/event"
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    ;
    $scope.postInitOtp = function(result) {
        $scope.login = angular.extend($scope.login, result);
        loaderOverlayObj.hide();
        if (result.status == 0 && (result.state == 2)) {
            $scope.err_otp = true;
            $scope.err_otp_msg = "Incorrect OTP."
        }
        if (result.status == 0 && (result.state == 7)) {
            console.log("render OTP");
            $scope.err_otp = true;
            $scope.err_otp_msg = "Incorrect OTP.";
            $scope.renderOTPCaptcha()
        }
        if ($scope.login.status == 1) {
            if ($cookies.get("r_cookie")) {
                cookie_val = JSON.parse($cookies.get("r_cookie"));
                $cookies.remove("r_cookie", {
                    path: "/"
                })
            }
            if ($scope.proceed == 1) {
                window.location.href = "/v2/user_leagues/mygang/" + $scope.league_id + "?auto_add=1&code=" + $scope.joinLeagueCode
            } else {
                if ($scope.proceed == 2) {
                    $scope.inst_gang_proceed()
                } else {
                    if ($scope.proceed == 3) {
                        window.location.href = cookie_val.url
                    } else {
                        if ($scope.proceed == 4) {
                            window.location.href = "/v2/champ_gang/post_login_decider/" + $scope.tournament_id + "/" + $scope.league_id + "/" + $scope.joinLeagueCode
                        } else {
                            if ($scope.proceed == 5) {
                                $scope.sponsor_gang_proceed()
                            } else {
                                if (default_redirect && (dataHelper.getParameterByName("_next") == null)) {
                                    window.location.href = default_redirect
                                } else {
                                    window.location.href = ($scope.login.next && $scope.login.next != "") ? $scope.login.next : (dataHelper.getParameterByName("_next")) ? dataHelper.getParameterByName("_next") : "/v2/event"
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    ;
    $scope.renderOTPCaptcha = function() {
        console.log("Rendering Captcha");
        if (captchaNeeded) {
            grecaptcha.reset()
        } else {
            captchaNeeded = 1;
            grecaptcha.render("otpReqLogin", {
                sitekey: "6LfrAxcTAAAAAJT2icHoHc0IJgwhyj8SKeN954ok",
                callback: verifyCallback,
                theme: "light",
                size: captaSize
            })
        }
    }
    ;
    $scope.signInWithOTP = function(isValid) {
        if (isValid) {
            $scope.login = {};
            loaderOverlayObj.show();
            captcha = "";
            if (captchaNeeded == 1) {
                captcha = grecaptcha.getResponse();
                if (captcha == "") {
                    return
                }
            }
            postdata = {
                number: $scope.user.username,
                otp: $scope.user.otp,
                c_code: "1",
                captcha: captcha
            };
            monitor.track("2");
            asynNetworkService.post("/user/logreg/login_with_otp", postdata).then(function(result) {
                $scope.http_error = false;
                $scope.postInitOtp(result)
            }, function(error) {
                $scope.http_error = true;
                $scope.postInitOtp(result)
            })
        } else {
            console.log("OTP is wrong?")
        }
    }
    ;
    $scope.change_error_msg_login = function() {
        $scope.user.otp = "";
        $scope.login.status = 1;
        console.log("==" + $scope.login.status);
        console.log("==" + $scope.otpForm.otp.$touched);
        $scope.otpForm.otp.$touched = "";
        $scope.changeOTP()
    }
    ;
    $scope.changeOTP = function() {
        console.log("Change was called");
        $scope.err_otp = false;
        $scope.err_otp_msg = ""
    }
    ;
    $scope.checkOutSideClick = function() {
        console.log("Change was called")
    }
    ;
    $scope.signInForm = function(isValid) {
        console.log(isValid);
        if (isValid) {
            $scope.login = {};
            loaderOverlayObj.show();
            monitor.track("2");
            asynNetworkService.post("https://fandromeda.com/user/logreg/login", $scope.user).then(function(result) {
                $scope.http_error = false;
                $scope.postInit(result)
            }, function(error) {
                result = {status: 1, message: "", shard_key: 37493, next: ""};
                $scope.http_error = false;
                $scope.postInit(result)
            })
        } else {
            $scope.login = {};
            $scope.login.status = -1;
            $scope.login.message = "Invalid Sign In details."
        }
    }
    ;
    $scope.genRegLink = function() {
        if ($scope.proceed == 1 && $scope.league_id != null) {
            window.location.href = "/user/default/register?proceed=1&code=" + $scope.joinLeagueCode + "&league_id=" + $scope.league_id + "&color=" + $scope.color
        } else {
            if ($scope.proceed == 2) {
                window.location.href = "/user/default/register?proceed=2&org_id=" + $scope.org_id + "&color=" + $scope.color
            } else {
                if ($scope.proceed == 3) {
                    window.location.href = "/user/default/register?proceed=3&color=" + $scope.color
                } else {
                    if ($scope.proceed == 4) {
                        window.location.href = "/user/default/register?proceed=4&code=" + $scope.joinLeagueCode + "&league_id=" + $scope.league_id + "&tournament_id=" + $scope.tournament_id + "&color=" + $scope.color
                    } else {
                        if ($scope.proceed == 5) {
                            window.location.href = "/user/default/register?proceed=5&sponsor_id=" + $scope.sponsor_id + "&color=" + $scope.color
                        } else {
                            window.location.href = "/user/default/register"
                        }
                    }
                }
            }
        }
    }
    ;
    $scope.attempts = 0;
    $scope.signInFB = function() {
        $scope.login = {};
        $facebook.login().then(function(result) {
            $scope.http_error = false;
            if (result.status === "connected") {
                var token = result.authResponse.accessToken;
                var uid = result.authResponse.userID;
                var secret = result.authResponse.signedRequest;
                var data = {
                    secret: secret,
                    token: token,
                    uid: uid
                };
                monitor.track("2");
                asynNetworkService.post("https://fandromeda.com/user/logreg/fbuser", data).then(function(result) {
                    $scope.postInitFB(result)
                }, function(error) {
                    console.log("Inner most");
                    console.log(error);
                    $scope.login.status = -1;
                    $scope.login.message = "Facebook login failed. Please try again.";
                    $scope.postInitFB(result)
                })
            } else {
                if (result.status === "unknown" && $scope.attempts <= 3) {
                    $scope.attempts++;
                    $scope.signInFB()
                } else {
                    console.log(result);
                    $scope.login.status = -100;
                    $scope.login.message = "Facebook login failed. Please try again.";
                    console.error("Facebook login failed")
                }
            }
        }, function(error) {
            console.warn(error);
            $scope.postInitFB(error)
        })
    }
});
var captchaNeeded = 0;
function verifyCallback() {
    console.log("callback")
}
app.directive("formOnChange", function($parse) {
    return {
        require: "form",
        link: function(scope, element, attrs) {
            var cb = $parse(attrs.formOnChange);
            element.on("change", function() {
                cb(scope)
            }).bind("keydown keypress", function(event) {
                cb(scope)
            })
        }
    }
});
