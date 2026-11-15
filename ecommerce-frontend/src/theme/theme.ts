export const themeColors = {
  primary: "#ec552b",
  secondary: "#1A1A1A",
  accent: "#F4EDE4",

  bgMain: "#FAF7F5",
  bgSecondary: "#F4EDE4",
  bgCard: "#FFFFFF",

  textPrimary: "#1A1A1A",
  textSecondary: "#6B6B6B",
  textInverse: "#FFFFFF",

  success: "#81B29A",
  border: "#E8E1DA",
};

export const applyThemeVariables = () => {
  const root = document.documentElement;

  Object.entries(themeColors).forEach(([key, value]) => {
    const cssVariable = key.replace(
      /[A-Z]/g,
      (letter) => `-${letter.toLowerCase()}`,
    );

    root.style.setProperty(`--color-${cssVariable}`, value);
  });
};
