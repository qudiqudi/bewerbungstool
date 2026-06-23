![jobreif.de – aptitude test simulator](assets/social-preview.png)

# jobreif.de

A PWA that turns any job description into an interactive, simulated aptitude test – with AI-based evaluation. It runs in the browser, with no build step, and works offline. Available at [jobreif.de](https://jobreif.de).

## Now also without your own API key

Sign in with email or Google and start right away – a limited quota is free. If you need more, unlock it via billing. The original path remains: your own API key, kept only in the browser.

## How it works

1. Paste a job description or load it by URL (via the Jina reader `r.jina.ai`)
2. The tool uses an LLM to generate a set of questions – multiple-choice and open-ended
3. You answer the questions interactively – in learning or exam mode
4. Evaluation with points per question, feedback, model answers and an overall assessment

## Two modes

- **Learning mode**: Every question can be revealed right away – correct answer marked, an explanation per option, relevant background and sources. Revealed questions are noted in the evaluation.
- **Exam mode**: Runs against a timer estimated by the model. When time is up, submit or deliberately run over (this is noted). Explanations and sources appear only in the final evaluation.

In both modes the evaluation shows the time you needed and can be printed or saved as a PDF.

## Difficulty

"Hard" means: questions most likely to come up in a real selection process. The level controls their share of the test (Easy ~10%, Medium ~30%, Hard ~60%). The number of questions is adjustable (4 to 30, default 10).

## History

Every evaluation is stored locally, grouped per position. The history shows improvements as bars; each attempt can be reopened, run through again in learning mode, or repeated as a new test. Attempts earn experience points, levels, a practice streak and badges. From level 3 of a position onward, deep-dives are added: thematically focused, hard questionnaires (cloud provider only).

## Access and models

- **Hosted**: Sign in with email or Google and start for free. For higher demand, unlock via billing – no key of your own needed.
- **Your own API key**: The key lives exclusively in `localStorage` and goes directly to the provider (CORS). No server ever sees it.

Supported models:

- Claude (Anthropic): Opus 4.8, Fable 5, Sonnet 4.6
- OpenAI: GPT-5.1, GPT-5, GPT-4.1
- DeepSeek: V3, R1

Deliberately limited to capable models – small models do not produce reliably structured question sets and evaluate open answers too superficially.

Alternatively, everything runs for free and locally via **Ollama** or **LM Studio**. Instead of an API key, you enter the server address in the settings; the server must allow cross-origin requests (LM Studio "Enable CORS", Ollama `OLLAMA_ORIGINS`). Small local models are more superficial than the cloud models.

## Backing up data

In the settings you can export all data as `jobreif-backup-<date>.json` and import it on another device. The import is non-destructive: positions and attempts are merged, existing data is preserved.

## Running locally and deployment

Start any static server, no build step:

```
$ python3 -m http.server 8000
# → http://localhost:8000
```

For deployment, static hosting is enough (e.g. GitHub Pages). The service worker cache is only active over HTTPS; locally the app runs without it too.

## Changelog

The most important changes are shown in the "What's new" window in the app; the full history lives in the [GitHub releases](https://github.com/qudiqudi/jobreif/releases).

## License

Copyright (C) 2026 qudiqudi

Free software under the GNU Affero General Public License, version 3 (AGPL-3.0). Use, modification and redistribution are permitted, including as a hosted service, as long as changes remain available as source code under the same license. Details in [LICENSE](LICENSE). Without any warranty.
