import React from 'react';

interface SectionLabelProps {
  number: string;
  label: string;
  tone?: 'light' | 'dark';
}

export const SectionLabel: React.FC<SectionLabelProps> = ({
  number,
  label,
  tone = 'light',
}) => (
  <div className={`lchm-label lchm-label--${tone}`}>
    <span className="lchm-label-num">{number}</span>
    <span className="lchm-label-text">{label}</span>
  </div>
);

export default SectionLabel;
