import "./KnowledgeBase.css";
import { useState, useEffect } from "react";
import type { KnowledgeDoc } from "../../utils/api";
import UploadArea from "../../components/UploadArea/UploadArea";
import { getDocuments } from "../../utils/api";
import xIcon from "../../assets/icons/Vector.svg";

export default function KnowledgeBase() {
  const [documents, setDocuments] = useState<KnowledgeDoc[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const load = async () => {
      try {
        const res = await getDocuments();
        setDocuments(res.data || []);
      } catch {
        setError("Failed to load documents.");
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);
  const handleFileSelect = (file: File) => {
    const newDoc: KnowledgeDoc = {
      _id: Date.now().toString(),
      title: file.name,
      fileName: file.name,
      userId: "local",
      createdAt: new Date().toISOString(),
    };
    setDocuments([newDoc, ...documents]);
  };
  return (
    <div className="knowledge-base">
      <h1 className="knowledge-base__title">Manage Your Knowledge Base</h1>
      <section className="knowledge-base__content">
        <h2 className="knowledge-base__uploadareatitle">
          Upload documents (PDF)
        </h2>
        <UploadArea onFileSelect={handleFileSelect} />
        {isLoading && <p>Loading...</p>}
        {!isLoading && error && <p>{error}</p>}
        {!isLoading && !error && documents.length === 0 && (
          <p>No documents yet</p>
        )}

        {!isLoading && !error && documents.length > 0 && (
          <div className="knowledge-base__list">
            {documents.map((doc) => (
              <div className="knowledge-base__doc" key={doc._id}>
                {doc.title}
                <button aria-label="Delete document">
                  {<img src={xIcon} alt="x icon for deleting" />}
                </button>
              </div>
            ))}
          </div>
        )}
        <button type="button" className="knowledge-base__save">
          Save
        </button>
      </section>
    </div>
  );
}
