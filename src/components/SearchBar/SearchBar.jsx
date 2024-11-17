// import { useState } from 'react';
import './SearchBar.scss';
import logoGitHub from '@/assets/images/logo-github.png';
import { Segment, Input } from 'semantic-ui-react';

function SearchBar({ setSearchValue, searchValue }) {
  // const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // empêche la page de se recharger
    // setSearchValue(inputValue);  mise à jour de la valeur d'état searchValue (on lui attribut la valeur saisie = inputValue)

    // Appeler la fonction de soumission du formulaire du parent
    //  onSubmit(e); // prévient au composant parent (App) que le form a été soumis
    console.log('form validé');
  };

  return (
    <div className="search-bar">
      <div className="search-bar-logoContainer">
        <img
          className="search-bar-logoGitHub"
          width={180}
          src={logoGitHub}
          alt="logo github"
        />
      </div>

      <Segment>
        {/* j'implémente un form qui encapsule mon input, quand l'utilisateur tape entrée
        le fonction handleSubmit est appelée
      */}
        <form className="form" onSubmit={handleSubmit}>
          {/*  controlled input <=> stockage de la valeur du champ dans un state */}
          <Input
            icon="search"
            value={searchValue} // c'est la valeur saisie dans le champs est controllée par le state , liée à la variable d'état inputValue (controlled  input)
            type="text"
            fluid
            placeholder="Rechercher..."
            className="search-bar-text"
            onChange={(e) => {
              /* quand on tape qqc dans la barre de recherche, ça déclenche l'évenement onChange 
              qui va ensuite mettre à jour la variable d'état inputValue (setInputValue)
              /e c'est l evenement onChange qui est un evenement de saisie */

              setSearchValue(e.target.value); // la variable d'état est mise à jour avec la valeur saisie
              // on va maintenant passer cette valeur à une fonction setSearch pour enregistrer la valeur dans la variable search
            }}
          />
        </form>
      </Segment>
    </div>
  );
}

export default SearchBar;
