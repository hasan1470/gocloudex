import ServiceDetail, {
  serviceMetadata,
} from "@/components/marketing/ServiceDetail";

export const metadata = serviceMetadata("seo");

export default function Page() {
  return <ServiceDetail slug="seo" />;
}
