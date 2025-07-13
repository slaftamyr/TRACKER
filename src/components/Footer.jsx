
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <span>&copy; {new Date().getFullYear()} Year Tracker</span>
    </footer>
  );
}
