import { createSchema } from "xstate";
import { createModel } from "xstate/lib/model";

export const bleDeviceSchema = {
  context: createSchema<{ deviceId: string }>()
};

export const bleDeviceModel = createModel(
  // initial context
  {
    // deviceId: undefined
  },
  // creators (just events for now)
  {
    events: {
      // updateName: (value: string) => ({ value }),
      // updateAge: (value: number) => ({ value }),
      // anotherEvent: () => ({}), // no payload
      // updateVolume: (value: string) => ({ value }),
      reportedStateRead: (reportedState: any) => ({ reportedState }),
      desiredStateWritten: (desiredState: any) => ({ desiredState }),
      startScan: () => ({})
    }
  }
);
