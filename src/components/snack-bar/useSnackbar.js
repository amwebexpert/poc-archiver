import React from "react";

import { SnackbarContext } from "./SnackbarContext";

export const useSnackbar = () => React.useContext(SnackbarContext);
