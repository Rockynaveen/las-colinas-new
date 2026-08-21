import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Eye, Target } from 'lucide-react';
import { SectionLabel } from '../components/About/SectionLabel';

const ease = [0.16, 1, 0.3, 1] as const;

export const VisionMission: React.FC = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section id="vision" className="lchm-section lchm-section--cream">
      <div className="lchm-inner">
        <motion.div
          className="lchm-section-header-centered"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease }}
        >
          <SectionLabel number="03" label="VISION & MISSION" />
        </motion.div>

        <div className="lchm-vm-row">
          <motion.article
            className="lchm-vm-card"
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, delay: 0.08, ease }}
          >
            <div className="lchm-vm-icon">
              <Eye size={54} strokeWidth={1.5} />
            </div>
            <h3 className="lchm-vm-title">VISION</h3>
            <p className="lchm-vm-text">
              To be the hospitality partner of choice, recognized for developing, managing, and elevating exceptional hotel assets that create lasting value for investors, unforgettable guest experiences, and sustainable growth for the communities we serve.
            </p>
          </motion.article>

          <div className="lchm-vm-divider" />

          <motion.article
            className="lchm-vm-card"
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, delay: 0.2, ease }}
          >
            <div className="lchm-vm-icon">
              <Target size={54} strokeWidth={1.5} />
            </div>
            <h3 className="lchm-vm-title">MISSION</h3>
            <p className="lchm-vm-text">
              Our mission is to maximize hospitality asset performance through strategic development, disciplined management, operational excellence, and innovative solutions that deliver measurable financial results while exceeding guest expectations.
            </p>
          </motion.article>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
