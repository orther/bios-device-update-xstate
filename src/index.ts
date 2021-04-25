import { Machine, interpret } from "xstate";
import { inspect } from "@xstate/inspect";
import "./styles.css";

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

interface ToggleContext {
  count: number;
}

// Edit your machine(s) here
const machine = Machine<ToggleContext>({
  id: "machine",
  initial: "inactive",
  context: {
    count: 0
  },
  states: {
    inactive: {
      on: { TOGGLE: "active" }
    },
    active: {
      on: { TOGGLE: "inactive" }
    }
  }
});

// Edit your service(s) here
const service = interpret(machine, { devTools: true }).onTransition((state) => {
  console.log(state.value);
});

service.start();

service.send("TOGGLE");
service.send("TOGGLE");
