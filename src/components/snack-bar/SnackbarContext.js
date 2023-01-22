import * as React from "react";
import { Snackbar } from "react-native-paper";

export const SnackbarContext = React.createContext();

export const SnackbarProvider = ({ children }) => {
  const [message, setMessage] = React.useState("");
  const showSnackbarMessage = setMessage;

  return (
    <SnackbarContext.Provider value={showSnackbarMessage}>
      {children}

      <Snackbar
        duration={2000}
        visible={message}
        onDismiss={() => setMessage("")}
      >
        {message}
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
