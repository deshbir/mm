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
	 		<textarea id="tinymce-editor" name="tinymce-editor" rows="5" cols="10" onKeyUp="com.compro.application.mm.syncText(this);"></textarea>
	 	</div>
	 	<h5>
	 		<a href="javascript:com.compro.application.mm.textFontIncrease();"  class="btn" title="Increase text size"><span class="font-span">A</span><i class="icon-sort-up"></i></a>
	 		<a href="javascript:com.compro.application.mm.textFontDecrease();" class="btn" title="Decrease text size"><span class="font-span">A</span><i class="icon-sort-down remove-padding"></i></a>
	 	</h5>
</div>