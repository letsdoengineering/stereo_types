PROJECT = littleSurvey

DockerRun = docker-compose run

MountProject = -v $$(pwd):/app -v exclude:/app/node_modules/

# Each Rule (e.g. bash, test, etc) is structured like:
#           target: prerequisites
#           <TAB SPACE>command
# First line is the 'target' - a file name for output (or command name if you list it in the .PHONY)
#            and 'prerequisites' - file(s) used, and rules (from in the make file) and command line commands to be run first
# Second line is the command, must be indented by a <tab>, which can use '\' to span multiple lines

# NOTE: by default if you run make without specifying a rule (ie. make build), then the first one is run by default.
default: ;@echo "there is no default job.....";

# To access the docker container on the command line
bash:
	$(DockerRun) $(MountProject) --rm client bash

# run lint and test together
ci:
	$(DockerRun) $(MountProject) --rm client npm run lint && npm run type-check && npm run test

# run unit tests
test: ;@echo "Testing ${PROJECT}....."; \
	$(DockerRun) $(MountProject) --rm client npm run test:coverage

# run client on a webpack dev server
run-dev: ;@echo "Starting ${PROJECT} in dev mode....."; \
	$(DockerRun) $(MountProject) -p 3000:3000 -p 7000:7000 client npm run develop -- -H 0.0.0.0 -p 3000

# run client from a static build
run: ;@echo "Running prod build of ${PROJECT}....."; \
	docker-compose build client && $(DockerRun) -p 9000:9000 client npm run serve -- -H 0.0.0.0 -p 9000

# build project and copy output to host machine
build: ;@echo "Building ${PROJECT}....."; \
	GATSBY_SENTRY_DSN=${GATSBY_SENTRY_DSN} docker-compose build client && $(DockerRun) client ls public && docker cp $$(docker ps -aqf "name=client"):/app/public . && docker rm $$(docker ps -aqf "name=client")

# build and deploy project
deploy: ;@echo "Deploying ${PROJECT}....."; \
	GATSBY_SENTRY_DSN=${GATSBY_SENTRY_DSN} docker-compose build client && $(DockerRun) -e AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID} -e AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY} --rm client npm run deploy

# lint project
lint: ;@echo "Linting ${PROJECT}....."; \
    $(DockerRun) $(MountProject) --rm client npm run lint

# compile typescript
compile: ;@echo "Compiling ${PROJECT}....."; \
	$(DockerRun) $(MountProject) --rm client npm run type-check

# Phony should contain all your commands (ie. if your rule does not output to a file)
# Otherwise make assumes its a target file and checks for them - if a file exists with that name the command will not be run.
.PHONY: bash ci test run-dev run build lint compile
