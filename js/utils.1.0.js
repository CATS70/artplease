

/*!
 * Global var
 *
 * dependancy: None
 *
 * Date: 2013-07-02T06:45
 */
 
 // Labels for Your Services Section Page myWorkspace
 var $TELVISIBLELABEL = "Make my telephone # visible (0.95 € p. month) - exp. date : ";
 var $URLVISIBLELABEL = "Make my web site adress visible (0.95 € p. month) - exp. date : ";
 var $ACTIVATESLIDESHOWLABEL = "Activate slideshow (2.95 € p. month) - exp. date : ";
 var $TELVISIBLELABELARTIST = "Make my telephone # visible (free instead of 0.95 € p. month) - exp. date : lifetime";
 var $URLVISIBLELABELARTIST = "Make my web site adress visible (free instead of 0.95 € p. month) - exp. date : lifetime";
 var $ACTIVATESLIDESHOWLABELARTIST = "Activate slideshow (free instead of 2.95 € p. month) - exp. date : lifetime";
 var $TOTALCURRENTSUBSCRIPTIONS = "Total current subscriptions : ";
 var $TOTALNEWSUBSCRIPTIONS = "Total new subscriptions : ";
 var $GAL_PHOTO1 = "gal_photo1";
 var $GAL_PHOTO2 = "gal_photo2";
 var $SS_PHOTO1 = "ssw_photo1";
 var $SS_PHOTO2 = "ssw_photo2";
 var $SS_PHOTO3 = "ssw_photo3";
 var $MAX_RAW_DESC_LENGTH = 4000;
 var $MAX_HTML_DESC_LENGTH = 8000;
 var $optionsCart = new Array();
 var $pp_div="";
 var $pp_pd = ""; //paypal payment data
 var $payment_msg = "";
 var $tableEvents = new Array();
 var $lievent = new Array();
 var $lidivevent = new Array();
 
 //prd_id, prd_label, cost, expDate, active, oldExpDate, subs_id, subsprd_id The last 3 are specific for renewal
 //modify initOptionCart if changes are applied to array
 $optionsCart[0] = new Array(1,"TELVISIBLE",new Number(11.40),"",false,"",0,0,"Make phone number visible"); //TELVISIBLE OPTION
 $optionsCart[1] = new Array(2,"URLVISIBLE",new Number(11.40),"",false,"",0,0,"Make website url visible"); //URLVISIBLE OPTION
 $optionsCart[2] = new Array(3,"ACTIVATESLIDESHOW",new Number(35.40),"",false,"",0,0,"Activate slide show"); //ACTIVATESLIDESHOW OPTION
 $optionsCart[3] = new Number(0.00); //Total of the cart
 $optionsCart[4] = ""; //login
 
 //Miscellaneous
 var $expTime = 3; //number of months before expiration alert be raised
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

 function initOptionCart()
 {
	 
	 //prd_id, prd_label, cost, expDate, active, oldExpDate, subs_id, subsprd_id The last 3 are specific for renewal
	 $optionsCart[0] = new Array(1,"TELVISIBLE",new Number(11.40),"",false,"",0,0,"Make phone number visible"); //TELVISIBLE OPTION
	 $optionsCart[1] = new Array(2,"URLVISIBLE",new Number(11.40),"",false,"",0,0,"Make website url visible"); //URLVISIBLE OPTION
	 $optionsCart[2] = new Array(3,"ACTIVATESLIDESHOW",new Number(35.40),"",false,"",0,0,"Activate slide show"); //ACTIVATESLIDESHOW OPTION
	 $optionsCart[3] = new Number(0.00); //Total of the cart
	 $optionsCart[4] = ""; //login
 }
 
 
/*!
 * Show or hide Sign in / Sign out link depending sessionStorage login value
 *
 * dependancy: jQuery
 *
 * Date: 2013-06-15T17:26
 */

 function showHideSignInOutButton()
 {
	if (sessionStorage.login ==null || sessionStorage.login =="")
	{
		$('a[title^="a-signout"]').hide();			
		$('a[title^="a-signin"]').css('visibility','visible');
		$('a[title^="a-signin"]').css('display','block');
	}
	else
	{
		$('a[title^="a-signin"]').hide();			
		$('a[title^="a-signout"]').css('visibility','visible');
		$('a[title^="a-signout"]').css('display','block');
	}	
}
/*!
 * Delete sessionStorage values on disconnect
 *
 * dependancy: jQuery
 *
 * Date: 2013-06-15T17:26
 */
function disconnectpage()
{
	
	sessionStorage.login = "";
	sessionStorage.currentSubscriptions ="";
	sessionStorage.fname = "";
	sessionStorage.lname ="";
	sessionStorage.email ="";
	sessionStorage.userType ="";
	sessionStorage.hashcode ="";
	sessionStorage.paymentMsg="";
	sessionStorage.galid="";
	sessionStorage.galname="";
	sessionStorage.disableAccountCreation=false;

	$optionsCart[0] = new Array(1,"TELVISIBLE",new Number(11.40),"",false,"",0,0); //TELVISIBLE OPTION
	$optionsCart[1] = new Array(2,"URLVISIBLE",new Number(11.40),"",false,"",0,0); //URLVISIBLE OPTION
	$optionsCart[2] = new Array(3,"ACTIVATESLIDESHOW",new Number(35.40),"",false,"",0,0); //ACTIVATESLIDESHOW OPTION
	$optionsCart[3] = new Number(0.00);
	
	showHideSignInOutButton();
} 
 /*!
 * Go to connection page if user is not authenticated
 *
 * dependancy: jQuery
 *
 * Date: 2013-06-15T17:26
 */
 function testSessionAndChangePage()
 {

 		if (sessionStorage.login ==null || sessionStorage.login =="")
		{
			$.mobile.changePage("/connexion.html",{changeHash:false,reloadPage:true});
		}
 }
 
 /*!
 * Validation authentication form and call ws
 *
 * dependancy: jQuery
 *
 * Date: 2013-06-15T17:26
 */
 function initLoginFormSubmitButon()
 {
	$('#connexionform').on('submit', function (e) {
		
				//reinit fields colors
				$("#password-form-lab").css('color','#000000');
				$("#login-form-lab").css('color','#000000');
				
				$.mobile.showPageLoadingMsg();
				
				$flagrequired = 0;

				if ($("#connexion-login-input").val() ==null || $("#connexion-login-input").val() =="")
				{
					$flagrequired = $flagrequired+1;
				}
				if ($("#connexion-password-input").val() ==null || $("#connexion-password-input").val() =="")
				{
					$flagrequired = $flagrequired+2;
				}

				switch($flagrequired)
				 {
				 case 1:
					$("#error-lab").text("Login must be filled out");			
					$("#error-lab").css('visibility','visible');
					$("#login-form-lab").css('color','#FF0000');
					$.mobile.hidePageLoadingMsg();
					return false;
					break;
				case 2:
					$("#error-lab").text("Password must be filled out");			
					$("#error-lab").css('visibility','visible');
					$("#password-form-lab").css('color','#FF0000');
					$.mobile.hidePageLoadingMsg();
					return false;
					break;

				case 3:
					$("#error-lab").text("Login and password must be filled out");			
					$("#error-lab").css('visibility','visible');
					$("#password-form-lab").css('color','#FF0000');
					$("#login-form-lab").css('color','#FF0000');
					$.mobile.hidePageLoadingMsg();
					return false;
					break;
				default:
					$("#error-lab").text("error message area");
					$("#password-form-lab").css('color','#000000');
					$("#error-lab").css('visibility','hidden');
				  }
				
				
				var formData = $("#connexionform").serialize();

				$.ajax({
					type: "POST",
					url: "phpfiles/authentication.php",
					cache: false,
					data: formData,
					success: onSuccess,
					error: onError
				});
						return false;			
			});
}
 
 /*!
 * Callback function on authentication sucess
 *
 * dependancy: jQuery
 *
 * Date: 2013-06-15T17:26
 */
function onSuccess(data, status)
{

	data = $.trim(data);
	jQuery.mobile.hidePageLoadingMsg();

	$response = JSON.parse(data);
	sessionStorage.login = $response.login;
	sessionStorage.userType = $response.userType;
	sessionStorage.ap_type = $response.userType; //For mgallerydetail.php
	sessionStorage.fname = $response.fname;
	sessionStorage.lname = $response.lname;
	sessionStorage.email = $response.email;

	//$taille = Object.keys($response).length;

	delete $response["login"];
	delete $response["password"];

	$.ajax({
		type: "GET",
		url: "phpfiles/getusersubscriptions.php",
		cache: false,
		success: function(data){
			sessionStorage.currentSubscriptions = data;
		},
		error: function(xhr){
			sessionStorage.currentSubscriptions = JSON.stringify(JSON.parse(xhr.responseText));
		}	});
	
	//sessionStorage.currentSubscriptions = JSON.stringify($response);
	
	if (sessionStorage.userType=="2")
		$("#success-lab").html('Welcome back '+sessionStorage.login+' ! click <a href="/myworkspace.html" data-dom-cache="false" data-ajax="false">here</a> to access your workspace <br><br><u><b>Important Notice:</b></u><br><ol style="list-style-type:decimal;">   <li>1 - Subscribe to desired Art-please services</li>   <li>2 - Ensure to enter correctly your latitude, longitude and google id (go to "Your Gallery data" section in my "My workspace" tab)</li>   <li>3 - Complete all required data to be displayed on the smartphone application</li>   <li>4 - Click on <img src="img/help/infoicon.png"> to access online help, or <img src="img/help/gearicon.png"> to view online help videos</li></ol> 	');
	else
		$("#success-lab").html('Welcome back '+sessionStorage.login+' ! click <a href="/myworkspace.html" data-dom-cache="false" data-ajax="false">here</a> to access your workspace <br><br><u><b>Important Notice:</b></u><br><ol style="list-style-type:decimal;">   <li>1 - Ensure to enter correctly your latitude, longitude and google id (go to "Your workshop data" section in my "My workspace" tab)</li>   <li>2 - Complete all required data to be displayed on the smartphone application</li>   <li>3 - Click on <img src="img/help/infoicon.png"> to access online help, or <img src="img/help/gearicon.png"> to view online help videos</li></ol> 	');
		
	$("#connexionform").hide();
	$("#error-lab").hide();
	$("#required-lab").hide();
	$("#success-lab").css('visibility','visible');
	sessionStorage.disableAccountCreation=true;
	
	showHideSignInOutButton();
	
}

 /*!
 * Callback function on authentication error
 *
 * dependancy: jQuery
 *
 * Date: 2013-06-15T17:26
 */
