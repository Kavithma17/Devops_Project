output "public_ip" {
  description = "The public IP of the EC2 instance"
  value       = aws_instance.jenkins_instance.public_ip
}

output "private_ip" {
  description = "The private IP of the EC2 instance"
  value       = aws_instance.jenkins_instance.private_ip
}
