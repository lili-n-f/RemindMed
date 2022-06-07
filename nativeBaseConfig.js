import { extendTheme } from 'native-base';

export const theme = extendTheme({
  colors: {
    primary: {
      50: '#f6f6fa',
      100: '#eeedf5',
      200: '#d4d1e6',
      300: '#bab6d7',
      400: '#867fba',
      500: '#52489c',
      600: '#4a418c',
      700: '#3e3675',
      800: '#312b5e',
      900: '#28234c',
    },
    green: {
      50: '#E5F4C4',
      100: '#DEF1B2',
      200: '#CFEA90',
      300: '#C0E46E',
      400: '#B1DD4B',
      500: '#A2D729',
      600: '#7FA81F',
      700: '#5B7917',
      800: '#384A0E',
      900: '#141B05',
    },
    cyan: {
      50: '#E0F4F4',
      100: '#D1EEEE',
      200: '#B3E3E3',
      300: '#95D9D9',
      400: '#77CECE',
      500: '#59C3C3',
      600: '#3DA7A7',
      700: '#2E7E7E',
      800: '#1F5555',
      900: '#102C2C',
    },
    blue: {
      50: '#C7D1EC',
      100: '#B8C5E7',
      200: '#99ACDC',
      300: '#7B93D2',
      400: '#5C7AC7',
      500: '#4062BB',
      600: '#324C91',
      700: '#233667',
      800: '#15203E',
      900: '#070A14',
    },
    platinum: {
      50: '#FFFFFF',
      100: '#FFFFFF',
      200: '#FFFFFF',
      300: '#FFFFFF',
      400: '#FFFFFF',
      500: '#EBEBEB',
      600: '#CFCFCF',
      700: '#B3B3B3',
      800: '#979797',
      900: '#7B7B7B',
    },
  },
  fontConfig: {
    Roboto: {
      100: {
        normal: 'Roboto-Light',
        italic: 'Roboto-LightItalic',
      },
      200: {
        normal: 'Roboto-Light',
        italic: 'Roboto-LightItalic',
      },
      300: {
        normal: 'Roboto-Light',
        italic: 'Roboto-LightItalic',
      },
      400: {
        normal: 'Roboto-Regular',
        italic: 'Roboto-Italic',
      },
      500: {
        normal: 'Roboto-Medium',
      },
      600: {
        normal: 'Roboto-Medium',
        italic: 'Roboto-MediumItalic',
      },
    },
    fonts: {
      heading: 'Roboto',
      body: 'Roboto',
      mono: 'Roboto',
    },
  },
});
