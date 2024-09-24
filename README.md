
![3](https://github.com/user-attachments/assets/4b256d12-6130-48a9-bcc4-4378c1a528ec)

## Travelify AI Trip Planner
Your personalized itinerary planner powered by AI.

## How to run?
1. Create a new database at database.new (for DIRECT_URL and DATABASE_URL env variables)
2. Generate your API key from resend.com (for SMTP_PASSWORD env variable)
3. You can also generate your GitHub OAuth Client and Secret from Developer settings in your GitHub account.
4. Then use the above values and create a .env file (sample given below) in root of the folder.

```bash
GITHUB_CLIENT_ID=yourgithubclientid
GITHUB_CLIENT_SECRET=yourgithubclientsecret
SMTP_USER=resend
SMTP_PASSWORD=yourresendapikey
SMTP_HOST=smtp.resend.com
SMTP_PORT=465
EMAIL_FROM=youremailhandle@yourverifieddomain.xyz
DIRECT_URL='postgresql://postgres.[projectid]:[password]@aws-0-[aws-region].pooler.supabase.com:5432/postgres'
DATABASE_URL='postgresql://postgres.[projectid]:[password]@aws-0-[aws-region].pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=3&pool_timeout=30'
GOOGLE_GEMINI_API_KEY=yourgooglegeminiapikey
```

5. then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Email me at: jannatkhandev@gmail.com for any questions.
