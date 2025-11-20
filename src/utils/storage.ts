import { SavedConfiguration } from "@/types";

const STORAGE_KEY = "gift-calculator-configurations";

export const saveConfiguration = (
  config: Omit<SavedConfiguration, "id" | "createdAt">,
): void => {
  const configurations = getAllConfigurations();
  const newConfig: SavedConfiguration = {
    ...config,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  configurations.push(newConfig);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(configurations));
};

export const getAllConfigurations = (): SavedConfiguration[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return [];
    }
    return JSON.parse(stored) as SavedConfiguration[];
  } catch (error) {
    console.error("Error reading configurations from localStorage:", error);
    return [];
  }
};

export const deleteConfiguration = (id: string): void => {
  const configurations = getAllConfigurations();
  const filtered = configurations.filter((config) => config.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};
