# Deploy to Vercel

This guide will help you deploy your music portfolio website to Vercel.

## Prerequisites

- GitHub account
- Vercel account (sign up at https://vercel.com - free tier available)

## Step 1: Push to GitHub

1. Create a new repository on GitHub: https://github.com/new
   - Name: `someone-who-wants-me` (or your preferred name)
   - Make it public or private (both work with Vercel)
   - **Do NOT** initialize with README (we already have code)

2. Push your code to GitHub:
   ```bash
   cd /home/ubuntu/someone_who_wants_me
   git remote add origin https://github.com/YOUR_USERNAME/someone-who-wants-me.git
   git branch -M main
   git push -u origin main
   ```

## Step 2: Deploy to Vercel

1. Go to https://vercel.com and sign in
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Other
   - **Root Directory**: `./`
   - **Build Command**: `pnpm install && pnpm build`
   - **Output Directory**: `dist`
   - **Install Command**: `pnpm install`

5. Add Environment Variables (if using newsletter):
   - Click "Environment Variables"
   - Add: `SENDGRID_API_KEY` = your SendGrid API key (optional)

6. Click **"Deploy"**

## Step 3: Wait for Deployment

Vercel will:
- Install dependencies
- Build your project
- Deploy to their global CDN
- Give you a live URL (e.g., `someone-who-wants-me.vercel.app`)

This takes 2-5 minutes.

## Step 4: Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain (e.g., `sorayaperry.com`)
4. Follow DNS configuration instructions

## Features on Vercel

✅ **Automatic HTTPS** - Free SSL certificates
✅ **Global CDN** - Fast loading worldwide  
✅ **Auto-deploy** - Push to GitHub = auto-deploy
✅ **Preview URLs** - Every branch gets a preview URL
✅ **Analytics** - Built-in visitor analytics
✅ **Custom domains** - Free custom domain support

## Troubleshooting

### Build fails
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### Environment variables missing
- Add them in Vercel dashboard: Settings → Environment Variables
- Redeploy after adding variables

### Database connection issues
- Vercel serverless functions have connection limits
- Consider using connection pooling or serverless-friendly databases

## Alternative: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd /home/ubuntu/someone_who_wants_me
vercel

# Follow prompts to link project and deploy
```

## Support

- Vercel Docs: https://vercel.com/docs
- Vercel Support: https://vercel.com/support

Your music portfolio will be live at `https://your-project.vercel.app`! 🎵
