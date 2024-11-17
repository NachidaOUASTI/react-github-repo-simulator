import './Message.scss';

export default function Message({ nbRepos }) {
  return (
    <div>
      <p>La recherche a donnée {nbRepos} résultat(s)</p>
    </div>
  );
}
