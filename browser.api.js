(async () => {
  const rawResponse = await fetch("http://localhost:8080/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username: "username-1", password: "password-1" })
  });
  const content = rawResponse.json();

  console.log(content);
})();
