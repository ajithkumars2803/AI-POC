const API_URL = "https://r6keoq81bd.execute-api.us-east-1.amazonaws.com/prod/invocations";

export async function sendPrompt(prompt) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ prompt })
  });

  return await response.json();
}

