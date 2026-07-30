import "./style.css";
import { NovelEngine } from "./engine/NovelEngine.js";
import { scenario } from "./data/scenario.js";

const app = document.querySelector("#app");
const engine = new NovelEngine(app, scenario);
engine.start();