function onError(xhr, status, error)
{
	// handle an error
	$.mobile.loading( "hide" );
	//console.dir(xhr.responseText);	
	$response = JSON.parse(xhr.responseText);

	if ($response.errors[0].message==null)
	{
		$("#error-lab").text("Unexpected error ("+"error name: "+$response.errors[0].name+"  - error message: "+$response.errors[0].message+" - at :"+$response.errors[0].at +")");
	}
	else
	{
		$("#error-lab").text($response.errors[0].message);
	}
	$("#error-lab").css('visibility','visible');

}     
 /*!
 * Callback function on account creation success
 *
 * dependancy: jQuery
 *
 * Date: 2013-06-15T17:26
 */
function createAccountOnSuccess(data, status)
{
	data = jQuery.trim(data);
	$.mobile.loading( "hide" );

	sessionStorage.login = $('#logininput').val();
	sessionStorage.userType = $('#selectnativeAreU').val();
	
	$.ajax({
		type: "GET",
		url: "phpfiles/getusersubscriptions.php",
		cache: false,
		async: false,
		success: function(data){
			sessionStorage.currentSubscriptions = data;
		},
		error: function(xhr){
			sessionStorage.currentSubscriptions = JSON.stringify(JSON.parse(xhr.responseText));
		}	});	

	//alert('account created successfully! ');
	
	showHideSignInOutButton();
	
	//$.mobile.changePage("/myworkspace.html",{reloadPage:true,});
	//$("#create-success-lab").html('account created successfully! click <a href="/myworkspace.html" data-dom-cache="false" data-ajax="false">here</a> to access your workspace');
	if (sessionStorage.userType=="2")
		$("#create-success-lab").html('account created successfully! click <a href="/myworkspace.html" data-dom-cache="false" data-ajax="false">here</a> to access your workspace <br><br><u><b>Important Notice:</b></u><br><ol style="list-style-type:decimal;">   <li>Subscribe to desired Art-please services</li>   <li>Ensure to enter correctly your latitude, longitude and google id (go to "Your Gallery data" section in my "My workspace" tab)</li>   <li>Complete all required data to be displayed on the smartphone application</li>   <li>Click on <img src="img/help/infoicon.png"> to access online help, or <img src="img/help/gearicon.png"> to view online help videos</li></ol> 	');
	else
		$("#create-success-lab").html('account created successfully! ! click <a href="/myworkspace.html" data-dom-cache="false" data-ajax="false">here</a> to access your workspace <br><br><u><b>Important Notice:</b></u><br><ol style="list-style-type:decimal;">   <li>Ensure to enter correctly your latitude, longitude and google id (go to "Your workshop data" section in my "My workspace" tab)</li>   <li>Complete all required data to be displayed on the smartphone application</li>   <li>Click on <img src="img/help/infoicon.png"> to access online help, or <img src="img/help/gearicon.png"> to view online help videos</li></ol> 	');
		
	$("#createaccountform").hide();
	$("#create-error-lab").hide();
	$("#create-required-lab").hide();
	$("#create-success-lab").css('visibility','visible');
	$("#create-success-lab").css('display','block');
	sessionStorage.disableAccountCreation=true;
	
}
 /*!
 * Callback function on account creation error
 *
 * dependancy: jQuery
 *
 * Date: 2013-06-15T17:26
 */
function createAccountOnError(xhr, status, error)
{
	// handle an error
	$.mobile.loading( "hide" );

	$response = JSON.parse(xhr.responseText);
	
	alert($response.errors[0].message);
	if ($response.errors[0].message.indexOf('Security code check failed!')!=-1)
		document.getElementById('captcha').src = '/phpfiles/securimage/securimage_show.php?' + Math.random();

}  

 /*!
 * Account creation form validation
 *
 * dependancy: jQuery, jQuery Validation Plugin
 *
 * Date: 2013-06-15T17:26
 */
function validateFormCreateAccount()
{
            //form validation rules
            $("#createaccountform").validate({
                rules: {
                    logininput: {
                        required: true,
                        minlength: 4,
						maxlength: 10,
						remote: {
						url: "phpfiles/checklogin.php",
						type: "post",
						}
                    },
                    passwordinput: {
                        required: true,
                        minlength: 8,
						maxlength: 50,
                    },
					passwordinput2: {
					  equalTo: "#createaccountform #passwordinput"
					},
                    email1: {
                        required: true,
                        email: true,
						remote: {
						url: "phpfiles/checkemail.php",
						type: "post",
						data: {
						  login: function() {
							return $( "#logininput" ).val();
						  }
						}
						}
                    },
					email2: {
					  equalTo: "#createaccountform #email1"
					},
                    fnameinput: "required",
                    lnameinput: "required",
					selectnativeAreU: {
						required: true,
						range: [1,2]
					},
                    urll1: {
                        url: true
                    },
					termsandconditions : "required",
					captcha_code : "required",
				},
                messages: {
					logininput:{
                        remote: "This login is already registered",
                        minlength: "Your login must be at least 4 characters long",
                        maxlength: "Your login must be max 10 characters long",
                    },
                    fnameinput: "Please enter your first name",
                    lnameinput: "Please enter your last name",
                    passwordinput: {
                        required: "Please provide a password",
                        minlength: "Your password must be at least 8 characters long",
                        maxlength: "Your password must be max 50 characters long",
                    },
					email1: {
						email : "Please enter a valid email address",
						remote: "This email is already registered",
					},
					selectnativeAreU: {
						range: "Please choose 'An artist' or 'A gallerist' option",
					},
					termsandconditions: "Please click 'I accept'",
					captcha_code: "Please enter the security code",
				},
                submitHandler: function(form) {
					$.mobile.showPageLoadingMsg();
					var formData = $("#createaccountform").serialize();
					$.ajax({
						type: "POST",
						url: "phpfiles/createaccount.php",
						cache: false,
						data: formData,
						success: createAccountOnSuccess,
						error: createAccountOnError
					});
                }
            });
}
/*!
 * Callback function on message creation success
 *
 * dependancy: jQuery
 *
 * Date: 2013-10-17T06:09
 */
function createMessageOnSuccess(data, status)
{

	$response = JSON.parse(data);
	$.mobile.loading( "hide" );
	
	$("#createmsg-success-lab").html('message sent successfully! Please note the message id : '+$response.msgref);
	$("#createmessageform").hide();
	$("#createmsg-error-lab").hide();
	$("#createmsg-success-lab").css('visibility','visible');
	$("#createmsg-success-lab").css('display','block');
	
}
 /*!
 * Callback function on message creation error
 *
 * dependancy: jQuery
 *
 * Date: 2013-10-17T06:09
 */
function createMessageOnError(xhr, status, error)
{
	// handle an error
	$.mobile.loading( "hide" );

	$response = JSON.parse(xhr.responseText);

	alert($response.errors[0].message);
	if ($response.errors[0].message.indexOf('Security code check failed!')!=-1)
		document.getElementById('captchamsg').src = '/phpfiles/securimage/securimage_show.php?' + Math.random();
}  

 /*!
 * Message creation form validation
 *
 * dependancy: jQuery, jQuery Validation Plugin
 *
 * Date: 2013-10-17T06:09
 */
function validateFormCreateMessage()
{
            //form validation rules
            $("#createmessageform").validate({
                rules: {
                     emailmsginput: {
                        required: true,
                        email: true,
                    },
                    fnamemsginput: "required",
                    lnamemsginput: "required",
                    subjectinput: "required",
					scopeselect: "required",
					captcha_code_msg : "required",
				},
                messages: {
                    fnamemsginput: "Please enter your first name",
                    lnamemsginput: "Please enter your last name",
                    subjectinput: "Please enter a subject",
					emailmsginput: {
						email : "Please enter a valid email address",
					},					
					captcha_code: "Please enter the security code",
				},
                submitHandler: function(form) {
					$.mobile.showPageLoadingMsg();
					var formData = $("#createmessageform").serialize();
					$.ajax({
						type: "POST",
						url: "phpfiles/createmessage.php",
						cache: false,
						data: formData,
						success: createMessageOnSuccess,
						error: createMessageOnError
					});
                },
            });
}  
/*!
 * Account update form validation
 *
 * dependancy: jQuery, jQuery Validation Plugin
 *
 * Date: 2013-08-27T18:16
 */
function validateFormUpdateAccount()
{
            //form validation rules
            $("#updateaccountform").validate({
                rules: {

                    email1: {
                        required: true,
                        email: true,
						remote: {
						url: "phpfiles/checkemail.php",
						type: "post",
						data: {
						  login: function() {
							return sessionStorage.login;
							}						
						  }
						}
                    },
					email2: {
					  equalTo: "#email1"
					},
                    fnameinput: "required",
                    lnameinput: "required",
					selectnativeAreU: "required",
                     urll1: {
                        url: true
                    },
				},
                messages: {
                    fnameinput: "Please enter your first name",
                    lnameinput: "Please enter your last name",
                    passwordinput: {
                        minlength: "Your password must be at least 8 characters long"
                    },
                    email1: {
						email : "Please enter a valid email address",
						remote: "This email is already registered",
					}
                },
                submitHandler: function(form) {
					$.mobile.showPageLoadingMsg();
					var formData = $("#updateaccountform").serialize();
					$.ajax({
						type: "POST",
						url: "phpfiles/updateaccount.php",
						cache: false,
						data: formData,
						success: updateAccountOnSuccess,
						error: updateAccountOnError
					});
                }
            });
}

/*!
 * Callback function on password update success
 *
 * dependancy: jQuery
 *
 * Date: 2013-08-27T18:16
 */
function updateAccountOnSuccess(data, status)
{
	data = jQuery.trim(data);
	$.mobile.loading( "hide" );

	alert('data updated successfully! ');

}
 /*!
 * Callback function on password update error
 *
 * dependancy: jQuery
 *
 * Date: 2013-08-27T18:16
 */
function updateAccountOnError(xhr, status, error)
{
	// handle an error
	$.mobile.loading( "hide" );

	$response = JSON.parse(xhr.responseText);

	alert($response.errors[0].message);

}  

/*!
 * Account update form validation
 *
 * dependancy: jQuery, jQuery Validation Plugin
 *
 * Date: 2013-08-27T18:16
 */
function validateFormUpdatePassword()
{
            //form validation rules
            $("#changepasswordform").validate({
                rules: {
                    currentpassword: {
                        required: true,
                    },
                    passwordinput: {
                        required: true,
                        minlength: 8,
                        maxlength: 50,
                    },
					passwordinput2: {
					  equalTo: "#passwordinput"
					},
 				},
                messages: {
                     passwordinput: {
                        minlength: "Your password must be at least 8 characters long",
                        maxlength: "Your password must be max 50 characters long",
                    },
                },
                submitHandler: function(form) {
					$.mobile.showPageLoadingMsg();
					var formData = $("#changepasswordform").serialize();
					$.ajax({
						type: "POST",
						url: "phpfiles/updatepassword.php",
						cache: false,
						data: formData,
						success: updatePasswordOnSuccess,
						error: updatePasswordOnError
					});
                }
            });
}  


