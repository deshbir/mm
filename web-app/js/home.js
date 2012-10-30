$(document).ready(function() { 
	
	if (loggedIn) {
		getLoggedintemplate();
	} else {
		getLogOuttemplate();
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
		$("#login_in").click(function(e) {
			$('#login_spinner').css("visibility","visible");
			setTimeout(
				function(){
					getLoggedintemplate();
				}
			, 600);
		});
	};
	
	$('a[rel*="popover"]').popover({
	    trigger: 'click',
	    title: "Title",
	    position:'bottom',
	    fadeOut:1000,
	    content:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
	});
	
	$('a[rel*="popover"]').click(function(event) {
		$(this).popover('hideAll');
		event.preventDefault();
		event.stopPropagation();
		var title = $(this).attr('title');
		$(this).popover(
			'title',
			title
		).popover('show');
	});

});