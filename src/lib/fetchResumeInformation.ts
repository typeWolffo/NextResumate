import { env } from "@/env.mjs";
import { type TResumeAiResponse } from "@/schema/resumeAiResponse";

type ApiResponse = {
  choices: {
    text: string;
  }[];
};

async function fetchResumeInformation(resume: string) {
  const prompt = `Given the following resume details, extract and format the necessary information into JSON format as per the specified pattern below. Ensure to return a well-formed JSON string:

${resume}

Required JSON pattern:
{
  name: 'First Name',
  surname: 'Surname',
  age: 'Age' but keep in mind actual year is ${new Date().getFullYear()} - it must be string,
  bio: 'Bio',
  skills: [
    'Skill 1',
    'Skill 2',
    'Skill 3',
    // ... other skills
  ],
  english_level: 'Basic or Intermediate or Advanced or Fluent',
  github_url: 'https://github.com/username',
  website_url: 'https://website.com' or something similar if personal website is not present (eg, linkedin, facebook) keep key as it is,
  city: 'City Name',
  university: 'University Name',
  university_degree: 'Degree Name (Specialization)',
  university_start: 'Start Date in iso format',
  university_end: 'End Date in iso format'
  interests: [
      'Interest 1',
      'Interest 2',
      'Interest 3',
      // ... other interests
    ],
}
Do not include any other information that is not specified in the pattern.
There should be nothing but pure json in the response.
If any information is not present in the resume, mark the value of the key as "N/A". Ensure the final output is a valid JSON string.
`;

  const data = {
    model: "gpt-3.5-turbo-instruct-0914",
    prompt,
    max_tokens: 2048,
  };

  try {
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.OPEN_AI_API_KEY}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = new Error(
        `Network response was not ok ${response.statusText}`
      );
      console.error(error);
    }

    const responseJson = (await response.json()) as ApiResponse;

    if (responseJson.choices && responseJson.choices.length > 0) {
      const [choice] = responseJson.choices;
      if (choice) {
        const { text } = choice;
        return JSON.parse(text) as TResumeAiResponse;
      } else {
        console.error("Choices array is empty");
      }
    } else {
      console.error("Choices is undefined or empty");
    }
  } catch (error) {
    console.error(error);
  }
  return;
}

export default fetchResumeInformation;
