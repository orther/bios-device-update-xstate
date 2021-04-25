import { createSchema } from "xstate";
import { createModel } from "xstate/lib/model";

export const mySchema = {
  context: createSchema<{ volume: number }>()
};

export const myModel = createModel(
  {
    volume: 3
  },
  {
    events: {
      inputChanged: (payload: number) => ({ payload })
    }
  }
);
