function debugMonde() {
  return process.env.DEBUG_MODE === "DEBUG_ON";
}

export const isDebugMode = debugMonde();
