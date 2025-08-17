pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                // Pull code from the repo
                git branch: 'master', url: 'https://github.com/SaumyaK1141/BBC-iPlayer.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install Node.js dependencies and Playwright browsers
                sh '''
                  npm ci
                  npm install -D @playwright/test
                  npx playwright install
                '''
            }
        }

        stage('Run Playwright Tests') {
            steps {
                // Run all Playwright tests (chromium)
                sh 'npx playwright test --project=chromium --headed'
            }
            post {
                success {
                    echo '✅ Playwright tests passed!'
                }
                failure {
                    echo '❌ Playwright tests failed.'
                }
            }
        }

        stage('Show Report') {
            steps {
                // Open HTML report
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
