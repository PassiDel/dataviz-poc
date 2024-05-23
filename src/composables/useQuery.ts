import { useRoute, useRouter } from 'vue-router';
import { ref, watch } from 'vue';

export function useQuery() {
  const route = useRoute();
  const router = useRouter();

  const selectedLeft = ref(0);
  if (
    route.query.left &&
    typeof route.query.left === 'string' &&
    !isNaN(parseInt(route.query.left))
  ) {
    selectedLeft.value = parseInt(route.query.left);
  }

  const selectedRight = ref(0);
  if (
    route.query.right &&
    typeof route.query.right === 'string' &&
    !isNaN(parseInt(route.query.right))
  ) {
    selectedRight.value = parseInt(route.query.right);
  }

  function updateQuery() {
    router.push({
      path: route.path,
      query: { left: selectedLeft.value, right: selectedRight.value }
    });
  }
  watch(selectedLeft, updateQuery);
  watch(selectedRight, updateQuery);

  return { selectedLeft, selectedRight };
}
