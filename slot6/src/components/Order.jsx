function Order() {
  return (
    <section id="order" className="py-5">
      <div className="container">

        <div className="text-center mb-5">
          <h2 className="fw-bold">Place Your Order</h2>

          <p className="text-muted">
            Fill in the form below to order your favorite pizza.
          </p>
        </div>

        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">

            <div className="card shadow-sm">
              <div className="card-body p-4">

                <form>
                  <div className="mb-3">
                    <label
                      htmlFor="name"
                      className="form-label fw-semibold"
                    >
                      Full Name
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="email"
                      className="form-label fw-semibold"
                    >
                      Email
                    </label>

                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="pizza"
                      className="form-label fw-semibold"
                    >
                      Select Pizza
                    </label>

                    <select
                      className="form-select"
                      id="pizza"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Choose a pizza
                      </option>

                      <option value="classic">
                        Classic Pizza
                      </option>

                      <option value="cheese">
                        Cheese Pizza
                      </option>

                      <option value="pepperoni">
                        Pepperoni Pizza
                      </option>

                      <option value="special">
                        Special Pizza
                      </option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="quantity"
                      className="form-label fw-semibold"
                    >
                      Quantity
                    </label>

                    <input
                      type="number"
                      className="form-control"
                      id="quantity"
                      min="1"
                      defaultValue="1"
                    />
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="address"
                      className="form-label fw-semibold"
                    >
                      Delivery Address
                    </label>

                    <textarea
                      className="form-control"
                      id="address"
                      rows="3"
                      placeholder="Enter your delivery address"
                    ></textarea>
                  </div>

                  <div className="d-grid">
                    <button
                      type="submit"
                      className="btn btn-warning fw-semibold"
                    >
                      Place Order
                    </button>
                  </div>
                </form>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}

export default Order