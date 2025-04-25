import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import UploadPatentComponent from "./UploadPatentComponent";
import AccuracyProgressBar from "./AccuracyProgressBar";
import ApplyPatentButton from "./ApplyPatentButton";
import { useNavigate } from "react-router-dom";
import Card from "../../components/Cards";
import "./Uploads.css";


const AccuracyCard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const scanResult = location.state?.scanResult?.results || [];
  const uploadedImages = location.state?.uploadedImages || {};

  const highestScore = scanResult.length > 0 ? scanResult[0].score : 0;
  const accuracy = ((1 - highestScore) * 100).toFixed(2);
  const canApplyForPatent = accuracy > 90;

  useEffect(() => {
    console.log("Scan Result:", scanResult);
    console.log("Uploaded Images:", uploadedImages);
    console.log("Accuracy:", accuracy);
    console.log("Can Apply For Patent:", canApplyForPatent);
  }, [scanResult, uploadedImages]);

  return (
    <div className="accuracy-card">
      <UploadPatentComponent images={uploadedImages} />
      <AccuracyProgressBar accuracy={accuracy} />
  
      {canApplyForPatent ? (
        <>
          <p className="unique-message">✅ Your design is unique! 🎉</p>
          <p className="secure-message">Secure your creation with a patent now.</p>
          <ApplyPatentButton
            onClick={() =>
              navigate("/apply-patent", {
                state: {
                  image: uploadedImages?.front?.preview,
                  userId: "mockUserId", // Replace with real user id if available
                  uploadedImages,
                  scanResult: location.state?.scanResult
                }
              })
            }
            label="Apply for Patent"
            className="w-auto"
          />
        </>
      ) : (
        <>
          <p className="unique-message" style={{ color: 'red' }}>
            ❌ Your design is not unique.
          </p>
          <p className="secure-message">
            Try modifying it or checking for alternatives and come back again
          </p>
  
          <div className="cards-wrapper">
            <h3 style={{ marginTop: '4rem', textAlign: 'center' }}>similar matches</h3>
  
            {/* Mobile: horizontal scroll row */}
            <div className="d-md-none d-flex flex-nowrap overflow-auto gap-3 px-2 mt-3 pb-2"
                 style={{ scrollSnapType: 'x mandatory' }}>
              {scanResult.length > 0 ? (
                scanResult.map((product) => (
                  <Card
                    key={product._id}
                    id={product._id}
                    image={product.image}
                    name={product.title}
                    price={product.price}
                    stockStatus={product.stock}
                    Similarity={(product.score * 100).toFixed(2)}
                  />
                ))
              ) : (
                <p>No similar products found.</p>
              )}
            </div>
  
            <div className="d-none d-md-flex cards-div flex-wrap gap-3">
              {scanResult.length > 0 ? (
                scanResult.map((product) => (
                  <Card
                    key={product._id}
                    id={product._id}
                    image={product.image}
                    name={product.title}
                    price={product.price}
                    stockStatus={product.stock}
                    Similarity={(product.score * 100).toFixed(2)}
                  />
                ))
              ) : (
                <p>No similar products found.</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
  
};

export default AccuracyCard;

