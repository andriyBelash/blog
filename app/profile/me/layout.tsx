import LinkTabs from "@/app/components/ui/tabs/LinkTabs";

import { PROFILE_TABS } from "@/src/lib/constants";

export default async function ProfileMeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="wrapper h-full page">
        <div className="h-full pb-8 pt-8">
          <LinkTabs tabs={PROFILE_TABS} basePath="/profile/me" />
          <div className="mt-8">
            { children }
          </div>
        </div>
    </div>
  )
}