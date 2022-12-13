import { Ubuntu } from '@next/font/google'
import { css } from "@emotion/react"

export const ubuntuFont = Ubuntu({
  subsets: ['latin'],
  style: ['normal'],
  weight: '500',
})

const defaultStyle = css`

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: ${ubuntuFont.style.fontFamily}
  }

  h1 {
    font-size: 4.5rem;
  }

  h2 {
    font-size: 3rem;
  }

  h3 {
    font-size: 2rem;
  }

  h4, h5 {
    font-size: 1.7rem;
  }

  p, li {
    font-size: 1.7rem;
  }
  
  html,
  body {
    font-size: 10px;

    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }

  .container {
    padding: 0 2rem;
  }

  @media (prefers-color-scheme: dark) {
    html {
      color-scheme: dark;
    }
    body {
      color: white;
      background: black;
    }
  }
  
`

export default defaultStyle