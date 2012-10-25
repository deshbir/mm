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
			     <r:img dir="images" file="NG_logo.png" alt="NG-logo-img"/>
				 <p><g:message code="header.national.geogrpahic"/></p>
				 <span><g:message code="header.magazine.maker" /></span>
			</a>
			<div class="nav-collapse">
            <ul class="nav">
				<li class="new-slide"><a href="#" class="btn"><span><g:message code="header.new.page"/></span></a></li>
				<li><a href="<cgrails:switch_singlepage action="home"/>" class="btn"><span><g:message code="header.preview.magazine"/></span></a></li>
				<li class="dropdown">
                    <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                    	<i class="icon-user"></i>
                    	<b class="caret"></b>
                    </a>
                    <ul class="dropdown-menu">
                       <li><a href="#">( <g:message code="header.dropdown.profile"/> )</a></li>
                       <li class="divider"></li>
                       <li><a href="#" data-original-title="Not active in demo" rel="tooltip"><g:message code="header.dropdown.change.password"/></a></li>
                       <li><a href="#" data-original-title="Not active in demo" rel="tooltip"><g:message code="header.dropdown.preferences"/></a></li>
                       <li><a href="/ngldemo/myelt/traditional/logout"><g:message code="header.dropdown.signout"/></a></li>
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
                    	 <li><a href="${contextPath}/default/singlepage/home">Default</a></li>
                         <li><a href="${contextPath}/gray/singlepage/home">Gray</a></li>
                    </ul>
               </li>
            </ul>
          </div>
      </div>
    </div>
</div>			