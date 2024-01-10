import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implement your login logic here
    console.log('Logging in with:', { username, password });
    // You can make API calls, check credentials, etc.
  };

  return (
    <Container component="main" maxWidth="xs" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '8px' }}>
      <Typography component="h1" variant="h5">
        Login
      </Typography>
      <form style={{ width: '100%', maxWidth: '300px', marginTop: '8px' }} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="button"
          fullWidth
          variant="contained"
          color="primary"
          style={{ marginTop: '16px' }}
          onClick={handleLogin}
        >
          Login
        </Button>
      </form>
    </Container>
  );
};

export default Login;
