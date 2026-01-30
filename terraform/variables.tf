variable "aws_region" {
  description = "The AWS region where resources will be deployed"
  default     = "us-east-1"
}

variable "instance_type" {
  description = "The EC2 instance type"
  default     = "t3.micro"
}
