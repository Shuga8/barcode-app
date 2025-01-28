import React, { useEffect, useState } from "react";
import logo from "../assets/qr-code.png";
import { Html5QrcodeScanner } from "html5-qrcode";

const Home = () => {
  const [scanResult, setScanResult] = useState(null);
  useEffect(() => {
    const scannerConfig = {
      qrbox: { width: 250, height: 250 },
      fps: 5,
    };

    const scanner = new Html5QrcodeScanner("barcode-reader", scannerConfig);

    const handleSuccess = (result) => {
      scanner.clear();
      setScanResult(result);
      document.removeChild("#barcode-reader");
    };

    const handleError = (error) => {
      console.warn(error);
    };

    scanner.render(handleSuccess, handleError);
    return () => {
      scanner
        .clear()
        .then(() => {
          console.log("Scanner cleared.");
        })
        .catch((err) => console.error("Error during cleanup:", err));
    };
  }, []);

  return (
    <div
      style={{
        padding: "15px 3px 0px 3px",
      }}
    >
      <div
        style={{
          width: "100%",

          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          gap: "20px",
          placeItems: "center",
        }}
      >
        <img
          src={logo}
          alt="QR Code Logo"
          style={{
            width: "50px",
            height: "50px",
            objectFit: "contain",
          }}
        />
        <h1
          style={{
            fontSize: "18px",
          }}
        >
          Barcode Scanner
        </h1>
      </div>

      <div
        style={{
          width: "100%",
          textAlign: "center",
          color: "red",
          fontSize: "10px",
          border: "none",
          marginBottom: "20px",
          textTransform: "uppercase",
        }}
      >
        Use On Mobile Phone / Similar Device For Better Performance
      </div>

      <div
        id="barcode-reader"
        style={{
          maxHeight: "fit-content",
          overflowY: "hidden",
        }}
      ></div>
      {scanResult ? (
        <div
          id="scan-result"
          style={{
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            gap: "10px",
            textAlign: "center",
          }}
        >
          {`Barcode Result: ${scanResult}`}
          <div
            onClick={() => window.location.reload()}
            style={{
              color: "red",
              fontSize: "12px",
            }}
          >
            Refesh
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Home;
