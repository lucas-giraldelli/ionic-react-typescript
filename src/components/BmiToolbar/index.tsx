import React from "react";
import { IonToolbar, IonTitle } from '@ionic/react';

const BmiToolbar: React.FC = () => {
  return (
    <IonToolbar color="primary">
      <IonTitle>BMI Calculator</IonTitle>
    </IonToolbar>
  );
};

export default BmiToolbar;
