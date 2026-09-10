// Design-system bundle entry. The shim import must stay first: ES module
// evaluation order is what guarantees `process` exists before any component
// module body runs.
import './process-shim';

export * from '../src/components';
export * from '../src/components/terminal';
export { LanguageProvider, useTranslation } from '../src/data/i18n';
export { DesignPreviewRoot } from './preview-root';
