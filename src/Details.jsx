import { Component } from "react";
import { useParams } from "react-router-dom";
import Carousel from "./Carousel.jsx";

class Details extends Component {
  //   constructor(props) {
  //     super(props);

  //     this.state = { loading: true };
  //   }

  state = { loading: true }; // class property works like the constructor

  async componentDidMount() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.params.id}`
    );
    const json = await res.json();

    this.setState({ loading: false, ...json.pets[0] });
  }

  render() {
    if (this.state.loading) {
      return <h2>loading...</h2>;
    }

    const { name, animal, breed, city, state, description, images } =
      this.state;

    return (
      <div className="details">
        <Carousel images={images} />
        <div>
          <h1>{name}</h1>
          <h2>
            {animal} - {breed} - {city}, {state}
          </h2>
          <button>Adopt {name}</button>
        </div>
        <p>{description}</p>
      </div>
    );
  }
}

const WrappedDetails = () => {
  const params = useParams();
  return <Details params={params} />;
};

export default WrappedDetails;