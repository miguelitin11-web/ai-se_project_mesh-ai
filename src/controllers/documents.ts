import type { Request, Response } from 'express';
import { readFileSync } from 'fs';
import { createRequire } from 'module';
import Document from '../models/document.js';
import Chunk from '../models/chunk.js';
import { chunkText } from '../utils/chunk.js';
import { createEmbedding } from '../utils/embeddings.js';

const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');

export const getDocuments = async (req: Request, res: Response): Promise<void> => {
  const documents = await Document.find({ userId: req.user!.userId });

  res.status(200).json({
    success: true,
    data: documents,
    error: null,
  });
};

export const uploadDocument = async (req: Request, res: Response) => {
 if (!req.file) {
   res.status(400).send({
     success: false,
     data: null,
     error: { message: 'File is required' },
   });
   return;
 }

  // Extract the title from the body, or req.file.originalname
 const title = req.body.title || req.file.originalname;

 const dataBuffer = readFileSync(req.file.path);
 const pdfData = await pdfParse(dataBuffer);
 const text = pdfData.text;
 const chunks = chunkText(text);

 // Create a Document document. See the models/document.ts
 const document = await Document.create({
   title,
   fileName: req.file.originalname,
   userId: req.user!.userId,
 });


 await Promise.all(
   chunks.map(async (chunkContent) => {
     const embedding = await createEmbedding(chunkContent);

     return Chunk.create({
       documentId: document._id,
       text: chunkContent,
       embedding,
     });
   })
 );

 res.status(201).send({
   success: true,
   data: document,
   error: null,
 });
};

export const getDocumentById = (req: Request, res: Response): void => {
  const documentId = req.params.id;

  res.status(200).json({
    success: true,
    data: {
      id: documentId,
      title: "New Document",
      createdAt: "2026-01-01T00:00:00Z"
    },
    error: null
  });
};

export const deleteDocument = (req: Request, res: Response): void => {
  const documentId = req.params.id;

  res.status(204).json({
    success: true,
    data: {id: documentId},
    error: null
  });
};

