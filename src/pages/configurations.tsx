import { useState, useEffect, useRef } from "react";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  useDraggable,
} from "@heroui/modal";

import { h1 } from "@/components/typography";
import { DefaultLayout } from "@/layouts/default";
import { SavedConfiguration } from "@/types";
import { getAllConfigurations, deleteConfiguration } from "@/utils/storage";
import { PARAMETERS } from "@/data/parameters";

export const ConfigurationsPage = () => {
  const [configurations, setConfigurations] = useState<SavedConfiguration[]>(
    [],
  );
  const [configToDelete, setConfigToDelete] = useState<string | null>(null);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const targetRef = useRef(null);
  const { moveProps } = useDraggable({ targetRef, isDisabled: !isOpen });

  useEffect(() => {
    setConfigurations(getAllConfigurations());
  }, []);

  const handleDeleteClick = (id: string) => {
    setConfigToDelete(id);
    onOpen();
  };

  const handleConfirmDelete = () => {
    if (configToDelete) {
      deleteConfiguration(configToDelete);
      setConfigurations(getAllConfigurations());
      setConfigToDelete(null);
      onClose();
    }
  };

  const handleCancelDelete = () => {
    setConfigToDelete(null);
    onClose();
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("nl-NL", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getParameterValue = (
    parameterKey: string,
    selectedOptionKey: string,
  ): string => {
    const parameter = PARAMETERS.factors[parameterKey];
    if (!parameter) return selectedOptionKey;

    const option = parameter.options.find(
      ({ key }) => key === selectedOptionKey,
    );
    return option?.value || selectedOptionKey;
  };

  return (
    <>
      <Modal ref={targetRef} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader {...moveProps} className="flex flex-col gap-1">
                Configuratie verwijderen?
              </ModalHeader>
              <ModalBody>
                <p>
                  Weet je zeker dat je deze configuratie wilt verwijderen? Deze
                  actie kan niet ongedaan worden gemaakt.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onPress={handleConfirmDelete}>
                  Verwijderen
                </Button>
                <Button variant="bordered" onPress={handleCancelDelete}>
                  Annuleren
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <DefaultLayout>
        <section className="pb-8 md:pb-10">
          <div className="flex flex-col items-center gap-2 md:gap-4">
            <h1 className={h1()}>Opgeslagen Configuraties</h1>
          </div>
        </section>

        <section>
          {configurations.length === 0 ? (
            <Card>
              <CardBody className="flex flex-col items-center justify-center py-12">
                <p className="text-lg text-gray-600">
                  Je hebt nog geen configuraties opgeslagen.
                </p>
              </CardBody>
            </Card>
          ) : (
            <div className="flex flex-col gap-6">
              {configurations.map((config) => (
                <Card key={config.id}>
                  <CardHeader className="flex flex-col items-start gap-2 pb-4">
                    <div className="flex flex-row justify-between items-start w-full">
                      <div className="flex flex-col gap-1">
                        <h3 className="text-xl font-semibold">
                          {config.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Aangemaakt op {formatDate(config.createdAt)}
                        </p>
                      </div>
                      <Button
                        color="danger"
                        size="sm"
                        variant="light"
                        onPress={() => handleDeleteClick(config.id)}
                      >
                        Verwijderen
                      </Button>
                    </div>
                  </CardHeader>
                  <Divider />
                  <CardBody className="flex flex-col gap-6 pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-semibold text-gray-600 mb-1">
                          Basisbedrag
                        </p>
                        <p className="text-lg">€{config.baseAmount}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-600 mb-1">
                          Aanbevolen bedrag
                        </p>
                        <p className="text-lg font-semibold">
                          €{config.finalAmount}
                        </p>
                      </div>
                    </div>

                    <Divider />

                    <div className="flex flex-col gap-4">
                      <h4 className="text-lg font-semibold">Parameters</h4>
                      <div className="flex flex-col gap-3">
                        {Object.entries(config.selectedValues).map(
                          ([parameterKey, selectedOptionKey]) => {
                            const parameter =
                              PARAMETERS.factors[parameterKey];
                            if (!parameter) return null;

                            return (
                              <div
                                key={parameterKey}
                                className="flex flex-col gap-1"
                              >
                                <p className="text-sm font-semibold text-gray-600">
                                  {parameter.label}
                                </p>
                                <p className="text-base">
                                  {getParameterValue(
                                    parameterKey,
                                    selectedOptionKey,
                                  )}
                                </p>
                              </div>
                            );
                          },
                        )}
                        {Object.keys(config.selectedValues).length === 0 && (
                          <p className="text-sm text-gray-600">
                            Geen parameters geselecteerd
                          </p>
                        )}
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          )}
        </section>
      </DefaultLayout>
    </>
  );
};
