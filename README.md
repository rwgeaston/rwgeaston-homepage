# rwgeaston-homepage

Static website for `rwgeaston.com`, including:
- HTML CV page
- Downloadable PDF CV
- Wedding photography portfolio pages

## Repo layout

- `site/` Astro static site
- `infra/` Terraform for AWS hosting + deploy role
- `.github/workflows/` CI/CD pipelines

## Quick start

1. Build the site locally:

```bash
cd site
npm install
npm run dev
```

2. Set up infrastructure:

```bash
cd infra
cp terraform.tfvars.example terraform.tfvars
cp backend.hcl.example backend.hcl
# fill in values
terraform init -backend-config=backend.hcl
terraform plan
```

3. Configure GitHub repo settings:
- `Actions` OIDC trust role ARN in secret: `AWS_DEPLOY_ROLE_ARN`
- Terraform workflow role ARN in secret: `AWS_TERRAFORM_ROLE_ARN`
- Repository variables:
  - `AWS_REGION`
  - `S3_BUCKET_NAME`
  - `CLOUDFRONT_DISTRIBUTION_ID`
  - `TF_STATE_BUCKET`
  - `TF_STATE_KEY`
  - `TF_LOCK_TABLE`

## CV PDF

Replace `site/public/cv/rwgeaston-cv.pdf` with your real CV PDF.

A placeholder file is included so links work during scaffold.
