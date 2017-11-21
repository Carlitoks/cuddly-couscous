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

run-cmd:
	docker-compose run --rm solo-api $(CMD)

.PHONY: setup docker-login gcp-setproject gcp-authorize run-cmd