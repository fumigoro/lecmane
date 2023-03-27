import { Box, Button, Container, Fade, MobileStepper, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import React from 'react';
import { Link } from 'react-router-dom';
import { primaryColor } from '../../styles/theme';

type WalkThroughProps = {
  startApp: () => void;
};
export const WalkThrough = (props: WalkThroughProps) => {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const steps = 4;
  return (
    <>
      <Box sx={{ height: '100vh', position: 'relative', backgroundColor: primaryColor[50] }}>
        <Fade in={activeStep === 0}>
          <Box sx={{ position: 'absolute', top: '35vh', width: '100%' }}>
            <Typography variant="h2" align="center" fontWeight="bold" gutterBottom>
              岐大生のための
            </Typography>
            <Typography
              variant="h1"
              align="center"
              sx={{
                width: 'fit-content',
                borderBottom: `3px solid ${primaryColor[500]}`,
                margin: 'auto'
              }}
              color="primary"
            >
              履修管理サービス
            </Typography>
          </Box>
        </Fade>
        <Fade in={activeStep === 1}>
          <Box sx={{ position: 'absolute', top: '25vh', width: '100%' }}>
            <Box height={150} />
            <Typography variant="h2" sx={{ textAlign: 'center', fontWeight: 'bold' }} gutterBottom>
              講義を探して
            </Typography>
            <Typography
              variant="h1"
              sx={{
                textAlign: 'center',
                width: 'fit-content',
                borderBottom: `3px solid ${primaryColor[500]}`,
                margin: 'auto',
                color: primaryColor[500]
              }}
            >
              お気に入り登録！
            </Typography>
          </Box>
        </Fade>
        <Fade in={activeStep === 2}>
          <Box sx={{ position: 'absolute', top: '35vh', width: '100%' }}>
            <Typography variant="h2" sx={{ textAlign: 'center', fontWeight: 'bold' }} gutterBottom>
              登録した講義から
            </Typography>
            <Box sx={{ width: 'fit-content', margin: 'auto' }}>
              <Typography
                variant="h1"
                sx={{
                  m: 0.5,
                  textAlign: 'center',
                  width: 'fit-content',
                  display: 'inline-block',
                  borderBottom: `3px solid ${primaryColor[500]}`,
                  color: primaryColor[500]
                }}
              >
                時間割
              </Typography>
              <Typography variant="h3" sx={{ textAlign: 'center', display: 'inline-block' }} gutterBottom>
                や
              </Typography>
              <Typography
                variant="h1"
                sx={{
                  m: 0.5,
                  textAlign: 'center',
                  width: 'fit-content',
                  display: 'inline-block',
                  borderBottom: `3px solid ${primaryColor[500]}`,
                  color: primaryColor[500]
                }}
              >
                教科書リスト
              </Typography>
              <Typography variant="h3" sx={{ textAlign: 'center', display: 'inline-block' }} gutterBottom>
                を
              </Typography>
            </Box>
            <Box height={20} />

            <Typography
              variant="h1"
              sx={{
                textAlign: 'center',
                width: 'fit-content',
                borderBottom: `3px solid ${primaryColor[500]}`,
                margin: 'auto',
                color: primaryColor[500]
              }}
            >
              自動で作成！
            </Typography>
          </Box>
        </Fade>
        <Fade in={activeStep === 3}>
          <Box>
            <Box sx={{ position: 'absolute', top: '10vh', width: '100%' }}>
              <Typography variant="h4" sx={{ textAlign: 'center' }} gutterBottom>
                岐大生のための履修管理サービス
              </Typography>
              <Typography variant="h1" sx={{ textAlign: 'center', width: 'fit-content', margin: 'auto' }}>
                レクマネ
              </Typography>
              <Box height={80} />

              <Typography
                variant="h3"
                sx={{
                  textAlign: 'center',
                  width: 'fit-content',
                  borderBottom: `3px solid ${primaryColor[500]}`,
                  margin: 'auto',
                  color: primaryColor[500]
                }}
              >
                ご利用にあたって
              </Typography>
              <Box height={10} />

              <Container>
                <Typography m={2} variant="h6" gutterBottom>
                  ・このサービスは岐阜大学より認可を受けたものではありません。
                </Typography>
                <Typography m={2} variant="h6" gutterBottom>
                  ・ご利用により生じたいかなる損害についても責任を負いかねます。
                </Typography>
                <Typography m={2} variant="h6" gutterBottom>
                  ・このサービスは有志の岐大生が趣味で開発しており、岐阜大学や企業などの営利団体との関係はありません。
                </Typography>
              </Container>
            </Box>
            <Box sx={{ position: 'absolute', width: '100%', bottom: '50px', textAlign: 'center' }}>
              <Typography>上記事項をご理解の上、</Typography>
              <Typography gutterBottom>
                <Link to="/terms">利用規約とプライバシーポリシー</Link>に同意して
              </Typography>
              <Button
                variant="contained"
                onClick={(e) => {
                  props.startApp();
                }}
                sx={{
                  borderRadius: 5,
                  backgroundColor: primaryColor[500],
                  width: '80vw',
                  margin: 'auto',
                  fontSize: 16
                }}
              >
                はじめる
              </Button>
            </Box>
          </Box>
        </Fade>
        <Box
          sx={{
            position: 'absolute',
            bottom: '30px',
            width: '100%'
          }}
        >
          <MobileStepper
            variant="dots"
            steps={steps}
            position="static"
            activeStep={activeStep}
            sx={{
              backgroundColor: primaryColor[50],
              display: activeStep === 3 ? 'none' : '',
              m: 2
            }}
            nextButton={
              <Button
                variant="contained"
                sx={{
                  borderRadius: 5,
                  backgroundColor: primaryColor[500]
                }}
                endIcon={<NavigateNextIcon />}
                onClick={handleNext}
              >
                次へ
              </Button>
            }
            backButton={
              activeStep === 0 ? (
                <Button
                  sx={{ borderRadius: 5 }}
                  onClick={(e) => {
                    props.startApp();
                  }}
                >
                  スキップ
                </Button>
              ) : (
                <Button sx={{ borderRadius: 5 }} startIcon={<NavigateBeforeIcon />} onClick={handleBack}>
                  戻る
                </Button>
              )
            }
          />
        </Box>
      </Box>
    </>
  );
};
