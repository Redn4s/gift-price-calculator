import { useState, useMemo, useRef } from "react";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import { Input } from "@heroui/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  useDraggable,
} from "@heroui/modal";

import { h1, intro } from "@/components/typography";
import { DefaultLayout } from "@/layouts/default";
import { PARAMETERS } from "@/data/parameters";
import { saveConfiguration } from "@/utils/storage";

export const IndexPage = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const targetRef = useRef(null);
  const { moveProps } = useDraggable({ targetRef, isDisabled: !isOpen });
  const [baseAmount, setBaseAmount] = useState(10);
  const factors = PARAMETERS.factors;
  const [name, setName] = useState("");

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

  const handleButtonPress = (parameterKey: string, value: string) => {
    setSelectedValues((prev) => ({
      ...prev,
      [parameterKey]: value,
    }));
  };

  const onPressSave = () => {
    if (!name.trim()) {
      return;
    }

    saveConfiguration({
      name: name.trim(),
      baseAmount,
      selectedValues: selectedValues || {},
      finalAmount,
    });

    setName("");
    onClose();
  };

  const onPressClose = () => {
    onClose();
    setName("");
  };

  const onPressReset = () => {
    setSelectedValues(undefined);
    setBaseAmount(10);
  };

  return (
    <>
      <Modal ref={targetRef} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader {...moveProps} className="flex flex-col gap-1">
                Voor wie is dit cadeau?
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Naam"
                  placeholder="Voer een naam in"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onPressSave}>
                  Opslaan
                </Button>
                <Button variant="bordered" onPress={onPressClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <DefaultLayout>
        <section className="pb-8 md:pb-10">
          <div className="flex flex-col items-center gap-2 md:gap-4">
            <h1 className={h1()}>Wat Geef Ik?</h1>
            <h2 className={intro()}>
              Vind het juiste bedrag voor elk cadeau. 🎁
            </h2>
          </div>
        </section>

        <section>
          <Card>
            <CardBody className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <h3 className="text-lg font-semibold">Basisbedrag</h3>
                <Input
                  className="w-full"
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
              <div className="flex flex-col items-center w-full gap-6">
                <div className="text-center">
                  <p className="text-lg font-semibold">
                    Aanbevolen bedrag: €{finalAmount}
                  </p>

                  <p className="text-sm text-gray-600 mt-1">
                    Gebaseerd op een basisbedrag van €{baseAmount} en je
                    geselecteerde factoren.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <Button
                    className="w-full sm:w-auto"
                    color="primary"
                    size="lg"
                    onPress={onOpen}
                  >
                    Opslaan
                  </Button>
                  <Button
                    className="w-full sm:w-auto"
                    size="lg"
                    variant="bordered"
                    onPress={() => onPressReset()}
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </CardFooter>
          </Card>
        </section>
      </DefaultLayout>
    </>
  );
};
