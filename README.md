This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Introduction

This is the consumer site for the Teaching Kit. The data displayed is kept on a Strapi service with [this source code](https://github.com/Frank-Digital-Experiences/kth-teaching-kit-backend).

## Initial setup

First, create an `.env`-file with the keys specified in .env.example. Get the value for each key by someone knowledgeable of the service. It is of course of utter importance that this file remains in the `.gitignore`.

After having set the environment variables, run:

```bash
npm install
npm run dev
```

... and the service should be up and running on http://localhost:3000.

In order for the service to run as expected, it needs data which are supposed to be fetched from Strapi on http://localhost:1337. You can pull the source code for the Strapi project from [here](https://github.com/Frank-Digital-Experiences/kth-teaching-kit-backend).

## Styling

We use [@emotion/styled-components](https://emotion.sh/docs/styled) for styling in this project. In some rare cases we use regular in-line CSS-in-JS in order to adjust external components from e.g Material-UI. In these cases we stick to the CSS-in-JS throughout the whole component.
