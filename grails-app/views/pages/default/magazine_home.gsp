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
    			<a href="#" id="state-clear"><i class="icon-refresh"></i></a> | 
    			<a href="#" id="delete-slide"><i class="icon-trash"></i></a>
    		</div>
    		<div id="collage-scroll" class="scroll-pane">
    			<div id="collage-container"></div>
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
	<body/>
</html>