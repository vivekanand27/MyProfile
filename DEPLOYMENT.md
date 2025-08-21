# 🚀 Deployment Guide - GitHub Pages

## Quick Deploy (No Custom Domain Required)

### Step 1: Push to GitHub
```bash
# Initialize git repository (if not already done)
git init
git add .
git commit -m "Initial commit - Professional profile website"

# Add your GitHub repository as remote
git remote add origin https://github.com/vivekanand27/MyProfile.git
git branch -M main
git push -u origin main
```

### Step 2: Enable GitHub Pages
1. Go to your GitHub repository: `https://github.com/vivekanand27/MyProfile`
2. Click on **Settings** tab
3. Scroll down to **Pages** section (left sidebar)
4. Under **Source**, select **Deploy from a branch**
5. Choose **main** branch
6. Click **Save**

### Step 3: Wait for Deployment
- GitHub will automatically build and deploy your site
- You'll see a green checkmark when deployment is complete
- Your site will be available at: `https://vivekanand27.github.io/MyProfile`

## 🌐 Adding Custom Domain Later (Optional)

If you want to add a custom domain later:

1. **Buy a domain** from providers like:
   - Namecheap
   - GoDaddy
   - Google Domains
   - Cloudflare

2. **Add domain to GitHub Pages:**
   - In Pages settings, add your domain in **Custom domain** field
   - Click **Save**

3. **Configure DNS:**
   - Add CNAME record pointing to `vivekanand27.github.io`
   - Or add A records for IP addresses (GitHub will provide these)

## ✅ What You Get

- **Free hosting** on GitHub Pages
- **HTTPS enabled** automatically
- **Global CDN** for fast loading
- **Automatic updates** when you push to main branch
- **Professional URL** for your resume

## 🔧 Troubleshooting

**If deployment fails:**
- Check that all files are committed and pushed
- Ensure `index.html` is in the root directory
- Wait a few minutes for GitHub to process

**If site doesn't load:**
- Check the Actions tab for build errors
- Verify the Pages source is set to main branch
- Clear browser cache and try again

## 📱 Testing Your Site

After deployment:
1. Visit your GitHub Pages URL
2. Test on different devices (mobile, tablet, desktop)
3. Check all links work properly
4. Test contact form functionality
5. Verify responsive design

Your website will be live and accessible to potential employers worldwide! 🎉
