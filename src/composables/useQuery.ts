import { useRoute, useRouter } from 'vue-router';
import { type Ref, ref, watch } from 'vue';

export function useQuery<Keys extends Record<string, string | number>>(
  key: Keys
): { [k in keyof Keys]: Ref<Keys[k]> } {
  const route = useRoute();
  const router = useRouter();

  const selected = Object.fromEntries(
    Object.entries(key).map(([k, v]) => [k, ref(v)])
  ) as { [k in keyof Keys]: Ref<Keys[k]> };

  Object.entries(key).forEach(([_k, v]) => {
    const k = _k as keyof Keys;

    if (
      _k in route.query &&
      typeof route.query[_k] === 'string' &&
      (typeof v === 'number'
        ? !isNaN(parseInt(route.query[_k] as string))
        : true)
    ) {
      selected[k].value = (
        typeof v === 'number'
          ? parseInt(route.query[_k] as string)
          : route.query[_k]
      ) as Keys[typeof k];
    }
    watch(selected[k], updateQuery);
  });

  async function updateQuery() {
    return router.push({
      path: route.path,
      query: Object.fromEntries(
        Object.entries(selected)
          .map(([k, v]) => [k, v.value])
          .filter((e) => !!e[1])
      )
    });
  }

  return selected;
}
