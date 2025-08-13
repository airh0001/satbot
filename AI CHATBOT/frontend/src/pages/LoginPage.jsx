import { useState } from 'react';

export default function LoginPage({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    const endpoint = isSignup ? 'signup' : 'login';
    const payload = isSignup ? { username, password } : new URLSearchParams({ username, password });
    const headers = { 'Content-Type': isSignup ? 'application/json' : 'application/x-www-form-urlencoded' };

    const res = await fetch(`http://localhost:8001/auth/${endpoint === 'signup' ? 'SignUp' : 'Login'}`, {
      method: 'POST',
      headers,
      body: isSignup ? JSON.stringify(payload) : payload,
    });

    if (res.ok) {
      if (!isSignup) {
        const data = await res.json();
        setToken(data.access_token);
      } else {
        alert('Signup successful, please login');
        setIsSignup(false);
      }
      setError(null);
    } else {
      const err = await res.json();
      setError(err.detail || 'Error');
    }
  };

  return (
    <div className="container" style={{ maxWidth: 400 }}>
      <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          required
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={{ width: '100%', marginBottom: 10, padding: 8 }}
        />
        <input
          required
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ width: '100%', marginBottom: 10, padding: 8 }}
        />
        <button type="submit">{isSignup ? 'Sign Up' : 'Login'}</button>
      </form>
      <button onClick={() => setIsSignup(!isSignup)}>
        {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p style={{ marginTop: 10 }}>(c) 2023 Your Company</p></div>);
}