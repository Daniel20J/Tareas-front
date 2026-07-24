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

        stage('Crear imagen Docker') {

            steps {

                sh '''
                    docker build -t tareas-front:latest .
                '''

            }

        }

        stage('Verificar imagen Docker') {

            steps {

                sh '''
                    docker images
                '''

            }

        }

        stage('Login Docker Hub') {

            steps {

                withCredentials([usernamePassword(
                    credentialsId: '123456789',   // <-- Cambia este valor si tu ID es diferente
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {

                    sh '''
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                    '''

                }

            }

        }

        stage('Publicar imagen Docker Hub') {

            steps {

                sh '''
                    docker tag tareas-front:latest daniel2004cdbc/tareas-front:latest
                    docker tag tareas-front:latest daniel2004cdbc/tareas-front:${BUILD_NUMBER}

                    docker push daniel2004cdbc/tareas-front:latest
                    docker push daniel2004cdbc/tareas-front:${BUILD_NUMBER}
                '''

            }

        }
        
        stage('Desplegar aplicación') {

            steps {

                sh '''
                    docker pull daniel2004cdbc/tareas-front:latest

                    docker stop tareas-front || true

                    docker rm tareas-front || true

                    docker run -d \
                        --name tareas-front \
                        -p 8081:80 \
                        --restart unless-stopped \
                        daniel2004cdbc/tareas-front:latest
                '''

            }

        }

    }

    post {

        success {

            echo '==========================================='
            echo 'Pipeline ejecutado correctamente.'
            echo 'contenedor publicada en vps.'
            echo '==========================================='

        }

        failure {

            echo '==========================================='
            echo 'El pipeline falló.'
            echo 'Revisa la consola de Jenkins.'
            echo '==========================================='

        }

        always {

            sh 'docker logout || true'

        }

    }
    
}