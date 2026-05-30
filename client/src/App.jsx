import { Button, Header, HeaderName, Content } from "@carbon/react";

export default function App() {
  return (
    <>
      <Header aria-label="Weather Forecast">
        <HeaderName href="#" prefix="IBM">
          Weather Forecast
        </HeaderName>
      </Header>
      <Content>
        <h1>Carbon testing</h1>
        <Button>Primary action</Button>
        <Button kind="secondary">Secondary</Button>
        <Button kind="danger">Danger</Button>
      </Content>
    </>
  );
}