/*!
 * Callback function on password update success
 *
 * dependancy: jQuery
 *
 * Date: 2013-08-27T18:16
 */
function updatePasswordOnSuccess(data, status)
{
	data = jQuery.trim(data);
	$.mobile.loading( "hide" );


	alert('password changed successfully! ');
	

}
 /*!
 * Callback function on password update error
 *
 * dependancy: jQuery
 *
 * Date: 2013-08-27T18:16
 */
function updatePasswordOnError(xhr, status, error)
{
	// handle an error
	$.mobile.loading( "hide" );

	$response = JSON.parse(xhr.responseText);

	alert($response.errors[0].message);

}

/*!
 * Send a new password form validation
 *
 * dependancy: jQuery, jQuery Validation Plugin
 *
 * Date: 2013-09-27T13:12
 */
function validateFormSendNewPassword()
{
            //form validation rules
            $("#forgotpasswordform").validate({
                rules: {
                    email1: {
                        required: true,
                        email: true,
						remote: {
						url: "phpfiles/checkemail.php",
						type: "post",
						data: {
						  login :"",
						  inverse: 0,					
						  }
						}
                    },
 				},
                messages: {
                     email1: {
						email : "Please enter a valid email address",
						remote: "This email has not been found",
					},					
                },
                submitHandler: function(form) {
					$.mobile.loading( 'show', {
					  text: "Generation and sending a new password...",
					  textVisible: true
					});					
					var formData = $("#forgotpasswordform").serialize();
					$.ajax({
						type: "POST",
						url: "phpfiles/sendnewpassword.php",
						cache: false,
						data: formData,
						success: sendNewPasswordOnSuccess,
						error: sendNewPasswordOnError
					});
                }
            });
}

/*!
 * Callback function on send new password success
 *
 * dependancy: jQuery
 *
 * Date: 2013-09-27T13:12
 */
function sendNewPasswordOnSuccess(data, status)
{
	data = jQuery.trim(data);
	$.mobile.loading( "hide" );


	alert('new password sent successfully! ');
	

}
 /*!
 * Callback function on send new password  error
 *
 * dependancy: jQuery
 *
 * Date: 2013-09-27T13:12
 */
function sendNewPasswordOnError(xhr, status, error)
{
	// handle an error
	$.mobile.loading( "hide" );

	$response = JSON.parse(xhr.responseText);

	alert($response.errors[0].message);

}

 /*!
 * update latitude and longitude form validation
 *
 * dependancy: jQuery, jQuery Validation Plugin
 *
 * Date: 2013-08-19T15:34
 */
function validateFormLatLong()
{
            //form validation rules
            $("#latlongform").validate({
                rules: {
                    latitudeid: {
                        required: true,
                        number: true
                    },
                    longitudeid: {
                        required: true,
                        number: true
                    },
				},
                messages: {
                    latitudeid: {
                        required: "Please enter a latitude",
                        number: "Latitude must be a number"
                    },
                    longitudeid: {
                        required: "Please enter a longitude",
                        number: "Longitude must be a number"
                    },
                },
                submitHandler: function(form) {
					$.mobile.showPageLoadingMsg();
					$.ajax({
						type: "POST",
						url: "phpfiles/updateGalLatLong.php",
						cache: false,
						data: {
							noGalData : sessionStorage.noGalData,
							latitude : $("#latitudeid").val(),
							longitude : $("#longitudeid").val()
						},
						success: updateLatLongOnSuccess,
						error: updateLatLongOnError
					});
                }
            });
} 

/*!
 * Callback function on update latitude and longitude success
 *
 * dependancy: jQuery
 *
 * Date: 2013-08-19T15:34
 */
 function updateLatLongOnSuccess(data, status)
{
	// data = jQuery.trim(data);
	$.mobile.loading( "hide" );
	sessionStorage.noGalData=0;
	sessionStorage.latitudeid=$("#latitudeid").val();
	sessionStorage.longitudeid=$("#longitudeid").val();
	alert("Latitude and longitude updated with success");
	
	// store de hash code in order to pass it to the payment page (for simulation only. To be removed when epayment provider selected)
	// sessionStorage.hashcode=data;
	
	// $.mobile.changePage( "/paymentconfirm.html", { role: "dialog",transition: "pop",reloadPage:true } );
}
 /*!
 * Callback function on update latitude and longitude error
 *
 * dependancy: jQuery
 *
 * Date: 2013-08-19T15:34
 */
function updateLatLongOnError(xhr, status, error)
{
	// handle an error
	$.mobile.loading( "hide" );
	
	$response = JSON.parse(xhr.responseText);

	if ($response.errors[0].message==null)
	{
		alert("Unexpected error ("+"error name: "+$response.errors[0].name+"  - error message: "+$response.errors[0].message+" - at :"+$response.errors[0].at +")");
	}
	else
	{
		alert($response.errors[0].message);
	}
	

}
/*!
 * update Google Id form validation
 *
 * dependancy: jQuery, jQuery Validation Plugin
 *
 * Date: 2013-08-20T08:31
 */
function validateFormGoogleId()
{
            //form validation rules
            $("#googleidform").validate({
                rules: {
                    googleid: {
                        required: true
                    },
				},
                messages: {
                    googleid: {
                        required: "Please get your google id by clicking on the 'Get google ID' button"
                    }
                },
                submitHandler: function(form) {
					$.mobile.showPageLoadingMsg();
					$.ajax({
						type: "POST",
						url: "phpfiles/updateGalGoogleId.php",
						cache: false,
						data: {
							noGalData : sessionStorage.noGalData,
							googleid : $("#googleid").val(),
							googleref : $("#googleref").val()
						},
						success: updateGoogleIdOnSuccess,
						error: updateGoogleIdOnError
					});
                }
            });
} 

/*!
 * Callback function on update Google Id success
 *
 * dependancy: jQuery
 *
 * Date: 2013-08-20T08:31
 */
 function updateGoogleIdOnSuccess(data, status)
{

	$.mobile.loading( "hide" );
	sessionStorage.noGalData=0;
	alert("Google id updated with success");

}
 /*!
 * Callback function on update Google Id error
 *
 * dependancy: jQuery
 *
 * Date: 2013-08-20T08:31
 */
