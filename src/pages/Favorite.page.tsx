import { Box, Container, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { classApi } from "../classes.api";
import { ClassList } from "../components/class/ClassList";
import PageWrapper from "../components/general/BackgroundWrapper";
import { Header } from "../components/general/Header";
import Navigation from "../components/general/Navigation";
import { ClassSearchQuery } from "../types/ClassSearchQuery";
import { Year, years } from "../types/filter/Year";
import { Class } from "../types/global";

const FavoritePage = () => {


  return (
    <PageWrapper>
      <Header pageTitle="お気に入り" />
      <Container maxWidth="xl">
        {years.map(y => <FavoriteList year={y.value} title={y.label} key={y.value} />)}
      </Container>
      <Navigation page={3} />
    </PageWrapper>
  )
}

export default FavoritePage;

type Props = {
  year: Year;
  title: string;
}

const FavoriteList = ({ year, title }: Props) => {
  const query = useMemo(() => ({
    flags: [],
    isFavorite: true,
    year
  } as ClassSearchQuery), [year]);

  const [filteredClasses, setFilteredClasses] = useState<Class[]>([]);
  useEffect(() => {
    classApi.getClasses(query).then((classes) => {
      setFilteredClasses(classes);
    });
  }, [query]);

  return <Box mb={2}>
    <Typography variant="h5" >{title}</Typography>
    <ClassList classes={filteredClasses} />
  </Box>;
}
