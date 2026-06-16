import type { GenericIssue } from 'valibot';
import { translateIssues } from './translate-issues';

export function throwTranslatedIssues(fromSchema: string, issues: GenericIssue[]): never {
  throw {
    schema: fromSchema,
    issues: translateIssues(issues),
  };
}
