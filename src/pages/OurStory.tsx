import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { SectionLabel } from '../components/About/SectionLabel';
import { LotusDeco } from '../components/About/LotusDeco';

const ease = [0.16, 1, 0.3, 1] as const;

export const OurStory: React.FC = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section id="story" className="lchm-section lchm-section--navy">
      <div className="lchm-inner">
        <div className="lchm-story-grid">
          <motion.div
            className="lchm-story-copy"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease }}
          >
            <SectionLabel number="02" label="OUR STORY" tone="dark" />
            <h2 className="lchm-heading lchm-heading--light">Our Story</h2>
            <p className="lchm-body lchm-body--light">
              Las Colinas Hospitality Management was established with a clear vision: to become a trusted hospitality partner delivering exceptional operational performance and long-term investment value.
            </p>
            <p className="lchm-body lchm-body--light">
              Since our founding, we have partnered with hotel owners, investors, lenders, and leading hospitality brands to develop, manage, and reposition hotels that consistently outperform their competitive markets.
            </p>
            <p className="lchm-body lchm-body--light">
              Our success is built on integrity, innovation, operational excellence, and a commitment to creating lasting partnerships.
            </p>
          </motion.div>

          <motion.div
            className="lchm-story-media"
            initial={reduceMotion ? false : { opacity: 0, scale: 1.04 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.85, ease }}
          >
            <div className="lchm-photo-frame lchm-photo-frame--story">
              <img
                src="/our-story.webp"
                alt="Upscale hotel lounge"
                className="lchm-photo"
              />
            </div>
            <LotusDeco className="lchm-lotus lchm-lotus--story" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
