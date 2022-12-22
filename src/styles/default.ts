import { css } from '@emotion/react'
import { ubuntu, montserrat } from './fonts'
import { Background } from './global'

const defaultStyle = css`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: ${ubuntu['400'].style.fontFamily};
  }

  h1 {
    font-size: 4.5rem;
  }

  h2 {
    font-size: 3rem;
  }

  h3 {
    margin: 1rem 0;

    font-size: 2rem;
  }

  h4,
  h5 {
    margin: 1rem 0;
    font-size: 1.9rem;
  }

  p,
  li {
    margin: 1rem 0;

    font-size: 1.5rem;
    font-family: ${montserrat['400'].style.fontFamily};
  }

  label {
    font-size: 1.3rem;
    font-family: ${ubuntu['400'].style.fontFamily};
  }

  html,
  body {
    padding: 0;
    margin: 0;

    background-color: ${Background};

    font-size: 10px;
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
    padding: 0 8rem;
  }
`

export default defaultStyle
