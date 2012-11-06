<!-- Modal -->
<g:if test="${!workflow.equals('offline')}">
	<div id="download-win-modal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	  <div class="modal-header">
	    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
	    <h3 id="download-modal-label"><g:message code="modal.download.win.header"/></h3>
	  </div>
	  <div class="modal-body">
	  <g:message code="modal.download.win.body"/>
	  </div>
	  <div class="modal-footer">
	    <button class="btn-large" data-dismiss="modal" aria-hidden="true"><g:message code="modal.download.close"/></button>
	    <button onclick="window.location='http://www.comprotechnologies.com/mm/offline/mm-win32-offline.exe'"class="btn-large" data-dismiss="modal" aria-hidden="true" id="download-confirm"><g:message code="modal.download.confirm"/></button>
	  </div>
	</div>
	<div id="download-mac-modal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	  <div class="modal-header">
	    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
	    <h3 id="download-modal-label"><g:message code="modal.download.mac.header"/></h3>
	  </div>
	  <div class="modal-body">
	  <g:message code="modal.download.mac.body"/>
	  </div>
	  <div class="modal-footer">
	    <button class="btn-large" data-dismiss="modal" aria-hidden="true"><g:message code="modal.download.close"/></button>
	    <button onclick="window.location='http://www.comprotechnologies.com/mm/offline/mm-offline-macosx.dmg'"class="btn-large" data-dismiss="modal" aria-hidden="true" id="download-confirm"><g:message code="modal.download.confirm"/></button>
	  </div>
	</div>
	<div id="download-ios-modal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	  <div class="modal-header">
	    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
	    <h3 id="download-modal-label"><g:message code="modal.download.ios.header"/></h3>
	  </div>
	  <div class="modal-body">
	  	<g:message code="modal.download.ios.body"/>
	  </div>
	  <div class="modal-footer">
	    <button class="btn-large" data-dismiss="modal" aria-hidden="true"><g:message code="modal.download.close"/></button>
	  </div>
	</div>
	<div id="download-andro-modal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	  <div class="modal-header">
	    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
	    <h3 id="download-modal-label"><g:message code="modal.download.andro.header"/></h3>
	  </div>
	  <div class="modal-body">
	   <g:message code="modal.download.andro.body"/>
	  </div>
	  <div class="modal-footer">
	    <button class="btn-large" data-dismiss="modal" aria-hidden="true"><g:message code="modal.download.close"/></button>
	  </div>
	</div>
	<div id="unsupported-browser-version-modal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	  <div class="modal-header">
	    <h3 id="download-modal-label"><g:message code="modal.unsupported.browserversion.header"/></h3>
	  </div>
	  <div class="modal-body">
	   <g:message code="modal.unsupported.browserversion.body"/>
	  </div>
	  <div class="modal-footer">
	     <button class="btn-large" id="proceed-button" data-dismiss="modal" aria-hidden="true"><g:message code="modal.unsupported.browserversion.proceed"/></button>
	  </div>
	</div>
</g:if>