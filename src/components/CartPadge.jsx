import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import NavbarForHomePage from "./homePageComponents/NavbarForHomePage";
import Footer from "./homePageComponents/Footer";
import { Calendar } from "primereact/calendar";
import { Authcontext } from "../App";

function CartPage() {
  const navigate = useNavigate();

  const { cartPageData, setCartPageData } = useContext(Authcontext);
  const [initialvalueData, setInitialvalueData] = useState(
    cartPageData.map((item) => {
      return item?.price;
    })
  );

  console.log("initialvalueData", initialvalueData);

  const removeItem = (id) => {
    setCartPageData((currentItems) =>
      currentItems.filter((item) => item?.id !== id)
    );
  };

  const totalPrice = cartPageData?.reduce(
    (acc, item) => acc + item?.price * item?.quantity,
    0
  );

  const handleCheckout = () => {
    // Implement your checkout logic here
    console.log("Checkout clicked!");
    navigate(`/checkout/${totalPrice + ".00"}`);
  };

  const handleDateChange = (index, value) => {
    const durationInDays = Math.round(
      (value[1] - value[0]) / (1000 * 60 * 60 * 24)
    );

    let priceData = 1;
    let nightsData = 1;

    if (durationInDays < 0) {
      priceData = 1;
      nightsData = 1;
    } else if (durationInDays < 7) {
      priceData = durationInDays;
      nightsData = durationInDays;
    } else if (durationInDays >= 7 && durationInDays < 30) {
      priceData = Math.floor(durationInDays / 7) * 2 + 1;
      nightsData = durationInDays;
    } else {
      priceData = Math.floor(durationInDays / 30) * 7 + 1;
      nightsData = durationInDays;
    }

    setCartPageData((prevData) => {
      const newData = [...prevData];
      newData[index].price = newData[index].price + priceData;
      newData[index].dates = value;
      return newData;
    });

    setInitialvalueData((prevData) => {
      const newData = [...prevData];
      newData[index] = newData[index] + priceData;
      return newData;
    });
  };

  const handleChangePickup = (e, index) => {
    const { name, value } = e.target;

    setCartPageData((prevData) => {
      const newData = [...prevData];
      newData[index][name] = value;
      return newData;
    });

    if (value === "Owner Pickup") {
      setCartPageData((prevData) => {
        const newData = [...prevData];
        newData[index].price = newData[index].price + 1;
        return newData;
      });
    }

    if (
      (value === "Self Pickup" &&
        initialvalueData[index] < cartPageData[index].price) ||
      (value === "" && initialvalueData[index] < cartPageData[index].price)
    ) {
      setCartPageData((prevData) => {
        const newData = [...prevData];
        newData[index].price = newData[index].price - 1;
        return newData;
      });
    }
  };

  return (
    <div
      style={{ position: "relative", zIndex: "1" }}
      onLoad={() => window.scrollTo(0, 0)}
    >
      <NavbarForHomePage />
      <section className="h-100 h-custom">
        <div className="container py-5">
          <div className="row justify-content-center align-items-center">
            <div className="col-12">
              <div
                className="card card-registration card-registration-2"
                style={{ borderRadius: "15px", zIndex: "1" }}
              >
                <div className="card-body p-0">
                  <div className="row g-0">
                    <div className="p-5">
                      <div className="d-flex justify-content-between align-items-center mb-5">
                        <h1 className="fw-bold mb-0 text-black">
                          My Shopping Cart
                        </h1>
                        <h6 className="mb-0 text-muted">
                          {cartPageData.length} items
                        </h6>
                      </div>
                      <hr className="my-4" />
                      {cartPageData?.length === 0 ? (
                        <h3>No items in cart</h3>
                      ) : (
                        cartPageData?.map((item, index) => (
                          <React.Fragment key={item?.id}>
                            <div className="row mb-4 d-flex justify-content-between align-items-center">
                              <div className="col-md-2 col-lg-2 col-xl-2">
                                <img
                                  src={item?.image}
                                  className="img-fluid rounded-3"
                                  alt={item?.name}
                                />
                              </div>
                              <div className="col-md-3 col-lg-3 col-xl-3">
                                <h6 className="text-muted">Product</h6>
                                <h6 className="text-black mb-0">
                                  {item?.name}
                                </h6>
                                <h6 className="text-black mb-0 mt-2 text-muted gray-color-for-price">
                                  <select
                                    name="pickup"
                                    onChange={(e) =>
                                      handleChangePickup(e, index)
                                    }
                                  >
                                    <option value="Self Pickup">
                                      Self Pickup
                                    </option>
                                    <option value="Owner Pickup">
                                      Owner Pickup
                                    </option>
                                  </select>
                                </h6>
                              </div>
                              <div className="col-md-2 col-lg-2 col-xl-2 d-flex align-items-center justify-content-center gap-2">
                                <Calendar
                                  name="dates"
                                  value={item?.dates}
                                  selectionMode="range"
                                  readOnlyInput
                                  hideOnRangeSelection
                                  className="common-pointer"
                                  dateFormat="dd/mm/yy"
                                  onChange={(e) =>
                                    handleDateChange(index, e.value)
                                  }
                                  minDate={new Date()}
                                />
                              </div>

                              <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                <h6 className="mb-0">
                                  $ {item?.price?.toFixed(2)} * {item?.quantity}
                                </h6>
                              </div>
                              <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                                <a
                                  href="#!"
                                  className="text-muted"
                                  onClick={() => removeItem(item?.id)}
                                >
                                  <AiFillDelete />
                                </a>
                              </div>
                            </div>
                            <hr className="my-4" />
                          </React.Fragment>
                        ))
                      )}
                      <div className="pt-5">
                        <h6 className="mb-0">
                          <a
                            href="#!"
                            className="text-body"
                            onClick={() => navigate(-1)}
                          >
                            Back to shop
                          </a>
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <div
        className="fixed-bottom bg-white py-3"
        style={{ borderTop: "1px solid #dee2e6" }}
      >
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h6 className="mb-0">Total Price:</h6>
              <h4 className="text-primary">${totalPrice.toFixed(2)}</h4>
            </div>
            <button
              className="btn btn-primary"
              onClick={handleCheckout}
              disabled={cartPageData.length === 0}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
