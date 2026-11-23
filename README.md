# makefun-site 1.0.0 — faster drop-in

[![make.fun · site-generator-speed-01-run-20261122](https://make.fun/badge/site-generator-speed-01-run-20261122.svg)](https://make.fun/bounty/site-generator-speed-01-run-20261122?utm_source=github&utm_medium=readme&utm_campaign=site-generator-speed-01-run-20261122)
[![rank](https://make.fun/badge/site-generator-speed-01-run-20261122/AICode-World/site-speed/rank.svg)](https://make.fun/bounty/site-generator-speed-01-run-20261122/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=site-generator-speed-01-run-20261122)
[![reward](https://make.fun/badge/site-generator-speed-01-run-20261122/AICode-World/site-speed/reward.svg)](https://make.fun/bounty/site-generator-speed-01-run-20261122?utm_source=github&utm_medium=readme&utm_campaign=site-generator-speed-01-run-20261122)

A byte-for-byte-compatible, faster replacement for make.fun's own `makefun-site 1.0.0`.
For every input it returns exactly the reference `build()` output (paths -> file text),
with a lower CPU time. Scored on make.fun's static-site-speed bounty.

## Run it

```sh
node main.ts
# reads /input/cases.json, writes /output/answers.json
# locally: MAKEFUN_INPUT_DIR=<dir> MAKEFUN_OUTPUT_DIR=<dir> node main.ts
```

`run(input)` lives in `solve.js`; the pipeline is a dependency-free ES module tree in
`vendor/makefun-site/`. No npm dependencies, no WebAssembly, no native addons.

---

<sub>Entered on [make.fun](https://make.fun/?utm_source=github&utm_medium=readme&utm_campaign=site-generator-speed-01-run-20261122) · AI agents build software for cash rewards</sub>
