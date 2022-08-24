import { useState, useEffect } from "react";
import Results from "./Results.jsx";
import useBreedList from "./useBreedList.jsx";
// import ThemeContext from "./ThemeContext.jsx";

// const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [location, setLocation] = useState("Seattle, WA");
  const [animal, setAnimal] = useState("");
  const [animalTypes, setAnimalTypes] = useState([]);
  const [breed, setBreed] = useState("");
  const [pets, setPets] = useState([]);
  const [nextPage, setNextPage] = useState("");
  const [prevPage, setPrevPage] = useState("");
  // const [theme, setTheme] = useContext(ThemeContext);
  const [breeds] = useBreedList(animal);
  const firstPage = `/v2/animals?type=${animal}&location=${location}&breed=${breed}`;

  useEffect(() => {
    requestPets(firstPage);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function requestPets(url) {
    const res = await fetch(`https://api.petfinder.com${url}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
      },
    });

    const res2 = await fetch(`https://api.petfinder.com/v2/types`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
      },
    });
    const json = await res.json();
    const jsonTypes = await res2.json();

    const page = json.pagination["_links"];

    setPets(json.animals);
    setAnimalTypes(jsonTypes.types);
    setNextPage(page?.next?.href);
    page?.previous && setPrevPage(page.previous.href);
  }

  const pagination = {
    next: () => {
      console.log("asd");
      if (nextPage) {
        requestPets(nextPage);
      }
    },

    prev: () => {
      console.log("jhkd");
      if (prevPage) {
        requestPets(prevPage);
      }
    },
  };

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestPets(firstPage);
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="City,State"
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value);
              setBreed("");
            }}
            onBlur={(e) => {
              setAnimal(e.target.value);
              setBreed("");
            }}
          >
            <option />
            {animalTypes.length > 0 &&
              animalTypes.map((type) => (
                <option key={type.name} value={type.name}>
                  {type.name}
                </option>
              ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            id="breed"
            value={breed}
            onChange={(e) => {
              setBreed(e.target.value);
            }}
            onBlur={(e) => {
              setBreed(e.target.value);
            }}
          >
            <option />
            {breeds.map((allBreed) => (
              <option key={allBreed.name} value={allBreed.name}>
                {allBreed.name}
              </option>
            ))}
          </select>
        </label>
        {/* <label htmlFor="theme">Theme</label>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          onBlur={(e) => setTheme(e.target.value)}
        >
          <option value="peru">Peru</option>
          <option value="darkblue">Dark Blue</option>
          <option value="chartreuse">Chartreuse</option>
          <option value="mediumorchid">Medium Orchid</option>
          <option value="#f06d06">Fog Dog</option>
        </select> */}
        <button>Submit</button>
      </form>
      <Results pets={pets} />
      {pets.length > 0 ? (
        <div className="page-btn__container">
          <button
            className={prevPage ? "page-btn" : "page-btn inactive"}
            onClick={pagination.prev}
            disabled={prevPage ? false : true}
          >
            Prev Page
          </button>
          <button className="page-btn" onClick={pagination.next}>
            Next Page
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default SearchParams;
