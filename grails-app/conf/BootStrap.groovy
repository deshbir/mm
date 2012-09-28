import com.cengage.mm.Tool

class BootStrap {

    def init = { servletContext ->
		// Check whether the test data already exists.
		if (!Tool.count()) {
			new Tool(id: "photo", name: "Photos").save(failOnError: true)
			new Tool(id: "video", name: "Videos").save(failOnError: true)
			new Tool(id: "audio", name: "Audios").save(failOnError: true)
			new Tool(id: "editor", name: "Editor").save(failOnError: true)
		}
    }
    def destroy = {
    }
}
