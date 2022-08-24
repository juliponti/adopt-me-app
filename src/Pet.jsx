import { Link } from "react-router-dom";

const Pet = ({ name, animal, breed, images, location, id }) => {
  let hero = "https://via.placeholder.com/150x150";

  if (images.length) {
    hero = images[0].medium;
  }

  return (
    <Link to={`/details/${id}`} className="pet">
      <div className="image-container">
        <img src={hero} alt={name} />
      </div>
      <div className="info">
        <h1>{name}</h1>
        <h2>
          {animal} — {breed} — {location}
        </h2>
      </div>
    </Link>
  );
};

// it is translated to this, in the compile code

// const Pet = ({ name, animal, breed }) => {
//   return React.createElement("div", {}, [
//     React.createElement("h1", {}, name),
//     React.createElement("h2", {}, animal),
//     React.createElement("h2", {}, breed),
//   ]);
// };

export default Pet;
