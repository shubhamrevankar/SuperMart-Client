import Carousel from "react-bootstrap/Carousel";
import "./styles/Carousal.css";

function Carousal() {
  const data = [
    {
      _id: 1,
      image: "8277025.jpg",
      alt: "1",
    },
    {
      _id: 2,
      image: "5092428.jpg",
      alt: "2",
    },
    {
      _id: 3,
      image: "fashion-social-media-banner-web-template_237398-223.avif",
      alt: "3",
    },
    {
      _id: 4,
      image:
        "flat-social-media-cover-template-autumn-celebration_23-2149521871.avif",
      alt: "4",
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
