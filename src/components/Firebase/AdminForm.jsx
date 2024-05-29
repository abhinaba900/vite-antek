import React, { useState } from "react";
import "../../components/css/AdminForm.css";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { imgeDb, textDb } from "../../main";
import { v4 } from "uuid";
import { collection, addDoc } from "firebase/firestore";
import { json } from "react-router-dom";

function AdminForm() {
  const [adminForm, setAdminForm] = useState({
    name: "",
    img: "",
    price: "",
    description: "",
  });

  function handleChange(e) {
    const storageRef = ref(imgeDb, `images/${adminForm.img.name + v4()}`);

    uploadBytes(storageRef, e.target.files[0]).then((snapshot) => {
      const url = getDownloadURL(snapshot.ref);
      setAdminForm({ ...adminForm, img: url });
    });
  }
  async function handlesubmit(e) {
    e.preventDefault();
    if (
      adminForm.name === "" ||
      adminForm.img === "" ||
      adminForm.price === "" ||
      adminForm.description === ""
    ) {
      alert("Please fill all the fields");
      return;
    }

    const collectionRef = collection(textDb, "products");
    const data = {
      name: adminForm?.name,
      img: adminForm?.img,
      price: adminForm.price,
      description: adminForm.description,
    };

    await addDoc(collectionRef, JSON.stringify(data));

    alert("Product added successfully");
  }

  return (
    <div>
      <form className="form" onSubmit={handlesubmit}>
        <span id="login-lable">Add Product</span>
        <input
          className="input"
          type="text"
          placeholder="Product Name"
          minLength={3}
          maxLength={150}
          onChange={(e) => {
            setAdminForm({ ...adminForm, name: e.target.value });
          }}
          value={adminForm.name}
        />
        <input
          className="input"
          type="file"
          placeholder="Product Image URL"
          onChange={(e) => handleChange(e)}
        />
        <input
          className="input"
          type="number"
          placeholder="Product Price"
          onChange={(e) =>
            setAdminForm({ ...adminForm, price: e.target.value })
          }
          value={adminForm.price}
        />
        <textarea
          name=""
          className="input"
          placeholder="Product Description"
          onChange={(e) =>
            setAdminForm({ ...adminForm, description: e.target.value })
          }
          value={adminForm.description}
        >
          Product Description
        </textarea>
        <button id="btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AdminForm;
