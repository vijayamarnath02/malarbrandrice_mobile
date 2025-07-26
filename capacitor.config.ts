import type { CapacitorConfig } from '@capacitor/cli';
import { KeyboardResize, KeyboardStyle } from '@capacitor/keyboard';
const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'malarbrand',
  webDir: 'www',
  plugins: {
    Keyboard: {
      resize: KeyboardResize.Body,
      style: KeyboardStyle.Light,
      resizeOnFullScreen: true,
    }
  }
};

export default config;
