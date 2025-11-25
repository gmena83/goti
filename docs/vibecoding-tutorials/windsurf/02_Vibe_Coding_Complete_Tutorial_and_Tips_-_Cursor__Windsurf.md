# Vibe Coding Complete Tutorial and Tips - Cursor / Windsurf

**Source URL:** https://www.youtube.com/watch?v=v7UcVPO4y3c
**Content Type:** Video
**Platform/Tool:** Windsurf / Cursor

## Video Description and Key Information

The video provides a complete tutorial and tips for "Vibe Coding," a method of using AI-powered code editors like **Windsurf** and **Cursor** to rapidly develop software.

**Timestamps and Topics:**
| Time | Topic |
| :--- | :--- |
| 0:03 | Which Tool to Use |
| 3:19 | Which Coding Language to Use |
| 4:52 | Making a Plan |
| 7:56 | Version Control |
| 10:25 | Git Setup |
| 11:48 | Setting Up Rules |
| 17:14 | Vibe Coding Workflow |
| 22:18 | Chat vs Write Mode |
| 22:41 | Model Selection |
| 22:52 | Front End Templates |
| 22:33 | Getting Better Results |
| 23:51 | Three.js Library |
| 24:17 | Security |
| 27:45 | MCP Servers |

**External Links Mentioned:**
*   **Windsurf:** [https://wind.surf/matthewberman](https://wind.surf/matthewberman)
*   **Newsletter:** [https://forwardfuture.ai](https://forwardfuture.ai)
*   **Gist (Code Example):** [https://gist.github.com/mberman84/98fa7d02a2d4c11071bf2bf63faa4713](https://gist.github.com/mberman84/98fa7d02a2d4c11071bf2bf63faa4713)

---

## Full Video Transcript

Here's everything you need to know about vibe coding. All right, first which tool are you going to use? There are a few different variations of what you can do here. First, I use **Windsurf** and **Cursor**. Most of all, I'm usually using Windsurf as of late. Windsurf is a code editor. It is also a fork of VS Code, the most popular coding editor on the planet. So, if you're already using VS Code, this is a natural extension of what you're already doing.

Another option is to use an extension in VS Code itself. So if you don't want a new IDE completely, you just want to continue using VS Code, you can use something called **Klein**. Another option is to use **Replet**. Replet is a completely online code editor. The cool thing about Replet is you can also deploy your apps really easily since everything is in the cloud anyways.

The easiest way to just get started is to use the **canvas feature** in your favorite hosted AI, such as **Claude** or **Chat GPT**. You can write and execute code without ever leaving your browser, but this is limited to HTML and JavaScript. For more complex projects, dedicated tools like Windsurf or Cursor are recommended as they are more **agentic** and can iterate on the code.

### Windsurf Features

Windsurf is highlighted as a powerful tool for vibe coding with features including:
*   Easy switching between **chat, write, and legacy modes**.
*   Multiple model options (Claude 3.7, Claude 3.5, OpenAI models).
*   New functionality around **tab completion** (tab to jump, tab to import) with context from the codebase, terminal, and what you're writing in Cascade.
*   **Browser preview functionality** that offers a browser window to look at the project as you're building it and give specific feedback by clicking on areas.
*   Ability to paste in URLs to library documentation and API documentation to give the AI extra knowledge.

### Choosing a Coding Language and Stack

The simple rule for choosing a coding language for vibe coding is to select the **most popular** one, as the AI will have been trained on more examples, leading to better code.
*   The most popular language is **JavaScript**.
*   The de facto coding language of AI is **Python**.
*   A recommended stack is **Python for the back end** and **HTML/JavaScript for the front end**.
*   Alternatively, **NodeJS** can be used for the back end with JavaScript.
*   The video references a "GitHut 2.0" graphic to show popular languages (Python, Java, Go, JavaScript, C++, TypeScript).

### Making a Plan (Product Requirements Document - PRD)

A detailed, thorough plan is crucial for success. You can use AI (like Grok) to help you create this plan.
1.  **Prompt the AI** to write a detailed plan spec for the app you want to build (e.g., a SAS app to summarize links).
2.  **Iterate** with the AI, answering its questions to fill out any gaps in the app's requirements.
3.  Ask the AI to write the final plan in the format of a **PRD (Product Requirements Document)** using **Markdown** format.
4.  Save the PRD in your project directory.
5.  Ask the AI to create a **step-by-step to-do list** in Markdown format, and save it as a `to-do.md` file.

### Version Control (Git and GitHub)

While optional, version control is highly recommended to save your project at different points in time and allow for collaboration.
*   Use **Git** as the version control system.
*   Create a new repository on **GitHub**.
*   **Setup Commands:**
    *   `git init`
    *   `git remote add origin <URL>`
    *   `git add .`
    *   `git commit -m "Initial commit"`
    *   `git push -u origin master`

### Vibe Coding Workflow Example (Building a SAS App)

The video walks through a high-level example of building a SAS app to summarize articles:
1.  **Project Structure:** Create `app` folder, `main.py`, `templates` folder, and `index.html`.
2.  **Flask Server Setup:** Import Flask, create the app, and set up a route to render `index.html`.
3.  **Front-end HTML:** Create a basic HTML structure with a form for URL input and a submit button.
4.  **Back-end Logic:** Create a route to handle form submission.
    *   Get URL from form.
    *   Use `requests` to get HTML.
    *   Use `BeautifulSoup` to parse HTML.
    *   Get title and text.
    *   Use **OpenAI API** to summarize the article.
    *   Store the summary in a database.
    *   Redirect to the index page.
5.  **Display Summaries:** Get summaries from the database, pass them to `index.html`, and loop through them for display.
6.  **Search Functionality:** Create a route to handle search queries. Use a library like `whoosh` to search through summaries and display results.
7.  **Deployment:** Deploy the app to a service like Heroku (create app, Procfile, requirements.txt, push).

The video concludes by recommending a course called "AI for Developers" for those interested in learning more about using AI to build software.
