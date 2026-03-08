output "site_bucket_name" {
  description = "S3 bucket that stores static site files"
  value       = aws_s3_bucket.site.bucket
}

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID used for cache invalidations"
  value       = aws_cloudfront_distribution.site.id
}

output "cloudfront_domain_name" {
  description = "CloudFront domain name"
  value       = aws_cloudfront_distribution.site.domain_name
}

output "github_actions_deploy_role_arn" {
  description = "IAM role ARN for GitHub Actions deploy workflow"
  value       = aws_iam_role.github_actions_deploy.arn
}

output "github_actions_terraform_role_arn" {
  description = "IAM role ARN for GitHub Actions Terraform workflow"
  value       = aws_iam_role.github_actions_terraform.arn
}