function updateGoogleIdOnError(xhr, status, error)
{
	// handle an error
	$.mobile.loading( "hide" );
	
	$response = JSON.parse(xhr.responseText);

	if ($response.errors[0].message==null)
	{
		alert("Unexpected error ("+"error name: "+$response.errors[0].name+"  - error message: "+$response.errors[0].message+" - at :"+$response.errors[0].at +")");
	}
	else
	{
		alert($response.errors[0].message);
	}
	

}
/*!
 * add/remove options in the cart
 *
 * dependancy: none
 *
 * Date: 2013-07-03T15:37
 */
 function handleOptionsCart($option,$action)
 //$option = suscribed options
 //$state = true (click on "renew" or checkbox checked) or false (click on "cancel renew" or checkbox unchecked)
 {
	
	switch ($action)
	{
		case true: //checkbox checked  or click on "renew", so add to cart
			$optionExpDate = new Date()
			$optionsCart[$option-1][3]= ($optionExpDate.getFullYear()+1)+"/"+($optionExpDate.getMonth()+1)+"/"+$optionExpDate.getDate();//new Date($optionsCart[$option-1][3].setFullYear($optionsCart[$option-1][3].getFullYear()+1));
			$optionsCart[$option-1][4]= true;
			$optionsCart[3] = $optionsCart[3] +$optionsCart[$option-1][2];
			break;
		
		case false: //checkbox unchecked or click on "cancel renew", so remove from cart
			$optionsCart[$option-1][3]="";
			$optionsCart[$option-1][4]= false;
			$optionsCart[3] = $optionsCart[3] - $optionsCart[$option-1][2];
			break;
	}
 
 }
 
  /*!
 * handle cart and update option checkbox label and total new subscriptions.
 *
 * dependancy: none
 *
 * Date: 2013-07-03T15:37
 */
 
 function handleOptions($option,$state)
 //$option = suscribed options
 //$state = true (click on "renew" or checkbox checked) or false (click on "cancel renew" or checkbox unchecked)
 {

	handleOptionsCart($option,$state);
	switch ($option)
	{
		case 1:
		
			$('[for="myWScheckbox-tel"] span.ui-btn-text').text($TELVISIBLELABEL+$optionsCart[$option-1][3]);
			break;
		
		case 2:
			$('[for="myWScheckbox-url"] span.ui-btn-text').text($URLVISIBLELABEL+$optionsCart[$option-1][3]);
			
			break;

		case 3:
				
			$('[for="myWScheckbox-show"] span.ui-btn-text').text($ACTIVATESLIDESHOWLABEL+$optionsCart[$option-1][3]);
			break;
	}
	$('[for="totalnewservice-lab"]').text($TOTALNEWSUBSCRIPTIONS+$optionsCart[3].toFixed(2)+"€");
	if ($optionsCart[3].toFixed(2)!=0)
		$('#payementButton').button("enable");
	else
		$('#payementButton').button("disable");
	
 }
 
  /*!
 * Renew - handle cart and update option, "renew" and "cancel renew", expiration dates, button and total new subscriptions.
 *
 * dependancy: none
 *
 * Date: 2013-07-04T06:19
 */
 
 function renewCancelOptions($option,$state)
 //$option = suscribed options
 //$state = true (click on "renew") or false (click on "cancel renew")
 {
	if ($state)
	{
		//Save old expiration Dates in order to display them if click on "cancel renew"
		switch ($option)
		{
			case 1:
				$expDateArray = $('[for="myWScheckbox-tel"]')[0].textContent.split(":");
				$optionsCart[$option-1][5] = $.trim($expDateArray[1]);			

				break;
			
			case 2:
				$expDateArray = $('[for="myWScheckbox-url"]')[0].textContent.split(":");
				$optionsCart[$option-1][5] = $.trim($expDateArray[1]);
		
				break;

			case 3:
				$expDateArray = $('[for="myWScheckbox-show"]')[0].textContent.split(":");
				$optionsCart[$option-1][5] = $.trim($expDateArray[1]);
					
				break;
		}
	}




	handleOptions($option,$state);
	switch ($option)
	{
		case 1:
		
			switch ($state)
				{
					case true: //renew option
						//Hide renew button
						$('#renewTel').hide();
						//Show cancel renew button
						$('#renewCancelTel').css('visibility','visible');;
						$('#renewCancelTel').css('display','block');
						
						$('[for="myWScheckbox-tel"] span.ui-btn-text').text($TELVISIBLELABEL+$optionsCart[$option-1][3]);						
						
						//Hide exp Date						
						$('[for="expDateLabel-tel"]').hide();
						break;
					
					case false: //cancel renew option
						//Hide cancel renew button
						$('#renewCancelTel').hide();
						//Show renew button
						$('#renewTel').css('visibility','visible');;
						$('#renewTel').css('display','block');
						
						$('[for="myWScheckbox-tel"] span.ui-btn-text').text($TELVISIBLELABEL+$optionsCart[$option-1][5]);
						
						//Show exp Date						
						$('[for="expDateLabel-tel"]').css('visibility','visible');
						$('[for="expDateLabel-tel"]').css('display','block');
				}
			
			
			
			break;
		
		case 2:
			switch ($state)
				{
					case true: //renew option

						//Hide renew button
						$('#renewUrl').hide();
						//Show cancel renew button
						$('#renewCancelUrl').css('visibility','visible');
						$('#renewCancelUrl').css('display','block');
						
						$('[for="myWScheckbox-url"] span.ui-btn-text').text($URLVISIBLELABEL+$optionsCart[$option-1][3]);

						//Hide exp Date						
						$('[for="expDateLabel-url"]').hide();
						break;
					
					case false: //cancel renew option
						//Hide cancel renew button
						$('#renewCancelUrl').hide();
						
						//Show renew button
						$('#renewUrl').css('visibility','visible');;
						$('#renewUrl').css('display','block');
						
						$('[for="myWScheckbox-url"] span.ui-btn-text').text($URLVISIBLELABEL+$optionsCart[$option-1][5]);
						
						//Show exp Date
						$('[for="expDateLabel-url"]').css('visibility','visible');
						$('[for="expDateLabel-url"]').css('display','block');
						break;
				}
			
			
			
			break;

		case 3:
			switch ($state)
				{
					case true: //renew option
						//Hide renew button
						$('#renewSlideShow').hide();
						//Show cancel renew button
						$('#renewCancelSlideShow').css('visibility','visible');;
						$('#renewCancelSlideShow').css('display','block');
						
						$('[for="myWScheckbox-show"] span.ui-btn-text').text($ACTIVATESLIDESHOWLABEL+$optionsCart[$option-1][3]);

						//Hide exp Date						
						$('[for="expDateLabel-show"]').hide();
						break;
					
					case false: //cancel renew option
						//Hide cancel renew button
						$('#renewCancelSlideShow').hide();
						//Show renew button
						$('#renewSlideShow').css('visibility','visible');;
						$('#renewSlideShow').css('display','block');
						
						$('[for="myWScheckbox-show"] span.ui-btn-text').text($ACTIVATESLIDESHOWLABEL+$optionsCart[$option-1][5]);
						
						//Show exp Date
						$('[for="expDateLabel-show"]').css('visibility','visible');
						$('[for="expDateLabel-show"]').css('display','block');
						
						break;
				}
				
			
			break;
	}	
 }
 
  /*!
 * Populate myWorkspace with data
 *
 * dependancy: jQuery
 *
 * because it binds mobileinit, reference to this js must be placed before jQuery Mobile call. See pagehide API doc
 *
 * Date: 2013-07-01T10:57
 */
 function updateMyWSPage()
 {
	/*
		Update 'Your services' section
	*/
	
	switch (sessionStorage.userType)
	{
	case "1" : //Artist
		//reinit checkboxes
		$('[id^="myWS"]').checkboxradio( "disable" );
		$('[id^="myWS"]').prop("checked",true).checkboxradio("refresh");		
		//reinit checkbox labels
		$('[for="myWScheckbox-tel"] span.ui-btn-text').text($TELVISIBLELABELARTIST);
		$('[for="myWScheckbox-url"] span.ui-btn-text').text($URLVISIBLELABELARTIST);
		$('[for="myWScheckbox-show"] span.ui-btn-text').text($ACTIVATESLIDESHOWLABELARTIST);
		//Hide renew buttons
		$('[id^="renew"]').css('visibility','hidden');
		$('[id^="renew"]').css('display','none');

		$('[for="totalcurrentservice-lab"]').css('visibility','hidden');
		$('[for="totalcurrentservice-lab"]').css('display','none');		
		$('[for="totalnewservice-lab"]').css('visibility','hidden');
		$('[for="totalnewservice-lab"]').css('display','none');		

		$('#payementButton').css('visibility','hidden');
		$('#payementButton').css('display','none');

		//Update labels 
		$('#galdatacollapsible').find('h4 span.ui-btn-text').text('Your workshop data');
		$('[for="latlong-lab"]').text('Latitude and longitude of your workshop:');
		$('[for="galdesc-lab"]').text('Description of your workshop (Max. X char.) :');
		$('[for="galphoto1-lab"]').text('1st photo of your workshop:');
		$('[for="galphoto2-lab"]').text('2nd photo of your workshop:');
		
		$('#googleidform').css('visibility','hidden');
		$('#googleidform').css('display','none');		

		break;
	
	case "2" : //Gallery
	
		var $currentSubscriptions;
		var $expDate;
		var $totalSubs = 0;

		$currentSubscriptions = JSON.parse(sessionStorage.currentSubscriptions);
		// console.log($currentSubscriptions);
		// console.dir($currentSubscriptions);
		//alert($currentSubscriptions.PRD_ID.length);
		var $taille = Object.keys($currentSubscriptions).length;
		
		//reinit checkboxes
		$('[id^="myWS"]').checkboxradio( "enable" );
		$('[id^="myWS"]').prop("checked",false).checkboxradio("refresh");
		
		//reinit checkbox labels
		$('[for="myWScheckbox-tel"] span.ui-btn-text').text($TELVISIBLELABEL);
		$('[for="myWScheckbox-url"] span.ui-btn-text').text($URLVISIBLELABEL);
		$('[for="myWScheckbox-show"] span.ui-btn-text').text($ACTIVATESLIDESHOWLABEL);
		
		//Hide renew buttons
		$('[id^="renew"]').css('visibility','hidden');
		$('[id^="renew"]').css('display','none');

		initOptionCart();

		$today = new Date();	
		if ($currentSubscriptions.hasOwnProperty('errors')) //User has no subscription
		{
			$('[for="totalcurrentservice-lab"]').text($TOTALCURRENTSUBSCRIPTIONS);
		}
		else
		{
			for (var i=0; i<$taille-1; i++)
			  {
				$time = (new Date($currentSubscriptions[i]["SUBSPRD_EXPDATE"].replace(/-/g, "/"))).getTime();
				$expDate = new Date($time);//new Date($currentSubscriptions[i]["SUBSPRD_EXPDATE"]);

				//Calculate the date the alert "your option is about to expire" should be dispayed
				$dateBeforeExp = new Date($expDate);
				$dateBeforeExp.setMonth($dateBeforeExp.getMonth()-3);
				
				$expAlert = "";
				

				$totalSubs = $totalSubs + parseFloat($currentSubscriptions[i]["COST"]);
				switch ($currentSubscriptions[i]["PRD_ID"]) //Get Product ID
				{
					case "1":
						// TELVISIBLE OPTION

						$('[for="myWScheckbox-tel"] span.ui-btn-text').text($TELVISIBLELABEL+$expDate.getFullYear()+"/"+($expDate.getMonth()+1)+"/"+$expDate.getDate());
						// $('[for="myWScheckbox-tel"] span.ui-btn-text').text($TELVISIBLELABEL+$expDate);
						$("#myWScheckbox-tel").checkboxradio( "disable" );
						$("#myWScheckbox-tel").prop("checked",true).checkboxradio("refresh");
						
						//handle "renew" button visibility and expiration alert
						if ($today>$expDate)
						  {
							$expAlert = "This option has expired ! Click on renew button.";
							$('#renewTel').css('visibility','visible');;
							$('#renewTel').css('display','block');
							
						  }
						else if ($today>$dateBeforeExp)
						  {
							$expAlert = "This option is about to expire ! You can renew now by clicking on renew button.";
							$('#renewTel').css('visibility','visible');;
							$('#renewTel').css('display','block');
						  }
						  $('[for="expDateLabel-tel"]').text($expAlert);
						  $('[for="expDateLabel-tel"]').css('color','#FF0000');
						break;
					case "2":
						// URLVISIBLE OPTION
						$('[for="myWScheckbox-url"] span.ui-btn-text').text($URLVISIBLELABEL+$expDate.getFullYear()+"/"+($expDate.getMonth()+1)+"/"+$expDate.getDate());
						$("#myWScheckbox-url").checkboxradio( "disable" );
						$("#myWScheckbox-url").prop("checked",true).checkboxradio("refresh");

						//handle "renew" button visibility and expiration alert
						if ($today>$expDate)
						  {
							$expAlert = "This option has expired ! Click on renew button.";
							$('#renewUrl').css('visibility','visible');;
							$('#renewUrl').css('display','block');
							
						  }
						else if ($today>$dateBeforeExp)
						  {
							$expAlert = "This option is about to expire ! You can renew now by clicking on renew button.";
							$('#renewUrl').css('visibility','visible');;
							$('#renewUrl').css('display','block');
						  }
						  $('[for="expDateLabel-url"]').text($expAlert);
						  $('[for="expDateLabel-url"]').css('color','#FF0000');
						break;
					case "3":
						// ACTIVATE SLIDESHOW OPTION;
						$('[for="myWScheckbox-show"] span.ui-btn-text').text($ACTIVATESLIDESHOWLABEL+$expDate.getFullYear()+"/"+($expDate.getMonth()+1)+"/"+$expDate.getDate());
						$("#myWScheckbox-show").checkboxradio( "disable" );
						$("#myWScheckbox-show").prop("checked",true).checkboxradio("refresh");
						
						//handle "renew" button visibility and expiration alert
						if ($today>$expDate)
						  {
							$expAlert = "This option has expired ! Click on renew button.";
							$('#renewSlideShow').css('visibility','visible');;
							$('#renewSlideShow').css('display','block');
							
						  }
						else if ($today>$dateBeforeExp)
						  {
							$expAlert = "This option is about to expire ! You can renew now by clicking on renew button.";
							$('#renewSlideShow').css('visibility','visible');;
							$('#renewSlideShow').css('display','block');
						  }
						  $('[for="expDateLabel-show"]').text($expAlert);
						  $('[for="expDateLabel-show"]').css('color','#FF0000');
						break;
				}
			  }
			  $('[for="totalcurrentservice-lab"]').text($TOTALCURRENTSUBSCRIPTIONS+$totalSubs.toFixed(2)+"€"); //Update total current subscription label
		}
		break;
	}

	/*
		Update 'Your gallery data' section
	*/
	//console.log(sessionStorage.gallerydataretrieved);
	if (sessionStorage.disableUpdateGalData == null || sessionStorage.disableUpdateGalData !=1)
	{
		// $.mobile.showPageLoadingMsg();
		$.mobile.loading('show');
		
		$.ajax({
			type: "POST",
			url: "phpfiles/getgallerydata.php",
			cache: false,
			async: false,
			data: {
				login : sessionStorage.login
			},
			success: onGetGalleryDataSuccess,
			error: onGetGalleryDataError
		});
	}
	else
	{
		sessionStorage.disableUpdateGalData =0;
	}
	
}
 /*!
 * Callback function on get gallery data sucess
 *
 * dependancy: jQuery
 *
 * Date: 2013-07-24T18:43
 */
