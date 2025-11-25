[Sitemap](/sitemap/sitemap.xml)

[Open in app](https://rsci.app.link/?%24canonical_url=https%3A%2F%2Fmedium.com%2Fp%2F31695c9ed745&%7Efeature=LoOpenInAppButton&%7Echannel=ShowPostUnderCollection&%7Estage=mobileNavBar&source=post_page---top_nav_layout_nav-----------------------------------------)

Sign up

[Sign in](https://medium.com/m/signin?operation=login&redirect=https%3A%2F%2Fehandbook.com%2Fi-vibe-coded-an-app-in-base44-heres-what-i-learned-31695c9ed745&source=post_page---top_nav_layout_nav-----------------------global_nav------------------)

[](https://medium.com/?source=post_page---top_nav_layout_nav-----------------------------------------)

[Write](https://medium.com/m/signin?operation=register&redirect=https%3A%2F%2Fmedium.com%2Fnew-story&source=---top_nav_layout_nav-----------------------new_post_topnav------------------)

[Search](https://medium.com/search?source=post_page---top_nav_layout_nav-----------------------------------------)

Sign up

[Sign in](https://medium.com/m/signin?operation=login&redirect=https%3A%2F%2Fehandbook.com%2Fi-vibe-coded-an-app-in-base44-heres-what-i-learned-31695c9ed745&source=post_page---top_nav_layout_nav-----------------------global_nav------------------)

[## Entrepreneurship Handbook](https://ehandbook.com/?source=post_page---publication_nav-7adf33e44ae3-31695c9ed745---------------------------------------)

·

Follow publication

[](https://ehandbook.com/?source=post_page---post_publication_sidebar-7adf33e44ae3-31695c9ed745---------------------------------------)

How to succeed in entrepreneurship; feat. founder stories, design articles, and startup deep dives that inspire your entrepreneurial journey.

Follow publication

Press enter or click to view image in full size

Mother.Up — vibe coded app

# I vibe-coded an app in Base44 — here’s what I learned

## Experiences of a non-developer using AI to build a prototype

[](https://medium.com/@LuRoth_?source=post_page---byline--31695c9ed745---------------------------------------)

[Lucy Pitticas-Rothwell](https://medium.com/@LuRoth_?source=post_page---byline--31695c9ed745---------------------------------------)

8 min read

·

Sep 19, 2025

[](https://medium.com/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2F_%2Fvote%2Fentrepreneur-s-handbook%2F31695c9ed745&operation=register&redirect=https%3A%2F%2Fehandbook.com%2Fi-vibe-coded-an-app-in-base44-heres-what-i-learned-31695c9ed745&user=Lucy+Pitticas-Rothwell&userId=2e303101984&source=---header_actions--31695c9ed745---------------------clap_footer------------------)

\--

5

[](https://medium.com/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2F_%2Fbookmark%2Fp%2F31695c9ed745&operation=register&redirect=https%3A%2F%2Fehandbook.com%2Fi-vibe-coded-an-app-in-base44-heres-what-i-learned-31695c9ed745&source=---header_actions--31695c9ed745---------------------bookmark_footer------------------)

Listen

Share

I recently built a [prototype for an app idea I had,](https://medium.com/@LuRoth_/mother-up-a-vibe-coded-app-to-help-mums-feel-great-after-childbirth-97105549de6e) in the vibe-coding platform, Base44. I’ve written up here what I learned for your perusal.

**Note** : I talk here about what works and doesn’t work well but it’s worth noting that by using Base44, **I was able to build an app prototype relatively quickly that I would not have been able to do otherwise** . That’s pretty huge so big kudos to the Base44 team. I’m incredibly pleased this kind of software exists, is being worked on and will no doubt only get better.

**TL:DR** : Base44 is great for prototyping ideas you can showcase to potential new collaborators or investors. But use with caution if you’re trying to build a production-grade app. For any attempts at using a vibe-coded app in production, I’d suggest developer expertise is necessary.

## First, an overview of vibe coding

### How vibe coding works

You tell the chatbot in natural language what you want, and the AI designs and codes it up for you. This means that **without any coding experience, you can create a clickable app / prototype** to show anyone you want to bring on your startup journey (i.e., potential team members, investors etc).

### Which platform?

I used Base44 because ChatGPT recommended it and I wanted to get started quickly (however there are many others such as Lovable, Replit etc).

Press enter or click to view image in full size

Base44 interface

I used the Free plan to start with but I soon used up the 25 monthly credits included (each requested code change to the AI uses 1 credit). I then subscribed to the Starter plan for $20 per month (100 credits).

_For more on the tech stack, see_ [_here_](https://medium.com/@LuRoth_/mother-up-a-vibe-coded-app-to-help-mums-feel-great-after-childbirth-97105549de6e#:~:text=1.%20Tech-,Stack,-Vibe%2Dcoding%20platform) _._

**So what were the key learning takeaways?**

## 👍 **A detailed initial prompt will save you a lot of time (and AI credits)**

Submitting structured, well thought-out prompts is critical to both building the app you want and doing it quickly and inexpensively (i.e., using less credits).

**My first ‘initial prompt’ attempt was quite broad** , containing a few sentences on what I wanted the app to achieve for the user (as is often recommended on the platform home pages):

My first attempt at an initial prompt — it was too broad

However, the prototype it produced was so **far off what I was looking for in terms of functionality and design,** I would have spent a huge amount of time further prompting it into the right shape.

I then reset and created a much **more thorough document** with labelled sections which I used as the initial prompt:

Press enter or click to view image in full size

My second attempt at an initial prompt

From this, the AI created an app more in line with what I had in mind. I then needed to submit around another 40 prompts to get the simulated prototype I wanted.

Press enter or click to view image in full size

**Left** : Result after the very first, brief, initial prompt. **Right** : Final version after a more detailed initial prompt, plus 40 further prompts.

**There has been lots of research on Prompt Engineering** which I won’t attempt to cover here, but [_this Prompt Engineering episode of Lenny’s podcast_](https://open.spotify.com/episode/3Bb7d0EcVazeZ8t0CEQrop) is a nice introduction if you’re interested.

## 👍 The AI can take general principles and turn them into specific features

**You don’t have to describe every feature and element you want.** You can provide a general principle and the AI will do the rest.

There were lots of cases of this in my app, but as a basic example, I passed the following design principle into the initial prompt:

**_“The app is goal focused, gamified and personalised — the user is regularly reminded of their personal goals, progress and what they can achieve.”_**

The AI then created a ‘ _Your goals_ ’ section on the home screen including progress bar for ‘ _% to goal weight’_ . I didn’t have to ask for those specific things:

Press enter or click to view image in full size

A very early screen created by the AI from my initial prompt asking it to be goal focused and gamified. (Note also the design flaw in “Core recovery”).

## 👍 **The Visual Editor is very useful for small changes**

The Visual Editor allows you to make simple visual changes without using the AI (and so without using credits). For example, in the shot below, Icould **change colours and spacing** of some of the components on the page:

Press enter or click to view image in full size

Visual editor in Base44

## 💡Knowing some Javascript and CSS is useful

The visual editor has significant limitations however, for example you can’t use it to change dynamically-generated text. Knowing some Javascript and CSS when vibe coding a web app would help make the build process a lot smoother. It would also be less costly as it enables you to make more changes manually, rather then using up AI credits.

## **👍 Passing in inspirational graphics is effective**

You can describe in words what vibe or design you’d like, but **supporting it with an inspirational image will greatly help** in getting what you want quickly (a picture says a thousand words after all!).

Example prompts:

* _“Make the vibe of the app similar to this_ **_[insert graphic or image]”_**
* _“Make the structure of the page similar to this_ **_[insert screenshot from another app]”_**

## **👎 The AI can randomly re-design things that you didn’t ask for**

This is one of the most frustrating things in Base44.

For example, as part of a debugging test, the app temporarily changed the Home screen to a holding page. Once we’d debugged and the AI reverted it back, **the Home page design was completely different with a random new design!** I asked the AI several times to revert it, but it kept showing new designs I’d never seen before. I had to manually revert it back to an old version in the end, meaning I lost some changes and had to re-do them.

Press enter or click to view image in full size

Before debugging — the desired designs I created Press enter or click to view image in full size

After debugging — same screens as above but with significant undesired changes the AI could not revert from

You can lock pages to prevent the code from making unwanted changes, but there are times when you need the pages unlocked meaning the uninvited redesigns can sneak in.

## 👎 The l **ogo generator** is poor

The logo generator (for creating the app icon that would show on your phone home screen) **can’t seem to read the design from your app** and so can’t create a logo in line with it. This was the case even when the main AI gave me font type and hex codes to pass to the logo generator. I ended up with a logo that is of a different design theme.

Press enter or click to view image in full size

Logo generator showing the best the generator could do — the front is different from the logo within the app.

## 👎 **Debugging is a big part of the work**

**I used 40 AI credits building the app and 33 debugging it.**

You get your app working in the Base44 simulationbut when you try it in a live environment (for example in Google Chrome that would allow others to use it), it has bugs **.**

> How debugging works in Base44: _The AI_ _essentially teams up with you by asking you to run certain checks step-by-step and tell it what you see. It then tries to solve the issues based on your feedback._
> 
> 

The debugging process can be frustrating! For example, it seemed unable to solve a relatively simply 500 Internal Server Error. It could see an onboarding data mismatch between the client and server side schemas, but **it tried** **18** **times** (using 18 credits) to fix it and couldn’t — it seemed to just be going round in circles. In the end, I asked to see the client side and server side data schemas myself and it was fairly obvious where the mismatch lay as there were 3 fields on the client side that were missing on the server side.

Also, in fixing current errors, it sometimes created quite predictable new ones. For example to stop a client-server data mismatch, it tried to remove a field from the server schema, which just created a new mismatch (see below).

I should note, the AI was incredibly polite and apologetic about the whole thing!

Press enter or click to view image in full size

An example where the AI tried to fix a problem by removing a field and created a fairly predictable new one in doing so

## 👎 It made some basic design errors that wouldn’t happen with a human designer

For example:

* Text running off the side of buttons
* Different font sizes in the same line (see [example above](https://medium.com/p/31695c9ed745#:~:text=and%20gamified.%20\(-,Note,-also%20the%20design) )
* Using white buttons on a white background such that they can’t be seen. Even after I asked for this to be changed, the AI could not fix it. I had to use the visual editor and fix each instance manually.

My prompt requesting no use of white on a white background (it didn’t work and the issue persisted until I fixed it manually)

## 💡Developer expertise is recommended for any attempt at putting a vibe-coded app live

This applies both in terms of making it actually function in a live environment (see above), and also in ensuring security of the app is satisfactory.

Base44 does have security in place (see [here](https://medium.com/@LuRoth_/mother-up-a-vibe-coded-app-to-help-mums-feel-great-after-childbirth-97105549de6e#:~:text=50%20per%20month\).-,Security,-%3A%20App%20security%20is) ), but as a non-developer, I would not be confident it was secure enough to to consume and store customer data with the app.

## Conclusion

Overall, this kind of tech is very exciting and **enables you to build great prototypes with which you can showcase your product concept** . It has limitations, but the tech is likely to get better pretty quickly.

As a non-developer, if I wanted to create an app for my new business now, I would not be confident doing it on a vibe-coding platform without proper technical expertise to make sure it was functional, robust and secure.

I hope that was useful. If you have different experiences please do share them in the comments, and feel free to direct [message me on LinkedIn](https://www.linkedin.com/in/lucyrothwell/) .

You can also email-subscribe to my posts [here](https://medium.com/subscribe/@LuRoth_) .

[Artificial Intelligence](https://medium.com/tag/artificial-intelligence?source=post_page-----31695c9ed745---------------------------------------)

[Llm](https://medium.com/tag/llm?source=post_page-----31695c9ed745---------------------------------------)

[AI](https://medium.com/tag/ai?source=post_page-----31695c9ed745---------------------------------------)

[Software Development](https://medium.com/tag/software-development?source=post_page-----31695c9ed745---------------------------------------)

[Startup](https://medium.com/tag/startup?source=post_page-----31695c9ed745---------------------------------------)

[](https://medium.com/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2F_%2Fvote%2Fentrepreneur-s-handbook%2F31695c9ed745&operation=register&redirect=https%3A%2F%2Fehandbook.com%2Fi-vibe-coded-an-app-in-base44-heres-what-i-learned-31695c9ed745&user=Lucy+Pitticas-Rothwell&userId=2e303101984&source=---footer_actions--31695c9ed745---------------------clap_footer------------------)

\-- [](https://medium.com/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2F_%2Fvote%2Fentrepreneur-s-handbook%2F31695c9ed745&operation=register&redirect=https%3A%2F%2Fehandbook.com%2Fi-vibe-coded-an-app-in-base44-heres-what-i-learned-31695c9ed745&user=Lucy+Pitticas-Rothwell&userId=2e303101984&source=---footer_actions--31695c9ed745---------------------clap_footer------------------)

\--

5

[](https://medium.com/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2F_%2Fbookmark%2Fp%2F31695c9ed745&operation=register&redirect=https%3A%2F%2Fehandbook.com%2Fi-vibe-coded-an-app-in-base44-heres-what-i-learned-31695c9ed745&source=---footer_actions--31695c9ed745---------------------bookmark_footer------------------)

[](https://ehandbook.com/?source=post_page---post_publication_info--31695c9ed745---------------------------------------)

[](https://ehandbook.com/?source=post_page---post_publication_info--31695c9ed745---------------------------------------)

Follow

[## Published in Entrepreneurship Handbook](https://ehandbook.com/?source=post_page---post_publication_info--31695c9ed745---------------------------------------)

[383K followers](/followers?source=post_page---post_publication_info--31695c9ed745---------------------------------------)

· [Last published 6 hours ago](/10-things-id-never-do-if-i-were-starting-a-business-today-99c4e9c79b46?source=post_page---post_publication_info--31695c9ed745---------------------------------------)

How to succeed in entrepreneurship; feat. founder stories, design articles, and startup deep dives that inspire your entrepreneurial journey.

Follow

[](https://medium.com/@LuRoth_?source=post_page---post_author_info--31695c9ed745---------------------------------------)

[](https://medium.com/@LuRoth_?source=post_page---post_author_info--31695c9ed745---------------------------------------)

[## Written by Lucy Pitticas-Rothwell](https://medium.com/@LuRoth_?source=post_page---post_author_info--31695c9ed745---------------------------------------)

[314 followers](https://medium.com/@LuRoth_/followers?source=post_page---post_author_info--31695c9ed745---------------------------------------)

· [62 following](https://medium.com/@LuRoth_/following?source=post_page---post_author_info--31695c9ed745---------------------------------------)

A product manager writing about various ponderings <https://www.linkedin.com/in/lucyrothwell/>

## Responses (5)

[](https://policy.medium.com/medium-rules-30e5502c4eb4?source=post_page---post_responses--31695c9ed745---------------------------------------)

See all responses

[Help](https://help.medium.com/hc/en-us?source=post_page-----31695c9ed745---------------------------------------)

[Status](https://status.medium.com/?source=post_page-----31695c9ed745---------------------------------------)

[About](https://medium.com/about?autoplay=1&source=post_page-----31695c9ed745---------------------------------------)

[Careers](https://medium.com/jobs-at-medium/work-at-medium-959d1a85284e?source=post_page-----31695c9ed745---------------------------------------)

[Press](mailto:pressinquiries@medium.com)

[Blog](https://blog.medium.com/?source=post_page-----31695c9ed745---------------------------------------)

[Privacy](https://policy.medium.com/medium-privacy-policy-f03bf92035c9?source=post_page-----31695c9ed745---------------------------------------)

[Rules](https://policy.medium.com/medium-rules-30e5502c4eb4?source=post_page-----31695c9ed745---------------------------------------)

[Terms](https://policy.medium.com/medium-terms-of-service-9db0094a1e0f?source=post_page-----31695c9ed745---------------------------------------)

[Text to speech](https://speechify.com/medium?source=post_page-----31695c9ed745---------------------------------------)
