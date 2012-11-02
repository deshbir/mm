<%@ page import="com.compro.cgrails.CgrailsUtils" %>
<g:set var="workflow" value="${CgrailsUtils.getWorkflow()}"/>
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
			    <a class="btn" href="javascript:;" onClick="com.compro.application.mm.movePrevSlide();"><i class="icon-backward"></i></a>
			    <a class="btn" href="#"><i class="icon-play"></i></a>
			    <a class="btn" href="javascript:;" onClick="com.compro.application.mm.moveNextSlide();"><i class="icon-forward"></i></a>
			</div>

		  <div id="the-slide">

	      </div>
		  <p class="copyright-info"><g:message code="copyright.info"/> 2012 National Geographic Learning, Cengage Learning</p>
		</div>

		<div class="right col accordion" id="toolbar">
        </div>
       <!-- Right col ends -->
       
       	<script language="javascript">    
       	<g:if test="${workflow.equals('offline')}">

	       	function extractParam( name ){
	       		name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");  
	       		var regexS = "[\\?&]"+name+"=([^&#]*)";  
	       		var regex = new RegExp( regexS );  
	       		var results = regex.exec( window.location.href ); 
	       		if( results == null )    return "";  
	       		else    return results[1];
		     }

	    	if (extractParam('resume')== 'true') {
			   com.compro.magazine = {
				   customMagazineName : "resume"
				};
			 } else {
				com.compro.magazine = { 
					customMagazineName : {"name": "my_animals","jsonString":"[{'pickList':[{'properties':{'handler':'com.compro.ppt.Image','items':[{'raphaelType':'rect','raphaelAttributes':{'x':193,'y':38.5,'width':133,'height':93,'r':2,'fill':'#CBD63C','stroke':'#CBD63C'}},{'raphaelType':'image','raphaelAttributes':{'x':194,'y':39.5,'width':131,'height':91,'cursor':'move','src':'images/magazine/photos/african_wildlife/684574.jpg'}}],'source':'images/magazine/photos/african_wildlife/684574.jpg','thumbnail':'images/magazine/photos/african_wildlife/684574_thumb.jpg','raphaelAttributes':{'width':131,'height':91},'context':{'height':990,'width':762}}},{'properties':{'handler':'com.compro.ppt.Image','items':[{'raphaelType':'rect','raphaelAttributes':{'x':177,'y':167.5,'width':133,'height':93,'r':2,'fill':'#CBD63C','stroke':'#CBD63C'}},{'raphaelType':'image','raphaelAttributes':{'x':178,'y':168.5,'width':131,'height':91,'cursor':'move','src':'images/magazine/photos/african_wildlife/684574.jpg'}}],'source':'images/magazine/photos/african_wildlife/684574.jpg','thumbnail':'images/magazine/photos/african_wildlife/684574_thumb.jpg','raphaelAttributes':{'width':131,'height':91},'context':{'height':990,'width':762}}}],'currentH':990,'currentW':762}]"}
				};
			 }
		</g:if>
       	<g:else>
		    <g:if test="${name.equals('resume') || name.equals('')}">
		   		com.compro.magazine = { 
						customMagazineName : "${name}"
					};
		    </g:if>
		    <g:else>
		    	com.compro.magazine = { 
						customMagazineName : ${name}
					};
		    </g:else>		
		 </g:else>
		</script>	
	</body>
</html>