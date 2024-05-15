import React from "react";
import { LogoLeftPart, LogoRightPart } from "../../assets";
import { Authcontext } from "../../App";
function BrowseMachineryCategories() {
  const [active, setActive] = React.useState({
    first: false,
    second: false,
  });

  const { cartPageData, setCartPageData } = React.useContext(Authcontext);

  const toggleMenu = () => {
    const timer = setTimeout(() => {
      setActive({ first: false, second: false });
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  };

  const AddFirstItem = (name, image) => {
    const findItems = cartPageData.find((item) => item.name === name);
    if (!findItems) {
      setCartPageData([
        ...cartPageData,
        {
          id: Math.random(),
          name,
          image,
          quantity: 1,
          dates: [],
          pickup: "Owner Pickup",
          price: 1,
        },
      ]);
      return;
    }

    setCartPageData((currentItems) =>
      currentItems.map((item) => {
        if (item.name === name) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      })
    );
  };

  const AddSecondItem = (name, image) => {
    const findItems = cartPageData.find((item) => item.name === name);
    if (!findItems) {
      setCartPageData([
        ...cartPageData,
        {
          id: Math.random(),
          name,
          image,
          quantity: 1,
          dates: [],
          pickup: "Self Pickup",
          price: 2,
        },
      ]);
      return;
    }

    setCartPageData((currentItems) =>
      currentItems.map((item) => {
        if (item.name === name) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      })
    );
  };
  return (
    <div
      className="browse-machinery-categories-container-parent container"
      id="scrollToElement"
    >
      <p>We Promise To Find You The Right Equipment</p>
      <h3>Browse Machinery Categories</h3>
      <div className="heading-logo-section-container-for-slider">
        <img src={LogoLeftPart} alt="logo left part" />
        <img src={LogoRightPart} alt="logo right part" />
      </div>
      <div className={`browse-machinery-categories-container-child`}>
        <div
          className={`common-pointer browse-machinery-categories-container-child-image ${
            active.second ? "active-success-massage" : ""
          } `}
          onClick={() => {
            AddFirstItem(
              "Water Truck 1",
              "https://bitpastel.io/mi/rammoy/construction1/static/media/water-truck-product.64e6c601b79fa495eba8.jpg"
            );
            setActive({ ...active, first: true });
            toggleMenu();
          }}
        >
          <img
            src="https://bitpastel.io/mi/rammoy/construction1/static/media/water-truck-product.64e6c601b79fa495eba8.jpg"
            alt=""
          />
          <h2
            className={
              active.first
                ? "active-success-massage"
                : "heading-for-water-truck"
            }
          >
            {active.first ? "Success" : "Water Truck 1"}
          </h2>
        </div>
        <div
          className={`common-pointer browse-machinery-categories-container-child-image ${
            active.second ? "active-success-massage" : ""
          } `}
          onClick={() => {
            AddSecondItem(
              "Water Truck 2",
              "https://bitpastel.io/mi/rammoy/construction1/static/media/product_2.b67cc42383d3c5f70034.webp"
            );
            setActive({ ...active, second: true });
            toggleMenu();
          }}
        >
          <img
            src="https://bitpastel.io/mi/rammoy/construction1/static/media/product_2.b67cc42383d3c5f70034.webp"
            alt=""
          />
          <h2
            className={
              active.second
                ? "active-success-massage"
                : "heading-for-water-truck"
            }
          >
            {active.second ? "Success" : "Water Truck 2"}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default BrowseMachineryCategories;