function onGetAccountDataSuccess(data, status)
{

	data = $.trim(data);
	$.mobile.loading( "hide" );

	$response = JSON.parse(data);
}

 /*!
 * Callback function on get gallery data sucess
 *
 * dependancy: jQuery
 *
 * Date: 2013-12-07T07:00
 */
function onGalleryEventsDataSuccess(data, status)
{
var $startDate;
var $endDate;

 
	data = $.trim(data);
	$.mobile.loading( "hide" );

	$response = JSON.parse(data);
	
	//console.log($response.length);
	for(i=0;i<$response.length;i++){
		$startDate = moment($response[i].EVE_START_DATE);
		$endDate = moment($response[i].EVE_END_DATE);
		$lidivevent[i] = $('<li />').attr({'data-role':'list-divider'});
		$($lidivevent[i]).html($startDate.format("dddd, MMMM Do YYYY")+' - '+$endDate.format("dddd, MMMM Do YYYY"));
		$lievent[i] = $('<li />');//.attr({'data-icon':'delete'});
		//$($lievent[i]).html('<a href="#"><img src="events/'+$response[i].EVE_ID+'/logoico.png"> <h2>'+$response[i].EVE_NAME+'</h2> <p>'+$response[i].EVE_DESC+'</p></a>');
		$($lievent[i]).html('<a href="#"><img src="events/'+$response[i].EVE_ID+'/logoico.png"> <h2>'+$response[i].EVE_NAME+'</h2> <p>'+$response[i].EVE_DESC+'</p></a><a href="#" onClick="delgalleryevent('+$response[i].EVE_ID+',\''+$response[i].EVE_NAME+'\')">remove this event ('+$response[i].EVE_NAME+')</a>');

		$($tableEvents[sessionStorage.currentPage]).append($lidivevent[i]);
		$($tableEvents[sessionStorage.currentPage]).append($lievent[i]);
	}
	$($tableEvents[sessionStorage.currentPage]).trigger('create');
	$($tableEvents[sessionStorage.currentPage]).listview ("refresh");
	$($tableEvents[sessionStorage.currentPage]).css('display','block');	
	$($tableEvents[sessionStorage.currentPage]).css('visibility','visible');
	$('#eventsnumber').html($response.length+' event(s) found');

	$lidivevent = new Array();
	$lievent = new Array();
}
 /*!
 * Callback function on get gallery data sucess
 *
 * dependancy: jQuery
 *
 * Date: 2013-07-24T18:43
 */
function onGetGalleryDataSuccess(data, status)
{

	data = $.trim(data);
	$.mobile.loading( "hide" );

	$response = JSON.parse(data);

	sessionStorage.noGalData=0;//=$response[0].GAL_ID;
	sessionStorage.galid=$response[0].GAL_ID;
	
	//Update form with db data
	$('#latitudeid').val($response[0].GAL_LAT);
	$('#longitudeid').val($response[0].GAL_LONG);
	$('#googleid').val($response[0].GAL_GOOGLE_ID);
	$('#googleref').val($response[0].GAL_GOOGLE_REF);
	$('#galdescript').jqteVal($response[0].GAL_DESC);
	$('#slidephoto1comment').val($response[0].GAL_SS_PHOTO1_COMMENT);
	$('#slidephoto2comment').val($response[0].GAL_SS_PHOTO2_COMMENT);
	$('#slidephoto3comment').val($response[0].GAL_SS_PHOTO3_COMMENT);
	$('#oldslidephoto1comment').val($response[0].GAL_SS_PHOTO1_COMMENT);
	$('#oldslidephoto2comment').val($response[0].GAL_SS_PHOTO2_COMMENT);
	$('#oldslidephoto3comment').val($response[0].GAL_SS_PHOTO3_COMMENT);

	$('#noGalData1').val('0'); //To prevent creation of the row when uploading slideshow image or updating slideshow image comment
	$('#noGalData2').val('0'); //To prevent creation of the row when uploading slideshow image or updating slideshow image comment
	$('#noGalData3').val('0'); //To prevent creation of the row when uploading slideshow image or updating slideshow image comment

	$("#delgalphoto1").hide();
	$("#delgalphoto2").hide();
	$("#delslidephoto1form").hide();
	$("#delslidephoto2form").hide();
	$("#delslidephoto3form").hide();

	sessionStorage.latitudeid=$("#latitudeid").val();
	sessionStorage.longitudeid=$("#longitudeid").val();	
	
	//Update images fields
	var $taille = Object.keys($response).length;
	if ($response[1]!="No files") //User has not uploaded any images
	{
		for (var i=1; i<$taille; i++)
		  {
			//Extract the file name
			$filename = $response[i].substring($response[i].lastIndexOf("/")+1);
			//$filename = $filename.substring(0,$filename.indexOf("."));
			$filename = $filename.substring(0,10);
			

			//Update image fields
			switch ($filename) 
			{
				case $GAL_PHOTO1:
					$("#galphoto1").attr('src',$response[i]);
					$("#delgalphoto1").css('visibility','visible');
					$("#delgalphoto1").css('display','inline-block');
					break;
				case $GAL_PHOTO2:
					$("#galphoto2").attr('src',$response[i]);
					$("#delgalphoto2").css('visibility','visible');
					$("#delgalphoto2").css('display','inline-block');
					break;
				case $SS_PHOTO1:
					$("#slidephoto1").attr('src',$response[i]);
					$("#delslidephoto1form").css('visibility','visible');
					$("#delslidephoto1form").css('display','inline-block');
					break;
				case $SS_PHOTO2:
					$("#slidephoto2").attr('src',$response[i]);
					$("#delslidephoto2form").css('visibility','visible');
					$("#delslidephoto2form").css('display','inline-block');
					break;
				case $SS_PHOTO3:
					$("#slidephoto3").attr('src',$response[i]);
					$("#delslidephoto3form").css('visibility','visible');
					$("#delslidephoto3form").css('display','inline-block');
					break;
			}
		  }
	}
	getAccountData();
	getGalleryEventsData();

}

 /*!
 * Callback function on get gallery data error
 *
 * dependancy: jQuery
 *
 * Date: 2013-07-24T18:43
 */
function onGalleryEventsDataError(xhr, status, error)
{
	// handle an error
	$.mobile.loading( "hide" );

	$response = JSON.parse(xhr.responseText);

	if ($response.errors[0].message==null)
	{
		alert("Unexpected error ("+"error name: "+$response.errors[0].name+"  - error message: "+$response.errors[0].message+" - at :"+$response.errors[0].at +")");
	}
	else
	{
		if ($response.errors[0].name!='EVENTS_NOT_FOUND')
		{
			alert($response.errors[0].message);
		}
		else
		{
			$('#eventsnumber').html('No event found');
		}
	}

}

 /*!
 * Callback function on get gallery data error
 *
 * dependancy: jQuery
 *
 * Date: 2013-07-24T18:43
 */
function onGetGalleryDataError(xhr, status, error)
{
	// handle an error
	$.mobile.loading( "hide" );
	//console.dir(xhr);
	$response = JSON.parse(xhr.responseText);

	if ($response.errors[0].message==null)
	{
		// $("#error-lab").text("Unexpected error ("+"error name: "+$response.errors[0].name+"  - error message: "+$response.errors[0].message+" - at :"+$response.errors[0].at +")");
		alert("Unexpected error ("+"error name: "+$response.errors[0].name+"  - error message: "+$response.errors[0].message+" - at :"+$response.errors[0].at +")");
	}
	else
	{
		// $("#error-lab").text($response.errors[0].message);
		if ($response.errors[0].name!='GAL_DATA_NOT_FOUND')
		{
			alert($response.errors[0].message);
		}
		else
		{
			sessionStorage.noGalData=1;
			getAccountData();
			getGalleryEventsData();
		}
	}
	// $("#error-lab").css('visibility','visible');

}      

	/*
		Update 'Your account data' section
	*/
/*!
 * Get account data
 *
 * dependancy: jQuery
 *
 * Date: 2013-07-24T18:43
 */
function getAccountData()
{
	if (sessionStorage.disableUpdateGalData == null || sessionStorage.disableUpdateGalData !=1)
	{
		$.mobile.loading( "show" );
		$.ajax({
			type: "POST",
			url: "phpfiles/getaccountdata.php",
			cache: false,
			async: false,
			data: {
				login : sessionStorage.login
			},
			success: onGetAccountDataSuccess,
			error: onGetAccountDataError
		});
	}
	else
	{
		sessionStorage.disableUpdateGalData =0;
	}
}

/*!
 * Get gallery events data
 *
 * dependancy: jQuery
 *
 * Date: 2013-12-06T15:00
 */
function getGalleryEventsData()
{
	if (sessionStorage.disableUpdateGalData == null || sessionStorage.disableUpdateGalData !=1)
	{
		$.mobile.loading( "show" );
		$($tableEvents[sessionStorage.currentPage]).empty();
		$($tableEvents[sessionStorage.currentPage]).hide();		
		$.ajax({
			type: "POST",
			url: "phpfiles/getgalleryevents.php",
			cache: false,
			async: false,
			success: onGalleryEventsDataSuccess,
			error: onGalleryEventsDataError
		});
	}
	else
	{
		sessionStorage.disableUpdateGalData =0;
	}
}




 /*!
 * Callback function on get account data error
 *
 * dependancy: jQuery
 *
 * Date: 2013-07-24T18:43
 */
