---
draft: false
title: "How does WiselyDesk generate the answers?"
snippet: "Simplified overview of how we *(and most generative AI chatbots)* generate answers, using AI, to questions."
image: {
    src: "/question-mark.png",
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

<img src="/extract_word_embedding_from_zd.png" alt="Retrieve and parse Zendesk knowledge base articles" class="mb-0 rounded mt-1">
<div class="text-center">
<sup >Diagram of task one</sup>
</div>

#### 2) Generate a response based on relevant articles:

- Create a word embedding of the question.
- Find the top three articles by comparing similar word embeddings between questions and articles.
- Summarize the intended bot behaviour and attitude. For instance, *"Your name is Bestbot, and you are a friendly bot"*.
- Combine the summary, relevant articles, and question into one prompt. 

<img src="/combining-prompt-part-2.png" alt="Generate a response based on relevant articles" class="mb-0 rounded mt-1">
<div class="text-center">
<sup >Diagram of task two</sup>
</div>

**And Voila! Once you have the prompt, send it to the AI model to receive an answer!** 

<img src="/answer-from-openai-model.png" alt="Semantic Search Explanation" class="mb-0 rounded mt-1">
<div class="text-center">
<sup >Answer from OpenAI AI model</sup>
</div>


### What AI model does WiselyDesk use?

We use OpenAI AI models (GPT3.5 and GPT4). We use two third party providers, OpenAI (obviously!), and Microsoft - who has a license to supply OpenAI AI models with their infrastructure. Dual providers allows us to ensure our software runs well even if one provider is having a bad day.

### Alternatively, a more technical term: 

We use retrieval augmentation with memory to generate a completion using LLMs.

#### Want to try a simplified version yourself?

If you want to try a simplified version of this yourself, then we would be happy to help you get started. We'll use OpenAI API, Python, and Replit. The later two are free to use, and OpenAI comes with a $5 credit.

**Pre-requisite:**
1. Basic Python knowledge (Can recommend [codeacademy](https://try.codecademy.com/learn-python-3) or [Automate the boring stuff with python](https://automatetheboringstuff.com/) to learn)
2. OpenAI API key - can sign on [OpenAI's webpage](https://platform.openai.com/docs/quickstart) and receive $5 dollar credit.
3. Sign up for [Replit](https://replit.com/) (free account).

**How to get started:**
1. [Fork](https://replit.com/) our Replit to use in your account: [https://replit.com/@JayChiarella1/Basic-QA-with-ZD-help-center-bot#main.py](https://replit.com/@JayChiarella1/Basic-QA-with-ZD-help-center-bot#main.py)
2. Create an [OpenAI API key](https://help.openai.com/en/articles/4936850-where-do-i-find-my-secret-api-key).
3. In your forked Replit, scroll under the "tools" section at the bottom left -> click "secrets" and add your OpenAI API key with the key *OPENAI_API_KEY* (has to be exact) and the value from your key in your OpenAI account.
4. Go back to your Replit and click run!

If you run into any trouble or would like help, please feel free to email us at hello@wiselydesk.com - we're happy to spread some knowledge here!
### Outro

We hope you learned a thing or two. We'll have a discord server up and running soon, so you can ask us further question if something wasn't clear or if you want to learn more!

