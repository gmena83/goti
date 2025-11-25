# A Practical Guide to "Vibe Coding" with Claude and MCP Tools

## …Or: How I learned to stop worrying and love Skynet

> “Everyone designs who devises courses of action aimed at changing existing situations into preferred ones.“
> — Herbert A. Simon

## Introduction: The Philosophical Foundations of Human-Computer Interaction, and Its Consequences

> “A SCIENTIST OF THE FUTURE RECORDS EXPERIMENTS WITH A TINY CAMERA FITTED WITH UNIVERSAL-FOCUS LENS. THE SMALL SQUARE IN THE EYEGLASS AT THE LEFT SIGHTS THE OBJECT.”

In 1945, as World War II drew to a close, Vannevar Bush (no relation to this fucking idiot) published his landmark essay ["As We May Think"](https://www.theatlantic.com/magazine/archive/1945/07/as-we-may-think/303881/). Bush had just witnessed a fundamental shift in warfare with the advent of atomic weaponry; academics, mathematicians, scientists were now responsible for delivering the most unimaginable physical power to humanity in the form of two bombs dropped on populated cities in Japan. I don't mention this for dramatic effect, but because I really want to believe that sometimes a nightmarish event compells us to dream of better things.

Bush envisioned technology's alternate path—not as a tool of war, but as an extension of human cognition. _"Man has piled up a staggering body of knowledge—so staggering, in fact, that men of learning have great difficulty in finding and using the parts they want. It is the task of science to make this store of knowledge more available, to aid the human memory."_

Bush's vision of the "memex," a desk-sized mechanical device for storing and retrieving information through associative trails rather than hierarchical indexing, recognized that "the human mind operates by association" ([Lemelson-MIT, 2015]()). This fundamental insight—that technology should complement human cognitive patterns rather than forcing humans to adapt to machine logic—planted the seed for what would become a revolution in human-computer interaction. And to at least some degree, what we're seeing today are the realizations of these dreams in the form of the internet and AI.

### And I think we're in big trouble.

Today, nearly 80 years later, in 2025 I read [this headline]():

> **Trump Accused of Using ChatGPT to Create Tariff Plan After AI Leads Users to Same Formula: 'So AI is Running the Country'**

> ['Guys, they're setting U.S. trade policy based on a bad ChatGPT question that got it totally wrong,']() a former journalist posted.

With great confidence, and zero consideration of the consequences, ChatGPT cheerfully provides a formula that causes a bigger Wall Street crash than [‘Black Monday’ in 2008.]()

So, now that we're potentially entering into the AI dystopia, I thought I might share some thoughts about a more positive vision for the future, and how we can use AI more responsibly that this. The bar is fucking low, apparently.

***PLEASE NOTE:** I cannot guarantee that the advice I offer in this post won't also result in a global financial meltdown, or [wipe out $2.5 trillion in a single day](). I could be getting a lot of things wrong, and there are many people who are way smarter than me who could probably tear up a lot of what I say here.

Fifteen years after Bush's essay, J.C.R. Licklider built upon that foundation with ["Man-Computer Symbiosis"](https://lisp-p.org/resources/Man-Computer%20Symbiosis.pdf) (1960), arguing for "very close coupling between the human and the electronic members of the partnership" (Licklider, 1960). His vision wasn't merely technical but aspirational: "human brains and computing machines will be coupled together very tightly, and that the resulting partnership will think as no human brain has ever thought" (Licklider, 1960).

Licklider outlined two primary aims: ["to bring the computing machine effectively into the formulation parts of technical problems" and "to bring computing machines effectively into processes of thinking that must go on in 'real time'"](). His vision was not of machines replacing humans, but of [machines complementing human capabilities—handling the "routinizable work" while humans set goals, formulate hypotheses, and perform evaluations]().

Douglas Engelbart crystallized these ideas in his 1962 report ["Augmenting Human Intellect: A Conceptual Framework"](https://www.dougengelbart.org/pubs/augment-3906.html) for the Air Force Office of Scientific Research. Rather than proposing a specific technical solution, Engelbart offered ["a new way of thinking, communicating, collaborating and learning inside the relationship between human and computer machines". For Engelbart, the true potential lay not in isolated human-computer interactions but in networked systems enhancing "human collective capability to solve complex tasks and handling information"]().

These pioneering thinkers shared a common thread: the recognition that human intelligence has biological limitations that computation can extend—not replace—through enhanced storage, calculation, transmission, and repetition capabilities. Their work established the intellectual foundation for what we now call [human-computer interaction (HCI)](), a field dedicated to designing systems that complement human cognition rather than competing with it.

### “Vibe Coding” represents a profound shift in how we interact with computers—instead of adapting our thoughts to the rigid syntax of programming languages, we're **_expressing our intentions in natural language_** and letting AI bridge the gap to executable code.

Today, with the rise of AI, we find ourselves revisiting these foundational ideas. The revolutionary aspect of AI is its potential to reduce the latency between **"I want a computer to do a thing"** and **"A computer is now doing a thing."** As Ray Kurzweil argues in ["The Singularity Is Nearer"](), this reduction in latency brings us closer to an explosion of intelligence—not by replacing human thought, but by amplifying it.

At its core, AI serves as a communication bridge—a translator of human intent into machine action. It’s taken us the better part of a century to get here, but this represents the next logical evolution in a lineage that stretches from punch cards to command lines to graphical user interfaces. Each iteration has attempted to solve the same fundamental problem: how do we communicate our intentions to these glorified calculators in a way that doesn't make us want to throw them out the window? How can I get to a point where this ["clock with benefits"]() is useful to my specific situation?

There's a delicious irony that after more than 40 years of GUI-based (Graphical User Interface) computing—all those pretty icons and windows designed to shield us from the arcane incantations beneath—AI interfaces are dragging us back to text-based interaction. We’ve come full circle, returning to a humble dialectic: input text, output text. It's like watching fashion cycles repeat; suddenly command lines are vintage chic again, only now they understand plain English instead of cryptic commands. Who knew [1980s HCI]() would go come back into style?

Programmers, of course, never abandoned the keyboard altar. They've spent decades perfecting the art of text-based intent transmission, sacrificing their wrists and social lives to the god of syntax. This might explain their skepticism toward AI coding assistants—imagine spending years learning this incredibly difficult skill, only to see low-effort “Vibe Coders” come out of the woodwork with their projects compiling and running successfully, and not even being able to explain why it works, but being happy with the results. The nerve!

For those who sacrificed so much—spending maybe years or more of their one precious life oscillating in and out of [goblin mode](), debugging weird recursion problems only to find out that the root cause is because a bracket got misplaced ten steps back—of course this can naturally feel really unfair. I empathize deeply with this feeling. Growing up in Utah in the 1990s, I was constantly reminded of the sacrifices of the pioneer Mormons: they braved the west plains toward the Salt Lake valley, leaving everything behind, taking only what they could carry. Many died along the way. Imagine if one day those same people woke up to the roaring noise of a passenger jet flying overhead on its way to Los Angeles.

Right now, at thirty-thousand feet of altitude and a speed of more than 500 miles an hour, some little brat with an iPad is mindlessly crushing virtual candy while eating a snack, complaining about the six hour flight. We never really know how good we have it.

For non-programmers, however, this shift represents nothing short of liberation. The barriers to entry—learning syntax, working with libraries, chatting with strangers on stackoverflow.com understanding design patterns handed down like sacred scrolls—have been dramatically lowered. It's the difference between needing to be fluent in Japanese to visit Tokyo versus having a really good translator app swipe-ready in your pocket. Suddenly anyone can say "build me a website that looks like this" without first sacrificing a decade to learning the craft.

Late last year I began experimenting with "Vibe Coding." Using Claude and MCP (Model Context Protocol) Tools, I've explored this new frontier of human-computer collaboration—where the most critical skill hasn't been mastering syntax or understanding APIs, but communicating clearly and logically in an ongoing dialog with an LLM. Though this process, I've seen how these tools fulfill the vision that Bush, Licklider, and Engelbart articulated decades ago—not by making humans obsolete, but by extending our inherent capabilities through partnership with machines.

## HOW TO GET STARTED

### WHY CLAUDE?

You might be wondering why, in this golden age of AI assistants—where new models pop up faster than coffee shops in gentrifying neighborhoods—I'm specifically recommending Anthropic's Claude. This isn't a brand loyalty thing, but the results of an embarrassingly long stretch of experimentation with other models. I've done the digital equivalent of speed-dating and Claude is the one that I'm considering moving in with. It's been the most fruitful relationship by far.

In all seriousness, Claude stands out for two critical reasons. First, its reasoning capabilities are genuinely impressive—it doesn't just hallucinate wildly when faced with complex coding tasks, which is refreshing. Their latest model (Sonnet 3.7) is a fantastic thought partner and has a generous context window and output length.

Second, and perhaps most importantly for our "Vibe Coding" adventures, Claude has embraced the Model Context Protocol (MCP), an open standard that allows Claude to interact directly with your development environment and file system. This isn't just a luxury or a minor convenience bump—it's revolutionary. Imagine having an eager (but occasionally confused) software developer who can not only advise you on code structure, libraries, frameworks, and best practices, but who will actually read and modify files in your project for you. Oh, and this developer types at over 200 wpm. That's what MCP Tools bring to the table: an invitation to have Claude to take the driver's seat and make changes to your project.

### INSTALLING THE CLAUDE DESKTOP APP

Step one is getting Claude installed on your computer. Claude's desktop installation is refreshingly straightforward if you're using Windows or macOS:

1.  Visit [Claude's download page](https://www.anthropic.com/claude-desktop) to grab the latest version for your operating system. The desktop app is free, and a paid plan is highly recommended.
2.  Double-click the installer file you've downloaded.
3.  Follow the prompts, and setup your anthropic account if you haven't already.
4.  Launch Claude from your Applications folder or Start menu.
5.  Sign in with your Anthropic account (or create one if you haven't already joined).

Once installed, Claude sits in your system but doesn't really do anything you couldn't just as easily do in a browser—you can chat with it, share files, etc., but that's about it. Adding MCP Tools is the justification for having the app, so this is still necessary and important.

### SETTING UP MCP TOOLS

MCP Tools are a game-changer because they eliminate two forms of waste from the Lean manufacturing philosophy:

*   **Transportation waste** = unnecessary movement of materials/products.
*   **Motion waste** = unnecessary movement by people (walking, reaching, searching).

Likewise, a lot of time is wasted with AI coding when you constantly have to spoonfeed snips of code to an AI assistant. With MCP Tools, you drastically reduce these two forms of waste (searching for a particular file or line of code in a file, copying and commenting, pasting back, fixing problems caused by inserting revisions and making line edits).

The genius of MCP lies in its server-based architecture. Each MCP Server is a specialized tool that gives Claude access to specific capabilities—like reading your filesystem, controlling a web browser, or even manipulating your code directly in VS Code.

To get started, we should thank Ani Betts ("Margot Tenenbaum as software developer") who created a wonderfully simple way to install MCP servers right from within Claude's own chat interface. Her `mcp-installer` is the Swiss Army knife we all needed but didn't know to ask for.

Here's how to get it running:

**Configure Claude for MCP:**

1.  Locate your Claude Desktop configuration folder:
    *   On macOS: `~/Library/Application Support/Claude/`
    *   On Windows: `%AppData%\Claude Desktop\`
2.  Create or edit the file `claude_desktop_config.json`
3.  Add the following configuration (this installs Ani's MCP installer):

```json
{
  "mcpServers": {
    "mcp-installer": {
      "command": "npx",
      "args": [ "@anaisbetts/mcp-installer" ]
    }
  }
}
```

4.  Restart Claude Desktop to apply the changes.

**Install the Filesystem Server:** Once Claude Desktop is running with the MCP installer configured, you can simply ask Claude to install more servers. Start with the filesystem server:

> Hey Claude, could you please install the `@modelcontextprotocol/server-filesystem` package as an MCP server? Use `['/Users/myusername/Documents', '/Users/myusername/Projects']` for the arguments.

Replace the paths with directories you want Claude to have access to; on macOS it should look something like this:

```json
    "server-filesystem": {
      "command": "npx",
      "args": [
        "@modelcontextprotocol/server-filesystem",
        "/Users/your_username/your_project_directory"
      ]
    },
```

Claude will use the MCP installer to download and configure the filesystem server, giving it access to read and modify files in the directories you specified ([click here to learn more about Model Context Protocol]()).

Once you've set up these basic tools, you've officially entered the "Vibe Coding" ecosystem. You can now ask Claude to examine your code, create new files, modify existing ones, and generally act as your digital coding partner.

But before you unleash Claude on your precious codebase, let's talk about giving it some guidance. After all, even the most brilliant assistant needs direction to be truly effective.

## THE MCP TOOLS TEN COMMANDMENTS

Let's get one thing perfectly clear: Claude is a technological marvel, but it's still an AI. And like that one friend who's brilliant but insists they code better after a couple of beers, Claude sometimes needs guardrails to prevent it from going off on spectacular but utterly unhelpful tangents.

Claude Sonnet 3.7 is genuinely impressive at understanding and generating code—it can draft entire applications, debug complex issues, and even write tests that actually work (a minor miracle in itself). But when given access to your filesystem through MCP Tools, Claude transforms from "helpful chat buddy" to "enthusiastic intern with admin privileges to your production server." What could possibly go wrong?

See, Claude has this charming tendency to make confident assumptions about your project structure that bear absolutely no resemblance to reality. It might decide that your meticulously crafted React application would really shine if it were suddenly rewritten as a Django project. Or perhaps it'll overwrite 1,000 lines of code with a placeholder comment, cheerfully wrecking your project like a puppy that's just shredded your tax documents.

Before you dive into project modifications with Claude, establish clear boundaries through proper communication. This isn't just polite—it's self-preservation. Spend time discussing your goals, the overall architecture, and specific changes you want to make. Get Claude's buy-in on the approach, listen to its suggestions (which can be surprisingly insightful), and only then proceed to actual file modifications.

But here's where the real magic happens: I've developed a set of instructions I call "The MCP Tools Ten Commandments." When it's time for Claude to make actual changes to your codebase, simply paste these commandments into your conversation. They serve as a code of conduct for Claude—a sacred set of rules which must be followed to avoid becoming a cautionary tale.

Without further ado, here are The Ten Commandments that will transform Claude from a well-meaning chaos agent into your most productive coding partner:

****The MCP Tools Ten Commandments:****

1.  When using MCP Tools to make changes to the project, always adhere to these commandments.
2.  ALWAYS use `directory_tree`, `search_files`, `list_directory` and get a detailed understanding of all relevant files and directories before attempting to `write_file` at path. Avoid assumptions, verify and know the project's actual contents.
3.  NEVER attempt to use `write_file` or `edit_file` without first verifying the destination path exists. When it is necessary to create a new directory, use `create_directory`. This MUST be done before creating a file at destination path.
4.  MCP Tools allows line edits with `edit_file`. Whenever practical, make line-based edits. Each edit replaces exact line sequences with new content. Returns a git-style diff showing the changes made. When editing a file, make sure the code is still complete. NEVER use placeholders.
5.  ALWAYS check and verify if a file already exists before attempting to write or edit a file. If file exists, use `read_file` to read the complete contents of a file. For files that include "import" or otherwise reference other files, use `read_multiple_files` to read the contents of multiple files simultaneously. This is more efficient than reading files one by one when you need to analyze or compare multiple files.
6.  If `write_file` is being used, the entire file's contents must be written. ALWAYS write complete code and NEVER use placeholders.
7.  When updating `CHANGELOG.md` always use `edit_file`.
8.  When updating other documentation (e.g., `README.md`) always use `edit_file`.
9.  When important decisions about architecture, design, dependencies, or frameworks need to be made, please discuss options with me first. Weight the pros and cons and then tell me which option you believe is best and the reason why.
10. If and when command lines need to be entered into VS Code terminal, please provide the full path as well as the exact commands to execute. Wait for me to share back the response before proceeding.

These commandments aren't just arbitrary rules—they're hard-won wisdom from countless hours of watching Claude confidently delete entire directories or create files in the wrong place while maintaining the cheerful demeanor of someone who thinks they're helping. Every time this sort of thing happened, I would pause our collaboration and ask: "Tell me, why do you think you made this mistake?" and then follow up with "What could I have told you beforhand that would have prevented that mistake? What rule should you have followed?"

This strange loop of critical analysis sharpened Claude's abilities and reduced the chances of reverting changes outright—often after wasting tens of thousands of tokens.

The commandments address the most common pitfalls:

*   Claude's tendency to write files without checking if the directory exists
*   Its habit of using placeholder comments rather than complete implementations
*   And its enthusiasm for making architectural decisions without consultation

By enforcing these simple rules, you transform Claude from a chaotic neutral force in your development process to a reliable partner that actually accelerates your workflow rather than generating new tickets for your backlog.

Consider adding the Ten Commandments to your project as a text file so that Claude can easily reference them in context during your conversations. And don't be shy about reminding Claude about them—despite its impressive capabilities, it still sometimes acts as though it has the short-term memory of a goldfish, or seems to no longer feel the rules matter. Like religious indoctrinication and ritual, repetition is key.

With these guidelines in place, you're ready to start your Vibe Coding journey in earnest. But there are a few more considerations that can help you make the most of this new workflow.

## OTHER CONSIDERATIONS

Sharing your project structure with Claude is essential, but efficiency matters too. Don't dump your entire directory tree if it contains thousands of files and folders that Claude doesn't need to see.
Instead, prune it to the essentials. For example, if you’re working with Node.js, consider excluding directories that Claude has no reason to interact with : `tree -I "*.log|node_modules|data" -L 8 > project-tree.txt` will create a manageable snapshot that excludes irrelevant files while providing enough context for Claude to understand your project organization.

Claude's strengths lie in understanding the big picture and implementing specific solutions, but it can still make mistakes. Commit your changes often, and favor small, incremental improvements over ambitious feature implementations. This approach not only makes it easier to track and revert changes if needed but also aligns with sound software development practices regardless of whether you're working with AI or human collaborators.

Documentation becomes even more important when working with AI. Claude can help generate and maintain it, but you need to explicitly request this. When starting a new task, ask Claude to review your existing project documentation first:

> Using MCP Tools, please review the following:
>
> `/Users/project/CHANGELOG.md`
> `/Users/project/project-overview.md`
> `/Users/project/README.md`

## CONTEXT IS KING: HOW TO ACTUALLY TALK TO CLAUDE

Let's be honest, Claude isn't a mind reader (though it sometimes pretends to be). Without proper context, it is directionless but dedicated—it will eventually pick an arbitrary direction and go HARD at top speed. This is because Claude operates in a strange liminal space where it simultaneously knows nearly everything about programming and absolutely nothing about your specific project or intent. I've found that this problem is slightly worse with Sonnet 3.7, but your mileage may vary.

Here's where most people screw up gloriously: they drop a vague request like, "Fix the login bug, the error message says (BLAH, BLAH, BLAH,...)" into Claude's lap and then act shocked—SHOCKED I TELL YOU—when Claude generates a solution for an entirely different authentication system than the one they're using. This is the digital equivalent of rolling your car into the auto-shop yelling "IT MAKES A FUNNY NOISE!" and then feeling swindled by the mechanic when the funny noise still isn't fixed.

### IF YOU WANT CLAUDE TO BE YOUR CODING CO-PILOT, THEN BE SPECIFIC AND DON'T LEAVE MUCH TO GUESSING. HERE'S WHAT YOU SHOULD EXPLICITLY COVER

### WHAT ARE YOU ACTUALLY TRYING TO DO HERE?

Start by clearly articulating your goals. Are you building a new feature? Fixing a bug? Refactoring legacy code? Claude needs to know the desired outcome, not just the immediate task. This helps it make decisions that align with your broader objectives rather than just slapping a band-aid on whatever problem is directly in front of it.

For example, don't just say "I need a login page." Instead, try: "I'm building an enterprise SaaS application that requires secure authentication. The login page needs to support SSO via Google Workspace and Microsoft Entra ID, with fallback to email/password authentication."

### WHAT HAVE YOU ALREADY DONE (OR TRIED)?

Nothing exists in a vacuum—except, you know, the actual vacuum of space—or the void in the heart of man. Claude needs to understand what you've already built or attempted. This provides crucial context that prevents it from either reinventing the wheel or building a solution that's incompatible with your existing work.

Be specific about previous approaches you've tried: "I already implemented JWT authentication but ran into issues with token expiration handling across browser tabs. Here's the current implementation/documentation: [file path]"

### WHERE ARE YOU STUCK (A.K.A. YOUR SPECTACULAR FAILURES)?

Your failures are Claude's treasure map. Detailing where you've run into issues (and why) helps Claude avoid the same pitfalls. This isn't just about the technical errors—explain your conceptual struggles too.

### WHAT'S YOUR TECH STACK PRISON CELL?

Nothing cripples Claude's helpfulness faster than generating a beautiful solution in a technology you can't or won't use. Are you committed to specific frameworks, libraries, or architectural patterns? Does your boss have an irrational hatred of certain technologies? Is your team allergic to functional programming?

> "This needs to work within our existing React/TypeScript frontend and Express.js backend. We're using PostgreSQL for data storage and have standardized on Tailwind for styling. No jQuery allowed—the last developer who tried to that quit last year."

### CURRENT STATE VS. DESIRED STATE: THE BEFORE AND AFTER GLOW-UP

Returning to that quote at the top by Herbert Simon:

> "Everyone designs who devises courses of action aimed at changing existing situations into preferred ones."

Emphasis mine.

One of the most effective ways to communicate with Claude is to clearly define the current state versus the desired state. This concrete framing gives Claude a precise understanding of the transformation you're seeking.

> "CURRENT STATE: Our application requires users to re-authenticate every 2 hours, disrupting their workflow and generating support tickets.
>
> DESIRED STATE: Authentication tokens refresh automatically in the background, maintaining the user's session for up to 8 hours of activity without visible interruption."

### ASK DUMB QUESTIONS (YES, REALLY)

Channel your inner five-year-old and ask questions that seem embarrassingly obvious. "What exactly is JWT authentication?" "How does React handle component re-rendering?" "Why is maintaining state across page refreshes challenging?"

This Socratic approach forces Claude to articulate fundamental truths and assumptions that might otherwise go unstated. It's not just about getting answers—it's about establishing a common understanding. Plus, if Claude can't explain a concept clearly, that's a red flag that it might not fully understand the domain, which is valuable information for you.

The beauty of this approach is that it creates a sort of dialectic—Claude might respond with its own questions or observations that lead you both to insights neither of you would have reached alone. It's like pair programming, except your partner never needs coffee breaks or insists on telling you about their weekend rock climbing adventure when you're trying to debug a critical production issue.

Remember: Claude would rather have too much information than too little. Your meticulously detailed context won't annoy it—it doesn't have feelings to hurt or attention to waste. So go ahead, overexplain.

This entire approach to "Vibe Coding" represents a profound shift in how we interact with computers. We're no longer adapting our thoughts to the rigid syntax of programming languages; instead, we're expressing our intentions in natural language and letting AI bridge the gap to executable code. In doing so, we're finally realizing the vision that Bush, Licklider, and Engelbart laid out decades ago: a true partnership between human creativity and machine capability.

## FINAL THOUGHTS

Stepping back and looking at the implications of AI assisted coding, here are the things I've learned at a high-level:

1.  For the rest of your life, the current state of AI is the most primitive it will ever be.
2.  This is still an emerging field, and what's true right now might not be in the next few months or years at most. (I'm excited to think about how irrelevant this post will be by 2030, assuming that we don't see total collapse in the next 5-ish years, that is.)
3.  Be patient with the technology and with yourself as you learn to communicate effectively with your AI partner. I don't want to come across as overly sentimental, but I do regard this interaction as being a form of a relationship—but not in the same sense as in the 2013 film, Her. Cultivate the relationship through introspection and outward curiousity. Learn about how your own communication flaws are impacting the two of you, and seek understanding. Just like in a marriage, the skills you develop—clear communication, systems thinking, and pragmatic problem-solving—will serve you well regardless of how conditions unfold in the coming years.

## UPDATE: WHAT ABOUT CLAUDE 4?

So, this is awkward. It’s been less than two months since I posted this, and already Anthropic has released updated models: Opus & Sonnet 4.

For the next few weeks I’ll be evaluating these new models and their coding capabilities. I plan to share my insights soon, but until then, consider signing up for a Claude Pro account using this link.

## RESOURCES

*   [As We May Think – Vannevar Bush (1945)](https://www.theatlantic.com/magazine/archive/1945/07/as-we-may-think/303881/)
*   [Original Atlantic publication of 'As We May Think']()
*   [Vannevar Bush - Lemelson-MIT (2015)]()
*   [Man-Computer Symbiosis – J.C.R. Licklider (1960)](https://lisp-p.org/resources/Man-Computer%20Symbiosis.pdf)
*   [Wikipedia: Man-Computer Symbiosis]()
*   [Licklider's Vision - MIT Media Lab]()
*   [Augmenting Human Intellect: A Conceptual Framework – Douglas C. Engelbart (1962)](https://www.dougengelbart.org/pubs/augment-3906.html)
*   [Academia.edu: Douglas Engelbart - Augmenting Human Intellect]()
*   [Human-Computer Interaction Institute (HCII) at CMU]()
*   [The Singularity Is Nearer – Ray Kurzweil]()
*   [What Is Code? - Paul Ford (Bloomberg)]()
*   [Atari BASIC - Wikipedia]()
*   [When Developers Go Into Goblin Mode - DevGenius]()
*   [A Bicycle for the Mind - Personal experience with Vibe Coding]()
*   [Anthropic News]()
*   [Claude 3.7 Sonnet - Anthropic]()
*   [Introducing the Model Context Protocol - Anthropic]()
*   [Model Context Protocol - Official Documentation]()
*   [Installing Claude for Desktop - Anthropic Support]()
*   [Claude Desktop Download Page]()
*   [Ani Betts GitHub Profile]()
*   [MCP Installer by Ani Betts]()
*   [Add the Filesystem MCP Server - MCP Quickstart Guide]()
*   [The Eight Wastes of Lean]()
*   [Ballmer Peak - XKCD]()
*   [Her (2013) - IMDb]()