function onGetAccountDataError(xhr, status, error)
{
	// handle an error
	$.mobile.loading( "hide" );
	//console.dir(xhr);
	$response = JSON.parse(xhr.responseText);

	if ($response.errors[0].message==null)
	{
		alert("Unexpected error ("+"error name: "+$response.errors[0].name+"  - error message: "+$response.errors[0].message+" - at :"+$response.errors[0].at +")");
	}
	else
	{
		alert($response.errors[0].message);
	}


}     
 /*!
 * Call createtransaction ws
 *
 * dependancy: jQuery
 *
 * Date: 2013-07-08T17:46
 */
 function initPaymentSubmitButon()
 {
	$('#yourservices').on('submit', function (e) {
		
				
				$.mobile.showPageLoadingMsg();
				
				$.ajax({
					type: "POST",
					url: "phpfiles/createtransaction.php",
					cache: false,
					async:false,
					data: {
						login : sessionStorage.login,
						cart : JSON.stringify($optionsCart),
					},
					success: onCreateTransactionSuccess,
					error: onCreateTransactionError
				});
						return false;			
			});
}
 /*!
 * Callback function on transaction creation success
 *
 * dependancy: jQuery
 *
 * Date: 2013-07-08T17:46
 */

 function onCreateTransactionSuccess(data, status)
{
	data = jQuery.trim(data);
	$.mobile.loading( "hide" );
	
	//store de hash code in order to pass it to the payment page (for simulation only. To be removed when epayment provider selected)
	sessionStorage.hashcode=data;

	$.ajax({
	type: "POST",
	url: "phpfiles/createpppurchase.php",
	cache: false,
	success: function(data){
		//console.log(data);
		$pp_div=data;
		$.mobile.changePage( "/paymentconfirm.html", { role: "dialog",transition: "pop",reloadPage:true,changeHash:false } );
		}
	});
}
 /*!
 * Callback function on transaction creation error
 *
 * dependancy: jQuery
 *
 * Date: 2013-07-08T17:46
 */
function onCreateTransactionError(xhr, status, error)
{
	// handle an error
	$.mobile.loading( "hide" );
	
	$response = JSON.parse(xhr.responseText);

	if ($response.errors[0].message==null)
	{
		alert("Unexpected error ("+"error name: "+$response.errors[0].name+"  - error message: "+$response.errors[0].message+" - at :"+$response.errors[0].at +")");
	}
	else
	{
		alert($response.errors[0].message);
	}
	

}  
 /*!
 * Call cancelpayment ws
 *
 * dependancy: jQuery
 *
 * Date: 2013-07-10T17:36
 */
 function cancelPayment()
 {
 
	if (sessionStorage.hashcode!="")
	{
	
		$.mobile.showPageLoadingMsg();
		
		$.ajax({
			type: "POST",
			url: "phpfiles/cancelpayment.php",
			cache: false,
			async:false,
			success: onCancelPaymentSuccess,
			error: onCancelPaymentError
		});
	}
			return false;			

}
 /*!
 * Callback function on cancel payment success
 *
 * dependancy: jQuery
 *
 * Date: 2013-07-10T17:36
 */
 function onCancelPaymentSuccess(data, status)
{



	$.mobile.loading( "hide" );
	
	sessionStorage.hashcode="";
	
	initOptionCart();
	sessionStorage.paymentMsg = "";
	sessionStorage.paymentMsg =	"The payment has been canceled";
	$('[for="cancelpaymentlab"]').text("The payment has been canceled");
}
 /*!
 * Callback function on cancel payment error
 *
 * dependancy: jQuery
 *
 * Date: 2013-07-10T17:36
 */
function onCancelPaymentError(xhr, status, error)
{
	// handle an error
	$.mobile.loading( "hide" );

	sessionStorage.hashcode="";	
	
	initOptionCart();
	
	$response = JSON.parse(xhr.responseText);

	if ($response.errors[0].message==null)
	{
		sessionStorage.paymentMsg = "";
		sessionStorage.paymentMsg = "Unexpected error ("+"error name: "+$response.errors[0].name+"  - error message: "+$response.errors[0].message+" - at :"+$response.errors[0].at +")";
		$('[for="cancelpaymentlab"]').text("Unexpected error ("+"error name: "+$response.errors[0].name+"  - error message: "+$response.errors[0].message+" - at :"+$response.errors[0].at +")");
	}
	else
	{
		sessionStorage.paymentMsg = "";
		sessionStorage.paymentMsg = $response.errors[0].message;
		$('[for="cancelpaymentlab"]').text($response.errors[0].message);
	}
	

}
 /*!
 * Call confirmpayment ws
 *
 * dependancy: jQuery
 *
 * Date: 2013-07-10T17:36
 */
 function confirmPayment()
 {
 	if (sessionStorage.hashcode!="")
	{
		$.mobile.loading( 'show', {
		  text: "recording payment data...",
		  textVisible: true,
		  theme: "a",
		});
		
		var $payerId = getUrlVars()["PayerID"];
		var $token = getUrlVars()["token"];
		//console.log('p id = '+$payerId);
		$.mobile.showPageLoadingMsg();
		//console.log('enter confirm payment');
		//$('#paymentconfirm').dialog('close');
		
		//console.log('confimr payment');
		$.ajax({
			type: "GET",
			url: "phpfiles/confirmpayment.php?PayerID="+$payerId+"&token="+$token,
			cache: false,
			async:false,
			success: onConfirmPaymentSuccess,
			error: onConfirmPaymentError
		});
	}
			return false;			

}
 /*!
 * Callback function on confirm payment success
 *
 * dependancy: jQuery
 *
 * Date: 2013-07-10T18:36
 */
 function onConfirmPaymentSuccess(data, status)
{

	$.ajax({
		type: "POST",
		url: "phpfiles/getsubscriptions.php",
		cache: false,
		async:false,
		data: {
			login : sessionStorage.login,
		},
		
		success: function(dataS, statusS){
		$response = JSON.parse(dataS);
		$response.userType = sessionStorage.userType;


		sessionStorage.currentSubscriptions = JSON.stringify($response);
		},
		error: function(){
		alert("error getting your options!");
		}
	});
	
	$.mobile.loading( "hide" );
	
	sessionStorage.hashcode="";
	
	initOptionCart();
	 //console.dir(data);
	$response = JSON.parse(data);
	//console.dir($response);
	sessionStorage.paymentMsg = "";
	sessionStorage.paymentMsg = 'The payment (Transaction ID : '+$response.PAYMENTINFO_0_TRANSACTIONID+') has been confirmed. Thank you!';
	//$payment_msg = "The payment (Transaction ID : "+sessionStorage.paymentID+") has been confirmed. Thank you!";
	// $('[for="confirmpaymentlab"]').text("The payment (Transaction ID : "+$response.PAYMENTINFO_0_TRANSACTIONID+") has been confirmed. Thank you!");
}
 /*!
 * Callback function on confirm payment error
 *
 * dependancy: jQuery
 *
 * Date: 2013-07-10T18:36
 */
function onConfirmPaymentError(xhr, status, error)
{
	// handle an error
	$.mobile.loading( "hide" );

	sessionStorage.hashcode="";	
	
	initOptionCart();
	
	$response = JSON.parse(xhr.responseText);

	if ($response.errors[0].message==null)
	{
		sessionStorage.paymentMsg = "";
		sessionStorage.paymentMsg = "Unexpected error ("+"error name: "+$response.errors[0].name+"  - error message: "+$response.errors[0].message+" - at :"+$response.errors[0].at +")";
		$('[for="confirmpaymentlab"]').text("Unexpected error ("+"error name: "+$response.errors[0].name+"  - error message: "+$response.errors[0].message+" - at :"+$response.errors[0].at +")");
	}
	else
	{
		sessionStorage.paymentMsg = "";
		sessionStorage.paymentMsg = $response.errors[0].message;
		$('[for="confirmpaymentlab"]').text($response.errors[0].message);
	}
	

}

/*!
 * Build list of google ids in PageGoogleId page
 *
 * dependancy: jQuery Mobile
 *
 * Date: 2013-08-09T07:45
 */
function buildGoogleIdList()
{
	if ($("#latitudeid").val()=="" ||  $("#longitudeid").val()=="")
	{
		alert('latitude and longitude fields must be filled!');
		$('#DialogGoogleId').dialog('close');
		return false;
	}
	//Appel à getgoogleid.php
	$.mobile.loading( "show" );
	var $json_str = "";

	$.ajax({
		type: "POST",
		url: "phpfiles/getgoogleid.php",
		cache: false,
		data: {
			lat : sessionStorage.latitudeid,//43.3459740,
			longi : sessionStorage.longitudeid,//3.2191730
		},
		
		success: function(data, status){
		$json_str = JSON.parse(data);

		switch ($json_str.status)
		{
			case "OK":

				for(i=0;i<$json_str.results.length;i++){
					
						var $label = $('<label />').attr({'for':$json_str.results[i].id});
						$label.text($json_str.results[i].name+" "+$json_str.results[i].vicinity);
						
						var $input = $('<input/>').attr({'type':'radio','id':$json_str.results[i].id,'name':'googleid','value':$json_str.results[i].id,'data-gref':$json_str.results[i].reference});
						
						$('#GoogleIdList').append($label);
						$('#GoogleIdList').append($input);

				}
				
				$('#GoogleIdList').trigger('create');			
								
				break;
			
			case "ZERO_RESULTS":
				alert('unable to get ids with these latitude and longitude values!');
				$('#DialogGoogleId').dialog('close');
				break;

			case "OVER_QUERY_LIMIT":
				alert('unable to get ids. The function returns OVER_QUERY_LIMIT. Please contact the webmaster');	
				$('#DialogGoogleId').dialog('close');
				break;
			
			case "REQUEST_DENIED":
				alert('unable to get ids. The function returns REQUEST_DENIED. Please contact the webmaster');	
				$('#DialogGoogleId').dialog('close');
				break;

			case "INVALID_REQUEST":
				alert('unable to get ids. The function returns INVALID_REQUEST. Please contact the webmaster');	
				$('#DialogGoogleId').dialog('close');
				break;	
		}
		//$mobileobj.loading( "hide" );
		$.mobile.loading( "hide" );
			},
			error: function(){
			alert("error getting your google id!");
			}
		});

}  
/*!
 * Set google id in pageMyWorkspace page
 *
 * dependancy: jQuery Mobile
 *
 * Date: 2013-08-10T17:36
 */
function setGoogleId()
{
	sessionStorage.disableUpdateGalData=1;
	$("#googleid").val($('input:radio[name=googleid]:checked').val());
	$("#googleref").val($('input:radio[name=googleid]:checked').attr('data-gref'));

	$('#DialogGoogleId').dialog('close');
}

