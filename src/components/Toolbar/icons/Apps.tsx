import type { IconProps } from "../../../types";

import React from "react";
import { getStroke } from "./index";

export const Apps = (props: IconProps) => {
  const stroke = getStroke(props);
  return (
    <svg viewBox="0 0 24 24">
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g
          transform="translate(-57.000000, -300.000000)"
          fill={stroke}
          fillRule="nonzero"
        >
          <g transform="translate(49.000000, 68.000000)">
            <g transform="translate(8.000000, 232.000000)">
              <path d="M17.6666667,4.5 L14.3333333,4.5 C13.3208113,4.5 12.5,5.32081129 12.5,6.33333333 L12.5,11.5 L17.6666667,11.5 C18.6791887,11.5 19.5,10.6791887 19.5,9.66666667 L19.5,6.33333333 C19.5,5.32081129 18.6791887,4.5 17.6666667,4.5 Z M14.3333333,5.5 L17.6666667,5.5 C18.126904,5.5 18.5,5.87309604 18.5,6.33333333 L18.5,9.66666667 L18.4935072,9.77119823 C18.442085,10.1820957 18.0915011,10.5 17.6666667,10.5 L13.5,10.5 L13.5,6.33333333 C13.5,5.87309604 13.873096,5.5 14.3333333,5.5 Z"></path>
              <path d="M6.33333333,19.5 C5.32081129,19.5 4.5,18.6791887 4.5,17.6666667 L4.5,17.6666667 L4.5,14.3333333 C4.5,13.8076007 4.72129121,13.3335535 5.07580904,12.9992561 C4.72129121,12.6664465 4.5,12.1923993 4.5,11.6666667 L4.5,11.6666667 L4.5,8.33333333 C4.5,7.32081129 5.32081129,6.5 6.33333333,6.5 L6.33333333,6.5 L10,6.5 C10.8284271,6.5 11.5,7.17157288 11.5,8 L11.5,8 L11.5,12.5 L15.6666667,12.5 C16.6285626,12.5 17.4174396,13.2407822 17.4939226,14.1829715 L17.5,14.3333333 L17.5,17.6666667 C17.5,18.6791887 16.6791887,19.5 15.6666667,19.5 L15.6666667,19.5 Z M10.5,13.5 L6.33333333,13.5 C5.90849891,13.5 5.55791502,13.8179043 5.50649285,14.2288018 L5.50649285,14.2288018 L5.5,14.3333333 L5.5,17.6666667 C5.5,18.126904 5.87309604,18.5 6.33333333,18.5 L6.33333333,18.5 L10.5,18.5 L10.5,13.5 Z M15.6666667,13.5 L11.5,13.5 L11.5,18.5 L15.6666667,18.5 C16.126904,18.5 16.5,18.126904 16.5,17.6666667 L16.5,17.6666667 L16.5,14.3333333 C16.5,13.873096 16.126904,13.5 15.6666667,13.5 L15.6666667,13.5 Z M10,7.5 L6.33333333,7.5 C5.87309604,7.5 5.5,7.87309604 5.5,8.33333333 L5.5,8.33333333 L5.5,11.6666667 C5.5,12.126904 5.87309604,12.5 6.33333333,12.5 L6.33333333,12.5 L10.5,12.5 L10.5,8 C10.5,7.75454011 10.3231248,7.55039163 10.0898756,7.50805567 L10.0898756,7.50805567 L10,7.5 Z"></path>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};