<!doctype html>
<html>
	<head>		
		<meta name="layout" content="magazine_layout">
	</head>
	<body>
        <!-- Slider left pane - showing previews of the main pane, not visible in smaller devices -->
    	<div class="left col" id="leftsidebar">
    		<div id="collage-buttonbar">
    			<a href="#" class="new-slide"><i class="icon-check-empty"></i></a> | 
    			<a href="#confirm-modal" data-toggle="modal" id="delete-slide"><i class="icon-trash"></i></a>
    		</div>
    		<div id="collage-scroll" class="scroll-pane">
    			<div id="collage-container"></div>
    		</div>
        </div>        
		<div class="modal hide fade" id="confirm-modal" tabindex="-1" role="dialog" aria-labelledby="confirm-modal-label" aria-hidden="true">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
				<h3 id="confirm-modal-label"><i class="icon-trash"></i> <span><g:message code="leftpanel.delete.heading"/></span> </h3>
			</div>
			<div class="modal-body">
				<p><g:message code="leftpanel.delete.info"/></p>
			</div>
			<div class="modal-footer">
				<button class="btn-large" id="delete-slide-confirm"><g:message code="leftpanel.delete.yes"/></button>
				<button class="btn-large" data-dismiss="modal" aria-hidden="true"><g:message code="leftpanel.delete.no"/></button>
			</div>
		</div>
        <!-- Main Pane where content is painted -->
        <a class="btn" href="#" id="slide-toggle"><i class="icon-caret-left"></i></a>
        <div class="med col scroll-pane" id="main-container">

			<!-- Preview icons panel for Mobile phone OR small devices -->
			<div id="preview-buttons">
			    <a class="btn" href="#"><i class="icon-backward"></i></a>
			    <a class="btn" href="#"><i class="icon-play"></i></a>
			    <a class="btn" href="#"><i class="icon-forward"></i></a>
			</div>

		  <div id="the-slide">

	      </div>
		  <p class="copyright-info"><g:message code="copyright.info"/></p>
		</div>

		<div class="right col accordion" id="toolbar">
        </div>
       <!-- Right col ends -->
       
       	<script language="javascript">
       	com.compro.magazine = { 
	       				customMagazine : '${jsonString}'
	       			};
		</script>	
	</body>
</html>