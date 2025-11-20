export interface IParameters {
  factors: Record<string, IParameter>;
}

export interface IParameter {
  label: string;
  options: IParameterOption[];
}

export interface IParameterOption {
  key: string;
  value: string;
  description?: string;
  factor: number;
}

export interface SavedConfiguration {
  id: string;
  name: string;
  baseAmount: number;
  selectedValues: Record<string, string>;
  finalAmount: number;
  createdAt: string;
}
