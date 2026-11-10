import "./Intro.css";
import { useNavigate } from "react-router-dom";
import iconCollect from "../../assets/icon-collect.png";
import iconOrganize from "../../assets/icon-organize.png";
import iconDiscover from "../../assets/icon-discover.png";

export default function Intro() {
  const navigate = useNavigate();

  return (
    <main className="intro">
      <h1 className="intro__title">
        Welcome to Mesh AI <span className="intro__mark" aria-hidden="true" />
      </h1>

      <section className="intro__features" aria-label="Mesh AI features">
        <article className="intro__feature">
          <img
            className="intro__illustration"
            src={iconCollect}
            alt="Three white documents in fan disposition with purple background"
          />
          <p>Bring all your documents into one secure AI workspace</p>
        </article>

        <article className="intro__feature">
          <img
            className="intro__illustration"
            src={iconOrganize}
            alt=" Documents inside a white folder with purple background"
          />
          <p>Organize and manage the documents that power your AI</p>
        </article>

        <article className="intro__feature">
          <img
            className="intro__illustration"
            src={iconDiscover}
            alt="Three purple documents with three shining stars with purple background"
          />
          <p>Your knowledge base, accessible through a simple chat interface</p>
        </article>
      </section>

      <p className="intro__prompt">
        Start by creating your Organization’s Knowledge Base
      </p>
      <button className="intro__start" onClick={() => navigate("/knowledge")}>
        Start
      </button>
    </main>
  );
}
