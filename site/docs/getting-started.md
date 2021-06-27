---
title: Getting Started
slug: /
---

## Step 1: Install Nodejs

```sh
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs
```

## Step 2: Generate a new project

```sh
npm init @nodosjs projectName 
```

This command performs next actions:

1. Generating file structure
1. Installing npm dependencies

## Step 3: Start your website

Run the development server in the newly created `projectName` directory:

```sh
cd projectName
npx nodos start
```

Then open *http://localhost:8080*

## That's it!

Congratulations! You've successfully setup and run Nodosjs project.
