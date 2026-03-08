variable "project_name" {
  description = "Project label used for tags and IAM naming"
  type        = string
  default     = "rwgeaston-homepage"
}

variable "aws_region" {
  description = "Primary AWS region for S3/Route53 resources"
  type        = string
  default     = "eu-west-2"
}

variable "domain_name" {
  description = "Primary domain for the website"
  type        = string
  default     = "rwgeaston.com"
}

variable "site_bucket_name" {
  description = "S3 bucket name that stores site assets (defaults to domain_name when empty)"
  type        = string
  default     = ""
}

variable "hosted_zone_id" {
  description = "Route53 hosted zone ID that serves domain_name"
  type        = string
}

variable "github_repository" {
  description = "GitHub repository in owner/name format"
  type        = string
}

variable "github_branch" {
  description = "GitHub branch allowed to assume deployment role"
  type        = string
  default     = "main"
}

variable "create_github_oidc_provider" {
  description = "Create the GitHub OIDC provider if it does not already exist"
  type        = bool
  default     = true
}

variable "github_oidc_provider_arn" {
  description = "Existing GitHub OIDC provider ARN (required if create_github_oidc_provider = false)"
  type        = string
  default     = ""

  validation {
    condition     = var.create_github_oidc_provider || length(var.github_oidc_provider_arn) > 0
    error_message = "Set github_oidc_provider_arn when create_github_oidc_provider is false."
  }
}

variable "tags" {
  description = "Additional tags to apply to all resources"
  type        = map(string)
  default     = {}
}
