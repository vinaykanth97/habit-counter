import dynamic from "next/dynamic";

const DynamicCards = dynamic(() => import('../components/OverviewCards'), {
  loading: () => <p>Loading...</p>,
  ssr: false
});
export default function Home() {

  return (
    <DynamicCards />
  )
}