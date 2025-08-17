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
                bat 'npm ci'
                bat 'npm install -D @playwright/test'
                bat 'npx playwright install'
            }
        }

        stage('Run Playwright Tests') {
            steps {
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
                // Archive artifacts (HTML report)
                archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true

                // Publish HTML report (requires HTML Publisher plugin)
                publishHTML(
                    target: [
                        reportDir: 'playwright-report',
                        reportFiles: 'index.html',
                        reportName: 'Playwright HTML Report',
                        allowMissing: true,
                        alwaysLinkToLastBuild: true,
                        keepAll: true
                    ]
                )
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished.'
        }
    }
}
