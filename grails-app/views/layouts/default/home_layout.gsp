<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ page import="com.compro.cgrails.CgrailsUtils" %>
<g:set var="direction" value="${CgrailsUtils.getOrientation()}" />
<!DOCTYPE html>
<html>
	<head>
	   <title>Magazine Maker Home</title>
		<meta http-equiv="content-type" content="text/html;">
        <meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0;">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta http-equiv="X-UA-Compatible" content="IE=edge"/>	    
		<!--  Javascript includes START in body, make it load in head, you need to specify disposition='head' with r:require-->
		<r:require modules="mmLib"/>
		<!--  Javascript includes END -->		

	    <cgrails:stylesheet src="index"/>
	    <cgrails:environment_setup/>
	    
	    <g:layoutHead/>
		<r:layoutResources/>
				
	</head>
	<body dir="${direction}">
		<g:include view="layout-helpers/header_home.gsp"/>
		<g:layoutBody/>
		<g:include view="layout-helpers/footer.gsp"/>
		<r:layoutResources/>		
	</body>
</html>