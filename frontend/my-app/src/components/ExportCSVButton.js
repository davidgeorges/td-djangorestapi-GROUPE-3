import React from 'react';
import { saveAs } from 'file-saver';
import { Button } from '@mui/material';

const ExportCSVButton = ({ csvFileName, functionToExportCsv, handleSnackbarError  }) => {
    const handleExportCSV = async () => {
        try {
            const response = await functionToExportCsv();
            const blob = new Blob([response.data], { type: 'text/csv' });

            saveAs(blob, csvFileName);
        } catch (error) {
            handleSnackbarError(error.message);
        }
    };

    return (
        <div>
            <Button onClick={handleExportCSV}>Exporter en CSV</Button>
        </div>
    );
};

export default ExportCSVButton;
