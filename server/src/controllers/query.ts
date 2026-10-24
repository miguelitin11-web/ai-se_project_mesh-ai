import type { Request, Response } from 'express';
import { getClient } from '../utils/openai-client.js';
import { LLM_MODEL } from '../utils/openai-client.js';
import { buildContext } from '../utils/openai-client.js';
import { createEmbedding } from '../utils/embeddings.js';
import { rankBySimilarity } from '../utils/vector-search.js';
import Document from '../models/document.js';
import Chunk from '../models/chunk.js';

export const queryDocuments = async(req: Request, res: Response): Promise<void> => {
  const { question } = req.body;

   if (!question) {
     res.status(400).json({
       success: false,
       data: null,
       error: { message: 'question is required' },
     });
     return;
   }
  const userId = req.user!.userId;
  const userDocs = await Document.find({ userId }, '_id');
  const docIds = userDocs.map(id => id._id);

   const chunkRecords = await Chunk.find({ documentId: { $in: docIds } });
   const chunks = chunkRecords.map((c) => ({
     id: String(c._id),
     documentId: String(c.documentId),
     text: c.text,
     embedding: c.embedding,
   }));

   const questionEmbedding = await createEmbedding(question);
   const rankedChunks = rankBySimilarity(questionEmbedding, chunks);
   const context = buildContext(rankedChunks);
   const client = getClient();
const completion = await client.chat.completions.create({
  model: LLM_MODEL,
  messages: [
    { role: 'system', content: `Answer the question using only this context:\n\n${context}` },
    { role: 'user', content: question },
  ],
});
const answer = completion.choices[0]?.message?.content ?? 'No answer generated.';

  res.status(200).json({
    success: true,
    data: {
      question,
      answer: answer,
    },
    error: null,
  });
};