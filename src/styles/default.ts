import { css } from '@emotion/react'
import { ubuntu, montserrat } from './fonts'
import { Background, mq, Neutral99, OnNeutral99 } from './global'

const defaultStyle = css`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: ${ubuntu[700].style.fontFamily};
    margin-top: 0;
  }

  h1 {
    font-size: 3.2rem;
    ${mq.sm} {
      font-size: 4rem;
    }
  }

  h2 {
    font-size: 2.4rem;
    ${mq.sm} {
      font-size: 3.2rem;
    }
  }

  h3 {
    margin: 1rem 0;

    font-size: 2rem;
    ${mq.sm} {
      font-size: 2.8rem;
    }
  }

  h4 {
    margin: 1rem 0;
    font-size: 1.8rem;
    ${mq.sm} {
      font-size: 2.4rem;
    }
  }

  h5 {
    margin: 0;

    font-size: 1.6rem;
    font-family: ${montserrat[400].style.fontFamily};
  }

  h6 {
    margin: 0;

    font-size: 1.6rem;
    font-family: ${ubuntu[700].style.fontFamily};
  }

  p,
  li {
    margin: 0.8rem 0;

    font-size: 1.6rem;
    font-family: ${montserrat[400].style.fontFamily};
  }

  table {
    font-size: 1.6rem;
    font-family: ${montserrat[400].style.fontFamily};
    border-collapse: collapse;
    margin-bottom: 1.6rem;
    th {
      background-color: ${Neutral99};
      color: ${OnNeutral99};
    }
    th,
    td {
      border: 1px solid ${OnNeutral99};
      padding: 0.5rem;
    }
    tr:nth-of-type(even) {
      background-color: ${Neutral99};
      color: ${OnNeutral99};
    }
  }

  label {
    font-size: 1.4rem;
    font-family: ${ubuntu[500].style.fontFamily};
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

  strong {
    font-family: ${montserrat[600].style.fontFamily};
  }

  main {
    background-image: url('/icons/three-lines.svg');
    background-repeat: no-repeat;
    background-position: bottom -150px right -40px;
    background-size: 90%;
    ${mq.sm} {
      background-position: bottom -300px right;
      background-size: initial;
    }
  }
`

export default defaultStyle
