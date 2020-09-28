import React, { useRef, useState } from "react";
import {
  IonApp,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonLabel,
  IonRow,
  IonAlert,
} from "@ionic/react";

import BmiControls from "./components/BmiControls";
import BmiResult from "./components/BmiResult";
import BmiToolbar from "./components/BmiToolbar";
import InputControl from "./components/InputControls";
import Input from "./components/Input";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

const App: React.FC = () => {
  const [calculatedBmi, setCalculatedBmi] = useState<number>();
  const [error, setError] = useState<string>();
  const [calcUnits, setCalcUnits] = useState<"mkg" | "ftlbs">("mkg");

  const heightInputRef = useRef<HTMLIonInputElement>(null);
  const weightInputRef = useRef<HTMLIonInputElement>(null);

  const calculateBmi = () => {
    const inputHeight = heightInputRef.current!.value;
    const inputWeight = weightInputRef.current!.value;

    if (
      !inputHeight ||
      !inputWeight ||
      +inputHeight <= 0 ||
      +inputWeight <= 0
    ) {
      setError("Please enter a valid (non-negative) input number.");
      return;
    }

    const weightConversionFactor = calcUnits === "ftlbs" ? 2.2 : 1;
    const heightConversionFactor = calcUnits === "ftlbs" ? 3.28 : 1;

    const weight = +inputWeight / weightConversionFactor;
    const height = +inputHeight / heightConversionFactor;

    const bmi = weight / (height * height);

    setCalculatedBmi(Math.round(bmi));
  };

  const resetInputs = () => {
    heightInputRef.current!.value = "";
    weightInputRef.current!.value = "";

    setCalculatedBmi(undefined);
  };

  const clearError = () => {
    setError("");
  };

  const selectCalcUnitHandler = (selectedValue: "mkg" | "ftlbs") => {
    setCalcUnits(selectedValue);
  };  

  return (
    <>
      <IonAlert
        isOpen={!!error}
        message={error}
        buttons={[{ text: "OK", handler: clearError }]}
      />
      <IonApp>
        <IonHeader>
          <BmiToolbar />
        </IonHeader>
        <IonContent className="ion-padding">
          <IonGrid>
            <IonRow>
              <IonCol>
                <InputControl
                  selectedValue={calcUnits}
                  onSelectValue={selectCalcUnitHandler}
                />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">
                    Your Height ({calcUnits === "mkg" ? "meters" : "feet"})
                  </IonLabel>
                  <Input type="number" ref={heightInputRef} />
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">
                    Your Weight ({calcUnits === "mkg" ? "kg" : "lbs"})
                  </IonLabel>
                  <Input type="number" ref={weightInputRef} />
                </IonItem>
              </IonCol>
            </IonRow>
            <BmiControls onCalculate={calculateBmi} onReset={resetInputs} />
            {calculatedBmi && <BmiResult result={calculatedBmi} />}
          </IonGrid>
        </IonContent>
      </IonApp>
    </>
  );
};

export default App;
