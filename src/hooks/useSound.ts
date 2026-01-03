import { useCallback } from 'react';

const SOUND_URL = '/sound/click.mp3';

export const useSound = () => {
  const playClick = useCallback(() => {
    try {
      const audio = new Audio(SOUND_URL);
      audio.volume = 0.4;
      audio.play().catch((e) => console.log('Need user interaction to play sound:', e));
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  }, []);
  return { playClick };
};
