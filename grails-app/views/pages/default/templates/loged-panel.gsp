<g:set var="userLoggedIn" value="true" scope="session" />
  	<div id="student-login" class="well">
  		<h3><g:message code="homepanel.welcome"/>&nbsp;<span><g:message code="homepanel.student"/></span></h3>
  		<p><g:message code="homepanel.department"/></p>
  		<a id="create-magazine" href="<cgrails:switch_singlepage action="home"/>" class="btn"><span>&nbsp;&nbsp;<g:message code="homepanel.createmagazine"/>&nbsp;&nbsp;</span></a>
  		<a id="resume-magazine" href="<cgrails:switch_singlepage action="home"/>?id=resume" class="btn"><span>&nbsp;&nbsp;<g:message code="homepanel.resume.magazine"/>&nbsp;&nbsp;</span></a>  		
  	</div>
  	<div id="magazine-details-container" class="well scroll-pane">
   		<table class="table" id="magazine-details">
   			<thead>
				<tr>
					<th colspan="2"><h3><g:message code="homepanel.existing.magazine"/><span><g:message code="homepanel.existing.magazine.no"/></span></h3> </th>									
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>1.&nbsp;<p class="bold"><g:message code="homepanel.magazine.title1"/></p>&nbsp;<p class="italic">(3 <g:message code="homepanel.slides"/> )</p></td>									
					<td><a href="<cgrails:switch_singlepage action="home"/>?id=my_animals" class="btn"><g:message code="homepanel.button.open"/></a></td>
				</tr>
				<tr>
					<td>2.&nbsp;<p class="bold"><g:message code="homepanel.magazine.title2"/></p>&nbsp;<p class="italic">(3 <g:message code="homepanel.slides"/> )</p></td>								
					<td> <a  href="<cgrails:switch_singlepage action="home"/>?id=untitled_1" class="btn"><g:message code="homepanel.button.open"/></a></td>
				</tr>
				<tr>
					<td>3.&nbsp;<p class="bold"><g:message code="homepanel.magazine.title3"/></p>&nbsp;<p class="italic">(3 <g:message code="homepanel.slides"/> )</p></td>								
					<td> <a  href="<cgrails:switch_singlepage action="home"/>?id=untitled_2" class="btn"><g:message code="homepanel.button.open"/></a></td>
				</tr>
				<tr>
					<td>4.&nbsp;<p class="bold"><g:message code="homepanel.magazine.title4"/></p>&nbsp;<p class="italic">(3  <g:message code="homepanel.slides"/> )</p></td>								
					<td> <a  href="<cgrails:switch_singlepage action="home"/>?id=my_photos" class="btn"><g:message code="homepanel.button.open"/></a></td>
				</tr>
				<tr>
					<td>5.&nbsp;<p class="bold"><g:message code="homepanel.magazine.title5"/></p>&nbsp;<p class="italic">(3 <g:message code="homepanel.slides"/> )</p></td>								
					<td> <a  href="<cgrails:switch_singlepage action="home"/>?id=my_new_animals" class="btn"><g:message code="homepanel.button.open"/></a></td>
				</tr>
			</tbody>
		</table>
  	</div>