// /pages/auth/signin.tsx

import { getProviders, signIn } from 'next-auth/react';

export default function SignIn({ providers }: any) {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Sign In to Thriveomate</h1>
      <p>Enter your email to receive a secure login link.</p>

      {providers &&
        Object.values(providers).map((provider: any) =>
          provider.id === 'email' ? (
            <div key={provider.name}>
              <form method="post" action="/api/auth/signin/email">
                <input name="csrfToken" type="hidden" value="" />
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  style={{ padding: '8px', width: '300px' }}
                />
                <button type="submit" style={{ marginLeft: '1rem', padding: '8px 16px' }}>
                  Sign in with Email
                </button>
              </form>
            </div>
          ) : null
        )}
    </div>
  );
}

SignIn.getInitialProps = async () => {
  const providers = await getProviders();
  return { providers };
};
