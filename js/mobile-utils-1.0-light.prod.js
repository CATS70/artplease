const $API_KEY = "";//to be blanked for the web site

var $ci = new Array();
var $ciheader = new Array();
var $ciul = new Array();
var $ciulli = new Array();
var $lievent = new Array();
var $lidivevent = new Array();

var $gafu = new Array();
var $gafucounter =0;
var $gafu2 = new Array();
var $gafucounter2 =0;

var $searchresult = new Array();
var $tableToSort = new Array();
var $tableAPList = new Array();
var $tableEventsList = new Array();
var $nextGPToken = "X";
var $id;
var $prepend;


var $step=0;

const $api="api.art-please.org";
const $apidev="api.frapi.artplease";
const $DEFAULTDESC = '<p>This gallery didn\'t subscribe to Art-Please service. Tell them about us and help us to enlarge our database</p>';

/*!
 * Collect click using GUA.
 *
 * dependancy: jQuery, Google Universal Analytics
 *
 * Date: 2013-10-17T14:32
 */
function trackclick($id,$metric,$dimension)
{
return true
}

/*!
 * return get variable
 *
 * dependancy: none
 *
 * Date: 2013-09-23T14:31
 */	 
function getUrlVars() {
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
		vars[key] = value;
	});
	return vars;
}



/*!
 * Update gallerydetail page with data from Art-PLease DB (failed callback function of UpdateArtPLaceDetailPage)
 *
 * dependancy: jQuery
 *
 * Date: 2013-10-17T14:32
 */
function defaultArtPlaceDetailPage()
{
	//Note : if gallery data dont exist in the Art-Please DB, an error is raised
	$("#artPlaceTel").html("&#9742; No tel. # avail.");
	$("#artPlaceUrl").html("&#9729; No url avail.");
	$('#ssidup').attr({"href":"javascript:alert('no slide show for this gallery!')"});
	$('#ssiddown').attr({"href":"javascript:alert('no slide show for this gallery!')"});
	$("#artPlaceName").html(sessionStorage.name);
	$("#descArtPlace").html($DEFAULTDESC);
	$("#imgGal1").attr({"src":"img/logoico.png"});
	$("#imgGal2").attr({"src":"img/logoico.png"});

	$.mobile.loading( "hide" );
}
/*!
 * Update gallerydetail page with data from Art-PLease DB (success callback function of UpdateArtPLaceDetailPage)
 *
 * dependancy: jQuery
 *
 * Date: 2013-10-17T14:32
 */
