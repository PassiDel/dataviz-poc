import female from '@/assets/icons/weiblich.svg';
import male from '@/assets/icons/männlich.svg';
import diverse from '@/assets/icons/divers.svg';
import all from '@/assets/icons/alle.svg';
import { createIconsConfig } from 'vuestic-ui';

const iconMap: Record<string, string> = { female, male, diverse, all };

export const icons = createIconsConfig({
  fonts: [
    {
      name: 'custom-{name}',
      resolve({ name }) {
        if (!(name in iconMap)) {
          return {};
        }
        return {
          tag: 'img',
          class: 'inline',
          attrs: {
            src: iconMap[name]
          }
        };
      }
    }
  ]
});
