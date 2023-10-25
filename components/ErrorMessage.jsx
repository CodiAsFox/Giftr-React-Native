import React from "react";

import { Alert, AlertIcon, AlertText, InfoIcon } from "@gluestack-ui/themed";

export default function ErrorMessage({ message, type }) {
  return (
    <Alert mx="$2.5" action={type} variant="accent">
      <AlertIcon as={InfoIcon} mr="$3" />
      <AlertText>{message}</AlertText>
    </Alert>
  );
}
