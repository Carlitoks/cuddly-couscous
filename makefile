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

npm-install:
	docker-compose run --rm appcenter npm install

appcenter-login:
	docker-compose run --rm appcenter appcenter login

appcenter-cli:
	docker-compose run --rm appcenter appcenter $(CMD)

codepush-dev:
	docker-compose run --rm appcenter appcenter codepush release-react -a Global-Professional-Search/Jeenie-Android -d Development
	docker-compose run --rm appcenter appcenter codepush release-react -a Global-Professional-Search/Jeenie-iOS -d Development

codepush-staging:
	docker-compose run --rm appcenter appcenter codepush release-react -a Global-Professional-Search/Jeenie-Android -d Staging
	docker-compose run --rm appcenter appcenter codepush release-react -a Global-Professional-Search/Jeenie-iOS -d Staging

.PHONY: setup docker-login gcp-setproject gcp-authorize run-cmd
