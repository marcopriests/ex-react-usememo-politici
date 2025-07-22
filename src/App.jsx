import { useState, useEffect } from "react"

function App() {
  const [politicians, setPoliticians] = useState([]);

  function getData() {
    fetch(`http://localhost:3333/politicians`)
      .then(res => res.json())
      .then(data => setPoliticians(data))
      .catch(err => console.error(err))
  };

  useEffect(() => {
    getData();
  }, [])

  return (
    <>
      <h1>Lista politici</h1>
      <div className="card-container">
        {politicians.map((p, i) => {
          return (
            <div className="card" key={i}>
              <div className="card-info">
                <h4>{p.name}</h4>
                <p><strong>{p.position}</strong></p>
                <p>{p.biography}</p>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default App
