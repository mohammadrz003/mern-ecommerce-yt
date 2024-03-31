import { css } from "styled-components";

const size = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  xl2: "1536px",
};

export const sm = (inner) => css`
  @media screen and (min-width: ${size.sm}) {
    ${inner};
  }
`;
export const md = (inner) => css`
  @media screen and (min-width: ${size.md}) {
    ${inner};
  }
`;
export const lg = (inner) => css`
  @media screen and (min-width: ${size.lg}) {
    ${inner};
  }
`;
export const xl = (inner) => css`
  @media screen and (min-width: ${size.xl}) {
    ${inner};
  }
`;
export const xl2 = (inner) => css`
  @media screen and (min-width: ${size.xl2}) {
    ${inner};
  }
`;

const screens = { sm, md, lg, xl, xl2 };

export default screens;
