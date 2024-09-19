import { useState } from "react";
import { useSignUpMutation } from "../generated/graphql-types";

function Login() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [signUpMutation] = useSignUpMutation();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signUpMutation({
      variables: {
        data: user,
      },
    });
  };

  return (
    <main className="container">
      <h1>Connexion</h1>
      <form onSubmit={handleLogin}>
        <label>
          Email
          <input
            type="text"
            onChange={(e) =>
              setUser((prev) => ({ ...prev, email: e.target.value }))
            }
            value={user.email}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            onChange={(e) =>
              setUser((prev) => ({ ...prev, password: e.target.value }))
            }
            value={user.password}
          />
        </label>
        <button type="submit">Se connecter</button>
      </form>
    </main>
  );
}

export default Login;