function updateArtPlaceDetails(data, status)
{
	//reinit fields
	$("#artPlaceTel").html("&#9742; No tel. # avail.");
	$("#artPlaceUrl").html("&#9729; No url avail.");
	
	if (sessionStorage.ap_type==1) //Artist => No Limit
	{
		if (data[0].ACT_TEL_NUMBER!='null')
			$("#artPlaceTel").html('&#9742; '+'<a href=tel:"'+data[0].ACT_TEL_NUMBER.replace(/\s+/g, '')+'" onclick="return trackclick(\''+sessionStorage.name+'-'+sessionStorage.id+'\',\'tel\',\'artist\');">'+data[0].ACT_TEL_NUMBER+'</a>');

		if (data[0].ACT_URL!='null')
			$("#artPlaceUrl").html('&#9729; '+'<a href="javascript:iabRef = window.open(\''+data[0].ACT_URL+'\',\'_blank\',\'location=yes\',\'toolbar=yes\',\'closebuttoncaption=Return\');" onclick="return trackclick(\''+sessionStorage.name+'-'+sessionStorage.id+'\',\'url\',\'artist\');">'+data[0].ACT_URL+'</a>');

		$('#ssidup').attr({"href":$prepend+"galeriesslideshow.html","onclick":'return trackclick(\''+sessionStorage.name+'-'+sessionStorage.id+'\',\'ss\',\'artist\');'});
		$('#ssiddown').attr({"href":$prepend+"galeriesslideshow.html","onclick":'return trackclick(\''+sessionStorage.name+'-'+sessionStorage.id+'\',\'ss\',\'artist\');'});

                
                

	}
	else
	{
	//check if errors then show nothing else show subscribed options.
		
		if (sessionStorage.currentSubscriptions.indexOf("errors")!=-1)
		{
			$('#ssidup').attr({"href":"javascript:alert('no slide show for this gallery!')"});
			$('#ssiddown').attr({"href":"javascript:alert('no slide show for this gallery!')"});
		}
		else
		{
			$currentSubscriptions = JSON.parse(sessionStorage.currentSubscriptions);

			var $taille = Object.keys($currentSubscriptions).length;

			$today = new Date();
			
			$('#ssidup').attr({"href":"javascript:alert('no slide show for this gallery!')"});
			$('#ssiddown').attr({"href":"javascript:alert('no slide show for this gallery!')"});				
			for (var $count=0; $count<$taille; $count++)
			  {
				$time = (new Date($currentSubscriptions[$count]["SUBSPRD_EXPDATE"].replace(/-/g, "/"))).getTime();
				$expDate = new Date($time);

				switch ($currentSubscriptions[$count]["PRD_ID"]) //Get Product ID
				{
					case "1":
						// TELVISIBLE OPTION
						if ($today<=$expDate)
						  $("#artPlaceTel").html('&#9742; '+'<a href=tel:"'+data[0].ACT_TEL_NUMBER.replace(/\s+/g, '')+'" onclick="return trackclick(\''+sessionStorage.name+'-'+sessionStorage.id+'\',\'tel\',\'gallery\');">'+data[0].ACT_TEL_NUMBER+'</a>');
						break;
						
					case "2":
						if ($today<=$expDate)
							$("#artPlaceUrl").html('&#9729; '+'<a href="javascript:iabRef = window.open(\''+data[0].ACT_URL+'\',\'_blank\',\'location=yes\',\'toolbar=yes\',\'closebuttoncaption=Return\');" onclick="return trackclick(\''+sessionStorage.name+'-'+sessionStorage.id+'\',\'url\',\'gallery\');">'+data[0].ACT_URL+'</a>'); 
						break;
						
					case "3":
						// ACTIVATE SLIDESHOW OPTION;
						if ($today<=$expDate)
						{
							$('#ssidup').attr({"href":$prepend+"galeriesslideshow.html","onclick":'return trackclick(\''+sessionStorage.name+'-'+sessionStorage.id+'\',\'ss\',\'gallery\');'});
							$('#ssiddown').attr({"href":$prepend+"galeriesslideshow.html","onclick":'return trackclick(\''+sessionStorage.name+'-'+sessionStorage.id+'\',\'ss\',\'gallery\');'});
						}
						break;
				}
			}
		}
	}
	$("#artPlaceName").html(sessionStorage.name);
	$("#descArtPlace").html(data[0].GAL_DESC);
	$("#imgGal1").attr({"src":"http://"+$api+"/artpleasenearby/getphoto.json?"+$id+"&photoid=1"});
	$("#imgGal2").attr({"src":"http://"+$api+"/artpleasenearby/getphoto.json?"+$id+"&photoid=2"});
	sessionStorage.GAL_SS_PHOTO1_COMMENT=data[0].GAL_SS_PHOTO1_COMMENT;
	sessionStorage.GAL_SS_PHOTO2_COMMENT=data[0].GAL_SS_PHOTO2_COMMENT;
	sessionStorage.GAL_SS_PHOTO3_COMMENT=data[0].GAL_SS_PHOTO3_COMMENT;
	sessionStorage.GAL_LAT=data[0].GAL_LAT;
	sessionStorage.GAL_LONG=data[0].GAL_LONG;
	
	$.mobile.loading( "hide" );
}


/*!
 * Get data in order to update gallerydetail page with data from Art-PLease DB
 *
 * dependancy: jQuery
 *
 * Date: 2013-10-17T14:32
 */
