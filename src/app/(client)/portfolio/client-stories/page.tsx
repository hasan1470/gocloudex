import { permanentRedirect } from "next/navigation";
export default function Page() {
  permanentRedirect("/portfolio?filter=client");
}
