import { createTheme } from '@mui/material/styles';
import { grey, orange } from '@mui/material/colors';

export const primaryColor = orange;

export const mainTheme = createTheme({
  typography: {
    fontSize: 13,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    fontFamily: 'Noto Sans JP',

    h1: { fontSize: 30, fontWeight: 'bold' },
    h2: { fontSize: 26, fontWeight: 'bold' },
    h3: { fontSize: 22, fontWeight: 'bold' },
    h4: { fontSize: 20, fontWeight: 'bold' },
    h5: { fontSize: 18, fontWeight: 'bold' },
    h6: { fontSize: 16, fontWeight: 'bold' },
    subtitle1: { fontSize: 18 },
    subtitle2: { fontSize: 14 },
    body1: { fontSize: 16 },
    body2: { fontSize: 12 },
    // ボタンのアルファベット大文字化を無効にする
    button: { textTransform: 'none' }
  },
  palette: {
    primary: {
      main: primaryColor[500],
      light: primaryColor[100]
    },
    secondary: {
      main: grey[800]
    }
  }
});
