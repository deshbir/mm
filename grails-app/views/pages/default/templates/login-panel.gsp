<form class="well" action="" method="post"  accept-charset="utf-8" enctype="application/x-www-form-urlencoded">
	<h3><g:message code="homepanel.signin"/></h3>
	<p><g:message code="homepanel.login.text"/></p>
	<input type="text" id="userId" name="userId"  placeholder="Username or Email" value="Username or Email"  onfocus="this.value='';" >
	<input type="text" name="password"  placeholder="Password" value="Password" onfocus="this.value='';">
	<label class="checkbox">
	<input type="checkbox" name="remember"><g:message code="homepanel.remember"/></label>
	<a id="login_in" class="btn"><span>&nbsp;&nbsp;&nbsp;&nbsp;<g:message code="homepanel.login"/>&nbsp;&nbsp;&nbsp;</span></a>
	<span id="login_spinner" style="visibility:hidden"><r:img dir="images/home" file="spinner.gif" style="margin-top: 25px;margin-left: 10px;"/></span>
</form>