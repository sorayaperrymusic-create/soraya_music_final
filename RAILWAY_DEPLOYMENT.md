# Deploy to Railway

Complete guide to deploy your music portfolio website to Railway with database support.

## Why Railway?

✅ **Built-in MySQL Database** - No external setup needed
✅ **Free $5/month credit** - Enough for small-medium traffic
✅ **One-click deployment** - Deploy code + database together
✅ **Auto HTTPS** - Free SSL certificates
✅ **Custom domains** - Easy domain setup
✅ **Environment variables** - Automatically managed

## Prerequisites

- GitHub account
- Railway account (sign up at https://railway.app)
- Credit card (for verification, free tier available)

## Step 1: Push Code to GitHub

1. **Create a new GitHub repository:**
   - Go to https://github.com/new
   - Name: `someone-who-wants-me`
   - Visibility: Public or Private (both work)
   - **Do NOT** initialize with README

2. **Push your code:**
   ```bash
   cd /home/ubuntu/someone_who_wants_me
   git remote add origin https://github.com/YOUR_USERNAME/someone-who-wants-me.git
   git branch -M main
   git push -u origin main
   ```

## Step 2: Create Railway Project

1. Go to https://railway.app and sign in with GitHub
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose your `someone-who-wants-me` repository
5. Railway will detect it's a Node.js project

## Step 3: Add MySQL Database

1. In your Railway project dashboard, click **"+ New"**
2. Select **"Database"** → **"Add MySQL"**
3. Railway will create a MySQL database and auto-configure connection

## Step 4: Configure Environment Variables

Railway auto-configures database variables, but you may need to add:

1. Click on your **web service** (not database)
2. Go to **"Variables"** tab
3. Add these if needed:
   - `NODE_ENV` = `production`
   - `SENDGRID_API_KEY` = your SendGrid key (for newsletter, optional)
   - `PORT` = `3000`

**Database variables are auto-configured:**
- `DATABASE_URL` - Automatically set by Railway
- `MYSQL_URL` - Automatically set by Railway

## Step 5: Configure Build Settings

1. In your web service, go to **"Settings"**
2. Set **Build Command**: `pnpm install && pnpm build`
3. Set **Start Command**: `pnpm start`
4. Set **Root Directory**: `/` (leave default)

## Step 6: Deploy

1. Click **"Deploy"** or push to GitHub (auto-deploys)
2. Railway will:
   - Install dependencies
   - Build your project
   - Start the server
   - Connect to MySQL database
   - Give you a live URL

Deployment takes 3-5 minutes.

## Step 7: Run Database Migrations

After first deployment:

1. In Railway dashboard, click your **web service**
2. Go to **"Deployments"** tab
3. Find the latest deployment, click **"View Logs"**
4. You may need to run migrations manually:
   - Go to **"Settings"** → **"Service"**
   - Add a **"Deploy Hook"** or use Railway CLI

**Or use Railway CLI:**
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link to your project
railway link

# Run migrations
railway run pnpm db:push
```

## Step 8: Get Your Live URL

1. In Railway dashboard, go to **"Settings"**
2. Under **"Domains"**, click **"Generate Domain"**
3. You'll get a URL like: `someone-who-wants-me-production.up.railway.app`

## Step 9: Add Custom Domain (Optional)

1. In **"Settings"** → **"Domains"**
2. Click **"Custom Domain"**
3. Enter your domain (e.g., `sorayaperry.com`)
4. Add the CNAME record to your DNS provider:
   - Type: `CNAME`
   - Name: `@` or `www`
   - Value: (Railway provides this)

## Features You Get

✅ **Auto-deploy** - Push to GitHub = instant deploy
✅ **Database backups** - Automatic MySQL backups
✅ **Monitoring** - Built-in metrics and logs
✅ **Scaling** - Auto-scales with traffic
✅ **HTTPS** - Free SSL certificates
✅ **Environment management** - Separate dev/prod environments

## Troubleshooting

### Database connection errors
- Check that MySQL service is running in Railway
- Verify `DATABASE_URL` is set in environment variables
- Check deployment logs for connection errors

### Build fails
- Check build logs in Railway dashboard
- Ensure `pnpm` is specified in `package.json`
- Verify all dependencies are listed

### Port issues
- Railway auto-assigns `PORT` environment variable
- Your app should use `process.env.PORT` or default to 3000

### Migrations not running
- Use Railway CLI: `railway run pnpm db:push`
- Or add migration to build command: `pnpm build && pnpm db:push`

## Cost Estimate

**Free tier:**
- $5/month credit (renews monthly)
- Covers small-medium traffic sites
- ~500MB database storage
- ~1GB RAM

**If you exceed free tier:**
- Pay-as-you-go pricing
- ~$5-20/month for typical music portfolio
- Much cheaper than dedicated hosting

## Alternative: Railway CLI Deployment

```bash
# Install CLI
npm i -g @railway/cli

# Login
railway login

# Initialize project
cd /home/ubuntu/someone_who_wants_me
railway init

# Add MySQL
railway add

# Deploy
railway up

# Open in browser
railway open
```

## Support

- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- Railway Support: https://railway.app/help

Your music portfolio will be live with a working database at `https://your-project.up.railway.app`! 🎵🚀
