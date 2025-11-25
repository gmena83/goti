# Tutorial: Getting Started with Google Antigravity

**Source:** [https://medium.com/google-cloud/tutorial-getting-started-with-google-antigravity-b5cc74c103c2](https://medium.com/google-cloud/tutorial-getting-started-with-google-antigravity-b5cc74c103c2)
**Author:** Romin Irani
**Published:** 5 days ago (as of Nov 25, 2025)

---

Welcome to the tutorial on **Antigravity**, Google’s free and experimental Agent first development platform.

There is a [codelab version of this tutorial](https://codelabs.developers.google.com/codelabs/getting-started-with-google-antigravity) too. If you’d like to follow step by step, check it out.

You can think of Antigravity as a new agentic development platform that evolves the traditional IDE into an agent-first experience. Unlike standard coding assistants that just autocomplete lines, Antigravity provides a "Mission Control" for managing autonomous agents that can plan, code, and even browse the web to help you build.

Antigravity is designed as an "agent-first" platform. It presupposes that the AI is not just a tool for writing code but an autonomous actor capable of planning, executing, validating, and iterating on complex engineering tasks with minimal human intervention.

What is your role as a developer in this environment? It moves the developer's role from that of someone filling out code snippets, editing it, etc to that of an "architect" or "manager," orchestrating a workforce of digital agents. Should you want to make changes to your code, you still have the editor view.

## Introduction to Antigravity and this tutorial

The approach that we shall take in this series will be to first install Antigravity, understand its core concepts and key navigation features. Once we cross that stage, we shall take a look at a few use cases that you can try out today.

**Note:** As we discover interesting things that one can do with Antigravity, this tutorial will be updated.

## Key Resources

Here are a few resources that will help provide you a ready reference to currently available official documentation on Antigravity (at the time of this writing: Nov 19, 2025):

*   **Official Site:** [https://antigravity.google/](https://antigravity.google/)
*   **Documentation:** [https://antigravity.google/docs](https://antigravity.google/docs)
*   **Usecases:** [https://antigravity.google/use-cases](https://antigravity.google/use-cases)
*   **Download:** [https://antigravity.google/download](https://antigravity.google/download)
*   **Youtube Channel for Google Antigravity:** [https://www.youtube.com/@googleantigravity](https://www.youtube.com/@googleantigravity)

## Installing Antigravity

We will begin with installing Antigravity. Currently the product is available for preview and you can use your personal Gmail account to get started with it.

1.  Go to the [downloads page](https://antigravity.google/download) and click on the appropriate Operating System version.
2.  Launch the application installer and install the same on your machine.
3.  Launch the Antigravity application.
4.  Click on the **next** button. This brings up the option for you to import from your existing VS Code or Cursor settings.
5.  Choose a theme type (e.g., Dark theme).

### Configuring Agent Behavior

The next screen is important. It demonstrates the flexibility that is available in Antigravity in terms of how you want the Agent to behave.

This configuration involves two specific properties:

#### 1. Terminal execution policy

This is about giving the Agent the ability to execute commands (applications/tools) in your terminal.

| Option | Description |
| :--- | :--- |
| **Off** | Never auto-execute terminal commands (except those in a configurable Allow list). |
| **Auto** | Agent decides whether to auto-execute any given terminal command. In case it needs your permission, it will ask for it. |
| **Turbo** | Always auto-execute terminal commands (except those in a configurable Deny list). |

#### 2. Review policy

As the Agent goes about its task, it creates various artifacts (Task plan, Implementation plan, etc). The review policy determines who decides if it needs to be reviewed.

| Option | Description |
| :--- | :--- |
| **Always Proceed** | Agent never asks for review. |
| **Agent Decides** | Agent will decide when to ask for review. |
| **Request Review** | Agent always asks for review. |

#### Presets

These policies are combined into four main presets:

1.  **Agent-driven development**
2.  **Agent-assisted development** (Recommended, as it allows the Agent to make a decision and come back to the user for approval.)
3.  **Review-driven development**
4.  **Custom configuration**

Pick your choice, or go with the recommended **Agent-assisted development** approach.

### Final Setup Steps

1.  Configure the **Editor** preferences.
2.  Sign in with your personal Gmail account (Antigravity is available in preview mode and free with a personal Gmail account). This will open up the browser for authentication.
3.  Review and accept the terms of use.

This will lead you to the Antigravity application, ready to collaborate.

## The Agent Manager

Antigravity forks the open-source Visual Studio Code (VS Code) foundation but radically alters the user experience to prioritize agent management over text editing. The interface is bifurcated into two distinct primary windows: the **Editor** and the **Agent Manager**.

### The Agent Manager View: Mission Control

This interface acts as a **Mission Control** dashboard. It is designed for high-level orchestration, allowing developers to spawn, monitor, and interact with multiple agents operating asynchronously across different workspaces or tasks.

In this view, the developer acts as an architect, defining high-level objectives, such as:

*   `Refactor the authentication module`
*   `Update the dependency tree`
*   `Generate a test suite for the billing API`

Each request spawns a dedicated agent instance. The UI provides a visualization of these parallel work streams, displaying the status of each agent, the **Artifacts** they have produced (plans, results, diffs), and any pending requests for human approval.

This architecture allows a developer to dispatch multiple agents to work on different tasks simultaneously, effectively multiplying their throughput, unlike linear, synchronous chatbot experiences.

### Workspaces and Planning Modes

*   **Workspace:** Similar to VS Code, a workspace is a local folder you can open to start a project. You can open a local folder by clicking on the button and selecting a folder.
*   **Planning Mode:** You can choose between two modes for the Agent's thought process:
    *   **Planning:** An Agent can plan before executing tasks. Use for deep research, complex tasks, or collaborative work. The Agent organizes its work in task groups, produces Artifacts, and takes other steps to thoroughly research, think through, and plan its work for optimal quality.
    *   **Fast:** An Agent will execute tasks directly. Use for simple tasks that can be completed faster, such as renaming variables, kicking off a few bash commands, or other smaller, localized tasks. This is helpful for when speed is an important factor.

### Agent Manager Navigation

| Element | Description |
| :--- | :--- |
| **Inbox** | Tracks all your conversations. You can click on the Inbox to get a list of all current conversations, their status, artifacts, and any pending approvals. |
| **Start Conversation** | Click to begin a new conversation in the selected workspace. |
| **Workspaces** | Allows you to manage and select different project folders. |
| **Playground** | A scratch area where you can start a conversation and later convert it into a formal workspace if needed. |
| **Editor View** | Allows you to switch to the traditional code editor view. |
| **Browser** | The close integration with the Chrome browser, which is a key differentiator. |

## Setting up the Antigravity Browser

The Antigravity agent uses a browser subagent to handle web interactions. This subagent runs a specialized model to operate on pages within the Antigravity-managed browser.

The subagent has access to tools for clicking, scrolling, typing, reading console logs, and more. It can read open pages through DOM capture, screenshots, or markdown parsing, and can also take videos.

To enable this, you need to install the Antigravity browser extension:

1.  Start a conversation in the **Playground** with a task like `go to antigravity.google`.
2.  The Agent will analyze the task and prompt you to **Setup** the browser agent.
3.  Clicking **Setup** will bring up the browser and display a message to install the extension.
4.  Install the Chrome Extension.
5.  The Agent will then ask for permission to proceed with its task. Grant the permission.

## Inspecting the Artifacts

Artifacts are the foundation for building trust in the Agent's work. They solve the “Trust Gap” by providing proof of the Agent's actions.

Antigravity focuses on producing key artifacts depending on the task, which can include:

*   **Task Lists & Plans:** A structured plan generated before writing code, which the user can review, edit, and approve.
*   **Code Diffs:** Standardized diff views showing exactly what lines will change.
*   **Screenshots:** The agent captures the state of the UI before and after a change.
*   **Browser Recordings:** For dynamic interactions, the agent records a video of its session, allowing the developer to verify the functional requirement is met without running the app themselves.
*   **Test Results:** Structured logs of passing/failing tests generated and executed by the agent.

Developers can interact with these Artifacts using “Google Docs-style comments” to provide feedback and guide the Agent's iteration.

## The Editor

The Editor retains the familiarity of VS Code but is augmented with “Agent Awareness.”

*   **Inline Command:** The editor supports "vibe coding" and inline instruction, where users can highlight code and instruct the agent to “Make this more efficient” or “Add comments explaining this logic.”
*   **Agent Side Panel:** Use the panel on the right side of the editor to work directly with the agent, spinning up new conversations or giving instructions to change your code.

### Toggling between the Editor and Agent mode

Antigravity keeps the Editor and Agent Manager as separate windows. You can switch between them using:

*   The **Open Agent Manager** button (in Editor) or **Open Editor** button (in Agent Manager).
*   The keyboard shortcut: `Cmd + E`.

## Use Cases

### 1. News Highlights (Web Automation)

This use case demonstrates using the browser subagent to visit external sites, extract information, and return data.

**Instruction:** (In Playground) `go to google news and get me the top 5 headlines`

The Agent will:
1.  Analyze the task.
2.  Use the browser subagent to navigate to Google News.
3.  Extract the top 5 headlines.
4.  Generate Artifacts, including a video recording of the browser interaction.

### 2. Generate a Dynamic Website with Python + Flask (Full Stack Development)

This use case demonstrates generating a complete web application.

**Prompt:**

> I would like to generate a website that is a 1-day technical conference informational site.
> The website should have the following functionality:
> 1. A home page that shows the current date, location, schedule and time table.
> 2. The 1-day event is a list of 8 talks in total.
> 3. Each talk has 1 or 2 max. speakers.
> 4. A talk has a ID, Title, Speakers, Category (1 or 2), Description and time of the talk.
> 5. Each speaker has a First Name, Last Name and LinkedIn url.
> 6. Allow for users to search by category, speaker, title.
> 7. Give a lunch break of 60 minutes.
> 8. Use dummy data for events and speakers, come up with a schedule, the event is about Google Cloud Technologies.
> 9. Tech Stack: Python and Flask framework on server side. Front-end is basic HTML, CSS and JavaScript.
> 10. Test out the site on your own for all functionality and provide a detailed README on how to setup, run and make any further changes.
> 11. Launch the web application for me to review.

The Agent will proceed by creating and executing:
*   **Task Artifact**
*   **Implementation Artifact**
*   **Walkthrough Artifact** (which includes starting the server and providing the URL for review).

The developer can then switch to the **Editor** to see the generated files and use the Agent panel to issue follow-up instructions, such as `Add two more talks to the schedule`.

### 3. Generate a Simple Productivity App (Front-end Development)

This use case focuses on generating a simple web application with a focus on design.

**Prompt:** (In Playground) `Create a productivity app that features a Pomodoro timer. Give a calm and aesthetic look to the application.`

The Agent will:
1.  Create the Task and Implementation plans.
2.  Generate the application.
3.  Launch the Antigravity browser to perform its own testing and verification, generating a Media Artifact (video) of the verification.
4.  The Agent can also handle follow-up instructions like `Add an image to the application that displays a timer.`, which results in the Agent generating the image and integrating it into the app.

### 4. Generate Unit Tests, Mock Stubs and Validate Tests (Code Testing)

This use case demonstrates the Agent's ability to handle code analysis and testing.

**Scenario:** A Python file containing an `Order` class with business logic (inventory check, payment processing, discount application) is loaded into a Workspace.

**Prompt:** `generate unit tests for this module and test it out with mock implementations.`

The Agent will:
1.  Generate a **Task artifact** for the testing process.
2.  Generate a test file with mock implementations for external services (`InventoryService`, `PaymentGateway`).
3.  Execute the tests and display the results, including details of the tests that were run.

## Conclusion

Antigravity is an Agent-first development platform that allows developers to orchestrate autonomous agents for complex engineering tasks. By separating the **Agent Manager** (Mission Control) from the **Editor** (traditional code editing) and providing robust **Artifacts** for transparency and collaboration, it shifts the developer's role to that of an architect, multiplying their throughput and enabling a new paradigm of agent-assisted development.
