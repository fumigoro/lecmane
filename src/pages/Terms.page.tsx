import { Container, Typography, Box, Button } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/general/BackgroundWrapper';
import { Header } from '../components/general/Header';
import MobileNavigation from '../components/general/Navigation';

const Head1 = ({ children }: { children: ReactNode }) => (
  <Typography variant="h4" fontWeight="bold" my={2}>
    {children}
  </Typography>
);

const Head2 = ({ children }: { children: ReactNode }) => (
  <Typography variant="h6" my={1}>
    {children}
  </Typography>
);

const TermsPage = () => {
  const navigate = useNavigate();
  const clearAll = () => {
    if (
      window.confirm('講義のお気に入り登録を含む全てのデータが削除されます。この操作は元に戻せません。よろしいですか？')
    ) {
      localStorage.clear();
      window.alert('削除しました');
      navigate('/');
    }
  };
  return (
    <PageWrapper>
      <Header pageTitle="利用規約・プライバシーポリシー" showBackButton />
      <Container maxWidth="xl">
        <Head1>1. はじめに</Head1>
        <Typography variant="body1">
          fumigoro（以下「当方」）は履修管理サービス「レクマネ」（以下「本サービス」）を開発・運営しています。本サービスの利用によって、本規約に同意していただいたものとみなします。
        </Typography>
        <Box my={2} p={1} sx={{ background: deepOrange[400] }} color="white">
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            重要
          </Typography>
          <Typography>
            本サービスは当方が独自に開発・運営しており、サービス自体及び提供する情報の一切は岐阜大学より認可（これに類するものを含む）を受けたものではありません。
          </Typography>
        </Box>

        <Head1>2. 情報収集および利用</Head1>
        <Typography variant="body1">本サービスの利用に際して、当方は以下の利用者情報を取得いたします。</Typography>

        <Head2>2-1. 本サービスのご利用状況</Head2>
        <Typography variant="body1">
          当サイトでは利用状況解析のためにGoogle アナリティクス」を使用しています。
          このGoogleアナリティクスはデータの収集のためにCookieを使用しています。
          このデータは匿名で収集されており、個人を特定するものではありません。 Google アナリティクスの詳細は
          <a href="https://marketingplatform.google.com/about/analytics/terms/jp/">
            Googleアナリティクスサービス利用規約
          </a>
          や<a href="https://policies.google.com/technologies/ads?hl=ja">ポリシーと規約</a>をご覧ください。
        </Typography>
        <Head2>2-2. お問い合わせの際の個人情報</Head2>
        <Typography variant="body1">
          お問い合わせの際に収集した情報は、お問い合わせに対する返信のために利用いたします。
        </Typography>

        <Head1>3. 個人情報の管理</Head1>
        <Typography variant="body1">
          当方は、2-2に記載の個人情報を正確な状態に保ち、個人情報への不正アクセス・紛失・破損・改ざん・漏洩などを防止するため、安全対策を実施し個人情報の厳重な管理を行います。
        </Typography>

        <Head1>4. 個人情報の第三者への開示・提供の禁止</Head1>
        <Typography variant="body1">
          当方は、ご利用者様よりお預かりした個人情報を適切に管理し、次のいずれかに該当する場合を除き、個人情報を第三者に開示いたしません。
        </Typography>
        <ul>
          <li>ご利用者様の同意がある場合</li>
          <li>法令に基づき開示することが必要である場合</li>
        </ul>

        <Head1>5. 免責事項</Head1>
        <Typography gutterBottom>
          本サービスは当方が独自に開発・運営しており、サービス自体及び提供する情報の一切は岐阜大学より認可（これに類するものを含む）を受けたものではありません。
        </Typography>
        <Typography gutterBottom>本サービスは岐阜大学とは関係ございません。</Typography>
        <Typography gutterBottom>
          本サービスは当方が独自に開発・運営しており、サービス自体及び提供する情報の一切は岐阜大学より認可（これに類するものを含む）を受けたものではありません。
        </Typography>
        <Typography gutterBottom>
          当方は本サービスがご利用者様の特定の目的に適合すること、期待する機能・価値・正確性・有用性を有すること、および不具合が生じないことについて、何ら保証することはありません。
        </Typography>
        <Typography gutterBottom>
          当方は、本サービスの提供の終了、変更、または利用不能、本サービスの利用によるデータの消失または機械の故障もしくは損傷、履修に関する不利益、その他本サービスに関してご利用者様が被った損害につき、賠償する責任を一切負わないものとします。
        </Typography>
        <Box sx={{ my: 1 }}>
          <Typography align="center" variant="body2">
            上記事項に同意いただけない場合
          </Typography>
          <Button
            variant="outlined"
            color="error"
            fullWidth
            onClick={() => {
              clearAll();
            }}
          >
            サービスの利用をやめる
          </Button>
        </Box>
      </Container>
      <MobileNavigation />
    </PageWrapper>
  );
};

export default TermsPage;
