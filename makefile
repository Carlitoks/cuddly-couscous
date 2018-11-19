ACCESS_TOKEN := $(shell docker-compose run --rm gcp gcloud auth print-access-token)

gcp-authorize:
	docker-compose run --rm gcp gcloud auth activate-service-account container-admin@solo-infrastructure.iam.gserviceaccount.com --key-file=/root/gcp/key.json

gcp-setproject:
	docker-compose run --rm gcp gcloud config set project solo-infrastructure

docker-login:
	docker login -u oauth2accesstoken -p $(ACCESS_TOKEN) https://gcr.io

setup:
	make gcp-authorize && \
	make gcp-setproject && \
	make docker-login

run-cmd:
	docker-compose run --rm solo-api $(CMD)

appcenter-login:
	docker-compose run --rm appcenter appcenter login

appcenter-cli:
	docker-compose run --rm appcenter appcenter $(CMD)

.PHONY: setup docker-login gcp-setproject gcp-authorize run-cmd
