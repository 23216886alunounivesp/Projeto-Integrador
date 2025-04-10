// src/components/SEO.jsx
import React from 'react';

const SEO = ({ title, description, keywords }) => {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </>
  );
};

export default SEO;