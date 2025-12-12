# Deploy Your Music Portfolio - Step by Step

Your website is ready to deploy! Follow these simple instructions.

---

## 🎯 What You're Deploying

**Website**: Soraya Perry - "Someone Who Wants Me" Music Portfolio
**Features**: 
- ✅ Neon cyan/teal design with glowing effects
- ✅ Audio player with synchronized lyrics
- ✅ Video player (placeholder - add your video later)
- ✅ Newsletter signup with database
- ✅ Spotify discography links
- ✅ Social media integration
- ✅ Responsive mobile design

**Package Size**: 607KB (optimized for fast deployment)

---

## 📦 Option 1: Deploy to Railway (Recommended)

Railway is perfect for your site because it includes a MySQL database for the newsletter feature.

### Step 1: Create Railway Account
1. Go to https://railway.app
2. Click "Login" → "Login with GitHub"
3. Create a GitHub account if you don't have one (free)
4. Authorize Railway to access GitHub

### Step 2: Upload Your Code to GitHub
1. Go to https://github.com/new
2. Name: `soraya-music-portfolio`
3. Make it **Public**
4. **DO NOT** check "Initialize with README"
5. Click "Create repository"

### Step 3: Upload Files to GitHub
1. On the GitHub page, click "uploading an existing file"
2. Drag and drop ALL files from the `soraya_music_final` folder
3. Scroll down, click "Commit changes"

### Step 4: Deploy to Railway
1. Go back to https://railway.app
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose `soraya-music-portfolio`
5. Railway will auto-detect it's a Node.js project

### Step 5: Add MySQL Database
1. In your Railway project, click "+ New"
2. Select "Database" → "Add MySQL"
3. Railway auto-configures the connection

### Step 6: Configure Settings
1. Click on your web service (not database)
2. Go to "Settings" tab
3. Set **Build Command**: `pnpm install && pnpm build`
4. Set **Start Command**: `pnpm start`
5. Add environment variable (optional for newsletter):
   - `SENDGRID_API_KEY` = your SendGrid key

### Step 7: Deploy!
1. Click "Deploy"
2. Wait 3-5 minutes
3. Click "Settings" → "Domains" → "Generate Domain"
4. Your site is live! 🎉

**Your URL**: `something.up.railway.app`

---

## 📦 Option 2: Deploy to Netlify (No Database)

Netlify is simpler but doesn't include a database (newsletter won't work).

### Step 1: Create Netlify Account
1. Go to https://netlify.com
2. Sign up with GitHub (free)

### Step 2: Deploy
1. Click "Add new site" → "Deploy manually"
2. Drag and drop the entire `soraya_music_final` folder
3. Wait 2 minutes
4. Your site is live!

**Note**: Newsletter signup won't work without a database.

---

## 📦 Option 3: Deploy to Vercel (No Database)

Similar to Netlify - simple but no database.

### Step 1: Create Vercel Account
1. Go to https://vercel.com
2. Sign up with GitHub (free)

### Step 2: Upload to GitHub (same as Railway Step 2-3)

### Step 3: Deploy
1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Click "Deploy"
4. Your site is live!

---

## 🎥 Adding Your Real Video Later

The site currently uses a placeholder video. To add your real video:

### Option A: Use CDN (Recommended)
1. Upload your video to a CDN service:
   - Cloudinary (free tier)
   - Vimeo (free tier)
   - YouTube (embed)
2. Get the video URL
3. Update `client/src/pages/Home.tsx` line 286:
   ```tsx
   videoUrl="YOUR_VIDEO_URL_HERE"
   ```
4. Redeploy

### Option B: Use Railway/Vercel Storage
1. Upload video to your hosting platform's storage
2. Update the URL in the code
3. Redeploy

---

## 📧 Setting Up Newsletter (Optional)

To enable newsletter signups:

1. Create free SendGrid account: https://sendgrid.com
2. Get your API key
3. Add to Railway environment variables:
   - Key: `SENDGRID_API_KEY`
   - Value: your API key
4. Restart your Railway service

---

## 🎨 Customizing Your Site

### Change Colors
Edit `client/src/index.css` - look for color values

### Update Social Links
Edit `client/src/pages/Home.tsx` - search for Instagram, Twitter, etc.

### Change Spotify Links
Edit `client/src/pages/Home.tsx` - search for "spotify.com"

### Update Artist Info
Edit `client/src/pages/Home.tsx` - search for "Soraya Perry"

---

## ❓ Troubleshooting

### Build fails on Railway
- Check build logs in Railway dashboard
- Ensure `package.json` is in the root directory
- Verify Node.js version compatibility

### Newsletter doesn't work
- Ensure MySQL database is added in Railway
- Check `SENDGRID_API_KEY` is set
- Run database migrations: `pnpm db:push`

### Video doesn't play
- Check video URL is accessible
- Ensure video format is MP4
- Try a different CDN if current one is slow

---

## 📞 Need Help?

- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- Netlify Support: https://answers.netlify.com
- Vercel Docs: https://vercel.com/docs

---

## 🎉 You're Done!

Your music portfolio is ready to share with the world. Share your live URL on social media and start collecting newsletter signups!

**Good luck with your music! 🎵**
