$(document).ready(function() { 
	if(($(window).height()-$(".navbar").height()-20) > $(".container-div").height()) {
		$(".spiral-div").height($(window).height()- $(".navbar").height()-10);
    } else {
    	$(".spiral-div").height($(".container-div").height());
    }
	if (loggedIn) {
		getLoggedintemplate();
	} else {
		getLogOuttemplate();
	}
	
	$('a[rel*="popover"]').popover({
	    trigger: 'click',
	    title: "Title",
	    verticalOffset: 1,
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
		$("#userInfo").css("display", "block");		
}

function getLogOuttemplate() {
	TemplateManager.get('login-panel', 
		function(template){
			$(".login-panel").html(template);
	});
	$("#userInfo").css("display", "none");
}