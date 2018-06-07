#!/usr/bin/env groovy

pipeline {

  agent any

  stages {

    stage ('clean') {
      steps {
        sh "docker-compose -p solodev down"
        checkout scm
      }
    }
    
    stage ('configure docker compose environment for development') {
      steps {
        configFileProvider([
          configFile(
            fileId: 'docker-env-template', 
            targetLocation: '.env',
            replaceTokens: true
          )
        ]) {}
      }
    }
    
    stage ('build') {
      steps {
        sh "mkdir -p .gcp"
        sh "wget ${KEY_LOCATION} -P .gcp"
        sh "wget ${APP_KEY_LOCATION} -P .gcp"
        sh "make setup"
        sh "docker-compose -p solodev up --build -d ${RUNNING_APPS_DEV}"
        sh 'docker-compose -p solodev run --rm solo-api dev:load-fixtures'
        sh 'docker-compose -p solodev run --rm solo-api linguists:reindex'
      }
    }
  }
  
  post {
    failure {
      emailext (
          to: "soporte@teravisiontech.com",
          subject: "FAILURE on build",
          body: "A build on solo-mobile-app has failed!",
          attachLog: true
      )
    }
  }
}
