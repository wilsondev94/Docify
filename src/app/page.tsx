import Link from "next/link";

export default function page() {
  return (
    <div>
      Click{" "}
      <Link href="/documents/123" className="text-blue-700 underline">
        {" "}
        here{" "}
      </Link>{" "}
      to go to document ID page
    </div>
  );
}
