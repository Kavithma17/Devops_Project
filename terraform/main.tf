# AWS Provider Configuration
provider "aws" {
  region = "us-east-1"  # Change to the region you prefer
}

# Security Group for Jenkins and SSH
resource "aws_security_group" "jenkins_sg" {
  name        = "jenkins-sg"
  description = "Allow SSH and Jenkins web access"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # Allow SSH access from anywhere
  }

  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # Allow Jenkins access from anywhere
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]  # Allow outbound traffic to anywhere
  }
}

# EC2 Instance with Jenkins User Data for installation
resource "aws_instance" "jenkins_instance" {
  ami           = "ami-0f9c27b471bdcd702"  # Replace this with a valid AMI ID in your region
  instance_type = "t3.micro"  # Change this to your preferred instance type
  key_name      = "devops-key"  # Replace with the name of your key pair

  security_groups = [aws_security_group.jenkins_sg.name]

  # User data to install Jenkins, Docker, and Java
  user_data = <<-EOF
    #!/bin/bash
    apt-get update -y
    apt-get install -y openjdk-17-jre docker.io
    curl -fsSL https://pkg.jenkins.io/debian/jenkins.io.key | tee /etc/apt/trusted.gpg.d/jenkins.asc
    sh -c 'echo deb http://pkg.jenkins.io/debian/ $(lsb_release -cs) stable > /etc/apt/sources.list.d/jenkins.list'
    apt-get update -y
    apt-get install -y jenkins
    systemctl start jenkins
    systemctl enable jenkins
  EOF

  tags = {
    Name = "Jenkins-Server"
  }

  lifecycle {
    create_before_destroy = true
  }
}

# Outputs the public and private IP of the EC2 instance
output "public_ip" {
  value = aws_instance.jenkins_instance.public_ip
}

output "private_ip" {
  value = aws_instance.jenkins_instance.private_ip
}
