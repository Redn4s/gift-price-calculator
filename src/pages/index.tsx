import { useState, useMemo } from "react";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { RadioGroup, Radio } from "@heroui/radio";
import { Divider } from "@heroui/divider";

import { h1, intro } from "@/components/typography";
import { DefaultLayout } from "@/layouts/default";
import parameters from "@/data/parameters.json";

export const IndexPage = () => {
  const baseAmount = 15;
  const factors = parameters.factors as Record<
    string,
    {
      label: string;
      options: {
        key: string;
        value: string;
        description?: string;
        factor: number;
      }[];
    }
  >;

  // Initialize state with default values (first option for each parameter)
  const [selectedValues, setSelectedValues] =
    useState<Record<string, string>>();

  // Calculate final amount based on selected factors
  const finalAmount = useMemo(() => {
    let totalFactor = 1;

    if (!selectedValues) {
      return baseAmount;
    }

    Object.entries(selectedValues).forEach(
      ([parameterKey, selectedOptionKey]) => {
        const parameter = factors[parameterKey];
        const selectedOption = parameter.options.find(
          (option) => option.key === selectedOptionKey,
        );

        if (selectedOption) {
          totalFactor *= selectedOption.factor;
        }
      },
    );

    return Math.round(baseAmount * totalFactor);
  }, [selectedValues, baseAmount, factors]);

  // Handle radio button changes
  const handleRadioChange = (parameterKey: string, value: string) => {
    setSelectedValues((prev) => ({
      ...prev,
      [parameterKey]: value,
    }));
  };

  return (
    <DefaultLayout>
      <section className="py-8 md:py-10">
        <div className="flex flex-col items-center gap-2 md:gap-4">
          <h1 className={h1()}>Wat Geef Ik?</h1>
          <p className={intro()}>Vind het juiste bedrag voor elk cadeau. 🎁</p>
        </div>
      </section>

      <section>
        <Card>
          <CardBody className="flex flex-col gap-8">
            {Object.entries(factors).map(([key, value]) => (
              <RadioGroup
                key={key}
                label={value.label}
                orientation="horizontal"
                value={selectedValues?.[key] ?? undefined}
                onValueChange={(newValue) => handleRadioChange(key, newValue)}
              >
                {value.options.map(({ key, value, description }) => (
                  <Radio
                    key={key}
                    {...(description && { description })}
                    value={key}
                  >
                    {value}
                  </Radio>
                ))}
              </RadioGroup>
            ))}
          </CardBody>

          <Divider />

          <CardFooter>
            <div className="text-center w-full">
              <p className="text-lg font-semibold">
                Aanbevolen bedrag: €{finalAmount}
              </p>

              <p className="text-sm text-gray-600 mt-1">
                Gebaseerd op een basisbedrag van €{baseAmount} en je
                geselecteerde factoren.
              </p>
            </div>
          </CardFooter>
        </Card>
      </section>
    </DefaultLayout>
  );
};
