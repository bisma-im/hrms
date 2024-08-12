import React from 'react';
import { Table, Button, Container } from 'react-bootstrap';

const EmployeeDocuments = () => {
    const documentsData = [
        { document: "Resume.pdf", dimensions: "210x297mm", resolution: "300dpi", uploadedDate: "2021-07-15", remarks: "Updated version", status: "Approved", action: "View" },
        { document: "Cover Letter.pdf", dimensions: "210x297mm", resolution: "300dpi", uploadedDate: "2021-07-16", remarks: "Initial submission", status: "Pending", action: "View" },
        { document: "Portfolio.pdf", dimensions: "210x297mm", resolution: "300dpi", uploadedDate: "2021-07-17", remarks: "Contains work samples", status: "Approved", action: "View" },
        { document: "ID Scan.png", dimensions: "85x55mm", resolution: "600dpi", uploadedDate: "2021-07-18", remarks: "Proof of Identity", status: "Rejected", action: "View" },
        { document: "Contract.pdf", dimensions: "210x297mm", resolution: "300dpi", uploadedDate: "2021-07-19", remarks: "Signed", status: "Approved", action: "View" },
        { document: "Certification.pdf", dimensions: "210x297mm", resolution: "300dpi", uploadedDate: "2021-07-20", remarks: "Professional certification", status: "Pending", action: "View" },
        { document: "Passport Photo.jpg", dimensions: "35x45mm", resolution: "600dpi", uploadedDate: "2021-07-21", remarks: "Updated photo", status: "Approved", action: "View" }
    ];

    return (
        <Container fluid className='p-4'>
            <div className="table-responsive">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Document</th>
                            <th>Dimensions</th>
                            <th>Resolution</th>
                            <th>Uploaded Date</th>
                            <th>Remarks</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {documentsData.map((doc, index) => (
                            <tr key={index}>
                                <td>{doc.document}</td>
                                <td>{doc.dimensions}</td>
                                <td>{doc.resolution}</td>
                                <td>{doc.uploadedDate}</td>
                                <td>{doc.remarks}</td>
                                <td>{doc.status}</td>
                                <td><Button variant="primary" size="sm">{doc.action}</Button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </Container>
    );
};

export default EmployeeDocuments;
