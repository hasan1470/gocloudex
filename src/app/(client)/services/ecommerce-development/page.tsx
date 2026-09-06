import ServiceDetail, {
  serviceMetadata,
} from "@/components/marketing/ServiceDetail";

export const metadata = serviceMetadata("ecommerce-development");

export default function Page() {
  return <ServiceDetail slug="ecommerce-development" />;
}
