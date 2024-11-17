import './ReposResults.scss';

import {
  CardMeta,
  CardHeader,
  CardDescription,
  CardContent,
  Card,
  Image,
} from 'semantic-ui-react';

// repos ici représente les repos filtrés dans la constante filteredResults dans le composant APP
function ReposResults({ repos }) {
  return (
    <div className="reposResults-container">
      <ul className="reposResults-list">
        {repos.map((item) => (
          <li key={item.id} className="reposResults-list-item">
            <Card className="card">
              <Image src={item.owner.avatar_url} wrapped ui={false} />
              <CardContent>
                <CardHeader>{item.full_name}</CardHeader>
                <CardMeta>
                  <span className="date">{item.name}</span>
                </CardMeta>
                <CardDescription>{item.description}</CardDescription>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReposResults;
