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
  const [selectValue, setSelectValue] = useState('');

  useEffect(() => {
    fetch(`http://localhost:3333/politicians`)
      .then(res => res.json())
      .then(data => setPoliticians(data))
      .catch(err => console.error(err));
  }, []);

  const filteredPoliticians = useMemo(() => {
    const filterByPosition = selectValue !== '' ? politicians.filter(p => p.position === selectValue) : politicians;
    const filtered = filterByPosition.filter(p => p.name.toLowerCase().includes(search) || p.biography.toLowerCase().includes(search))
    return filtered;
  }, [search, selectValue])

  const positions = useMemo(() => {
    return [...new Set(politicians.map(p => p.position))];
  }, [politicians]);

  return (
    <>
      <h1>Lista politici</h1>

      <div className="card-container">
        <input type="text" className="searchbar" placeholder="Cerca politico..." value={search} onChange={e => setSearch(e.target.value)} />
        <select name="position" className="select" value={selectValue} onChange={e => setSelectValue(e.target.value)}>
          <option value={''} default>Select position</option>
          {positions.map((p, i) => {
            return <option value={p} key={i}>{p}</option>;
          })}
        </select>

        {filteredPoliticians.map((p, i) => {
          return <PoliticianCard name={p.name} position={p.position} bio={p.biography} key={i} />
        })}
      </div>
    </>
  )
}

export default App
