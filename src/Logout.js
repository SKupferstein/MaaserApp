import "./Logout.css";

function Logout() {
  //logout page
  return (
    <div>
      <h2>You are logged out.</h2>
      <button
        className="btn btn-purple "
        onClick={() => window.location.reload()}
      >
        Sign in to givemaaser
      </button>
    </div>
  );
}
export default Logout;
