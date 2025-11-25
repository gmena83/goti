# Build a SaaS App in 18 Mins with Lovable! (Vibe Coding Tutorial)

**Source URL:** [https://www.youtube.com/watch?v=JQoGbGl9fs4](https://www.youtube.com/watch?v=JQoGbGl9fs4)
**Content Type:** Video
**Platform/Tool:** Lovable
**Author:** Helena Liu

---

## 🚀 Video Summary: Vibe Coding with Lovable

This tutorial, presented by Helena Liu, demonstrates the concept of **Vibe Coding** by building a functional SaaS application prototype in under 18 minutes using the **Lovable** platform. Vibe Coding platforms leverage AI to generate code based on natural language descriptions, allowing users with no coding experience to bring their app ideas to life.

The video follows a step-by-step process:
1.  **Idea Generation:** The app idea, "Shorely," an AI companion for cruise ship guests to plan shore excursions, is inspired by the author's personal travel experience.
2.  **Prompt Engineering:** The author uses **ChatGPT** to write a detailed prompt for the Lovable AI, specifying the app's core features:
    *   Image recognition to identify monuments/scenery from a photo or live camera feed.
    *   AI-generated audio tour guide functionality.
    *   Custom itinerary generation based on city and time.
3.  **App Development in Lovable:** The prompt is fed into Lovable, which generates the initial app version. The author then iteratively refines the app by giving natural language commands to fix bugs, remove unnecessary fields (like the OpenAI API key and group size dropdown), and add essential features (like login/logout pages and Superbase integration for backend database/authentication).
4.  **Testing and Features:** The final prototype successfully demonstrates image recognition (identifying the Trevi Fountain) and an AI-generated audio tour. A key highlight is the seamless integration with **Superbase** for user management, which the author notes is a significant advantage of Lovable over other Vibe Coding tools like Firebase or Bolt.

The tutorial emphasizes that Vibe Coding drastically reduces the time and cost of creating a Minimum Viable Product (MVP), making it an excellent tool for lead generation and quickly validating business ideas.

---

## 💡 Key Concepts and Tools

| Concept/Tool | Description | Role in Tutorial |
| :--- | :--- | :--- |
| **Vibe Coding** | A new paradigm where AI generates most of the code based on natural language descriptions. | The core technology enabling the rapid app development. |
| **Lovable** | A Vibe Coding platform for building web applications. | The primary tool used to generate and refine the "Shorely" SaaS app prototype. |
| **Shorely** | The name of the SaaS app prototype created in the video. | An AI companion for cruise ship travelers to plan and guide their own shore excursions. |
| **ChatGPT** | A large language model used for generating detailed, structured prompts. | Used to write the initial, comprehensive prompt for the Lovable platform. |
| **Superbase** | A backend-as-a-service platform providing database and authentication. | Seamlessly integrated with Lovable to handle user registration and data management. |

---

## 📝 Full Video Transcript

### Introduction and Vibe Coding Concept
Have you ever had a brilliant idea for an app, but you have no idea how to bring it to life because you don't know how to code? Well, in 2025 and beyond, there's an emergence of vibe coding platforms that can do most of the coding for you using AI. So, this means that you only need to describe to the AI what it is that you want to create, and the AI will go off and code the app for you within minutes. I mean, if you told me this existed years ago, I would have said that this was nothing short of sorcery. So today, I'm going to show you how to create an app prototype from start to finish using Lovable.

### App Idea Generation: The "Shorely" App
So, the first thing is coming up with the idea for your application. And a lot of times, the best way to find successful app ideas is from your daily life. Let me tell you how I got to my app idea. So, after me and my fiance got engaged about two, two and a half months ago, we went on a Mediterranean cruise together to celebrate our engagement. We went all across Greece as well as Italy and had an amazing time on Princess Cruises. And so, one thing that we did notice was the economics of cruise lines. So, cruises actually don't make that much money from the fare itself. It just allows them to cover their operating expenses and pay for their labor. Where they do make the most amount of margin is on all of the upsells that you would buy once you are on the ship, such as shore excursions, as well as massages and other premium services.

Now, when we were taking a look at shore excursions for the various different cities that our cruise stopped at, we realized these shore excursions were hundreds of dollars every single day. They were severely overpriced. And a lot of times for a lot of these shore excursions, all you're really getting is a driver as well as a tour guide. And so, we realized we would save hundreds of dollars every single day. And when you add it up for a one to two week cruise, that's thousands of dollars that you can save by just being our own tour guide.

So, what we did was we would go onto ChatGPT at first and say that we're going to be in this city from this time to this time. So, please, uh, create a taxi itinerary or a walking tour itinerary for us for that date. So, when we're going across Greece and we're going actually going to the Parthenon, and the Parthenon is actually not just one monument, it's actually like a whole city that was buried in ruins. And so, what we did was we started taking pictures of various parts of the Parthenon and fed it into our ChatGPT app and told ChatGPT to tell us more about the image that it was seeing. So, essentially, we had an AI tour guide on demand wherever we went.

And so, then we started thinking, okay, so this started to save us hundreds of dollars. Wouldn't it be great if we can create an app around this to make it easier for people to use so that they don't have to keep prompting the AI to create an AI tour guide like this whenever they are on a shore excursion? And so, this is where the idea of Shorely came about. So, this is an AI companion that cruise ship guests can take with them and basically design their own shore excursion and save hundreds or thousands of dollars on their trips.

### Prompting the AI
Now, once we got this idea ready, then the next thing is to write the prompt that will tell the AI exactly what we want it to create. Now, you can absolutely just type in the prompt yourself, or you can actually use AI to write the prompt for you. So, I have my ChatGPT open here, and now I can put in my prompt for the AI to write a prompt for me.

> I want you to write my a detailed prompt that I can put into lovable to create a web app that will help cruise ship travellers create a shore excursion. The user should be able to connect their camera to the app and either point at what they are seeing or upload a photo and the ai will tell them more about the monument/scenery that they are looking at like a tour guide would. The app should also be able to design an iternary for the user depending on which city they are going to and how long they are going to be there.

All right, I just put in my prompt here into ChatGPT. I told it that I want ChatGPT to write a detailed prompt for me for this app. And basically, this app will allow the user to open their camera and basically point at whatever they are seeing, and the AI will tell them more about the site or the monument that they're looking at. Or they can upload a picture of the scenery, and the AI can tell them more by having image recognition. The AI should also be able to design a travel itinerary for them.

### Building and Iterating in Lovable
Okay, so after that is done, we can see that the AI has actually been able to write our prompt for us. So, I'm just going to copy this, and now I'm going to go into Lovable and paste all of this in. So, one thing to note is that there is a free and paid version of Lovable. If you are on the free version, then whatever it is that you're creating will be public. The only way to make, you know, whatever app you're creating private is to go onto their paid plan.

And after I have put in all my prompt, I can see Lovable is starting to spin up a preview. Now, Lovable is similar to other vibe coding platforms that I have featured on this channel like Firebase and like Bolt and Replit as well. And what it does well here is that it can link to Superbase, which is their backend system, which allows you to have a database for user registrations and authentications. It is a separate account. So, if you just go up here, you can click on connect to your Superbase account. You can also integrate this into your GitHub as well. Either way, you'll be able to have a prototype ready to launch within a few hours so that you can see if your MVP even generates any buzz, if you're even on the right track. Because a lot of times, it's not the tech that holds people back from developing and launching a successful app. It's the idea, it's the business behind it, right? So, coming up with the idea is probably more essential than the process of building the app itself. So, for me, for example, I looked at what I was using in my personal life, and then I came up with this idea for the app. And so, take a look at what you're already doing in your industry, in your job, in your daily life that's not as efficient as possible, and those are the best places to come up with the app idea.

Also, your app doesn't have to integrate AI. Like, we're using AI to write the code, but the app itself does not have to be an AI application. All right, so let's wait a couple minutes here, and I'll be back once the first preview for the Lovable app spins up.

Okay, so it's been about a minute or two, and the first version of our app is already spun up. And then you can see that I can also upload my photos here. Now, it doesn't have the itinerary that we can also upload. And also, we can see here that there is an error in the build. So, let's get this error fixed. And I'm also going to ask it to add a different tab for the itinerary.

> please add a second tab where the user can enter in the city and times that they are there and then you can use Openai to generate their iterniary for them.

Okay, it looks like after I just clicked on fix error, it has fixed the error in the app by itself. And now I can just go back and forth with Lovable to create the app that I want. So, I told it here to add in a second tab where the user can enter in the city as well as the date and time that they are there so that the AI can generate a custom itinerary for them. And now the Lovable app is going back and regenerating a new version of this app for us.

Some of the things I can show you here is that you can actually invite other team members to join you on this project. You can also toggle over to the code view. So, you can make modifications to the code if you are technical. You can also link this to Superbase, which is the database user authentication for Lovable. So, once you connect it to Superbase, just go over here, click on connect to Superbase. You do need an account with Superbase, and you have to allow Lovable to have access to all of these things. And so, when the two are connected, you will have seamless integration with a backend database as well. So, once that's all done, then we just click connect, and we are all done here.

When you have Superbase successfully connected, you should see a green dot right there. And then we're all done here. And it also looks like the second version of our Shorely app has finished here as well. And so, it did have the AI itinerary generator, but it should be using our key, not the key, not asking the user for the key, right? Um, and we can also get rid of the group size, I think here, and everything else looks good. So, now I'm going to go back into Lovable and tell it to make these modifications.

> in the plan itinerary tab, remove the openai api key. you should be using MY key for all the users here. Also, remove the group size drop down. add in a login and logout page to the app as well.

Okay, I have finished my next prompt. I told it to remove the OpenAI key and the group size dropdown from the itinerary, as well as adding in a login and logout page to the app. Another thing you can see here is that you can click on the view history and go back to any of the previous versions if you do need to revert back to the previous versions. And once you have finished the entire app and it is exactly what you want, then you can just go up here to publish this project. And I can even add in my own custom domain as well. I just click on custom domains, and I need to already have this domain purchased. I just go into the DNS records behind the scenes of that domain to connect that to my Lovable account to have this published. Now, by default though, you will have a default Lovable domain here.

### Final App Demo and Conclusion
All right, so it's been about two minutes or so, and we can see the new version of our Shorely app already generated here. So, when I go over to the plan itinerary, I can see that the fields I asked it to remove are now gone. And I have a login and logout button here as well. And if I go into my Superbase, I did all that one prompt, I can actually now go into my project, into the database, and be able to see the people who have signed up for this app already. So, if you do have a business, like creating one of these things just as a lead generation is super powerful because whenever someone signs up for your free application, you'll be able to gather their data in the backend to sell your other products and services as well. This is why I just love now the ability to create applications whenever I want.

Okay, so I spent about half an hour going back and forth with Lovable to get the app to work exactly the way that I wanted to. One big bug that I found was that whenever I pressed on like photo upload, and no matter which photo I uploaded, it actually wasn't recognizing the photo. And so, what I just told it here was just that the image recognition wasn't working. And then once the image recognition was working, then the audio wasn't generating. So, it had like the UI layouts of all of this stuff, but the functionalities wasn't working. And I just described in everyday English what wasn't working, and the AI was actually able to fix that. So, everything that you see here was completely made for AI. Like, mind-blowing. And um, so let's give it a test here. Let me upload a photo, and this one's of the Trevi Fountain out in Rome. And you can see the AI is now analyzing this photo, and it's telling me exactly what it is. Like, there's no other prompts in this, like I didn't tell it what was in the photo. And it gives me some fun facts about this monument. I can also start an audio tour as well because a lot of times, like if you're a traveler, you're looking at the sites, you don't want to be down on your phone and reading. So, having the audio guide where you can just listen to what's going on here is super helpful.

> Trevi Fountain. The Trevi Fountain, located in the Trevi district of Rome, is an iconic Baroque fountain renowned for its grand architecture and intricate sculptures. Designed by Gian Lorenzo Bernini, the fountain stands 26.3 meters high.

That's pretty cool, isn't it? And that's exactly like what I was doing on my trip. Like, I was taking photos or just telling ChatGPT to like, uh, scan my surroundings and analyze the video, and then tell me something more and exciting about the place. And so, essentially, I had my headphones on, I had a personal tour guide during my entire trip, thanks to ChatGPT. And now there's like an app for that now that's specifically dedicated to that function. And a lot of the AI apps you see these days are just like kind of a wrapper on top of these APIs that does something specific. And just, and this is what you see with the Shorely app that I made here. And then we also have a second tab here for the plan itinerary. So, I can put in the city that I'm going to, the arrival time, and then we can put in what we're interested in seeing, and have the AI generate our itinerary. Isn't that cool?

And after a few seconds, we can see our custom itinerary that AI generated for us here.

So, I hope you're starting to see the vast potential of AI here. I went from having an idea in my head to having an MVP built in less than an hour. That is insane. Like, if I wanted to have this app built before vibe coding was a thing, this would have easily cost me thousands of dollars to launch or even to get a beta into market. So, even if I offer this for free, like if I was a travel agent and offer this for free, it's a great lead magnet for me that I made in less than an hour. It's more attractive than like an ebook lead magnet, which everyone's doing. Not many people are currently using software as a lead magnet. So, this is one way that you can stand out in your industry.

And one feature that really stands out to me about Lovable is how easy it was to link it to the backend Superbase. So, it was just a couple of clicks to have this database integration done. And from my testing of Firebase or Bolt, this wasn't a very smooth process to be able to have a backend linked so easily with vibe coding tools. So, this is one thing that really makes Lovable stand out in my opinion.

All right, now that I have the first version of my application ready, I can actually start gathering some feedback from actual users to see what they liked and don't like and start making modifications from there. So, I can go into Facebook groups of cruise travelers, for example, and just offer this app for free to get them to try it out and DM me with any feedback that they may have. So, this is how you can go from having an idea to creating a prototype to getting your first couple of users within less than an hour using AI and vibe coding.

So, if you ever have an idea for an app in the future, be sure to check out vibe coding tools like Lovable and bring your idea to life. All right, thank you so much for joining me for this tutorial. I hope you enjoyed it. And uh, if you want to check out the app that I built with Lovable, I'll include it in the link in the descriptions below. And if you got anything out of this tutorial, I would really appreciate it if you would like and subscribe because that will help out this channel so, so much. And if you haven't done so already, be sure to sign up for my free AI automations course below. You will learn all about AI building, vibe coding, and we'll dive into much more detail than what you have seen here. So, I'll catch you in my free training below. Thank you so much for joining me, and I'll see you in my next tutorial.
