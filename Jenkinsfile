pipeline {
    agent any

    environment {
        // Define environment variables
        APP_NAME = 'task-manager-api'
        DOCKER_REGISTRY = 'your-docker-registry' // e.g., index.docker.io/v1/
        DOCKER_IMAGE = "${APP_NAME}:${env.BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from GitHub
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                // Use the NodeJS plugin to ensure node is available
                // Must be configured in Jenkins 'Global Tool Configuration'
                nodejs('NodeJS 18') {
                    sh 'npm install'
                }
            }
        }

        stage('Linting') {
            steps {
                nodejs('NodeJS 18') {
                    sh 'npm run lint || true' // Continue even if lint fails
                }
            }
        }

        stage('Test') {
            steps {
                nodejs('NodeJS 18') {
                    sh 'npm test'
                }
            }
            post {
                always {
                    // Archive test results (JUnit plugin recommended)
                    // junit 'coverage/junit.xml' // Example: if you generate junit reports
                    echo "Tests completed."
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // This requires the 'Docker Pipeline' plugin
                    // sh 'docker build -t ${DOCKER_IMAGE} .'
                    echo "Building Docker image ${DOCKER_IMAGE}..."
                }
            }
        }

        stage('Deploy (Snapshot/Draft)') {
            when {
                branch 'main'
            }
            steps {
                echo "Deploying ${DOCKER_IMAGE} to Staging..."
                // Example: docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
                //     dockerImage.push('latest')
                // }
            }
        }
    }

    post {
        always {
            cleanWs() // Clean the workspace after the build
        }
        success {
            echo "Pipeline completed successfully!"
        }
        failure {
            echo "Pipeline failed. Please check logs."
        }
    }
}
