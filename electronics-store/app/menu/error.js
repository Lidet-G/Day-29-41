"use client";

export default function MenuError({ reset }) {
  return (
    <div className="error" role="alert">
      <h2>Something went wrong.</h2>
      <p>The menu could not be loaded. Please try again.</p>
      <button className="button" onClick={() => reset()}>Try again</button>
    </div>
  );
}
