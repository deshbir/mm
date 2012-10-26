<!doctype html>
<html>
	<head>		
		<meta name="layout" content="home_layout">
	</head>
	<script type="text/javascript">
		var loggedIn = false;
	</script>	
	<body>
		<div class="col container-div">
		    <div class="body-container">
		         <div class="info-panel">
						<div class="animations">
							<r:img dir="images/home" file="animate_img1.png" class="animate-img"/>
							<r:img dir="images/home" file="animate_img.png" class="animate1-img"/>
							<r:img dir="images/home" file="national_geographic.png" class="national-img"/>
						</div>
						<div class="info">
							<div class="header-container">
								<h2 class="create-header"><g:message code="homepanel.create"/>
									<span><g:message code="homepanel.your"/></span>
								</h2>
								<h3><g:message code="homepanel.own"/></h3>
								<h2 class="magazine-header"><g:message code="homepanel.magazine"/></h2>
							</div>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
							</p>
						</div>
					</div>					
					<div class="login-panel">
						<g:if test="${session.userLoggedIn == 'true'}">
							<script type="text/javascript">
								loggedIn = true;
							</script>
						</g:if>
						<form class="well" action="" method="post"  accept-charset="utf-8" enctype="application/x-www-form-urlencoded">
							<h3><g:message code="homepanel.signin"/></h3>
							<p>Lorem ipsum dolor sit amet, conse ctetur adipis icing elit, sed do eiusmod tempor incididunt ut labore</p>
							<input type="text" id="userId" name="userId"  placeholder="Username or Email" value="Username or Email"  onfocus="this.value='';" >
							<input type="text" name="password"  placeholder="Password" value="Password" onfocus="this.value='';">
							<label class="checkbox">
							<input type="checkbox" name="remember"><g:message code="homepanel.remember"/></label>
							<a id="login_in" href="<cgrails:switch_singlepage action="home"/>" class="btn"><span>&nbsp;&nbsp;&nbsp;&nbsp;<g:message code="homepanel.login"/>&nbsp;&nbsp;&nbsp;</span></a>
				   		</form>
			   		</div>
		   	  </div>
		   	  <p class="footer-info"><g:message code="copyright.info"/></p>
		  </div>
		  <div class="spiral-div col">
		  </div> 
	<body/>
</html>