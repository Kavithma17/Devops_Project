pipeline {
    agent none

    stages {

        stage('Provision EC2') {
            agent { label 'built-in' }
            steps {
                dir('/var/lib/jenkins') {
                    sh 'terraform apply -auto-approve'
                }
            }
        }

        stage('Wait for node') {
            agent { label 'built-in' }
            steps {
                timeout(time: 10, unit: 'MINUTES') {
                    waitUntil {
                        script {
                            def node = Jenkins.instance.getNode('remote-node')
                            node.toComputer()?.isOnline() == true
                        }
                    }
                }
            }
        }

        
        stage('Clone Repository') {
            agent { label 'remote-node' }
            steps {
                git branch: 'main',
                    url: 'https://github.com/Kavithma17/Devops_Project'
            }
        }

        stage('Build FrontEnd') {
            agent { label 'remote-node' }
            steps {
                sh 'docker build -t kavithmar/frontend:latest ./frontend'
            }
        }
        
        stage('Build BackEnd') {
            agent { label 'remote-node' }
            steps {
                sh 'docker build -t kavithmar/backend:latest ./backend'
            }
        }
                
        stage('Docker Login') {
            agent { label 'remote-node' }
            environment {
                DOCKER_PASSWORD = credentials('docker-secret')
            }
            steps {
                sh 'echo $DOCKER_PASSWORD | docker login -u kavithmar --password-stdin'
            }
        }
        
        stage('Push FrontEnd Image') {
            agent { label 'remote-node' }
            steps {
                sh 'docker push kavithmar/frontend:latest'
            }
        }
        
        stage('Push BackEnd Image') {
            agent { label 'remote-node' }
            steps {
                sh 'docker push kavithmar/backend:latest'
            }
        }
        
        stage('Docker Logout') {
            agent { label 'remote-node' }
            steps {
                sh 'docker logout'
            }
        }

        stage('Destroying EC2') {
            agent { label 'built-in' }
            steps {
                dir('/var/lib/jenkins') {
                    sh 'terraform destroy -auto-approve'
                }
            }
        }
        stage('Deploy Containers') {
            agent { label 'built-in' }
            steps {
                sh '''
                  /var/lib/jenkins/.local/bin/ansible-playbook \
                    -i /var/lib/jenkins/ansible/inventory.ini \
                    /var/lib/jenkins/ansible/redeploy.yml
                '''
            }
        }

    }
}