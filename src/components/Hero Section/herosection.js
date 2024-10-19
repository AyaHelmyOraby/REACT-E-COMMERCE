import { Carousel, Button, Container } from 'react-bootstrap';

const HeroSection = () => {
  return (
    <Container className="my-4">
      <Carousel>
        <Carousel.Item>
          {/* <img className="d-block w-100" src="image1.jpg" alt="First slide" /> */}
          <Carousel.Caption>
            <h3>Super Value Deals On All Products</h3>
            <p>Save more with up to 70% off.</p>
            <Button variant="primary">Shop Now</Button>
          </Carousel.Caption>
        </Carousel.Item>
        {/* <Carousel.Item>
          <img className="d-block w-100" src="image2.jpg" alt="Second slide" />
        </Carousel.Item> */}
      </Carousel>
    </Container>
  );
};

export default HeroSection;
