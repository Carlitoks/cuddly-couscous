#!/usr/bin/env groovy

pipeline {

  agent any

  stages {

    stage ('clean') {
      steps {
        sh "docker-compose down"
        checkout scm
      }
    }

    stage ('build') {
      steps {
        sh "mkdir -p .gcp"
        sh "wget ${KEY_LOCATION} -P .gcp"
        sh "make setup"
        sh "echo ${ENV_VARS} > .env"
        sh "docker-compose up --build -d ${RUNNING_APPS}"
        sh 'make run-cmd CMD=\"load-fixtures\"'
      }
    }
  }
}
