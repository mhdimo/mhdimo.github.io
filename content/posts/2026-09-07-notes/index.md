---
title: "What my Amazon Music internship taught me about scale"
date: "2026-09-07"
description: "A recap on my Amazon internship."
tags: ["Amazon", "Amazon Music", "Machine Learning", "RecSys"]
---

Over the past few months, I worked with the Amazon Music ML team in Berlin, where I built an end-to-end ML evaluation pipeline to benchmark embedding quality across new releases for Amazon Music's recommendation system.

I went in thinking I understood what "scale" meant. I had read the blog posts, I knew the vocabulary. A summer of watching what real production load does to a system taught me the difference between knowing the words and feeling the weight.

## What I built

When a new embedding model is trained, the obvious question follows: is it actually better? Not in the abstract — better on the real data it would serve. Answering that meant getting embeddings indexed and measured, repeatedly and reliably. That was my project.

The pipeline, end to end:

1. **Pull the model.** The embedding model lands in S3 as raw embedding files.
2. **Rebuild as Parquet.** A raw vector is useless without identity, so instead of dragging raw files through the pipeline, I converted them to a Parquet schema that folds each entity's metadata — song, artist, the rest — in alongside its embedding. Every record becomes self-contained: vector and identity in one place.
3. **Ingest in parallel.** Scheduled ECS tasks pick up batches of entities and push them into OpenSearch, building a vector index tuned so nearest-neighbor search stays fast while the index stays small enough to be practical.
4. **Measure where the data lives.** Health and evaluation metrics are computed directly on the Spark side of our data platform — the numbers come from the same place as the data, not from a separate job bolted on afterwards.

The point of all of it: before a model earns its way into the recommendation system, the team can look at real numbers instead of a benchmark run on someone's laptop.

## The redesign I didn't plan

Honest version: the first architecture was not OpenSearch. It was a single EC2 server doing everything — serving the API, running ingestion, computing metrics. And it worked, at first.

Then the data grew, and I scaled the only way I knew: vertically. A bigger machine. Then a bigger machine. Then two realizations at once: no machine size was going to bail me out forever, and I was paying for capacity that sat idle most of the time just so periodic batch jobs could finish faster.

So I redesigned around a split that now seems obvious and did not, at the time:

- The always-on path became a **thin API** — as small and boring as possible, because it has to stay up.
- The heavy lifting moved to **scheduled ECS tasks** running periodically, with OpenSearch doing the serving.

The two paths scale independently. The API never waits on a batch, and a batch can fail, rerun, or get thrown away without anyone noticing a thing. If I had learned one sentence this summer, it would be: separate what must always be up from what occasionally must run.

The other lesson hiding in that story: vertical scaling is a loan, not a fix. Every bump in instance size buys you time and hides the real problem, until the day it can't.

## Raise problems in the right room

The technical half of the internship was only half. The other half was learning how to communicate effectively in a large organization.

I learned that the same technical concern can have very different outcomes depending on how and where it is raised. Bringing an issue directly to the person closest to it often created a much more productive conversation than raising it broadly before understanding the full context.

The lesson I took: communication is part of engineering. Match the audience to the problem, start with the people closest to it, and when escalating, bring context and a proposed solution.

## Takeaways

- **Separate the always-on path from the batch path.** Serving should be thin and boring; anything bursty belongs somewhere it can fail and rerun independently.
- **Vertical scaling defers the design decision you actually need to make.** It's useful, sometimes — just know you're borrowing.
- **Benchmarks only matter when they run on the same rails as production.** An eval computed where the data lives tells the truth; a local proxy tells a story.
- **Match the audience to the problem.** The right message in the wrong room still fails.

Back to school now, with a much better answer to "what did you do this summer."

---

*This post reflects my personal views and stays deliberately high-level.*
