import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { UAParser } from "ua-parser-js";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

type DeviceInfoType = {
  device_name: string;
  device_type: string;
  os: string;
  browser: string;
  ip_address: string;
  fingerprint?: string;
};

type DeviceState = {
  device: DeviceInfoType | null;
  fetchDeviceInfo: () => void;
};

export const useDeviceStore = create<DeviceState>()(
  devtools((set) => ({
    device: null,
    fetchDeviceInfo: async () => {
      const parser = new UAParser();
      const result = parser.getResult();

      // Get fingerprint
      const fp = await FingerprintJS.load();
      const fingerprintResult = await fp.get();

      let ipAddress = "Unknown";
      try {
        const res = await fetch("https://api.ipify.org?format=json");
        const data: { ip: string } = await res.json();
        ipAddress = data.ip;
      } catch (error) {
        console.error("Error fetching IP address:", error);
      }

      const info: DeviceInfoType = {
        browser: result.browser.name || "Unknown",
        device_name: result.device.vendor || "Unknown",
        device_type: result.device.model || "Unknown",
        os: result.os.name || "Unknown",
        ip_address: ipAddress,
        fingerprint: fingerprintResult.visitorId || "Unknown",
      };

      set({ device: info });
    },
  }))
);
