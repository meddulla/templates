import { useState } from "react";

export function App({ name, count }: { name: string; count: number }) {
  const [n, setN] = useState(count);
  return (
    <main style={{ fontFamily: "system-ui, sans-serif", padding: "1rem" }}>
      <h1>Hello {name}</h1>
      <p>SSR count: <strong>{count}</strong></p>
      <p>Live count: <strong>{n}</strong></p>
      <button onClick={() => setN(n + 1)}>++</button>
      <p><a href="./api/hello">/api/hello</a></p>
    </main>
  );
}
