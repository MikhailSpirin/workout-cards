(() => {
  const timer = document.querySelector("[data-interval-timer]");
  if (!timer) return;

  const WORK_SECONDS = 45;
  const REST_SECONDS = 15;
  const display = timer.querySelector("[data-timer-display]");
  const status = timer.querySelector("[data-timer-status]");
  const count = timer.querySelector("[data-timer-count]");
  const toggle = timer.querySelector("[data-timer-toggle]");
  const reset = timer.querySelector("[data-timer-reset]");

  let phase = "ready";
  let remaining = WORK_SECONDS;
  let completed = 0;
  let running = false;
  let endAt = 0;
  let ticker;

  const formatTime = (seconds) => `0:${String(seconds).padStart(2, "0")}`;

  const render = () => {
    timer.dataset.phase = phase;
    display.textContent = formatTime(remaining);
    status.textContent = phase === "ready" ? "READY" : phase.toUpperCase();
    count.textContent = completed;
    toggle.textContent = running ? "Pause" : (phase === "ready" ? "Start" : "Resume");
  };

  const beginPhase = (nextPhase, seconds) => {
    phase = nextPhase;
    remaining = seconds;
    endAt = Date.now() + seconds * 1000;
    render();
  };

  const tick = () => {
    remaining = Math.max(0, Math.ceil((endAt - Date.now()) / 1000));

    if (remaining === 0) {
      if (phase === "work") {
        completed += 1;
        beginPhase("rest", REST_SECONDS);
      } else {
        beginPhase("work", WORK_SECONDS);
      }
      return;
    }

    render();
  };

  const start = () => {
    if (phase === "ready") {
      phase = "work";
      remaining = WORK_SECONDS;
    }
    running = true;
    endAt = Date.now() + remaining * 1000;
    clearInterval(ticker);
    ticker = setInterval(tick, 250);
    render();
  };

  const pause = () => {
    remaining = Math.max(1, Math.ceil((endAt - Date.now()) / 1000));
    running = false;
    clearInterval(ticker);
    render();
  };

  toggle.addEventListener("click", () => {
    if (running) pause();
    else start();
  });

  reset.addEventListener("click", () => {
    running = false;
    clearInterval(ticker);
    phase = "ready";
    remaining = WORK_SECONDS;
    completed = 0;
    render();
  });

  render();
})();
