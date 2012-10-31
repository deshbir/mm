<form class="well" action="javascript:login();" method="post"  accept-charset="utf-8" enctype="application/x-www-form-urlencoded">
	<h3><g:message code="homepanel.signin"/></h3>
	<p><g:message code="homepanel.login.text"/></p>
	<input type="email" id="userId" name="userId"  placeholder="<g:message code="homepanel.username"/>"  onfocus="this.value='';" required>
	<input type="password" name="password" placeholder="<g:message code="homepanel.password"/>" onfocus="this.value='';" required>
	<label class="checkbox">
	<input type="checkbox" name="remember"><g:message code="homepanel.remember"/></label>
	<input type="submit" id="login_in_submit" class="btn" value="&nbsp;&nbsp;&nbsp;&nbsp;<g:message code="homepanel.login"/>&nbsp;&nbsp;&nbsp;">
	<span id="login_spinner" style="visibility:hidden"><r:img dir="images/home" file="spinner.gif" style="margin-top: 10px;margin-left: 10px;"/></span>
</form>