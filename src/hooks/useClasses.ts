import { useState, useEffect } from 'react';
import { classApi } from '../classes.api';
import { ClassSearchQuery } from '../types/ClassSearchQuery';
import { Class } from '../types/global';

const useClasses = (query: ClassSearchQuery) => {
  const [classes, setClasses] = useState<Class[]>([]);
  useEffect(() => {
    classApi.getClasses(query).then((classes) => {
      setClasses(classes);
    });
  }, [query]);
  return classes;
};

export default useClasses;
