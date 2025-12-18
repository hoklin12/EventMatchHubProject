// app/event/publish/page.tsx

import EventCreationWizard from "../../EventCreationWizard";
import PublishSettings from "../PublishSettings";


export default function publishPage() {
  return <PublishSettings currentStep="additional" />;
}