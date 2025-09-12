
import { expect, it, vi, describe, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { toast } from 'react-toastify';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';

describe('Login Component', () => {
  const fnLogin = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
  });

  it('renders login form with default values', () => {
    expect(screen.getByPlaceholderText('Username')).toBeDefined();
    expect(screen.getByPlaceholderText('Password')).toBeDefined();
    expect(screen.getByRole('button', { name: /login/i })).toBeDefined();
  });

  it('shows error toast on failed login', async () => {
    fnLogin.mockResolvedValue({
      data: { status: 'error', message: 'Invalid credentials' },
    });
    vi.spyOn(toast, 'error');

    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(usernameInput, { target: { value: 'superadmin' } });
    fireEvent.change(passwordInput, { target: { value: 'superpass' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(fnLogin).toHaveBeenCalledWith({
        username: 'superadmin',
        password: 'superpass',
      });
      expect(toast.error).toHaveBeenCalledWith('Invalid credentials');
    });
  });

  it('does not show error toast on successful login', async () => {
    fnLogin.mockResolvedValue({
      data: { status: 'success', token: 'abc123' },
    });
    vi.spyOn(toast, 'error');

    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(usernameInput, { target: { value: 'superadmin' } });
    fireEvent.change(passwordInput, { target: { value: 'superpass' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(fnLogin).toHaveBeenCalledWith({
        username: 'superadmin',
        password: 'superpass',
      });
      expect(toast.error).not.toHaveBeenCalled();
    });
  });

  it('shows validation error if username is empty', async () => {
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(passwordInput, { target: { value: 'superpass' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/username is required/i)).toBeDefined();
    });
  });

  it('shows validation error if password is empty', async () => {
    const usernameInput = screen.getByPlaceholderText('Username');
    const submitButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(usernameInput, { target: { value: 'superadmin' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/password is required/i)).toBeDefined();
    });
  });
});