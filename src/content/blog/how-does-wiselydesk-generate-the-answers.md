---
draft: false
title: "How are the answers generated?"
snippet: "Simplified overview of how we *(and most generative AI chatbots)* generate answers, using AI, to questions."
image: {
    src: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?&fit=crop&w=430&h=240",
    alt: "Answers"
}
publishDate: "2023-03-25 08:39"
category: "Learning"
author: "Jay Chiarella"
tags: [answers, generative AI, how-to-guide, less-technical]
---

**Intended audience:** Less-technical folks curious to have a simplified understanding of how we *(and most generative AI chatbots)* generate answers to questions. 

Before we dive in, let's cover some jargon.

### Jargon explanation:

1. **Word Embedding**: A column or set of numbers that represents text. Similar text should have similar numbers. 

<p class="text-sm mb-0">Simplified process of <em>word embedding</em> 3 text inputs. Looking at the results, which input is most different?</p>

<img src="/word-embedder-intro.png" alt="Word Embedding Demo" class="mb-0 rounded mt-1">
<div class="text-center">
<sup >If you guessed "I like toast" as the most different, then you are correct!</sup>
</div>

*We oversimplified, so be sure to keep learning :)*

## Two main tasks to generate answers:

<p class="text-sm italic">WiselyDesk does a lot more than this under the hood. This is a simplified version to get the idea across.</p>

#### 1) Retrieve and parse Zendesk knowledge base articles:

- Get all of the Zendesk knowledge base articles, by <a target="_blank" href="https://support.zendesk.com/hc/en-us/articles/4409381383578-Where-can-I-find-my-Zendesk-subdomain-">subdomain</a>, using the API.
- Parse relevant information from each article, such as title and content.
- Create word embeddings of each article and save the result. 

#### 2) Generate a response based on relevant articles:

- Create a word embedding of the question.
- Find the top three articles by comparing similar word embeddings between questions and articles.
- Summarize the intended bot behaviour and attitude. For instance, *"Your name is Bestbot, and you are a friendly bot"*.
- Combine the summary, relevant articles, and question into one prompt. 

**And Voila! Once you have the prompt, send it to the AI model to receive an answer!** 

### What AI model does WiselyDesk use?

We use OpenAI AI models (GPT3.5 and GPT4). We use two third party providers, OpenAI (obviously!), and Microsoft - who has a license to supply OpenAI AI models with their infrastructure. Dual providers allows us to ensure our software runs well even if one provider is having a bad day.

### Outro

Thank you for visiting our website and blog! We are super excited to get our first 5-7 beta customers who use Zendesk help center currently. We're happy to show you a no-strings attached / no payment required demo of how this chat could look like in your help center! 

