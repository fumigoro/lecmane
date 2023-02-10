import { createTheme } from '@mui/material/styles';
import { orange, pink } from '@mui/material/colors';

export const theme = createTheme({
  typography: {
    fontSize: 13,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    fontFamily: 'Noto Sans JP',

    h1: { fontSize: 30 },
    h2: { fontSize: 26 },
    h3: { fontSize: 22 },
    h4: { fontSize: 20 },
    h5: { fontSize: 18 },
    h6: { fontSize: 16 },
    subtitle1: { fontSize: 18 },
    subtitle2: { fontSize: 14 },
    body1: { fontSize: 16 },
    body2: { fontSize: 12 },
    // ボタンのアルファベット大文字化を無効にする
    button: { textTransform: 'none' }
  },
  palette: {
    primary: orange,
    secondary: pink
  }
});
