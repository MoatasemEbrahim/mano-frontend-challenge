
# Frontend Project - React with Vite and TypeScript

This is the frontend portion of the Mano Health Code Challenge, built using React.js, Vite, and TypeScript.

## Requirements

- **Node.js** (version 20 or higher)
- **pnpm** (version 8.4 or higher)

## Project Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/MoatasemEbrahim/mano-frontend-challenge.git
   cd mano-frontend-challenge/frontend

2. **Instal node modules:**
   ```bash
    pnpm install

## Run Locally

1. **Create .env file and add the backend API URL in it:**
   ```bash
    mv ./.env.example .env

2. **Modify the the .env file:**
Add the backend API URL based on the backend configuration (by default http://localhost:8080)

3. **Start the server:**
   ```bash
    pnpm dev

The server will start on port 5173 by default (http://localhost:5173)


## Build

To build this project run

```bash
pnpm build
```


## Serve built files

To run the project from the built files run (you must run build command before this command)

```bash
pnpm preview
```
The server will start on port 4173 by default (http://localhost:4173)



