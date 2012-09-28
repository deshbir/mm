<!doctype html>
<html>
	<head>		
		<meta name="layout" content="magazine_layout">
	</head>
	<body>
        <!-- Slider left pane - showing previews of the main pane, not visible in smaller devices -->
    	<div class="left col scroll-pane" id="leftsidebar">
          <ul>
              <li>
              	<div>
              		<r:img dir="images" file="thumbnail7.jpg" alt="the-slide-img"/>
              		<h6>Article Title</h6>
              	<div>
              </li>
              <li></li>
              <li></li>
          </ul>
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

          <!-- <div id="slide-toggle-div">  -->


		  <div id="the-slide">
		    <r:img dir="images" file="thumbnail7.jpg" alt="the-slide-img"/>
		    <h2>Article Title</h2>
		    <div id="pic-info">
		    	<p> Type here to write about the photo or picture.Type here to write about the photo or picture.Type here to write about the photo or picture.Type here to write about the photo or picture.</p>
		    	<p> Type here to write about the photo or picture.Type here to write about the photo or picture.Type here to write about the photo or picture.Type here to write about the photo or picture.</p>
		    </div>
	      </div>
		  <p class="copyright-info">Copyright 2012 National Geographic Learning, Cengage Learning</p>
		</div>

		<div class="right col accordion" id="toolbar">
        </div>
       <!-- Right col ends -->	
	<body/>
</html>