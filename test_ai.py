from google import genai




# The client gets the API key from the environment variable `GEMINI_API_KEY`.
client = genai.Client(os.)

response = client.models.generate_content(
    model="gemini-2.5-flash", contents="Explain Java in short terms"
)
print(response.text)