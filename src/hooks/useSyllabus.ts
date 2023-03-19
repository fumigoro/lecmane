import { useState, useEffect } from 'react';
import { classApi } from '../classes.api';
import { Year } from '../types/filter/Year';
import { FullClass } from '../types/global';

const useSyllabus = (year: Year | undefined, id: string | undefined) => {
  const [fullData, setFullData] = useState<undefined | FullClass>(undefined);
  const [failed, setFailed] = useState(false);

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

  return { fullData, failed };
};

export default useSyllabus;
