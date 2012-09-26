<!doctype html>
<html>
	<head>		
		<meta name="layout" content="layout2">	
	</head>
	<body>
		<r:script type="text/javascript">
			View2.routerInitialize();
			Backbone.history.start();
			if (window.location.hash.length <= 1){
				Backbone.history.navigate("#/menu2", {trigger:true,replace:true});
			} 	
		</r:script>	
	<body/>
</html>