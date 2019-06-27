# Solo Mobile App #

## API Server Setup ##

The mobile app will depend on having access to the API server.  To get that running on your local machine you will need to have `docker` installed, then must do the following:

* create the following directories: `.gcp`, and `.misc`
* get the credential json file needed for authorizing with Google, place it at `./.gcp/key.json` - file is pinned in Slack `#development` channel
* get the credential json file needed for authorizing the api with Google, place it at `./.gcp/app-key.json` - file is pinned in Slack `#development` channel
* copy the `api.config.yml.dist` to `api.config.yml`, and modify accordingly for your local dev environment (if necessary), in most cases the default values should work
* run `make setup` - authorizes via gcloud and logs into GCR, so you can pull down images of the api server
* run `docker-compose up` - starts the api server and supporting services (postgres, redis, etc...)

Once it's up, go to [http://localhost:5112/](http://localhost:5112/) to view the API docs.  Connect to the api server in your own code via `http://solo-api-server:5110/`.  You should be able to hit that URL in browser to see that the api server is up and running.

When you need to pull a new version of the api server, modify the `docker-compose.yml` accordingly and run `docker-compose pull solo-api`.  You may need to run `docker-compose down` and `docker-compose up` to restart all the services.

The api server will automatically start on port `5110`, but the image also has a range of utility commands that you may need to run during development.  You can run those via `docker-compose` directly, or use the makefile, which provides a convenience command:

* `make run-cmd` - print available commands from the solo-api image
* `make run-cmd CMD="<COMMAND-NAME>` - run any command listed by the api server, if you need to provide any special flags or arguments, specify them *inside* the quotes: `CMD="commandName arg1 arg2 --flag=foo"`
* `make run-cmd CMD="dev:load-fixtures` - run the command to reload database fixtures

## Android Studio ##

Install Android Studio, as well as `react-native-debugger`.  Or just use the vagrant vm provided by running `vagrant up`... it will take a while to run.

> Note: have been unable to get the emulator to run in the VM, or connect a physical device.... so have mostly abandoned efforts at making this work.

To use the VM:

* run `vagrant up`
* login as user `vagrant`, password `vagrant`
* run `startx` to start the gui
* launch Android Studio from Applications > Development > Android Studio
* launch react-native-debugger from the home directory `/home/vagrant`

Initial setup for Android Studio:

* Don't import settings
* Do custom install & add latest SDK
* From the Welcome Screen, go to Configure -> SDK Manager
    * Install other SDKs (Android 7.0+)
* From Welcome Screen, choose "Open an existing Android Studio project"
    * Import an existing project: open the `android/app/` directory.
* Let Gradle automatically sync
  * it will probably fail several times, just keep clicking the blue links to install any missing dependencies

To start actually developing:

* Open AVD Manager and run a device emulator
* After a "cold boot", use `yarn android:run` to get the app loaded onto the phone
* run `yarn start` to start the dev server
* hit "R+R" to reload any changes
* run `yarn android:shake` to connect to the `react-native-debugger`

To clean and install a new version (if native deps changed)

* `rm -rf node_modules/ && yarn install`

## iOS Setup ##

Need to install a few things to get the project running in the iOS simulators:

* Make sure you have `pod` installed, right now we specifically need version 1.5.3
  * `sudo gem uninstall cocoapods` (if you have a different version)
  * `sudo gem install cocoapods -v 1.5.3`
* install pods: `cd ios && pod install`
* open Xcode
* in Xcode, open file: `ios/NewSolo.xcworkspace`

Notes on Xcode:

* need 10.2+ for now
* in build settings, use Swift 5

To clean and install a new version:

* `rm -rf node_modules/ && yarn install`
* `cd ios/`
* `rm -rf Pods/ && pod install`

## App Center and Code Push ##

To setup the App Center cli:

* copy `.appcenter/vars.env.dist` to `.appcenter/vars.env`
* modify `.appcenter/vars.env` for your environment as needed
* get an app center api token by running `make appcenter-login` and following the instructions, then add it to `.appcenter/vars.env`

To release an update via code push, checkout the branch you want to push and run:

* `make codepush-dev`, to release to the dev environment, or
* `make codepush-staging`, to release to the staging environment

You should not use code push to send any change directly to production.  It should be sent to staging first, then promoted to production once it has been tested.