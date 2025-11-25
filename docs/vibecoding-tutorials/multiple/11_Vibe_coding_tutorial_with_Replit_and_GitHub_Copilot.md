# Vibe coding tutorial with Replit and GitHub Copilot

**Source URL:** https://www.theserverside.com/tutorial/Vibe-coding-tutorial-with-Replit-and-GitHub-Copilot
**Content Type:** Tutorial
**Platform/Tool:** Multiple (Replit, GitHub Copilot)
**Author:** Bob Reselman, CogArtTech
**Published:** 22 Aug 2025

---

AI technology is a game-changer in software development. Developers now use coding agents to create applications with just a natural prompt to describe the code's desired behavior. This movement, called **vibe coding**, is gaining traction to the point that many believe AI software might replace entry-level software developers in the not-too-distant future.

That's not just handwringing. Facebook and AWS are on an AI hiring spree, and some of that money could well be applied to reduce developer head count.

The real question, which requires a thoughtful, informed approach, is this: How can developers adapt to work effectively and efficiently with **AI-enabled coding** as it proliferates within the enterprise?

This article explores how to use two different coding agents to create application code: **Replit**, which runs as a cloud-based website, and **GitHub Copilot**, which runs on a local machine through the VS Code IDE. I recorded the entire process, from submitting identical prompts to each agent, to the code creation and testing process, and finally to the agent running the software it creates.

First, let's examine the prompt that describes the task each agent had to complete.

## Watch the vibe coding sessions

The following videos are narrated screencasts in which Replit and GitHub Copilot technologies create an application in response to the natural language prompt described below. The Replit video runs around 14 minutes, and the GitHub Copilot video runs around 18 minutes. That's how quickly AI agents can create applications, in a fraction of the time it would take a human developer to do so.

The task I gave to each agent was as follows:

> Create a TypeScript web service that accepts the URL to an image file and then creates a new image with a time and date stamp displayed to the second as a watermark added to the bits at the lower part of the image. The font size of the timestamp should be as large as possible but allow the timestamp to fit within the width of the image. Then make it so the web service returns the new image as a stream. Also, write the unit test that will exercise the web service.

For the GitHub Copilot vibe coding session, I added one other instruction to the prompt: *Use the existing directory, ~/Projects/timestamper as the working directory*. GitHub Copilot runs locally so I can let it use the file system on my machine.

## 3 lessons from vibe coding with Replit and GitHub Copilot

Creating the applications was enlightening, but it was not easygoing.

Both Replit and GitHub Copilot created the applications very quickly. I didn't need to devise the application logic and write the code for it using the IDE, time-consuming tasks that tend to be the bulk of my programming labor. The speed at which the AI agent operated provided a benefit immediately.

However, I found I had to interact with the agents throughout the exercise, and I learned some valuable lessons about the best ways to work with an AI during the coding process.

### Be precise with your AI prompts

The dictum "garbage in, garbage out" dates back to the early days of mainframe programming. It means that if you put bad data in, you're going to get bad results. This is still true today for vibe coding with an AI agent as it was writing Fortran code back in 1965.

An AI agent will only do what you tell it to do. If you put a faulty instruction in your prompt, it will implement that instruction. When I started this exercise, I used the following prompt, which contained a faulty instruction highlighted here in bold:

> Create a TypeScript web service that accepts the URL to an image file and then creates a new image with a time and date stamp displayed to the second as a watermark added to the bits of the image. **Make the font size of the time and date stamp equal to 30% of the height of the submitted image.** Then make it so the web service returns the new image as a stream. Also, write the unit test that will exercise the web service. Use the existing directory, ~/Projects/timestamper as the working directory.

The problem was that I was telling the AI to determine the font size of the submitted image. So, if the image was 500 px wide by 100 px high, the font would be too small for the image. This became apparent as the agent wrote the code. I thought that the agent was at fault, and I kept telling it to make corrections. The truth was that the agent was only doing what I told it to do. The fault was mine.

While natural language prompting can make programming much faster and easier, it can also produce a faulty application if the prompt describes bad logic or behavior that is inappropriate to the application's purpose. The agent will correct errors to get the code running, but do not assume it is smart enough to ensure that the design of the application's features is correct.

AI agents might someday be able to determine strange or illogical application features, but for now, what an agent does best is to make sure that the code it writes works. Ensure that your prompts describing the features to implement make sense.

### Treat the AI agent like a programmer who requires oversight

In his 1950 paper "Computing Machinery and Intelligence," computer scientist Alan Turing asserted the following: *If a machine can behave in a way indistinguishable from a human during conversation, it can be considered intelligent*.

Thinking of an AI agent as an intelligent entity might be difficult for many to accept. Nevertheless, in my time vibe coding with Replit and GitHub Copilot, I came to think of the agents as an entry- to mid-level programmer working alongside me. My attitude was that the agent would get most things correct but make mistakes, and it was up to me to determine if the agent was getting it right.

Throughout the various iterations of my exercise, I stopped to ask the agent if it had performed certain tasks. In one example, during debugging, I inquired: "Did you restart the server?" Surprisingly, sometimes the agent forgot to restart the server when an error persisted.

The agent did a better job of completing the application when I was around to observe, point out problems and ask questions than it would have if left to its own devices (no pun intended). Human developers will be needed in the vibe coding paradigm, but their work and value won't be in slinging code.

## Think creatively about the bigger picture

As these experiments using AI agents demonstrate, AI is very good at coding, including identifying and fixing errors, and it will continue to evolve. This makes it a direct threat to entry-level and maintenance programmers.

The key for a developer to remain professionally viable is to stay one step ahead of the AI. It's not enough to imagine the jobs of the future in terms of today's technical and cultural landscape. You might find that AI has already surpassed the capabilities you imagined, and you'll be left out in the cold.

Instead, envision the technical and cultural landscape five years from now. Consider what software development will look like and then think about how humans will fit into creating software in that environment.

*Bob Reselman is a software developer, system architect and writer. His expertise ranges from software development technologies to techniques and culture.*
