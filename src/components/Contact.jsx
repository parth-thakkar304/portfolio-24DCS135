import { useState } from 'react';

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [showHelp, setShowHelp] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && email.trim() && message.trim()) {
      setSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <section className="contact-container glass-panel">
      <div className="contact-header">
        <h1>Contact Me</h1>
        <p>Feel free to reach out. I will get back to you as soon as possible.</p>
        
        {/* Help Tooltip Toggle */}
        <button 
          type="button"
          className={`help-toggle-btn ${showHelp ? 'active' : ''}`}
          onClick={() => setShowHelp(!showHelp)}
          title="Toggle help information"
          aria-label="Toggle help"
        >
          ?
        </button>

        {showHelp && (
          <div className="help-tooltip-box">
            <strong> Quick Tip:</strong> Fill out your name, email, and a message below. 
            The form fields are controlled in real-time, and you can see a live preview of your message as you type!
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="contact-name">Name</label>
          <input 
            type="text" 
            id="contact-name" 
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="contact-email">Email Address</label>
          <input 
            type="email" 
            id="contact-email" 
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="contact-message">Message</label>
          <textarea 
            id="contact-message" 
            className="form-control"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            maxLength={500}
            required
          ></textarea>
          
          {/* Live Character Count */}
          <div className="form-meta">
            <span>{message.length} / 500 characters</span>
          </div>
        </div>

        {/* Real-time reflection of user input */}
        <div className="live-mirror-card">
          <h3>Message Live Preview</h3>
          <div className="live-mirror-text">
            {message ? (
              message
            ) : (
              <span className="live-mirror-placeholder">Your message will mirror here in real time...</span>
            )}
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Send Message
        </button>
      </form>

      {/* Success alert notification */}
      {submitted && (
        <div className="success-alert">
          <span>Thank you! Your message has been sent successfully.</span>
        </div>
      )}
    </section>
  );
}

export default Contact;
