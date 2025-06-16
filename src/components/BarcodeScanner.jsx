import React, { useState } from 'react';
import BarcodeReader from 'react-barcode-reader';
import 'bootstrap/dist/css/bootstrap.min.css';

function BarcodeScanner({ user }) {
  const [scanResult, setScanResult] = useState(null);

  const handleScan = async (data) => {
    if (data) {
      setScanResult(data);
      try {
        const response = await fetch('http://sims21.pythonanywhere.com/scan', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'User-ID': localStorage.getItem('userId'),
          },
          body: JSON.stringify({
            barcode: data,
            action: 'scan',
            status: 'used',
            location: 'in_use_theatre',
            remark: 'Scanned in theatre',
          }),
        });
        const result = await response.json();
        alert(result.message);
      } catch (error) {
        alert('Error scanning barcode');
      }
    }
  };

  const handleError = (err) => {
    console.error('Barcode scan error:', err);
  };

  if (!user) return <div className="alert alert-warning">Please log in</div>;

  return (
    <div className="container mt-5">
      <h3>Barcode Scanner</h3>
      <div className="card shadow-sm bg-warning-subtle border-warning">
        <div className="card-body">
          <BarcodeReader
            onScan={handleScan}
            onError={handleError}
            minLength={1}
          />
          {scanResult && (
            <div className="alert alert-success mt-3">
              Scanned: {scanResult}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BarcodeScanner;