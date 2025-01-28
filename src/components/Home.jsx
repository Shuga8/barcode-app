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
    };

    const handleError = (error) => {
      console.warn(error);
    };

    scanner.render(handleSuccess, handleError);

    // Clean up the scanner on component unmount
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
    <div className="w-full h-[100dvh] bg-[#f0f0f0] flex flex-col items-center justify-center py-10 px-2 gap-y-3">
      <div className="logo flex flex-row gap-x-2 items-center">
        <img
          src={logo}
          alt="QR Code Logo"
          className="w-[50px] h-[50px] object-contain"
        />
        <h1 className="text-[#0a0a0a] text-[14px] uppercase font-semibold">
          Barcode Scanner
        </h1>
      </div>
      {/* Ensure that the scanner only renders once */}
      <div id="barcode-reader" className="reader"></div>
      {scanResult ? (
        <div
          id="scan-result"
          className="scan-result text-[#0a0a0a] text-sm font-medium mt-4"
        >
          {scanResult}
        </div>
      ) : (
        <>
          <span>Scan Now</span>
        </>
      )}
    </div>
  );
};

export default Home;
