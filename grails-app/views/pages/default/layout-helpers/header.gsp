<%@ page import="com.compro.cgrails.CgrailsUtils" %>
<g:set var="workflow" value="${CgrailsUtils.getWorkflow()}"/>
<g:set var="contextPath" value="${request.contextPath}"/>
<div class="header fixed-row">
	<div class="navbar">
		<div class="navbar-inner">
        	<a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</a>
			<a class="brand" href="<cgrails:switch_singlepage action="index"/>">
			     <r:img dir="images" file="NG_logo.png" alt="NG-logo-img" id="ng-img"/>
			     <r:img dir="images" file="NG_logo-black.png" alt="NG-logo-img" id="ng-black-img"/>
				 <p>NATIONAL GEOGRAPHIC</p>
				 <span><g:message code="header.magazine.maker" /></span>
			</a>
			<div class="nav-collapse">
            <ul class="nav">
				<li class="new-slide"><a href="#" class="btn reduce-width"><span><g:message code="header.new.page"/></span></a></li>
				<li><a href="#" rel="popover" title="<g:message code="header.save.page"/>" content="<g:message code="default.feature.not.availble.text"/>" class="btn reduce-width"><span><g:message code="header.save.page"/></span></a></li>
				<li><a href="#" rel="popover" title="<g:message code="header.preview.magazine"/>" content="<g:message code="default.feature.not.availble.text"/>" class="btn reduce-width"><span><g:message code="header.preview.magazine"/></span></a></li>
				<li><a href="#" rel="popover" title="<g:message code="header.share.page"/>" content="<g:message code="default.feature.not.availble.text"/>" class="btn reduce-width"><span><g:message code="header.share.page"/></span></a></li>
				<g:if test="${!workflow.equals('offline')}">
					<li class="dropdown">
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
	                <li class="dropdown" id="settings-item">
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
	                    	 <li><a href="${contextPath}/default/singlepage/home">Default</a></li>
	                         <li><a href="${contextPath}/gray/singlepage/home">Gray</a></li>
		                     <li class="set-paddings">Mobile & Offline</li>
		                     <hr/>
		                	 <li><a href="http://www.comprotechnologies.com/mm/offline/mm-win32-offline.zip">CD (Win32)</a></li>
		                     <li><a href="http://www.comprotechnologies.com/mm/offline/mm-macosx-offline.zip">CD (Mac OSX)</a></li>
		                     <li><a href="javascript:;">Mobile (iOS)</a></li>
		                     <li><a href="http://www.comprotechnologies.com/mm/offline/mm-android-offline.apk">Mobile (An)</a></li>                         
	                    </ul>
	               </li>
	        	</g:if>
            </ul>
          </div>
      </div>
    </div>
</div>			