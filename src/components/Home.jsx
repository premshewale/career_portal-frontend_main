import Footer from "./Footer";

export default function Home() {
  return (
    <div>
      <div className="home-card">
        <h1>Welcome to CareerPortal</h1>
        <p>Discover top job opportunities and connect with employers.</p>
        <div>
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </div>
      </div>
      <Footer /> {/* Footer added here */}
    </div>
  );
}
