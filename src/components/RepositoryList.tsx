import { useEffect, useState } from "react";
import { RepositoryItem } from "./RepositoryItem";

import '../styles/repositories.scss';

interface Repository {
  name: string;
  description: string;
  html_url: string;
}

export function RepositoryList() {
  const [repoType, setRepoType] = useState('');
  const [loginName, setLoginName] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>([]);

  useEffect(() => {
    if (!repoType || !loginName) {
      setRepoType('');
      return;
    }

    const reposUrl = `https://api.github.com/${repoType}/${loginName}/repos`;
    fetch(reposUrl)
      .then(response => response.ok ? response.json() : [])
      .then(data => setRepositories(data))
      .then(() => setRepoType(''));
  }, [repoType]);

  return (
    <div className="repository-container">
      <h1>GitHub Explorer</h1>

      <div className="search-box">
        <input
          type="text"
          name="loginName"
          placeholder="Login"
          onChange={(e) => setLoginName(e.target.value)}
        />
        <select
          name="type"
          value={ repoType }
          onChange={(e) => setRepoType(e.target.value)}
        >
          <option value="">Selecione para Pesquisar</option>
          <option value="users">Pesquisar Usuário</option>
          <option value="orgs">Pesquisar Organização</option>
        </select>
      </div>

      <ul>
        {
          repositories.length
          ? repositories.map(repository => (
            <RepositoryItem
              key={ repository.name }
              repository={ repository }
            />
          ))
          : 'Ops, não há dados para a pesquisa atual... Tente outros termos!'
        }
      </ul>
    </div>
  );
};