# Vercel Deployment Guide

## Quick Deploy Steps

1. **Connect Repository to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your repository: `RajivRa12/Ecommerce`

2. **Vercel Project Settings**:
   - **Framework Preset**: Other
   - **Build Command**: `pnpm run vercel-build`
   - **Output Directory**: `dist/spa`
   - **Install Command**: `pnpm install`
   - **Node.js Version**: 18.x

3. **Environment Variables** (if needed):
   - Add any required environment variables in Vercel dashboard

4. **Deploy**:
   - Click "Deploy"
   - Wait for build to complete
   - Your site will be live!

## Troubleshooting

If you still get 404 errors:

1. **Check Build Logs**: Look at the build output in Vercel dashboard
2. **Verify Output Directory**: Ensure `dist/spa` contains `index.html`
3. **Clear Cache**: Try redeploying with "Clear Cache" option
4. **Check Routes**: Ensure all routes redirect to `index.html`

## Local Testing

Test the build locally:
```bash
pnpm run vercel-build
ls dist/spa/  # Should contain index.html and assets
```

## Files Added for Vercel

- `vercel.json` - Deployment configuration
- `.vercelignore` - Files to ignore during deployment
- `vercel-build` script in package.json
