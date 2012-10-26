<g:set var="userLoggedIn" value="true" scope="session" />
  	<div id="student-login" class="well">
  		<h3><g:message code="homepanel.welcome"/><span><g:message code="homepanel.student"/></span></h3>
  		<p><g:message code="homepanel.department"/></p>
  		<a id="create-magazine" href="<cgrails:switch_singlepage action="home"/>" class="btn"><span><g:message code="homepanel.createmagazine"/></span></a>
  	</div>
  	<div id="magazine-details-container" class="well scroll-pane">
   		<table class="table" id="magazine-details">
   			<thead>
				<tr>
					<th colspan="2"><h3><g:message code="homepanel.existing.magazine"/> <span><g:message code="homepanel.existing.magazine.no"/></span></h3> </th>									
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>1.&nbsp;<b><g:message code="homepanel.magazine.title1"/></b> <i><g:message code="homepanel.slides1"/></i></td>									
					<td><a href="<cgrails:switch_singlepage action="home"/>" class="btn"><span><g:message code="homepanel.button.open"/></span></a></td>
				</tr>
				<tr>
					<td>2.&nbsp;<b><g:message code="homepanel.magazine.title2"/></b><i><g:message code="homepanel.slides2"/></i></td>								
					<td> <a  href="<cgrails:switch_singlepage action="home"/>" class="btn"><span><g:message code="homepanel.button.open"/></span></a></td>
				</tr>
				<tr>
					<td>3.&nbsp;<b><g:message code="homepanel.magazine.title2"/></b><i><g:message code="homepanel.slides2"/></i></td>								
					<td> <a  href="<cgrails:switch_singlepage action="home"/>" class="btn"><span><g:message code="homepanel.button.open"/></span></a></td>
				</tr>
			</tbody>
		</table>
  	</div>