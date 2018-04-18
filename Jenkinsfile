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
      when {
        branch "develop"
        expression {env.ENVIRONMENT_DEV}
      }
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
    
    stage ('set api configuration') {
      when {
        branch "develop"
        expression {env.CONFIG_DEV}
      }
      steps {
        configFileProvider([
          configFile(
            fileId: 'solo-config-template', 
            targetLocation: 'api.config.yml',
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
          to: "jsfrncscg@gmail.com; soporte@teravisiontech.com",
          subject: "FAILURE on build",
          body: "A build on solo-mobile-app has failed!",
          attachLog: true
      )
    }
  }
}
