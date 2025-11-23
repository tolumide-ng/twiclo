import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CreatePost } from './CreatePost';

describe('CreatePost component', () => {
  const setup = (disabled = false) => {
    const onSubmit = jest.fn();
    render(<CreatePost onSubmit={onSubmit} disabled={disabled} />);
    const textarea = screen.getByPlaceholderText("What's happening?");
    const button = screen.getByRole('button', { name: /post/i });
    return { onSubmit, textarea, button };
  };

  it('renders textarea and button', () => {
    const { textarea, button } = setup();
    expect(textarea).toBeInTheDocument();
    expect(button).toHaveTextContent('Post');
    expect(button).toBeDisabled();
  });

  it('enables button when textarea has valid input', async () => {
    const { textarea, button } = setup();
    expect(button).toBeDisabled();
    await userEvent.type(textarea, 'Hello world!');
    expect(button).toBeEnabled();
  });

  it('disables button when textarea is empty or whitespace', async () => {
    const { textarea, button } = setup();
    expect(button).toBeDisabled();
    await userEvent.type(textarea, '   ');
    expect(button).toBeDisabled();
  });

  it('disables button when textarea exceeds max length', async () => {
    const { textarea, button } = setup();
    const longText = 'a'.repeat(281);
    await userEvent.type(textarea, longText);
    expect(button).toBeDisabled();
  });

  it('calls onSubmit with the correct value and clears textarea', async () => {
    const { onSubmit, textarea, button } = setup();
    await userEvent.type(textarea, 'Hello testing!');
    fireEvent.click(button);

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith('Hello testing!');
    expect(textarea).toHaveValue('');
  });

  it('shows correct character count and error class when too long', async () => {
    const { textarea } = setup();
    const longText = 'a'.repeat(281);
    await userEvent.type(textarea, longText);

    const charCount = screen.getByText(/281\/280/);
    expect(charCount).toBeInTheDocument();
  });
});
