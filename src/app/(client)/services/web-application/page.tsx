import ServiceDetail, {
  serviceMetadata,
} from "@/components/marketing/ServiceDetail";

export const metadata = serviceMetadata("web-application");

export default function Page() {
  return <ServiceDetail slug="web-application" />;
}