function testgaldesc()
{
	alert($("#galdesc").html());
	alert($(".jqte_editor").html());
	$text = $(".jqte_editor").html();
	alert($.trim($('<div>').html($(".jqte_editor").html()).text()));
		alert();
}
/*!
 * update Gallery Description form validation
 *
 * dependancy: jQuery, jQuery Validation Plugin
 *
 * Date: 2013-08-20T16:43
 */
function validateFormGalDesc()
{
	//check description length
	$desclength = $.trim($('<div>').html($(".jqte_editor").html()).text()).length;
	
	if ($desclength>$MAX_RAW_DESC_LENGTH)
	{
		alert("The desccription is too long - "+$desclength+" car (>"+$MAX_RAW_DESC_LENGTH+" caracters)");
		return false;
	}
	else
	{
		if ($(".jqte_editor").html().length>$MAX_HTML_DESC_LENGTH)
		{
			alert("The html desccription is too long - "+$(".jqte_editor").html().length+" car (>"+$MAX_HTML_DESC_LENGTH+" caracters)");
		}
		else
		{
                
			$.mobile.showPageLoadingMsg();
			$.ajax({
				type: "POST",
				url: "phpfiles/updateGalDesc.php",
				cache: false,
				data: {
					noGalData : sessionStorage.noGalData,
					galdesc : $(".jqte_editor").html(),
				},
				success: updateGalDescOnSuccess,
				error: updateGalDescOnError
			});
		}
	}
                
            
} 

/*!
 * Callback function on update Gallery Description success
 *
 * dependancy: jQuery
 *
 * Date: 2013-08-20T16:43
 */
 function updateGalDescOnSuccess(data, status)
{

	$.mobile.loading( "hide" );
	sessionStorage.noGalData=0;
	alert("Description updated with success");

}
 /*!
 * Callback function on update Gallery Description error
 *
 * dependancy: jQuery
 *
 * Date: 2013-08-20T16:43
 */
function updateGalDescOnError(xhr, status, error)
{
	// handle an error
	$.mobile.loading( "hide" );
	
	$response = JSON.parse(xhr.responseText);

	if ($response.errors[0].message==null)
	{
		alert("Unexpected error ("+"error name: "+$response.errors[0].name+"  - error message: "+$response.errors[0].message+" - at :"+$response.errors[0].at +")");
	}
	else
	{
		alert($response.errors[0].message);
	}
	

}

/*
*
*Google functions
*
*/

/*!
 * onSuccess Callback function of getGeocode
 *
 * dependancy: jQuery, Google maps
 *
 * Date: 2013-09-17T17:26
 */
function processGeoData(geocodeData){
	$('[for="multipleaddress"]').text("");
	$('#addresslist').empty();
	$('#addresslist').selectmenu('refresh', true);
	if (geocodeData.status=="ZERO_RESULTS") {
		alert('no geocode for this address');
	}
	else
	{
		if (geocodeData.results.length==1) //Only 1 result, so update lat, lng and map
		{
			$('#latitudeid').val(geocodeData.results[0].geometry.location.lat);
			$('#longitudeid').val(geocodeData.results[0].geometry.location.lng);

			$("#mapid").attr('src',"http://maps.googleapis.com/maps/api/staticmap?center="+$('#latitudeid').val()+","+$('#longitudeid').val()+"&zoom=12&size=200x200&markers="+$('#latitudeid').val()+","+$('#longitudeid').val()+"&sensor=false");
		}
		else //several result, so populate select
		{
			$('#addresslist').empty();
			  $('[for="multipleaddress"]').text("there are several locations for this address. Please select one in the list below");
			  $('[for="multipleaddress"]').css('color','#FF0000');			
			for(i=0;i<geocodeData.results.length;i++){
				$('#addresslist').append('<option value='+geocodeData.results[i].geometry.location.lat+','+geocodeData.results[i].geometry.location.lng+'>'+geocodeData.results[i].formatted_address+'</option>');
			$('#addresslist').trigger('change');
			}
		}
	}
}

/*!
 * Refresh coordinates and map when select an address
 *
 * dependancy: jQuery, Google maps
 *
 * Date: 2013-09-17T17:26
 */
function refreshMap()
{
	//console.log($('#addresslist').val());
	var $reg=new RegExp("[ ,]+", "g");
	var $coordarray=$('#addresslist').val().split($reg);
	$('#latitudeid').val($coordarray[0]);
	$('#longitudeid').val($coordarray[1]);	
	$("#mapid").attr('src',"http://maps.googleapis.com/maps/api/staticmap?center="+$('#addresslist').val()+"&zoom=12&size=200x200&markers="+$('#addresslist').val()+"&sensor=false");
	//alert('done');
}
/*!
 * get lat and lng from Google using address
 *
 * dependancy: jQuery, Google maps
 *
 * Date: 2013-09-17T17:26
 */
function getGeocode(){
	var $reg=new RegExp(" ", "g");
	$adr = $.trim($("#street1input").val()).replace($reg,"+")+$.trim($("#street2input").val()).replace($reg,"+");
	$adr = $adr+",+"+$.trim($("#zipcodeinput").val()).replace($reg,"+")+",+"+$.trim($("#cityinput").val()).replace($reg,"+");
	if ($("#selectstate").val()=="XX") //means no sate selected
	{
		$adr = $adr+",+"+$.trim($("#selectcountry").val()).replace($reg,"+");
	}
	else
	{
		$adr = $adr+",+"+$.trim($("#selectstate").val()).replace($reg,"+")+",+"+$.trim($("#selectcountry").val()).replace($reg,"+");
	}
	
	if (sessionStorage.oldMSIE == 'true') {
		$req = "http://maps.googleapis.com/maps/api/geocode/json?address="+$adr+"&sensor=false";//&callback=?";
		xdr = new XDomainRequest();   // Creates a new XDR object.
		xdr.open("GET", $req); // Creates a cross-domain connection with our target server using GET method.
		xdr.send(); //Send string data to server
		xdr.onload = function () { //After load, parse data returned by xdr.responseText           
		processGeoData($.parseJSON(xdr.responseText));};  
		
	}
	else
	{
		$.getJSON("http://maps.googleapis.com/maps/api/geocode/json?address="+$adr,
		{ 
		sensor:false,
		},function(data){processGeoData(data);});	
	}

}


 /*!
 * open detail gallery mobile page
 *
 * dependancy: none
 *
 * Date: 2013-10-20T19:24
 */
function simulatedevice($userlogin,$galname){
	// alert($userlogin);
	window.open('mgaleriesdetails.html?id='+$userlogin+'&galname='+$galname,'_blank',"height=480,width=320,status=no,toolbar=no,location=no,scrollbars=yes");
}

 /*!
 * Search event associated to the user
 *
 * dependancy: none
 *
 * Date: 2013-12-09T16:39
 */
function searchevents()
{
	$.mobile.loading( 'show');
	$('#searcheventsresult').empty();
	$('#searcheventsresult').hide();		
	$.ajax({
		type: "POST",
		url: "phpfiles/getevents.php",
		cache: false,
		data: {
			city : $("#cityeventinput").val(),
			country : $("#selecteventcountry").val(),
			state : $("#selecteventstate").val()
		},
		success: onSearcheventsSuccess,
		error: onSearcheventsError
	});
}

 /*!
 * open addanevent dialog
 *
 * dependancy: none
 *
 * Date: 2013-12-10T09:21
 */
function addeventtouser()
{
	if (typeof($("#searcheventsresult option:selected").val())=='undefined')
	{
		alert('You have to select an event!');
	}
	else if ($('#activationcodeinput').val()=='')
	{
		alert('You have to enter an activation code!');
	}
	else{
		$.mobile.loading( "show" );
	
		$.ajax({
			type: "POST",
			url: "phpfiles/addeventouser.php",
			cache: false,
		data: {
			eventid : $("#searcheventsresult").val(),
			activationcode : $("#activationcodeinput").val(),
		},			
			success: onAddeventouserSuccess,
			error: onAddeventouserError
		});
	}
}

/*!
 * delete gallery-event assosciation
 *
 * dependancy: none
 *
 * Date: 2013-12-11T08:21
 */
function delgalleryevent($eventodel,$eventname)
{
	if (confirm('Are you sur you want to remove this event ('+$eventname+') ?'))
	{
		$.mobile.loading( "show" );
	
		$.ajax({
			type: "POST",
			url: "phpfiles/delgalleryevent.php",
			cache: false,
		data: {
			eventid : $eventodel,
		},			
			success: onDelgalleryeventSuccess,
			error: onDelgalleryeventError
		});
	}
}

/*!
 * Callback function on searchevents sucess
 *
 * dependancy: jQuery
 *
 * Date: 2013-12-10T07:02
 */
function onSearcheventsSuccess(data, status){
var $startDate;
var $endDate;

 
	data = $.trim(data);
	$.mobile.loading( "hide" );

	$response = JSON.parse(data);
	
	//console.log($response.length);
	for(i=0;i<$response.length;i++){
		$startDate = moment($response[i].EVE_START_DATE);
		$endDate = moment($response[i].EVE_END_DATE);
		$('#searcheventsresult').append('<option value="' +$response[i].EVE_ID+ '">'+$response[i].EVE_NAME+' : '+$startDate.format("dddd, MMMM Do YYYY")+' - '+$endDate.format("dddd, MMMM Do YYYY")+', '+$response[i].EVE_TOWN+'</option>');
	}
	$('#searcheventsresult').selectmenu('refresh', true);
	$('#searcheventsresult').css('display','block');	
	$('#searcheventsresult').css('visibility','visible');
	$('#alleventsnumber').html('Search result: '+$response.length+' event(s) found');

}

/*!
 * Callback function on delgalleryevent sucess
 *
 * dependancy: jQuery
 *
 * Date: 2013-12-11T09:22
 */
function onDelgalleryeventSuccess(data, status){
	$.mobile.loading( "hide" );
	alert('Event successfully removed !');
	getGalleryEventsData();
}
/*!
 * Callback function on Addeventouser sucess
 *
 * dependancy: jQuery
 *
 * Date: 2013-12-10T07:02
 */
function onAddeventouserSuccess(data, status){
	$.mobile.loading( "hide" );
	alert('Event successfully added !');
}

/*!
 * Callback function on Addeventouser error
 *
 * dependancy: jQuery
 *
 * Date: 2013-12-10T07:02
 */
function onAddeventouserError(xhr, status, error){
	// handle an error
	$.mobile.loading( "hide" );

	$response = JSON.parse(xhr.responseText);

	if ($response.errors[0].message==null)
	{
		alert("Unexpected error ("+"error name: "+$response.errors[0].name+"  - error message: "+$response.errors[0].message+" - at :"+$response.errors[0].at +")");
	}
	else
	{
		alert($response.errors[0].message);
	}
}
/*!
 * Callback function on delgalleryevent error
 *
 * dependancy: jQuery
 *
 * Date: 2013-12-11T09:22
 */
