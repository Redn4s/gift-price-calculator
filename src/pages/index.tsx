import { useState, useMemo } from "react";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import { Input } from "@heroui/input";

import { h1, intro } from "@/components/typography";
import { DefaultLayout } from "@/layouts/default";
import { PARAMETERS } from "@/data/parameters";

export const IndexPage = () => {
  const [baseAmount, setBaseAmount] = useState(10);
  const factors = PARAMETERS.factors;

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
          ({ key }) => key === selectedOptionKey,
        );

        if (selectedOption) {
          totalFactor *= selectedOption.factor;
        }
      },
    );

    return Math.round(baseAmount * totalFactor);
  }, [selectedValues, baseAmount, factors]);

  // Handle button selection changes
  const handleButtonPress = (parameterKey: string, value: string) => {
    setSelectedValues((prev) => ({
      ...prev,
      [parameterKey]: value,
    }));
  };

  return (
    <DefaultLayout>
      <section className="pb-8 md:pb-10">
        <div className="flex flex-col items-center gap-2 md:gap-4">
          <h1 className={h1()}>Wat Geef Ik?</h1>
          <p className={intro()}>Vind het juiste bedrag voor elk cadeau. 🎁</p>
        </div>
      </section>

      <section>
        <Card>
          <CardBody className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold">Basisbedrag</h3>
              <Input
                className="max-w-xs"
                description="Dit is het startbedrag waar alle factoren op worden toegepast."
                label="Basisbedrag (€)"
                min="0"
                placeholder="Voer een bedrag in"
                step="1"
                type="number"
                value={baseAmount.toString()}
                onChange={(e) => setBaseAmount(Number(e.target.value) || 0)}
              />
            </div>

            {Object.entries(factors).map(([key, value]) => (
              <div key={key} className="flex flex-col gap-4">
                <h3 className="text-lg font-semibold">{value.label}</h3>
                <div className="flex flex-wrap gap-2">
                  {value.options.map(
                    ({ key: optionKey, value: optionValue }) => (
                      <Button
                        key={optionKey}
                        className="min-w-fit"
                        color="primary"
                        size="sm"
                        variant={
                          selectedValues?.[key] === optionKey
                            ? "solid"
                            : "bordered"
                        }
                        onPress={() => handleButtonPress(key, optionKey)}
                      >
                        {optionValue}
                      </Button>
                    ),
                  )}
                </div>
                {value.options.some(({ description }) => description) && (
                  <div className="text-sm text-gray-600">
                    {value.options
                      .filter((option) => option.description)
                      .map(({ key, value, description }) => (
                        <div key={key}>
                          <strong>{value}:</strong> {description}
                        </div>
                      ))}
                  </div>
                )}
              </div>
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
