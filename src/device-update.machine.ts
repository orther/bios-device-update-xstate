import {
  // assign,
  createMachine,
  sendParent
} from "xstate";
import { bleDeviceSchema, bleDeviceModel } from "./device-update.machine.types";

const forwardEventToParent = sendParent((_, event) => event);
// const sendReportedState = sendParent((context, event) => event)

// ({
//   type: event.type,
//   payload: event.payload,
// })

export const bleDeviceMachine = createMachine<typeof bleDeviceModel>(
  {
    schema: bleDeviceSchema,
    id: "bleDeviceMachine",
    context: bleDeviceModel.initialContext,
    initial: "idle",
    states: {
      idle: {
        // transient state => immediately moves to scanning
        on: {
          "": [
            { target: "scanning" }
            // { target: 'morning', cond: 'isBeforeNoon' },
          ]
        }
      },

      scanning: {
        meta: {
          description: "Scan for BLE device"
        },
        invoke: {
          src: "scanForBleDevice",
          onDone: {
            target: "connecting"
            // actions: "assignFoundBleDevicesToContext"
          },
          onError: "failed.scanForBleDeviceNotFound"
        }
      },
      connecting: {
        meta: {
          description: "Connect to BLE device"
        },
        invoke: {
          src: "connectToBleDevice",
          onDone: "connected",
          onError: "failed.connectToBleDeviceFailed"
        }
      },
      connected: {
        meta: {
          description: "Connected to BLE device "
        },
        on: {
          reportedStateRead: {
            actions: forwardEventToParent
          },
          desiredStateWritten: {
            actions: forwardEventToParent
          }
        }
      },
      failed: {
        meta: {
          description: "BLE Device connection failure has been detected"
        },
        // type: "final",
        on: {
          startScan: {
            target: "scanning"
          }
        },
        states: {
          scanForBleDeviceNotFound: {
            //  entry: "exitWithScanDeviceNotFound"
          },
          connectToBleDeviceFailed: {}
        }
      }
    }
  },
  {
    actions: {
      // desiredStateReported: sendParent(''{}),
      // exitWithScanDeviceNotFound: assign({
      //   deviceId: (context, event) => event.type
      // })
    },
    services: {
      connectToBleDevice: async () => {
        // const bleDevice: BleDevice = ble.getDeviceScanFoundDevice(
        //   device.iotName
        // );
        // log("we Need to connect", { bleDeviceId: bleDevice.id });
        // // log("a - ble.managerDeviceConnectStatus", ble.managerDeviceConnectStatus)
        // if (
        //   ble.managerDeviceConnectStatus !==
        //   BleManagerDeviceConnectStatus.Connected
        // ) {
        //   await ble.managerDeviceConnect(bleDevice.id);
        // }
        return true;
      },
      bleStartBootloader: async () => {
        // ble.deviceStartUpdateBootloader();
      },
      scanForBleDevice: async () => {
        // const bleDevice = await ble.scanForDevice(device.iotName, 30000);
        // if (ble.managerDeviceScanStatus === BleManagerDeviceScanStatus.Error) {
        //   throw new Error("device scan error");
        // }
        // if (!bleDevice) {
        //   throw new Error("device not found");
        // }
      }

      // downloadRelease: async () => {
      //   await deployEnv.firmwareRelease.loadFirmware();
      //   await delay(5000); // 5 seconds
      //   return deployEnv.firmwareRelease.snapshot;
      // },
      // exitUpdate: async () => {
      //   goBack();
      // }
    }
  }
);
