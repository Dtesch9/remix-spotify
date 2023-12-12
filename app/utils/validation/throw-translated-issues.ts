import type { Issues } from 'valibot';
import { translateIssues } from './translate-issues';

export function throwTranslatedIssues(fromSchema: string, issues: Issues): never {
  throw {
    schema: fromSchema,
    issues: translateIssues(issues),
  };
}
