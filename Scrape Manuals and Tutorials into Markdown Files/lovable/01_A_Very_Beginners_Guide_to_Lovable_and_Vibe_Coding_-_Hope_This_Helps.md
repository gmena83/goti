# A Very Beginner's Guide to Lovable and Vibe Coding - Hope This Helps

**Source:** [Reddit Post](https://www.reddit.com/r/lovable/comments/1kx3ihi/a_very_beginners_guide_to_lovable_and_vibe_coding/) in r/lovable
**Author:** unreal5
**Content Type:** Reddit Post / Guide

---

TL:DR - Plan out in ChatGPT, Chat Button is Your Best Friend, It's OK to Start Over, Go Slowly, Finished the V1 of my 2nd app.

**June 2, 2025 UPDATE** - Just finished the 1st version of my movie voting app. Check it out here - [https://reel-story-hunt.lovable.app/](https://reel-story-hunt.lovable.app/) - It's a fun way to get your creative juices flowing by creating and voting on plots for movie titles every day. Love to hear any feedback!

I wanted to give a very beginners overview of my vibe coding journey with Lovable. I'd say that I'm a novice but slowly making it to the intermediary level. This is for the person who is just starting out so you can hopefully avoid the mistakes that I've made. It's also for those just starting out who are about to throw in the towel. Don't. You can do this... but you probably won't do it within an hour.

I've built out 1 (sorta completed app) [https://college-qb-tracker.lovable.app/](https://college-qb-tracker.lovable.app/)
and I'm working on (about 95% done) a movie voting/wordle type app. I'll be talking about both of these on this post. I'm particularly fond of the Recruiting app because it was a labor of love that took a million years, ok, 4 weeks, to build. I could probably do it now in 2 days.

---

### 1 - Plan Out in ChatGPT or something else before starting.

The 1st mistake that I made was thinking that Lovable could do everything within 1 prompt. You see all of these tutorials of people building really cool stuff in an hour and I thought, ok, I can do this too. I'll just give it everything in 1 prompt and it'll be done. This definitely isn't the case. This might be the case if you're a developer and know all of the technical terminology (I don't, although I'm getting better) but if you're a newbie then you may have to grind some stuff out. Use ChatGPT to build a framework of what you want to do. I literally asked ChatGPT to write out a framework for my application and I provided it screenshots as a reference. Unless you're building something that has never, ever been done before, more than likely you're building something that is a tweak of something already established. Use the screenshots from that app or website to give to ChatGPT so that it can help you with the framework.

I did this with the Recruiting app. After spending a week of trying to get ChatGPT to build out the entire database (the recruiting app is basically a database that takes in data from websites and Twitter) and realizing that I needed something more, I found Lovable. But then I wanted Lovable to do everything. **Lovable is good for building but not good for data. ChatGPT is great for data but not necessarily good for building.**

Spend a lot of time in clearly fleshing out what you want to do and once you're ready - give this to Lovable. **Your initial prompt can get you to 70%-80% of your final goal. The last 20% is where stuff can go crazy.**

### 2 - Lovable isn't the best for data.

For the recruiting app I thought that I could give Lovable a ton of college football data and ask me to build a database. Well, what I found was that trying to get coaching information (3 coaches per 137 schools) for all of the universities was a task that both Chat GPT and certainly Lovable weren't up to. I used ChatGPT to slowly get me the data I needed. Instead of trying to get all 411+ coaching data at once I got them about 30 at a time. This made it much more manageable and cut down on countless errors.

Lovable is good for building things - not for data collection.

### 3 - Chat is Your Best Friend

If you get nothing out of this post it's this... use the chat button feature. Yes, it will take up more credits, but in the long run it'll save you time and frustration. Before I discovered the chat button I would constantly feed Lovable actionable prompts. **You don't want to do this.** Think of a prompt as you telling Lovable what to do. Once you tell it, it's going to get done. If you make a mistake here or if Lovable gets it wrong because it didn't understand then the action is already done and you may spend more time undoing what has just been done incorrectly. This is where a ton of frustration came in. I was about 85% through with my recruiting app when after probably sending 12 prompts of asking Lovable to do 1 thing (unsuccessfully) I had to scrap it and start over. When I restarted I would ask Lovable ANYTHING in the chat and plan out the next prompt in the chat making sure that this is exactly what I wanted to be accomplished. You can also find errors in the chat where Lovable suggests doing 1 thing but within the chat you correct it. This is the time for correction... once an actionable prompt is set it's likely too late.

Now my plan is usually to flesh out exactly what I want to do in chat before having Lovable actually do it.

### 4 - It's not Only OK to Start Over, You Should!

So after 3 failed attempts at building this recruiting app (1st - trying everything in ChatGPT, 2nd - Trying to 1 prompt my way through with Lovable 3rd - Getting about 85% through until I hit the hallucination) I had figured out where I had gone wrong. I wrote out entire plan within ChatGPT first and then sent it to Lovable, this literally got me about 80% there on the 1st prompt. Now instead of using Lovable for data I relied on ChatGPT. This got me about 85% there. What took me 2 weeks before probably took me 2 hours. Now I was at the point where I needed to understand about databasing (actually didn't use a database for the recruiting app but will add one at a later time) and understand more about front end and back end. Learn these terms... front end (client side), back end (Supabase, database), persistent data, toast notifications. Again, this is where the chat button can really help. I got pretty close this time, about 90% through until I hit the hallucinations again. Now I went to YouTube to watch some tutorials and I started over AGAIN. After about 3 hours I was 95% there.

I've seen people literally curse out Lovable because it won't do something that is super simple. You've been working on something for a week and you hit that point of no return. But you haven't just hit a snag, you're likely just building bad code on top of bad code and honestly... just start over. You'll get so much further the 2nd, the 3rd time around. On my movie voting/Wordle thing I'm on version 4!

### 5 - Go Slowly.

Another thing about the chat button. Read the responses.

Because we're all so ready to get our project completed it's easy to just click "FIX IT" or "IMPLEMENT THE PLAN" but you should read what Lovable is suggesting to do. Oh, and use screenshots in explaining what is needing to be done. **Use screenshots** in pointing out errors. **Use screenshots** period.

Reading the responses that Lovable gives you does 2 things -

1.  You get more technical knowledge and understand on how to present terms to Lovable. I once asked in the chat "I got a message, what's the note in the bottom left hand corner of the screen, that said Error - etc." Lovable explained the error and also that the message is called a **Toast Notification**.
2.  You can see errors from Lovable in its explanation. There have been many times when I'll chat with Lovable to explain something and it won't quite understand OR it'll give me a solution that contains an error. Read through everything. Point out in your next chat about the error. **Consider chat to be practice**. No one sees it, this is where you get better. **Consider prompts to be the game**. If you mess up here it can have consequences.

I probably spend the majority of my time explaining and planning in chat. By the time we're prompting the strategy has been planned out to a T.

What I mean by going slowly and this leads into not getting frustrated is that you probably can't 1 or 2 prompt your way into something meaningful, but you know this by now.

But with good planning I believe that you can get 80%-85% there with the 1st prompt. Also, and here's why starting over isn't bad. You will probably get stuck somewhere. With my movie/Wordle app it has a major component of archiving and databasing every night. Well on my 1st 2 tries (I'm on version 4 now) it would get stuck at this point. On my 3rd and 4th iterations I've started the build trying to solve for this first. That way if I can knock this out I'm 95% of the way there. By failing a couple of times you'll know where the pain points are. There's nothing more frustrating than taking a ton of time and credits to build something only to have it start hallucinating at the end. Build the hard part first if you can.

**Good Planning - Initial Prompt - 80%-85% completion.** With good screenshots and a good plan you probably have a nice looking front end.

The last 15%-20% I prompt feature by feature. No more major prompts here. If you have 2 things that you want to accomplish... split them up. I'd rather spend more credits on singular prompting than trying to get 3 things accomplished in 1 prompt. Why? Because often times you try to do too much and maybe 1 feature gets done, the other one is only half way complete, and the 3rd is a dud. Go feature by feature at this point.

I hope that this helps you. I'm a novice so happy to help if I can but I'm still learning as we go!

---
### Key Takeaways from Comments

*   **Project Setup:** A suggestion is to set up a project in ChatGPT and have separate chats for each subpart, as it retains memory better and seems to draw references between the chats (from user `leonbollerup`).
*   **Idea Refinement:** To refine an idea, write out the look, feel, user experience, and a similar current website, including screenshots. Ask ChatGPT to write a "tech brief" for Lovable (from user `unreal5`).
*   **ChatGPT for Code Analysis:** One user is having ChatGPT analyze the entire coded project via GitHub to assist in fixing small issues that Lovable struggled with (from user `Valentino_Musa`).
*   **Lovable as a Tool:** "The most important part is still that you need your own brain when building complex apps. Lovable is a tool, not a brain." (from user `Grouchy_Literature_2`).
*   **Chat Mode:** Lovable's Chat mode functions like an architect and technical product manager, helpful for brainstorming new features (from user `vinodsharma10x`).
*   **Data Collection:** ChatGPT is better at handling data that the user feeds it (e.g., CSVs or tables) rather than collecting real-world data itself (from user `areskz`).
*   **Build Hard Part First:** By failing a couple of times, you'll know the pain points. Build the hard part first if you can to avoid frustration later (from user `unreal5`).

---
*Note: The content above is a structured extraction of the Reddit post and its relevant comments, formatted for clarity and preservation of information.*
