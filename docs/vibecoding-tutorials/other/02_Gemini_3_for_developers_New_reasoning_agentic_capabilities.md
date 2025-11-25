# Gemini 3 for developers: New reasoning, agentic capabilities

Nov 18, 2025

9 min read

Whether you’re an experienced developer or a vibe coder, Gemini 3 can help you bring any idea to life.

Today we are introducing Gemini 3, our most intelligent model that can help bring any idea to life. Built on a foundation of state-of-the-art reasoning, Gemini 3 Pro delivers unparalleled results across every major AI benchmark compared to previous versions. It also surpasses 2.5 Pro at coding, mastering both agentic workflows and complex zero-shot tasks.

Gemini 3 Pro fits right into existing production agent and coding workflows, while also enabling new use cases not previously possible. It’s available in preview at $2/million input tokens and $12/million output tokens for prompts 200k tokens or less through the [Gemini API](https://ai.google.dev/gemini-api) in Google AI Studio and Vertex AI for enterprises (see [pricing](https://ai.google.dev/pricing) for rate limits and full pricing details). Additionally, it can be utilized via your favorite developer tools within the broader ecosystem and is available, with rate limits, free of charge in [Google AI Studio](https://ai.google.dev/studio).

## Agentic coding

Developers are spending more and more time creating software with AI at their side. Building on the momentum of Gemini 2.5 Pro and all the feedback, Gemini 3 Pro serves as a new foundation of intelligence for what’s possible with an agentic coding model.

Gemini 3 Pro scores 54.2% points on Terminal-Bench 2.0, which tests a model’s tool use ability to operate a computer via terminal.

You can feel the power of this model come to life in [Google Antigravity](https://ai.google.dev/antigravity), our new agentic development platform, in addition to [Gemini CLI](https://ai.google.dev/cli), [Android Studio](https://developer.android.com/studio), and other coding products like Cursor, GitHub, JetBrains, Manus, Cline and more.

Cline is using Gemini 3 to power autonomous code generation in developers’ IDEs…. Gemini 3 Pro handles complex, long-horizon tasks across entire codebases, maintaining context through multi-file refactors, debugging sessions, and feature implementations. It uses long context far more effectively than Gemini 2.5 Pro and has solved problems that stumped other leading models.

## Google Antigravity

To advance how the model and IDE work together, we’re introducing [Google Antigravity](https://ai.google.dev/antigravity) to showcase what’s possible with Gemini 3. It’s an agentic development platform that enables developers to operate at a higher, task-oriented level by managing agents across workspaces, while retaining a familiar AI IDE experience at its core.

It’s a faster way to develop: you act as the architect, collaborating with intelligent agents that operate autonomously across the editor, terminal, and browser. These agents plan and execute complex software tasks, communicating their work with the user via detailed artifacts. This elevates all aspects of development, from building features, UI iteration, and fixing bugs to researching and generating reports. Visit the [Google Antigravity website](https://ai.google.dev/antigravity) to download the public preview at no charge, now available for MacOS, Windows and Linux.

See multiple agents building in parallel in this multiplayer digital whiteboard app in Google Antigravity.

### Gemini API

With Gemini 3, we are releasing a client-side bash tool that empowers the model to propose shell commands as part of agentic workflows for tasks such as navigating your local filesystem, driving development processes, and automating system operations. We’re pairing this with a hosted server-side bash tool for multi language code generation and secure prototyping. Available now in the Gemini API for early access partners, with general availability coming soon.

Additionally, Gemini hosted tools [Grounding with Google Search](https://ai.google.dev/docs/grounding-search) and [URL context](https://ai.google.dev/docs/url-context) can now be combined with structured outputs. This is especially powerful for building agentic use cases which involve fetching and extracting data and then outputting them in a specific format for downstream agentic tasks.

## Vibe coding

Gemini 3 Pro unlocks the true potential of “vibe coding”, where natural language is the only syntax you need. By significantly improving complex instruction following and deep tool use, the model can translate a high-level idea into a fully interactive app with a single prompt. It handles the heavy lifting of multi-step planning and coding details delivering richer visuals and deeper interactivity, allowing you to focus on the creative vision.

Gemini 3 Pro tops the WebDev Arena leaderboard by scoring an impressive 1487 Elo.

Gemini 3’s remarkable prompt adherence supercharges Emergent’s fullstack app development platform, especially in UI/frontend workflows. We’re seeing incredible results when incorporating Gemini 3’s multi step tool calling into our agentic code development setup.

## Google AI Studio

Whether it’s building a game with a single prompt, an interactive landing page from unstructured voice notes, or a full on app from a napkin sketch, developers can bring their idea to life with Gemini 3. With this model, we pushed single prompt generation capabilities further than ever, meaning you can go from idea to AI-powered app with a single prompt, like this [retro game](https://ai.google.dev/studio/retro-game-demo) built in Google AI Studio.

A zero-shot game built with Gemini 3 Pro in Google AI Studio.

We’ve built Google AI Studio to be your fastest path from a prompt to an AI-native app. [Build mode](https://ai.google.dev/studio/build-mode) lets you add AI capabilities faster than ever, automatically wiring up the right models and APIs, while features like [annotations](https://ai.google.dev/studio/annotations) enable fast and intuitive iteration. You can start building with [Gemini 3 in Google AI Studio](https://ai.google.dev/studio) today.

## Multimodal understanding

Gemini 3 is the best model in the world for complex multimodal understanding and sets new highs on MMMU-Pro for complex image reasoning and Video MMMU for video understanding. Combining its intelligence and a 1 million-token context window, developers can see significant improvements while building key multimodal use cases. To give you more control over latency and cost, you can now [configure multimodal vision processing](https://ai.google.dev/docs/multimodal-vision-processing) with more granularity in the Gemini API based on the visual fidelity required for your application.

### Visual reasoning

Gemini 3 Pro is best-in-class for document understanding, going beyond simple OCR (Object Character Recognition) to intelligently handle complex document understanding and reasoning.

You can see the model’s vision understanding, reasoning and coding capabilities in our demo app that [brings any idea to life](https://ai.google.dev/studio/bring-idea-to-life) in Google AI Studio.

With just an image, Gemini 3 Pro uses its vision understanding, reasoning and coding capabilities to turn it into an interactive web experience.

### Spatial reasoning

The model’s improved spatial understanding also drives strong performance in embodied reasoning tasks like pointing, trajectory prediction and task progression, unlocking new use cases across autonomous vehicles, XR devices and robotics.

Its spatial reasoning also powers intelligent screen understanding of desktop, mobile and OS screens delivering significant performance improvement for computer use agents. The model also understands the intent of user actions based on mouse movements and screen annotations unlocking novel experiences like this [Visual Computer](https://ai.google.dev/studio/visual-computer-demo) demo app.

Gemini 3 not only comprehends the user’s hand-drawn instructions but also intelligently acts upon them based on its understanding of the screen and its elements.

### Video reasoning

Gemini 3 Pro captures rapid action with high-frame-rate understanding, ensuring developers never miss a critical moment in fast-moving scenes. Beyond speed, long-context recall allows for synthesizing narratives and pinpointing specific details across hours of continuous footage.

Across our video agent reasoning and tool calls, Gemini 3 delivers on three critical fronts for Agent Opus: speed, offering an increase of over 32% in speed over our current implementation; precision, demonstrated by its exceptional ability to follow complex instructions and accurately fulfill structured decoding; and reliability, managing long-context reasoning and invoking granular tools without the common pitfalls of hallucination.

## Build what’s next, today

Gemini 3 Pro is now integrated into many developer products and tools to seamlessly fit into your existing workflows and unlock entirely new ways to code.

*   **Build with the Gemini API:** You can integrate Gemini 3 Pro immediately into your applications via Google AI Studio and Vertex AI for Enterprise. To support the model's deeper reasoning capabilities, we’re introducing a new [thinking level](https://ai.google.dev/docs/thinking-level) and more granular [media resolution](https://ai.google.dev/docs/media-resolution) parameters in the API, along with stricter validation for [thought signatures](https://ai.google.dev/docs/thought-signatures). This update is critical for preserving the model’s thoughts across multi-turn conversations. Check out the [Developer Guide](https://ai.google.dev/docs/developer-guide) for the technical breakdown and our [Prompting Guide](https://ai.google.dev/docs/prompting-guide) to learn how to build with Gemini 3 Pro.
*   **Experience the model’s agentic capabilities:** Whether you are adding AI-native features to an Android app, automating workflows through [Gemini CLI](https://ai.google.dev/cli) or managing a fleet of autonomous agents in [Google Antigravity](https://ai.google.dev/antigravity), Gemini 3 Pro provides the reliability needed for complex, agentic architectures.
*   **Vibe code with Gemini 3 Pro:** [Google AI Studio](https://ai.google.dev/studio) is your fastest path to bring any idea to life. Get started in [Build mode](https://ai.google.dev/studio/build-mode) to generate a fully functional app with a single prompt. And if you need a little inspiration, click “I’m feeling lucky” and let Gemini 3 Pro handle the creative spark and the code implementation simultaneously.

The software landscape is shifting. As AI changes who builds and how they build, we are committed to meeting you where you are — giving you the tools to push the boundaries of what’s possible.

This is just the start of the Gemini 3 era but we can’t wait to see what you build with Gemini 3 Pro!
