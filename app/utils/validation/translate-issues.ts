import type { Issues } from 'valibot';

export function translateIssues(issues: Issues) {
  return issues.flatMap(
    ({ path, validation }) => path?.map((item) => ({ key: item.key, received: item.value, expect: validation })),
  );
}
