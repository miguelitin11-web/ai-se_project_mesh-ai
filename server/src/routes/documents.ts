import { Router } from 'express';
import { getDocuments , deleteDocument, getDocumentById, uploadDocument} from '../controllers/documents.js';
import { authMiddleware } from '../middleware/auth.js';
import multer from 'multer';

const documentsRouter = Router();
documentsRouter.use(authMiddleware)

const upload = multer({ dest: 'uploads/' });

documentsRouter.get('/', getDocuments);
documentsRouter.post('/', upload.single('file'), uploadDocument);
documentsRouter.get('/:id', getDocumentById);
documentsRouter.delete('/:id', deleteDocument);


export { documentsRouter};