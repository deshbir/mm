$(document).ready(function() { 
	$("#login_in").click(function(e) {
		TemplateManager.get('loged-panel', 
			function(template){
				$(".login-panel").html(template);
		});
		$("#userInfo").css("display", "block");
	});
	
	if (loggedIn)
		$("#login_in").trigger('click');
});