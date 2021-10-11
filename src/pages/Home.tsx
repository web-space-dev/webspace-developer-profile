import React from "react";
import { Link } from "react-router-dom";

/**
 * Home Component
 *
 */
const Home = () => {
  /**
   * Render JSX
   */

  return (
    <React.Fragment>
      <Link to="/login">Login</Link>
      <Link to="/tasks">Tasks</Link>
    </React.Fragment>
  );
};

export default Home;
