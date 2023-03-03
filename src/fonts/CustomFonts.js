import { Global } from '@mantine/core';

import black from './Gotham/Gotham-Black.otf'
import bold from './Gotham/Gotham-Bold.otf'
import bookitalic from './Gotham/Gotham-BookItalic.otf'
import light from './Gotham/Gotham-Light.otf'
import thin from './Gotham/Gotham-Thin.otf'
import thinitalic from './Gotham/Gotham-ThinItalic.otf'
import ultraitalic from './Gotham/Gotham-UltraItalic.otf'
import xlight from './Gotham/Gotham-XLight.otf'
import xlightitalic from './Gotham/Gotham-XLightItalic.otf'
import bold2 from './Gotham/GothamBold.ttf'
import bolditalic2 from './Gotham/GothamBoldItalic.ttf'
import book2 from './Gotham/GothamBook.ttf'
import bookitalic2 from './Gotham/GothamBookItalic.ttf'
import light2 from './Gotham/GothamLight.ttf'
import lightitalic2 from './Gotham/GothamLightItalic.ttf'
import medium from './Gotham/GothamMedium.ttf'
import mediumitalic2 from './Gotham/GothamMediumItalic.ttf'

import nova from './Proxima Nova/Proxima Nova Font.otf'

import lexend from './Lexend/Lexend-VariableFont_wght.ttf'

import itcXlt from './ITC Avant Garde Gothic/ITCAvantGardeStd-XLt.ttf'
import itcBk from './ITC Avant Garde Gothic/ITCAvantGardeStd-Bk.ttf'
import itcMd from './ITC Avant Garde Gothic/ITCAvantGardeStd-Md.ttf'
import itcDemi from './ITC Avant Garde Gothic/ITCAvantGardeStd-Demi.ttf'
import itcBold from './ITC Avant Garde Gothic/ITCAvantGardeStd-Bold.ttf'

import itcXltCn from './ITC Avant Garde Gothic/ITCAvantGardeStd-XLtCn.ttf'
import itcBkCn from './ITC Avant Garde Gothic/ITCAvantGardeStd-BkCn.ttf'
import itcMdCn from './ITC Avant Garde Gothic/ITCAvantGardeStd-MdCn.ttf'
import itcDemiCn from './ITC Avant Garde Gothic/ITCAvantGardeStd-DemiCn.ttf'
import itcBoldCn from './ITC Avant Garde Gothic/ITCAvantGardeStd-BoldCn.ttf'

