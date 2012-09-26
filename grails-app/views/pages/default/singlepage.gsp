<!doctype html>
<html>
    <head>
        <meta name="layout" content="singlepage_layout" />
    </head>
    <body>
    	<r:script type="text/javascript">
			View1.routerInitialize();
			View2.routerInitialize();
			Backbone.history.start();
			if (window.location.hash.length <= 1){
				Backbone.history.navigate("#/menu1", {trigger:true,replace:true});
			} 	
		</r:script>	
    </body>
</html>

