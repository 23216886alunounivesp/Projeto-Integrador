// src/components/GenericPage.jsx
import React from 'react';
import SEO from './SEO'; // Corrija o caminho do import

function GenericPage({ children, title = '' }) {
  return (
    <>
      <SEO title={title} description="Descrição da página" keywords="palavras-chave" />
      <div className="generic-page">
        <h1>{title}</h1>
        <div className="page-content">
          {children}
        </div>
      </div>
    </>
  );
}

export default GenericPage;