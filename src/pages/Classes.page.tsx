import { Container } from "@mui/material";
import PageWrapper from "../components/common/BackgroundWrapper";
import { Header } from "../components/common/Header";
import Navigation from "../components/common/Navigation";

const SearchPage = () => {
    return (
        <PageWrapper>
            <Header pageTitle="講義検索" />
            <Container maxWidth="xl">
                
            </Container>
            <Navigation page={1} />
        </PageWrapper>
    )
}

export default SearchPage;