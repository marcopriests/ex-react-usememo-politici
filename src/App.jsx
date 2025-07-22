import React, { useState, useEffect, useMemo } from "react"

const PoliticianCard = React.memo(({ name, position, bio }) => {
  console.log('Rendering card of: ', name);
  return (
    <div className="card">
      <div className="card-info">
        <h4>{name}</h4>
        <p><strong>{position}</strong></p>
        <p>{bio}</p>
      </div>
    </div>
  )
});


function App() {
  const [politicians, setPoliticians] = useState([]);
  const [search, setSearch] = useState('');

  const filteredPoliticians = useMemo(() => {
    return politicians.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.biography.toLowerCase().includes(search.toLowerCase()))
  }, [search])

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
        <input type="text" className="searchbar" placeholder="Cerca politico..." value={search} onChange={e => setSearch(e.target.value)} />

        {filteredPoliticians.map((p, i) => {
          return <PoliticianCard name={p.name} position={p.position} bio={p.biography} key={i} />
        })}
      </div>
    </>
  )
}

export default App
