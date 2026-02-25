import { LenisProvider } from "./LenisProvider";

export default function AppProviders({ children }) {
  return <LenisProvider>{children}</LenisProvider>;
}
