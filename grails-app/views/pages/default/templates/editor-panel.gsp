<div id="image-editor">
	    <h4>
	 		<g:message code="rightpanel.editortab.imageeditor"/>
	    </h4>
	    <p>
	 	<g:message code="rightpanel.editortab.imageinfo" />
	    </p>
	    <div id="scale-div">
	 		<span><g:message code="rightpanel.editortab.scaleimage"/></span>
	 		<div id="scaler">
	 		    <div></div>
	 			<a id="rectangle" href="#"></a>
	 		</div>
	 	</div>
	 	<div class="border-line"></div>
	 	<div id="scale-div">
	 		<span><g:message code="rightpanel.editortab.opacity"/></span>
	 		<div id="scaler">
	 		    <div></div>
	 			<a id="rectangle" href="#"></a>
	 		</div>
	 	</div>
	 	<div class="border-line"></div>
	 	<div id="rotate-div">
	 		<span><g:message code="rightpanel.editortab.rotateimage"/></span>
	 			<div id="outer-circle">
	 				<p id="circle"></p>
	 				<p id="inner-circle"></p>
	 				<div id="circle-line">
	 				    <p></p>
	 					<p id="green-circle"></p>
	 				</div>
	 			</div>
	 	</div>
	 </div>
	 <div id="text-editor">
	 	<h4>
	 		<g:message code="rightpanel.editortab.texteditor"/>
	 	</h4>
	 	<p>
	 		<g:message code="rightpanel.editortab.textinfo"/>
	 	</p>
	 	<div>
	 		<textarea id="tinymce-editor" name="tinymce-editor" rows="5" cols="10" onKeyUp="com.compro.application.mm.syncText(this);">Lorem ipsum dolo rsit amet,consectetuer adipiscingelit, sed diam nonummy nibh euismod tincidunt ut lao enim ad minim veniam, quis nostrud exerci tation </textarea>
	 	</div>
	 	<h5>
	 		<span id="size-label"><g:message code="rightpanel.editortab.size"/></span>  
	 		<a href="javascript:com.compro.application.mm.textFontIncrease();"  class="btn" title="Increase text size"><span class="font-span">A</span></a>
	 		<a href="javascript:com.compro.application.mm.textFontDecrease();" class="btn" title="Decrease text size"></i><span class="font-span-small">a</span></a>
	 	</h5>
</div>