import grails.converters.JSON
import groovy.json.JsonSlurper

import com.cengage.mm.Magazine
import com.cengage.mm.Photo
import com.cengage.mm.Shape
import com.cengage.mm.Text
import com.cengage.mm.Tool

class BootStrap {

    def init = { servletContext ->
		
		String jsonMagazineData = new File(servletContext.getRealPath("/json/magazine/magazines.json")).text
		String jsonToolData = new File(servletContext.getRealPath("/json/magazine/tools.json")).text
		String jsonShapesData = new File(servletContext.getRealPath("/json/magazine/shapes.json")).text
		String jsonTextData = new File(servletContext.getRealPath("/json/magazine/texts.json")).text
		String jsonPhotoData = new File(servletContext.getRealPath("/json/magazine/photo-media.json")).text
		
	
		if (!Magazine.count()) {
			def slurper = new JsonSlurper()
			def allMagazines = slurper.parseText(jsonMagazineData)
			
			allMagazines.magazines.each
			{
				new Magazine(name: it.name, jsonString: it.jsonString).save(failOnError: true)
			}
		}
		
		// Check whether the test data already exists.
		if (!Tool.count()) {
			def slurper = new JsonSlurper()
			def allTools = slurper.parseText(jsonToolData)
			
			allTools.tools.each
			{
				new Tool(toolid: it.toolid, viewName: it.viewName, name: it.name).save(failOnError: true)
			}
			/*
			new Tool(toolid: "photo", name: "Photos").save(failOnError: true)
			new Tool(toolid: "layout", name: "Layout, Text and Shapes").save(failOnError: true)
			new Tool(toolid: "video", name: "Video & Audios").save(failOnError: true)
			new Tool(toolid: "editor", name: "Editor").save(failOnError: true)
			*/
		}
		
		if (!Photo.count()) {
			
			def slurper = new JsonSlurper()
			def allPhotos = slurper.parseText(jsonPhotoData)
			allPhotos.photos.each
			{
				new Photo(category: it.category, dir: it.dir, fullfilename: it.fullfilename , thumbfilename: it.thumbfilename , copyright: it.copyright).save(failOnError: true)
			}
			
			/*
			new Photo(id:"111", dir:"images/magazine/photos/", fullfilename: "pic1.jpg", thumbfilename: "pic1.jpg", alt: "pic1").save(failOnError: true)
			new Photo(id:"222", dir:"images/magazine/photos/", fullfilename: "pic2.jpg", thumbfilename: "pic2.jpg", alt: "pic2").save(failOnError: true)
			new Photo(id:"333", dir:"images/magazine/photos/", fullfilename: "pic3.jpg", thumbfilename: "pic3.jpg", alt: "pic3").save(failOnError: true)
			new Photo(id:"444", dir:"images/magazine/photos/", fullfilename: "pic4.jpg", thumbfilename: "pic4.jpg", alt: "pic4").save(failOnError: true)
			*/
		}

		if (!Text.count()) {
			
			def slurper = new JsonSlurper()
			def allTexts = slurper.parseText(jsonTextData)
			allTexts.texts.each
			{
				new Text(type: it.type, raphaelAttributes: it.raphaelAttributes).save(failOnError: true)
			}
		}
		
		if (!Shape.count()) {
			
			def slurper = new JsonSlurper()
			
			def allShapes = slurper.parseText(jsonShapesData)
			allShapes.shapes.each
			{
				new Shape(type: it.type, shapeConfig:it.shapeConfig, raphaelType: it.raphaelType, raphaelAttributes: it.raphaelAttributes).save(failOnError: true)
			}
		}
		
    }
	
    def destroy = {
    }
}
