import Pet from "./Pet.jsx";

const Results = ({ pets }) => {
  return (
    <div>
      {!pets.length ? (
        <h1>No pets found</h1>
      ) : (
        pets.map((pet) => {
          const { name, species, id, photos, contact, breeds } = pet;

          return (
            <Pet
              name={name}
              animal={species}
              breed={breeds.primary}
              key={id}
              images={photos}
              location={`${contact.address.city}, ${contact.address.state}`}
              id={id}
            />
          );
        })
      )}
    </div>
  );
};

export default Results;
