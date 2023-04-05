// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/[name].tsx";
import * as $1 from "./routes/about.tsx";
import * as $2 from "./routes/api/joke.ts";
import * as $3 from "./routes/api/specialreserve.ts";
import * as $4 from "./routes/api/superrare.ts";
import * as $5 from "./routes/index.tsx";
import * as $$0 from "./islands/Counter.tsx";
import * as $$1 from "./islands/Games.tsx";

const manifest = {
  routes: {
    "./routes/[name].tsx": $0,
    "./routes/about.tsx": $1,
    "./routes/api/joke.ts": $2,
    "./routes/api/specialreserve.ts": $3,
    "./routes/api/superrare.ts": $4,
    "./routes/index.tsx": $5,
  },
  islands: {
    "./islands/Counter.tsx": $$0,
    "./islands/Games.tsx": $$1,
  },
  baseUrl: import.meta.url,
  config,
};

export default manifest;
