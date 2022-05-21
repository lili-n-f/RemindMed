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
      500: '#A2D729',
    },
    cyan: {
      500: '#59C3C3',
    },
    blue: {
      500: '#4062BB',
    },
    platinum: {
      500: '#EBEBEB',
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
