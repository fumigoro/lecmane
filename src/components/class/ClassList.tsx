import { Box, CircularProgress, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { Class } from '../../types/global';
import { ClassListItem } from './common/ClassListItem';

type Props = {
  classes: Class[];
};

export const ClassList = ({ classes }: Props) => {
  const [numOfLoad, setNumOfLoad] = useState(50);

  // 表示数を増やす
  const loadMore = () => {
    const numOfLoadNew = classes.length > numOfLoad + 100 ? numOfLoad + 100 : classes.length;
    setNumOfLoad(numOfLoadNew);
  };

  // 一番下に設置したダミー要素が画面内に入ったら表示数を増やすクリックイベントを持った要素をクリックしイベント発動
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const btn: any = document.querySelector('#load_more');
        if (btn) {
          btn.click();
        }
      }
    });
    observer.observe(ref.current);
  }, []);

  return (
    <>
      <div>{classes.length}</div>
      {classes.flatMap((c, index) => (index < numOfLoad ? [<ClassListItem key={index} classItem={c} />] : []))}
      <div ref={ref} onClick={() => loadMore()} id="load_more" />
      {classes.length > numOfLoad && (
        <Box sx={{ my: 2, p: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography sx={{ mr: 1 }}>読み込み中</Typography>
          <CircularProgress />
        </Box>
      )}
    </>
  );
};
