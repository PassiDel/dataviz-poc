import { useRoute, useRouter } from 'vue-router';
import { ref, watch } from 'vue';

export function useQuery() {
  const route = useRoute();
  const router = useRouter();

  const selectedLeft = ref('');
  if (route.query.left && typeof route.query.left === 'string') {
    selectedLeft.value = route.query.left;
  }

  const selectedRight = ref('');
  if (route.query.right && typeof route.query.right === 'string') {
    selectedRight.value = route.query.right;
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
