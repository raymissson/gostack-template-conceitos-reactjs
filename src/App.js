import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const  [repositories, setRepositories] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, [])

  async function handleAddRepository(e) {
    e.preventDefault();
    const response = await api.post('repositories', {
      title: `${title}`
    })
    setRepositories([ ...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(
      repository => repository.id !== id
    ))
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
      )
        )}
        
      </ul>
      <br></br>
      <form onSubmit={handleAddRepository}>
        <input 
          placeholder="digite o título do respositório"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <button type="submit" >Adicionar</button>
      </form>
      
    </div>
  );
}

export default App;
