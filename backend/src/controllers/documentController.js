

const sequelize = require('../config/sequelize');
const sharp = require('sharp');
const Documents = require('../models/Documents');

const submitDocument = async (req, res) => {
    const { userId } = req.params;
    const { document_title, category } = req.body;
    let fileName = '';
    let metadata ='';

    if (req.file == undefined) {
        res.status(400).send({ message: 'Error: No File Selected!' });
    } else {

        fileName = req.file.filename;
        try {
            if(document_title !== 'Resume' || document_title !== 'Cover Letter'){
            const image = sharp(req.file.path);
            metadata = await image.metadata();}

            Documents.create({
                document_title: document_title, // Assuming you pass title in body
                category: category, // Assuming you pass category in body
                file_name: fileName,
                uploaded_date: new Date(),
                dimensions: `${metadata?.width}x${metadata?.height}` || '',
                resolution: `${metadata?.density || 'Unknown'} DPI`, // DPI may not always be available
                user_id: userId
            })
                .then(document => res.status(201).send(document))
                .catch(err => {
                    console.error('Database error:', err);
                    res.status(500).send({ message: 'Failed to save document', error: err });
                });
        } catch (err) {
            console.error('Sharp error:', err);
            res.status(500).send({ message: 'Error processing image', error: err });
        }
    }
}

const getDocuments = async (req, res) => {
    const {userId} = req.params;

    try {
        const documents = await Documents.findAll({
            where: { user_id: userId }
        });

        // Organize documents by categories
        const categorizedDocuments = documents.reduce((acc, doc) => {
            // Initialize category array if not already present
            if (!acc[doc.category]) {
                acc[doc.category] = [];
            }
            acc[doc.category].push(doc);
            return acc;
        }, {});

        res.json(categorizedDocuments);
    } catch (error) {
        console.error('Failed to fetch documents:', error);
        res.status(500).send('Error fetching documents');
    }
}

module.exports = {
    submitDocument,
    getDocuments
}