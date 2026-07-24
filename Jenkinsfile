pipeline {

    agent any

    stages {

        stage('Información') {

            steps {

                sh 'echo ===== JENKINS ====='
                sh 'whoami'
                sh 'pwd'
                sh 'node -v'
                sh 'npm -v'
                sh 'git --version'
                sh 'docker --version'

            }

        }

        stage('Instalar dependencias') {

            steps {
                sh 'npm install'
            }

        }

        stage('Compilar Angular') {

            steps {
                sh 'npm run build'
            }

        }

        stage('Verificar compilación') {

            steps {
                sh 'ls -la'
                sh 'find dist'
            }

        }

    }

}