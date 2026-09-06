import ServiceDetail, {
  serviceMetadata,
} from "@/components/marketing/ServiceDetail";

export const metadata = serviceMetadata("social-media-marketing");

export default function Page() {
  return <ServiceDetail slug="social-media-marketing" />;
}
