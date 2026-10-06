# Divar Shop CDN

## Overview

This service provides static CDN and file-upload functionality for the Divar Shop project.

## Requirements

- Node.js
- npm

## Installation

```bash
git clone https://github.com/mahdintm/Divar_Shop_CDN.git
cd Divar_Shop_CDN
npm install
```

## Running

Development:

```bash
npm run dev
```

Normal start:

```bash
npm start
```

## Configuration

### PORT

Configures the HTTP server port.

Default: `3002`

### CORS_ORIGIN

Configures the allowed CORS origin.

Default: `https://shop.agahpardazan.ir`

## Upload endpoint

### POST /upload

The endpoint accepts a multipart upload in the `files` form field.

The endpoint expects one image upload and returns the generated file name for a successful upload.

## Static files

The service serves the `public` directory through Express static middleware.

## Repository note

The `public` directory is covered by `.gitignore`; generated or runtime public content should not be committed when covered by that rule.
