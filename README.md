# Solo Mobile App #

# Solo Platform API #

## Developing ##

On your local machine you will need the following installed:

* make
* docker + docker-compose
* go (not strictly required, but needed if you want helper tools for your editor)

A few things are required to setup and run the project:

* copy config.env.dist to config.env - these are test environment variables and credentials
* run `mkdir static` in the root of the project to create the static folder for document builds
* run `make deps-update` to install vendor dependencies
* run `make dev-setup-local` to symlink the project directory into the `$GOPATH` on your local machine
* (NOT IMPLEMENTED YET) run `make dev-setup-services` to configure database for service use
* `docker-compose up -d` - start background services
* `make run-server` - build & run the api server

After these commands, you should be able to see something at http://localhost:3000/.  `ctrl+c` to quit.

## Connecting to the GCP Docker Image Repository ##
* ADMINS: After you have been added as a GCP user, run `gcp-auth-admin` and follow the instructions to setup CLI access to the docker image repository
* Run `gpc-connect-test` to ensure your credentials are working properly should return "Listed _some number_ items"

* DEVS: Download and move the key file to the `./gcp_auth_key` then run `gcp-auth-dev` to setup CLI access to the docker image repository
* Run `gpc-setproject` to point `gcloud` to the correct repo

## Using the Makefile ##
The `makefile` provides convenience commands for use while developing:

* `make build` - recompile the binary
* `make run-server"` - recompile the binary & run the api server command
* `make run CMD="another-subcommand"` - recompile the binary and run an arbitrary subcommand
* `make test` - run all the tests
* `make fmt` - run `go fmt` to format all `*.go` files

Once changes are ready, publish an image with the changes, tagged properly:

    make publish-image TAG=0.2.0
