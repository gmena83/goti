# Vibe Coding Caution and Tips with Replit, Lovable and Bolt

**Author:** Mark Krynsky
**Date:** March 26, 2025
**Source:** [KRYNSKY.COM](https://krynsky.com/vibe-coding-caution-and-tips-with-replit-lovable-and-bolt/)

The term **Vibe Coding** was recently coined by Andrej Karpathy. The notion behind it is that non-coders can use natural language to describe applications that an AI service can code.

## Summary

*   Vibe coding can be magical when it works.
*   All services will vary based on use case. Experiment by trying them all.
*   Understand API functionality and limits before using them in your app.
*   Learn about different stacks and libraries used for your app.
*   You can take learnings from one service to another.
*   Debugging can be frustrating. Fixes can require many iterations and often fail.

Over the last few months, I’ve seen several people share experiences creating apps using AI. I’ve known of these services for a while and have been waiting for ones geared towards novices before diving in myself. I was skeptical of how easy it would be to create something so quickly and easily. I was hoping to find a roundup of services available and came across a few roundups from John Rush who tests all the AI coding services. Here’s one he created of [19 services specific for non-coders]().

I read through the [comments of a previous roundup of 24 tools]() where he stated that the top ones for him were **Bolt**, **Replit**, **Cursor**, and **Lovable**. He then narrowed those down to Bolt and Lovable being the best for non-coders. After reading that I started testing with **Bolt**, **Replit**, and **Lovable** as well as trying [Bolt locally for free using Pinokio](). Here’s what I’ve found so far after a few days of testing.

Depending on what you want to build it’s not as easy as it looks. I think even as a non-coder you still have to have some technical knowledge of development and dependencies. Ben has provided [a primer]() for folks to familiarize themselves with that. I found that each service behaved differently depending on the types of apps I threw at them.

### First App Attempt: X.com Profile List Analyzer

My first attempt was to create an app for [X]() I’ve wanted to create for a long time. Here was the prompt:

> Create an app that allows you to provide a link to an x.com profile page and then identify all the lists the user has been added to. Then analyze the words used for the lists names and create a word cloud with words appearing larger depending on how often they are used.

I decided to try each service blindly without watching any tutorials to see how intuitive their process would be. I threw the prompt at Replit, Bolt, and Lovable. Watching Replit create a working prototype simply based on the prompt as quickly as it did was magical for me. I ran into issues with Bolt before even creating the environment and Lovable got pretty far but wasn’t quite as good so I decided to continue building the Replit version. After my initial amazement I kept running into errors and that’s when the magic faded.

So this app required the use of the X.com API. I created an account along with the API key as instructed and provided it, but kept getting API errors. The response errors led me to believe it was an authentication problem so I tried to re-paste the credentials a few times but the error persisted. Eventually I told Replit to try and do a test with the API outside of the app and it was then that I saw an error that prompted me to learn about the limitations of access to the free version of the API which was the reason [my app wasn’t working](). I wasted quite a bit of time during this debugging process which to be fair was my own fault but the AI didn’t communicate the issue clearly to me.

So I went to [Grok]() to see if I could find an alternative way to create this app without using the X.com API. It recommended a service called Apify with a [custom script](). I then went through the same process of creating a free API with that service and connected my app on Replit with it but alas ran into similar issues. Turns out the free version of their API combined with the script wouldn’t work. At this point I was a bit frustrated and ended up just trying to create a proof of concept manually for [my personal profile using Grok]() which I was able to do. I decided I needed to find a way to create the app without an API and perhaps use a web scraper, so I put this app on the shelf for now. The lesson learned was to really understand and test an API you plan on using is crucial before starting a project.

I felt a bit defeated after my initial foray into vibe coding. I felt the hype around using AI to create apps may have been overblown a bit. I did see some pretty amazing potential regardless of my first outcome. I wasn’t ready to give up. I had another idea for an app and this time I made sure I could build it without the complications of an external API.

### Second App Attempt: "It’s 5 O’Clock Somewhere"

It was time to move on to my next app with the following prompt:

> Create an app that is called “It’s 5 O’Clock Somewhere” that has a button labeled “Have a drink” when pressed it will take your local time and then find a random location in the world where it’s between 5:00 – 5:59pm and then display the location on a map and then show a photo of people from that location having a drink. It will also show what the local term is for toasting or saying cheers.

I did the same thing with this prompt and threw it in Replit, Lovable, and Bolt. Replit again did a pretty good job to get up and running but struggled with displaying a map and created a pretty basic design. I spent some time trying to fix the map issue. Each time Replit confidently telling me they fixed the issue when in fact it had not. So eventually I gave up. Bolt created a very similar version of the app as Replit. It was a little more basic and didn’t include all the elements described in the prompt. It also failed with the map display and location.

Then I moved on to create the same app with Lovable and it once again amazed me at how AI can create an app. So I want to take a minute to explain that each of these services will take the prompt and determine their own solution. In this case there was a map and location aspect and each had their own approach. Replit used SVG paths to draw a simplified world map outline and placing a beer icon marker at specific coordinates and Bolt used a flat world map positioning a pushpin using co-ordinates. Both of these methods didn’t work. I tried to tinker with them but ran into issues. Lovable solved the map display and location issue by utilizing the [globe.gl]() library which worked great without any changes. I was curious and went back to both Replit and Bolt and told them to utilize `globe.gl` for the mapping functionality and both implemented the functionality perfectly just like Lovable.

> **Insight:** It got me thinking that these services may need to evolve to help guide users on the right development stack, libraries or utilities for their given project. In this case I could have been provided different mapping approaches that could include both free and paid services. I just think these services should help guide new users with pre-development recommendations before immediately trying to code a solution. New developers could use hand-holding before diving right and hitting a wall fast and give up. This is not a good experience when clearly there was a way all of these services could have been successful out the gate. Here’s a tip, ask the service to tell you about the technology it’s using to develop your app. Learn about the technologies. All of this may help you better shape prompts for them.

### Intangibles and Takeaways

Another topic I don’t see discussed much are some of the intangibles that vibe coding brings. These services will improvise and fill in gaps not covered by the original prompt. Replit decided to add an extra feature by adding a local drinking customs blurb in addition to the local toasting term. Lovable added a tagline, some app usage details and a line about drinking responsibly which was a nice touch. The app designs were all pretty basic and this seems like an area where services can begin to distinguish themselves better with improvement.

I decided to finish working on the app using Lovable because I felt it did the best job and only required minor tweaks. I iterated things a bit and then [deployed my first app]() publicly to share with the world. I also put the [code on Github]() which is the only way you can currently edit the code which then syncs with Lovable. Both Replit and Bolt let you edit the code directly within their service and let you deploy publicly as well.

Some takeaways for me is that there’s no clear winner between the services I’ve tested so far. I think each use case for an app will provide varying results from each service. I think people should experiment with all of them for an identical app the same way I did to get a feel for how they work and determine which service is best for them. Many coders consider this wave of newbies joining the ranks as creaters of slop. However there’s value in allowing people to experiment creating something that they never thought would be possible. It also allows them to create something of personal utility that may never come to market. It may also be a gateway for many to get more serious. There’s a ton more I can share regarding nuances between each of these services but I wanted to quickly share some current observations. I plan on playing with them some more along with [Cursor]() and [Windsurf]() and do a follow up post in the future.

## Some additional resources on Vibe Coding

*   [What is Vibe Coding?]()
*   [The rise of vibe coding]()
*   [Vibe coding, some thoughts and predictions]()
*   Clips from [a podcast on Vibe Coding]()
*   A new [service]() to help debug code (shows how AI can create new opportunities)
