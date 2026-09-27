import pizza1 from '../assets/images/pizza1.jpg'
import pizza2 from '../assets/images/pizza2.jpg'
import pizza3 from '../assets/images/pizza3.jpg'
import pizza4 from '../assets/images/pizza4.jpg'
import pizza5 from '../assets/images/pizza5.jpg'

function Hero() {
  return (
    <section id="home">
      <div
        id="pizzaCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        {/* Indicators */}
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#pizzaCarousel"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>

          <button
            type="button"
            data-bs-target="#pizzaCarousel"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>

          <button
            type="button"
            data-bs-target="#pizzaCarousel"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>

          <button
            type="button"
            data-bs-target="#pizzaCarousel"
            data-bs-slide-to="3"
            aria-label="Slide 4"
          ></button>

          <button
            type="button"
            data-bs-target="#pizzaCarousel"
            data-bs-slide-to="4"
            aria-label="Slide 5"
          ></button>
        </div>

        {/* Images */}
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src={pizza1}
              className="d-block w-100"
              alt="Pizza 1"
            />

            <div className="carousel-caption d-none d-md-block">
              <h2 className="fw-bold">Welcome to Pizza House</h2>
              <p>Fresh and delicious pizza for everyone.</p>

              <a href="#menu" className="btn btn-warning">
                Explore Our Menu
              </a>
            </div>
          </div>

          <div className="carousel-item">
            <img
              src={pizza2}
              className="d-block w-100"
              alt="Pizza 2"
            />
          </div>

          <div className="carousel-item">
            <img
              src={pizza3}
              className="d-block w-100"
              alt="Pizza 3"
            />
          </div>

          <div className="carousel-item">
            <img
              src={pizza4}
              className="d-block w-100"
              alt="Pizza 4"
            />
          </div>

          <div className="carousel-item">
            <img
              src={pizza5}
              className="d-block w-100"
              alt="Pizza 5"
            />
          </div>
        </div>

        {/* Previous */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#pizzaCarousel"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>

          <span className="visually-hidden">
            Previous
          </span>
        </button>

        {/* Next */}
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#pizzaCarousel"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>

          <span className="visually-hidden">
            Next
          </span>
        </button>
      </div>
    </section>
  )
}

export default Hero