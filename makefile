API_VERSION := 0.2.2

pull:
	docker pull gcr.io/solo-infrastructure/solo-platform-api:$(API_VERSION)

gcp-authorize:
	docker-compose run --rm gcp gcloud auth activate-service-account container-admin@solo-infrastructure.iam.gserviceaccount.com --key-file=/root/gcp/key.json

gcp-setproject:
	docker-compose run --rm gcp gcloud config set project solo-infrastructure

docker-login:
	echo $(shell docker-compose run --rm gcp gcloud auth print-access-token) | docker login -u oauth2accesstoken --password-stdin https://gcr.io

setup:
	make gcp-authorize && \
	make gcp-setproject && \
	make docker-login

.PHONY: dev-setup build run-server deps-update fmt docker-login publish-image aws-configure