function onDelgalleryeventError(xhr, status, error){
	// handle an error
	$.mobile.loading( "hide" );

	$response = JSON.parse(xhr.responseText);

	if ($response.errors[0].message==null)
	{
		alert("Unexpected error ("+"error name: "+$response.errors[0].name+"  - error message: "+$response.errors[0].message+" - at :"+$response.errors[0].at +")");
	}
	else
	{
		alert($response.errors[0].message);
	}
}

/*!
 * Callback function on searchevents error
 *
 * dependancy: jQuery
 *
 * Date: 2013-12-10T07:02
 */
function onSearcheventsError(xhr, status, error){
	// handle an error
	$.mobile.loading( "hide" );

	$response = JSON.parse(xhr.responseText);

	if ($response.errors[0].message==null)
	{
		alert("Unexpected error ("+"error name: "+$response.errors[0].name+"  - error message: "+$response.errors[0].message+" - at :"+$response.errors[0].at +")");
	}
	else
	{
		if ($response.errors[0].name!='EVENTS_NOT_FOUND')
		{
			alert($response.errors[0].message);
		}
		else
		{
			$('#alleventsnumber').html('Search result: No event found');
		}
	}
}

/*!
 * Callback function on get account data sucess
 *
 * dependancy: jQuery
 *
 * Date: 2013-07-24T18:43
 */
function onGetAccountDataSuccess(data, status){
	data = $.trim(data);
	jQuery.mobile.hidePageLoadingMsg();

	$response = JSON.parse(data);

	//Update form with db data
	//Add the form id to prevent jqm confusion after account creation (in this case jqm "sees" fields of the create account page, 
	//not the myworkspace ones
	$("#updateaccountform #selectnativeAreU option[value='']").attr('selected',false);
	$("#updateaccountform #selectnativeAreU option[value='"+$response[0].ACT_TYPE+"']").attr('selected',true);
	$("#updateaccountform #selectnativeAreU").selectmenu("refresh");
	
	if ($response[0].ACT_EMAIL=="null")
	{
		$('#updateaccountform #email1').val("");
		$('#updateaccountform #email2').val("");		
	}
	else
	{
		$('#updateaccountform #email1').val($response[0].ACT_EMAIL);
		$('#updateaccountform #email2').val($response[0].ACT_EMAIL);
	}
	
	if ($response[0].ACT_FIRSTNAME=="null")
	{
		$('#updateaccountform #fnameinput').val("");
	}
	else
	{
		$('#updateaccountform #fnameinput').val($response[0].ACT_FIRSTNAME);
	}
	
	if ($response[0].ACT_LASTNAME=="null")
	{
		$('#updateaccountform #lnameinput').val("");
	}
	else
	{
		$('#updateaccountform #lnameinput').val($response[0].ACT_LASTNAME);
	}

	if ($response[0].ACT_GALLERYNAME=="null")
	{
		$('#updateaccountform #galnameinput').val("");
		sessionStorage.galname="";
	}
	else
	{
		$('#updateaccountform #galnameinput').val($response[0].ACT_GALLERYNAME);
		sessionStorage.galname=$response[0].ACT_GALLERYNAME;
	}
	
	if ($response[0].ACT_ADRESSSTREET_1=="null")
	{
		$('#updateaccountform #street1input').val("");
	}
	else
	{
		$('#updateaccountform #street1input').val($response[0].ACT_ADRESSSTREET_1);
	}
	
	if ($response[0].ACT_ADRESSSTREET_2=="null")
	{
		$('#updateaccountform #street2input').val("");
	}
	else
	{
		$('#updateaccountform #street2input').val($response[0].ACT_ADRESSSTREET_2);
	}
	
	if ($response[0].ACT_ZIPCODE=="null")
	{
		$('#updateaccountform #zipcodeinput').val("");
	}
	else
	{
		$('#updateaccountform #zipcodeinput').val($response[0].ACT_ZIPCODE);
	}
	
	if ($response[0].ACT_ADRESSCITY=="null")
	{
		$('#updateaccountform #cityinput').val("");
	}
	else
	{
		$('#updateaccountform #cityinput').val($response[0].ACT_ADRESSCITY);
	}
	
	if ($response[0].ACT_COUNTRY!="null")
	{
		$("#updateaccountform #selectcountry option[value='']").attr('selected',false);
		$("#updateaccountform #selectcountry option[value='"+$response[0].ACT_COUNTRY+"']").attr('selected',true);
		$("#updateaccountform #selectcountry").selectmenu("refresh");
	}

	if ($response[0].ACT_STATE!="XX")
	{
		$("#updateaccountform #selectstate option[value='']").attr('selected',false);
		$("#updateaccountform #selectstate option[value='"+$response[0].ACT_STATE+"']").attr('selected',true);
		$("#updateaccountform #selectstate").selectmenu("refresh");
	}

	if ($response[0].ACT_URL=="null")
	{
		$('#updateaccountform #url1').val("");
	}
	else
	{
		$('#updateaccountform #url1').val($response[0].ACT_URL);
	}	
	if ($response[0].ACT_TEL_NUMBER=="null")
	{
		$('#updateaccountform #telinput').val("");
	}
	else
	{
		$('#updateaccountform #telinput').val($response[0].ACT_TEL_NUMBER);
	}	
}

 /*!
 * Forcing authentication when opening MyWorkspace Page
 *
 * dependancy: jQuery
 *
 *because it binds mobileinit, reference to this js must be placed before jQuery Mobile call. See pagehide API doc
 *
 * Date: 2013-06-15T17:26
 */
$(document).on("mobileinit", function(){



	$( document ).on( "pageinit", function( event, ui ) {
		showHideSignInOutButton();
		if (event.target.id=="pageConnexion")
		{
			initLoginFormSubmitButon();
		}
	
	});
	
	$( document ).on( "pagebeforeshow", function( event, ui ) {
	});

	$( document ).on( "pageshow", function( event, ui ) {
	//console.log("page show : "+event.target.id);
		sessionStorage.currentPage = event.target.id;
		showHideSignInOutButton();
		
		if (event.target.id=="PagePrinc")
		{
			if ($('html').is('.ie6, .ie7, .ie8, .ie9')) {
				sessionStorage.oldMSIE = true;
				//alert('old msie');
			}
			else
			{
				//alert('new msie or not msie');
				sessionStorage.oldMSIE = false;
			}
				
			$token = getUrlVars()["token"]
			
			if ($token!==undefined)
			{
				$.mobile.changePage( "/cancelpayment.html", { role: "dialog",transition: "pop",reloadPage:true,changeHash:false } );
			
			}			
		}
		
		if (event.target.id=="pageMyWorkspace")
		{
			$tableEvents[sessionStorage.currentPage]="#galleryeventslist";
		//handle galDataExpanded flag in order to expand or not #galdatacollapsible after a submit
			$( "#galdatacollapsible" ).on( "expand", function( event, ui ) {sessionStorage.galDataExpanded=1;} );
			$( "#galdatacollapsible" ).on( "collapse", function( event, ui ) {sessionStorage.galDataExpanded=0;} );	
			
			testSessionAndChangePage();
			if ($(".jqte_editor").length == 0) //to prevent jqte_editor object being removed after choosing googleid
			{
				//create jquery text editor
				$("#galdescript").jqte({
					"status" : true,
					"source": false,
					"rule": false,
					"right": false,
					"outdent": false,
					"indent": false,
					"ol": false,
					"left": false,
					"link": false,
					"center": false,
					"ul": false,
					"unlink": false,
					"strike": false
					});
			}
			if (sessionStorage.currentSubscriptions !=null && sessionStorage.currentSubscriptions !="")
			{

				updateMyWSPage();
			}

			if (sessionStorage.galDataExpanded==1)
			{
				$('#galdatacollapsible').trigger('expand');
			}
			initPaymentSubmitButon();
			validateFormLatLong();
			validateFormGoogleId();
			validateFormUpdatePassword();
			validateFormUpdateAccount();	
			$optionsCart[4] = sessionStorage.login;
			
			$('#simulatedevicebutton').attr('onclick','simulatedevice("'+sessionStorage.galid+'","'+sessionStorage.galname+'")');
		}
		
		if (event.target.id=="createAccount")
		{
			if (sessionStorage.disableAccountCreation!="true")
			{
				$("#createaccountform").css('visibility','visible');
				$("#createaccountform").css('display','block');
				$("#create-error-lab").hide();
				$("#create-required-lab").hide();
				$("#create-success-lab").hide();
				$("#selectnativeAreU").focus();
				validateFormCreateAccount();
			}
			else
			{
				//I prefer that instead of hiding/showing the button in the navbar on all pages
				$("#create-success-lab").html('You need to sign out before creating an account');
				$("#createaccountform").hide();
				$("#create-error-lab").hide();
				$("#create-required-lab").hide();
				$("#create-success-lab").css('visibility','visible');
				$("#create-success-lab").css('display','block');				
			}
		}
		if (event.target.id=="createMessage")
		{
			$("#createmessageform").css('visibility','visible');
			$("#createmsg-error-lab").hide();
			$("#createmsg-success-lab").hide();		
			validateFormCreateMessage();
			$('#fnamemsginput').val(sessionStorage.fname);
			$('#lnamemsginput').val(sessionStorage.lname);
			$('#emailmsginput').val(sessionStorage.email);
		}
		
		if (event.target.id=="forgotpassword")
		{
			validateFormSendNewPassword();
		}		
		
		if (event.target.id=="cancelPayment")
		{
			cancelPayment();
			//Remove pp dialog frame
			if (window != top) {
				top.location.href='cancelpayment.html';
			}	
			
			//display payment cancelation msg
			 $('[for="cancelpaymentlab"]').text(sessionStorage.paymentMsg);
			
		}
		
		if (event.target.id=="confirmPayment")
		{
			confirmPayment();

			//Remove pp dialog frame
			if (window != top) {
				top.location.href='confirmpayment.html';
			}	
			
			//display payment confirmation msg with Payment ID
			 $('[for="confirmpaymentlab"]').text(sessionStorage.paymentMsg);
			
		}
	
		if (event.target.id=="pageDeconnexion")
		{
			disconnectpage();
		}	
		if (event.target.id=="DialogGoogleId")
		{
			buildGoogleIdList();
		}		
		if (event.target.id=="paymentconfirm")
		{
			// console.log("paymentconfirm");
			$("#container").html($pp_div);
			$("#ppcontainer").trigger('create');
		}		
		
	});

});
