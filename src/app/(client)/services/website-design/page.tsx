import ServiceDetail, {
  serviceMetadata,
} from "@/components/marketing/ServiceDetail";

export const metadata = serviceMetadata("website-design");

export default function Page() {
  return <ServiceDetail slug="website-design" />;
}
