var app = app || angular.module("FandromedaV2", []);

angular.module('FandromedaV2').requires.push('ngCookies');


app.service(
	"monitor",function($cookies, asynNetworkService, dataHelper) {
		return ({
            track: track
        });
		

		function track(val,extra_data){
			page_val=val;
			cookie_val = $cookies.get("t_id");

			if (!cookie_val || !val){
				return 0;
			}


			if (extra_data){
				if(!extra_data["utm_source"]){
					extra_data={};
				}
			}else{
				extra_data={};
			}

			postdata_analytics={"cookie":cookie_val,"data":page_val,"extra_data":extra_data}
			console.log(postdata_analytics);

			asynNetworkService.post('/v2/default/analytics',postdata_analytics).then(function(result){
				console.log(result);
			},function(error){
				console.error("error while fetching data");}
			);
		}
	}

);

app.service(
	"ga_analytics",function(){

		return ({
            track: track
        });
		
		function track(val){
			try {
 			   	val=parseInt(val);
 			   		}
			catch(err) {
					val=0;
				}

			str_val=""
			switch(val){
				case 1:
					str_val="Registration_LandingPage";
					break;

				case 6:
					str_val="Registration_TNPL_subdomain";
					break;

				case 7:
					str_val="Registration_TNPL" ;
					break;
			}
			if (str_val){
				ga('send', 'event', {eventCategory: 'Registration',eventAction: 'Register',eventLabel: str_val,transport: 'beacon'});
			}
		}
	});