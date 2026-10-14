import Carousel from 'react-bootstrap/Carousel'
import banners from '../data/banners.js'

function MyCarousel() {
  return (
    <Carousel>
      {banners.map((banner) => (
        <Carousel.Item key={banner.id} interval={3000}>
          <img
            className="d-block w-100"
            src={banner.image}
            alt={banner.title}
            style={{ height: '350px', objectFit: 'cover' }}
          />
          <Carousel.Caption>
            <h3>{banner.title}</h3>
            <p>{banner.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default MyCarousel