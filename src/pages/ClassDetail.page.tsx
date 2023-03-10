import { Button, Container, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { classApi } from '../classes.api';
import { ClassDetail } from '../components/class/common/ClassDetail';
import PageWrapper from '../components/general/BackgroundWrapper';
import { FullScreenMessage } from '../components/general/FullScreenMessage';
import { Header } from '../components/general/Header';
import MobileNavigation from '../components/general/Navigation';
import { Year, years } from '../types/filter/Year';
import { FullClass } from '../types/global';

const toYear = (yearString: string) => {
  const y: Year = Number(yearString) as any;
  if (years.map((y) => y.value).includes(y)) {
    return y as Year;
  }
  return undefined;
};

const ClassDetailPage = () => {
  const { id } = useParams();
  const { search } = useLocation();
  const query = useMemo(() => new URLSearchParams(search), [search]);
  const year = toYear(query.get('y') || '');
  const [fullData, setFullData] = useState<undefined | FullClass>(undefined);

  const [failed, setFailed] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!(year && id)) {
      return;
    }
    classApi.getSyllabus(year, id).then((fc) => {
      if (!fc) {
        setFailed(true);
        return;
      }
      setFullData(fc);
    });
  }, [year, id]);

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
