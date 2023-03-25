import { Box } from '@mui/material';
import { Fragment, ReactNode } from 'react';

type Props = {
  children?: ReactNode | ReactNode[];
  bgColored?: boolean;
};

const PageWrapper = ({ children, bgColored }: Props) => {
  return (
    <Box sx={{ background: bgColored ? '#f0f0f0' : '', minHeight: 'calc(100vh)' }}>
      {Array.isArray(children) ? children.map((c, i) => <Fragment key={i}>{c}</Fragment>) : children}
    </Box>
  );
};

export default PageWrapper;
