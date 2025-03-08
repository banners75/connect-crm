# Provider definition
provider "aws" {
  region = "eu-west-1"
}

# VPC definition
data "aws_vpc" "existing" {
  id = "vpc-09774259185288227"
}

data "aws_iam_role" "ecs_task_execution_role" {
  name = "ecsTaskExecutionRole"
}

# Security group for the ECS tasks
resource "aws_security_group" "ecs_sg" {
  vpc_id = data.aws_vpc.existing.id
  name   = "ecs-security-group"
  # Inbound and outbound rules
  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# ECS task definition
resource "aws_ecs_task_definition" "task_definition" {
  family                = "connect-crm-api-task"
  network_mode          = "awsvpc"
  memory                = "512"
  requires_compatibilities = ["FARGATE"]

  # Task execution role
  execution_role_arn    = "${data.aws_iam_role.ecs_task_execution_role.arn}"  

  # Container definition
  container_definitions = jsonencode([
    {
      name      = "connect-crm-api-container"
      image     = "841162685193.dkr.ecr.eu-west-1.amazonaws.com/connect-crm:latest" 
      cpu       = 256
      memory    = 512
      port_mappings = [
        {
          container_port = 3000
          host_port      = 3000
          protocol       = "tcp"
        }
      ]
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = aws_cloudwatch_log_group.ecs_log_group.name
          "awslogs-region"        = "eu-west-1" 
          "awslogs-stream-prefix" = "connect-crm"
        }
      }
      environment = [
        {
          name = "NODE_ENV",
          value = "development" # "production"
        },
        {
          name  = "DATABASE_URL"
          value = "file:./dev.db"
        }
      ]
    }
  ])

  # Defining the task-level CPU
  cpu = "256"  
}

# ECS service
resource "aws_ecs_cluster" "ecs_cluster" {
  name = "connect-crm-api-cluster"  
}

resource "aws_ecs_service" "service" {
  name            = "connect-crm-api-service"
  cluster         = aws_ecs_cluster.ecs_cluster.id
  task_definition = aws_ecs_task_definition.task_definition.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  # Network configuration
  network_configuration {
    subnets          = ["subnet-05876b145e48c2c2f", "subnet-016a90de1c15a2532", "subnet-08842b14f7019286a"]
    security_groups  = [aws_security_group.ecs_sg.id]
    assign_public_ip = true
  }
}

resource "aws_cloudwatch_log_group" "ecs_log_group" {
  name              = "/ecs/my-app-logs"
  retention_in_days = 7 # Set the retention period
}


resource "aws_iam_role_policy" "ecs_task_execution_policy" {
  name   = "ecsTaskExecutionPolicy"
  role   = "${data.aws_iam_role.ecs_task_execution_role.id}" 
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action   = [
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Effect   = "Allow"
        Resource = "*"
      },
      {
        Action   = "ecs:UpdateContainerInstancesState"
        Effect   = "Allow"
        Resource = "*"
      },
    ]
  })
}
