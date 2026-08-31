import { spawn } from "node:child_process";
import chokidar from "chokidar";

let building = false;
let pending = false;

function build() {
  if (building) {
    pending = true;
    return;
  }

  building = true;
  const child = spawn(process.execPath, ["scripts/build.js"], {
    stdio: "inherit"
  });

  child.on("exit", () => {
    building = false;
    if (pending) {
      pending = false;
      build();
    }
  });
}

build();

const watcher = chokidar.watch(["src", "scripts/build.js"], {
  ignoreInitial: true
});

let timer;
watcher.on("all", () => {
  clearTimeout(timer);
  timer = setTimeout(() => build(), 100);
});

console.log("Watching src/ for changes...");
