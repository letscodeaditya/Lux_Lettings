import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    // NAV SCROLL EFFECT — already exists in Navbar.jsx
    // so we do not repeat it here.

    // REVEAL ANIMATIONS
    const revealEls = document.querySelectorAll(
      '.reveal, .reveal-left, .reveal-right'
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    revealEls.forEach((el) => observer.observe(el));

    // TESTIMONIAL SLIDER
    const quotes = [
      {
        text: 'A place where spirituality meets serenity and self-discovery — time truly stands still at the Roseate Ganges.',
        author: '— Namrata Murmu · Boutique Stay, Uttar Pradesh',
      },
      {
        text: 'The butler service is extraordinary — anticipatory, discreet, and utterly personal. I have never felt more at home.',
        author: '— Aditya Ayush · Boutique Stay, Uttar Pradesh',
      },
      {
        text: 'An architectural masterpiece that feels like a sanctuary. The culinary journey alone is worth the visit.',
        author: '— Sweta M · Boutique Stay, Uttar Pradesh',
      },
    ];

    const dots = document.querySelectorAll('.dot');
    let qi = 0;

    function changeQuote(i) {
      document.getElementById('quoteText').textContent = quotes[i].text;
      document.getElementById('quoteAuthor').textContent = quotes[i].author;

      dots.forEach((d, idx) => d.classList.toggle('active', idx === i));
    }

    const interval = setInterval(() => {
      qi = (qi + 1) % quotes.length;
      changeQuote(qi);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* ==============================
          HERO
      =============================== */}
      <section className="hero">
        <div className="hero-bg"></div>
        <div className="hero-overlay"></div>

        <div className="hero-content hero-centered">
          <h1 className="hero-title">
            Quiet
            <br />
            Luxury,
            <br />
            <em>Thoughtfully</em>
            <br />
            Designed
          </h1>

          <p className="hero-subtitle">
            A design-led boutique stay. A peaceful studio crafted with warmth,
            simplicity, and intention. An intimate space where comfort feels
            personal and every detail has meaning.
          </p>

          <div className="hero-cta">
            <a  onClick={(e) => {
          e.preventDefault();
          navigate("/stays");
        }} className="story-btn1">
              Explore Stays
            </a>
          </div>
        </div>

        <div className="hero-scroll">
          <div className="scroll-line"></div>
          <span>Scroll</span>
        </div>
      </section>
      {/* ==============================
          MARQUEE
      =============================== */}

      <div className="marquee-strip">
        <div className="marquee-track">
          {Array(12)
            .fill('Noida, Uttar Pradesh')
            .map((item, i) => (
              <span key={i} className="marquee-item">
                {item}
              </span>
            ))}
        </div>
      </div>

      {/* ==============================
          INTRO SECTION
      =============================== */}

      <section className="story-section">
        <div className="story-container">
          {/* LEFT VISUAL */}
          <div className="story-visual">
            <div className="story-card story-card-1 ">
              <span className="story-label">
                The Art of
                <br />
                Indian Hospitality
              </span>
            </div>

            <div className="story-card story-card-2"></div>

            <div className="story-accent"></div>
          </div>

          {/* RIGHT TEXT CONTENT */}
          <div className="story-text">
            <p className="story-tag">OUR STORY</p>

            <h2 className="story-title">
              Warmth &<br />
              <em>Intentional</em>
              <br />
              Care
            </h2>

            <div className="story-divider"></div>

            <p className="story-body">
              At the heart of our stay is a simple philosophy — thoughtful
              hospitality. From seamless check-in to carefully prepared linens
              and a calm, welcoming ambiance, every detail is designed to make
              you feel at ease.
            </p>

            <p className="story-body">
              Because true comfort isn't loud. It’s felt in the small,
              meaningful touches.
            </p>
            <div>
              <button onClick={(e) => {
          e.preventDefault();
          navigate("/about");
        }}  className="story-btn">Discover More</button>
            </div>
          </div>
        </div>
      </section>

      {/* ==============================
          HOTELS GRID
      =============================== */}

      <section className="collection-section">
        <div className="collection-header">
          <div>
            <p className="collection-tag">OUR COLLECTION</p>

            <h2 className="collection-title">
              Our <em>Boutique</em> & Stays
            </h2>
          </div>

          <a onClick={(e) => {
          e.preventDefault();
          navigate("/stays");
        }} className="collection-viewall">
            View All Properties →
          </a>
        </div>

        <div className="collection-grid">
          {/* PROPERTY CARD */}
          <div className="property-card">
            <div className="property-image">
              <div className="property-info">
                <p className="prop-type">Urban Retreat</p>

                <h3 className="prop-name">
                  The
                  <br />
                  Boutique
                </h3>

                <p className="prop-location">Noida, Uttar Pradesh</p>
              </div>
            </div>
          </div>
        </div>

        {/* PROPERTY DESCRIPTION */}
        <p className="property-desc">
          A whispering grove, a sanctuary, an oasis of bespoke luxury — a
          fascinating urban retreat in the heart of Noida.
        </p>
      </section>

      {/* ==============================
          FEATURES
      =============================== */}

      <section className="features-section">
        <div className="features-header">
          <p className="features-tag">ABOUT US</p>

          <h2 className="features-title">
            We are More Than
            <br />
            <span>
              <em>A Boutique Stay</em>
            </span>
          </h2>
        </div>

        <div className="features-grid">
          {/* Feature 1 */}
          <div className="feature-box">
            <div className="feature-icon"></div>
            <p className="feature-number">01</p>
            <h3 className="feature-name">A Space Designed with Intention</h3>
            <p className="feature-desc">
              Every element — from lighting to layout — is curated to create a
              calm, inviting environment.
            </p>
            <span className="feature-hover-circle"></span>
          </div>

          {/* Feature 2 */}
          <div className="feature-box">
            <div className="feature-icon"></div>
            <p className="feature-number">02</p>
            <h3 className="feature-name">Comfort, Elevated</h3>
            <p className="feature-desc">
              Minimal, modern interiors paired with warmth and functionality for
              restful, effortless living.
            </p>
            <span className="feature-hover-circle"></span>
          </div>

          {/* horizontal line */}
          <div className="feature-line-horizontal"></div>

          {/* Feature 3 */}
          <div className="feature-box">
            <div className="feature-icon"></div>
            <p className="feature-number">03</p>
            <h3 className="feature-name">An Address to Remember</h3>
            <p className="feature-desc">
              Quietly located in Noida, perfectly connected to cafés, metro
              access, and city essentials.
            </p>
            <span className="feature-hover-circle"></span>
          </div>

          {/* Feature 4 */}
          <div className="feature-box">
            <div className="feature-icon"></div>
            <p className="feature-number">04</p>
            <h3 className="feature-name">Intimate. Personal. Refined.</h3>
            <p className="feature-desc">
              A stay created not for crowds — but for those who value simplicity
              and serenity.
            </p>
            <span className="feature-hover-circle"></span>
          </div>
        </div>
      </section>

      {/* ==============================
          BANNER
      =============================== */}
      <section className="escape-section">
        <div className="escape-content">
          <p className="escape-tag">YOUR ESCAPE</p>

          <h2 className="escape-title">
            A Private <em>Retreat</em> of
            <br />
            Calm & Comfort
          </h2>

          <p className="escape-sub">
            Step into a peaceful studio where soft lighting, quiet surroundings,
            and a cozy atmosphere allow you to unwind completely.
          </p>

          <a onClick={(e) => {
          e.preventDefault();
          navigate("/stays");
        }} className="escape-btn">
            BOOK NOW
          </a>
        </div>
      </section>

      {/* ==============================
          SUSTAINABILITY
      =============================== */}

      <section className="mindful-section">
        <p className="mindful-tag">MINDFUL LIVING</p>

        <h2 className="mindful-title">
          Simplicity is
          <br />
          Our <em>Signature</em>
        </h2>

        <p className="mindful-sub">
          We believe in conscious hospitality. Thoughtful energy use, minimal
          waste practices, durable interiors, and long-lasting materials —
          sustainability begins with intention.
        </p>

        <p className="mindful-sub small">
          Small choices. Meaningful impact. A stay designed with care — for you
          and the future.
        </p>

        <div className="mindful-icons">
          <div className="mindful-item">
            <div className="mindful-box">♻️</div>
            <p className="mindful-label">SUSTAINABLE</p>
          </div>

          <div className="mindful-item">
            <div className="mindful-box">⚖️</div>
            <p className="mindful-label">EQUITABLE</p>
          </div>

          <div className="mindful-item">
            <div className="mindful-box">🌱</div>
            <p className="mindful-label">ECO-FRIENDLY</p>
          </div>

          <div className="mindful-item">
            <div className="mindful-box">⭕</div>
            <p className="mindful-label">RESPONSIBLE</p>
          </div>
        </div>
      </section>



      {/* ==============================
          TESTIMONIALS
      =============================== */}
      <section className="testimonials">
        <div className="testimonials-inner reveal">
          <p className="section-tag">Guest Stories</p>

          <span className="quote-mark">"</span>

          <p className="quote-text" id="quoteText">
            A place where spirituality meets serenity and self-discovery — time
            truly stands still at the Roseate Ganges.
          </p>

          <p className="quote-author" id="quoteAuthor">
            — Namrata Murmu · Boutique Stay, Uttar Pradesh
          </p>

          <div className="quote-dots">
            <div className="dot active"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </div>
      </section>
    </>
  );
}
