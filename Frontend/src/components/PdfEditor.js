// src/components/PdfEditor.js
import React, { useState, useRef } from 'react';
import axios from 'axios';

const PdfEditor = () => {
    const [pdfUrl, setPdfUrl] = useState('');

    // Ref to access the iframe element
    const pdfIframeRef = useRef(null);

    const handleLoadPdf = async () => {
        try {
            const response = await axios.get('http://localhost:3000/pdf/example.pdf', {
                responseType: 'blob',
            });

            const pdfUrl = URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
            setPdfUrl(pdfUrl); // Set the PDF URL to display in the iframe
        } catch (error) {
            console.error('Failed to load PDF:', error);
            alert('Failed to load PDF' + error);
        }
    };

    const handleSavePdf = async () => {
        try {
            if (!pdfUrl) {
                alert('Please load a PDF before saving');
                return;
            }

            const response = await fetch(pdfUrl);
            const pdfBlob = await response.blob();

            const formData = new FormData();
            formData.append('file', pdfBlob, 'updated-pdf-file.pdf');

            await axios.post('http://localhost:3000/pdf/save', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            alert('PDF saved successfully');
        } catch (error) {
            console.error('Failed to save PDF:', error);
            alert('Failed to save PDF');
        }
    };


    return (
        <div>
            <button onClick={handleLoadPdf}>Load PDF</button>
            <button onClick={handleSavePdf}>Save PDF</button>
            {/* Display the PDF in an iframe */}
            {pdfUrl && (
                <iframe
                    ref={pdfIframeRef}
                    src={pdfUrl}
                    title="PDF Viewer"
                    width="100%"
                    height="500px"
                />
            )}
        </div>
    );
};

export default PdfEditor;
