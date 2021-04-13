import "./App.css";
import { Container } from "@material-ui/core";
import Header from "./components/Header/Header";
import Row from "./components/Row/Row";

function App() {
  return (
    <div>
      <Container maxWidth="xl">
        <Header />
        <p className='gridHeader'>Invoice List</p>
        <Row />
      </Container>
    </div>
  );
}

export default App;
