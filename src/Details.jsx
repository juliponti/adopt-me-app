import { Component } from "react";
import { useParams } from "react-router-dom";
import Carousel from "./Carousel.jsx";
import ErrorBoundary from "./ErrorBoundary.jsx";
import ThemeContext from "./ThemeContext.jsx";
import Modal from "./Modal.jsx";

class Details extends Component {
  //   constructor(props) {
  //     super(props);

  //     this.state = { loading: true };
  //   }

  state = { loading: true, showModal: false }; // class property works like the constructor

  async componentDidMount() {
    const res = await fetch(
      `https://api.petfinder.com/v2/animals/${this.props.params.id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
        },
      }
    );

    const json = await res.json();

    this.setState({ loading: false, ...json.animal });
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  render() {
    if (this.state.loading) {
      return <h2>loading...</h2>;
    }

    const { name, species, breeds, contact, description, photos, showModal } =
      this.state;

    return (
      <div className="details">
        <Carousel images={photos} />
        <div>
          <h1>{name}</h1>

          <h2>
            {species} - {breeds.primary} - {contact.address.city},{" "}
            {contact.address.state}
          </h2>
          <ThemeContext.Consumer>
            {([theme]) => (
              <button
                onClick={this.toggleModal}
                style={{ backgroundColor: theme }}
              >
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>
        </div>
        <p>{description}</p>
        {showModal ? (
          <Modal>
            <div>
              <h1>Would you like to adopt {name}?</h1>
              <div className="buttons">
                <a href="https://bit.ly/pet-adopt">Yes</a>
                <button onClick={this.toggleModal}>No</button>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    );
  }
}

const WrappedDetails = () => {
  const params = useParams();
  return (
    <ErrorBoundary>
      <Details params={params} />;
    </ErrorBoundary>
  );
};

export default WrappedDetails;
