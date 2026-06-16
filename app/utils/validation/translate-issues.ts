import type { GenericIssue } from 'valibot';

export function translateIssues(issues: GenericIssue[]) {
  return issues.flatMap(({ path, type }) =>
    path?.map((item) => ({ key: item.key, received: item.value, expect: type })),
  );
}
