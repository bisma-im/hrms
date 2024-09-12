import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import { updateDocument } from 'features/documents/documentService';
import Swal from 'sweetalert2';

const EmployeeDocuments = ({ userId }) => {
    const [documentsData, setDocumentsData] = useState({
        Personal: [],
        Academic: [],
        Experience: [],
    });
    const [showModal, setShowModal] = useState(false);
    const [editDoc, setEditDoc] = useState(null);
    const [remarks, setRemarks] = useState("");
    const [status, setStatus] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Static titles and document types
    const documentTypes = {
        Personal: [
            { document_title: "Resume", category: "Personal" },
            { document_title: "Cover Letter", category: "Personal" },
            { document_title: "CNIC Front", category: "Personal" },
            { document_title: "CNIC Back", category: "Personal" },
        ],
        Academic: [
            { document_title: "Matric/O-Levels Certificate", category: "Academic" },
            { document_title: "Inter/A-Levels Certificate", category: "Academic" },
            { document_title: "Bachelor's Degree", category: "Academic" },
            { document_title: "Master's Degree", category: "Academic" },
            { document_title: "PhD Degree", category: "Academic" },
        ],
        Experience: [
            { document_title: "Experience Certificate", category: "Experience" },
            { document_title: "Previous Employment Verification", category: "Experience" },
            { document_title: "Research Publication", category: "Experience" },
        ],
    };

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/documents/${userId}`);
                const uploadedDocs = response.data;

                // Merge uploaded documents with the static structure
                const mergedData = { ...documentTypes };
                Object.keys(uploadedDocs).forEach(category => {
                    uploadedDocs[category].forEach(doc => {
                        const index = mergedData[category].findIndex(item => item.document_title === doc.document_title);
                        if (index !== -1) {
                            mergedData[category][index] = { ...mergedData[category][index], ...doc };
                        }
                    });
                });

                setDocumentsData(mergedData);
            } catch (error) {
                console.error('Error fetching documents:', error);
            }
        };

        fetchDocuments();
    }, [userId]);

    const handleEdit = (doc) => {
        setEditDoc(doc);
        setRemarks(doc.remarks || "");
        setStatus(doc.status || "Pending");
        setShowModal(true);
    };

    const handleSave = async () => {
        // Logic to save changes to the database
        // You may want to make an API call here to save the status and remarksconsole.log(doc.document_id);
        setIsLoading(true);
        const reponse = await updateDocument({
            data: { status: status, remarks: remarks},
            id: editDoc.document_id
        })
        .then(() => {
            Swal.fire({
                title: 'Success',
                icon: 'success',
                text: 'Document successfully updated.',
                confirmButtonText: 'OK'
            })
            .then((result) => {
                if (result.isConfirmed) {
                    window.location.reload();
                }
            });
        })
        .catch((error) => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message || 'An error occurred'
            })
        })
        .finally(() => {
            setIsLoading(false);
            setShowModal(false);
        })
    };

    return (
        <>
            {Object.keys(documentsData).map((category, index) => (
                <Card key={index} className='my-card my-5'>
                    <Card.Header className='card-header'>
                        <h3>{category} Documents</h3>
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
                                    <th>File</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {documentsData[category].map((doc, index) => (
                                    <tr key={index}>
                                        <td>{doc.document_title}</td>
                                        <td>{doc.dimensions || '-'}</td>
                                        <td>{doc.resolution || '-'}</td>
                                        <td>{doc.uploaded_date ? new Date(doc.uploaded_date).toLocaleDateString() : '-'}</td>
                                        <td>{doc.remarks || '-'}</td>
                                        <td>{doc.status || 'Pending'}</td>
                                        <td>
                                            {doc.file_name ? (
                                                <a href={`${process.env.REACT_APP_API_URL}/uploads/${doc.file_name}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="ms-2 link-button">
                                                    View
                                                </a>
                                            ) : (
                                                <span className="text-danger">Not Uploaded</span>
                                            )}
                                        </td>
                                        <td>
                                            {/* {doc.file_path && ( */}
                                                <Button variant="warning" className="ms-2" onClick={() => handleEdit(doc)} size="sm">
                                                    <FaEdit />
                                                </Button>
                                                {/* <Button onClick={() => handleEdit(doc)} className="ms-2" size="sm">
                                                    <FaEye />
                                                </Button> */}
                                            {/* )} */}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            ))}

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Document</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className='p-2'>
                            <Form.Label className='custom-label'>Remarks</Form.Label>
                            <Form.Control
                                type="text"
                                value={remarks}
                                onChange={(e) => setRemarks(e.target.value)}
                                className='custom-control'
                            />
                        </Form.Group>
                        <Form.Group className='p-2'>
                            <Form.Label className='custom-label'>Status</Form.Label>
                            <Form.Control
                                as="select"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className='custom-control form-select'
                            >
                                <option value="Pending">Pending</option>
                                <option value="Approved">Approved</option>
                                <option value="Rejected">Rejected</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave} disabled={isLoading}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default EmployeeDocuments;
