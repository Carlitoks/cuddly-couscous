Note, these files are DEPRECATED and should be removed in the future.  Instead of these api wrappers, import the API service and use it directly where needed: `import {api} from 'Config/AxiosConfig.js'`

That service is configured during startup with the proper JWT tokens, so it removes the need to import and pass around tokens throughout the app.