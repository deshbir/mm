	<div class="accordion-group">
              <div class="accordion-heading">
                  <a href="#{{toolid}}" data-parent="#toolbar" data-toggle="collapse" class="accordion-toggle">
                     {{name}}
                  </a>
              </div>
              <div class="accordion-body collapse" id="{{toolid}}">
                  <div class="accordion-inner">
                     	<h4>
                     		{{name}}
                     		<span class="btn-group" id="photos-options-span">
							    <button class="btn" type="button" id="my-photos-btn">My Photos</button>
				                <button data-toggle="dropdown" class="btn  active dropdown-toggle" id="library-photos-btn">Library Photos <span class="caret"></span></button>
				                <ul class="dropdown-menu">
				                  <li><a href="#photo/african_wildlife">African Wildlife</a></li>
				                  <li><a href="#photo/ancient_structures">Ancient Structures</a></li>
				                  <li><a href="#photo">Coral Reefs</a></li>
				                  <li><a href="#photo">Egypt</a></li>
				                  <li><a href="#photo">Gorillas</a></li>
				                  <li><a href="#photo">Landscape</a></li>
				                  <li><a href="#photo">Reptiles</a></li>
				                  <li><a href="#photo">Plants</a></li>
				                  <li><a href="#photo">Space</a></li>
				                  <li><a href="#photo">Wonders</a></li>
				                  <li><a href="#photo">Butterflies</a></li>
				                </ul>
						    </span>
                     	</h4>
                     	<p><g:message code="rightpanel.tab.info"/></p>
                     	<div id="library-photos" class="scroll-pane">
                     		<!-- Fill Photo-panel here -->
                     	</div>
                        <div id="my-photos">
                          <button class="btn " type="button">Upload File</button>
                        </div>
                  </div>
              </div>
     </div>
