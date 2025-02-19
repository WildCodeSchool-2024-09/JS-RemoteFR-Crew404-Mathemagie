import { useState } from "react";
import "./contact.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    setSubmitted(true);
  };

  return (
    <div className="contact-container">
      <div className="contact-form">
        <h2 className="contact-title">Contactez-nous</h2>
        {submitted ? (
          <p className="contact-success">
            Merci pour votre message ! Nous vous répondrons bientôt.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="contact-fields">
            <div>
              <label htmlFor="name" className="contact-label">
                Nom
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="contact-input"
              />
            </div>
            <div>
              <label htmlFor="email" className="contact-label">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="contact-input"
              />
            </div>
            <div>
              <label htmlFor="message" className="contact-label">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="contact-textarea"
                rows={4}
              />
            </div>
            <button type="submit" className="contact-button">
              Envoyer
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactForm;
