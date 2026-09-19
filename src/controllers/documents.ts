import type { Request, Response } from 'express';

export const getDocuments = (req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    data: [{id: "document_001",
documentname: "New Document",
createdAt: "2026-01-01T00:00:00Z"}], 
    error: null
  });
};

export const createDocument = (req: Request, res: Response): void => {
  res.status(201).json({
    success: true,
    data: {
      id: "document_01",
      title: "New Document",
      createdAt: "2026-01-01T00:00:00Z"
    },
    error: null
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

