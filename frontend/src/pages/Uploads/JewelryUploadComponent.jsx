import React, { useState, useEffect } from "react";
import Cards from "../../components/Cards"

const JewelryUploadComponent = () => {
    const [uploadedImages, setUploadedImages] = useState([]);
    const [accuracy, setAccuracy] = useState(0);
    const [isUnique, setIsUnique] = useState(false);
    const [similarMatches, setSimilarMatches] = useState([]);

    // Dummy API call simulation
    useEffect(() => {
        // Simulating backend response
        const fetchData = () => {
            const dummyResponse = {
                uploadedImages: [
                    "/mnt/data/match.png",
                    "/mnt/data/match.png",
                    "/mnt/data/match.png"
                ],
                accuracy: 23,
                isUnique: false,
                similarMatches: [
                    { img: "/mnt/data/match.png", price: "₹1,90,000.00", name: "The Finder – Bjørg Jewellery", stockStatus: "In Stock" },
                    { img: "/mnt/data/match.png", price: "₹1,90,000.00", name: "The Finder – Bjørg Jewellery", stockStatus: "In Stock" },
                    { img: "/mnt/data/match.png", price: "₹1,90,000.00", name: "The Finder – Bjørg Jewellery", stockStatus: "In Stock" }
                ]
            };

            setUploadedImages(dummyResponse.uploadedImages);
            setAccuracy(dummyResponse.accuracy);
            setIsUnique(dummyResponse.isUnique);
            setSimilarMatches(dummyResponse.similarMatches);
        };

        fetchData();
    }, []);

    return (
        <div style={{ backgroundColor: "#4c2d41", padding: "20px", color: "white", textAlign: "center" }}>
            <h2>Uploaded Images</h2>
            <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                {uploadedImages.map((img, index) => (
                    <img key={index} src={img} alt="Uploaded" style={{ width: "150px", borderRadius: "8px" }} />
                ))}
            </div>
            
            <h3 style={{ color: "red" }}>Accuracy: {accuracy}%</h3>
            <div style={{ backgroundColor: "#fff", width: "80%", margin: "10px auto", height: "20px", borderRadius: "5px", overflow: "hidden" }}>
                <div style={{ width: `${accuracy}%`, height: "100%", backgroundColor: "#6a1b9a" }}></div>
            </div>

            {isUnique ? (
                <h3 style={{ color: "lightgreen" }}>✅ Your design is unique! 🎉</h3>
            ) : (
                <>
                    <h3 style={{ color: "red" }}>❌ Your design is not unique.</h3>
                    <p>Try modifying it or checking for alternatives.</p>
                    {/* <h3>Similar Matches</h3>
                    <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
                        {similarMatches.map((match, index) => (
                            <Cards 
                                key={index} 
                                image={match.img} 
                                name={match.name} 
                                price={match.price} 
                                stockStatus={match.stockStatus} 
                            />
                        ))}
                    </div> */}
                </>
            )}
        </div>
    );
};

export default JewelryUploadComponent;
