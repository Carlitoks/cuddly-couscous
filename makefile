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

reload-fixtures:
	docker-compose run --rm solo-api dev:load-fixtures

npm-install:
	docker-compose run --rm appcenter npm install

appcenter-login:
	docker-compose run --rm appcenter appcenter login

appcenter-cli:
	docker-compose run --rm appcenter appcenter $(CMD)

#TV dev environment
codepush-dev:
	cp src/Config/env.js src/Config/env.js.bak && \
	cp src/Config/env.dev.js src/Config/env.js && \
	docker-compose run --rm appcenter appcenter codepush release-react -a Global-Professional-Search/Jeenie-Android -d Development && \
	docker-compose run --rm appcenter appcenter codepush release-react -a Global-Professional-Search/Jeenie-iOS -d Development && \
	cp src/Config/env.js.bak src/Config/env.js && \
	rm src/Config/env.js.bak

# Jeenie qa/staging environment
codepush-staging:
	cp src/Config/env.js src/Config/env.js.bak && \
	cp src/Config/env.staging.js src/Config/env.js && \
	docker-compose run --rm appcenter appcenter codepush release-react -a Global-Professional-Search/Jeenie-Android -d Staging && \
	docker-compose run --rm appcenter appcenter codepush release-react -a Global-Professional-Search/Jeenie-iOS -d Staging && \
	cp src/Config/env.js.bak src/Config/env.js && \
	rm src/Config/env.js.bak

# ITRex QA environment
codepush-itrex:
	cp src/Config/env.js src/Config/env.js.bak && \
	cp src/Config/env.itrex.js src/Config/env.js && \
	docker-compose run --rm appcenter appcenter codepush release-react -a Global-Professional-Search/Jeenie-Android -d ITRex && \
	docker-compose run --rm appcenter appcenter codepush release-react -a Global-Professional-Search/Jeenie-iOS -d ITRex && \
	cp src/Config/env.js.bak src/Config/env.js && \
	rm src/Config/env.js.bak

#convenience command to release to both Jeenie/ITRex QA
codepush-qa:
	make codepush-staging && \
	make codepush-itrex

# LIVE version - note that any push to production is DISABLED by default.  This is to avoid accidental
# releases in the live environment.  You should log into AppCenter to manually enabled a release
# once it is ready
codepush-production:
	cp src/Config/env.js src/Config/env.js.bak && \
	cp src/Config/env.prod.js src/Config/env.js && \
	docker-compose run --rm appcenter appcenter codepush release-react --disabled -a Global-Professional-Search/Jeenie-Android -d Production && \
	docker-compose run --rm appcenter appcenter codepush release-react --disabled -a Global-Professional-Search/Jeenie-iOS -d Production && \
	cp src/Config/env.js.bak src/Config/env.js && \
	rm src/Config/env.js.bak

.PHONY: setup docker-login gcp-setproject gcp-authorize run-cmd