function updateArtPlaceDetailPage()
{


	if (sessionStorage.ap_type==1) //Artist => No Limit
	{
		$.ajax({
			type: "GET",
			url: "http://"+$api+"/artpleasenearby/mgetgallerydata.json?"+$id,
			cache: false,
			async: false,
			success : updateArtPlaceDetails
		});	
	}
	else //Gallery => Check subscriptions and show
	{
		$.ajax({
			type: "GET",
			url: "http://"+$api+"/artpleasenearby/mgetsubscriptions.json?"+$id,
			cache: false,
			async: false,
			success : function(datasubs){
				sessionStorage.currentSubscriptions = JSON.stringify(datasubs);
				$.ajax({
					type: "GET",
					url: "http://"+$api+"/artpleasenearby/mgetgallerydata.json?"+$id,
					cache: false,
					async: false,
					success : updateArtPlaceDetails,
					error : defaultArtPlaceDetailPage
				});
			},
			error : function(xhr){
				sessionStorage.currentSubscriptions = JSON.stringify(JSON.parse(xhr.responseText));
				$.ajax({
					type: "GET",
					url: "http://"+$api+"/artpleasenearby/mgetgallerydata.json?"+$id,
					cache: false,
					async: false,
					success : updateArtPlaceDetails,
					error : defaultArtPlaceDetailPage
				});						
			}					
		});					
	}
}

$(document).on("mobileinit", function(){

	$( document ).on( "pageinit", function( event, ui ) {
		sessionStorage.currentPage=event.target.id;
		if (sessionStorage.currentPage=="PageSettings")
		{
			
		}
	
	});

	$(document).on("pagecontainertransition", function (e, ui) {
		//Note : Because I get the current page id using this event. You must use transition in ALL pages call in order to be
		//sure to record the page id
		sessionStorage.currentPage=ui.toPage[0].id;
	});

	$(document).on( "pageshow", function( event, ui ) {
		if (sessionStorage.currentPage=="artPlaceSlideshow" || sessionStorage.currentPage=="martPlaceSlideshow" )
		{
			//sessionStorage.currentPage=event.target.id;
			$("#ssimg1").attr({"data-src":"http://"+$api+"/artpleasenearby/getphoto.json?"+$id+"&photoid=3"});
			$("#ssimg2").attr({"data-src":"http://"+$api+"/artpleasenearby/getphoto.json?"+$id+"&photoid=4"});	
			$("#ssimg3").attr({"data-src":"http://"+$api+"/artpleasenearby/getphoto.json?"+$id+"&photoid=5"});	
			
			if (sessionStorage.GAL_SS_PHOTO1_COMMENT!='null')
				$("#commentimg1").html(sessionStorage.GAL_SS_PHOTO1_COMMENT);

			if (sessionStorage.GAL_SS_PHOTO2_COMMENT!='null')
				$("#commentimg2").html(sessionStorage.GAL_SS_PHOTO2_COMMENT);	
				
			if (sessionStorage.GAL_SS_PHOTO3_COMMENT!='null')
				$("#commentimg3").html(sessionStorage.GAL_SS_PHOTO3_COMMENT);
			
			// camera js and its dependencies have to be loaded in every pages. If you don't do that you could have a $(..).camera is
			//not a function due to a weird $ removal from the DOM
			 $('#camera_wrap_1').camera({
				height: '35%',
				thumbnails: false,
				loader: 'none',
				portrait: true
				
			});
		}

		/*
		*
		*
		*Only for website usage
		*
		*/
		if (sessionStorage.currentPage=="martPlaceDetails")
		{
			sessionStorage.id = getUrlVars()["id"];
			sessionStorage.name = decodeURI(getUrlVars()["galname"]);
			console.log($id);
			$id = "galid="+sessionStorage.id;
			$prepend = "m";
			updateArtPlaceDetailPage();
		
		}		
		//********************************************************************

	});
});
