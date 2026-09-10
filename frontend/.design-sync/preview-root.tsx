// The preview wrapper (cfg.provider). Two jobs:
//
// 1. LanguageProvider — nearly every component calls useTranslation().
// 2. Freeze-proof animations. package-capture pins the browser clock
//    (page.clock.setFixedTime), so framer-motion's timeline never advances and
//    every `initial={{ opacity: 0 }}` component screenshots blank. Setting
//    MotionGlobalConfig.skipAnimations makes motion jump straight to its target
//    values, which is the state a static card should show anyway.
//
// This wrapper is preview-only: designs built with the DS render the real
// components directly, animations intact.
import { MotionGlobalConfig } from 'framer-motion';
import { LanguageProvider } from '@/data/i18n';

MotionGlobalConfig.skipAnimations = true;

export const DesignPreviewRoot = ({ children }: { children: React.ReactNode }) => (
  <LanguageProvider>{children}</LanguageProvider>
);
