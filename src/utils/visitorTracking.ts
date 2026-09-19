import { supabase } from '@/lib/supabase';

const BROWSER_ID_KEY = 'midnight_candle_browser_id';

const getBrowserId = (): string => {
  const existingBrowserId = localStorage.getItem(BROWSER_ID_KEY);

  if (existingBrowserId) {
    return existingBrowserId;
  }

  const browserId = crypto.randomUUID();

  localStorage.setItem(BROWSER_ID_KEY, browserId);

  return browserId;
};

export const recordVisitorActivity = async (): Promise<void> => {
  if (!supabase) return;

  const browserId = getBrowserId();

  const { error } = await supabase.rpc('register_browser', {
    p_browser_id: browserId,
  });

  if (error) {
    console.error('Failed to register visitor:', error);
  }
};

export const updateVisitorActivity = async (): Promise<void> => {
  if (!supabase) return;

  const browserId = getBrowserId();

  const { error } = await supabase.rpc('heartbeat_browser', {
    p_browser_id: browserId,
  });

  if (error) {
    console.error('Failed to update visitor activity:', error);
  }
};
