import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { addDocument } from 'features/documents/documentService';
import Swal from 'sweetalert2';

const Documents = () => {
    const { user } = useSelector(state => state.auth);
    const [showModal, setShowModal] = useState(false);
    const [selectedDoc, setSelectedDoc] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);


    const [documentsData, setDocumentsData] = useState({
        Personal: [],
        Academic: [],
        Experience: [],
    });

    const handleFileSelect = (event, doc) => {
        const file = event.target.files[0];
        setDocumentsData(prevData => ({
            ...prevData,
            [doc.category]: prevData[doc.category].map(d =>
                d.document_title === doc.document_title ? { ...d, file: file } : d
            )
        }));
    };

    const handleUpload = async (event, doc) => {
        event.preventDefault();
        setIsSubmitting(true);
        const fileData = new FormData();
        const docToUpdate = documentsData[doc.category].find(d => d.document_title === doc.document_title);
        if (docToUpdate && docToUpdate.file) {
            fileData.append("file", docToUpdate.file);
            fileData.append('document_title', doc.document_title);
            fileData.append('category', doc.category);

            try {
                const response = await addDocument(fileData, user.id);
                if (response.status === 201) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Your document has been submitted successfully!',
                        confirmButtonText: 'OK'
                    })
                        .then((result) => {
                            if (result.isConfirmed) {
                                window.location.reload();
                            }
                        });
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.message || 'An error occurred'
                })
            }
            finally {
                setIsSubmitting(false);
                setShowModal(false);
            }
        } else {
            alert('No file selected');
        }
    };


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
                const response = await axios.get(`http://localhost:5000/api/documents/${user.id}`);
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
    }, []);

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
                                    <th className='text-center'>Action</th>
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
                                                    className='link-button'>
                                                    View
                                                </a>
                                            ) : (
                                                <Button onClick={() => { setShowModal(true); setSelectedDoc(doc) }}>Upload</Button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            ))}

            <Modal show={showModal} onHide={() => setShowModal(false)} className='my-modal'>
                <Modal.Header closeButton>
                    <Modal.Title>Select Document</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className='d-flex inline  px-2' encType='multipart/form-data'>
                        <Form.Control
                            type="file"
                            name='file'
                            className="form-control me-4"
                            onChange={e => handleFileSelect(e, selectedDoc)}
                            required
                        />
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={e => handleUpload(e, selectedDoc)} disabled={isSubmitting}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Documents;
