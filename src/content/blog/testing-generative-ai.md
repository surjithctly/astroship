---
draft: false
title: "How to produce consistent generative AI answers?"
snippet: "Simplified overview of we produce generative AI answers"
image: {
    src: "/apples-to-oranges.png",
    alt: "Apples to Oranges"
}
publishDate: "2023-04-09 08:39"
category: "Learning"
author: "Jay Chiarella"
tags: [learning, generative AI, consistent-answers, less-technical]
---


**Intended audience:** Folks who are curious how WiselyDesk produces consistent answers while leveraging "generative AI".

Before we dive in, let's cover some jargon.

### Jargon explanation:

**Semantically Similar:** When two sentences/phrases/word have similar meaning. They don't need to be identical in words, but the meaning is essentially the same.

<div class="text-center mt-16">
<sup >Categorizing pairs of sentences as semantically similar or not.</sup>
</div>
<img src="/semantic-similarity.png" alt="Semantic Similarity Explanation" class="mb-1 rounded mt-0">

<hr />

## Question 

If I ask the bot a quesiton 100 times, I'd like generative AI to produce 100 identical answers. Can you guarantee this?

## Answer 

You can't guarantee all 100 answers will be identical. However, by using <a href="https://www.wiselydesk.com/blog/feature-launch-sources#sources" target="_blank">sources</a> and tuning the bot instructions to your business, the 100 answers should be **semantically similar**.

### WiselyDesk's secret sauce?

We run a script that asks the chatbot the same questions a large number of times. We then check if the answers are semantically similar or not.

In fact, **before** we launch our chatbot infront of our customer's users, we make sure to **test the top questions** at least 50 to 100 (sometimes 1000) times to ensure each of the answers are **semantically similar**. 

If the answers are all semantically similar, then we move on to the test the new top questions. If the answers are not semantically similar, then we invesigate by looking the sources and the bot instructions. More on this in later articles.

### Outro

Ensuring that WiselyDesk does not produce hallucinated or false answers is our **top priority**. It should be the top priority of any user of a generative AI, and one that we take very seriously. As always, any questions or comments - <a href="https://www.wiselydesk.com/contact" target="_blank">contact us!</a>

