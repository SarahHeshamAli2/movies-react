import { useEffect, useState } from 'react';

function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      className={`back-to-top ${isVisible ? 'show' : ''}`}
      onClick={scrollToTop}
      aria-label="Back to top"
    >
<i className="fa-solid fa-arrow-up"></i>    </button>
  );
}

export default BackToTopButton;
