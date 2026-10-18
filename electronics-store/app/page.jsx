const features = [
  {
    number: "01",
    title: "Quality products",
    description: "Explore electronics selected for everyday use.",
  },
  {
    number: "02",
    title: "Simple shopping",
    description: "Browse products and find the right accessories.",
  },
  {
    number: "03",
    title: "Easy ordering",
    description: "Submit your order with your delivery information.",
  },
];

export default function HomePage() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="/" aria-label="ElectroHub home">
          <span className="brand-icon">E</span>
          ElectroHub
        </a>

        <nav className="navigation" aria-label="Main navigation">
          <a href="/">Home</a>
          <a href="/products">Products</a>
          <a href="/cart">Cart</a>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">YOUR EVERYDAY TECH STORE</p>

          <h1>
            Technology that
            <br />
            <span>fits your life.</span>
          </h1>

          <p className="hero-description">
            Discover electronics and accessories for your
            study, work, and everyday needs.
          </p>

          <a className="primary-button" href="/products">
            Browse products <span aria-hidden="true">→</span>
          </a>

          <p className="hero-note">
            A student-built online store project.
          </p>
        </div>

        <div className="hero-visual" aria-label="Electronics illustration">
          <div className="orbit orbit-one"></div>
          <div className="orbit orbit-two"></div>

          <div className="device-card">
            <div className="device-screen">
              <span className="screen-dot"></span>
              <span className="screen-line"></span>
              <span className="screen-line short"></span>
              <div className="screen-circle"></div>
            </div>
            <div className="device-base"></div>
          </div>

          <div className="floating-label label-top">
            <span className="status-dot"></span>
            Everyday technology
          </div>

          <div className="floating-label label-bottom">
            <span>✦</span> Discover something useful
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="section-heading">
          <p className="eyebrow">THE SHOPPING EXPERIENCE</p>
          <h2>Shopping made simple.</h2>
          <p>
            Everything you need for a straightforward
            shopping journey.
          </p>
        </div>

        <div className="feature-grid">
          {features.map((feature) => (
            <article className="feature-card" key={feature.number}>
              <span className="feature-number">{feature.number}</span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="site-footer">
        <a className="brand footer-brand" href="/">
          <span className="brand-icon">E</span>
          ElectroHub
        </a>
        <p>Built with Next.js, React, and CSS.</p>
      </footer>
    </main>
  );
}
