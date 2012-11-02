<!-- Modal -->
<g:if test="${!workflow.equals('offline')}">
	<div id="download-win-modal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	  <div class="modal-header">
	    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
	    <h3 id="download-modal-label">Offline Desktop version (Win32)</h3>
	  </div>
	  <div class="modal-body">
	    <p>You're about to download an <b>Offline Desktop</b> version of Magazine Maker for <b>Windows PC's</b>. Please ensure that your PC conforms to the following minimum requirements, and the select the <b>Download</b>
	    </p>
	    <p>	* Windows XP SP2 (or above) / Windows 7
		<p>	* 1GB RAM or higher</p>
		<p>	* 1024x768 resolution or higher</p>
	  </div>
	  <div class="modal-footer">
	    <button class="btn-large" data-dismiss="modal" aria-hidden="true">Close</button>
	    <button onclick="window.location='http://www.comprotechnologies.com/mm/offline/mm-win32-offline.zip'"class="btn-large" data-dismiss="modal" aria-hidden="true" id="download-confirm">Download</button>
	  </div>
	</div>
	<div id="download-mac-modal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	  <div class="modal-header">
	    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
	    <h3 id="download-modal-label">Offline Desktop version (Mac OSX)</h3>
	  </div>
	  <div class="modal-body">
	    <p>You're about to download an <b>Offline Desktop</b> version of Magazine Maker for <b>Mac PC's</b>. Please ensure that your PC conforms to the following minimum requirements, and the select the <b>Download</b></p>
	    <p>
	    <p>* Snow Leapord (10.6) / Mountain Lion (10.7)</p>
		<p>* 1GB RAM or higher</p>
		<p>* 1024x768 resolution or higher</p>
		</p>
	  </div>
	  <div class="modal-footer">
	    <button class="btn-large" data-dismiss="modal" aria-hidden="true">Close</button>
	    <button onclick="window.location='http://www.comprotechnologies.com/mm/offline/mm-macosx-offline.zip'"class="btn-large" data-dismiss="modal" aria-hidden="true" id="download-confirm">Download</button>
	  </div>
	</div>
	<div id="download-ios-modal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	  <div class="modal-header">
	    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
	    <h3 id="download-modal-label">Mobile App (Apple iOS)</h3>
	  </div>
	  <div class="modal-body">
	    <p>To access Magazine Maker on your Apple iOS (iPad / iPhone) device, launch Safari and open the URL: www.comprotechnologies.com
		<p><b>Minimum Requirement</b></p>
		<p> Any device runnig iOS 5 or higher</p>
		<p><b>Note</b> - Native apps for offline access are currently not available for download. Please contact Compro Technologies for further details.</p>
	  </div>
	  <div class="modal-footer">
	    <button class="btn-large" data-dismiss="modal" aria-hidden="true">Close</button>
	  </div>
	</div>
	<div id="download-andro-modal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	  <div class="modal-header">
	    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
	    <h3 id="download-modal-label">Mobile App (Android)</h3>
	  </div>
	  <div class="modal-body">
	    <p>To access Magazine Maker on your Android device, launch Chrome and open the URL: www.comprotechnologies.com
		<p><b>Minimum Requirement</b></p>
		<p> Any device runnig Android 4.0 or higher</p>
		<p><b>Note</b> - Native apps for offline access are currently not available for download. Please contact Compro Technologies for further details.</p>
	  </div>
	  <div class="modal-footer">
	    <button class="btn-large" data-dismiss="modal" aria-hidden="true">Close</button>
	  </div>
	</div>
</g:if>