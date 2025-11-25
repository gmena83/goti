# Vibe Coding with v0: Lessons Learned

**Author:** Mike Lembo
**Date:** April 29, 2025
**Source:** [LinkedIn Pulse](https://www.linkedin.com/pulse/vibe-coding-v0-lessons-learned-michael-lembo-1wdtf)

---

Last year, I shared my resume chatbot on LinkedIn as a small portfolio project and promptly became a victim of my own success when Claire Vo commented on it (thanks, Claire!). My OpenAI API bill suddenly spiked past $100 in a single day, compared to my usual $5–$10 per month. I learned a lot from that experience and always wanted to incorporate those learnings into a second iteration.

> **Lesson learned:** always set API budgets.

Now, armed with the free annual subscriptions from Lenny's Newsletter and an API budget set, I decided to give Vibe Coding another shot this time building more than just a chat interface and avoiding the limitations of Streamlit by building a portfolio site in Next.js using v0. Here are the key lessons I picked up:

## 1. Vibe Coding Is Addictive

Vibe Coding’s rapid feedback loops mirror the engagement cycles in Nir Eyal’s Hooked: trigger, action, reward, investment. Each working build felt like a reward, pulling me right back in for the next iteration. Am I the only one who thinks this is just fun? If you haven’t tried it yet, prepare for some late-night “coding” sessions.

## 2. Separate Code from Content

LLMs often reformat or modify files in unexpected ways. To safeguard my content, I moved all text and media into standalone Markdown files and isolated presentation logic. My website dynamically loads these `.md` files, so Vibe Coding can edit code without risking the content. It's also easier to maintain this way since I know how to write markdown, and don't know TypeScript.

## 3. Test After Every Iteration

v0’s built-in checkpoints are incredibly useful, but they don’t replace testing. To quote Dale Carnegie, “The sure-thing boat never gets far from shore.” After every change, I ran through quick checks on navigation flows, content rendering, responsive layouts to catch regressions early. When things inevitably broke, knowing I was only one version off saved me a lot of time that would have been spent hunting down the exact version where things went awry.

## 4. Leverage External Editors for Complex Changes

By checkpoint 100 (yes, it took 100+ messages!), v0 started struggling with edits. Instead of abandoning the workflow, I downloaded the file and uploaded it to ChatGPT or opened it in Cursor. I then asked for a step-by-step guide for the desired changes and fed those instructions back into v0. Even when the guide spanned eight steps, v0 ran through them all in a single shot. Good prompting apparently becomes increasingly more important as your project grows.

## 5. Don't Start with a Blank Page

Starting from zero like I did was great to learn about the limitations and pitfalls but if I was to do this again I would start with a Next.js boilerplate to skip the first 30 or so prompts where I'm just building scaffolding.

Happy coding and remember to set those API budgets!

[My Epic Portfolio](https://www.myepicportfolio.com/)
