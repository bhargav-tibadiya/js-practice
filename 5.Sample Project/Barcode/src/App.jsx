// Dependencies
import { useState } from 'react';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';
import toast, { Toaster } from 'react-hot-toast';

// Styles
import './App.css';

function App() {
  // State to store the latest scanned data
  const [currentData, setCurrentData] = useState('No result');

  // State to store an array of scanned results for history tracking
  const [scanHistory, setScanHistory] = useState([]);

  // Initialize audio for the beep sound effect
  const beepSound = new Audio('/beep.mp3');

  /**
   * Handles the scanning result.
   * @param {Error} err - Error, if any, from the scanner.
   * @param {Object} result - The scanning result object.
   */
  const handleScan = (err, result) => {
    if (result) {
      // Update current data and add it to the scan history
      setCurrentData(result.text);
      setScanHistory(prevHistory => [...prevHistory, result.text]);

      // Play the beep sound for successful scan feedback
      beepSound.play();

      // Show a success notification using toast
      toast.success(`Product scanned: ${result.text}`);
    } else {
      setCurrentData('No result'); // Set message if no result
    }
  };

  return (
    <div className="box">
      {/* Notification toaster for displaying scan success messages */}
      <Toaster position="top-right" reverseOrder={false} />

      {/* Scanner title */}
      <div className="title">Scanner</div>

      {/* Barcode scanner component */}
      <div className="scan">
        <BarcodeScannerComponent
          width={500}
          height={500}
          onUpdate={handleScan}
          delay={1500} // 1.5 seconds delay between scans
        />
      </div>

      {/* Display the current scanned data */}
      <p>Scanned Data: {currentData}</p>

      {/* Table to display scan history */}
      <h2>Scan History</h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Scanned Result</th>
          </tr>
        </thead>
        <tbody>
          {scanHistory.map((result, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{result}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
