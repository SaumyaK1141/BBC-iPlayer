pipeline {
    agent { 
        docker { 
            image 'mcr.microsoft.com/playwright:v1.17.2-focal'  // Official Playwright Docker image
            args '--user root:root' // run as root to avoid permission issues
        } 
    }

    stages {
        stage('Checkout Code') {
            steps {
                // Pull your BBC-iPlayer project from GitHub
                git branch: 'master', url: 'https://github.com/SaumyaK1141/BBC-iPlayer.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install Playwright and required browsers
                sh '''
                  npm install
                  npm install -D @playwright/test
                  npx playwright install
                '''
            }
        }

        stage('Run Playwright Tests') {
            steps {
                // Run all tests in Chromium with headed mode
                sh 'npx playwright test --project=chromium --headed'
            }
            post {
                success {
                    echo 'Tests passed ✅'
                }
                failure {
                    echo 'Tests failed ❌'
                }
            }
        }

        stage('Show Report') {
            steps {
                // Optional: generate HTML report
                sh 'npx playwright show-report'
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished.'
        }
    }
}
