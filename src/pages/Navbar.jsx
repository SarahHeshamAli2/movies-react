import { useEffect, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Link, useNavigate } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import useGenresFetcher from './../hooks/useGenre';

function NavbarPage() {
  const fetchGenres = useGenresFetcher();
  const [genres, setGenres] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  const handleGenreClick = (id) => {
    navigate(`/genre/${id}`);
    setExpanded(false);
  };

  const handleDropdownToggle = async (isOpen) => {
    if (isOpen && genres.length === 0) {
      const fetchedGenres = await fetchGenres();
      setGenres(fetchedGenres);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Navbar
      fixed="top"
      expand="lg"
      expanded={expanded}
      onToggle={setExpanded}
      className={`custom-navbar ${scrolled ? 'navbar-scrolled' : ''}`}
      bg="dark"
      variant="dark"
    >
      <Container>
        <Navbar.Brand as={Link} to="/">Movies</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" onClick={() => setExpanded(false)}>
              Home
            </Nav.Link>

            <NavDropdown
              title="Genres"
              id="genres-dropdown"
              onToggle={handleDropdownToggle}
            >
              {genres.length > 0 ? (
                genres.map((genre) => (
                  <NavDropdown.Item
                    key={genre.id}
                    onClick={() => handleGenreClick(genre.id)}
                  >
                    {genre.name}
                  </NavDropdown.Item>
                ))
              ) : (
                <NavDropdown.Item disabled>Loading...</NavDropdown.Item>
              )}
            </NavDropdown>

                        <Nav.Link as={Link} to="favorites" onClick={() => setExpanded(false)}>
             Favorites
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarPage;
