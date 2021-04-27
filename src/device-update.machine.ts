import { createMachine, sendParent } from "xstate";
import { bleDeviceSchema, bleDeviceModel } from "./device-update.machine.types";

/**
 * A "modern" sleep statement.
 *
 * @param ms The number of milliseconds to wait.
 */
export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const forwardEventToParent = sendParent((_, event) => event);

export const bleDeviceMachine = createMachine<typeof bleDeviceModel>(
  {
    schema: bleDeviceSchema,
    id: "bleDeviceMachine",
    // context: bleDeviceModel.initialContext,
    initial: "scanning",
    on: {
      startScan: "scanning"
    },
    states: {
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
          onDone: "monitoring",
          onError: "failed.connectToBleDeviceFailed"
        }
      },
      monitoring: {
        meta: {
          description: "Connected to BLE device "
        },
        on: {
          receiveDeviceJson: {
            actions: forwardEventToParent
          },
          sendDeviceJson: {
            actions: forwardEventToParent
          }
        }
      },
      failed: {
        meta: {
          description: "BLE Device connection failure has been detected"
        },
        states: {
          scanForBleDeviceNotFound: { entry: "exitWithScanDeviceNotFound" },
          connectToBleDeviceFailed: {}
        }
      }
    }
  },
  {
    actions: {
      // startScanning:
      // desiredStateReported: sendParent(''{}),
      // exitWithScanDeviceNotFound: assign({
      //   // deviceId: (context, event) => event.type
      // })
    },
    services: {
      connectToBleDevice: async () => {
        await delay(5000);
      },
      // bleStartBootloader: async () => {
      //   // ble.deviceStartUpdateBootloader();
      // },
      scanForBleDevice: async () => {
        await delay(5000);
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
