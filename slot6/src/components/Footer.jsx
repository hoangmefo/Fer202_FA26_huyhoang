function Footer() {
  return (
    <footer className="bg-dark text-white mt-5">
      <div className="container py-4">
        <div className="row">

          <div className="col-md-6 mb-3 mb-md-0">
            <h5 className="fw-bold">🍕 Pizza House</h5>
            <p className="text-light mb-0">
              Fresh and delicious pizza made for everyone.
            </p>
          </div>

          <div className="col-md-6 text-md-end">
            <h5 className="fw-bold">Contact Us</h5>
            <p className="mb-1">
              📞 +84 123 456 789
            </p>
            <p className="mb-0">
              ✉️ pizzahouse@example.com
            </p>
          </div>

        </div>

        <hr className="my-4" />

        <div className="text-center">
          <small>
            © 2026 Pizza House. All rights reserved.
          </small>
        </div>
      </div>
    </footer>
  )
}

export default Footer