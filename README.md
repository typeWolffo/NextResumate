Resumate is an AI-powered application tailored for recruiters and HR professionals. It streamlines the hiring process by automatically scanning, extracting, and analyzing data from uploaded CVs. By leveraging artificial intelligence, the app meticulously categorizes each candidate's information into a comprehensive database.

The app features a user-friendly interface where recruiters can preview candidate profiles, complete with their CV data and calculated scores, ensuring an efficient, bias-free recruitment process.

---

### Setup project

1. `cp .env.example .env`
2. `yarn install`

##### Login as admin

To login as admin, add admin email to `NEXT_PUBLIC_ADMIN_EMAILS` environment variable in `.env` file.
You can add multiple emails separated by comma. For example: `example@example.com,example2@example.com`

---

### Database seed

- `yarn db-seed`
