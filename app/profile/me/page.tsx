import { Locale } from "@/lib/internationalization/i18n";

export default async function ProfileMePage({ params: { lang } }: { params: { lang: Locale } }) {
  return (
    <div>
      <h1>Profile Me Page</h1>
    </div>
  )
}