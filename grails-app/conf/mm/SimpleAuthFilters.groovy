package mm

import grails.util.Environment

class SimpleAuthFilters {
    def USERNAME = "ngl2012"
    def PASSWORD = "ngl2012"

    static filters = {
        httpAuth(uri:"/**") {
            before = {
				
				def result
				Environment.executeForCurrentEnvironment {
					development {
						result = 'DEV'
					}
				production {
						result = 'PROD'
					}
				}
				//No Authentication required for Dev Environment
				if (result.equalsIgnoreCase("DEV"))
					return true

				def authHeader = request.getHeader('Authorization')
				
                if (authHeader) {
                    def usernamePassword = new String(authHeader.split(' ')[1].decodeBase64())
                    if (usernamePassword == "$USERNAME:$PASSWORD") {
                        return true
                    }
                }
                response.setHeader('WWW-Authenticate', 'basic realm="ngl-demos"')
                response.sendError(response.SC_UNAUTHORIZED)
                return false
            }
        }
    }
}