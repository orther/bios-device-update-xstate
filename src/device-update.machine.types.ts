// import { createSchema } from "xstate";
import { createModel } from "xstate/lib/model";

export const bleDeviceSchema = {
  // context: createSchema<{ deviceIotName: string }>()
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
      bleConnectionError: () => ({}),
      bleConnectionLost: () => ({}),
      deviceJsonReceived: (json: any) => ({ json }),
      deviceJsonSend: (json: any) => ({ json }),
      startScan: () => ({})
    }
  }
);
