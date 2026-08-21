import React from 'react';

export const LotusDeco: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    className={className}
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M60 18c4 14 8 24 0 42-8-18-4-28 0-42Z"
      stroke="currentColor"
      strokeWidth="1.2"
    />
    <path
      d="M60 18c-18 10-28 22-32 42 18-6 28-8 32-42Z"
      stroke="currentColor"
      strokeWidth="1.2"
    />
    <path
      d="M60 18c18 10 28 22 32 42-18-6-28-8-32-42Z"
      stroke="currentColor"
      strokeWidth="1.2"
    />
    <path
      d="M28 60c12 2 22 8 32 28-22-8-30-16-32-28Z"
      stroke="currentColor"
      strokeWidth="1.2"
    />
    <path
      d="M92 60c-12 2-22 8-32 28 22-8 30-16 32-28Z"
      stroke="currentColor"
      strokeWidth="1.2"
    />
    <path
      d="M36 88c8-2 16-2 24 8-12 0-20-2-24-8Z"
      stroke="currentColor"
      strokeWidth="1.2"
    />
    <path
      d="M84 88c-8-2-16-2-24 8 12 0 20-2 24-8Z"
      stroke="currentColor"
      strokeWidth="1.2"
    />
    <circle cx="60" cy="62" r="4" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

export default LotusDeco;
