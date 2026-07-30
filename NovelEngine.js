export class NovelEngine {
  constructor(root, scenario) {
    this.root = root;
    this.scenario = scenario;
    this.index = 0;
    this.textVisible = false;
    this.state = {
      day: 1,
      flags: {},
      affection: { emma: 0 },
      history: []
    };

    this.renderShell();
    this.bindEvents();
  }

  renderShell() {
    this.root.innerHTML = `
      <main class="game">
        <section class="stage" aria-label="ゲーム画面">
          <div class="background" id="background"></div>
          <div class="overlay"></div>
          <div class="topbar">
            <span id="chapter"></span>
            <span id="clock"></span>
          </div>
          <div class="status" id="status"></div>

          <div class="message-panel" id="messagePanel">
            <div class="speaker" id="speaker"></div>
            <div class="message" id="message"></div>
            <div class="continue">クリック / Enter で進む</div>
          </div>

          <div class="choices" id="choices"></div>
        </section>
      </main>
    `;

    this.background = this.root.querySelector("#background");
    this.chapter = this.root.querySelector("#chapter");
    this.clock = this.root.querySelector("#clock");
    this.status = this.root.querySelector("#status");
    this.speaker = this.root.querySelector("#speaker");
    this.message = this.root.querySelector("#message");
    this.choices = this.root.querySelector("#choices");
  }

  bindEvents() {
    this.root.addEventListener("click", (event) => {
      if (event.target.closest(".choice")) return;
      this.next();
    });

    window.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        this.next();
      }
    });
  }

  start() {
    this.index = 0;
    this.showCurrent();
  }

  next() {
    const current = this.scenario[this.index];
    if (!current) return;

    if (current.choices?.length) return;

    this.index += 1;
    if (this.index >= this.scenario.length) {
      this.showEnding();
      return;
    }
    this.showCurrent();
  }

  showCurrent() {
    const node = this.scenario[this.index];
    if (!node) {
      this.showEnding();
      return;
    }

    this.chapter.textContent = node.chapter ?? "序章";
    this.clock.textContent = node.time ?? "";
    this.background.dataset.scene = node.background ?? "default";

    if (node.setFlags) {
      Object.assign(this.state.flags, node.setFlags);
    }

    if (node.setState) {
      Object.assign(this.state, node.setState);
    }

    this.status.textContent = node.status ?? "";
    this.speaker.textContent = node.speaker ?? "";
    this.message.textContent = node.text ?? "";

    this.choices.replaceChildren();

    if (node.choices?.length) {
      for (const choice of node.choices) {
        const button = document.createElement("button");
        button.className = "choice";
        button.type = "button";
        button.textContent = choice.label;
        button.addEventListener("click", () => this.selectChoice(choice));
        this.choices.appendChild(button);
      }
    }
  }

  selectChoice(choice) {
    if (choice.setFlags) {
      Object.assign(this.state.flags, choice.setFlags);
    }

    if (choice.setState) {
      Object.assign(this.state, choice.setState);
    }

    this.state.history.push({
      index: this.index,
      choice: choice.label
    });

    if (typeof choice.next === "number") {
      this.index = choice.next;
      this.showCurrent();
      return;
    }

    this.next();
  }

  showEnding() {
    this.speaker.textContent = "END";
    this.message.textContent =
      "土台シナリオの終端です。ここから本編の分岐・演出・戦闘などを追加できます。";
    this.choices.replaceChildren();
  }
}
