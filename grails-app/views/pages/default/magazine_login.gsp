<!doctype html>
<html>
	<head>		
		<meta name="layout" content="home_layout">
	</head>
	<script type="text/javascript">
		var loggedIn = false;
	</script>	
	<body>
		<div class="container-div">
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
								<g:message code="homepanel.introduction.text"/>
							</p>
							<p class="intro-text">
								<g:message code="homepanel.introduction.more.text"/>
							</p>
						</div>
					</div>					
					<div class="login-panel">
						<g:if test="${session.userLoggedIn == 'true'}">
							<script type="text/javascript">
								loggedIn = true;
							</script>
						</g:if>

			   		</div>
		   	  </div>
		   	   <div class="footer-info"><hr class="footer"></hr><p><g:message code="copyright.info"/></p></div>
		  </div>
		  <div class="spiral-div col">
		  </div> 
	<body/>
</html>