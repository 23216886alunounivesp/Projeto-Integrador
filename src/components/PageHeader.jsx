import React from 'react';
import { Link } from 'react-router-dom';
import './PageHeader.css'; // Importe o CSS

function PageHeader({ title }) {
  return (
    <header className="page-header">
      <Link to="/" className="back-link">
        <span className="back-arrow">←</span> {/* Seta para esquerda (←) */}
      </Link>
      <h2 className="page-title">{title}</h2>
    </header>
  );
}

export default PageHeader;