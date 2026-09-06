import ServiceDetail, {
  serviceMetadata,
} from "@/components/marketing/ServiceDetail";

export const metadata = serviceMetadata("ads-campaign");

export default function Page() {
  return <ServiceDetail slug="ads-campaign" />;
}
