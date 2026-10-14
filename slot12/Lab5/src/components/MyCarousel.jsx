import Carousel from 'react-bootstrap/Carousel'
import Image from 'react-bootstrap/Image'
import banners from '../data/banners.js'

function MyCarousel() {
  return (
    <Carousel>
      {banners.map((banner) => (
        <Carousel.Item key={banner.id} interval={3000}>
          <Image
            fluid
            src={banner.image}
            alt={banner.title}
            style={{ height: 350, objectFit: 'cover', width: '100%' }}
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