# Solo Mobile App #

## Developing ##

The mobile app will depend on having access to the API server.  To get that running on your local machine you will need to have `docker` installed, then must do the following:

* get the credential json file needed for authorizing with Google, place it at `./.gcp/key.json`
* copy the `api.config.env.dist` to `api.config.env`, and modify accordingly for your local dev environment (if necessary)
* run `make setup` - authorizes via gcloud and logs into GCR
* run `docker-compose up` - starts the api server and supporting services

Once it's up, go to [http://localhost:5002/](http://localhost:5002/) to view the API docs.  Connect to the api server in your own code via `http://solo-api-server:5000/`

When you need to pull a new version of the api server, modify the `docker-compose.yml` accordingly and run `docker-compose pull solo-api`.

The api server will automatically start on port 5000, but the image also has a range of utility commands that you may need to run during development.  You can run those via `docker-compose` directly, or use the makefile, which provides a convenience command:

* `make run-cmd` - print available commands from the solo-api image
* `make run-cmd CMD=db-schema-reset` - run a specific command from the solo-api image
