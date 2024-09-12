import React, { Fragment, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Create = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const date = new Date();

  const handleUpload = async () => {
    const trimmedName = name.trim();
    const trimmedCategory = category.trim();
    const trimmedPrice = price.trim();

    if (!trimmedName || !trimmedCategory || !trimmedPrice || !image) {
      toast.error("All fields are required.");
      return;
    }

    if (isNaN(trimmedPrice) || Number(trimmedPrice) <= 0) {
      toast.error("Price must be a valid number greater than zero.");
      return;
    }

    try {
      const storage = getStorage();
      const storageRef = ref(storage, `/images/${image.name}`);
      await uploadBytes(storageRef, image);
      const url = await getDownloadURL(storageRef);

      await addDoc(collection(db, 'products'), {
        name: trimmedName,
        category: trimmedCategory,
        price: trimmedPrice,
        url,
        userId: user.uid,
        createdAt: date.toDateString(),
      });

      toast.success("Product uploaded successfully!");
      navigate('/');
    } catch (error) {
      toast.error("Failed to upload product. Please try again.");
      console.error("Error uploading product:", error);
    }
  };

  return (
    <Fragment>
      <Header />
      <ToastContainer />
      <div className="centerDiv">
        <form>
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="fname"
            name="Name"
            required
          />
          <br />
          <label htmlFor="category">Category</label>
          <br />
          <input
            className="input"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            id="category"
            name="category"
            required
          />
          <br />
          <label htmlFor="price">Price</label>
          <br />
          <input
            className="input"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            id="price"
            name="Price"
            required
          />
          <br />
        </form>
        <br />
        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt=""
            width="200px"
            height="200px"
          />
        )}
        <form>
          <br />
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            required
          />
          <br />
          <button
            type="button"
            onClick={handleUpload}
            className="uploadBtn rounded"
          >
            Upload and Submit
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default Create;
