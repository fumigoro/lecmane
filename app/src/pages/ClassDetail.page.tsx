import { Button, Container, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { ClassDetail } from '../components/class/common/ClassDetail';
import PageWrapper from '../components/general/BackgroundWrapper';
import { FullScreenMessage } from '../components/general/FullScreenMessage';
import { Header } from '../components/general/Header';
import MobileNavigation from '../components/general/Navigation';
import useGA4PageEvent from '../hooks/useGA4PageEvent';
import useQueryParams from '../hooks/useQueryParams';
import useSyllabus from '../hooks/useSyllabus';
import { Year, years } from '../types/filter/Year';

const toYear = (yearString: string) => {
  const y = Number(yearString) as Year;
  if (years.map((y) => y.value).includes(y)) {
    return y;
  }
  return undefined;
};

const ClassDetailPage = () => {
  useGA4PageEvent();
  const { id } = useParams();
  const { y: yearString } = useQueryParams<{ y: string }>();
  const year = toYear(yearString || '');

  const { fullData, failed } = useSyllabus(year, id);

  const navigate = useNavigate();

  return (
    <PageWrapper>
      <Header pageTitle={(fullData && fullData.title) || '講義詳細'} showBackButton />
      <Container maxWidth="xl">
        {fullData && <ClassDetail fullData={fullData} />}
        {!fullData && !failed && <FullScreenMessage progress label="読み込み中" />}
        {failed && (
          <FullScreenMessage>
            <Typography gutterBottom>シラバスが見つかりませんでした</Typography>
            <div>
              <Button variant="contained" onClick={() => navigate(-1)}>
                戻る
              </Button>
            </div>
          </FullScreenMessage>
        )}
      </Container>
      <MobileNavigation />
    </PageWrapper>
  );
};

export default ClassDetailPage;
