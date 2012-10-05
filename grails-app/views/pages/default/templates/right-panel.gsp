	<div class="accordion-group">
              <div class="accordion-heading">
                  <a href="#{{id}}" data-parent="#toolbar" data-toggle="collapse" class="accordion-toggle">
                     {{name}}
                  </a>
              </div>
              <div class="accordion-body collapse" id="{{id}}">
                  <div class="accordion-inner">
                     	<h4>
                     		{{name}}
	                      	<span class="btn-group" id="photos-options-span">
							    <button class="btn" type="button" id="my-photos-btn">My Photos</button>
				                <button data-toggle="dropdown" class="btn  active dropdown-toggle" id="library-photos-btn">Library Photos <span class="caret"></span></button>
				                <ul class="dropdown-menu">
				                  <li><a href="#">African Wildlife</a></li>
				                  <li><a href="#">Birds</a></li>
				                  <li><a href="#">Coral Reefs</a></li>
				                  <li><a href="#">Egypt</a></li>
				                  <li><a href="#">Gorillas</a></li>
				                  <li><a href="#">Landscape</a></li>
				                  <li><a href="#">Reptiles</a></li>
				                  <li><a href="#">Plants</a></li>
				                  <li><a href="#">Space</a></li>
				                  <li><a href="#">Wonders</a></li>
				                  <li><a href="#">Butterflies</a></li>
				                </ul>
						    </span>
                     	</h4>
                     	<p> Choose a category of photos to use in your magazine.Then scroll down to view all</p>
                     	<div id="library-photos">
                     		<!-- Fill Photo-panel here -->
                     	</div>
                        <div id="my-photos">
                          <button class="btn " type="button">Upload File</button>
                        </div>
                  </div>
              </div>
     </div>
     <script>
     	    $("#{{id}}").on('show', function () {
     	    	Backbone.history.navigate("#/photo", {trigger:true});
    		})
     </script>
