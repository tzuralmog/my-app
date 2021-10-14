import Header from "./components/Header";

function App() {
  const name = "brad"

  return (
    <div className="container">
      {/* <h1>Testing auto resolve</h1>
      <h2> Hello {name}</h2> */}
      <Header title="Room 1"/>
    </div>
  );
}

export default App;
