import { supabase } from '@/lib/supabase';

const BROWSER_ID_KEY = 'midnight_candle_browser_id';
const USERNAME_KEY = 'midnight_candle_username';

export const getBrowserId = (): string => {
  const existingBrowserId = localStorage.getItem(BROWSER_ID_KEY);

  if (existingBrowserId) {
    return existingBrowserId;
  }

  const browserId = crypto.randomUUID();

  localStorage.setItem(BROWSER_ID_KEY, browserId);

  return browserId;
};

export const getStoredUsername = (): string | null => {
  return localStorage.getItem(USERNAME_KEY);
};

export const recordVisitorActivity = async (): Promise<string | null> => {
  if (!supabase) return null;

  const browserId = getBrowserId();

  const { data, error } = await supabase.rpc('register_browser', {
    p_browser_id: browserId,
  });

  if (error) {
    console.error('Failed to register visitor:', error);
    return null;
  }

  const username = data ?? null;

  if (username) {
    localStorage.setItem(USERNAME_KEY, username);
  }

  return username;
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

export const getUsername = async (): Promise<string | null> => {
  const storedUsername = getStoredUsername();

  if (storedUsername) {
    return storedUsername;
  }

  if (!supabase) {
    return null;
  }

  const browserId = getBrowserId();

  const { data, error } = await supabase.rpc('get_username', {
    p_browser_id: browserId,
  });

  if (error) {
    console.error('Failed to load username:', error);
    return null;
  }

  const username = data ?? null;

  if (username) {
    localStorage.setItem(USERNAME_KEY, username);
  }

  return username;
};

export const updateUsername = async (username: string): Promise<boolean> => {
  if (!supabase) return false;

  const browserId = getBrowserId();
  const trimmedUsername = username.trim();

  if (!trimmedUsername) {
    return false;
  }

  const { error } = await supabase.rpc('update_username', {
    p_browser_id: browserId,
    p_username: trimmedUsername,
  });

  if (error) {
    console.error('Failed to update username:', error);
    return false;
  }

  // Keep localStorage in sync with Supabase
  localStorage.setItem('midnight_candle_username', trimmedUsername);

  return true;
};

export const submitFeedback = async (feedback: string): Promise<boolean> => {
  if (!supabase) return false;

  const trimmedFeedback = feedback.trim();

  if (!trimmedFeedback) {
    return false;
  }

  const browserId = getBrowserId();
  const username = getStoredUsername();

  if (!username) {
    console.error('Cannot submit feedback without a username');
    return false;
  }

  const { error } = await supabase.rpc('submit_feedback', {
    p_browser_id: browserId,
    p_username: username,
    p_feedback: trimmedFeedback,
  });

  if (error) {
    console.error('Failed to submit feedback:', error);
    return false;
  }

  return true;
};
