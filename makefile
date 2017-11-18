
PROJECT := solo-infrastructure
APP := solo-mobile-app

dev-setup-local:
	@if [ ! "$(GOPATH)" ]; then \
        echo "GOPATH needs to be specified for code completion to work in your IDE"; \
        return 1; \
    fi
	mkdir -p $(GOPATH)/src/github.com/globalprofessionalsearch
	ln -s $(shell pwd) $(GOPATH)/src/github.com/globalprofessionalsearch/${APP}

dev-setup-services:
	# create DBs
	# setup schemas: docker-compose run --rm dev .bin/solo-platform-api db:migrate (https://github.com/go-pg/migrations)
	# or: docker-compose run --rm dev .bin/solo-platform-api db:ensure-schema: https://github.com/go-pg/pg#look--feel
	echo TODO

build:
	docker-compose run --rm dev go build -o .bin/${APP}

build-docs:
	docker-compose run --rm dev swagger generate spec -m -o static/swagger.json

run-cmd: build
	docker-compose run --rm dev .bin/${APP} $(CMD)

run-server: build
	docker-compose run --rm --service-ports dev .bin/${APP} api-server

deps-update:
	docker-compose run --rm dev dep ensure -update

test:
	docker-compose run --rm dev go test ./...

fmt:
	docker-compose run --rm dev go fmt

# build image & tag as latest
build-image:
	make build && \
	make build-docs && \
	docker build -t gps/${APP}:latest .

publish-image: build-image
	@if [ ! "$(TAG)" ]; then \
        echo "TAG was not specified"; \
        return 1; \
    fi

	# build the tagged image, and push to repo
	docker tag gps/${APP}:latest gps/${APP}:$(TAG) && \
	docker tag gps/${APP}:latest gcr.io/${PROJECT}/${APP}:latest && \
	docker tag gps/${APP}:$(TAG) gcr.io/${PROJECT}/${APP}:$(TAG)

	#push image
	docker-compose run --rm gcp gcloud docker -- push gcr.io/${PROJECT}/${APP}:latest
	docker-compose run --rm gcp gcloud docker -- push gcr.io/${PROJECT}/${APP}:$(TAG)

push:
	@if [ ! "$(TAG)" ]; then \
        echo "TAG was not specified"; \
        return 1; \
    fi
	docker-compose run --rm gcp gcloud docker -- push gcr.io/${PROJECT}/${APP}:$(TAG)

pull:
	@if [ ! "$(TAG)" ]; then \
        echo "TAG was not specified"; \
        return 1; \
    fi
	docker-compose run --rm gcp gcloud docker -- pull gcr.io/${PROJECT}/${APP}:$(TAG)

gcp-auth-admin:
	docker-compose run --rm gcp gcloud auth login

gcp-auth-dev:
	docker-compose run --rm gcp gcloud auth activate-service-account container-admin@solo-infrastructure.iam.gserviceaccount.com --key-file=/root/gcp_auth_key/solo-infrastructure-2331850a68cb.json

gcp-set-project:
	docker-compose run --rm gcp gcloud config set project ${PROJECT}

gcp-authorize:
	docker-compose run --rm gcp gcloud auth login

gcp-setproject:
	docker-compose run --rm gcp gcloud config set project ${PROJECT}

gcp-connect-test:
	docker-compose run --rm gcp gcloud compute instances list

gcp-image-list:
	docker-compose run --rm gcp gsutil ls

.PHONY: dev-setup build run-server deps-update fmt docker-login publish-image aws-configure