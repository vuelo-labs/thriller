---
title: "Less is more: Choosing Impact over Complexity"
subtitle: "“Yeah Liam, I get it. But I don’t know how I can use it…”"
date: 2025-01-15
slug: less-is-more-choosing-impact-over-complexity
canonical: https://medium.com/@lcroash/less-is-more-choosing-impact-over-complexity-88c0d828ccf5
---

![](https://cdn-images-1.medium.com/max/800/0*3bWIS2qruAVjg7Rm)

Photo by [jaikishan patel](https://unsplash.com/@magictype?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com?utm_source=medium&utm_medium=referral)

“_Yeah Liam, I get it. But I don’t know how I can use it…_”

The marketing director’s words stopped me mid-presentation. Three months of work, multiple data sources, tons of cleaning, ensembles of clustering algorithms and really cool and intuitive visualisations.

> **I’d created something that looked impressive and was noteably precise but solved exactly zero problems, in fact it created more.**

### Its easy to be proud of something complex

Our marketing team needed to identify and target key customer groups before the start of the holiday sales period. I had a full quarter to work through the analysis and, as an fairly green analyst, I was eager to prove my worth. I saw this as an opportunity to build something _comprehensive_ and show everyone how smart I was. _“He was a great hire!”_ is what I heard them saying.

The model incorporated everything: purchase histories, brand adjacencies, seasonal patterns, campaign response rates, website behavior, sales calenders… anything that I could find that might tell me something. The resulting segmentation was statistically beautiful. Sixteen distinct customer segments, each with clear defining characteristics backed by solid data. Clear clusters with pretty good separation.

“_So which group should we email first about the holiday sale?_”

I launched into an explanation about how segments 7, 12, and 15 showed high propensity for holiday purchasing, but segment 9 had higher general engagement rates, while segments 4 and 13…blah blah..

She stopped me. “_Yeah Liam, I get it. But I don’t know how I can use it… Mary and John need to segment customers for email campaigns every day. They’re not data scientists — they need something they can understand and act on quickly. This is too complex for our daily operations._”  
It was completely unusable. So much for wowing them.

**Enjoying the article?**  
Consider buying me a coffee @ [https://ko-fi.com/lcroash](https://ko-fi.com/lcroash)  
Confusing people is thirsty work :)

### The true cost of complexity

The irony isn’t lost on me. In trying to create the perfect model and make it accurate, I’d violated one of the fundamental principles of business analytics — insights are only valuable if they drive action. As researchers at MIT Sloan have found, the most effective analytics solutions aren’t necessarily the most sophisticated — they’re the ones that bridge the gap between insight and action _(Davenport & Harris, 2017)._

The hardest part wasn’t building the simpler model — it was convincing everyone (including myself) that we weren’t losing valuable insights. I created a simple A/B test: two teams using different models for a week. The team using the simplified segments made faster decisions and, surprisingly, identified opportunities we’d missed before because they had time to actually analyze the results rather than just implement them.

My analyst-y colleagues also questioned whether we were “dumbing down” the analysis. But when they saw the marketing team independently running successful campaigns without constant analytical support, they understood. Sometimes sophistication isn’t about the complexity of the solution but about finding the right level of complexity for the problem at hand.

My model might have captured every nuance of customer behavior but it failed at its primary purpose: “**helping the marketing team make better decisions about who to target and when**”.

### Finding clarity

The actual solution emerged from necessity. With the holiday season approaching, we needed something actionable immediately. I stripped everything back to basics: Recency, Frequency, and Monetary value (RFM), then layered in just 5 additional variables — seasonal purchasing patterns, response rates to previous campaigns, top department, time between transactions and age group.

You might be asking did it make any difference?   
Actually yes. Initially, there were >10 clusters with tons of overlap and low separation but when I worked with the marketing team, we were able to build 6 clear personas that where but qualitatively and quantitatively understandable:

The _“Seasonal Splurgers”_ who appeared like dormant customers until holidays/ sales approached. The “_Steady Supporters_” who made small but consistent purchases throughout the year. The “_New Potentials_” who’d made one significant purchase in brands that were popular with new customers but hadn’t returned.

Most importantly, we discovered a segment we’d been mishandling — customers who made large first purchases during sales periods but never returned until the next year. Our previous approach treated them as high-value customers, when they were actually price-sensitive opportunists needing different engagement strategies.

At the time, the complexity felt justified. Each additional variable promised better predictability but great predictions aren’t very useful sitting in an unopened box.

### Impact through simplicity

This simplified model fit in a spreadsheet. . No API calls, no complex scoring systems, just clear actionable segments. A couple of filters and an Excel formula to build a SQL query that could be paste into the email platform. Simple for the most tech-phobic marketeer.

The results spoke for themselves. Email conversion rates increased by over 20% for targeted segments. Average order value increased during the holiday season. Response time to market changes dropped from weeks to days and if we decided to change the model, it could be implemented inside a day.

We’d achieved more with less. Recent research in decision science supports this approach, showing that simpler models often outperform complex ones in real-world applications, not despite their simplicity but because of it _(Gigerenzer & Brighton, 2009)._

### Beyond segmentation

This experience fundamentally changed how I approach analytics problems. Now, before diving into any analysis, I ask three key questions:

-   Can someone make a decision with this information in five minutes
-   Will this analysis work within existing tools and processes?
-   Does the precision gain justify the complexity cost?

The Harvard Business Review suggests that up to 73% of data collected in organizations goes unused for decision-making _(Ross et al., 2019)_. Often, this isn’t because the data isn’t valuable, but because the insights derived are too complex to act upon.

### The real measure of impactful analysis

> If noone can use it, then noone will use it.

The true measure of analytical work isn’t its complexity but its utility. While sophisticated models might impress in presentations, what matters is whether they drive better decisions and actions. And they want to help their people not make their lives more complicated.

My overly complex segmentation model was technically impressive. It was also perfectly useless. The simplified version wasn’t just “good enough” — it was better because it enabled action.

As my marketing lead later told me, “I don’t need to understand every nuance of customer behavior. I need to know who to email tomorrow.”

### Learning from my mistakes

This lesson has helped shape every analysis I’ve done since. Whether I’m working on forecasting models, attribution analysis, or customer insights, I start with the end in mind:

-   How will this actually be used?
-   What decisions need to be made?
-   What’s the simplest way to get there?

The goal isn’t perfect analysis — it’s better decisions.

### References:

-   Miller, G. A. (1956). _The magical number seven, plus or minus two: Some limits on our capacity for processing information._
-   Davenport, T. H., & Harris, J. G. (2017). _Competing on Analytics: The New Science of Winning._
-   Gigerenzer, G., & Brighton, H. (2009). _Homo Heuristicus: Why Biased Minds Make Better Inferences._
-   Ross, J. W., et al. (2019). _Designing Digital Organizations. MIT Center for Information Systems Research._

_I’ve worked across industries — from customer support at Intercom to supply chain management at Microsoft, to helping leaders at LearnUpon make data-driven decisions. My approach? Master the fundamentals, ignore the hype and focus on what works to deliver valuable work._

_Please connect/ follow me on_ [_LinkedIn_](https://www.linkedin.com/in/lcroash/)_, I love talking about this stuff and stuff like it. My mission is to be the Senior that I wish I had when I started.  
Consider leaving some feedback —_ [_https://tinyurl.com/233h55hs_](https://tinyurl.com/233h55hs)
