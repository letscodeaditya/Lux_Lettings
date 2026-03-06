import { useEffect } from 'react';
import './About.css';

export default function About() {
  useEffect(() => {
    // Scroll reveal animations (optional)
    const reveals = document.querySelectorAll('.reveal');
    const onScroll = () => {
      reveals.forEach((el) => {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 120) {
          el.classList.add('visible');
        }
      });
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="about-page ">
      {/* ===============================
          PAGE HERO SECTION
      ================================= */}
      <section className="about-hero ">
        <div className="about-hero-overlay"></div>
        <div className="about-hero-grid"></div>

        <div className="about-hero-content">
          <p className="breadcrumb">
            {/* HOME <span>›</span> ABOUT US */}
          </p>

          <p className="hero-mini-tag">OUR STORY</p>

          <h1 className="about-hero-title">
            About <em>Us</em>
          </h1>

          <p className="about-hero-text">
            Design-led boutique stays where warmth, simplicity & thoughtful
            hospitality take centre stage. Wherever you stay with us, you feel
            at home.
          </p>

        </div>
          <div className="scroll-indicator">
            <div className="scroll-l"></div>
            <span>SCROLL</span>
          </div>
      </section>

      {/* ===============================
          STORY SECTION
      ================================= */}
      <section className="story-section reveal">
        <div className="story-text">
          <p className="section-tag">Our Story</p>
          <h2 className="section-title">
            Warmth & <em>Intentional</em> Care
          </h2>
          <p className="section-body">
            At the heart of our stay is a simple philosophy—thoughtful
            hospitality. From seamless check-in to carefully prepared linens and
            a calm, welcoming ambiance, every detail is designed to make you
            feel at ease.
          </p>
          <p className="section-body">
            Because true comfort isn’t loud. It's felt in the small, meaningful
            touches.
          </p>
        </div>

        <div className="story-cards">
          <div className="story-card card-1">
            <span className="card-label">
              The Art of
              <br />
              Indian Hospitality
            </span>
          </div>
          <div className="story-card card-2"></div>
          <div className="story-accent"></div>
        </div>
      </section>

      {/* ===============================
          PHILOSOPHY SECTION
      ================================= */}
      <section className="host-philosophy reveal">
        <p className="section-tag">OUR PHILOSOPHY</p>

        <h2 className="host-title">
          The Way <em>We Host</em>
        </h2>

        <div className="host-divider"></div>

        <p className="host-sub">
          Three beliefs guide every stay we create — shaping our design, our
          service, and the experience we offer.
        </p>

        <div className="host-grid">
          {/* CARD 01 */}
          <div className="host-item">
            <span className="host-number">01</span>
            <h3 className="host-heading">Design with Architecture</h3>
            <p className="host-text">
              Every space is thoughtfully curated — a balance between modern
              aesthetics and everyday comfort. Our stays don’t just exist in a
              location; they belong to it.
            </p>
          </div>

          {/* CARD 02 */}
          <div className="host-item">
            <span className="host-number">02</span>
            <h3 className="host-heading">Warm, Personal Hospitality</h3>
            <p className="host-text">
              We believe hospitality should feel effortless and genuine. From
              smooth check-ins to quick assistance and thoughtful touches,
              comfort is always our priority.
            </p>
          </div>

          {/* CARD 03 */}
          <div className="host-item">
            <span className="host-number">03</span>
            <h3 className="host-heading">Simple, Purposeful Living</h3>
            <p className="host-text">
              We value mindful living — clean spaces, minimal waste, durable
              materials, and intentional choices that respect both our guests
              and our environment.
            </p>
          </div>
        </div>
      </section>

      {/* ===============================
          QUOTE BANNER
      ================================= */}
      <section className="quote-banner">
        <div className="quote-overlay"></div>

        <div className="quote-content reveal">
          <blockquote>
            “A home away from home, where every detail whispers quiet luxury.”
          </blockquote>
        </div>
      </section>
    </div>
  );
}
