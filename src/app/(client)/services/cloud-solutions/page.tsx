import ServiceDetail, {
  serviceMetadata,
} from "@/components/marketing/ServiceDetail";

export const metadata = serviceMetadata("cloud-solutions");

export default function Page() {
  return <ServiceDetail slug="cloud-solutions" />;
}
