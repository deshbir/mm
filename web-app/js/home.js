$(document).ready(function() { 
	resizePage();
	if (com.compro.cgrails.WORKFLOW != "offline") {
		if(!isBrowserVersionSupported()) {
			$('#unsupported-browser-version-modal').modal({
					backdrop:false
			});
		};
	}
	//In case of offline directly show logged-in template
	if (com.compro.cgrails.WORKFLOW === "offline") { 
		loggedIn = true; 
	}
	
	if (loggedIn) {
		getLoggedintemplate();
	} else {
		getLogOuttemplate();
	}
	
	$('a[rel*="popover"]').popover({
	    trigger: 'click',
	    title: "Title",
	    verticalOffset: 6,
	    position:'bottom',
	    fadeOut:1000,
	    content:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
	});
	
	$('a[rel*="popover"]').click(function(event) {
		$(this).popover('hideAll');
		event.preventDefault();
		event.stopPropagation();
		var title = $(this).attr('title');
		var content = $(this).attr('content');
		$(this).popover('title',title).popover('content',content).popover('show');
	});
	
});

$(window).resize(function() {
	resizePage();
});

function resizePage() {
	if(($(window).height()-$(".navbar").height()-20) > $(".container-div").height()) {
		$(".spiral-div").height($(window).height()- $(".navbar").height()-10);
    } else {
    	$(".spiral-div").height($(".container-div").height());
    }
}

function login() {
	$('#login_spinner').css("visibility","visible");
	setTimeout(
		function(){
			getLoggedintemplate();
		}
	, 600);
}

// call when Login button is clicked
function getLoggedintemplate() {
	TemplateManager.get('loged-panel', 
			function(template){
				$(".login-panel").html(template);
		});
	if (com.compro.cgrails.WORKFLOW != "offline") {
		$("#userInfo").css("display", "block");
	}
}

function getLogOuttemplate() {
	TemplateManager.get('login-panel', 
		function(template){
			$(".login-panel").html(template);
	});
	$("#userInfo").css("display", "none");
}

function clearStorage() {
	localStorage.removeItem('slideList');
	localStorage.removeItem('ppt_selectedslide');
}

function isBrowserVersionSupported() {
	var browserName = "";
	var supportedBrowsers = {
		    "IE": "9",
		    "Safari": "5.1",
		    "Firefox": "15",
		    "Chrome": "10",
		};
	var userAgent = navigator.userAgent.toLowerCase();
	$.browser.chrome = /chrome/.test(navigator.userAgent.toLowerCase());
	var version = 0;

	// Is this a version of IE?
	if($.browser.msie){
		userAgent = $.browser.version;
		userAgent = userAgent.substring(0,userAgent.indexOf('.'));
		version = userAgent;
		browserName = "IE";
	}

	// Is this a version of Chrome?
	if($.browser.chrome){
		userAgent = userAgent.substring(userAgent.indexOf('chrome/') +7);
		userAgent = userAgent.substring(0,userAgent.indexOf('.'));
		version = userAgent;
		// If it is chrome then jQuery thinks it's safari so we have to tell it it isn't
		$.browser.safari = false;
		browserName = "Chrome";
	}

	// Is this a version of Safari?
	if($.browser.safari){
		userAgent = userAgent.substring(userAgent.indexOf('version/') +8);
		userAgent = userAgent.substring(0,userAgent.indexOf(' '));
		version = userAgent;
		browserName = "Safari";
	}

	// Is this a version of Mozilla?
	if($.browser.mozilla){
		//Is it Firefox?
		if(navigator.userAgent.toLowerCase().indexOf('firefox') != -1){
			userAgent = userAgent.substring(userAgent.indexOf('firefox/') +8);
			userAgent = userAgent.substring(0,userAgent.indexOf('.'));
			version = userAgent;
			browserName = "Firefox";
		}
		// If not then it must be another Mozilla
		else{
		}
	}

	// Is this a version of Opera?
	if($.browser.opera){
		userAgent = userAgent.substring(userAgent.indexOf('version/') +8);
		userAgent = userAgent.substring(0,userAgent.indexOf('.'));
		version = userAgent;
		browserName = "Opera";
	}
	if(parseFloat(version) >= parseFloat(supportedBrowsers[browserName])) {
		return true;
	}
	
}