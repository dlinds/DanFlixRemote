import StorybookUIRoot from "./.ondevice/Storybook"
import Remote from "./components/remote/screens/Remote"
import { SafeAreaProvider } from "react-native-safe-area-context"
const App = () => {
  return (
    <SafeAreaProvider>
      <Remote />
    </SafeAreaProvider>
  )
}

const LOAD_STORYBOOK = true

export default LOAD_STORYBOOK ? StorybookUIRoot : App