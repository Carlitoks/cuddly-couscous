# Solo Mobile App #

## Developing ##

The mobile app will depend on having access to the API server.  To get that runming on your local machine you will need to do the following:

* get the credential json file needed for authorizing with Google, place it at `./.gcp/key.json`
* copy the `api.config.env.dist` to `api.config.env`, and modify accordingly for your local dev environment (if necessary)
* `make setup` - authorizes via gcloud and logs into GCR
* `docker-compose up` - starts the api server and supporting services

Once it's up, go to [http://localhost:5002/] to view the API docs.  Connect to the api server in your own code via `http://localhost:5000/`

If you need to pull a new version of the api server, modify the `docker-compose.yml` and `makefile` accordingly, then run `make pull` to get the latest changes.