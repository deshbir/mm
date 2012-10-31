<%@ page import="com.compro.cgrails.CgrailsUtils" %>
<g:set var="contextPath" value="${request.contextPath}"/>
<g:set var="userLoggedIn" value="${session.userLoggedIn}"/>
<g:set var="workflow" value="${CgrailsUtils.getWorkflow()}"/>
<div class="navbar header-border">
	<div class="navbar-inner">
       	<a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
			<span class="icon-bar"></span>
			<span class="icon-bar"></span>
			<span class="icon-bar"></span>
		</a>
		<a class="brand" href="#">
		     <r:img dir="images" file="NG_logo.png" alt="NG-logo-img" id="ng-img"/>
			 <r:img dir="images" file="NG_logo-black.png" alt="NG-logo-img" id="ng-black-img"/>
 			 <p>NATIONAL GEOGRAPHIC</p>
 			 <span><g:message code="header.magazine.maker" /></span>
		</a>
		<div class="nav-collapse">
         <ul class="nav">
			<li class="new-slide"><a href="#" rel="popover" title="<g:message code="homepanel.information"/>" content="<g:message code="homepanel.information.content"/>" class="btn"><span><g:message code="homepanel.information"/></span></a></li>
			<li><a href="#" class="btn" rel="popover" title="<g:message code="homepanel.help"/>" content="<g:message code="homepanel.content"/>"><span><g:message code="homepanel.help"/></span></a></li>
			<li id="userInfo" class="dropdown" <g:if test="${userLoggedIn != 'true' || workflow.equals('offline')}">style="display:none"</g:if>>
                 <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                 	<i class="icon-user"></i>
                 	<b class="caret"></b>
                 </a>
                 <ul class="dropdown-menu">
                    <li><a href="#">( <g:message code="header.dropdown.profile"/> )</a></li>
                    <li class="divider"></li>
                    <li><a href="#" data-original-title="Not active in demo" rel="tooltip"><g:message code="header.dropdown.change.password"/></a></li>
                    <li><a href="<cgrails:switch_singlepage action="logout"/>"><g:message code="header.dropdown.signout"/></a></li>
                 </ul>
             </li>
            <li class="dropdown">
                <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                	<i class="icon-cog"></i>
                	<b class="caret"></b>
                </a>
                <ul class="dropdown-menu">
                	 <li class="set-paddings">Language</li>
                	 <hr/>
                	 <li><a href="?lang=en">English</a></li>
                     <li><a href="?lang=ar">Arabic</a></li>
                     <li><a href="?lang=ja">Japanese</a></li>
                     <li class="set-paddings">Skin</li>
                     <hr/>
                	 <li><a href="${contextPath}/default/">Default</a></li>
                     <li><a href="${contextPath}/gray/">Gray</a></li>
                </ul>
           </li>
        </ul>
      </div>
  </div>
</div>
