import menu1 from '../assets/images/menu1.jpg'
import menu2 from '../assets/images/menu2.jpg'
import menu3 from '../assets/images/menu3.jpg'
import menu4 from '../assets/images/menu4.jpg'

const menuItems = [
  {
    image: menu1,
    name: 'Classic Pizza',
    description: 'Traditional pizza with fresh ingredients.',
    price: '$8.99',
  },
  {
    image: menu2,
    name: 'Cheese Pizza',
    description: 'Delicious pizza with rich melted cheese.',
    price: '$9.99',
  },
  {
    image: menu3,
    name: 'Pepperoni Pizza',
    description: 'Tasty pepperoni with mozzarella cheese.',
    price: '$10.99',
  },
  {
    image: menu4,
    name: 'Special Pizza',
    description: 'Our special pizza with selected toppings.',
    price: '$11.99',
  },
]

function Menu() {
  return (
    <section id="menu" className="py-5 bg-light">
      <div className="container">

        <div className="text-center mb-5">
          <h2 className="fw-bold">Our Menu</h2>
          <p className="text-muted">
            Choose your favorite pizza
          </p>
        </div>

        <div className="row g-4">
          {menuItems.map((item, index) => (
            <div className="col-12 col-sm-6 col-lg-3" key={index}>
              <div className="card h-100 shadow-sm">

                <img
                  src={item.image}
                  className="card-img-top"
                  alt={item.name}
                />

                <div className="card-body text-center d-flex flex-column">
                  <h5 className="card-title fw-bold">
                    {item.name}
                  </h5>

                  <p className="card-text text-muted">
                    {item.description}
                  </p>

                  <h5 className="text-danger mt-auto mb-3">
                    {item.price}
                  </h5>

                  <button className="btn btn-warning">
                    Order Now
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Menu