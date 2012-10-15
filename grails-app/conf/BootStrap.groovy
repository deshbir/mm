import groovy.json.JsonSlurper

//import org.grails.plugin.resource.ResourceTagLib

import com.cengage.mm.Photo
import com.cengage.mm.Tool

class BootStrap {

    def init = { servletContext ->
		// Check whether the test data already exists.
		if (!Tool.count()) {
			def slurper = new JsonSlurper()
			def allTools = slurper.parseText(Tool.jsonPayload)
			
			allTools.tools.each
			{
				new Tool(toolid: it.toolid, name: it.name).save(failOnError: true)
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
			def allPhotos = slurper.parseText(Photo.jsonPayload)
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
		
    }
	
    def destroy = {
    }
}