const CustomFonts = () => {
  return (
    <Global
      styles={[
        {
          '@font-face': {
            fontFamily: 'Gotham',
            src: `url('${thinitalic}') format("opentype")`,
            fontStyle: 'italic',
            fontWeight: '100'
          },
        },
        {
          '@font-face': {
            fontFamily: 'Gotham',
            src: `url('${xlightitalic}') format("opentype")`,
            fontStyle: 'italic',
            fontWeight: '200'
          },
        },
        {
          '@font-face': {
            fontFamily: 'Gotham',
            src: `url('${lightitalic2}') format("truetype")`,
            fontStyle: 'italic',
            fontWeight: '300'
          },
        },
        {
          '@font-face': {
            fontFamily: 'Gotham',
            src: `url('${bookitalic2}') format("truetype")`,
            fontStyle: 'italic',
            fontWeight: '400'
          },
        },
        {
          '@font-face': {
            fontFamily: 'Gotham',
            src: `url('${bookitalic}') format("opentype")`,
            fontStyle: 'italic',
            fontWeight: '500'
          },
        },
        {
          '@font-face': {
            fontFamily: 'Gotham',
            src: `url('${mediumitalic2}') format("truetype")`,
            fontStyle: 'italic',
            fontWeight: '600'
          },
        },
        {
          '@font-face': {
            fontFamily: 'Gotham',
            src: `url('${bolditalic2}') format("truetype")`,
            fontStyle: 'italic',
            fontWeight: '700'
          },
        },
        {
          '@font-face': {
            fontFamily: 'Gotham',
            src: `url('${ultraitalic}') format("opentype")`,
            fontStyle: 'italic',
            fontWeight: '800'
          },
        },
        {
          '@font-face': {
            fontFamily: 'Gotham',
            src: `url('${thin}') format("opentype")`,
            fontStyle: 'normal',
            fontWeight: '100'
          },
        },
        {
          '@font-face': {
            fontFamily: 'Gotham',
            src: `url('${xlight}') format("opentype")`,
            fontStyle: 'normal',
            fontWeight: '200'
          },
        },
        {
          '@font-face': {
            fontFamily: 'Gotham',
            src: `url('${light2}') format("truetype")`,
            fontStyle: 'normal',
            fontWeight: '300'
          },
        },
        {
          '@font-face': {
            fontFamily: 'Gotham',
            src: `url('${light}') format("opentype")`,
            fontStyle: 'normal',
            fontWeight: '400'
          },
        },
        {
          '@font-face': {
            fontFamily: 'Gotham',
            src: `url('${book2}') format("truetype")`,
            fontStyle: 'normal',
            fontWeight: '500'
          },
        },
        {
          '@font-face': {
            fontFamily: 'Gotham',
            src: `url('${medium}') format("truetype")`,
            fontStyle: 'normal',
            fontWeight: '600'
          },
        },
        {
          '@font-face': {
            fontFamily: 'Gotham',
            src: `url('${bold}') format("opentype")`,
            fontStyle: 'normal',
            fontWeight: '700'
          },
        },
        {
          '@font-face': {
            fontFamily: 'Gotham',
            src: `url('${bold2}') format("truetype")`,
            fontStyle: 'normal',
            fontWeight: '800'
          },
        },
        {
          '@font-face': {
            fontFamily: 'Gotham',
            src: `url('${black}') format("opentype")`,
            fontStyle: 'normal',
            fontWeight: '900'
          },
        },
        {
          '@font-face': {
            fontFamily: 'Proxima Nova',
            src: `url('${nova}') format("opentype")`,
          },
        },
        {
          '@font-face': {
            fontFamily: 'Lexend',
            src: `url('${lexend}') format("truetype")`,
          },
        },
        {
          '@font-face': {
            fontFamily: 'ITC Avant Garde Gothic',
            src: `url(${itcXlt}) format('truetype')`,
            fontWeight: 200,
          },
        },
        {
          '@font-face': {
            fontFamily: 'ITC Avant Garde Gothic',
            src: `url(${itcBk}) format('truetype')`,
            fontWeight: 300,
          },
        },
        {
          '@font-face': {
            fontFamily: 'ITC Avant Garde Gothic',
            src: `url(${itcMd}) format('truetype')`,
            fontWeight: 400,
          },
        },
        {
          '@font-face': {
            fontFamily: 'ITC Avant Garde Gothic',
            src: `url(${itcDemi}) format('truetype')`,
            fontWeight: 500,
          },
        },
        {
          '@font-face': {
            fontFamily: 'ITC Avant Garde Gothic',
            src: `url(${itcBold}) format('truetype')`,
            fontWeight: 600,
          },
        },
        {
          '@font-face': {
            fontFamily: 'ITC Avant Garde Gothic Cn',
            src: `url(${itcXltCn}) format('truetype')`,
            fontWeight: 200,
          },
        },
        {
          '@font-face': {
            fontFamily: 'ITC Avant Garde Gothic Cn',
            src: `url(${itcBkCn}) format('truetype')`,
            fontWeight: 300,
          },
        },
        {
          '@font-face': {
            fontFamily: 'ITC Avant Garde Gothic Cn',
            src: `url(${itcMdCn}) format('truetype')`,
            fontWeight: 400,
          },
        },
        {
          '@font-face': {
            fontFamily: 'ITC Avant Garde Gothic Cn',
            src: `url(${itcDemiCn}) format('truetype')`,
            fontWeight: 500,
          },
        },
        {
          '@font-face': {
            fontFamily: 'ITC Avant Garde Gothic Cn',
            src: `url(${itcBoldCn}) format('truetype')`,
            fontWeight: 600,
          },
        },
      ]}
    />
  );
}

export default CustomFonts;