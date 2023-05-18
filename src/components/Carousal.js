import Carousel from "react-bootstrap/Carousel";
import "./styles/Carousal.css";

function Carousal() {
  const data = [
    {
      _id: 1,
      image:
        "https://kinsta.com/wp-content/uploads/2020/10/wordpress-slider.png",
      alt: "1",
    },
    {
      _id: 2,
      image:
        "https://kinsta.com/wp-content/uploads/2020/10/wordpress-slider.png",
      alt: "2",
    },
    {
      _id: 3,
      image:
        "https://kinsta.com/wp-content/uploads/2020/10/wordpress-slider.png",
      alt: "3",
    },
  ];

  return (
    <div className="carousal">
      <Carousel>
        {data.map((i) => (
          <Carousel.Item>
            <img
              key={i._id}
              className="cImage d-block w-100"
              src={i.image}
              alt={i.alt}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default Carousal;
