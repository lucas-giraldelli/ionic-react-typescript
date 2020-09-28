import React from "react";
import { IonRow, IonCol, IonCard, IonCardContent } from "@ionic/react";

const BmiResult: React.FC<{ result: number }> = ({ result }) => {
  return (
    <IonRow className="ion-text-center ion-margin-top">
      <IonCol>
        <IonCard>
          <IonCardContent>
            <h2>Your BMI score is {result}!</h2>
          </IonCardContent>
        </IonCard>
      </IonCol>
    </IonRow>
  );
};

export default BmiResult;
