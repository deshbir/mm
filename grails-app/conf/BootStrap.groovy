import groovy.json.JsonSlurper

//import org.grails.plugin.resource.ResourceTagLib

import com.cengage.mm.Photo
import com.cengage.mm.Tool

class BootStrap {

    def init = { servletContext ->
		// Check whether the test data already exists.
		if (!Tool.count()) {
			new Tool(id: "photo", name: "Photos").save(failOnError: true)
			new Tool(id: "layout", name: "Layout, Text and Shapes").save(failOnError: true)
			new Tool(id: "video", name: "Video & Audios").save(failOnError: true)
			new Tool(id: "editor", name: "Editor").save(failOnError: true)
		}
		
		if (!Photo.count()) {
			
			def slurper = new JsonSlurper()
			def allPhotos = slurper.parseText(Photo.jsonPayload)
			allPhotos.ancient_structures.photos.each
			{
				new Photo(dir: it.dir, fullfilename: it.fullfilename , thumbfilename: it.thumbfilename , copyright: it.copyright).save(failOnError: true)
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
