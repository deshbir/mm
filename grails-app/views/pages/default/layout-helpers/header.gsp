<%@ page import="com.compro.cgrails.CgrailsUtils" %>
<%@ page import="com.compro.cgrails.CgrailsConstants" %>

<g:set var="workflow" value="${CgrailsUtils.getWorkflow()}"/>

<g:set var="menu1Link" value="#/menu1"/>
<g:set var="menu2Link" value="#/menu2"/>

<g:if test="${workflow == CgrailsConstants.WORKFLOW_TRADITIONAL}">
	<g:set var="menu1Link" value="../menu1/"/>
	<g:set var="menu2Link" value="../menu2/"/>
</g:if>

<ul class="header">
	<li class="menu"><a href="${menu1Link}">Menu 1</a></li>
	<li class="menu"><a href="${menu2Link}">Menu 2</a></li>
</ul>
					