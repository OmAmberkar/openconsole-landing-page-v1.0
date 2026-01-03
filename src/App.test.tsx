import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the main application without crashing', () => {
    render(<App />);

    // 1. Check for "Unified Cloud" (Handles multiple instances in Hero & CTA)
    const cloudElements = screen.getAllByText(/Unified Cloud/i);
    expect(cloudElements.length).toBeGreaterThan(0);

    // 2. Check for "Console" (Handles instances in Title, Description, Footer, etc.)
    const consoleElements = screen.getAllByText(/Console/i);
    expect(consoleElements.length).toBeGreaterThan(0);

    // 3. (Optional) Check for a specific unique element, like the "Get Started" button
    const ctaButtons = screen.getAllByText(/Get Started/i);
    expect(ctaButtons.length).toBeGreaterThan(0);
  });
});
