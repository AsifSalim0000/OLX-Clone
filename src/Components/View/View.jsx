import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './View.css';
import { db } from '../../firebase';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';

function View() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [sellerInfo, setSellerInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductAndSeller = async () => {
      try {
        setLoading(true);
        const productDoc = await getDoc(doc(db, 'products', productId));
        if (productDoc.exists()) {
          const productData = {
            id: productDoc.id,
            ...productDoc.data()
          };
          console.log('Product data:', productData);
          setProduct(productData);
          const userId = productData.userId;
          await fetchSellerInfo(userId);
        } else {
          console.log('No such product!');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    const fetchSellerInfo = async (userId) => {
      try {
        console.log('Fetching seller info for userId:', userId);
        const usersRef = collection(db, 'user');
        const q = query(usersRef, where('uid', '==', userId));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            console.log('Seller data:', doc.data());
            setSellerInfo(doc.data());
          });
        } else {
          console.log('No such seller!');
          setSellerInfo(null);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching seller:', error);
        setLoading(false);
      }
    };

    if (productId) {
      fetchProductAndSeller();
    }
  }, [productId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={product ? product.url : ''} alt={product ? product.name : 'Product Image'} />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {product ? product.price : ''}</p>
          <span>{product ? product.name : 'Product Name'}</span>
          <p>{product ? product.category : 'Category'}</p>
          <span>{product ? product.createdAt : 'Created Date'}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          {sellerInfo ? (
            <>
              <p>{sellerInfo.name}</p>
              <p>{sellerInfo.phone}</p>
            </>
          ) : (
            <p>No seller information available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default View;
