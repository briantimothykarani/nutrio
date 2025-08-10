/*
import React, { createContext, useContext, useState } from "react";

const defaultValues = {
    athlete: "",
    bday: "",

    gender: "",
    height: "",
    about_athlete: "",
};

type AthleteFormType = typeof defaultValues;

interface AthleteFormContextType {
    values: AthleteFormType;
    updateValues: (newData: Partial<AthleteFormType>) => void;
}

const AthleteFormContext = createContext<AthleteFormContextType | null>(null);

export function AthleteFormProvider({ children }: { children: React.ReactNode }) {
    const [values, setValues] = useState<AthleteFormType>(defaultValues);

    const updateValues = (newData: Partial<AthleteFormType>) =>
        setValues(prev => ({ ...prev, ...newData }));

    return (
        <AthleteFormContext.Provider value={{ values, updateValues }}>
            {children}
        </AthleteFormContext.Provider>
    );
}

export const useAthleteForm = () => {
    const context = useContext(AthleteFormContext);
    if (!context) {
        throw new Error("useAthleteForm must be used within a AthleteFormProvider");
    }
    return context;
};
*/
import React, { createContext, useContext, useState } from "react";

interface AthleteValues {
  athlete: string;
  bday: string;
  weight: string;
  height: string;
  sex: string;
  about_athlete: string;
}

const defaultValues: AthleteValues = {
  athlete: "",
  bday: "",
  weight: "",
  height: "",
  sex: "",
  about_athlete: "",
};

const AthleteFormContext = createContext<{
  values: AthleteValues;
  updateValues: (v: Partial<AthleteValues>) => void;
} | null>(null);

export const AthleteFormProvider = ({ children }: { children: React.ReactNode }) => {
  const [values, setValues] = useState(defaultValues);
  const updateValues = (v: Partial<AthleteValues>) => setValues(prev => ({ ...prev, ...v }));
  return <AthleteFormContext.Provider value={{ values, updateValues }}>{children}</AthleteFormContext.Provider>;
};

export const useAthleteForm = () => {
  const ctx = useContext(AthleteFormContext);
  if (!ctx) throw new Error("Must be used inside AthleteFormProvider");
  return ctx;
};