export default function Footer() {
  return (
    <footer className="bg-neutral p-10 text-neutral-content">
      <div className="footer m-auto max-w-7xl">
        <div>
          <span className="footer-title">Services</span>
          <a className="link-hover link transition-all duration-300">
            Branding
          </a>
          <a className="link-hover link transition-all duration-300">Design</a>
          <a className="link-hover link transition-all duration-300">
            Marketing
          </a>
          <a className="link-hover link transition-all duration-300">
            Advertisement
          </a>
        </div>
        <div>
          <span className="footer-title">Company</span>
          <a className="link-hover link transition-all duration-300">
            About us
          </a>
          <a className="link-hover link transition-all duration-300">Contact</a>
          <a className="link-hover link transition-all duration-300">Jobs</a>
          <a className="link-hover link transition-all duration-300">
            Press kit
          </a>
        </div>
        <div>
          <span className="footer-title">Legal</span>
          <a className="link-hover link transition-all duration-300">
            Terms of use
          </a>
          <a className="link-hover link transition-all duration-300">
            Privacy policy
          </a>
          <a className="link-hover link transition-all duration-300">
            Cookie policy
          </a>
        </div>
      </div>
    </footer>
  );
}
