<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
	   <title>Magazine Maker</title>
		<meta http-equiv="content-type" content="text/html;">
        <meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0;">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta http-equiv="X-UA-Compatible" content="IE=edge"/>	    
	    
	    <cgrails:stylesheet src="index"/>
	    
	    <g:render template="/initialize" plugin="cgrails"/>
	    
	    <g:layoutHead/>
		<r:layoutResources/>
				
	</head>
	<body>
		<g:include view="layout-helpers/header.gsp"/>
		<g:layoutBody/>
		<g:include view="layout-helpers/footer.gsp"/>
		<!--  Javascript includes START-->
		<r:require modules="mmLib,mmApp"/>
		<r:layoutResources/>
		<!--  Javascript includes END -->
		
	</body>
</html>