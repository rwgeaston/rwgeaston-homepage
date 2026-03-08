# Terraform infrastructure

This stack provisions:
- S3 bucket for static assets (private)
- CloudFront distribution with OAC
- ACM certificate for custom domain (`us-east-1`)
- Route53 DNS records for the apex domain
- IAM role for GitHub Actions deployment using OIDC

## Usage

```bash
cd infra
cp terraform.tfvars.example terraform.tfvars
cp backend.hcl.example backend.hcl
# edit terraform.tfvars
terraform init -backend-config=backend.hcl
terraform plan
terraform apply
```

## Backend config

Create `backend.hcl` with your remote state settings.

Example `backend.hcl`:

```hcl
bucket         = "your-terraform-state-bucket"
key            = "rwgeaston-homepage/prod.tfstate"
region         = "eu-west-2"
dynamodb_table = "terraform-locks"
encrypt        = true
```

## Migrating from existing direct-S3 hosting

Because `rwgeaston.com` already points to an S3 website setup, apply this stack only when ready to cut over. The new Route53 alias records will point the domain to CloudFront.

If the bucket already exists and you want Terraform to take ownership of it, import it before first apply:

```bash
terraform import aws_s3_bucket.site rwgeaston.com
terraform import aws_s3_bucket_public_access_block.site rwgeaston.com
```
