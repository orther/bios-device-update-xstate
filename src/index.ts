import {
  // Machine,
  interpret
} from "xstate";
import { inspect } from "@xstate/inspect";
import "./styles.css";
import { bleDeviceMachine } from "./device-update.machine";

inspect({
  url: "https://statecharts.io/inspect",
  iframe: false
});

document.getElementById("app").innerHTML = `
<section>
  <h1>XState TypeScript Example</h1>
  <div>
    Open the <strong>Console</strong> to view the machine output.
  </div>
</section>
`;

const service = interpret(bleDeviceMachine, {
  context: { deviceId: "12345" },
  devTools: true
}).onTransition((state) => {
  console.log(state.value);
});

service.start();

// service.send("TOGGLE");
// service.send("TOGGLE");
