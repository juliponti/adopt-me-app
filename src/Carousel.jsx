import { Component } from "react";

class Carousel extends Component {
  state = {
    active: 0,
  };

  static defaultProps = {
    images: ["https://via.placeholder.com/150x150"],
  };

  handleIndexClick = (e) => {
    this.setState({
      active: +e.target.dataset.index,
    });
  };

  render() {
    const { active } = this.state;
    const { images } = this.props;
    const activeImage = images[active];

    return (
      <div className="carousel">
        <img src={activeImage?.large} alt="animal" />
        <div className="carousel-smaller">
          {images.map((photo, index) => (
            //eslint-disable-next-line
            <img
              onClick={this.handleIndexClick}
              key={photo.small}
              src={photo.small}
              data-index={index}
              className={index === active ? "active" : ""}
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
