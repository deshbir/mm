grails.servlet.version = "2.5" // Change depending on target container compliance (2.5 or 3.0)
grails.project.class.dir = "target/classes"
grails.project.test.class.dir = "target/test-classes"
grails.project.test.reports.dir = "target/test-reports"
grails.project.target.level = 1.6
grails.project.source.level = 1.6
//grails.project.war.file = "target/${appName}-${appVersion}.war"

grails.project.dependency.resolution = {
    // inherit Grails' default dependencies
    inherits("global") {
        // specify dependency exclusions here; for example, uncomment this to disable ehcache:
        // excludes 'ehcache'
    }
    log "error" // log level of Ivy resolver, either 'error', 'warn', 'info', 'debug' or 'verbose'
    checksums true // Whether to verify checksums on resolve

    repositories {
        inherits true // Whether to inherit repository definitions from plugins

        grailsPlugins()
        grailsHome()
        grailsCentral()

        mavenLocal()
        mavenCentral()

        // uncomment these (or add new ones) to enable remote dependency resolution from public Maven repositories
        //mavenRepo "http://snapshots.repository.codehaus.org"
        //mavenRepo "http://repository.codehaus.org"
        //mavenRepo "http://download.java.net/maven/2/"
        //mavenRepo "http://repository.jboss.com/maven2/"
    }
    dependencies {
        // specify dependencies here under either 'build', 'compile', 'runtime', 'test' or 'provided' scopes eg.

        runtime 'mysql:mysql-connector-java:5.1.20'
    }

    plugins {
		
        runtime ":hibernate:$grailsVersion"
        runtime ":jquery:1.7.2"
		runtime ":resources:1.2.RC2"  //Cgrails needs Resources plugin version 1.2.RC2. 
		runtime ":cache-headers:1.1.5"  //Provides support for caching expiry headers for static resources.
		runtime ":zipped-resources:1.0" //Provides support for GZIPPED static resources.
		runtime ":cached-resources:1.0" //Provides support for caching expiry headers for static resources.
		runtime ":yui-minify-resources:0.1.5" //Provides support for minifying static resources.
		runtime	":cloud-foundry:1.2.3" //The Cloud Foundry plugin for Grails integrates Cloud Foundry's cloud deployment services.
		runtime	":grails-melody:1.13" //JavaMelody Grails Plugin
		runtime	":google-analytics:2.0" //plugin provides a simple taglib to embed Google Analytics pageview tracking to your Grails application.
        //Uncomment these (or add new ones) to enable additional resources capabilities
        //runtime ":zipped-resources:1.0"
        //runtime ":cached-resources:1.0"
        //runtime ":yui-minify-resources:0.1.4"

        build ":tomcat:$grailsVersion"

        runtime ":database-migration:1.1"

        compile ':cache:1.0.0'
    }
}
grails.plugin.location.'cgrails' = "../cgrails"