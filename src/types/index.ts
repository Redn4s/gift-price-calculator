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
