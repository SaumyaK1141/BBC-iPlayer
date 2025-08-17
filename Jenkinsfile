pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'master', url: 'https://github.com/SaumyaK1141/BBC-iPlayer.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat '''
                  npm ci
                  npm install -D @playwright/test
                  npx playwright install
                '''
            }
        }

        stage('Run Playwright Tests') {
            steps {
                // Run tests in headless Chromium
                bat 'npx playwright test --project=chromium --reporter=html'
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

        stage('Archive Reports') {
            steps {
                // Archive Playwright HTML report
                archiveArtifacts artifacts='playwright-report/**', allowEmptyArchive: true

                // Optionally, publish as HTML in Jenkins (requires HTML Publisher Plugin)
                publishHTML(target: [
                    allowMissing: true,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright HTML Report'
                ])
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished.'
        }
    }
}
