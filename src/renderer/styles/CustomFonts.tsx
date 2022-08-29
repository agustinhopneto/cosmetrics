import { Global } from '@mantine/core';
import lexendThin from '../assets/fonts/lexend/Lexend-Thin.ttf';
import lexendExtraLight from '../assets/fonts/lexend/Lexend-ExtraLight.ttf';
import lexendLight from '../assets/fonts/lexend/Lexend-Light.ttf';
import lexendRegular from '../assets/fonts/lexend/Lexend-Regular.ttf';
import lexendMedium from '../assets/fonts/lexend/Lexend-Medium.ttf';
import lexendSemiBold from '../assets/fonts/lexend/Lexend-SemiBold.ttf';
import lexendBold from '../assets/fonts/lexend/Lexend-Bold.ttf';

export function CustomFonts() {
  return (
    <Global
      styles={[
        {
          '@font-face': {
            fontFamily: 'Lexend',
            src: `url('${lexendThin}') format("ttf")`,
            fontWeight: 100,
            fontStyle: 'normal',
          },
        },
        {
          '@font-face': {
            fontFamily: 'Lexend',
            src: `url('${lexendExtraLight}') format("ttf")`,
            fontWeight: 200,
            fontStyle: 'normal',
          },
        },
        {
          '@font-face': {
            fontFamily: 'Lexend',
            src: `url('${lexendLight}') format("ttf")`,
            fontWeight: 300,
            fontStyle: 'normal',
          },
        },
        {
          '@font-face': {
            fontFamily: 'Lexend',
            src: `url('${lexendRegular}') format("ttf")`,
            fontWeight: 400,
            fontStyle: 'normal',
          },
        },
        {
          '@font-face': {
            fontFamily: 'Lexend',
            src: `url('${lexendMedium}') format("ttf")`,
            fontWeight: 500,
            fontStyle: 'normal',
          },
        },
        {
          '@font-face': {
            fontFamily: 'Lexend',
            src: `url('${lexendSemiBold}') format("ttf")`,
            fontWeight: 600,
            fontStyle: 'normal',
          },
        },
        {
          '@font-face': {
            fontFamily: 'Lexend',
            src: `url('${lexendBold}') format("ttf")`,
            fontWeight: 700,
            fontStyle: 'normal',
          },
        },
      ]}
    />
  );
}
