import ServiceDetail, {
  serviceMetadata,
} from "@/components/marketing/ServiceDetail";

export const metadata = serviceMetadata("mobile-app-development");

export default function Page() {
  return <ServiceDetail slug="mobile-app-development" />;
}
