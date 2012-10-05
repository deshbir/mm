import com.cengage.mm.Tool
import com.cengage.mm.Photo

class BootStrap {

    def init = { servletContext ->
		// Check whether the test data already exists.
		if (!Tool.count()) {
			new Tool(id: "photo", name: "Photos").save(failOnError: true)
			new Tool(id: "video", name: "Videos").save(failOnError: true)
			new Tool(id: "audio", name: "Audios").save(failOnError: true)
			new Tool(id: "editor", name: "Editor").save(failOnError: true)
		}
		
		if (!Photo.count()) {
			new Photo(id:"111", dir:"magazinedata/photos/img/", fullfilename: "pic1.jpg", thumbfilename: "pic1.jpg", alt: "pic1").save(failOnError: true)
			new Photo(id:"222", dir:"magazinedata/photos/img/", fullfilename: "pic2.jpg", thumbfilename: "pic2.jpg", alt: "pic2").save(failOnError: true)
			new Photo(id:"333", dir:"magazinedata/photos/img/", fullfilename: "pic3.jpg", thumbfilename: "pic3.jpg", alt: "pic3").save(failOnError: true)
			new Photo(id:"444", dir:"magazinedata/photos/img/", fullfilename: "pic4.jpg", thumbfilename: "pic4.jpg", alt: "pic4").save(failOnError: true)
		}
		
    }
    def destroy = {
    }
}
