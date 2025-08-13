#!/bin/bash
#npx serve -s dist

# Pull latest code from main branch
git pull origin main

# Install dependencies
npm install

# Build the project
npm run build

systemctl reload nginx
