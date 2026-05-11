import { useState } from 'react';

type State =
  | { status: 'idle' }
  | { status: 'submitting' }
  | { status: 'success'; alreadySubscribed: boolean }
  | { status: 'error'; message: string };

export function SubscribeForm({ compact = false }: { compact?: boolean }) {
  const [state, setState] = useState<State>({ status: 'idle' });
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState({ status: 'submitting' });
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, firstName }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        alreadySubscribed?: boolean;
        error?: string;
      };
      if (!res.ok || !data.ok) {
        setState({
          status: 'error',
          message: data.error || 'Something went wrong. Try again?',
        });
        return;
      }
      setState({ status: 'success', alreadySubscribed: !!data.alreadySubscribed });
      setEmail('');
      setFirstName('');
    } catch {
      setState({ status: 'error', message: 'Network error. Try again?' });
    }
  }

  if (state.status === 'success') {
    return (
      <div className="subscribe-success">
        <strong>
          {state.alreadySubscribed ? "You're already on the list — thanks." : 'Subscribed.'}
        </strong>
        <p>
          {state.alreadySubscribed
            ? 'Nothing more to do. Next essay will land in your inbox when it ships.'
            : "Check your inbox — you'll get the next essay when it ships."}
        </p>
      </div>
    );
  }

  return (
    <form className={`subscribe-form ${compact ? 'subscribe-form--compact' : ''}`} onSubmit={onSubmit}>
      {!compact && (
        <input
          type="text"
          name="firstName"
          placeholder="First name (optional)"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          autoComplete="given-name"
        />
      )}
      <input
        type="email"
        name="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        autoComplete="email"
      />
      <button type="submit" disabled={state.status === 'submitting'}>
        {state.status === 'submitting' ? 'Subscribing…' : 'Subscribe'}
      </button>
      {state.status === 'error' && <p className="subscribe-error">{state.message}</p>}
    </form>
  );
}
