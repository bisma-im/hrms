import React from 'react';
import { Table, Button, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const EmployeeDocuments = ({ employee }) => {
    // const employee = useSelector((state) => state.employee.selectedEmployee);
    const documentsData = [
        {
            category: "Personal",
            documents: [
                { document: "Resume.pdf", dimensions: "210x297mm", resolution: "300dpi", uploadedDate: "2021-07-15", remarks: "Updated version", status: "Approved", action: "View" },
                { document: "Cover Letter.pdf", dimensions: "210x297mm", resolution: "300dpi", uploadedDate: "2021-07-16", remarks: "Initial submission", status: "Pending", action: "View" },
                { document: "CNIC Front", page: "Front Side", dimensions: "85x55mm", resolution: "300dpi", uploadedDate: "2023-08-01", remarks: "Official ID front side", status: "Verified", action: "View" },
                { document: "CNIC Back", page: "Back Side", dimensions: "85x55mm", resolution: "300dpi", uploadedDate: "2023-08-01", remarks: "Official ID back side", status: "Verified", action: "View" },
            ]
        },
        {
            category: "Academic",
            documents: [
                { document: "Matric/O-Levels Certificate", page: "Sheet 1", dimensions: "A4", resolution: "300dpi", uploadedDate: "2023-08-03", remarks: "Matric/O-level Graduation", status: "Verified", action: "View" },
                { document: "Inter/A-Levels Certificate", page: "Sheet 1", dimensions: "A4", resolution: "300dpi", uploadedDate: "2023-08-03", remarks: "Inter/A-level Graduation", status: "Verified", action: "View" },
                { document: "Bachelor's Degree", page: "Sheet 1", dimensions: "A4", resolution: "300dpi", uploadedDate: "2023-08-04", remarks: "Undergraduate Certification", status: "Verified", action: "View" },
                { document: "Master's Degree", page: "Sheet 1", dimensions: "A4", resolution: "300dpi", uploadedDate: "2023-08-05", remarks: "Graduate Certification", status: "Verified", action: "View" },
                { document: "PhD Degree", page: "Sheet 1", dimensions: "A4", resolution: "300dpi", uploadedDate: "2023-08-06", remarks: "Doctorate Certification", status: "Verified", action: "View" }
            ]
        },
        {
            category: "Experience",
            documents: [
                { document: "Experience Certificate", page: "Sheet 1", dimensions: "A4", resolution: "300dpi", uploadedDate: "2023-08-07", remarks: "Certified Teaching Qualification", status: "Verified", action: "View" },
                { document: "Previous Employment Verification", page: "Sheet 1", dimensions: "A4", resolution: "300dpi", uploadedDate: "2023-08-08", remarks: "Proof of Previous Employment", status: "Verified", action: "View" },
                { document: "Research Publication", page: "Sheet 1", dimensions: "A4", resolution: "300dpi", uploadedDate: "2023-08-09", remarks: "Published Research Paper", status: "Verified", action: "View" }
            ]
        }
    ];

    return (

        // <Card className='p-4'>
        <>
            {documentsData.map((docType, index) => (
                <Card key={index} className='my-card my-5'>
                    <Card.Header className='card-header'>
                        <h3>{docType.category} Documents</h3>
                    </Card.Header>
                    <Card.Body className="table-responsive my-table">
                        <Table striped bordered hover className='table'>
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
                                {docType.documents.map((doc, index) => (
                                    <tr key={index}>
                                        <td>{doc.document}</td>
                                        <td>{doc.dimensions}</td>
                                        <td>{doc.resolution}</td>
                                        <td>{doc.uploadedDate}</td>
                                        <td>{doc.remarks}</td>
                                        <td>{doc.status}</td>
                                        <td>
                                            <a href={`${process.env.REACT_APP_API_URL}/uploads/${employee.resume}`} 
                                                target="_blank" // Opens the link in a new tab
                                                rel="noopener noreferrer" // Security best practice for links opening in new tabs
                                                className="ms-2 link-button">
                                                    {doc.action}
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            ))}
        </>
        // </Card>
    );
};

export default EmployeeDocuments;
