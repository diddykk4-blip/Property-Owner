# Deployment Guide - Product Management System

This folder contains a fully static, modular version of the **Product Management System**. It is designed to be hosted on any static web server or modern hosting platform.

## Folder Structure
- `index.html`: Main dashboard (All Products).
- `pending.html`, `approved.html`, `archived.html`: List views.
- `add-product.html`: Form for new products.
- `review-product.html`: Standalone product review screen.
- `management-ui.css`: Shared component styles.
- `management.js`: Interactive logic (collapsibles, notifications, etc.).
- `global-styles.css`: Core design system variables.
- `Logo image.png`: Wealth Market brand logo.

## Deployment Options

### 1. Simple Static Hosting (Netlify / Vercel / GitHub Pages)
1. Drag and drop the `product-management` folder into a new Netlify site.
2. Or, push this folder to a GitHub repository and connect it to Vercel/Netlify.
3. No build steps are required.

### 2. Standard Web Server (Apache / Nginx)
1. Copy the contents of this folder to your web root (e.g., `/var/www/html/product-management/`).
2. Ensure the server has permission to read the `.html`, `.css`, and `.js` files.
3. Access via `http://your-domain.com/product-management/index.html`.

### 3. Local Preview
Simply open `index.html` in any modern web browser.

---
**Note:** All paths are relative, so the folder can be moved or renamed without breaking the application.
