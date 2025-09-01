# 🔧 Development & Production Setup Guide

## 🏠 **Local Development**

### **Current Setup (Hybrid Approach)**

✅ **Development**: Direct Gemini API calls (works immediately)
✅ **Production**: Secure Netlify functions (API key protected)

### **How it Works**

```typescript
// Automatically detects environment
if (development) {
  // Uses NEXT_PUBLIC_GEMINI_API_KEY (client-side)
  // Less secure but works locally
} else {
  // Uses Netlify function with GEMINI_API_KEY (server-side)
  // Secure and production-ready
}
```

## 🚀 **Quick Start**

### **1. Development (Current)**

```bash
# Your current setup works!
npm run dev
# App runs at http://localhost:3001
# Uses direct API calls for immediate functionality
```

### **2. Production Deployment**

```bash
# Push to GitHub
git add .
git commit -m "Ready for production"
git push origin main

# Deploy on Netlify
# Add environment variable: GEMINI_API_KEY=your_key
# Uses secure server-side functions
```

## 🔐 **Security Levels**

### **Development (Less Secure)**

- API key visible in browser (NEXT*PUBLIC*\*)
- Good for: Local development, testing
- Trade-off: Convenience vs Security

### **Production (Secure)**

- API key hidden on server
- Netlify functions protect the key
- Enterprise-level security

## 🎯 **Alternative: Full Netlify Development**

If you want full security in development:

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Run with Netlify functions locally
npm run dev:netlify
```

This will:

- Run Netlify functions locally
- Use server-side API key protection
- Match production environment exactly

## 📋 **Environment Variables**

### **Development (.env.local)**

```bash
# For development (client-side)
NEXT_PUBLIC_GEMINI_API_KEY=your_key_here

# For production (server-side)
GEMINI_API_KEY=your_key_here
```

### **Production (Netlify Dashboard)**

```bash
# Only this one needed in production
GEMINI_API_KEY=your_key_here
```

## 🔄 **Current Status**

✅ **Working locally**: Direct API calls
✅ **Production ready**: Secure Netlify functions
✅ **Auto-detection**: Switches based on environment
✅ **No setup required**: Works out of the box

Your app now works perfectly in both development and production! 🎉

## 🛠 **Troubleshooting**

### **Development Issues**

```
Error: API key not found
```

**Solution**: Add `NEXT_PUBLIC_GEMINI_API_KEY` to `.env.local`

### **Production Issues**

```
404 Not Found (Netlify function)
```

**Solution**:

1. Deploy to Netlify (functions don't work locally without Netlify CLI)
2. Add `GEMINI_API_KEY` to Netlify environment variables

The current setup gives you the best of both worlds - immediate development functionality with production-grade security! 🚀
