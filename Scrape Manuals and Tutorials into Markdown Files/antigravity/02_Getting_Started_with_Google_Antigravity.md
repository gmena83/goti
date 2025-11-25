# Getting Started with Google Antigravity

## About this codelab

_subject_Last updated Nov 20, 2025

_account\_circle_Written by Romin Irani

## 1. Introduction

In this codelab, you will learn about [Google Antigravity](https://codelabs.developers.google.com/getting-started-google-antigravity#0) (referred to Antigravity for the rest of the document), an agentic development platform, evolving the IDE into the agent-first era.

Unlike standard coding assistants that just autocomplete lines, Antigravity provides a "Mission Control" for managing autonomous agents that can plan, code, and even browse the web to help you build.

Antigravity is designed as an "agent-first" platform. It presupposes that the AI is not just a tool for writing code but an autonomous actor capable of planning, executing, validating, and iterating on complex engineering tasks with minimal human intervention.

**What you'll learn**

1.  Installing and configuring Antigravity
2.  Exploring key concepts of Antigravity like Agent Manager, Editor, Browser and more
3.  Exploring a few use cases with Antigravity

### **What you'll need**

Currently Antigravity is available as a preview for personal Gmail accounts. It comes with a free quota to use premier models.

Antigravity needs to be locally installed on your system. The product is available on Mac, Windows and specific Linux distributions. In addition to your own machine, you would need the following:

*   Chrome web browser
*   A Gmail account (Personal Gmail account).

This codelab, designed for users and developers of all levels (including beginners).

---
## 2. Installation

We will begin with installing Antigravity. Currently the product is available for preview and you can use your personal Gmail account to get started with it.

Go to the [downloads](https://codelabs.developers.google.com/getting-started-google-antigravity#1) page and click on the appropriate Operating System version that is applicable to your case. Launch the application installer and install the same on your machine. Once you have completed the installation, launch the Antigravity application. You should see a screen similar to the following:

[Image: Welcome to Antigravity setup screen]

Please proceed with clicking on **Next** each time. Key steps are detailed below:

*   **Choose setup flow**: This brings up the option for you to import from your existing VS Code or Cursor settings. We will go with a fresh start.
*   **Choose an Editor theme type**: We will go with the Dark theme but it's entirely up to you, depending on your preference.
*   **How do you want to use Antigravity agent**:

[Image: How do you want to use the Antigravity Agent? screen]

*   **Agent-assisted development**: This is the recommended option for beginners. The agent will assist you with code completion, debugging, and other tasks.
*   **Agent-driven development**: The agent will take full control of the development process, from planning to execution. This is for advanced users.

*   **Terminal execution policy**:

[Image: Terminal execution policy screen]

*   **Auto**: The agent will automatically execute commands in the terminal.
*   **Manual**: The agent will ask for your permission before executing any command.

*   **Choose your preferred LLM**:

[Image: Choose your preferred LLM screen]

*   **Premier models**: These are the latest and most powerful models, but they consume more quota.
*   **Standard models**: These are good for everyday tasks and consume less quota.

Once you have completed the setup, you should see the Antigravity home screen.

---
## 3. The Agent Manager

Antigravity forks the open-source Visual Studio Code (VS Code) foundation but radically alters the user experience to prioritize agent management over text editing. The interface is bifurcated into two distinct primary windows: the **Editor** and the **Agent Manager**. This separation of concerns mirrors the distinction between individual contribution and engineering management.

### The Agent Manager: Mission Control

Upon launching Antigravity, the user is typically greeted not by a file tree, but by the Agent Manager, as shown below:

[Image: Welcome to the Agent Manager screen, showing Agent Manager and Editor Window]

This interface acts as a **Mission Control** dashboard. It is designed for high-level orchestration, allowing developers to spawn, monitor, and interact with multiple agents operating asynchronously across different workspaces or tasks.

In this view, the developer acts as an architect. They define high-level objectives, examples could be:

*   Refactor the authentication module
*   Implement a new feature for the shopping cart
*   Fix all security vulnerabilities in the codebase

The Agent Manager is where you:

*   **Start conversations** with agents (the Inbox)
*   **Monitor the progress** of multiple agents
*   **Review and validate** the work done by agents
*   **Manage workspaces** and switch between projects

---
## 4. Setting up the Antigravity Browser

As per the [documentation](https://codelabs.developers.google.com/getting-started-google-antigravity#3), when the agent wants to interact with the browser, it invokes a browser subagent to handle the task at hand. The browser subagent runs a model specialized to operate on the pages that are open within the Antigravity-managed browser, which is different from the model you selected for the main agent.

This subagent has access to a variety of tools that are necessary to control your browser, including clicking, scrolling, typing, reading console logs, and more. It can also read your open pages through DOM capture, screenshots, or markdown parsing, as well as taking videos.

This means that we need to launch and install the Antigravity browser extension. Let's do that by actually starting a conversation in the Playground and going through the steps.

Select **Playground** and give the following task `go to antigravity.google` to the Agent as shown below:

[Image: Start new conversation in Playground with task 'go to antigravity.google']

**Submit the task**. You will see the Agent analyzing the task and you can inspect the thought process. At some point, it will correctly proceed and mention that it needs to set up the browser agent as shown below. Click on **Setup**.

[Image: Playground with task 'go to antigravity.google' and 'Setup' button for browser agent]

---
## 5. Revisit the Inbox

If you have started a few conversations with the Agents, you should now take a look at your **Inbox** in the Agent Manager window. This will show you all the conversations. Click on any of the conversations to see the history of that conversation, the artifacts produced and more. In our case, after we ran the first conversation, our Inbox shows the conversation listed, as shown below:

[Image: Agent Manager Inbox with a conversation listed]

Clicking on that conversation will provide you the details:

[Image: Detailed conversation view in Agent Manager, showing thought process and artifacts]

You can continue the conversation from here too.

---
## 6. The Editor

The Editor retains the familiarity of VS Code, ensuring that the muscle memory of seasoned developers is respected. It includes the standard file explorer, syntax highlighting, and extensions ecosystem.

You can click on the **Open Editor** button right on the top right in Agent Manager to go to the Editor.

[Image: Antigravity Editor screen]

The Editor is augmented with **"Agent Awareness"**.

*   **Inline Command**: The editor supports vibe coding and inline instruction, where users can highlight code and instruct the agent to **"Make this more efficient"** or **"Add comments explaining this logic"**.
*   **Agent Side Panel**: Use the panel on the right side of the editor to work directly with the agent. You can spin up new conversations from here or give instructions to change your code.

As we go through some use cases that have got to do with web development, where the Agent creates multiple code files, we can then take a look at the Editor to see the files, make changes and interact directly with the Agent from here.

---
## 7. Toggling between the Editor and Agent Manager

Keep in mind that Antigravity is opinionated in the fact that both Editor and Agent Manager are separate windows and there is a clear need for both. You have the option of switching from one to the other, either via the **Open Agent Manager** button on the top right when you are in Editor or by clicking on the **Open Editor** button on the top right when you are in the Agent Manager.

Alternately, you also have the following keyboard shortcut to toggle between the two modes: **Cmd + E**

---
## 8. Use Cases

Now that we have a basic understanding of the product, let's dive into a few use cases to see it in action. Note that Antigravity is an Agent first platform. This means that in most cases, we are simply given an instruction to the Agent and the Agent then goes off on its own, does its task, asks permissions if needed, produces the artifacts and then notifies us if the task is done. As a result of that, we cannot produce every single output of the Agent conversation in each of the following use cases. We will share the instructions and a few necessary screenshots of the expected results but your results might differ a bit.

The use cases that we will cover range from automating a few tasks with external sites, to generating and verifying unit test cases for a project, to a full web site development. Let's go.

### News Highlights

This is a simple use case but it can be the basis via which you can use the web browser to visit web sites, extract information, do some actions and then return data to the user.

In this case, we are going to visit the Google News site and extract some information from there. But you can easily experiment with a site of your choice and see how it goes.

Ensure that you are in the **Agent Manager** and have selected the **Playground**, as shown below:

[Image: Agent Manager Playground selected]

Then give the following instruction:

[Image: Instruction 'Go to Google News and summarize the top 3 headlines' in Playground]

The Agent will then proceed to do the task and return the results in the Inbox.

### Unit Test Generation

This is a more advanced use case where the Agent will generate unit tests for a given piece of code.

Assume you have a file named `calculator.py` with the following content:

```python
def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

def multiply(a, b):
    return a * b

def divide(a, b):
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b
```

Give the following instruction to the Agent:

[Image: Instruction 'Generate unit tests for calculator.py' in Playground]

The Agent will create a new file named `test_calculator.py` with the unit tests and notify you in the Inbox.

### Full Stack Web Development

This is the most complex use case where the Agent will create a full stack web application.

Give the following instruction to the Agent:

[Image: Instruction 'Create a simple to-do list web application using React and Flask' in Playground]

The Agent will create the necessary files, set up the project structure, and provide instructions on how to run the application.

---
## 9. Congratulations

Congratulations, you've successfully installed and understood how to use Antigravity, the Agent-first development platform. The different use cases that we tried should help you take your own requirements and explore how Antigravity can collaborate with you to complete them.

### Reference docs

*   Official Site: [https://antigravity.google/](https://antigravity.google/)
*   Documentation: [https://antigravity.google/docs](https://antigravity.google/docs)
*   Usecases: [https://antigravity.google/use-cases](https://antigravity.google/use-cases)
*   Download: [https://antigravity.google/download](https://antigravity.google/download)
*   Youtube Channel for Google Antigravity: [https://www.youtube.com/@googleantigravity](https://www.youtube.com/@googleantigravity)

---
