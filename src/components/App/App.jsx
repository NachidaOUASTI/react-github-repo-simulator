import { useState, useEffect } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import SearchBar from '../SearchBar/SearchBar';
import ReposResults from '../ReposResults/ReposResults';
import Message from '../Message/Message';
import './App.scss';
import 'semantic-ui-css/semantic.min.css';

function App() {
  const [searchValue, setSearchValue] = useState('');
  // Creation d'un state nbRepos et repositories
  const [nbRepos, setNbRepos] = useState(0);
  const [repositories, setRepositories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchValue, setDebouncedSearchValue] = useState('');

  // debouncedSearchValue stocke une version retardée de searchValue.
  // Il est mis à jour après une pause (ex. 500ms) dans la saisie,
  // pour limiter les appels API inutiles lors de la frappe rapide.

  // je fais un console log pour vérifier que setSearchValue est bien pris en compte
  // dans mon composant searchBar au niveau du onChange
  console.log(searchValue);

  // je crée une fonction afin de pouvoir filtrer les résultats de la rechercheSS
  // je veux que lorsque j'écris air...il m affiche tous les repos contenant
  // air... dans son full name
  // Je fais un call API pour récupérer les posts

  // Debouncing : mettre à jour debouncedSearchValue après une pause dans la saisie
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchValue(searchValue.trim());
    }, 500); // 500ms de délai

    return () => clearTimeout(timer); // On nettoie le timer à chaque changement de searchValue
  }, [searchValue]);

  useEffect(() => {
    const fetchData = async () => {
      if (debouncedSearchValue) {
        // Vérifie si une recherche valide existe avant l'appel API
        setIsLoading(true); // Active l'état de chargement

        try {
          const response = await fetch(
            `https://api.github.com/search/repositories?q=${debouncedSearchValue}` // Effectue un appel API avec le terme recherché
          );

          if (!response.ok) {
            throw new Error('aucune réponse');
          }

          const data = await response.json(); // Récupération des données JSON
          console.log(data);
          // Mise à jour repositories et nbRepos avec les résultats de la requête
          setRepositories(data.items || []); // || [] permet d'avoir toujours un tableau vide pour éviter les plantages
          setNbRepos(data.total_count || 0); // || 0 évite des comportements inattendus si total_count est indéfini
        } catch (error) {
          console.error('Fetch error:', error);
        } finally {
          // Le code dans le bloc finally s'exécutera même si une erreur survient
          // Toujours indiquer la fin du chargement, succès ou erreur
          setIsLoading(false);
        }
      } else {
        // On réinitialise les résultats si la recherche est vide

        setRepositories([]);
        setNbRepos(0);
      }
    };

    fetchData(); // Appeler la fonction fetchData
  }, [debouncedSearchValue]); // Lancer l'appel API uniquement après que debouncedSearchValue ait changé

  return (
    <main>
      <div className="container">
        <SearchBar setSearchValue={setSearchValue} searchValue={searchValue} />
        {/*  si isLoadingest true on affiche le message de chargement en cours sinon on affiche les repos et le message compteur qui va avec */}
        {isLoading ? (
          <div className="loader">
            Chargement en cours...{' '}
            <ThreeDots
              visible
              height="80"
              width="80"
              color="#4fa94d"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        ) : (
          <>
            <Message nbRepos={nbRepos} />
            <ReposResults repos={repositories} />
          </>
        )}
      </div>
    </main>
  );
}

export default App;
